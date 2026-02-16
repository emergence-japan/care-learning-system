"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, Building, Home, Trash2, Edit, AlertCircle, Users, BookOpen, MessageSquare 
} from "lucide-react";
import { AddOrgUserDialog } from "@/components/add-org-user-dialog";
import { EditCorporationDialog } from "@/components/edit-corporation-dialog";
import { EditFacilityDialog } from "@/components/edit-facility-dialog";
import { HQEditUserDialog } from "@/components/hq-edit-user-dialog";
import { QuickNotificationDialog } from "@/components/quick-notification-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
    users: { 
      id: string; 
        name: string;
        loginId: string;
        role: string;
      
      enrollments: { status: string }[];
    }[];
    assignments: { id: string; courseId: string; course: { title: string } }[];
    _count: { users: number; assignments: number };
  }[];
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
  const [editFacilityData, setEditFacilityData] = useState<Corp["facilities"][0] | null>(null);
  const [quickMessage, setQuickMessage] = useState<{
    targetName: string;
    targetCorporationId?: string;
    targetFacilityId?: string;
  } | null>(null);

  const handleToggleCorpStatus = async (id: string, name: string, currentStatus: boolean) => {
    const message = currentStatus 
      ? `法人「${name}」の利用を停止しますか？\n停止すると、スタッフはログインできなくなり、管理者は閲覧のみに制限されます。`
      : `法人「${name}」の利用を再開しますか？`;

    if (confirm(message)) {
      await toggleCorporationStatus(id, !currentStatus);
    }
  };

  const handleToggleFacilityStatus = async (id: string, name: string, currentStatus: boolean) => {
    const message = currentStatus 
      ? `施設「${name}」の利用を停止しますか？\nこの施設のスタッフはログインできなくなります。`
      : `施設「${name}」の利用を再開しますか？`;

    if (confirm(message)) {
      await toggleFacilityStatus(id, !currentStatus);
    }
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

          // 法人全体の進捗計算
          let corpTotalTasks = 0;
          let corpCompletedTasks = 0;
          corp.facilities.forEach(f => {
            const staffCount = f._count.users;
            const assignmentCount = f._count.assignments;
            corpTotalTasks += (staffCount * assignmentCount);
            
            f.users.filter(u => u.role === "STAFF").forEach(u => {
              corpCompletedTasks += u.enrollments.filter(e => e.status === "COMPLETED").length;
            });
          });
          const corpProgress = corpTotalTasks > 0 ? Math.round((corpCompletedTasks / corpTotalTasks) * 100) : 0;

          return (
            <div key={corp.id} className={`border border-zinc-200 rounded-[2rem] overflow-hidden shadow-sm transition-all ${corp.isActive ? 'bg-white' : 'bg-zinc-100 opacity-80'}`}>
              {/* Corporation Header */}
              <div className={`${corp.isActive ? 'bg-zinc-900' : 'bg-zinc-700'} text-white px-6 py-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6`}>
                <div className="flex flex-col md:flex-row md:items-center gap-0 flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-3 w-[280px] shrink-0 mr-4">
                    {/* Spacer to align with facility icon below */}
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

                  {/* Stats - Re-enabled essential ones */}
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
                      <div className={`text-[10px] font-bold ${facilityRate >= 100 ? 'text-red-400' : 'text-zinc-300'}`}>
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
                    className={`h-8 bg-transparent border-zinc-700 rounded-lg text-[10px] font-bold transition-colors ${corp.isActive ? 'text-zinc-400 hover:text-red-400 hover:border-red-400' : 'text-emerald-400 border-emerald-800 hover:bg-emerald-800'}`}
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
                    {corp.facilities.map((facility) => (
                      <div key={facility.id} className={`group flex items-center py-2 px-6 transition-colors gap-0 ${facility.isActive ? 'hover:bg-white' : 'bg-zinc-100/50 opacity-60'}`}>
                        
                        {/* 1. Icon & Name & Type Section (Condensed) */}
                        <div className="flex items-center gap-3 w-[200px] shrink-0 mr-4">
                          <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 shadow-sm ${facility.isActive ? 'bg-white border-zinc-200 text-zinc-400' : 'bg-zinc-200 border-zinc-300 text-zinc-500'}`}>
                            <Home className="w-3.5 h-3.5" />
                          </div>
                          <div className="min-w-0 flex flex-col">
                            <h5 className={`font-bold text-xs truncate ${facility.isActive ? 'text-zinc-900' : 'text-zinc-500 line-through'}`}>{facility.name}</h5>
                            <div className="flex gap-1.5 mt-0.5">
                              {facility.type && (
                                <span className="text-[7px] font-black bg-blue-50 text-blue-600 px-1 py-0.5 rounded border border-blue-100 uppercase leading-none">
                                  {facility.type}
                                </span>
                              )}
                              {!facility.isActive && <span className="text-[7px] font-black bg-zinc-400 text-white px-1 py-0.5 rounded uppercase leading-none">停止中</span>}
                            </div>
                          </div>
                        </div>

                        {/* 2. Manager Section (Condensed) */}
                        <div className="flex items-center gap-2 w-[220px] shrink-0 px-4 border-l border-zinc-100">
                          <span className="text-[9px] font-bold uppercase text-zinc-400 shrink-0 w-10">施設長:</span>
                          <div className="flex flex-wrap gap-1 items-center">
                            {facility.users.filter(u => u.role === "ADMIN").length > 0 ? (
                              facility.users.filter(u => u.role === "ADMIN").map(user => (
                                <div key={user.id} className="flex items-center gap-1 bg-white border border-zinc-200 px-1.5 py-0.5 rounded-md shadow-sm group/user">
                                  <span className="text-[10px] font-bold text-zinc-700">{user.name}</span>
                                  <div className="flex items-center opacity-0 group-hover/user:opacity-100 transition-opacity">
                                    <HQEditUserDialog user={user} />
                                    <Button onClick={() => handleDeleteUser(user.id, user.name)} variant="ghost" size="icon" className="w-4 h-4 text-zinc-300 hover:text-red-500 p-0"><Trash2 className="w-2.5 h-2.5" /></Button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <span className="text-[10px] text-zinc-400 italic">未登録</span>
                            )}
                            <Button onClick={() => setDialogConfig({ corporationId: corp.id, facilityId: facility.id, orgName: facility.name, role: "ADMIN" })} variant="ghost" size="icon" className="w-5 h-5 rounded-md text-zinc-300 hover:text-blue-600 p-0"><Plus className="w-3 h-3" /></Button>
                          </div>
                        </div>

                        {/* 3. Staff Count Section (Condensed) */}
                        <div className="w-[100px] shrink-0 px-4 border-l border-zinc-100 flex items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-blue-600 transition-colors">
                                <Users className="w-3 h-3 text-zinc-400" />
                                <span className="tabular-nums">{facility._count.users}/{facility.maxStaff}</span>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-4 rounded-2xl shadow-2xl border-zinc-100 bg-white z-[100]">
                              <div className="space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b pb-2">登録スタッフ一覧</p>
                                <div className="max-h-48 overflow-y-auto space-y-1.5 custom-scrollbar">
                                  {facility.users.filter(u => u.role === "STAFF").map(u => {
                                    const total = u.enrollments.length;
                                    const completed = u.enrollments.filter(e => e.status === "COMPLETED").length;
                                    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
                                    return (
                                      <div key={u.id} className="text-xs font-bold text-zinc-700 flex items-center justify-between group/staff">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                          <span className="truncate">{u.name}</span>
                                          <div className="flex items-center gap-1.5 shrink-0 ml-auto mr-2">
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black tabular-nums ${progress === 100 ? 'bg-emerald-50 text-emerald-600' : progress > 0 ? 'bg-blue-50 text-blue-600' : 'bg-zinc-50 text-zinc-400'}`}>{progress}%</span>
                                            <span className="text-[9px] text-zinc-400 font-medium tabular-nums">{completed}/{total}</span>
                                          </div>
                                        </div>
                                        <Button onClick={() => handleDeleteUser(u.id, u.name)} variant="ghost" size="icon" className="w-5 h-5 text-zinc-200 hover:text-red-500 opacity-0 group-hover/staff:opacity-100 transition-opacity"><Trash2 className="w-3 h-3" /></Button>
                                      </div>
                                    );
                                  })}
                                  {facility._count.users === 0 && <p className="text-[10px] text-zinc-400 italic">登録なし</p>}
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* 4. Training Count Section (Condensed) */}
                        <div className="w-[90px] shrink-0 px-4 border-l border-zinc-100 flex items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <button className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-blue-600 transition-colors">
                                <BookOpen className="w-3 h-3 text-zinc-400" />
                                <span className="tabular-nums">{facility._count.assignments} 科目</span>
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[450px] p-5 rounded-2xl shadow-2xl border-zinc-100 bg-white z-[100]">
                              <div className="space-y-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 border-b pb-2">割当済み研修</p>
                                <div className="max-h-64 overflow-y-auto space-y-2.5 custom-scrollbar">
                                  {facility.assignments.map((a) => {
                                    const staffMembers = facility.users.filter(u => u.role === "STAFF");
                                    const totalStaff = staffMembers.length;
                                    const completedCount = staffMembers.filter(u => u.enrollments.some(e => (e as any).courseId === a.courseId && e.status === "COMPLETED")).length;
                                    const progress = totalStaff > 0 ? Math.round((completedCount / totalStaff) * 100) : 0;
                                    return (
                                      <div key={a.id} className="text-xs font-bold text-zinc-700 flex items-center justify-between gap-3 leading-none py-0.5 group/item">
                                        <div className="flex items-center gap-3 truncate"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity" /><span className="truncate">{a.course.title}</span></div>
                                        <div className="flex items-center gap-2 shrink-0"><span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black tabular-nums ${progress === 100 ? 'bg-emerald-50 text-emerald-600' : progress > 0 ? 'bg-blue-50 text-blue-600' : 'bg-zinc-50 text-zinc-400'}`}>{progress}%</span><span className="text-[9px] text-zinc-400 font-medium">{completedCount}/{totalStaff}</span></div>
                                      </div>
                                    );
                                  })}
                                  {facility._count.assignments === 0 && <p className="text-[10px] text-zinc-400 italic">研修未割当</p>}
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* 5. Facility Progress Section (Condensed) */}
                        <div className="w-[100px] shrink-0 px-4 border-l border-zinc-100 flex items-center">
                          {(() => {
                            const staffCount = facility.users.filter(u => u.role === "STAFF").length;
                            const assignmentCount = facility._count.assignments;
                            const totalTasks = staffCount * assignmentCount;
                            let completedTasks = 0;
                            facility.users.filter(u => u.role === "STAFF").forEach(u => {
                              completedTasks += u.enrollments.filter(e => e.status === "COMPLETED").length;
                            });
                            const facilityProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                            
                            return (
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-bold text-zinc-400">進捗:</span>
                                <span className="text-[10px] font-black text-blue-600 tabular-nums">{facilityProgress}%</span>
                              </div>
                            );
                          })()}
                        </div>

                        {/* 6. Actions (Fixed width to prevent overlap) */}
                        <div className="w-[160px] shrink-0 flex justify-end items-center gap-1 pl-4 border-l border-zinc-100 ml-auto">
                          <Button 
                            onClick={() => setQuickMessage({ targetName: facility.name, targetFacilityId: facility.id })}
                            variant="ghost" size="icon" className="w-7 h-7 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg shrink-0"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </Button>
                          <Button onClick={() => handleToggleFacilityStatus(facility.id, facility.name, facility.isActive)} variant="ghost" size="sm" className={`h-7 px-2 text-[9px] font-bold rounded-lg shrink-0 ${facility.isActive ? 'text-zinc-400 hover:text-red-500' : 'text-emerald-600 hover:bg-emerald-50'}`}>{facility.isActive ? "停止" : "再開"}</Button>
                          <Button onClick={() => setEditFacilityData(facility)} variant="ghost" size="icon" className="w-7 h-7 text-zinc-400 hover:text-blue-600 rounded-lg shrink-0"><Edit className="w-3.5 h-3.5" /></Button>
                          <Button onClick={() => handleDeleteFacility(facility.id, facility.name)} variant="ghost" size="icon" className="w-7 h-7 text-zinc-400 hover:text-red-500 rounded-lg shrink-0"><Trash2 className="w-3.5 h-3.5" /></Button>
                        </div>

                      </div>
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