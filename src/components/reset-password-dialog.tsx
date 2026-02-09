"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateStaffPassword } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { X, KeyRound, Loader2, CheckCircle2, ShieldAlert } from "lucide-react";

type Props = {
  staff: {
    id: string;
    name: string;
    loginId: string;
    password?: string; // 表示用にパスワードを受け取れるように拡張
  };
  onClose: () => void;
};

export function ResetPasswordDialog({ staff, onClose }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await updateStaffPassword(staff.id, formData);
      if (result) {
        setError(result);
      } else {
        setIsSuccess(true);
        setTimeout(onClose, 1500);
      }
    } catch (err) {
      setError("エラーが発生しました。");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-2xl border-none animate-in zoom-in duration-200 overflow-hidden bg-white rounded-[2rem]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-amber-400" />
        
        <div className="flex items-center justify-between p-8 border-b border-slate-50 bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-2 rounded-xl">
              <KeyRound className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">ログイン情報管理</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Staff Credentials</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white shadow-sm" disabled={isPending}>
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </div>

        <CardContent className="p-8">
          {isSuccess ? (
            <div className="py-10 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center ring-8 ring-emerald-50/50">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <p className="font-black text-xl text-slate-900">更新完了</p>
                <p className="text-sm text-slate-500 font-medium mt-1">パスワードを上書きしました</p>
              </div>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-8">
              {/* 現状のログイン情報 */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">対象スタッフ</p>
                    <p className="font-black text-slate-900 text-lg">{staff.name}</p>
                  </div>
                  <div className="bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 mr-1.5 uppercase">ID:</span>
                    <span className="text-[10px] font-black text-slate-900 font-mono">{staff.loginId}</span>
                  </div>
                </div>
                
                {staff.password && (
                  <div className="pt-3 border-t border-slate-200/50 flex justify-between items-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">現在のパスワード</p>
                    <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-100 shadow-inner">
                      {staff.password}
                    </span>
                  </div>
                )}
              </div>

              {/* パスワード変更フォーム */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-xs font-bold text-slate-500 flex items-center gap-2 px-1">
                    <ShieldAlert className="w-3 h-3 text-orange-500" />
                    新しいパスワードを設定する
                  </Label>
                  <Input 
                    id="new-password" 
                    name="password" 
                    type="password" 
                    placeholder="8文字以上を推奨" 
                    className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all font-bold"
                    required 
                    autoFocus
                  />
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed px-1">
                  ※変更後、スタッフ本人に新しいパスワードを伝えてください。
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-xs text-red-600 font-bold text-center">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="ghost" onClick={onClose} className="flex-1 rounded-xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                  閉じる
                </Button>
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold h-12 shadow-lg shadow-slate-200"
                >
                  {isPending ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "パスワードを上書き"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}