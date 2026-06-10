"use server";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const { signIn } = await import("@/auth");
  try {
    await signIn("credentials", {
      loginId: formData.get("loginId"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    const e = error as {
      digest?: unknown;
      type?: unknown;
      cause?: { err?: { message?: unknown } };
    };
    // 成功時のリダイレクトは NextAuth が throw する仕組みのため、そのまま再 throw する
    if (typeof e?.digest === "string" && e.digest.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    if (e?.type === "CredentialsSignin") {
      return "ログインIDまたはパスワードが正しくありません。";
    }
    // authorize 内で throw したメッセージ（ロックアウト・利用停止など）をユーザーに表示する
    const causeMessage = e?.cause?.err?.message;
    if (typeof causeMessage === "string" && causeMessage.length > 0) {
      return causeMessage;
    }
    throw error;
  }
}
