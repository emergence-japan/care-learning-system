import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, BookCheck, TrendingUp, LogOut, 
  Briefcase, ClipboardList, LayoutDashboard, Settings,
  GraduationCap, Bell, Plus, ChevronRight, MoreHorizontal,
  ExternalLink, BarChart3, Clock, CalendarDays, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RegisterStaffForm } from "@/components/register-staff-form";
import { CourseAssignmentDialog } from "@/components/course-assignment-dialog";
import { TrainingTimeline } from "@/components/training-timeline";
import { OrgLimitStatus } from "@/components/org-limit-status";
import { IncompleteUsersDialog } from "@/components/incomplete-users-dialog";
import { FiscalYearSelector } from "@/components/fiscal-year-selector";
import { MobileNav } from "@/components/mobile-nav";
import { NotificationBell } from "@/components/notification-bell";
import { PrintButton } from "@/components/print-button";
import { AdminClient } from "./admin-client";
import { AlertCircle } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const isSuspended = session.user.isSuspended;
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

  const facility = await prisma.facility.findUnique({ 
    where: { id: facilityId },
    include: { corporation: true }
  });

  if (!facility || !facility.corporation) {
    return <div className="p-20 text-center font-bold text-slate-400">所属情報が見つかりません。</div>;
  }

  const staffMembers = await prisma.user.findMany({
    where: { facilityId: facilityId, role: "STAFF" },
    include: {
      enrollments: {
        include: { course: true }
      }
    },
    orderBy: { name: 'asc' }
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

  // 通知（アラート）の計算
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
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      
      {/* Professional White Header */}
      <header className="h-20 lg:h-24 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4 lg:gap-12">
          <MobileNav />
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-900 rounded flex items-center justify-center shadow-lg shadow-slate-200">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="font-black text-xl lg:text-2xl tracking-tighter text-slate-900">careCORE</span>
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

        <div className="flex items-center gap-2 lg:gap-4">
          <NotificationBell alerts={alerts} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - White Modern Style */}
        <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 space-y-2 overflow-y-auto custom-scrollbar shrink-0">
          <a href="#annual-plan">
            <SidebarItem icon={<CalendarDays className="w-5 h-5" />} label="年間計画" active />
          </a>
          <a href="#course-management">
            <SidebarItem icon={<ClipboardList className="w-5 h-5" />} label="研修管理" />
          </a>
          <a href="#staff-management">
            <SidebarItem icon={<Users className="w-5 h-5" />} label="スタッフ管理" />
          </a>
          <Link href="/admin/inquiry">
            <SidebarItem icon={<MessageSquare className="w-5 h-5" />} label="サポートセンター" />
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
          
          {isSuspended && (
            <div className="max-w-6xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4 text-red-800 animate-pulse no-print">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <div>
                <p className="font-black text-sm">【利用停止中】契約満了または停止設定により、現在このアカウントは「閲覧・出力のみ」の制限モードになっています。</p>
                <p className="text-xs font-bold mt-0.5">新規スタッフの登録や研修の割当は行えません。監査用書類の出力は可能です。</p>
              </div>
            </div>
          )}

          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Top Section: Timeline (annual-plan) */}
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
                          courses={allAvailableCourses} 
                          currentAssignments={currentAssignments.map(a => ({ courseId: a.courseId, endDate: a.endDate }))} 
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Card className="border border-slate-200 bg-white rounded-[2rem] p-4 lg:p-10 shadow-sm overflow-hidden">
                <TrainingTimeline 
                    startMonth={facility.corporation?.fiscalYearStartMonth || 4} 
                    assignments={currentAssignments} 
                />
              </Card>
            </div>

            {/* Middle Section: Course Management */}
            <div id="course-management" className="space-y-6 scroll-mt-10">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                      <ClipboardList className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">研修管理</h3>
                  <span className="text-[10px] bg-slate-100 text-slate-500 font-black px-2 py-0.5 rounded-full ml-2 uppercase">Active: {currentAssignments.length}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {currentAssignments.slice(0, 15).map((assign) => {
                  const courseCompletedCount = staffMembers.filter(user => 
                    user.enrollments.some(e => e.courseId === assign.courseId && e.status === 'COMPLETED')
                  ).length;
                  const courseProgressRate = totalStaff > 0 ? Math.round((courseCompletedCount / totalStaff) * 100) : 0;

                  return (
                    <div key={assign.id} className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 group">
                        <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                                <GraduationCap className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex items-center justify-between flex-1 min-w-0">
                              <h4 className="font-bold text-slate-900 text-sm truncate mr-4" title={assign.course.title}>{assign.course.title}</h4>
                              <div className="flex items-center gap-6 shrink-0">
                                <div className="flex items-center gap-2">
                                  <div className="w-20 bg-slate-100 h-1 rounded-full overflow-hidden hidden md:block">
                                    <div className="bg-blue-600 h-full" style={{ width: `${courseProgressRate}%` }}></div>
                                  </div>
                                  <span className="text-[10px] font-bold text-slate-400 tabular-nums">{courseProgressRate}%</span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap hidden sm:inline">{courseCompletedCount} / {totalStaff} 名完了</span>
                              </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
                            <p className="text-[10px] text-slate-400 font-bold uppercase whitespace-nowrap bg-slate-50 px-2 py-1 rounded">期限: {new Date(assign.endDate).toLocaleDateString()}</p>
                            
                            <div className="no-print">
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
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section: Staff Management (Using AdminClient) */}
            <AdminClient 
              staffMembers={staffMembers}
              currentAssignments={currentAssignments}
              maxStaff={facility.maxStaff}
              isSuspended={isSuspended}
            />

          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${active ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}>
      <div className={`${active ? 'text-blue-400' : ''}`}>{icon}</div>
      <span className="text-[13px] font-bold">{label}</span>
    </div>
  );
}
