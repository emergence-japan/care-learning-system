"use client";

import { 
  Building2, ArrowRight, ShieldCheck, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/delete-button";
import Link from "next/link";
import { HQResetPasswordDialog } from "@/components/hq-reset-password-dialog";
import { AddAdminDialog } from "@/components/add-admin-dialog";

interface AdminUser {
  id: string;
  name: string;
  loginId: string;
}

interface Assignment {
  id: string;
  courseTitle: string;
  endDate: Date;
  completedCount: number;
}

interface Facility {
  id: string;
  name: string;
  type?: string;
  staffCount: number;
  maxStaff: number;
  progressRate: number;
  admins: AdminUser[];
  assignments: Assignment[];
}

export function FacilityMonitoringClient({ facilities }: { facilities: Facility[] }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {facilities.map((facility) => (
        <div key={facility.id} className="bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-4 group">
            
            {/* 施設基本情報 */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-slate-900 text-sm truncate" title={facility.name}>{facility.name}</h4>
                    {facility.type && (
                      <span className="px-2 py-0.5 bg-slate-100 text-[9px] font-bold text-slate-500 rounded-full whitespace-nowrap">
                        {facility.type}
                      </span>
                    )}
                  </div>
                  
                  {/* 管理者リスト & 追加ボタン */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3" />
                        管理者:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {facility.admins.length > 0 ? facility.admins.map(admin => (
                          <div key={admin.id} className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md group/admin">
                            <span className="text-[10px] font-bold text-emerald-700">{admin.name}</span>
                            <span className="text-[9px] font-mono text-emerald-600/50">({admin.loginId})</span>
                            <div className="flex items-center">
                              <HQResetPasswordDialog userId={admin.id} userName={admin.name} />
                              <DeleteButton id={admin.id} name={admin.name} type="user" size="icon" className="w-5 h-5 text-emerald-300 hover:text-red-500 hover:bg-white" />
                            </div>
                          </div>
                        )) : (
                          <span className="text-[10px] text-slate-400 italic">未設定</span>
                        )}
                        <AddAdminDialog facilityId={facility.id} facilityName={facility.name} />
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            {/* 右側：スタッフ数 & アクション */}
            <div className="flex items-center gap-6 shrink-0">
                <p className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${facility.staffCount >= facility.maxStaff ? 'text-amber-600' : 'text-slate-400'}`}>
                  <Users className="w-3 h-3" />
                  スタッフ {facility.staffCount} / {facility.maxStaff} 名
                </p>

                <div className="flex items-center gap-2 no-print">
                  <DeleteButton id={facility.id} name={facility.name} type="facility" size="sm" />
                  <Link href={`/hq/facilities/${facility.id}`}>
                    <Button 
                      variant="outline" size="sm" className="rounded-full font-bold h-9 border-slate-200 hover:bg-slate-900 hover:text-white transition-all text-[10px] uppercase tracking-widest px-4"
                    >
                      詳細
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}