"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerStaff } from "@/lib/actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserPlus, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function RegisterStaffForm({ disabled }: { disabled?: boolean }) {
  const [errorMessage, dispatch, isPending] = useActionState(
    async (state: string | undefined, formData: FormData) => {
      return await registerStaff(formData);
    },
    undefined,
  );
  
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    dispatch(formData);
    // 成功判定は revalidatePath による画面遷移やリセットで表現されるが、
    // ここでは簡易的に成功メッセージを表示するためのフラグ管理を行う
    // (useActionState の戻り値が undefined かつエラーがなければ成功とみなす)
  };

  return (
    <Card className="border-zinc-100 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="bg-zinc-50/50">
        <div className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg">新規スタッフ登録</CardTitle>
        </div>
        <CardDescription>
          新しいスタッフのアカウントを作成します。パスワードは後で変更可能です。
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">氏名</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="介護 太郎" 
              required 
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="staff@example.com" 
              required 
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">初期パスワード</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="6文字以上のパスワード" 
              required 
              className="h-11 rounded-xl"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
          )}

          {disabled && (
            <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-start gap-2 text-red-600 text-xs font-bold mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              法人全体のスタッフ登録枠が上限に達しています。新しいスタッフを登録するには管理者に枠の拡大を依頼してください。
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isPending || disabled}
            className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:bg-zinc-400 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                登録中...
              </>
            ) : (
              "スタッフを登録する"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
