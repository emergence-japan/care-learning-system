import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InquiryDetailClient } from "../inquiry-detail-client";

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

  // 自分の問い合わせでない場合はアクセス不可（HQ/ADMINの場合）
  if (session.user.role !== "SUPER_ADMIN" && inquiry.senderId !== session.user.id) {
    notFound();
  }

  // ステータスを「既読（READ）」に更新（自分以外の返信がある場合やシステム管理者が開いた場合）
  if (inquiry.status === "UNREAD" && session.user.role === "SUPER_ADMIN") {
    await prisma.inquiry.update({
      where: { id },
      data: { status: "READ" }
    });
  }

  return (
    <InquiryDetailClient 
      inquiry={inquiry} 
      currentUserId={session.user.id} 
      currentUserRole={session.user.role} 
      backPath="/admin/inquiry" 
    />
  );
}
