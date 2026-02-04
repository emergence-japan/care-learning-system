"use client";

import { useState } from "react";
import { KeyRound, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/delete-button";
import { ResetPasswordDialog } from "@/components/reset-password-dialog";

type Staff = {
  id: string;
  name: string;
  loginId: string;
  enrollments: { status: string; courseId: string }[];
};

type Assignment = {
  courseId: string;
};

export function StaffClient({ staffMembers, currentAssignments }: { staffMembers: Staff[], currentAssignments: Assignment[] }) {
  const [resetStaff, setResetStaff] = useState<Staff | null>(null);

  return (
    <>
      <section className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-200/60 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-slate-400" />
          <h3 className="font-black text-xl text-slate-900 tracking-tight">スタッフ別受講モニタリング</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Staff Member / ID</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Progress Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {staffMembers.length > 0 ? (
                staffMembers.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{staff.name}</div>
                      <div className="text-xs text-slate-400 font-black">ID: {staff.loginId}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-black text-slate-700">
                          {staff.enrollments.filter(e => e.status === 'COMPLETED' && currentAssignments.some(a => a.courseId === e.courseId)).length} / {currentAssignments.length} 完了
                        </span>
                        <div className="w-32 bg-slate-100 h-1 rounded-full overflow-hidden">
                          <div className="bg-slate-900 h-full" style={{ width: `${(staff.enrollments.filter(e => e.status === 'COMPLETED' && currentAssignments.some(a => a.courseId === e.courseId)).length / (currentAssignments.length || 1)) * 100}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          onClick={() => setResetStaff(staff)}
                          variant="ghost" size="icon" className="w-9 h-9 text-slate-300 hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <KeyRound className="w-4 h-4" />
                        </Button>
                        <DeleteButton id={staff.id} name={staff.name} type="user" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={3} className="px-8 py-20 text-center text-slate-400 font-medium">スタッフが登録されていません。</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {resetStaff && (
        <ResetPasswordDialog 
          staff={resetStaff} 
          onClose={() => setResetStaff(null)} 
        />
      )}
    </>
  );
}
