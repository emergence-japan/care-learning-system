"use server";

import { revalidatePath } from "next/cache";
import { UnauthorizedError, ForbiddenError, NotFoundError } from "@/lib/errors";
import {
  userRepository,
  facilityRepository,
} from "@/lib/repositories";
import { RETENTION_YEARS, retentionCutoff, isPastRetention } from "@/lib/retention";

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
  if (password.length < 8) return "パスワードは8文字以上で入力してください。";

  const existing = await userRepository.findByLoginId(loginId);
  if (existing) return "このログインIDは既に登録されています。別のIDを指定してください。";

  await userRepository.createWithHashedPassword({
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
  if (password) {
    if (password.length < 8) return "パスワードは8文字以上で入力してください。";
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
  if (!newPassword || newPassword.length < 8) return "パスワードは8文字以上で入力してください。";

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
  if (!newPassword || newPassword.length < 8) return "パスワードは8文字以上で入力してください。";

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
  if (password.length < 8) return "パスワードは8文字以上で入力してください。";

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

// 権限チェック: SUPER_ADMIN は全員、HQ は同一法人、ADMIN は同一施設の STAFF のみ操作可。
async function authorizeUserMutation(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  const role = session?.user?.role;
  if (!session?.user || (role !== "SUPER_ADMIN" && role !== "HQ" && role !== "ADMIN")) {
    throw new UnauthorizedError();
  }

  // 停止中の組織の管理者は変更操作不可（registerStaff/updateUser と同じ制約）
  if (session.user.isSuspended && role !== "SUPER_ADMIN") {
    throw new ForbiddenError("利用停止中のため、この操作は許可されていません。");
  }

  if (role === "HQ") {
    const user = await userRepository.findByIdForCorpCheck(id);
    if (user?.corporationId !== session.user.corporationId) throw new ForbiddenError();
  }

  if (role === "ADMIN") {
    // ADMIN は同一施設の STAFF のみ操作可（他の管理者は操作できない）。updateUser と同条件。
    const user = await userRepository.findById(id);
    if (
      user?.facilityId !== session.user.facilityId ||
      user?.role !== "STAFF"
    ) {
      throw new ForbiddenError();
    }
  }
}

// 退職処理（論理削除）。ログイン不可・一覧非表示・maxStaff枠から除外されるが、
// 受講記録は監査のため保持される。
export async function retireUser(id: string) {
  await authorizeUserMutation(id);

  await userRepository.retire(id);

  revalidatePath("/admin");
  revalidatePath("/hq");
  revalidatePath("/super-admin/organizations");
  revalidatePath("/");
  return { success: true };
}

// 完全削除（物理削除）。受講記録ごと消える。
// 退職済み かつ 保持期間（RETENTION_YEARS）を経過したスタッフのみ削除可能。
export async function deleteUser(id: string) {
  await authorizeUserMutation(id);

  const target = await userRepository.findByIdForRetentionCheck(id);
  if (!target) throw new NotFoundError("ユーザーが見つかりません。");
  if (!isPastRetention(target.deletedAt)) {
    throw new ForbiddenError(
      `退職から${RETENTION_YEARS}年が経過したスタッフのみ完全削除できます。`,
    );
  }

  await userRepository.deleteWithEnrollments(id);

  revalidatePath("/admin");
  revalidatePath("/hq");
  revalidatePath("/super-admin/organizations");
  return { success: true };
}

// 保持期間を経過した退職者の一覧を取得する（完全削除UI用）。
// ADMIN は自施設、HQ は自法人、SUPER_ADMIN は全件を対象とする。
export async function getPurgeableStaff() {
  const { auth } = await import("@/auth");
  const session = await auth();

  const role = session?.user?.role;
  if (!session?.user || (role !== "SUPER_ADMIN" && role !== "HQ" && role !== "ADMIN")) {
    throw new UnauthorizedError();
  }

  const scope =
    role === "ADMIN"
      ? { facilityId: session.user.facilityId ?? undefined }
      : role === "HQ"
        ? { corporationId: session.user.corporationId ?? undefined }
        : {};

  return userRepository.findPurgeable(retentionCutoff(), scope);
}
