"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Building, Home, Trash2, Edit, AlertCircle, Users, BookOpen } from "lucide-react";
import { AddOrgUserDialog } from "@/components/add-org-user-dialog";
import { EditCorporationDialog } from "@/components/edit-corporation-dialog";
import { EditFacilityDialog } from "@/components/edit-facility-dialog";
import { HQEditUserDialog } from "@/components/hq-edit-user-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { deleteCorporation, deleteFacility, deleteUser, toggleCorporationStatus, toggleFacilityStatus } from "@/lib/actions";

type Corp = {
  id: string;
  name: string;
  maxFacilities: number;
  maxStaff: number;
  isActive: boolean;
  facilities: {
    id: string;
    name: string;
    type: string | null;
    maxStaff: number;
    isActive: boolean;
    users: { id: string; name: string; email: string | null; loginId: string }[];
    _count: { users: number; assignments: number };
  }[];
  users: { id: string; name: string; email: string | null; loginId: string }[];
};

export function OrganizationClient({ corporations }: { corporations: Corp[] }) {
  const [dialogConfig, setDialogConfig] = useState<{
    corporationId: string;
    facilityId: string | null;
    orgName: string;
    role: "HQ" | "ADMIN";
  } | null>(null);

  const [editCorp, setEditCorp] = useState<Corp | null>(null);
  const [editFacilityData, setEditFacilityData] = useState<Corp["facilities"][0] | null>(null);

  const handleToggleCorpStatus = async (id: string, name: string, currentStatus: boolean) => {
    const action = currentStatus ? "停止" : "再開";
    const message = currentStatus 
      ? `法人「${name}」の利用を停止しますか？\n停止すると、スタッフはログインできなくなり、管理者は閲覧のみに制限されます。`
      : `法人「${name}」の利用を再開しますか？`;

    if (confirm(message)) {
      await toggleCorporationStatus(id, !currentStatus);
    }
  };

  const handleToggleFacilityStatus = async (id: string, name: string, currentStatus: boolean) => {
    const action = currentStatus ? "停止" : "再開";
    const message = currentStatus 
      ? `施設「${name}」の利用を停止しますか？\nこの施設のスタッフはログインできなくなります。`
      : `施設「${name}」の利用を再開しますか？`;

    if (confirm(message)) {
      await toggleFacilityStatus(id, !currentStatus);
    }
  };

  const handleDeleteCorp = async (id: string, name: string) => {
// ... (既存のコード)
    if (confirm(`【警告】法人「${name}」を削除しますか？\n所属する全ての施設、ユーザー、受講記録が完全に削除されます。`)) {
      await deleteCorporation(id);
    }
  };

  const handleDeleteFacility = async (id: string, name: string) => {
// ... (既存のコード)
    if (confirm(`施設「${name}」を削除しますか？\n所属するユーザーと受講記録が削除されます。`)) {
      await deleteFacility(id);
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
// ... (既存のコード)
    if (confirm(`ユーザー「${name}」を削除しますか？`)) {
      await deleteUser(id);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {corporations.map((corp) => {
          const facilityCount = corp.facilities.length;
          const totalStaffCount = corp.facilities.reduce((acc, f) => acc + f._count.users, 0);
          const facilityRate = Math.round((facilityCount / corp.maxFacilities) * 100);

          return (
            <div key={corp.id} className={`border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm transition-all ${corp.isActive ? 'bg-white' : 'bg-zinc-100 opacity-80'}`}>
              {/* Corporation Header (Integrated HQ Users) */}
              <div className={`${corp.isActive ? 'bg-zinc-900' : 'bg-zinc-700'} text-white px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6`}>
                <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">Corporation</div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-black tracking-tight">{corp.name}</h4>
                        {!corp.isActive && (
                          <span className="bg-red-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">利用停止中</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Integrated HQ Users */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 block lg:hidden">本部担当者:</span>
                    {corp.users.map(user => (
                      <div key={user.id} className="bg-white/10 hover:bg-white/15 border border-white/5 pl-2.5 pr-1 py-0.5 rounded-lg flex items-center gap-1 transition-colors group/user">
                        <span className="text-[10px] font-bold text-zinc-200">{user.name}</span>
                        <div className="flex items-center opacity-0 group-hover/user:opacity-100 transition-opacity">
                          <HQEditUserDialog user={user} />
                          <Button 
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            variant="ghost" size="icon" className="w-5 h-5 rounded-full text-zinc-500 hover:text-red-400 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button 
                      onClick={() => setDialogConfig({ corporationId: corp.id, facilityId: null, orgName: corp.name, role: "HQ" })}
                      variant="ghost" size="sm" className="h-6 px-2 text-[10px] font-bold text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 border border-blue-400/20 rounded-lg"
                    >
                      <Plus className="w-3 h-3 mr-1" /> 追加
                    </Button>
                  </div>

                  {/* Stats Badge */}
                  <div className="flex gap-4 border-l border-zinc-800 pl-4 py-1">
                    <div>
                      <div className="text-[9px] uppercase text-zinc-500 font-bold">Facilities</div>
                      <div className={`text-xs font-bold ${facilityRate >= 100 ? 'text-red-400' : 'text-zinc-300'}`}>
                        {facilityCount} / {corp.maxFacilities}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase text-zinc-500 font-bold">Total Staff</div>
                      <div className="text-xs font-bold text-zinc-300">
                        {totalStaffCount} <span className="text-[9px] text-zinc-500 font-normal ml-0.5">名</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleToggleCorpStatus(corp.id, corp.name, corp.isActive)}
                    variant="outline" size="sm" 
                    className={`h-9 bg-transparent border-zinc-700 rounded-xl text-xs font-bold transition-colors ${corp.isActive ? 'text-zinc-400 hover:text-red-400 hover:border-red-400' : 'text-emerald-400 border-emerald-800 hover:bg-emerald-800'}`}
                  >
                    {corp.isActive ? "利用停止" : "利用再開"}
                  </Button>
                  <Button 
                    onClick={() => setEditCorp(corp)}
                    variant="outline" size="sm" className="h-9 bg-transparent border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-xl text-xs font-bold"
                  >
                    <Edit className="w-3.5 h-3.5 mr-1.5" /> 設定
                  </Button>
                  <Button 
                    onClick={() => handleDeleteCorp(corp.id, corp.name)}
                    variant="ghost" size="icon" className="h-9 w-9 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
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
                    {corp.facilities.map((facility) => (
                      <div key={facility.id} className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 transition-colors gap-4 ${facility.isActive ? 'hover:bg-white' : 'bg-zinc-100/50 opacity-60'}`}>
                        
                        {/* Facility Name & Stats */}
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 shadow-sm ${facility.isActive ? 'bg-white border-zinc-200 text-zinc-400' : 'bg-zinc-200 border-zinc-300 text-zinc-500'}`}>
                            <Home className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h5 className={`font-bold text-sm truncate ${facility.isActive ? 'text-zinc-900' : 'text-zinc-500 line-through'}`}>{facility.name}</h5>
                              {!facility.isActive && <span className="text-[8px] font-black bg-zinc-400 text-white px-1 rounded">停止中</span>}
                              {facility.type && (
                                <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 uppercase">
                                  {facility.type}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 mt-0.5">
                              <div className="flex items-center gap-1 text-[10px] font-medium text-zinc-500">
                                <Users className="w-3 h-3 text-zinc-400" />
                                <span>スタッフ: {facility._count.users} / {facility.maxStaff}</span>
                              </div>
                              <div className="flex items-center gap-1 text-[10px] font-medium text-zinc-500">
                                <BookOpen className="w-3 h-3 text-zinc-400" />
                                <span>研修: {facility._count.assignments}件</span>
                              </div>
                              {facility._count.users >= facility.maxStaff && (
                                <span className="text-[9px] font-black bg-red-100 text-red-600 px-1.5 py-0.5 rounded border border-red-100">FULL</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Facility Manager & Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 shrink-0">
                          
                          {/* Facility Manager List */}
                          <div className="flex items-center gap-2 min-w-[200px]">
                            <span className="text-[9px] font-bold uppercase text-zinc-400 shrink-0 w-12">施設長:</span>
                            <div className="flex flex-wrap gap-1.5 flex-1">
                              {facility.users.length > 0 ? (
                                facility.users.map(user => (
                                  <div key={user.id} className="flex items-center gap-1.5 bg-white border border-zinc-200 px-2 py-0.5 rounded-md shadow-sm group/user">
                                    <span className="text-[10px] font-bold text-zinc-700">{user.name}</span>
                                    <div className="flex items-center opacity-0 group-hover/user:opacity-100 transition-opacity">
                                      <HQEditUserDialog user={user} />
                                      <Button 
                                        onClick={() => handleDeleteUser(user.id, user.name)}
                                        variant="ghost" size="icon" className="w-4 h-4 text-zinc-300 hover:text-red-500"
                                      >
                                        <Trash2 className="w-2.5 h-2.5" />
                                      </Button>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <span className="text-[10px] text-zinc-400 italic">未登録</span>
                              )}
                              <Button 
                                onClick={() => setDialogConfig({ corporationId: corp.id, facilityId: facility.id, orgName: facility.name, role: "ADMIN" })}
                                variant="ghost" size="icon" className="w-5 h-5 rounded-md text-zinc-300 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </div>

                          {/* Facility Actions */}
                          <div className="flex items-center gap-1 pl-4 border-l border-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              onClick={() => handleToggleFacilityStatus(facility.id, facility.name, facility.isActive)}
                              variant="ghost" size="sm" className={`h-8 px-2 text-[10px] font-bold rounded-lg ${facility.isActive ? 'text-zinc-400 hover:text-red-500' : 'text-emerald-600 hover:bg-emerald-50'}`}
                            >
                              {facility.isActive ? "停止" : "再開"}
                            </Button>
                            <Button onClick={() => setEditFacilityData(facility)} variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-blue-600 rounded-lg">
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button onClick={() => handleDeleteFacility(facility.id, facility.name)} variant="ghost" size="icon" className="w-8 h-8 text-zinc-400 hover:text-red-500 rounded-lg">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-zinc-400 text-xs font-medium">
                    登録施設なし
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {dialogConfig && (
        <AddOrgUserDialog 
          {...dialogConfig} 
          onClose={() => setDialogConfig(null)} 
        />
      )}

      {editCorp && (
        <EditCorporationDialog
          corporation={editCorp}
          onClose={() => setEditCorp(null)}
        />
      )}

      {editFacilityData && (
        <EditFacilityDialog
          facility={editFacilityData}
          onClose={() => setEditFacilityData(null)}
        />
      )}
    </>
  );
}
