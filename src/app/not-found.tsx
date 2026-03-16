import Link from "next/link";
import { BookOpen, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center shadow-xl">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">404 Not Found</p>
          <h1 className="text-3xl font-black text-slate-900">ページが見つかりません</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm transition-colors shadow-lg"
        >
          <Home className="w-4 h-4" />
          トップページへ戻る
        </Link>
      </div>
    </div>
  );
}
