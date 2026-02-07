"use client";

import { useTransition } from "react";
import { updateFiscalYearStartMonth } from "@/lib/actions";
import { Loader2 } from "lucide-react";

interface Props {
  currentMonth: number;
}

export function FiscalYearSelector({ currentMonth }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    startTransition(async () => {
      await updateFiscalYearStartMonth(newMonth);
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-full px-4 h-9 flex items-center gap-2 shadow-sm relative">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">年度開始</span>
      <select 
        defaultValue={currentMonth}
        onChange={handleChange}
        disabled={isPending}
        className="bg-transparent text-xs font-bold text-slate-900 focus:ring-0 border-none p-0 pr-1 cursor-pointer disabled:opacity-50"
      >
        {[...Array(12)].map((_, i) => (
          <option key={i + 1} value={i + 1}>{i + 1}月</option>
        ))}
      </select>
      {isPending && (
        <div className="absolute right-2">
          <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
        </div>
      )}
    </div>
  );
}
