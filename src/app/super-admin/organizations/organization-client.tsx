"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Building, Trash2, Edit, AlertCircle, Users, MessageSquare } from "lucide-react";
import { AddOrgUserDialog } from "@/components/add-org-user-dialog";
import { EditCorporationDialog } from "@/components/edit-corporation-dialog";
import { EditFacilityDialog } from "@/components/edit-facility-dialog";
import { HQEditUserDialog } from "@/components/hq-edit-user-dialog";
import { QuickNotificationDialog } from "@/components/quick-notification-dialog";
import { FacilityRow, type FacilityData } from "@/components/organizations/facility-row";
import { deleteCorporation, deleteFacility, deleteUser, toggleCorporationStatus, toggleFacilityStatus } from "@/lib/actions";

type Corp = {
  id: string;
  name: string;
  maxFacilities: number;
  maxStaff: number;
  isActive: boolean;
  facilities: FacilityData[];
  users: { id: string; name: string; loginId: string }[];
};

export function OrganizationClient({ corporations }: { corporations: Corp[] }) {
  const [dialogConfig, setDialogConfig] = useState<{
    corporationId: string;
    facilityId: string | null;
    orgName: string;
    role: "HQ" | "ADMIN";
  } | null>(null);

  const [editCorp, setEditCorp] = useState<Corp | null>(null);
  const [editFacilityData, setEditFacilityData] = useState<FacilityData | null>(null);
  const [quickMessage, setQuickMessage] = useState<{
    targetName: string;
    targetCorporationId?: string;
    targetFacilityId?: string;
  } | null>(null);

  const handleToggleCorpStatus = async (id: string, name: string, currentStatus: boolean) => {
    const message = currentStatus
      ? `法人「${name}」の利用を停止しますか？\n停止すると、スタッフはログインできなくなり、管理者は閲覧のみに制限されます。`
      : `法人「${name}」の利用を再開しますか？`;
    if (confirm(message)) await toggleCorporationStatus(id, !currentStatus);
  };

  const handleToggleFacilityStatus = async (id: string, name: string, currentStatus: boolean) => {
    const message = currentStatus
      ? `施設「${name}」の利用を停止しますか？\nこの施設のスタッフはログインできなくなります。`
      : `施設「${name}」の利用を再開しますか？`;
    if (confirm(message)) await toggleFacilityStatus(id, !currentStatus);
  };

  const handleDeleteCorp = async (id: string, name: string) => {
    if (confirm(`【警告】法人「${name}」を削除しますか？\n所属する全ての施設、ユーザー、受講記録が完全に削除されます。`)) {
      await deleteCorporation(id);
    }
  };

  const handleDeleteFacility = async (id: string, name: string) => {
    if (confirm(`施設「${name}」を削除しますか？\n所属するユーザーと受講記録が削除されます。`)) {
      await deleteFacility(id);
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (confirm(`ユーザー「${name}」を削除しますか？`)) await deleteUser(id);
  };

  return (
    <>
      <div className="space-y-6">
        {corporations.map((corp) => {
          const facilityCount = corp.facilities.length;
          const totalStaffCount = corp.facilities.reduce((acc, f) => acc + f._count.users, 0);
          const facilityRate = Math.round((facilityCount / corp.maxFacilities) * 100);

          let corpTotalTasks = 0;
          let corpCompletedTasks = 0;
          corp.facilities.forEach(f => {
            const assignedIds = new Set(f.assignments.map(a => a.courseId));
            const staff = f.users.filter(u => u.role === "STAFF");
            corpTotalTasks += staff.length * assignedIds.size;
            staff.forEach(u => {
              corpCompletedTasks += u.enrollments.filter(e => assignedIds.has(e.courseId) && e.status === "COMPLETED").length;
            });
          });
          const corpProgress = corpTotalTasks > 0 ? Math.round((corpCompletedTasks / corpTotalTasks) * 100) : 0;

          return (
            <div key={corp.id} className={`border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm transition-all ${corp.isActive ? "bg-white" : "bg-zinc-100 opacity-80"}`}>

              {/* Corporation Header */}
              <div className={`${corp.isActive ? "bg-zinc-900" : "bg-zinc-700"} text-white px-6 py-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6`}>
                <div className="flex flex-col md:flex-row md:items-center gap-0 flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-3 w-[280px] shrink-0 mr-4">
                    <div className="w-7 h-7 shrink-0" />
                    <div className="min-w-0 flex flex-col">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">法人情報</div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-black tracking-tight truncate">{corp.name}</h4>
                        {!corp.isActive && (
                          <span className="bg-red-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shrink-0">利用停止中</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* HQ Users */}
                  <div className="flex flex-wrap items-center gap-2 max-w-[300px] shrink-0 px-4 border-l border-zinc-800 min-h-[40px]">
                    {corp.users.map(user => (
                      <div key={user.id} className="bg-white/10 hover:bg-white/15 border border-white/5 pl-2 py-0.5 pr-1 rounded-lg flex items-center gap-1 transition-colors group/user shrink-0">
                        <Users className="w-2.5 h-2.5 text-zinc-500" />
                        <span className="text-[10px] font-bold text-zinc-200">{user.name}</span>
                        <div className="flex items-center opacity-0 group-hover/user:opacity-100 transition-opacity">
                          <HQEditUserDialog user={user} />
                          <Button
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            variant="ghost" size="icon" className="w-4 h-4 rounded-full text-zinc-500 hover:text-red-400 p-0"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      onClick={() => setDialogConfig({ corporationId: corp.id, facilityId: null, orgName: corp.name, role: "HQ" })}
                      variant="ghost" size="sm" className="h-6 px-2 text-[9px] font-bold text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 border border-blue-400/20 rounded-lg shrink-0"
                    >
                      <Plus className="w-2.5 h-2.5 mr-1" /> 追加
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 border-l border-zinc-800 pl-4 py-1 shrink-0">
                    <div className="hidden 2xl:block">
                      <div className="text-[8px] uppercase text-zinc-500 font-bold leading-none mb-1">法人進捗</div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 bg-zinc-800 h-1 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full" style={{ width: `${corpProgress}%` }} />
                        </div>
                        <span className="text-[10px] font-black text-orange-400 tabular-nums">{corpProgress}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase text-zinc-500 font-bold leading-none mb-1">施設数</div>
                      <div className={`text-[10px] font-bold ${facilityRate >= 100 ? "text-red-400" : "text-zinc-300"}`}>
                        {facilityCount}<span className="text-zinc-600 mx-0.5">/</span>{corp.maxFacilities}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase text-zinc-500 font-bold leading-none mb-1">利用者数</div>
                      <div className="text-[10px] font-bold text-zinc-300">
                        {totalStaffCount}<span className="text-[8px] text-zinc-600 ml-0.5 font-normal">名</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full xl:w-auto justify-end border-t xl:border-t-0 pt-4 xl:pt-0 border-zinc-800/50 ml-auto">
                  <Button
                    onClick={() => setQuickMessage({ targetName: corp.name, targetCorporationId: corp.id })}
                    variant="outline" size="sm" className="h-8 bg-zinc-800 border-zinc-700 text-blue-400 hover:bg-zinc-700 hover:text-blue-300 rounded-lg text-[10px] font-bold"
                  >
                    <MessageSquare className="w-3 h-3 mr-1.5" /> メッセージ
                  </Button>
                  <Button
                    onClick={() => handleToggleCorpStatus(corp.id, corp.name, corp.isActive)}
                    variant="outline" size="sm"
                    className={`h-8 bg-transparent border-zinc-700 rounded-lg text-[10px] font-bold transition-colors ${corp.isActive ? "text-zinc-400 hover:text-red-400 hover:border-red-400" : "text-emerald-400 border-emerald-800 hover:bg-emerald-800"}`}
                  >
                    {corp.isActive ? "利用停止" : "利用再開"}
                  </Button>
                  <Button
                    onClick={() => setEditCorp(corp)}
                    variant="outline" size="sm" className="h-8 bg-zinc-800 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white rounded-lg text-[10px] font-bold"
                  >
                    <Edit className="w-3 h-3 mr-1.5" /> 設定
                  </Button>
                  <Button
                    onClick={() => handleDeleteCorp(corp.id, corp.name)}
                    variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {facilityRate >= 100 && (
                <div className="px-6 py-2 bg-red-50 border-b border-red-100 flex items-center gap-2 text-red-600 text-[10px] font-bold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  施設の登録制限数に達しています。新規登録には設定の変更が必要です。
                </div>
              )}

              <div className="bg-zinc-50/50 border-t border-zinc-100">
                {corp.facilities.length > 0 ? (
                  <div className="divide-y divide-zinc-100">
                    {corp.facilities.map(facility => (
                      <FacilityRow
                        key={facility.id}
                        facility={facility}
                        corporationId={corp.id}
                        onAddUser={setDialogConfig}
                        onEditFacility={setEditFacilityData}
                        onQuickMessage={setQuickMessage}
                        onDeleteUser={handleDeleteUser}
                        onToggleStatus={handleToggleFacilityStatus}
                        onDeleteFacility={handleDeleteFacility}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-zinc-400 text-xs font-medium">登録施設なし</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {dialogConfig && <AddOrgUserDialog {...dialogConfig} onClose={() => setDialogConfig(null)} />}
      {editCorp && <EditCorporationDialog corporation={editCorp} onClose={() => setEditCorp(null)} />}
      {editFacilityData && <EditFacilityDialog facility={editFacilityData} onClose={() => setEditFacilityData(null)} />}
      {quickMessage && (
        <QuickNotificationDialog
          {...quickMessage}
          onClose={() => setQuickMessage(null)}
        />
      )}
    </>
  );
}
