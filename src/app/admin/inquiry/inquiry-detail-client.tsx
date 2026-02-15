"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createInquiryReply, closeInquiry } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2, ArrowLeft, CheckCircle2, User, ShieldCheck } from "lucide-react";
import Link from "next/link";

type Reply = {
  id: string;
  content: string;
  senderId: string;
  createdAt: Date;
};

type Inquiry = {
  id: string;
  subject: string;
  content: string;
  status: string;
  senderId: string;
  createdAt: Date;
  replies: Reply[];
};

type Props = {
  inquiry: Inquiry;
  currentUserId: string;
  currentUserRole: string;
  backPath: string;
};

export function InquiryDetailClient({ inquiry, currentUserId, currentUserRole, backPath }: Props) {
  const [content, setContent] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleReply = async () => {
    if (!content.trim()) return;
    startTransition(async () => {
      await createInquiryReply(inquiry.id, content);
      setContent("");
    });
  };

  const handleClose = async () => {
    if (!confirm("この問い合わせを完了（クローズ）しますか？")) return;
    startTransition(async () => {
      await closeInquiry(inquiry.id);
    });
  };

  const isClosed = inquiry.status === "CLOSED";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-4">
        <Link href={backPath}>
          <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">{inquiry.subject}</h1>
          <div className="flex items-center gap-3 mt-1">
            <StatusBadge status={inquiry.status} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{inquiry.createdAt.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* 最初の投稿 */}
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl shrink-0 flex items-center justify-center shadow-lg">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <Card className="rounded-[2rem] rounded-tl-none border-none shadow-xl shadow-slate-100/50 bg-white">
              <CardContent className="p-8">
                <p className="text-lg text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">{inquiry.content}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 返信一覧 */}
        {inquiry.replies.map((reply) => {
          const isSystem = reply.senderId !== inquiry.senderId;
          return (
            <div key={reply.id} className={`flex gap-4 items-start ${isSystem ? 'flex-row-reverse' : ''}`}>
              <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-lg ${isSystem ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {isSystem ? <ShieldCheck className="w-6 h-6" /> : <User className="w-6 h-6" />}
              </div>
              <div className={`flex-1 max-w-[80%] ${isSystem ? 'text-right' : ''}`}>
                <div className={`inline-block text-left p-6 rounded-[2rem] shadow-sm ${isSystem ? 'bg-blue-50 border border-blue-100 rounded-tr-none' : 'bg-white border border-slate-100 rounded-tl-none'}`}>
                  <p className={`text-base leading-relaxed font-bold ${isSystem ? 'text-blue-900' : 'text-slate-700'} whitespace-pre-wrap`}>
                    {reply.content}
                  </p>
                  <p className="mt-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {reply.createdAt.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!isClosed ? (
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 p-6 z-40">
          <div className="max-w-4xl mx-auto flex gap-4">
            <div className="flex-1 relative">
              <Textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="返信を入力..."
                className="min-h-[60px] max-h-[200px] rounded-2xl border-slate-200 focus:border-blue-600 focus:ring-0 text-base font-bold pr-14 py-4"
              />
              <Button 
                onClick={handleReply}
                disabled={isPending || !content.trim()}
                className="absolute right-2 bottom-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 p-0 flex items-center justify-center transition-all active:scale-90"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </div>
            {(currentUserRole === "SUPER_ADMIN" || inquiry.senderId === currentUserId) && (
              <Button 
                variant="outline" 
                onClick={handleClose}
                disabled={isPending}
                className="h-[60px] px-6 rounded-2xl border-slate-200 font-black text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="hidden sm:inline">完了にする</span>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-slate-300" />
          <p className="text-slate-400 font-black text-xl italic uppercase tracking-widest">Inquiry Closed</p>
          <p className="text-slate-400 font-bold">この問い合わせは完了しました。新しい相談がある場合は、新規に作成してください。</p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "UNREAD": return <Badge className="bg-blue-100 text-blue-600 border-none px-3 py-0.5 rounded-full text-[10px] font-black uppercase">未読</Badge>;
    case "READ": return <Badge className="bg-slate-100 text-slate-500 border-none px-3 py-0.5 rounded-full text-[10px] font-black uppercase">確認中</Badge>;
    case "REPLIED": return <Badge className="bg-emerald-500 text-white border-none px-3 py-0.5 rounded-full text-[10px] font-black uppercase">返答あり</Badge>;
    case "CLOSED": return <Badge className="bg-slate-900 text-white border-none px-3 py-0.5 rounded-full text-[10px] font-black uppercase">完了</Badge>;
    default: return null;
  }
}
