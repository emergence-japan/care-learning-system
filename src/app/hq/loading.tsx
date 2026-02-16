export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#120a0a] gap-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-800 border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center font-black text-[10px] text-white">
          HQ
        </div>
      </div>
      <div className="space-y-2 text-center">
        <p className="text-sm font-black text-white tracking-tighter animate-pulse">法人データを集計中...</p>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Synchronizing Organizations</p>
      </div>
    </div>
  );
}
