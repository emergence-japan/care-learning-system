"use client";

import { useMemo, useTransition } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarDays, Info, Loader2, Settings2 } from "lucide-react";
import { updateFiscalYearStartMonth } from "@/lib/actions";

interface Assignment {
  id: string;
  course: {
    title: string;
  };
  startDate: Date;
  endDate: Date;
}

interface Props {
  startMonth: number; // 1-12
  assignments: Assignment[];
}

export function TrainingTimeline({ startMonth, assignments }: Props) {
  const [isPending, startTransition] = useTransition();

  // 表示する12ヶ月のリストを生成
  const months = useMemo(() => {
    const list = [];
    for (let i = 0; i < 12; i++) {
      const m = ((startMonth - 1 + i) % 12) + 1;
      list.push(m);
    }
    return list;
  }, [startMonth]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value);
    startTransition(async () => {
      await updateFiscalYearStartMonth(newMonth);
    });
  };

  return (
    <Card className="bg-white border-slate-200/60 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
            <CalendarDays className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-black text-xl text-slate-900 tracking-tight">年間研修スケジュール</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Starting Month:</span>
              <div className="relative group">
                <select 
                  className="appearance-none bg-transparent text-[10px] font-bold text-blue-600 uppercase tracking-widest border-none p-0 pr-4 focus:ring-0 cursor-pointer disabled:opacity-50"
                  value={startMonth}
                  onChange={handleMonthChange}
                  disabled={isPending}
                >
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}月</option>
                  ))}
                </select>
                {isPending ? (
                  <Loader2 className="w-3 h-3 text-blue-600 absolute right-0 top-1/2 -translate-y-1/2 animate-spin" />
                ) : (
                  <Settings2 className="w-3 h-3 text-blue-600 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold">
          <Info className="w-3 h-3" />
          実地指導（監査）提出用
        </div>
      </div>

      <div className="p-0 overflow-x-auto custom-scrollbar">
        <div className="min-w-[800px]">
          {/* Header Months */}
          <div className="grid grid-cols-12 border-b border-slate-100">
            {months.map((m, i) => (
              <div key={i} className="py-4 text-center border-r border-slate-50 last:border-0">
                <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{m}月</span>
              </div>
            ))}
          </div>

          {/* Timeline Rows */}
          <div className="divide-y divide-slate-50">
            {assignments.length > 0 ? (
              assignments.map((assignment) => {
                // スケジュールバーの開始位置と長さを計算 (簡易化のため月単位)
                const startIdx = months.indexOf(assignment.startDate.getMonth() + 1);
                const endIdx = months.indexOf(assignment.endDate.getMonth() + 1);
                
                // 開始月より前にある場合は調整が必要だが、一旦簡易実装
                const left = startIdx >= 0 ? (startIdx / 12) * 100 : 0;
                const width = endIdx >= startIdx 
                  ? ((endIdx - startIdx + 1) / 12) * 100 
                  : (1 / 12) * 100;

                return (
                  <div key={assignment.id} className="relative h-16 group hover:bg-slate-50 transition-colors">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="border-r border-slate-50/50 last:border-0 h-full" />
                      ))}
                    </div>

                    {/* The Training Bar */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-8 bg-blue-600 rounded-lg shadow-lg shadow-blue-100 flex items-center px-4 overflow-hidden group-hover:bg-blue-700 transition-all z-10"
                      style={{ left: `${left}%`, width: `${width}%` }}
                    >
                      <span className="text-[10px] font-black text-white truncate whitespace-nowrap">
                        {assignment.course.title}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center text-slate-300 font-bold text-sm italic">
                計画が設定されていません
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">予定期間</span>
        </div>
      </div>
    </Card>
  );
}
