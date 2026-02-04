"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateStaffPassword } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { X, KeyRound, Loader2, CheckCircle2 } from "lucide-react";

type Props = {
  staff: {
    id: string;
    name: string;
    loginId: string;
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-2xl border-none animate-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-orange-600" />
            <h3 className="font-bold text-lg">パスワードを再設定</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full" disabled={isPending}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <CardContent className="p-6">
          {isSuccess ? (
            <div className="py-8 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <p className="font-bold text-slate-900">パスワードを更新しました</p>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">対象スタッフ</p>
                <p className="font-black text-slate-900">{staff.name}</p>
                <p className="text-xs text-slate-500">ID: {staff.loginId}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">新しいパスワード</Label>
                <Input 
                  id="new-password" 
                  name="password" 
                  type="password" 
                  placeholder="新しいパスワードを入力" 
                  required 
                  autoFocus
                />
                <p className="text-[10px] text-slate-400">※スタッフ本人にこのパスワードを伝えてください。</p>
              </div>

              {error && (
                <p className="text-sm text-red-500 font-medium text-center">{error}</p>
              )}

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
                  キャンセル
                </Button>
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "上書きする"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
