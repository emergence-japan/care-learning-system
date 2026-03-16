"use server";

import { revalidatePath } from "next/cache";
import { UnauthorizedError, ForbiddenError } from "@/lib/errors";
import { userRepository, courseRepository, enrollmentRepository } from "@/lib/repositories";
import type { ActionResult } from "@/types";

export async function createCourse(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const slug = title.toLowerCase().replace(/[^a-z0-9]/g, "-") || `course-${Date.now()}`;

  const newCourse = await courseRepository.create({ slug, title, description, videoUrl });

  const allStaff = await userRepository.findAllStaff();
  for (const user of allStaff) {
    await enrollmentRepository.createForCourse(user.id, newCourse.id);
  }

  revalidatePath("/super-admin/courses");
  revalidatePath("/");
}

export async function updateCourse(id: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const videoUrl = formData.get("videoUrl") as string;

  await courseRepository.update(id, { title, description, videoUrl });

  revalidatePath("/super-admin/courses");
  revalidatePath(`/courses/${id}`);
  revalidatePath("/");
}

export async function deleteCourse(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  await courseRepository.deleteWithRelations(id);

  revalidatePath("/super-admin/courses");
  revalidatePath("/");
}

export async function assignCourseToFacility(
  courseId: string,
  startDate: Date,
  endDate: Date,
) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") throw new UnauthorizedError();
  if (session.user.isSuspended) throw new ForbiddenError("利用停止中のため、この操作は許可されていません。");

  const facilityId = session.user.facilityId;
  if (!facilityId) throw new UnauthorizedError("施設が割り当てられていません。");

  await courseRepository.createAssignment(facilityId, courseId, startDate, endDate);

  const staffMembers = await userRepository.findStaffByFacility(facilityId);
  for (const staff of staffMembers) {
    await enrollmentRepository.upsertForStaff(staff.id, courseId);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateCourseAssignment(
  id: string,
  startDate: Date,
  endDate: Date,
): Promise<ActionResult> {
  const { auth } = await import("@/auth");
  const session = await auth();

  const facilityId = session?.user?.facilityId;
  if (!session?.user || session.user.role !== "ADMIN" || !facilityId) throw new UnauthorizedError();

  try {
    await courseRepository.updateAssignment(id, facilityId, startDate, endDate);
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Update assignment error:", error);
    return { success: false, error: "更新に失敗しました。" };
  }
}

export async function deleteCourseAssignment(id: string): Promise<ActionResult> {
  const { auth } = await import("@/auth");
  const session = await auth();

  const facilityId = session?.user?.facilityId;
  if (!session?.user || session.user.role !== "ADMIN" || !facilityId) throw new UnauthorizedError();

  try {
    await courseRepository.deleteAssignment(id, facilityId);
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete assignment error:", error);
    return { success: false, error: "削除に失敗しました。" };
  }
}
