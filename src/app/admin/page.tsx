import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, BookCheck, TrendingUp, LogOut, 
  Briefcase, ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterStaffForm } from "@/components/register-staff-form";
import { CourseAssignmentDialog } from "@/components/course-assignment-dialog";
import { TrainingTimeline } from "@/components/training-timeline";
import { OrgLimitStatus } from "@/components/org-limit-status";
import { StaffClient } from "./staff-client";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

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

  // 施設情報と法人情報を取得
  const facility = await prisma.facility.findUnique({ 
    where: { id: facilityId },
    include: { 
      corporation: true
    }
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

  const currentFacilityStaffCount = totalStaff;
  const maxFacilityStaff = facility.maxStaff;
  const isStaffLimitReached = currentFacilityStaffCount >= maxFacilityStaff;

  const fullyCompletedStaff = staffMembers.filter(user => 
    user.enrollments.length >= currentAssignments.length && 
    currentAssignments.every(a => 
      user.enrollments.some(e => e.courseId === a.courseId && e.status === 'COMPLETED')
    )
  ).length;

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Refined Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-none">施設管理パネル</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{facility.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900">{session.user.name}</p>
              <p className="text-[10px] text-slate-500 font-medium">管理者権限</p>
            </div>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 transition-colors">
                <LogOut className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Top Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Statistics */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <AdminStatCard title="所属スタッフ" value={totalStaff} unit="名" icon={<Users className="w-4 h-4" />} />
              <AdminStatCard title="全研修完了者" value={fullyCompletedStaff} unit="名" icon={<BookCheck className="w-4 h-4" />} />
              <AdminStatCard title="計画進捗率" value={progressRate} unit="%" icon={<TrendingUp className="w-4 h-4" />} isProgress />
            </div>

            {/* Visual Timeline Card */}
            <Card className="border-slate-200 shadow-sm overflow-hidden rounded-xl bg-white">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">年間研修実施計画</h3>
                <CourseAssignmentDialog 
                  courses={allAvailableCourses} 
                  currentAssignments={currentAssignments.map(a => ({ courseId: a.courseId, endDate: a.endDate }))} 
                />
              </div>
              <div className="p-6">
                <TrainingTimeline 
                  startMonth={facility.corporation?.fiscalYearStartMonth || 4} 
                  assignments={currentAssignments} 
                />
              </div>
            </Card>
          </div>

          {/* Side Actions & Limits */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-900">リソース状況</h3>
              </div>
              <div className="p-6 space-y-6">
                <OrgLimitStatus 
                  type="staff" 
                  label="スタッフ登録数" 
                  current={currentFacilityStaffCount} 
                  max={maxFacilityStaff} 
                />
                <div className="pt-4 border-t border-slate-100">
                  <RegisterStaffForm disabled={isStaffLimitReached} />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Staff Data */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <ClipboardList className="w-4 h-4 text-slate-400" />
            <h3 className="text-lg font-bold text-slate-900">スタッフ受講モニタリング</h3>
          </div>
          <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
            <StaffClient staffMembers={staffMembers as any} currentAssignments={currentAssignments} />
          </Card>
        </section>
      </main>
    </div>
  );
}

function AdminStatCard({ title, value, unit, icon, isProgress }: { title: string, value: number, unit: string, icon: React.ReactNode, isProgress?: boolean }) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden hover:border-slate-300 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600">
            {icon}
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-slate-900 tabular-nums">{value}</span>
          <span className="text-xs font-medium text-slate-400">{unit}</span>
        </div>
        {isProgress && (
          <div className="mt-4 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-slate-900 h-full transition-all duration-1000" 
              style={{ width: `${value}%` }}
            ></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}