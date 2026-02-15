import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, MessageCircle, ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { InquiryForm } from "@/app/admin/inquiry/inquiry-form"; // 共通フォームを使用

export default async function HQInquiryPage() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const inquiries = await prisma.inquiry.findMany({
    where: { senderId: session.user.id },
    include: {
      replies: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-start">
        <Link href="/hq">
          <Button variant="ghost" className="text-slate-400 hover:text-slate-900 font-bold gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>ダッシュボードへ戻る</span>
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">本部サポート窓口</h1>
          </div>
          <p className="text-slate-500 font-bold ml-1">システム管理者へ直接メッセージを送ることができます。</p>
        </div>
        <InquiryForm />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {inquiries.length === 0 ? (
          <Card className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[2rem] py-20">
            <CardContent className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold">まだ問い合わせ履歴はありません。</p>
            </CardContent>
          </Card>
        ) : (
          inquiries.map((inquiry) => (
            <Link key={inquiry.id} href={`/hq/inquiry/${inquiry.id}`}>
              <Card className="group hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300 rounded-[2rem] overflow-hidden border-slate-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={inquiry.status} />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {inquiry.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {inquiry.subject}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-1 font-medium">
                        {inquiry.content}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 shrink-0">
                      {inquiry.replies.length > 0 && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black">
                          <MessageCircle className="w-3 h-3" />
                          {inquiry.replies.length}件の返信
                        </div>
                      )}
                      <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors text-slate-300">
                        <ChevronRight className="w-5 h-5" />
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
      return <Badge className="bg-indigo-100 text-indigo-600 border-none hover:bg-indigo-100 px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase">未読</Badge>;
    case "READ":
      return <Badge className="bg-slate-100 text-slate-500 border-none hover:bg-slate-100 px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase">既読</Badge>;
    case "REPLIED":
      return <Badge className="bg-emerald-500 text-white border-none hover:bg-emerald-500 px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase">返答あり</Badge>;
    case "CLOSED":
      return <Badge className="bg-slate-900 text-white border-none hover:bg-slate-900 px-3 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase">完了</Badge>;
    default:
      return null;
  }
}
