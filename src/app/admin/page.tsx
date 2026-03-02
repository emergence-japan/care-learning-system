import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { 
  Users, LogOut, 
  ClipboardList, GraduationCap, 
  CalendarDays, MessageSquare,
  FileText
} from "lucide-react";
import Link from "next/link";
import { AdminClient } from "./admin-client";
import { FiscalYearSelector } from "@/components/fiscal-year-selector";
import { CourseAssignmentDialog } from "@/components/course-assignment-dialog";
import { TrainingTimeline } from "@/components/training-timeline";
import { IncompleteUsersDialog } from "@/components/incomplete-users-dialog";
import { MobileNav } from "@/components/mobile-nav";
import { SystemNotification } from "@/components/system-notification";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const facilityId = session.user.facilityId;
  if (!facilityId) return <div className="p-20 text-center font-bold">所属施設が未設定です</div>;

  const facility = await prisma.facility.findUnique({ 
    where: { id: facilityId },
    include: { corporation: true }
  });

  if (!facility) return <div className="p-20 text-center font-bold">施設情報が見つかりません</div>;

  // 1. 全てのデータを取得
  const [rawStaff, rawCourses, rawAssignments] = await Promise.all([
    prisma.user.findMany({
      where: { facilityId: facilityId, role: "STAFF" },
      include: { enrollments: { include: { course: true } } },
      orderBy: { name: 'asc' }
    }),
    prisma.course.findMany({ orderBy: { title: 'asc' } }),
    prisma.courseAssignment.findMany({
      where: { facilityId },
      include: { course: true },
      orderBy: { endDate: 'asc' }
    })
  ]);

  // 2. 重要：クライアントに渡すすべてのデータを安全に文字列化（ISO String）
  // これを行わないと Vercel の Server Components でシリアライズエラーになります
  const staffMembers = (rawStaff || []).map(s => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
    enrollments: (s.enrollments || []).map(e => ({
      ...e,
      completedAt: e.completedAt ? e.completedAt.toISOString() : null,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
      course: {
        ...e.course,
        createdAt: e.course.createdAt.toISOString(),
        updatedAt: e.course.updatedAt.toISOString(),
      }
    }))
  }));

  const allAvailableCourses = (rawCourses || []).map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  const assignments = (rawAssignments || []).map(a => ({
    ...a,
    startDate: a.startDate.toISOString(),
    endDate: a.endDate.toISOString(),
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    course: {
      ...a.course,
      createdAt: a.course.createdAt.toISOString(),
      updatedAt: a.course.updatedAt.toISOString(),
    }
  }));

  const totalStaff = staffMembers.length;

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="h-20 lg:h-24 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4 lg:gap-12">
          <MobileNav />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-900 rounded flex items-center justify-center shadow-lg">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="font-black text-xl lg:text-2xl tracking-tighter text-slate-900 uppercase">Care Learning</span>
          </div>
          <div className="hidden lg:flex items-center gap-3 border-l border-slate-100 pl-6">
            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{facility.name}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 space-y-2 shrink-0">
          <Link href="#annual-plan" className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-slate-900 text-white shadow-xl">
            <CalendarDays className="w-5 h-5 text-blue-400" />
            <span className="text-[13px] font-bold">年間計画</span>
          </Link>
          <Link href="#course-management" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all">
            <ClipboardList className="w-5 h-5" />
            <span className="text-[13px] font-bold">研修管理</span>
          </Link>
          <Link href="#staff-management" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all">
            <Users className="w-5 h-5" />
            <span className="text-[13px] font-bold">スタッフ管理</span>
          </Link>
          <Link href="/admin/reports" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all">
            <FileText className="w-5 h-5" />
            <span className="text-[13px] font-bold">監査レポート管理</span>
          </Link>
          <Link href="/admin/inquiry" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all">
            <MessageSquare className="w-5 h-5" />
            <span className="text-[13px] font-bold">サポートセンター</span>
          </Link>
          <div className="mt-auto pt-6 border-t border-slate-50">
             <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-600 transition-all w-full text-left font-bold text-sm">
                <LogOut className="w-5 h-5" />
                <span>ログアウト</span>
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 space-y-12">
          <SystemNotification />

          {/* 1. 年間計画 */}
          <div id="annual-plan" className="space-y-6 scroll-mt-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
              <h3 className="font-bold text-xl text-slate-900 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-blue-600" />
                </div>
                年間計画
              </h3>
              <div className="flex items-center gap-2 no-print">
                <FiscalYearSelector currentMonth={facility.corporation?.fiscalYearStartMonth || 4} />
                <CourseAssignmentDialog 
                  courses={allAvailableCourses as any} 
                  currentAssignments={assignments.map(a => ({ courseId: a.courseId, endDate: new Date(a.endDate) }))} 
                />
              </div>
            </div>
            <Card className="border border-slate-200 bg-white rounded-[2rem] p-4 lg:p-10 shadow-sm min-h-[200px] flex items-center justify-center overflow-hidden">
              {assignments.length > 0 ? (
                <TrainingTimeline 
                    startMonth={facility.corporation?.fiscalYearStartMonth || 4} 
                    assignments={assignments as any} 
                />
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-400 font-bold">研修が割り当てられていません</p>
                  <p className="text-slate-300 text-xs mt-2">右上のボタンから計画を設定してください。</p>
                </div>
              )}
            </Card>
          </div>

          {/* 2. 研修管理 */}
          <div id="course-management" className="space-y-6 scroll-mt-10">
            <h3 className="font-bold text-xl text-slate-900 px-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                <ClipboardList className="w-4 h-4 text-emerald-600" />
              </div>
              研修管理
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {assignments.length > 0 ? assignments.map((assign) => {
                const completedCount = staffMembers.filter(user => 
                  user.enrollments?.some(e => e.courseId === assign.courseId && e.status === 'COMPLETED')
                ).length;
                const rate = totalStaff > 0 ? Math.round((completedCount / totalStaff) * 100) : 0;

                return (
                  <div key={assign.id} className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                          <GraduationCap className="w-5 h-5 text-blue-600" />
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-sm">{assign.course?.title}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-[10px] font-bold text-slate-400">{rate}% 完了</span>
                              <span className="text-[10px] text-slate-300">期限: {new Date(assign.endDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                      </div>
                      <div className="no-print">
                        <IncompleteUsersDialog 
                          courseTitle={assign.course?.title || ""}
                          incompleteUsers={staffMembers
                            .filter(user => !user.enrollments?.some(e => e.courseId === assign.courseId && e.status === 'COMPLETED'))
                            .map(u => ({ id: u.id, name: u.name }))
                          }
                          totalCount={totalStaff}
                        />
                      </div>
                  </div>
                );
              }) : (
                <div className="p-12 text-center text-slate-300 font-bold border-2 border-dashed rounded-2xl bg-white">
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
