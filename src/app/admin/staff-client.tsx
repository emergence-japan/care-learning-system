"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { ActionPlanDialog } from "@/components/action-plan-dialog";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type Staff = {
  id: string;
  name: string;
  loginId: string;
  enrollments: any[];
};

type Assignment = {
  id: string;
  courseId: string;
  course: { title: string };
  endDate: string; // ISO String
};

export function StaffClient({ staffMembers = [], currentAssignments = [] }: { staffMembers: any[], currentAssignments: any[] }) {
  
  // 1. 研修が1つもない場合のクリーンな表示
  if (currentAssignments.length === 0) {
    return (
      <div className="p-20 text-center space-y-4 bg-white rounded-[2rem]">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100">
          <AlertCircle className="w-8 h-8 text-slate-300" />
        </div>
        <p className="text-slate-500 font-bold">割り当てられた研修がありません</p>
        <p className="text-slate-400 text-xs">「研修を割り当てる」ボタンから、実施する研修を設定してください。</p>
      </div>
    );
  }

  // 2. 研修がある場合のテーブル表示
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse table-fixed">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-0 py-4 font-bold text-[10px] text-slate-400 uppercase sticky left-0 bg-slate-50 z-20 w-[60px] border-r border-slate-100 text-center">
              氏名
            </th>
            <th className="px-0 py-4 font-bold text-[10px] text-slate-400 uppercase sticky left-[60px] bg-slate-50 z-20 w-[50px] border-r border-slate-100 text-center">
              進捗
            </th>
            {currentAssignments.map(assign => (
              <th key={assign.id} className="px-1 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-wider w-[80px] border-r border-slate-100 text-center">
                <div className="truncate text-slate-700 px-1" title={assign.course?.title}>{assign.course?.title || "研修"}</div>
                <div className="text-[8px] text-slate-400 mt-1 font-normal">
                  ~ {assign.endDate ? format(new Date(assign.endDate), 'MM/dd', { locale: ja }) : "-"}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {staffMembers.length > 0 ? (
            staffMembers.map((staff) => {
              const enrollments = staff.enrollments || [];
              const completedCount = enrollments.filter((e: any) => 
                e.status === 'COMPLETED' && currentAssignments.some(a => a.courseId === e.courseId)
              ).length;
              const totalCount = currentAssignments.length;
              const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

              return (
                <tr key={staff.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-0 py-4 font-bold text-sm text-slate-900 sticky left-0 bg-white group-hover:bg-slate-50 border-r border-slate-100 z-10 w-[60px] text-center">
                    <div className="truncate px-1" title={staff.name}>{staff.name}</div>
                  </td>
                  <td className="px-0 py-4 sticky left-[60px] bg-white group-hover:bg-slate-50 border-r border-slate-100 z-10 w-[50px]">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-sm font-black text-slate-900">{completedCount}<span className="text-[10px] text-slate-400 font-normal">/{totalCount}</span></div>
                      <div className={`text-[10px] font-black ${progress === 100 ? 'text-emerald-600' : 'text-slate-500'}`}>{progress}%</div>
                    </div>
                  </td>
                  {currentAssignments.map(assign => {
                    const enrollment = enrollments.find((e: any) => e.courseId === assign.courseId);
                    const isCompleted = enrollment?.status === "COMPLETED";
                    const assignEndDate = assign.endDate ? new Date(assign.endDate) : null;
                    const isOverdue = !isCompleted && assignEndDate && new Date() > assignEndDate;
                    const daysLeft = assignEndDate ? Math.ceil((assignEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;

                    return (
                      <td key={assign.id} className="px-1 py-4 text-center align-middle border-r border-slate-100">
                        {isCompleted ? (
                          <ActionPlanDialog 
                            staffName={staff.name}
                            courseTitle={assign.course?.title || ""}
                            content={enrollment.actionPlan || "アクションプラン未入力"}
                            completedAt={enrollment.completedAt}
                            trigger={
                              <button className="flex flex-col items-center gap-1 mx-auto hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <span className="text-[9px] font-bold text-emerald-600/70">受講済</span>
                              </button>
                            }
                          />
                        ) : isOverdue ? (
                          <div className="flex flex-col items-center gap-1">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <span className="text-[9px] font-bold text-red-500/70">期限切れ</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-1 opacity-40">
                            <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex items-center justify-center text-[9px] font-mono text-slate-400">
                              {daysLeft > 0 ? daysLeft : 0}
                            </div>
                            <span className="text-[9px] font-bold text-slate-400">あと {daysLeft} 日</span>
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
              <td colSpan={currentAssignments.length + 2} className="p-12 text-center text-slate-400 font-bold text-sm">
                スタッフがまだ登録されていません
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
