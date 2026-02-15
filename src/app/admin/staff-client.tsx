"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { ActionPlanDialog } from "@/components/action-plan-dialog";
import { DeleteButton } from "@/components/delete-button";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type Staff = {
  id: string;
  name: string;
  loginId: string;
  password?: string;
  enrollments: { status: string; courseId: string; actionPlan: string | null; completedAt: Date | null; course: { title: string } }[];
};

type Assignment = {
  id: string;
  courseId: string;
  course: { title: string };
  endDate: Date;
};

export function StaffClient({ staffMembers, currentAssignments }: { staffMembers: Staff[], currentAssignments: Assignment[] }) {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse table-fixed">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-0 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-tighter sticky left-0 bg-slate-50 z-20 w-[60px] border-r border-slate-100 text-center">
              氏名
            </th>
            <th className="px-0 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-tighter sticky left-[60px] bg-slate-50 z-20 w-[50px] border-r border-slate-100 text-center">
              進捗
            </th>
            {currentAssignments.map(assign => (
              <th key={assign.id} className="px-1 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-wider w-[80px] border-r border-slate-100 text-center">
                <div className="truncate text-slate-700 px-1" title={assign.course.title}>{assign.course.title}</div>
                <div className="text-[8px] text-slate-400 mt-1 font-normal">
                  ~ {format(assign.endDate, 'MM/dd', { locale: ja })}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {staffMembers.length > 0 ? (
            staffMembers.map((staff) => {
              const completedCount = staff.enrollments.filter(e => 
                e.status === 'COMPLETED' && currentAssignments.some(a => a.courseId === e.courseId)
              ).length;
              const totalCount = currentAssignments.length;
              const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

              return (
                <tr key={staff.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-0 py-4 font-bold text-sm text-slate-900 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors border-r border-slate-100 z-10 shadow-[4px_0_10px_-2px_rgba(0,0,0,0.05)] w-[60px]">
                    <div className="truncate text-sm font-bold w-full text-center px-0.5" title={staff.name}>{staff.name}</div>
                  </td>
                  <td className="px-0 py-4 sticky left-[60px] bg-white group-hover:bg-slate-50 transition-colors border-r border-slate-100 z-10 shadow-[4px_0_10px_-2px_rgba(0,0,0,0.05)] w-[50px]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-baseline gap-0.5 font-bold">
                        <span className="text-sm font-black text-slate-900 tabular-nums">{completedCount}</span>
                        <span className="text-[10px] text-slate-400">/{totalCount}</span>
                      </div>
                      <div className={`text-[10px] font-black tabular-nums mt-1 ${progress === 100 ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {progress}%
                      </div>
                    </div>
                  </td>
                  {currentAssignments.map(assign => {
                    const enrollment = staff.enrollments.find(e => e.courseId === assign.courseId);
                    const isCompleted = enrollment?.status === "COMPLETED";
                    const isOverdue = !isCompleted && new Date() > new Date(assign.endDate);
                    const daysLeft = Math.ceil((new Date(assign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                    return (
                      <td key={assign.id} className="px-1 py-4 text-center align-middle border-r border-slate-100">
                        {isCompleted ? (
                          <ActionPlanDialog 
                            staffName={staff.name}
                            courseTitle={assign.course.title}
                            content={enrollment.actionPlan || "アクションプランは未入力です"}
                            completedAt={enrollment.completedAt}
                            trigger={
                              <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform cursor-pointer group/btn mx-auto">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover/btn:text-emerald-600" />
                                <span className="text-[9px] font-bold text-emerald-600/70 group-hover/btn:text-emerald-700 whitespace-nowrap">受講済</span>
                              </button>
                            }
                          />
                        ) : isOverdue ? (
                          <div className="flex flex-col items-center gap-1">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <span className="text-[9px] font-bold text-red-500/70 whitespace-nowrap">期限切れ</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                            <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex items-center justify-center text-[9px] font-mono text-slate-400">
                              {daysLeft > 0 ? daysLeft : 0}
                            </div>
                            <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">あと {daysLeft} 日</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={currentAssignments.length + 2} className="p-8 text-center text-slate-400 font-bold text-sm sticky left-0 bg-white">
                スタッフが登録されていないか、研修が割り当てられていません
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
