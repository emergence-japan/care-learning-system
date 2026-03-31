"use server";

import { revalidatePath } from "next/cache";
import { UnauthorizedError, ForbiddenError, NotFoundError } from "@/lib/errors";
import {
  userRepository,
  facilityRepository,
  corporationRepository,
} from "@/lib/repositories";

export async function createCorporation(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  const name = formData.get("name") as string;
  const maxFacilities = parseInt(formData.get("maxFacilities") as string) || 10;
  const maxStaff = parseInt(formData.get("maxStaff") as string) || 100;

  await corporationRepository.create({ name, maxFacilities, maxStaff });

  revalidatePath("/super-admin/organizations");
}

export async function updateCorporation(id: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  const name = formData.get("name") as string;
  const maxFacilities = parseInt(formData.get("maxFacilities") as string);
  const maxStaff = parseInt(formData.get("maxStaff") as string);

  await corporationRepository.update(id, { name, maxFacilities, maxStaff });

  revalidatePath("/super-admin/organizations");
}

export async function deleteCorporation(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  await corporationRepository.deleteWithRelations(id);

  revalidatePath("/super-admin/organizations");
}

export async function toggleCorporationStatus(id: string, isActive: boolean) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  await corporationRepository.update(id, { isActive });

  revalidatePath("/super-admin/organizations");
  revalidatePath("/super-admin");
}

export async function createFacility(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const corporationId = formData.get("corporationId") as string;
  const maxStaff = parseInt(formData.get("maxStaff") as string) || 20;

  const corporation = await corporationRepository.findByIdWithFacilityCount(corporationId);
  if (!corporation) throw new NotFoundError("法人が見つかりません。");
  if (corporation._count.facilities >= corporation.maxFacilities) {
    throw new Error(`施設登録枠の上限（${corporation.maxFacilities}施設）に達しています。`);
  }

  await facilityRepository.create({ name, type, corporationId, maxStaff });

  revalidatePath("/super-admin/organizations");
}

export async function updateFacility(id: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const maxStaff = parseInt(formData.get("maxStaff") as string);

  await facilityRepository.update(id, { name, type: type || null, maxStaff });

  revalidatePath("/super-admin/organizations");
}

export async function deleteFacility(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  const role = session?.user?.role;
  if (!session?.user || (role !== "SUPER_ADMIN" && role !== "HQ")) throw new UnauthorizedError();

  if (role === "HQ") {
    const facility = await facilityRepository.findById(id);
    if (facility?.corporationId !== session.user.corporationId) throw new ForbiddenError();
  }

  await facilityRepository.deleteWithUsers(id);

  revalidatePath("/super-admin/organizations");
  revalidatePath("/hq");
}

export async function toggleFacilityStatus(id: string, isActive: boolean) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  await facilityRepository.update(id, { isActive });

  revalidatePath("/super-admin/organizations");
  revalidatePath("/hq");
}

export async function hqCreateFacility(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "HQ") throw new UnauthorizedError();
  if (session.user.isSuspended) throw new ForbiddenError("利用停止中のため、この操作は許可されていません。");

  const corporationId = session.user.corporationId;
  if (!corporationId) throw new UnauthorizedError("法人が割り当てられていません。");

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const maxStaff = parseInt(formData.get("maxStaff") as string) || 20;

  if (!name) return "施設名を入力してください。";

  const corporation = await corporationRepository.findByIdWithFacilityCount(corporationId);
  if (!corporation) throw new NotFoundError("法人が見つかりません。");
  if (corporation._count.facilities >= corporation.maxFacilities) {
    return `法人全体の施設登録枠の上限（${corporation.maxFacilities}施設）に達しています。これ以上追加できません。`;
  }

  const duplicate = await facilityRepository.findByCorpAndName(corporationId, name);
  if (duplicate) return "同じ名前の施設が既に存在します。";

  await facilityRepository.create({ name, type, corporationId, maxStaff });

  revalidatePath("/hq");
}

export async function hqUpdateFacility(id: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "HQ") throw new UnauthorizedError();
  if (session.user.isSuspended) throw new ForbiddenError("利用停止中のため、この操作は許可されていません。");

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const maxStaff = parseInt(formData.get("maxStaff") as string);

  const facility = await facilityRepository.findById(id);
  if (!facility || facility.corporationId !== session.user.corporationId) throw new ForbiddenError();

  await facilityRepository.update(id, { name, type: type || null, maxStaff: isNaN(maxStaff) ? undefined : maxStaff });

  revalidatePath("/hq");
  revalidatePath("/hq/facilities/[id]", "page");
}

export async function hqCreateAdmin(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "HQ") throw new UnauthorizedError();
  if (session.user.isSuspended) throw new ForbiddenError("利用停止中のため、この操作は許可されていません。");

  const corporationId = session.user.corporationId;
  const facilityId = formData.get("facilityId") as string;
  const name = formData.get("name") as string;
  const loginId = formData.get("loginId") as string;
  const password = formData.get("password") as string;

  if (!name || !loginId || !password || !facilityId) return "全ての項目を入力してください。";

  const existing = await userRepository.findByLoginId(loginId);
  if (existing) return "このログインIDは既に登録されています。";

  await userRepository.createWithHashedPassword({
    name,
    loginId,
    password,
    role: "ADMIN",
    corporationId,
    facilityId,
  });

  revalidatePath("/hq");
}

export async function updateFiscalYearStartMonth(month: number) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") throw new UnauthorizedError();

  const corporationId = session.user.corporationId;
  if (!corporationId) throw new NotFoundError("法人が見つかりません。");
  if (month < 1 || month > 12) throw new Error("Invalid month");

  await corporationRepository.update(corporationId, { fiscalYearStartMonth: month });

  revalidatePath("/admin");
}
