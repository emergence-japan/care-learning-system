"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createInquiry } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquarePlus, X, Send, Loader2 } from "lucide-react";

export function InquiryForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      const result = await createInquiry(formData);
      if (typeof result === "string") {
        setError(result);
      } else {
        setIsOpen(false);
      }
    });
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-14 font-black shadow-xl shadow-slate-200 flex items-center gap-3 active:scale-95 transition-all"
      >
        <MessageSquarePlus className="w-5 h-5" />
        <span>新規問い合わせ</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl border-none overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <MessageSquarePlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-xl text-slate-900 tracking-tight">新規問い合わせ</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Submit Support Request</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white shadow-sm">
                <X className="w-6 h-6 text-slate-300" />
              </Button>
            </div>

            <CardContent className="p-8">
              <form action={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">件名</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="相談したい内容のタイトルを入力してください" 
                    required 
                    className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:border-blue-600 transition-all font-bold text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">お問い合わせ内容</Label>
                  <Textarea 
                    id="content" 
                    name="content" 
                    placeholder="具体的な相談内容、不具合、要望などをご記入ください。" 
                    required 
                    className="min-h-[200px] rounded-[2rem] border-slate-100 bg-slate-50/50 focus:bg-white focus:border-blue-600 transition-all font-medium text-base p-6 leading-relaxed"
                  />
                </div>

                {error && <p className="text-xs font-black text-red-500 text-center">{error}</p>}

                <div className="pt-4 flex gap-4">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsOpen(false)}
                    className="flex-1 h-14 rounded-2xl font-black text-slate-400 hover:text-slate-600"
                  >
                    キャンセル
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isPending}
                    className="flex-[2] h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-100 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isPending ? (
                      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                    ) : (
                      <>
                        <span>送信する</span>
                        <Send className="w-5 h-5" />
                      </>
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
