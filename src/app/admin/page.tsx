import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { 
  Users, LogOut, 
  GraduationCap, 
  CalendarDays, MessageSquare, ClipboardList
} from "lucide-react";
import Link from "next/link";
import { AdminClient } from "./admin-client";
import { FiscalYearSelector } from "@/components/fiscal-year-selector";
import { CourseAssignmentDialog } from "@/components/course-assignment-dialog";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const facilityId = session.user.facilityId;
  const facility = await prisma.facility.findUnique({ 
    where: { id: facilityId || "" },
    include: { corporation: true }
  });

  if (!facility) return <div className="p-20">施設が見つかりません</div>;

  const [rawStaff, allAvailableCourses, rawAssignments] = await Promise.all([
    prisma.user.findMany({
      where: { facilityId: facilityId || "", role: "STAFF" },
      include: { enrollments: { include: { course: true } } },
      orderBy: { name: 'asc' }
    }),
    prisma.course.findMany({ orderBy: { title: 'asc' } }),
    prisma.courseAssignment.findMany({
      where: { facilityId: facilityId || "" },
      include: { course: true },
      orderBy: { endDate: 'asc' }
    })
  ]);

  // 日付の文字列化
  const assignments = (rawAssignments || []).map(a => ({
    ...a,
    startDate: a.startDate.toISOString(),
    endDate: a.endDate.toISOString(),
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));

  const staffMembers = (rawStaff || []).map(s => ({
    ...s,
    enrollments: (s.enrollments || []).map(e => ({
      ...e,
      completedAt: e.completedAt ? e.completedAt.toISOString() : null,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
    }))
  }));

  const totalStaff = staffMembers.length;

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Header (Minimal) */}
      <header className="h-20 lg:h-24 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-900 rounded flex items-center justify-center shadow-lg">
            <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
          <span className="font-black text-xl lg:text-2xl tracking-tighter text-slate-900">ADMIN MODE</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 space-y-2 shrink-0">
          <div className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-slate-900 text-white shadow-xl">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-[13px] font-bold">ステップ8テスト中</span>
          </div>
          <div className="mt-auto pt-6 border-t border-slate-50 text-xs text-slate-300 px-4 font-bold uppercase">
            Data: {staffMembers.length} Staff / {assignments.length} Plan
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-12">
          
          {/* 1. 年間計画（枠のみ） */}
          <div id="annual-plan" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl text-slate-900 flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-blue-600" /> 年間計画
              </h3>
              <div className="flex items-center gap-2">
                <FiscalYearSelector currentMonth={facility.corporation?.fiscalYearStartMonth || 4} />
                <CourseAssignmentDialog 
                  courses={allAvailableCourses} 
                  currentAssignments={assignments.map(a => ({ courseId: a.courseId, endDate: new Date(a.endDate) }))} 
                />
              </div>
            </div>
            <Card className="border border-slate-200 bg-white rounded-[2rem] p-12 text-center text-slate-300 font-bold min-h-[200px] flex items-center justify-center">
              {assignments.length > 0 ? "タイムライン部品はまだ停止中" : "研修が割り当てられていません"}
            </Card>
          </div>

          {/* 2. 研修管理（カード一覧） */}
          <div id="course-management" className="space-y-6">
            <h3 className="font-bold text-xl text-slate-900 flex items-center gap-3">
              <ClipboardList className="w-5 h-5 text-emerald-600" /> 研修管理
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {assignments.length > 0 ? (
                <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-400">
                  割当あり（表示ロジックはまだ停止中）
                </div>
              ) : (
                <div className="p-8 text-center text-slate-300 font-bold border-2 border-dashed rounded-2xl">
                  研修データなし
                </div>
              )}
            </div>
          </div>

          {/* 3. スタッフ管理 */}
          <AdminClient 
            staffMembers={staffMembers as any}
            currentAssignments={assignments as any}
            maxStaff={facility.maxStaff ?? 20}
          />

        </main>
      </div>
    </div>
  );
}
