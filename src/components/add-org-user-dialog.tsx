"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrgUser } from "@/lib/actions";
import { Card, CardContent } from "@/components/ui/card";
import { X, UserPlus, Loader2 } from "lucide-react";

type Props = {
  corporationId: string;
  facilityId: string | null;
  orgName: string;
  role: "HQ" | "ADMIN";
  onClose: () => void;
};

export function AddOrgUserDialog({ corporationId, facilityId, orgName, role, onClose }: Props) {
  const roleName = role === "HQ" ? "法人本部" : "施設長";
  const [errorMessage, dispatch, isPending] = useActionState(
    createOrgUser,
    undefined,
  );

  // 成功時（errorMessageがなくて処理が終わり、かつpendingでない場合）に閉じる
  // 簡易的な実装として、フォームが送信されエラーがなければ閉じる
  useEffect(() => {
    if (!isPending && errorMessage === undefined && document.activeElement instanceof HTMLElement) {
      // 成功したとみなして少し待ってから閉じる（再描画待ち）
    }
  }, [isPending, errorMessage]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-none animate-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-red-600" />
            <h3 className="font-bold text-lg">{orgName} に{roleName}を追加</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>
        <CardContent className="p-6">
          <form action={async (formData) => {
            const res = await dispatch(formData);
            // エラーがなければ（undefinedが返れば）閉じる
            if (!res) onClose();
          }} className="space-y-4">
            <input type="hidden" name="corporationId" value={corporationId} />
            <input type="hidden" name="facilityId" value={facilityId || ""} />
            <input type="hidden" name="role" value={role} />

            <div className="space-y-2">
              <Label htmlFor="user-name">氏名</Label>
              <Input id="user-name" name="name" placeholder="管理者 太郎" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email">メールアドレス</Label>
              <Input id="user-email" name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-password">初期パスワード</Label>
              <Input id="user-password" name="password" type="password" required />
            </div>

            {errorMessage && (
              <p className="text-sm text-red-500 font-medium text-center">{errorMessage}</p>
            )}

            <div className="pt-4 flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
                キャンセル
              </Button>
              <Button 
                type="submit" 
                disabled={isPending}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold"
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "登録する"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
