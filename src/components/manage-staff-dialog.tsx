"use client";

import { useState, useRef } from "react";
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
import { KeyRound, Loader2, CheckCircle2, ShieldCheck, Trash2, User } from "lucide-react";
import { useFormAction } from "@/hooks/use-form-action";

type Staff = {
  id: string;
  name: string;
  loginId: string;
};

type Props = {
  staffMembers: Staff[];
  trigger: React.ReactNode;
};

export function ManageStaffDialog({ staffMembers, trigger }: Props) {
  const [selectedStaffId, setSelectedStaffId] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [shownPassword, setShownPassword] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const enteredPasswordRef = useRef("");

  const selectedStaff = staffMembers.find(s => s.id === selectedStaffId);

  const { isPending: isUpdating, error, handleSubmit: _handleUpdate } = useFormAction(
    (formData) =>
      selectedStaff ? updateUser(selectedStaff.id, formData) : Promise.resolve(undefined),
    () => {
      if (enteredPasswordRef.current) {
        setShownPassword(enteredPasswordRef.current);
        enteredPasswordRef.current = "";
      } else {
        setSuccessMessage("情報を更新しました");
        setTimeout(() => window.location.reload(), 1000);
      }
    },
  );

  const handleUpdate = (formData: FormData) => {
    enteredPasswordRef.current = (formData.get("password") as string) || "";
    return _handleUpdate(formData);
  };

  const isPending = isUpdating || isDeleting;

  const handleDelete = async () => {
    if (!selectedStaff) return;
    if (!confirm(`スタッフ「${selectedStaff.name}」を削除しますか？\nこの操作は取り消せません。`)) return;
    setIsDeleting(true);
    try {
      await deleteUser(selectedStaff.id);
      window.location.reload();
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="bg-white border-none text-slate-600 rounded-[2rem] sm:max-w-[450px] p-0 overflow-hidden shadow-2xl focus:outline-none flex flex-col max-h-[90vh]">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-slate-700 to-slate-900" />
        
        <DialogHeader className="p-8 pb-4 border-b border-slate-50 bg-slate-50/30 shrink-0">
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

        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
          
          <div className="space-y-3">
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest">対象スタッフを選択</Label>
            <Select value={selectedStaffId} onValueChange={(val) => { setSelectedStaffId(val); setSuccessMessage(null); }}>
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
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 text-slate-400">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Login ID</p>
                    <p className="font-mono font-black text-slate-900 text-lg">{selectedStaff.loginId}</p>
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
                      type="password"
                      placeholder="New Password"
                      className="h-11 rounded-xl bg-white border-slate-200 font-mono font-bold"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isPending} className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-bold mt-4 shadow-lg shadow-slate-200">
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "情報を更新する"}
                </Button>
              </form>

              {shownPassword && (
                <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-bold">パスワードを更新しました</span>
                  </div>
                  <div className="bg-white border border-emerald-100 rounded-xl p-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">新しいパスワード</p>
                      <p className="font-mono font-black text-slate-900 text-lg tracking-widest">{shownPassword}</p>
                    </div>
                    <KeyRound className="w-5 h-5 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-[10px] text-amber-600 font-bold leading-relaxed">
                    ※ この画面を閉じると二度と確認できません。スタッフ本人に伝えてください。
                  </p>
                </div>
              )}
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