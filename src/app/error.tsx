"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center shadow-xl border border-red-100">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Error</p>
          <h1 className="text-3xl font-black text-slate-900">{t("unexpectedError")}</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            {t("unexpectedErrorDescription")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm transition-colors shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            {t("retry")}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-2xl font-bold text-sm transition-colors shadow border border-slate-200"
          >
            <Home className="w-4 h-4" />
            {t("backToTop")}
          </Link>
        </div>
      </div>
    </div>
  );
}
