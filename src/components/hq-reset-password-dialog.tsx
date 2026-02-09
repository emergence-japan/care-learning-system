"use client";

import { useState } from "react";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Loader2, CheckCircle2 } from "lucide-react";
import { hqUpdateUserPassword } from "@/lib/actions";

export function HQResetPasswordDialog({ userId, userName }: { userId: string, userName: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const error = await hqUpdateUserPassword(userId, formData);

    if (error) {
      setMessage(error);
      setIsPending(false);
    } else {
      setMessage("success");
      setTimeout(() => {
        setOpen(false);
        setMessage(null);
        setIsPending(false);
      }, 1500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-blue-400 hover:bg-white/10 rounded-lg">
          <KeyRound className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] bg-[#1a1010] border-white/10 text-white rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-black">
            <KeyRound className="w-5 h-5 text-blue-400" />
            パスワードの再設定
          </DialogTitle>
        </DialogHeader>

        {message === "success" ? (
          <div className="py-10 flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="font-bold text-emerald-500">パスワードを更新しました</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">対象ユーザー</p>
                <p className="text-sm font-bold">{userName}</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" title="新しいパスワード" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                  新しいパスワード
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="4文字以上で入力"
                  required
                  className="h-12 bg-white/5 border-white/10 focus:border-blue-500 rounded-xl text-white"
                />
              </div>

              {message && (
                <p className="text-xs font-bold text-red-400 bg-red-400/10 p-3 rounded-lg text-center">
                  {message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "パスワードを確定する"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
