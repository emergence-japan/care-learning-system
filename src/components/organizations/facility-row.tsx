"use client";

import { Button } from "@/components/ui/button";
import { Plus, Home, Trash2, Edit, Users, BookOpen, MessageSquare } from "lucide-react";
import { HQEditUserDialog } from "@/components/hq-edit-user-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export type FacilityUser = {
  id: string;
  name: string;
  loginId: string;
  role: string;
  enrollments: { status: string; courseId: string }[];
};

export type FacilityData = {
  id: string;
  name: string;
  type: string | null;
  maxStaff: number;
  isActive: boolean;
  users: FacilityUser[];
  assignments: { id: string; courseId: string; course: { title: string } }[];
  _count: { users: number; assignments: number };
};

type Props = {
  facility: FacilityData;
  corporationId: string;
  onAddUser: (config: { corporationId: string; facilityId: string; orgName: string; role: "ADMIN" }) => void;
  onEditFacility: (facility: FacilityData) => void;
  onQuickMessage: (config: { targetName: string; targetFacilityId: string }) => void;
  onDeleteUser: (id: string, name: string) => void;
  onToggleStatus: (id: string, name: string, isActive: boolean) => void;
  onDeleteFacility: (id: string, name: string) => void;
};

export function FacilityRow({
  facility, corporationId, onAddUser, onEditFacility, onQuickMessage,
  onDeleteUser, onToggleStatus, onDeleteFacility,
}: Props) {
  const assignedCourseIds = new Set(facility.assignments.map(a => a.courseId));
  const staffMembers = facility.users.filter(u => u.role === "STAFF");
  let completedTasks = 0;
  staffMembers.forEach(u => {
    completedTasks += u.enrollments.filter(e => assignedCourseIds.has(e.courseId) && e.status === "COMPLETED").length;
  });
  const totalTasks = staffMembers.length * assignedCourseIds.size;
  const facilityProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className={`group flex items-center py-2 px-6 transition-colors gap-0 ${facility.isActive ? "hover:bg-white" : "bg-zinc-100/50 opacity-60"}`}>

      {/* Icon & Name */}
      <div className="flex items-center gap-3 w-[200px] shrink-0 mr-4">
        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 shadow-sm ${facility.isActive ? "bg-white border-zinc-200 text-zinc-400" : "bg-zinc-200 border-zinc-300 text-zinc-500"}`}>
          <Home className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0 flex flex-col">
          <h5 className={`font-bold text-xs truncate ${facility.isActive ? "text-zinc-900" : "text-zinc-500 line-through"}`}>{facility.name}</h5>
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

      {/* Manager */}
      <div className="flex items-center gap-2 w-[220px] shrink-0 px-4 border-l border-zinc-100">
        <span className="text-[9px] font-bold uppercase text-zinc-400 shrink-0 w-10">施設長:</span>
        <div className="flex flex-wrap gap-1 items-center">
          {facility.users.filter(u => u.role === "ADMIN").length > 0 ? (
            facility.users.filter(u => u.role === "ADMIN").map(user => (
              <div key={user.id} className="flex items-center gap-1 bg-white border border-zinc-200 px-1.5 py-0.5 rounded-md shadow-sm group/user">
                <span className="text-[10px] font-bold text-zinc-700">{user.name}</span>
                <div className="flex items-center opacity-0 group-hover/user:opacity-100 transition-opacity">
                  <HQEditUserDialog user={user} />
                  <Button onClick={() => onDeleteUser(user.id, user.name)} variant="ghost" size="icon" className="w-4 h-4 text-zinc-300 hover:text-red-500 p-0">
                    <Trash2 className="w-2.5 h-2.5" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <span className="text-[10px] text-zinc-400 italic">未登録</span>
          )}
          <Button
            onClick={() => onAddUser({ corporationId, facilityId: facility.id, orgName: facility.name, role: "ADMIN" })}
            variant="ghost" size="icon" className="w-5 h-5 rounded-md text-zinc-300 hover:text-blue-600 p-0"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Staff Count */}
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
                {staffMembers.map(u => {
                  const total = u.enrollments.length;
                  const completed = u.enrollments.filter(e => e.status === "COMPLETED").length;
                  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
                  return (
                    <div key={u.id} className="text-xs font-bold text-zinc-700 flex items-center justify-between group/staff">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="truncate">{u.name}</span>
                        <div className="flex items-center gap-1.5 shrink-0 ml-auto mr-2">
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black tabular-nums ${progress === 100 ? "bg-emerald-50 text-emerald-600" : progress > 0 ? "bg-blue-50 text-blue-600" : "bg-zinc-50 text-zinc-400"}`}>{progress}%</span>
                          <span className="text-[9px] text-zinc-400 font-medium tabular-nums">{completed}/{total}</span>
                        </div>
                      </div>
                      <Button onClick={() => onDeleteUser(u.id, u.name)} variant="ghost" size="icon" className="w-5 h-5 text-zinc-200 hover:text-red-500 opacity-0 group-hover/staff:opacity-100 transition-opacity">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  );
                })}
                {facility._count.users === 0 && <p className="text-[10px] text-zinc-400 italic">登録なし</p>}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Training Count */}
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
                {facility.assignments.map(a => {
                  const totalStaff = staffMembers.length;
                  const completedCount = staffMembers.filter(u => u.enrollments.some(e => e.courseId === a.courseId && e.status === "COMPLETED")).length;
                  const progress = totalStaff > 0 ? Math.round((completedCount / totalStaff) * 100) : 0;
                  return (
                    <div key={a.id} className="text-xs font-bold text-zinc-700 flex items-center justify-between gap-3 leading-none py-0.5 group/item">
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 opacity-40 group-hover/item:opacity-100 transition-opacity" />
                        <span className="truncate">{a.course.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black tabular-nums ${progress === 100 ? "bg-emerald-50 text-emerald-600" : progress > 0 ? "bg-blue-50 text-blue-600" : "bg-zinc-50 text-zinc-400"}`}>{progress}%</span>
                        <span className="text-[9px] text-zinc-400 font-medium">{completedCount}/{totalStaff}</span>
                      </div>
                    </div>
                  );
                })}
                {facility._count.assignments === 0 && <p className="text-[10px] text-zinc-400 italic">研修未割当</p>}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Progress */}
      <div className="w-[100px] shrink-0 px-4 border-l border-zinc-100 flex items-center">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold text-zinc-400">進捗:</span>
          <span className="text-[10px] font-black text-blue-600 tabular-nums">{facilityProgress}%</span>
        </div>
      </div>

      {/* Actions */}
      <div className="w-[160px] shrink-0 flex justify-end items-center gap-1 pl-4 border-l border-zinc-100 ml-auto">
        <Button
          onClick={() => onQuickMessage({ targetName: facility.name, targetFacilityId: facility.id })}
          variant="ghost" size="icon" className="w-7 h-7 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
        </Button>
        <Button
          onClick={() => onToggleStatus(facility.id, facility.name, facility.isActive)}
          variant="ghost" size="sm"
          className={`h-7 px-2 text-[9px] font-bold rounded-lg shrink-0 ${facility.isActive ? "text-zinc-400 hover:text-red-500" : "text-emerald-600 hover:bg-emerald-50"}`}
        >
          {facility.isActive ? "停止" : "再開"}
        </Button>
        <Button onClick={() => onEditFacility(facility)} variant="ghost" size="icon" className="w-7 h-7 text-zinc-400 hover:text-blue-600 rounded-lg shrink-0">
          <Edit className="w-3.5 h-3.5" />
        </Button>
        <Button onClick={() => onDeleteFacility(facility.id, facility.name)} variant="ghost" size="icon" className="w-7 h-7 text-zinc-400 hover:text-red-500 rounded-lg shrink-0">
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}
