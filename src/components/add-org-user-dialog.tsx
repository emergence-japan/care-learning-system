"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrgUser } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { X, UserPlus, Loader2, KeyRound } from "lucide-react";

type Props = {
  corporationId: string;
  facilityId: string | null;
  orgName: string;
  role: "HQ" | "ADMIN";
  onClose: () => void;
};

export function AddOrgUserDialog({ corporationId, facilityId, orgName, role, onClose }: Props) {
  const roleName = role === "HQ" ? "法人本部" : "施設長";
  const [errorMessage, dispatch, isPending] = useActionState(
    async (state: string | undefined, formData: FormData) => {
      return await createOrgUser(formData);
    },
    undefined,
  );

  // 成功時に閉じる簡易的な処理
  useEffect(() => {
    if (!isPending && errorMessage === undefined && document.activeElement instanceof HTMLElement) {
      // 成功したとみなして少し待ってから閉じる（再描画待ち）
    }
  }, [isPending, errorMessage]);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-none animate-in zoom-in duration-200 overflow-hidden bg-white rounded-[2rem]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
        
        <div className="flex items-center justify-between p-8 border-b border-slate-50 bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">{orgName}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{roleName}アカウント作成</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white shadow-sm" disabled={isPending}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </div>

        <CardContent className="p-8">
          <form action={async (formData) => {
            const result = await dispatch(formData);
            if (!result) {
              onClose();
            }
          }} className="space-y-6">
            <input type="hidden" name="corporationId" value={corporationId} />
            <input type="hidden" name="facilityId" value={facilityId || ""} />
            <input type="hidden" name="role" value={role} />

            <div className="space-y-2">
              <Label htmlFor="user-name" className="text-xs font-bold text-slate-500 ml-1">氏名</Label>
              <Input id="user-name" name="name" placeholder="管理者 太郎" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-loginId" className="text-xs font-bold text-slate-500 ml-1">ログインID</Label>
              <Input id="user-loginId" name="loginId" placeholder="半角英数字（例: admin01）" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-mono font-bold" required />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label htmlFor="user-email" className="text-xs font-bold text-slate-500">メールアドレス</Label>
                <span className="text-[10px] font-bold text-slate-300 uppercase">任意</span>
              </div>
              <Input id="user-email" name="email" type="email" placeholder="admin@example.com (空欄可)" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-medium" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-password" className="text-xs font-bold text-slate-500 ml-1">初期パスワード</Label>
              <div className="relative">
                <Input id="user-password" name="password" type="password" placeholder="パスワードを設定" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold pr-10" required />
                <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-xs text-red-600 font-bold text-center">{errorMessage}</p>
              </div>
            )}

            <div className="pt-4 flex gap-3">
              <Button type="button" variant="ghost" onClick={onClose} className="flex-1 rounded-xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                キャンセル
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold h-12 shadow-lg shadow-slate-200"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "登録する"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}