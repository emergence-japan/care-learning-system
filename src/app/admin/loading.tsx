export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center font-black text-[10px] text-blue-600">
          Admin
        </div>
      </div>
      <div className="space-y-2 text-center">
        <p className="text-sm font-black text-slate-900 tracking-tighter animate-pulse">施設状況を読み込み中...</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Preparing Analytics</p>
      </div>
    </div>
  );
}
