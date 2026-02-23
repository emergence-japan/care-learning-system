"use client";

import { Users, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterStaffForm } from "@/components/register-staff-form";
import { StaffClient } from "./staff-client";
import { ManageStaffDialog } from "@/components/manage-staff-dialog";

interface AdminClientProps {
  staffMembers: any[];
  currentAssignments: any[];
  maxStaff: number;
  isSuspended?: boolean;
}

export function AdminClient({ staffMembers, currentAssignments, maxStaff, isSuspended }: AdminClientProps) {
  const totalStaff = staffMembers.length;

  return (
    <div id="staff-management" className="space-y-6 scroll-mt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center">
            <Users className="w-4 h-4 text-violet-600" />
          </div>
          <h3 className="font-bold text-xl text-slate-900">スタッフ管理</h3>
          <span className="text-[10px] text-slate-400 font-bold ml-2 uppercase tracking-widest">
            {totalStaff} / {maxStaff} Staff Registered
          </span>
        </div>
        
        <div className="flex items-center gap-2 no-print">
          {/* スタッフを管理ボタン (ポップアップ) */}
          <ManageStaffDialog 
            staffMembers={staffMembers}
            trigger={
              <Button
                variant="outline"
                size="sm"
                className="rounded-full font-bold h-9 px-4 transition-all text-xs border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-2" /> スタッフを管理
              </Button>
            }
          />

          {/* スタッフを追加ボタン - 停止中は非表示 */}
          {!isSuspended && <RegisterStaffForm disabled={totalStaff >= maxStaff} />}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm shadow-slate-200/50">
        <StaffClient 
          staffMembers={staffMembers} 
          currentAssignments={currentAssignments} 
        />
      </div>
    </div>
  );
}
