"use client";

import { useState } from "react";
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
import { Edit2, Loader2, User } from "lucide-react";

type Props = {
  user: {
    id: string;
    name: string;
    loginId: string;
  };
};

export function HQEditUserDialog({ user }: Props) {
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await updateUser(user.id, formData);
      if (typeof result === "string") {
        setError(result);
      } else {
        setIsOpen(false);
        window.location.reload();
      }
    } catch (error) {
      setError("エラーが発生しました。");
    } finally {
      setIsPending(false);
    }
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
              type="text"
              placeholder="Leave blank to keep current"
              className="h-12 rounded-xl bg-slate-50 border-slate-200 font-mono font-bold focus:ring-emerald-500"
            />
          </div>

          {error && <p className="text-xs font-bold text-red-500">{error}</p>}

          <div className="pt-4 flex gap-3">
            <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="flex-1 rounded-xl font-bold h-12">
              キャンセル
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold h-12 shadow-lg shadow-emerald-100"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "更新する"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
