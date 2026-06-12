"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader2, Trash2, Archive } from "lucide-react";

type PurgeableStaff = {
  id: string;
  name: string;
  loginId: string;
  retiredAt: string; // ISO string（退職日時）
};

type Props = {
  staff: PurgeableStaff[];
  trigger: React.ReactNode;
};

// 退職日からの経過年数（小数1桁）を表示用に整形する。
function yearsSince(iso: string): string {
  const retired = new Date(iso).getTime();
  const years = (Date.now() - retired) / (1000 * 60 * 60 * 24 * 365.25);
  return years.toFixed(1);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PurgeStaffDialog({ staff, trigger }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (target: PurgeableStaff) => {
    if (
      !confirm(
        `「${target.name}」の記録を完全に削除しますか？\n\n` +
          `受講記録・修了履歴を含むすべてのデータが消え、元に戻せません。\n` +
          `監査が完了していることを確認してください。`,
      )
    )
      return;

    setDeletingId(target.id);
    setError(null);
    try {
      const result = await deleteUser(target.id);
      if (result && typeof result === "string") {
        setError(result);
        setDeletingId(null);
        return;
      }
      window.location.reload();
    } catch {
      setError("削除に失敗しました。時間をおいて再度お試しください。");
      setDeletingId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white border-none text-slate-600 rounded-[2rem] sm:max-w-[480px] p-0 overflow-hidden shadow-2xl focus:outline-none flex flex-col max-h-[90vh]">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-rose-600" />

        <DialogHeader className="p-8 pb-4 border-b border-slate-50 bg-rose-50/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-rose-100 p-2.5 rounded-xl text-rose-600">
              <Archive className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black text-slate-900 leading-tight">
                保持期間経過スタッフ
              </DialogTitle>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                Records Retention Cleanup
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 font-bold leading-relaxed">
              退職から保持期間が経過したスタッフです。完全削除すると受講記録・修了履歴を含むすべてのデータが消え、元に戻せません。監査が完了していることを必ず確認してください。
            </p>
          </div>

          {staff.length === 0 ? (
            <div className="py-10 text-center text-slate-400 text-sm font-medium bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              完全削除の対象となるスタッフはいません
            </div>
          ) : (
            <ul className="space-y-3">
              {staff.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 truncate">{s.name}</p>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">
                      <span className="font-mono">{s.loginId}</span>
                      <span className="mx-1.5">·</span>
                      退職 {formatDate(s.retiredAt)}（{yearsSince(s.retiredAt)}年経過）
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(s)}
                    disabled={deletingId !== null}
                    className="shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 h-9 rounded-xl font-bold flex items-center gap-1.5"
                  >
                    {deletingId === s.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    完全削除
                  </Button>
                </li>
              ))}
            </ul>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold text-center">
              {error}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
