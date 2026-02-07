"use client";

import { useState } from "react";
import { KeyRound, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/delete-button";
import { ResetPasswordDialog } from "@/components/reset-password-dialog";
import { StaffIncompleteCoursesDialog } from "@/components/staff-incomplete-courses-dialog";

type Staff = {
  id: string;
  name: string;
  loginId: string;
  enrollments: { status: string; courseId: string; course: { title: string } }[];
};

type Assignment = {
  courseId: string;
  course: { title: string };
};

export function StaffClient({ staffMembers, currentAssignments }: { staffMembers: Staff[], currentAssignments: Assignment[] }) {
  const [resetStaff, setResetStaff] = useState<Staff | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">氏名 / ログインID</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">初期パスワード</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 text-center">受講進捗</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 text-right">管理</th>
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
                  <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{staff.name}</div>
                          <div className="text-[10px] text-slate-500 font-medium">ID: {staff.loginId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                        {(staff as any).password}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col items-center gap-1.5 min-w-[120px]">
                        <div className="flex justify-between w-full text-[10px] font-bold text-slate-600">
                          <span>{completedCount} / {totalCount}</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-700 ${progress === 100 ? 'bg-emerald-500' : 'bg-slate-900'}`} 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <StaffIncompleteCoursesDialog 
                          staffName={staff.name}
                          incompleteCourses={currentAssignments
                            .filter(a => !staff.enrollments.some(e => e.courseId === a.courseId && e.status === 'COMPLETED'))
                            .map(a => ({ id: a.courseId, title: a.course.title }))
                          }
                        />
                        <Button 
                          onClick={() => setResetStaff(staff as any)}
                          variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-slate-900 hover:bg-white shadow-none transition-all"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                        </Button>
                        <DeleteButton id={staff.id} name={staff.name} type="user" size="icon" className="w-8 h-8 text-slate-400 hover:text-red-600 hover:bg-white shadow-none transition-all" />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm font-medium">
                  登録されているスタッフはいません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {resetStaff && (
        <ResetPasswordDialog 
          staff={resetStaff} 
          onClose={() => setResetStaff(null)} 
        />
      )}
    </>
  );
}