"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hqCreateFacility } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus, Loader2, Building2 } from "lucide-react";

interface Props {
  disabled?: boolean;
}

export function AddFacilityDialog({ disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await hqCreateFacility(formData);
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
        disabled={disabled}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 h-11 border-none shadow-md shadow-blue-100 transition-all flex items-center gap-2 disabled:opacity-50 disabled:bg-slate-300 disabled:shadow-none"
      >
        <Plus className="w-4 h-4" />
        <span>施設を追加</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-none overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">新しい施設を登録</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">法人傘下の施設を追加</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white">
                <X className="w-5 h-5 text-slate-400" />
              </Button>
            </div>

            <CardContent className="p-8">
              <form action={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100 animate-in fade-in duration-300">
                    {error}
                  </div>
                )}

                <div className="space-y-4 text-left">
                  <div className="space-y-2 text-left">
                    <Label htmlFor="fac-name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">施設名</Label>
                    <Input 
                      id="fac-name" 
                      name="name" 
                      placeholder="例：ケアコア第2施設" 
                      required 
                      className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-blue-500/20 transition-all text-sm font-medium"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <Label htmlFor="fac-type" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">業態</Label>
                    <select 
                      id="fac-type"
                      name="type"
                      required
                      className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-blue-500/20 transition-all text-sm font-bold px-4"
                    >
                      <option value="">業態を選択してください</option>
                      <option value="訪問介護">訪問介護</option>
                      <option value="訪問入浴介護">訪問入浴介護</option>
                      <option value="訪問看護">訪問看護</option>
                      <option value="訪問リハビリ">訪問リハビリ</option>
                      <option value="通所介護">通所介護</option>
                      <option value="通所リハビリ">通所リハビリ</option>
                      <option value="居宅介護支援">居宅介護支援</option>
                      <option value="福祉用具貸与">福祉用具貸与</option>
                      <option value="小規模多機能型居宅介護">小規模多機能型居宅介護</option>
                      <option value="認知症対応型共同生活介護">認知症対応型共同生活介護</option>
                      <option value="特定施設入居者生活介護">特定施設入居者生活介護</option>
                      <option value="介護老人福祉施設">介護老人福祉施設</option>
                      <option value="介護老人保健施設">介護老人保健施設</option>
                      <option value="介護医療院">介護医療院</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2 text-left">
                    <Label htmlFor="fac-max-staff" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">登録スタッフ枠（初期設定）</Label>
                    <Input 
                      id="fac-max-staff" 
                      name="maxStaff" 
                      type="number" 
                      defaultValue={20} 
                      min={1} 
                      required 
                      className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-blue-500/20 transition-all text-sm font-medium tabular-nums"
                    />
                    <p className="text-[9px] text-slate-400 font-bold mt-1 ml-1 leading-relaxed">
                      ※ 施設ごとに登録可能なスタッフの上限人数を設定します。
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsOpen(false)} 
                    className="flex-1 rounded-2xl font-bold text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all h-12"
                  >
                    キャンセル
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest h-12 transition-all shadow-lg shadow-slate-200"
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
