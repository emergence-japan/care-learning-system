
"use strict";
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "メールアドレスまたはパスワードが正しくありません。";
        default:
          return "エラーが発生しました。もう一度お試しください。";
      }
    }
    // 重要: リダイレクトエラー（成功時）を再スローして Next.js に処理させる
    throw error;
  }
}
