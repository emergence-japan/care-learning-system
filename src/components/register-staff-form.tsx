"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerStaff } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Loader2, X, AlertCircle, Plus } from "lucide-react";

export function RegisterStaffForm({ disabled }: { disabled?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, dispatch, isPending] = useActionState(
    async (state: string | undefined, formData: FormData) => {
      const error = await registerStaff(formData);
      if (!error) {
        setIsOpen(false);
      }
      return error;
    },
    undefined,
  );

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-full px-5 h-9 font-bold text-xs flex items-center gap-2 shadow-sm disabled:opacity-50"
      >
        <Plus className="w-4 h-4" />
        <span>スタッフを追加</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl border-none overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1d4ed8] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <UserPlus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 tracking-tight">新規スタッフ登録</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Add New Staff</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white">
                <X className="w-5 h-5 text-slate-400" />
              </Button>
            </div>

            <CardContent className="p-8 space-y-6">
              <form action={dispatch} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-bold text-slate-700">氏名</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="介護 太郎" 
                    required 
                    className="h-11 rounded-xl border-slate-200 focus:border-[#1d4ed8] focus:ring-0"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="loginId" className="text-xs font-bold text-slate-700">ログインID</Label>
                  <Input 
                    id="loginId" 
                    name="loginId" 
                    placeholder="例: tanaka_taro" 
                    required 
                    className="h-11 rounded-xl border-slate-200 focus:border-[#1d4ed8] focus:ring-0"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-bold text-slate-700">パスワード</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="text" 
                    placeholder="例: 123456" 
                    required 
                    className="h-11 rounded-xl border-slate-200 focus:border-[#1d4ed8] focus:ring-0 font-mono"
                  />
                  <p className="text-[9px] text-slate-400 leading-tight">※パスワードは管理者が決定します。スタッフに伝えてください。</p>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-600 text-[11px] font-bold border border-red-100 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {errorMessage}
                  </div>
                )}

                <div className="pt-4 flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1 h-12 rounded-xl border-slate-200 text-slate-500 font-bold text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    キャンセル
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="flex-[2] h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                    ) : (
                      "スタッフを登録"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}