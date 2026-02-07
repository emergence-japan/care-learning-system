"use client";

import { useMemo, useState } from "react";
import { EditAssignmentDialog } from "./edit-assignment-dialog";

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
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // 表示する12ヶ月のリストを生成
  const months = useMemo(() => {
    const list = [];
    for (let i = 0; i < 12; i++) {
      const m = ((startMonth - 1 + i) % 12) + 1;
      list.push(m);
    }
    return list;
  }, [startMonth]);

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
        <div className="p-0 overflow-x-auto custom-scrollbar">
          <div className="min-w-[800px]">
            {/* Header Months */}
            <div className="grid grid-cols-12 border-b border-slate-100 bg-slate-50/50">
              {months.map((m, i) => (
                <div key={i} className="py-4 text-center border-r border-slate-100/50 last:border-0">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{m}月</span>
                </div>
              ))}
            </div>

            {/* Timeline Rows */}
            <div className="divide-y divide-slate-100">
              {assignments.length > 0 ? (
                assignments.map((assignment) => {
                  // スケジュールバーの開始位置と長さを計算 (月単位)
                  const startIdx = months.indexOf(new Date(assignment.startDate).getMonth() + 1);
                  const endIdx = months.indexOf(new Date(assignment.endDate).getMonth() + 1);
                  
                  const left = startIdx >= 0 ? (startIdx / 12) * 100 : 0;
                  const width = endIdx >= startIdx 
                    ? ((endIdx - startIdx + 1) / 12) * 100 
                    : (1 / 12) * 100;

                  return (
                    <div key={assignment.id} className="relative h-14 group hover:bg-slate-50 transition-colors text-left">
                      {/* Background Grid Lines */}
                      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="border-r border-slate-100/30 last:border-0 h-full" />
                        ))}
                      </div>

                      {/* The Training Bar - Clickable */}
                      <button 
                        onClick={() => setSelectedAssignment(assignment)}
                        className="absolute top-1/2 -translate-y-1/2 h-7 bg-[#1d4ed8] hover:bg-[#1e40af] rounded-md shadow-md flex items-center px-4 overflow-hidden transition-all z-10 text-left active:scale-[0.98]"
                        style={{ left: `${left}%`, width: `${width}%` }}
                      >
                        <span className="text-[10px] font-bold text-white truncate whitespace-nowrap">
                          {assignment.course.title}
                        </span>
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="py-16 text-center text-slate-300 font-bold text-sm italic">
                  計画が設定されていません
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#1d4ed8] rounded-full"></div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">予定期間（クリックで編集）</span>
          </div>
        </div>
      </div>

      {selectedAssignment && (
        <EditAssignmentDialog 
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
        />
      )}
    </>
  );
}