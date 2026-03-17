"use server";

import { revalidatePath } from "next/cache";
import { UnauthorizedError, ForbiddenError, NotFoundError } from "@/lib/errors";
import {
  userRepository,
  facilityRepository,
} from "@/lib/repositories";

export async function registerStaff(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") throw new UnauthorizedError();
  if (session.user.isSuspended) throw new ForbiddenError("利用停止中のため、この操作は許可されていません。");

  const facilityId = session.user.facilityId;
  if (!facilityId) throw new UnauthorizedError("施設が割り当てられていません。");

  const facility = await facilityRepository.findByIdWithStaffCount(facilityId);
  if (!facility) throw new NotFoundError("施設が見つかりません。");
  if (facility._count.users >= facility.maxStaff) {
    return `施設のスタッフ登録枠の上限（${facility.maxStaff}名）に達しています。`;
  }

  const name = formData.get("name") as string;
  const loginId = formData.get("loginId") as string;
  const password = formData.get("password") as string;

  if (!name || !loginId || !password) {
    return "全ての項目（氏名、ログインID、パスワード）を入力してください。";
  }

  const existing = await userRepository.findByLoginId(loginId);
  if (existing) return "このログインIDは既に登録されています。別のIDを指定してください。";

  const newUser = await userRepository.createWithHashedPassword({
    name,
    loginId,
    password,
    role: "STAFF",
    facilityId,
    corporationId: facility.corporationId,
  });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateUser(userId: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user) throw new UnauthorizedError();
  if (session.user.isSuspended) throw new ForbiddenError("利用停止中のため、この操作は許可されていません。");

  const name = formData.get("name") as string;
  const loginId = formData.get("loginId") as string;
  const password = formData.get("password") as string;

  const targetUser = await userRepository.findById(userId);
  if (!targetUser) throw new NotFoundError("ユーザーが見つかりません。");

  const requesterRole = session.user.role;
  const isAuthorized =
    requesterRole === "SUPER_ADMIN" ||
    (requesterRole === "HQ" && targetUser.corporationId === session.user.corporationId) ||
    (requesterRole === "ADMIN" &&
      targetUser.facilityId === session.user.facilityId &&
      targetUser.role === "STAFF");

  if (!isAuthorized) throw new ForbiddenError();

  if (loginId) {
    const conflict = await userRepository.findLoginIdConflict(loginId, userId);
    if (conflict) return "このログインIDは既に使用されています。";
  }

  const updateData: Record<string, unknown> = {};
  if (name) updateData.name = name;
  if (loginId) updateData.loginId = loginId;
  if (password && password.length >= 4) {
    const bcrypt = await import("bcryptjs");
    updateData.password = await bcrypt.hash(password, 12);
  }

  await userRepository.update(userId, updateData);

  revalidatePath("/admin");
  revalidatePath("/hq");
  revalidatePath("/super-admin/organizations");
  revalidatePath("/hq/facilities/[id]", "page");
}

export async function hqUpdateUserPassword(userId: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "HQ") throw new UnauthorizedError();

  const newPassword = formData.get("password") as string;
  if (!newPassword || newPassword.length < 4) return "パスワードは4文字以上で入力してください。";

  const targetUser = await userRepository.findByIdForCorpCheck(userId);
  if (!targetUser || targetUser.corporationId !== session.user.corporationId) {
    throw new ForbiddenError();
  }

  await userRepository.updatePassword(userId, newPassword);

  revalidatePath("/hq/facilities/[id]", "page");
}

export async function updateStaffPassword(staffId: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") throw new UnauthorizedError();

  const newPassword = formData.get("password") as string;
  if (!newPassword || newPassword.length < 4) return "パスワードは4文字以上で入力してください。";

  const staff = await userRepository.findByIdForFacilityCheck(staffId);
  if (!staff || staff.facilityId !== session.user.facilityId) throw new ForbiddenError();

  await userRepository.updatePassword(staffId, newPassword);

  revalidatePath("/admin");
}

export async function createOrgUser(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  const name = formData.get("name") as string;
  const loginId = formData.get("loginId") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as "HQ" | "ADMIN";
  const corporationId = formData.get("corporationId") as string;
  const facilityId = (formData.get("facilityId") as string) || null;

  if (!name || !loginId || !password) {
    return "全ての必須項目（氏名、ログインID、パスワード）を入力してください。";
  }

  const existing = await userRepository.findByLoginId(loginId);
  if (existing) return "このログインIDは既に登録されています。";

  await userRepository.createWithHashedPassword({
    name,
    loginId,
    password,
    role,
    corporationId,
    facilityId,
  });

  revalidatePath("/super-admin/organizations");
}

export async function deleteUser(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  const role = session?.user?.role;
  if (!session?.user || (role !== "SUPER_ADMIN" && role !== "HQ" && role !== "ADMIN")) {
    throw new UnauthorizedError();
  }

  if (role === "HQ") {
    const user = await userRepository.findByIdForCorpCheck(id);
    if (user?.corporationId !== session.user.corporationId) throw new ForbiddenError();
  }

  if (role === "ADMIN") {
    const user = await userRepository.findByIdForFacilityCheck(id);
    if (user?.facilityId !== session.user.facilityId) throw new ForbiddenError();
  }

  await userRepository.deleteWithEnrollments(id);

  revalidatePath("/admin");
  revalidatePath("/hq");
  revalidatePath("/super-admin/organizations");
  return { success: true };
}
