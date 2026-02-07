import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, BookCheck, TrendingUp, LogOut, 
  Briefcase, ClipboardList, LayoutDashboard, Settings,
  GraduationCap, Bell, Plus, ChevronRight, MoreHorizontal,
  ExternalLink, BarChart3, Clock, CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterStaffForm } from "@/components/register-staff-form";
import { CourseAssignmentDialog } from "@/components/course-assignment-dialog";
import { TrainingTimeline } from "@/components/training-timeline";
import { OrgLimitStatus } from "@/components/org-limit-status";
import { StaffClient } from "./staff-client";
import { IncompleteUsersDialog } from "@/components/incomplete-users-dialog";
import { FiscalYearSelector } from "@/components/fiscal-year-selector";
import { MobileNav } from "@/components/mobile-nav";
import { NotificationBell } from "@/components/notification-bell";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const facilityId = session.user.facilityId;
  
  if (!facilityId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#120a0a]">
        <div className="text-center space-y-4">
          <Briefcase className="w-12 h-12 text-slate-700 mx-auto" />
          <p className="text-xl font-bold text-slate-500">所属施設が設定されていません</p>
        </div>
      </div>
    );
  }

  const facility = await prisma.facility.findUnique({ 
    where: { id: facilityId },
    include: { corporation: true }
  });

  if (!facility || !facility.corporation) {
    return <div className="p-20 text-center font-bold text-slate-400">所属情報が見つかりません。</div>;
  }

  const staffMembers = await prisma.user.findMany({
    where: { facilityId: facilityId, role: "STAFF" },
    select: {
      id: true,
      name: true,
      loginId: true,
      password: true,
      enrollments: { include: { course: true } }
    },
  });

  const totalStaff = staffMembers.length;
  const allAvailableCourses = await prisma.course.findMany({ orderBy: { title: 'asc' } });
  const currentAssignments = await prisma.courseAssignment.findMany({
    where: { facilityId },
    include: { course: true },
    orderBy: { endDate: 'asc' }
  });

  const totalCompletedEnrollments = staffMembers.reduce((acc, user) => {
    return acc + user.enrollments.filter(e => e.status === 'COMPLETED').length;
  }, 0);
  const totalAssignments = totalStaff * currentAssignments.length;
  const progressRate = totalAssignments > 0 ? Math.round((totalCompletedEnrollments / totalAssignments) * 100) : 0;

  const fullyCompletedStaff = staffMembers.filter(user => 
    user.enrollments.length >= currentAssignments.length && 
    currentAssignments.every(a => 
      user.enrollments.some(e => e.courseId === a.courseId && e.status === 'COMPLETED')
    )
  ).length;

  // 通知（アラート）の計算: 期限が7日以内で未完了者がいる研修
  const now = new Date();
  const alerts = currentAssignments
    .map(assign => {
      const incompleteCount = staffMembers.filter(user => 
        !user.enrollments.some(e => e.courseId === assign.courseId && e.status === 'COMPLETED')
      ).length;
      const daysLeft = Math.ceil((new Date(assign.endDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      return { courseId: assign.courseId, courseTitle: assign.course.title, daysLeft, incompleteCount };
    })
    .filter(a => a.daysLeft <= 7 && a.daysLeft >= 0 && a.incompleteCount > 0);

  return (
    <div className="h-screen bg-[#120a0a] flex flex-col font-sans overflow-hidden">
      
      {/* TuneCore Style Top Header */}
      <header className="h-20 lg:h-24 bg-[#120a0a] px-4 lg:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4 lg:gap-12">
          <MobileNav />
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-[#120a0a]" />
            </div>
            <span className="font-black text-xl lg:text-2xl tracking-tighter text-white">careCORE</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-sm leading-none">{session.user.name} さんのダッシュボード</h2>
                <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wider">{facility.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden sm:block">
            <RegisterStaffForm disabled={totalStaff >= facility.maxStaff} />
          </div>
          <NotificationBell alerts={alerts} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#120a0a] hidden lg:flex flex-col p-6 space-y-2 overflow-y-auto custom-scrollbar shrink-0">
          <a href="#annual-plan">
            <TuneSidebarItem icon={<CalendarDays className="w-5 h-5" />} label="年間計画" active />
          </a>
          <a href="#course-management">
            <TuneSidebarItem icon={<ClipboardList className="w-5 h-5" />} label="研修管理" />
          </a>
          <a href="#staff-management">
            <TuneSidebarItem icon={<Users className="w-5 h-5" />} label="スタッフ管理" />
          </a>
          
          <div className="mt-auto pt-6 border-t border-slate-800">
             <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white transition-colors w-full text-left">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-bold">ログアウト</span>
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content Area - The White Container with Large Rounded Corner */}
        <main className="flex-1 bg-white rounded-tl-[4rem] overflow-y-auto p-6 lg:p-12 shadow-2xl">
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Top Section: Timeline (annual-plan) */}
            <div id="annual-plan" className="space-y-6 scroll-mt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <CalendarDays className="w-4 h-4 text-slate-900" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">年間計画</h3>
                  <span className="text-xs text-slate-400 font-bold ml-2">直近 1 年以内</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <FiscalYearSelector currentMonth={facility.corporation?.fiscalYearStartMonth || 4} />

                  <CourseAssignmentDialog 
                    courses={allAvailableCourses} 
                    currentAssignments={currentAssignments.map(a => ({ courseId: a.courseId, endDate: a.endDate }))} 
                  />
                </div>
              </div>
              <Card className="border-none bg-slate-50/50 rounded-2xl p-4 lg:p-8 overflow-hidden">
                <TrainingTimeline 
                    startMonth={facility.corporation?.fiscalYearStartMonth || 4} 
                    assignments={currentAssignments} 
                />
              </Card>
            </div>

            {/* Middle Section: Course Management */}
            <div id="course-management" className="space-y-6 scroll-mt-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <ClipboardList className="w-4 h-4 text-slate-900" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">研修管理</h3>
                  <span className="text-xs text-slate-400 font-bold ml-2">実施中: {currentAssignments.length}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {currentAssignments.slice(0, 10).map((assign) => {
                  const courseCompletedCount = staffMembers.filter(user => 
                    user.enrollments.some(e => e.courseId === assign.courseId && e.status === 'COMPLETED')
                  ).length;
                  const courseProgressRate = totalStaff > 0 ? Math.round((courseCompletedCount / totalStaff) * 100) : 0;

                  return (
                    <div key={assign.id} className="bg-white border border-slate-100 rounded-xl px-4 lg:px-5 py-3 shadow-sm hover:shadow-md transition-shadow flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 group">
                        <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-[200px]">
                            <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                <GraduationCap className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex items-center justify-between flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 text-sm truncate mr-4" title={assign.course.title}>{assign.course.title}</h4>
                              <div className="flex items-center gap-4 shrink-0">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-slate-100 h-1 rounded-full overflow-hidden hidden md:block">
                                    <div className="bg-blue-600 h-full" style={{ width: `${courseProgressRate}%` }}></div>
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-400 tabular-nums">{courseProgressRate}%</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap hidden sm:inline">{courseCompletedCount} / {totalStaff} 名完了</span>
                              </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 lg:gap-6 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                            <p className="text-[10px] text-slate-400 font-bold uppercase whitespace-nowrap">受講期限: {new Date(assign.endDate).toLocaleDateString()}</p>
                            
                            <IncompleteUsersDialog 
                              courseTitle={assign.course.title}
                              incompleteUsers={staffMembers
                                .filter(user => !user.enrollments.some(e => e.courseId === assign.courseId && e.status === 'COMPLETED'))
                                .map(u => ({ id: u.id, name: u.name }))
                              }
                              totalCount={totalStaff}
                            />
                        </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section: Staff Management */}
            <div id="staff-management" className="space-y-6 scroll-mt-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <Users className="w-4 h-4 text-slate-900" />
                        </div>
                        <h3 className="font-bold text-xl text-slate-900">スタッフ管理</h3>
                        <span className="text-xs text-slate-400 font-bold ml-2">
                            現在 {totalStaff} 名登録済 / 枠 {facility.maxStaff} 名
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <RegisterStaffForm disabled={totalStaff >= facility.maxStaff} />
                    </div>
                </div>
                <Card className="border border-slate-100 bg-white rounded-2xl overflow-hidden shadow-sm">
                    <StaffClient staffMembers={staffMembers as any} currentAssignments={currentAssignments} />
                </Card>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function TuneSidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-lg cursor-pointer transition-all ${active ? 'bg-[#2a1a1a] text-white shadow-inner' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'text-blue-500' : ''}`}>{icon}</div>
      <span className="text-[13px] font-bold">{label}</span>
      {label === '分析・レポート' || label === '配信・収益化' ? <ChevronRight className="w-4 h-4 ml-auto text-slate-700" /> : null}
    </div>
  );
}