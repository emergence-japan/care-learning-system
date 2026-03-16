"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, Loader2, User, KeyRound, CheckCircle2 } from "lucide-react";
import { useFormAction } from "@/hooks/use-form-action";

type Props = {
  user: {
    id: string;
    name: string;
    loginId: string;
  };
};

export function HQEditUserDialog({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [shownPassword, setShownPassword] = useState<string | null>(null);
  const enteredPasswordRef = useRef("");

  const { isPending, error, handleSubmit: _handleSubmit } = useFormAction(
    (formData) => updateUser(user.id, formData),
    () => {
      if (enteredPasswordRef.current) {
        setShownPassword(enteredPasswordRef.current);
        enteredPasswordRef.current = "";
      } else {
        setIsOpen(false);
        window.location.reload();
      }
    },
  );

  const handleSubmit = (formData: FormData) => {
    enteredPasswordRef.current = (formData.get("password") as string) || "";
    return _handleSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="w-5 h-5 text-emerald-300 hover:text-emerald-600 hover:bg-white rounded-full transition-colors">
          <Edit2 className="w-3 h-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-8">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
              <User className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black text-slate-900 leading-tight">管理者の情報を修正</DialogTitle>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Edit Admin Information</p>
            </div>
          </div>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="edit-user-name" className="text-xs font-bold text-slate-500 uppercase tracking-widest">氏名</Label>
            <Input 
              id="edit-user-name" 
              name="name" 
              defaultValue={user.name} 
              className="h-12 rounded-xl bg-slate-50 border-slate-200 font-bold focus:ring-emerald-500"
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-user-login-id" className="text-xs font-bold text-slate-500 uppercase tracking-widest">ログインID</Label>
            <Input 
              id="edit-user-login-id" 
              name="loginId" 
              defaultValue={user.loginId} 
              className="h-12 rounded-xl bg-slate-50 border-slate-200 font-mono font-bold focus:ring-emerald-500"
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-user-password" className="text-xs font-bold text-slate-500 uppercase tracking-widest">新しいパスワード (変更する場合のみ)</Label>
            <Input 
              id="edit-user-password" 
              name="password" 
              type="password"
              placeholder="Leave blank to keep current"
              className="h-12 rounded-xl bg-slate-50 border-slate-200 font-mono font-bold focus:ring-emerald-500"
            />
          </div>

          {error && <p className="text-xs font-bold text-red-500">{error}</p>}

          {shownPassword && (
            <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span className="text-xs font-bold">パスワードを更新しました</span>
              </div>
              <div className="bg-white border border-emerald-100 rounded-xl p-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">新しいパスワード</p>
                  <p className="font-mono font-black text-slate-900 text-lg tracking-widest">{shownPassword}</p>
                </div>
                <KeyRound className="w-5 h-5 text-emerald-400 shrink-0" />
              </div>
              <p className="text-[10px] text-amber-600 font-bold leading-relaxed">
                ※ この画面を閉じると二度と確認できません。本人に伝えてください。
              </p>
            </div>
          )}

          <div className="pt-4 flex gap-3">
            <Button type="button" variant="ghost" onClick={() => { setIsOpen(false); if (shownPassword) window.location.reload(); }} className="flex-1 rounded-xl font-bold h-12">
              {shownPassword ? "閉じる" : "キャンセル"}
            </Button>
            {!shownPassword && (
              <Button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold h-12 shadow-lg shadow-emerald-100"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "更新する"}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
