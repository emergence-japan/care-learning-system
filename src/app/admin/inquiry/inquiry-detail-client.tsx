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
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-4">
        <Link href={backPath}>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-100 hover:bg-slate-50">
            <ArrowLeft className="w-4 h-4 text-slate-500" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-black text-slate-900 leading-tight">{inquiry.subject}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <StatusBadge status={inquiry.status} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{inquiry.createdAt.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* 最初の投稿 */}
        <div className="flex gap-3 items-start">
          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl shrink-0 flex items-center justify-center shadow-md">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <Card className="rounded-2xl rounded-tl-none border-none shadow-sm bg-white">
              <CardContent className="p-5">
                <p className="text-base text-slate-700 leading-relaxed font-bold whitespace-pre-wrap">{inquiry.content}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 返信一覧 */}
        {inquiry.replies.map((reply) => {
          const isSystem = reply.senderId !== inquiry.senderId;
          return (
            <div key={reply.id} className={`flex gap-3 items-start ${isSystem ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-md ${isSystem ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {isSystem ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div className={`flex-1 max-w-[85%] ${isSystem ? 'text-right' : ''}`}>
                <div className={`inline-block text-left p-4 rounded-2xl shadow-sm ${isSystem ? 'bg-blue-50 border border-blue-100 rounded-tr-none' : 'bg-white border border-slate-100 rounded-tl-none'}`}>
                  <p className={`text-sm leading-relaxed font-bold ${isSystem ? 'text-blue-900' : 'text-slate-700'} whitespace-pre-wrap`}>
                    {reply.content}
                  </p>
                  <p className="mt-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {reply.createdAt.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!isClosed ? (
        <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 z-40">
          <div className="max-w-4xl mx-auto flex gap-3">
            <div className="flex-1 relative">
              <Textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="返信を入力..."
                className="min-h-[50px] max-h-[150px] rounded-xl border-slate-200 focus:border-blue-600 focus:ring-0 text-sm font-bold pr-12 py-3"
              />
              <Button 
                onClick={handleReply}
                disabled={isPending || !content.trim()}
                className="absolute right-1.5 bottom-1.5 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-200 p-0 flex items-center justify-center transition-all active:scale-90"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            {(currentUserRole === "SUPER_ADMIN" || inquiry.senderId === currentUserId) && (
              <Button 
                variant="outline" 
                onClick={handleClose}
                disabled={isPending}
                className="h-[50px] px-4 rounded-xl border-slate-200 font-black text-xs text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="hidden sm:inline">完了にする</span>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-slate-300" />
          <p className="text-slate-400 font-black text-lg italic uppercase tracking-widest leading-none">Inquiry Closed</p>
          <p className="text-slate-400 font-bold text-sm">この問い合わせは完了しました。</p>
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
