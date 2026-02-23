import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { 
  Users, LogOut, 
  Briefcase, ClipboardList, GraduationCap, 
  CalendarDays, MessageSquare
} from "lucide-react";
import Link from "next/link";
import { CourseAssignmentDialog } from "@/components/course-assignment-dialog";
import { TrainingTimeline } from "@/components/training-timeline";
import { IncompleteUsersDialog } from "@/components/incomplete-users-dialog";
import { FiscalYearSelector } from "@/components/fiscal-year-selector";
import { MobileNav } from "@/components/mobile-nav";
import { PrintButton } from "@/components/print-button";
import { SystemNotification } from "@/components/system-notification";
import { AdminClient } from "./admin-client";
import { AlertCircle } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();

  // 1. セッションとロールの基本ガード
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const isSuspended = !!session.user.isSuspended;
  const facilityId = session.user.facilityId;
  
  if (!facilityId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="text-xl font-bold text-slate-400">所属施設が設定されていません</p>
        </div>
      </div>
    );
  }

  // 2. 施設・法人データの取得（厳格なガード）
  const facility = await prisma.facility.findUnique({ 
    where: { id: facilityId },
    include: { corporation: true }
  });

  if (!facility) {
    return <div className="p-20 text-center font-bold text-slate-400">所属施設(ID: {facilityId})が見つかりません。データベースのリセットにより、ユーザーの紐付けが切れている可能性があります。</div>;
  }

  // 3. 各種データの取得
  const [staffMembers, allAvailableCourses, currentAssignments] = await Promise.all([
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

  const totalStaff = staffMembers?.length || 0;
  const assignments = currentAssignments || [];
  const courses = allAvailableCourses || [];

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <header className="h-20 lg:h-24 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4 lg:gap-12">
          <MobileNav />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-900 rounded flex items-center justify-center shadow-lg shadow-slate-200">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="font-black text-xl lg:text-2xl tracking-tighter text-slate-900 uppercase">Care Learning</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-slate-900 font-bold text-sm leading-none">{session.user.name} さん</h2>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">{facility.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 space-y-2 overflow-y-auto custom-scrollbar shrink-0">
          <Link href="#annual-plan" className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-slate-900 text-white shadow-xl">
            <CalendarDays className="w-5 h-5 text-blue-400" />
            <span className="text-[13px] font-bold">年間計画</span>
          </Link>
          <Link href="#course-management" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50">
            <ClipboardList className="w-5 h-5" />
            <span className="text-[13px] font-bold">研修管理</span>
          </Link>
          <Link href="#staff-management" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50">
            <Users className="w-5 h-5" />
            <span className="text-[13px] font-bold">スタッフ管理</span>
          </Link>
          <Link href="/admin/inquiry" className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-50">
            <MessageSquare className="w-5 h-5" />
            <span className="text-[13px] font-bold">サポートセンター</span>
          </Link>
          
          <div className="mt-auto pt-6 border-t border-slate-50">
             <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-600 transition-all w-full text-left font-bold text-sm group">
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>ログアウト</span>
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 relative">
          <SystemNotification />

          {isSuspended && (
            <div className="max-w-6xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4 text-red-800 no-print">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <p className="font-black text-sm">【利用停止中】制限モードになっています。</p>
            </div>
          )}

          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* 年間計画 Section */}
            <div id="annual-plan" className="space-y-6 scroll-mt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <CalendarDays className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">年間計画</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <PrintButton />
                  <div className="no-print flex items-center gap-2">
                    {!isSuspended && (
                      <>
                        <FiscalYearSelector currentMonth={facility.corporation?.fiscalYearStartMonth || 4} />
                        <CourseAssignmentDialog 
                          courses={courses} 
                          currentAssignments={assignments.map(a => ({ courseId: a.courseId, endDate: a.endDate }))} 
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <Card className="border border-slate-200 bg-white rounded-[2rem] p-4 lg:p-10 shadow-sm overflow-hidden min-h-[200px] flex items-center justify-center">
                {assignments.length > 0 ? (
                  <TrainingTimeline 
                      startMonth={facility.corporation?.fiscalYearStartMonth || 4} 
                      assignments={assignments} 
                  />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-400 font-bold">研修が割り当てられていません</p>
                    <p className="text-slate-300 text-xs mt-2">右上の「研修を割り当てる」ボタンから設定してください。</p>
                  </div>
                )}
              </Card>
            </div>

            {/* 研修管理 Section */}
            <div id="course-management" className="space-y-6 scroll-mt-10">
              <h3 className="font-bold text-xl text-slate-900 px-2 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-emerald-600" />
                </div>
                研修管理
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {assignments.length > 0 ? assignments.map((assign) => {
                  const courseCompletedCount = staffMembers.filter(user => 
                    user.enrollments?.some(e => e.courseId === assign.courseId && e.status === 'COMPLETED')
                  ).length;
                  const courseProgressRate = totalStaff > 0 ? Math.round((courseCompletedCount / totalStaff) * 100) : 0;

                  return (
                    <div key={assign.id} className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <GraduationCap className="w-5 h-5 text-blue-600" />
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-900 text-sm">{assign.course?.title || "研修タイトル不明"}</h4>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-[10px] font-bold text-slate-400">{courseProgressRate}% 完了</span>
                                <span className="text-[10px] text-slate-300">期限: {assign.endDate ? new Date(assign.endDate).toLocaleDateString() : "-"}</span>
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
                  <div className="p-8 text-center text-slate-300 font-bold border-2 border-dashed rounded-2xl">
                    データなし
                  </div>
                )}
              </div>
            </div>

            {/* スタッフ管理 Section */}
            <AdminClient 
              staffMembers={staffMembers}
              currentAssignments={assignments}
              maxStaff={facility.maxStaff ?? 20} // NULL対策：デフォルト20
              isSuspended={isSuspended}
            />

          </div>
        </main>
      </div>
    </div>
  );
}
