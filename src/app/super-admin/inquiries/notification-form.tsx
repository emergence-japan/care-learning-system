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
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Megaphone, Send, Loader2, Calendar, Target, Search } from "lucide-react";
import { createNotification } from "@/lib/actions";

type Props = {
  corporations: { id: string; name: string }[];
  facilities: { id: string; name: string; corporationId: string | null }[];
};

export function NotificationForm({ corporations, facilities }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [targetType, setTargetType] = useState<"ALL" | "ROLE" | "CORP" | "FACILITY">("ALL");
  const [selectedCorpId, setSelectedCorpId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createNotification(formData);

    if (typeof result === "string") {
      setError(result);
      setIsPending(false);
    } else {
      setOpen(false);
      setIsPending(false);
      // Reset form
      setTargetType("ALL");
      setSelectedCorpId("");
      setSearchTerm("");
    }
  }

  // Filter facilities based on selected corporation and search term
  const filteredFacilities = facilities.filter(f => {
    const matchesCorp = !selectedCorpId || f.corporationId === selectedCorpId;
    const matchesSearch = !searchTerm || f.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCorp && matchesSearch;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg gap-2 shadow-lg shadow-blue-200">
          <Megaphone className="w-4 h-4" />
          お知らせ作成
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-blue-600" />
            </div>
            システム通知作成
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">タイトル</label>
            <Input name="title" placeholder="メンテナンスのお知らせ、等" className="rounded-xl border-slate-200 font-bold" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Severity */}
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
            {/* Expiry Date */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> 掲載終了日（任意）
              </label>
              <Input type="date" name="expiresAt" className="rounded-xl border-slate-200 font-bold" />
            </div>
          </div>

          {/* Targeting */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-black text-slate-600 uppercase tracking-wider">宛先設定</span>
            </div>

            <Select value={targetType} onValueChange={(v: any) => setTargetType(v)}>
              <SelectTrigger className="rounded-xl border-slate-200 bg-white font-bold">
                <SelectValue placeholder="送信対象を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">全員に送信</SelectItem>
                <SelectItem value="ROLE">特定の役割（ロール）に送信</SelectItem>
                <SelectItem value="CORP">特定の法人に送信</SelectItem>
                <SelectItem value="FACILITY">特定の施設に送信</SelectItem>
              </SelectContent>
            </Select>

            {targetType === "ROLE" && (
              <Select name="targetRole" defaultValue="HQ">
                <SelectTrigger className="rounded-xl border-slate-200 bg-white font-bold animate-in fade-in zoom-in-95">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HQ">法人本部 (HQ) のみ</SelectItem>
                  <SelectItem value="ADMIN">施設管理者 (ADMIN) のみ</SelectItem>
                  <SelectItem value="STAFF">スタッフ (STAFF) のみ</SelectItem>
                </SelectContent>
              </Select>
            )}

            {targetType === "CORP" && (
              <Select name="targetCorporationId" required>
                <SelectTrigger className="rounded-xl border-slate-200 bg-white font-bold animate-in fade-in zoom-in-95">
                  <SelectValue placeholder="法人を選択してください" />
                </SelectTrigger>
                <SelectContent>
                  {corporations.map(corp => (
                    <SelectItem key={corp.id} value={corp.id}>{corp.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {targetType === "FACILITY" && (
              <div className="space-y-3 animate-in fade-in zoom-in-95">
                <div className="flex gap-2">
                  <Select value={selectedCorpId} onValueChange={setSelectedCorpId}>
                    <SelectTrigger className="rounded-xl border-slate-200 bg-white font-bold flex-1">
                      <SelectValue placeholder="法人で絞り込み（任意）" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">すべての法人</SelectItem>
                      {corporations.map(corp => (
                        <SelectItem key={corp.id} value={corp.id}>{corp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="施設名を検索..." 
                    className="pl-10 rounded-xl border-slate-200 bg-white font-bold"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select name="targetFacilityId" required>
                  <SelectTrigger className="rounded-xl border-slate-200 bg-white font-bold">
                    <SelectValue placeholder="送信先の施設を選択" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {filteredFacilities.map(f => (
                      <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                    ))}
                    {filteredFacilities.length === 0 && (
                      <div className="p-2 text-center text-xs text-slate-400 font-bold">該当する施設がありません</div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">通知内容</label>
            <Textarea name="content" placeholder="詳細を入力してください..." className="rounded-xl border-slate-200 font-bold min-h-[120px]" required />
          </div>

          {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}

          <Button type="submit" disabled={isPending} className="w-full bg-slate-900 hover:bg-black text-white font-bold h-12 rounded-xl transition-all shadow-xl shadow-slate-200 gap-2">
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            通知を公開する
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
