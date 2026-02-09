"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser, deleteUser } from "@/lib/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, KeyRound, Loader2, CheckCircle2, ShieldCheck, Trash2, User } from "lucide-react";

type Staff = {
  id: string;
  name: string;
  loginId: string;
  password?: string;
};

type Props = {
  staffMembers: Staff[];
  trigger: React.ReactNode;
};

export function ManageStaffDialog({ staffMembers, trigger }: Props) {
  const [selectedStaffId, setSelectedStaffId] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedStaff = staffMembers.find(s => s.id === selectedStaffId);

  const handleUpdate = async (formData: FormData) => {
    if (!selectedStaff) return;
    setIsPending(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const result = await updateUser(selectedStaff.id, formData);
      if (typeof result === "string") {
        setError(result);
      } else {
        setSuccessMessage("情報を更新しました");
        // 名前やログインIDが変わるため、少し待ってからリロード
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      setError("エラーが発生しました。");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedStaff) return;
    if (!confirm(`スタッフ「${selectedStaff.name}」を削除しますか？\nこの操作は取り消せません。`)) return;

    setIsPending(true);
    try {
      await deleteUser(selectedStaff.id);
      setSuccessMessage("スタッフを削除しました");
      setSelectedStaffId("");
      window.location.reload();
    } catch (err) {
      setError("削除に失敗しました。");
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="bg-white border-none text-slate-600 rounded-[2rem] sm:max-w-[450px] p-0 overflow-hidden shadow-2xl focus:outline-none">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-slate-700 to-slate-900" />
        
        <DialogHeader className="p-8 pb-4 border-b border-slate-50 bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-2.5 rounded-xl text-slate-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black text-slate-900 leading-tight">スタッフ管理</DialogTitle>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Staff Management Console</p>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 space-y-8">
          
          <div className="space-y-3">
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">対象スタッフを選択</Label>
            <Select value={selectedStaffId} onValueChange={(val) => { setSelectedStaffId(val); setSuccessMessage(null); setError(null); }}>
              <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-bold focus:ring-slate-200">
                <SelectValue placeholder="スタッフを選択してください" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {staffMembers.map(staff => (
                  <SelectItem key={staff.id} value={staff.id} className="font-medium">
                    {staff.name} <span className="text-slate-400 text-xs ml-2">({staff.loginId})</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedStaff ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4 relative overflow-hidden">
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 text-slate-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Login ID</p>
                      <p className="font-mono font-black text-slate-900 text-lg">{selectedStaff.loginId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Current Password</p>
                    <p className="font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-100 inline-block mt-1">
                      {selectedStaff.password || '********'}
                    </p>
                  </div>
                </div>
              </div>

              <form action={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className="text-xs font-bold text-slate-500">氏名</Label>
                  <Input 
                    id="edit-name" 
                    name="name" 
                    defaultValue={selectedStaff.name}
                    className="h-11 rounded-xl bg-white border-slate-200 font-bold"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-login-id" className="text-xs font-bold text-slate-500">ログインID</Label>
                  <Input 
                    id="edit-login-id" 
                    name="loginId" 
                    defaultValue={selectedStaff.loginId}
                    className="h-11 rounded-xl bg-white border-slate-200 font-mono font-bold"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-xs font-bold text-slate-500">新しいパスワード (変更する場合のみ)</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="new-password" 
                      name="password" 
                      type="text" 
                      placeholder="New Password" 
                      className="h-11 rounded-xl bg-white border-slate-200 font-mono font-bold"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isPending} className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-bold mt-4 shadow-lg shadow-slate-200">
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "情報を更新する"}
                </Button>
              </form>

              {successMessage && (
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl flex items-center gap-2 text-xs font-bold justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                  {successMessage}
                </div>
              )}
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-bold text-center">
                  {error}
                </div>
              )}

              <div className="pt-6 border-t border-slate-100">
                <Button 
                  variant="ghost" 
                  onClick={handleDelete} 
                  disabled={isPending}
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 h-11 rounded-xl font-bold flex items-center gap-2 justify-center group"
                >
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  このスタッフを削除する
                </Button>
              </div>

            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-sm font-medium bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              スタッフを選択すると詳細が表示されます
            </div>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}