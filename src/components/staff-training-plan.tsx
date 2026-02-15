"use client";

import { useMemo } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Assignment {
  courseId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

interface Props {
  assignments: Assignment[];
  startMonth: number;
}

export function StaffTrainingPlan({ assignments, startMonth }: Props) {
  const months = useMemo(() => {
    const list = [];
    for (let i = 0; i < 12; i++) {
      const m = ((startMonth - 1 + i) % 12) + 1;
      list.push(m);
    }
    return list;
  }, [startMonth]);

  const today = new Date();
  const currentMonthIdx = months.indexOf(today.getMonth() + 1);

  return (
    <div className="w-full">
      {/* 計画表の見出し - マージンを極限までカット */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <div className="w-1 h-4 bg-slate-900 rounded-full" />
        <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Annual Training Schedule</h3>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="w-48 p-3 text-left text-[10px] font-black text-slate-400 uppercase border-r border-slate-200">研修科目</th>
                {months.map((m, i) => (
                  <th key={i} className={cn(
                    "p-2 text-center text-[10px] font-black border-r border-slate-100 last:border-0",
                    i === currentMonthIdx ? "bg-indigo-50 text-indigo-600" : "text-slate-400"
                  )}>
                    {m}月
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {assignments.length > 0 ? (
                assignments.map((assignment) => {
                  const startIdx = months.indexOf(new Date(assignment.startDate).getMonth() + 1);
                  const endIdx = months.indexOf(new Date(assignment.endDate).getMonth() + 1);
                  const isCompleted = assignment.status === 'COMPLETED';

                  return (
                    <tr key={assignment.courseId} className="group hover:bg-slate-50/50 transition-colors h-10">
                      <td className="p-3 border-r border-slate-200 bg-white group-hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          )}
                          <span className={cn(
                            "text-[11px] font-bold leading-tight line-clamp-1",
                            isCompleted ? "text-slate-400" : "text-slate-700"
                          )}>
                            {assignment.title}
                          </span>
                        </div>
                      </td>
                      <td colSpan={12} className="p-0 relative h-10 bg-slate-50/30">
                        {/* 背景の縦線グリッド */}
                        <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="border-r border-slate-200/40 last:border-0 h-full" />
                          ))}
                        </div>
                        
                        {/* 期間を示すバー */}
                        {startIdx !== -1 && endIdx !== -1 && (
                          <div 
                            className={cn(
                              "absolute top-1/2 -translate-y-1/2 h-4 rounded-full shadow-sm z-10",
                              isCompleted ? "bg-emerald-500" : "bg-indigo-600"
                            )}
                            style={{ 
                              left: `calc(${(startIdx / 12) * 100}% + 2%)`, 
                              width: `calc(${((endIdx - startIdx + 1) / 12) * 100}% - 4%)` 
                            }}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={13} className="p-10 text-center text-slate-300 text-xs font-bold uppercase tracking-widest italic">
                    No active assignments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* 凡例 - 最小限の高さ */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-indigo-600" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Scheduled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
