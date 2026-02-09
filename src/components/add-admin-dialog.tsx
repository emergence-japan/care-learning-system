"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hqCreateAdmin } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus, Loader2, ShieldCheck } from "lucide-react";

interface Props {
  facilityId: string;
  facilityName: string;
}

export function AddAdminDialog({ facilityId, facilityName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await hqCreateAdmin(formData);
      if (typeof result === "string") {
        setError(result);
      } else {
        setIsOpen(false);
      }
    } catch (err) {
      console.error(err);
      setError("エラーが発生しました。");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="rounded-full font-bold h-8 border-slate-200 hover:bg-slate-900 hover:text-white transition-all text-[10px] uppercase tracking-widest px-3"
      >
        <Plus className="w-3 h-3 mr-1.5" />
        管理者を追加
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-none overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">施設管理者を登録</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{facilityName}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white">
                <X className="w-5 h-5 text-slate-400" />
              </Button>
            </div>

            <CardContent className="p-8">
              <form action={handleSubmit} className="space-y-6">
                <input type="hidden" name="facilityId" value={facilityId} />
                
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">
                    {error}
                  </div>
                )}

                <div className="space-y-4 text-left">
                  <div className="space-y-2 text-left">
                    <Label htmlFor="admin-name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">管理者名（氏名）</Label>
                    <Input 
                      id="admin-name" 
                      name="name" 
                      placeholder="例：山田 太郎" 
                      required 
                      className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-emerald-500/20 transition-all text-sm font-medium"
                    />
                  </div>
                  
                  <div className="space-y-2 text-left">
                    <Label htmlFor="admin-login-id" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ログインID</Label>
                    <Input 
                      id="admin-login-id" 
                      name="loginId" 
                      placeholder="例：admin_yamada" 
                      required 
                      className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-emerald-500/20 transition-all text-sm font-medium"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <Label htmlFor="admin-pass" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">パスワード</Label>
                    <Input 
                      id="admin-pass" 
                      name="password" 
                      type="password"
                      required 
                      className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-emerald-500/20 transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsOpen(false)} 
                    className="flex-1 rounded-2xl font-bold text-slate-400 hover:text-slate-900 hover:bg-slate-50 h-12"
                  >
                    キャンセル
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest h-12 transition-all shadow-lg shadow-emerald-100"
                  >
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "登録を完了する"}
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
