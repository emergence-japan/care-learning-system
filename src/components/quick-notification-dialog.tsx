"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Megaphone, Send, Loader2, Calendar } from "lucide-react";
import { createNotification } from "@/lib/actions";

type Props = {
  targetName: string;
  targetCorporationId?: string;
  targetFacilityId?: string;
  onClose: () => void;
};

export function QuickNotificationDialog({ targetName, targetCorporationId, targetFacilityId, onClose }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    if (targetCorporationId) formData.append("targetCorporationId", targetCorporationId);
    if (targetFacilityId) formData.append("targetFacilityId", targetFacilityId);

    const result = await createNotification(formData);

    if (typeof result === "string") {
      setError(result);
      setIsPending(false);
    } else {
      setIsPending(false);
      onClose();
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <div className="max-h-[90vh] overflow-y-auto p-8 custom-scrollbar">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-blue-600" />
              </div>
              個別メッセージ送信
            </DialogTitle>
            <p className="text-xs font-bold text-slate-400 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
              宛先: <span className="text-slate-900">{targetName}</span>
            </p>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">タイトル</label>
              <Input name="title" placeholder="件名を入力..." className="rounded-xl border-slate-200 font-bold" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">重要度</label>
                <Select name="severity" defaultValue="INFO">
                  <SelectTrigger className="rounded-xl border-slate-200 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INFO">一般 (INFO)</SelectItem>
                    <SelectItem value="WARNING">警告 (WARNING)</SelectItem>
                    <SelectItem value="CRITICAL">緊急 (CRITICAL)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">対象ロール</label>
                <Select name="targetRole" defaultValue={targetCorporationId ? "HQ" : "ADMIN"}>
                  <SelectTrigger className="rounded-xl border-slate-200 font-bold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">全員（スタッフ含む）</SelectItem>
                    <SelectItem value="HQ">法人本部 (HQ) のみ</SelectItem>
                    <SelectItem value="ADMIN">施設管理者 (ADMIN) のみ</SelectItem>
                    <SelectItem value="STAFF">スタッフ (STAFF) のみ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> 掲載終了日
              </label>
              <Input type="date" name="expiresAt" className="rounded-xl border-slate-200 font-bold" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">通知内容</label>
              <Textarea name="content" placeholder="メッセージ本文を入力してください..." className="rounded-xl border-slate-200 font-bold min-h-[120px]" required />
            </div>

            {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

            <Button type="submit" disabled={isPending} className="w-full bg-slate-900 hover:bg-black text-white font-bold h-12 rounded-xl transition-all shadow-xl shadow-slate-200 gap-2 mb-2">
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              メッセージを送信
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
