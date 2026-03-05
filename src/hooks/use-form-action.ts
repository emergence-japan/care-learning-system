"use client";

import { useState } from "react";

/**
 * サーバーアクションのフォーム送信に共通するボイラープレートを排除するフック。
 * アクションが string を返した場合はエラーとして扱い、void/null の場合は成功として onSuccess を呼ぶ。
 */
export function useFormAction(
  action: (formData: FormData) => Promise<string | void | null | undefined>,
  onSuccess?: () => void,
) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setError(null);
    try {
      const result = await action(formData);
      if (typeof result === "string") {
        setError(result);
      } else {
        onSuccess?.();
      }
    } catch {
      setError("エラーが発生しました。");
    } finally {
      setIsPending(false);
    }
  };

  const clearError = () => setError(null);

  return { isPending, error, handleSubmit, clearError };
}
