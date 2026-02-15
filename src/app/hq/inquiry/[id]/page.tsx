import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InquiryDetailClient } from "../../admin/inquiry/inquiry-detail-client";

export default async function InquiryDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return null;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: {
      replies: { orderBy: { createdAt: "asc" } },
      sender: true
    }
  });

  if (!inquiry) notFound();
  if (session.user.role !== "SUPER_ADMIN" && inquiry.senderId !== session.user.id) {
    notFound();
  }

  return (
    <InquiryDetailClient 
      inquiry={inquiry} 
      currentUserId={session.user.id} 
      currentUserRole={session.user.role} 
      backPath="/hq/inquiry" 
    />
  );
}
