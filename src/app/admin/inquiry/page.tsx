import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Clock, CheckCircle2, MessageCircle, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { InquiryForm } from "./inquiry-form"; // 後で作成

export default async function AdminInquiryPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const inquiries = await prisma.inquiry.findMany({
    where: { senderId: session.user.id },
    include: {
      replies: true,
      sender: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-start">
        <Link href="/admin">
          <Button variant="ghost" className="text-slate-400 hover:text-slate-600 font-bold gap-2 p-0 h-auto hover:bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">ダッシュボードへ戻る</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">サポート・相談</h1>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 font-bold px-3 py-1 rounded-lg">
              {inquiries.length} 件の履歴
            </Badge>
          </div>
          <p className="text-slate-500 font-medium text-sm">システム管理者へ直接メッセージを送ることができます。</p>
        </div>
        <InquiryForm />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {inquiries.length === 0 ? (
          <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl py-16">
            <CardContent className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 border border-slate-100">
                <MessageCircle className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold text-sm">まだ問い合わせ履歴はありません。</p>
            </CardContent>
          </Card>
        ) : (
          inquiries.map((inquiry) => (
            <Link key={inquiry.id} href={`/admin/inquiry/${inquiry.id}`}>
              <Card className="group relative hover:ring-2 hover:ring-blue-600/10 hover:border-blue-600/30 transition-all duration-300 rounded-xl overflow-hidden border-slate-200 bg-white shadow-sm hover:shadow-md">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                  inquiry.status === 'UNREAD' ? 'bg-blue-500' : 
                  inquiry.status === 'REPLIED' ? 'bg-emerald-500' : 'bg-slate-300'
                }`} />
                <CardContent className="p-4 pl-6 sm:p-5 sm:pl-7">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <StatusBadge status={inquiry.status} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {inquiry.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {inquiry.subject}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 font-medium">
                        {inquiry.content}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 shrink-0">
                      {inquiry.replies.length > 0 && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold border border-emerald-100">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {inquiry.replies.length}
                        </div>
                      )}
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-300 text-slate-300">
                        <ChevronRight className="w-4 h-4" />
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
      return <Badge className="bg-blue-50 text-blue-600 border-blue-100 px-2 py-0 h-5 rounded-md text-[10px] font-bold">送信済み</Badge>;
    case "READ":
      return <Badge className="bg-slate-50 text-slate-500 border-slate-200 px-2 py-0 h-5 rounded-md text-[10px] font-bold">既読</Badge>;
    case "REPLIED":
      return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 px-2 py-0 h-5 rounded-md text-[10px] font-bold">返信あり</Badge>;
    case "CLOSED":
      return <Badge className="bg-slate-950 text-white border-none px-2 py-0 h-5 rounded-md text-[10px] font-bold">完了</Badge>;
    default:
      return null;
  }
}
