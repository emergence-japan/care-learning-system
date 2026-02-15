import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, User, Building2, MessageCircle, ChevronRight, Inbox, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SuperAdminInquiriesPage() {
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") return null;

  const inquiries = await prisma.inquiry.findMany({
    include: {
      sender: {
        include: {
          corporation: true,
          facility: true
        }
      },
      replies: true
    },
    orderBy: { createdAt: "desc" }
  });

  const unreadCount = inquiries.filter(i => i.status === "UNREAD").length;

  return (
    <div className="p-8 space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-start">
        <Link href="/super-admin">
          <Button variant="ghost" className="text-slate-400 hover:text-white font-bold gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>ダッシュボードへ戻る</span>
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl">
              <Inbox className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">問い合わせ管理</h1>
          </div>
          <p className="text-slate-500 font-bold ml-1">全法人・全施設からの相談・不具合報告を一括管理します。</p>
        </div>

        {unreadCount > 0 && (
          <div className="bg-red-50 px-6 py-3 rounded-2xl border border-red-100 flex items-center gap-3 animate-bounce">
            <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
            <p className="text-red-600 font-black text-sm">未読の問い合わせが {unreadCount} 件あります</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {inquiries.length === 0 ? (
          <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[3rem] py-32">
            <CardContent className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-[2.5rem] shadow-sm flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 text-slate-200" />
              </div>
              <p className="text-slate-400 font-black text-xl">現在、お問い合わせはありません。</p>
            </CardContent>
          </Card>
        ) : (
          inquiries.map((inquiry) => (
            <Link key={inquiry.id} href={`/super-admin/inquiries/${inquiry.id}`}>
              <Card className="group hover:border-slate-900 hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden border-slate-100 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between gap-8">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <StatusBadge status={inquiry.status} />
                        <div className="h-4 w-px bg-slate-200" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {inquiry.createdAt.toLocaleString()}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          {inquiry.subject}
                        </h3>
                        <p className="text-slate-500 line-clamp-1 font-medium text-lg italic">
                          &quot;{inquiry.content}&quot;
                        </p>
                      </div>

                      <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
                          <Building2 className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-600">{inquiry.sender.corporation?.name || "個人"}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-600">{inquiry.sender.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Replies</p>
                        <p className="text-2xl font-black text-slate-900">{inquiry.replies.length}</p>
                      </div>
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-inner group-hover:rotate-12">
                        <ChevronRight className="w-6 h-6" strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "UNREAD":
      return <Badge className="bg-red-500 text-white border-none hover:bg-red-600 px-4 py-1 rounded-full text-[10px] font-black tracking-widest">未読</Badge>;
    case "READ":
      return <Badge className="bg-blue-100 text-blue-600 border-none hover:bg-blue-100 px-4 py-1 rounded-full text-[10px] font-black tracking-widest">確認中</Badge>;
    case "REPLIED":
      return <Badge className="bg-emerald-100 text-emerald-600 border-none hover:bg-emerald-100 px-4 py-1 rounded-full text-[10px] font-black tracking-widest">回答済み</Badge>;
    case "CLOSED":
      return <Badge className="bg-slate-100 text-slate-400 border-none hover:bg-slate-100 px-4 py-1 rounded-full text-[10px] font-black tracking-widest">完了</Badge>;
    default:
      return null;
  }
}
