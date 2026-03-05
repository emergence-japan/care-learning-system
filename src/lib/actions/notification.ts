"use server";

import { revalidatePath } from "next/cache";
import { UnauthorizedError } from "@/lib/errors";
import { notificationRepository } from "@/lib/repositories";
import type { Severity, Role } from "@/types";

export async function createNotification(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const severity = ((formData.get("severity") as string) || "INFO") as Severity;
  const targetRole = formData.get("targetRole") as string;
  const corporationId = formData.get("targetCorporationId") as string;
  const facilityId = formData.get("targetFacilityId") as string;
  const expiresAtStr = formData.get("expiresAt") as string;

  if (!title || !content) return "タイトルと内容を入力してください。";

  await notificationRepository.create({
    title,
    content,
    severity,
    targetRole: targetRole === "ALL" || !targetRole ? null : (targetRole as Role),
    targetCorporationId: corporationId || null,
    targetFacilityId: facilityId || null,
    expiresAt: expiresAtStr ? new Date(expiresAtStr) : null,
    authorId: session.user.id,
  });

  revalidatePath("/admin");
  revalidatePath("/hq");
  revalidatePath("/");
  revalidatePath("/super-admin/inquiries");
}

export async function deleteNotification(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") throw new UnauthorizedError();

  await notificationRepository.delete(id);

  revalidatePath("/admin");
  revalidatePath("/hq");
  revalidatePath("/");
  revalidatePath("/super-admin/inquiries");
}
