"use client";

import { useState, useMemo } from "react";
import { 
  Users, AlertCircle, CheckCircle2, Search, Filter, 
  BarChart3, ArrowDownWideEqual, ArrowUpWideEqual
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { HQResetPasswordDialog } from "@/components/hq-reset-password-dialog";

type Staff = {
  id: string;
  name: string;
  loginId: string;
  enrollments: { 
    courseId: string; 
    status: string; 
  }[];
};

type Assignment = {
  id: string;
  courseId: string;
  course: { title: string };
  endDate: Date;
};

interface FacilityDetailClientProps {
  staffMembers: Staff[];
  assignments: Assignment[];
}

export function FacilityDetailClient({ staffMembers, assignments }: FacilityDetailClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "incomplete" | "overdue">("all");

  // 各研修ごとの完了率計算
  const courseStats = useMemo(() => {
    return assignments.map(assign => {
      const completedCount = staffMembers.filter(staff => 
        staff.enrollments.some(e => e.courseId === assign.courseId && e.status === "COMPLETED")
      ).length;
      const rate = staffMembers.length > 0 ? Math.round((completedCount / staffMembers.length) * 100) : 0;
      return { courseId: assign.courseId, rate, completedCount };
    });
  }, [staffMembers, assignments]);

  // フィルタリングロジック
  const filteredStaff = useMemo(() => {
    return staffMembers.filter(staff => {
      // 検索ワードでの絞り込み
      const matchesSearch = 
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        staff.loginId.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      // ステータスでの絞り込み
      if (statusFilter === "all") return true;

      const hasIncomplete = assignments.some(assign => 
        !staff.enrollments.some(e => e.courseId === assign.courseId && e.status === "COMPLETED")
      );

      if (statusFilter === "incomplete") return hasIncomplete;

      if (statusFilter === "overdue") {
        return assignments.some(assign => {
          const isCompleted = staff.enrollments.some(e => e.courseId === assign.courseId && e.status === "COMPLETED");
          const isOverdue = !isCompleted && new Date() > new Date(assign.endDate);
          return isOverdue;
        });
      }

      return true;
    });
  }, [staffMembers, assignments, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Filters & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-end md:items-center justify-between bg-white/5 p-6 rounded-2xl border border-white/5">
        <div className="flex flex-1 items-center gap-4 w-full md:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input 
              placeholder="スタッフ名・IDで検索..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#120a0a] border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant={statusFilter === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStatusFilter("all")}
            className={`rounded-full text-[10px] font-bold uppercase tracking-widest ${statusFilter === "all" ? "bg-white text-slate-900" : "text-slate-400"}`}
          >
            全員
          </Button>
          <Button 
            variant={statusFilter === "incomplete" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStatusFilter("incomplete")}
            className={`rounded-full text-[10px] font-bold uppercase tracking-widest ${statusFilter === "incomplete" ? "bg-orange-500 text-white" : "text-slate-400"}`}
          >
            未完了あり
          </Button>
          <Button 
            variant={statusFilter === "overdue" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setStatusFilter("overdue")}
            className={`rounded-full text-[10px] font-bold uppercase tracking-widest ${statusFilter === "overdue" ? "bg-red-600 text-white" : "text-slate-400"}`}
          >
            期限切れあり
          </Button>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-[#1a1010] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 font-bold text-xs text-slate-400 uppercase tracking-wider sticky left-0 bg-[#251818] z-20 min-w-[200px] border-r border-white/10">
                  <div className="flex items-center justify-between">
                    <span>スタッフ名 / ID</span>
                    <Users className="w-3.5 h-3.5 opacity-30" />
                  </div>
                </th>
                {assignments.map(assign => {
                  const stat = courseStats.find(s => s.courseId === assign.courseId);
                  return (
                    <th key={assign.id} className="p-4 font-bold text-[10px] text-slate-400 uppercase tracking-wider min-w-[160px] border-r border-white/5">
                      <div className="space-y-2">
                        <div className="truncate text-white" title={assign.course.title}>{assign.course.title}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-slate-500 font-normal">
                            ~ {format(assign.endDate, 'MM/dd', { locale: ja })}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500" style={{ width: `${stat?.rate || 0}%` }} />
                            </div>
                            <span className="text-[9px] font-mono text-blue-400">{stat?.rate || 0}%</span>
                          </div>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStaff.length > 0 ? (
                filteredStaff.map(staff => (
                  <tr key={staff.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 font-bold text-sm text-white sticky left-0 bg-[#1a1010] group-hover:bg-[#251818] transition-colors border-r border-white/10 z-10 shadow-[4px_0_10px_-2px_rgba(0,0,0,0.5)]">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate">{staff.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5 tracking-tighter">ID: {staff.loginId}</div>
                        </div>
                        <HQResetPasswordDialog userId={staff.id} userName={staff.name} />
                      </div>
                    </td>
                    {assignments.map(assign => {
                      const enrollment = staff.enrollments.find(e => e.courseId === assign.courseId);
                      const isCompleted = enrollment?.status === "COMPLETED";
                      const isOverdue = !isCompleted && new Date() > new Date(assign.endDate);
                      const daysLeft = Math.ceil((new Date(assign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                      return (
                        <td key={assign.id} className="p-4 text-center align-middle border-r border-white/5">
                          {isCompleted ? (
                            <div className="flex flex-col items-center gap-1 animate-in fade-in zoom-in duration-500">
                              <div className="bg-emerald-500/10 p-1.5 rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              </div>
                              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Completed</span>
                            </div>
                          ) : isOverdue ? (
                            <div className="flex flex-col items-center gap-1 animate-pulse">
                              <div className="bg-red-500/10 p-1.5 rounded-full">
                                <AlertCircle className="w-4 h-4 text-red-500" />
                              </div>
                              <span className="text-[9px] font-black text-red-500 uppercase tracking-tighter">Overdue</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                              <div className="w-7 h-7 rounded-full border border-slate-700 flex items-center justify-center text-[9px] font-mono text-slate-500">
                                {daysLeft > 0 ? daysLeft : 0}
                              </div>
                              <span className="text-[8px] font-bold text-slate-600 uppercase">Days Left</span>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={assignments.length + 1} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Search className="w-12 h-12 text-slate-700" />
                      <p className="text-slate-500 font-bold">一致するスタッフが見つかりません</p>
                      <Button variant="link" onClick={() => { setSearchQuery(""); setStatusFilter("all"); }} className="text-blue-400 font-bold">
                        検索条件をリセット
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
