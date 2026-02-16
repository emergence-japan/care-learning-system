import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InquiryDetailClient } from "../../../admin/inquiry/inquiry-detail-client";
import { Building2 } from "lucide-react";

export default async function InquiryDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") return null;

  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: {
      replies: { orderBy: { createdAt: "asc" } },
      sender: {
        include: {
          corporation: true
        }
      }
    }
  });

  if (!inquiry) notFound();

  // 未読の場合は既読に更新
  if (inquiry.status === "UNREAD") {
    await prisma.inquiry.update({
      where: { id },
      data: { status: "READ" }
    });
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Inquiry Source</p>
            <p className="text-sm font-bold text-slate-700">
              {inquiry.sender.corporation?.name || "個人ユーザー"} 
              <span className="mx-2 text-slate-300">/</span> 
              {inquiry.sender.name}
            </p>
          </div>
        </div>
      </div>

      <InquiryDetailClient 
        inquiry={inquiry} 
        currentUserId={session.user.id} 
        currentUserRole={session.user.role} 
        backPath="/super-admin/inquiries" 
      />
    </div>
  );
}
