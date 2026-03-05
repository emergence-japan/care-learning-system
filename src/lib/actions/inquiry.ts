"use server";

import { revalidatePath } from "next/cache";
import { UnauthorizedError } from "@/lib/errors";
import { inquiryRepository } from "@/lib/repositories";

export async function createInquiry(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user?.id) throw new UnauthorizedError();

  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;

  if (!subject || !content) return "件名と内容を入力してください。";

  await inquiryRepository.create({ subject, content, senderId: session.user.id });

  revalidatePath("/admin/inquiry");
  revalidatePath("/hq/inquiry");
}

export async function createInquiryReply(inquiryId: string, content: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user?.id) throw new UnauthorizedError();
  if (!content) return "内容を入力してください。";

  await inquiryRepository.createReply({ inquiryId, content, senderId: session.user.id });

  if (session.user.role === "SUPER_ADMIN") {
    await inquiryRepository.updateStatus(inquiryId, "REPLIED");
  }

  revalidatePath("/admin/inquiry");
  revalidatePath("/hq/inquiry");
  revalidatePath("/super-admin/inquiries");
  revalidatePath("/admin/inquiry/[id]", "page");
  revalidatePath("/hq/inquiry/[id]", "page");
  revalidatePath("/super-admin/inquiries/[id]", "page");
}

export async function closeInquiry(inquiryId: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user) throw new UnauthorizedError();

  await inquiryRepository.updateStatus(inquiryId, "CLOSED");

  revalidatePath("/admin/inquiry");
  revalidatePath("/hq/inquiry");
  revalidatePath("/super-admin/inquiries");
  revalidatePath("/admin/inquiry/[id]", "page");
  revalidatePath("/hq/inquiry/[id]", "page");
  revalidatePath("/super-admin/inquiries/[id]", "page");
}
