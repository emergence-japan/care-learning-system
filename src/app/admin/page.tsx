import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, BookCheck, TrendingUp, LogOut, 
  ArrowRight, UserPlus, ClipboardList, Briefcase, CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterStaffForm } from "@/components/register-staff-form";
import { DeleteButton } from "@/components/delete-button";
import { CourseAssignmentDialog } from "@/components/course-assignment-dialog";
import { TrainingTimeline } from "@/components/training-timeline";
import { OrgLimitStatus } from "@/components/org-limit-status";
import { StaffClient } from "./staff-client";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  const facilityId = (session.user as any).facilityId;
  const corporationId = (session.user as any).corporationId;
  
  if (!facilityId) {
    return <div className="p-20 text-center font-bold text-slate-400">所属施設が設定されていません。</div>;
  }

  // 施設情報と法人情報を取得
  const facility = await prisma.facility.findUnique({ 
    where: { id: facilityId },
    include: { 
      corporation: {
        include: {
          _count: {
            select: { users: { where: { role: "STAFF" } } }
          }
        }
      }
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
  
  // 全研修コースの取得（割当用）
  const allAvailableCourses = await prisma.course.findMany({
    orderBy: { title: 'asc' }
  });

  // 現在の施設の割当状況を取得
  const currentAssignments = await prisma.courseAssignment.findMany({
    where: { facilityId },
    include: { course: true },
    orderBy: { endDate: 'asc' }
  });

  // 統計の算出
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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white pb-20">
      {/* Admin Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 h-20 flex items-center px-6">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 rotate-3">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-black text-xl text-slate-900 tracking-tight leading-none">Admin Control</h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1.5">{facility?.name}</p>
            </div>
          </div>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50">
              <LogOut className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 space-y-12">
        {/* Organization Limits Status */}
        <div className="max-w-md mx-auto">
          <OrgLimitStatus 
            type="staff" 
            label="施設スタッフ登録枠" 
            current={currentFacilityStaffCount} 
            max={maxFacilityStaff} 
          />
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1 space-y-8">
            <RegisterStaffForm disabled={isStaffLimitReached} />
            <CourseAssignmentDialog 
              courses={allAvailableCourses} 
              currentAssignments={currentAssignments.map(a => ({ courseId: a.courseId, endDate: a.endDate }))} 
            />
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminStatCard title="所属スタッフ" value={totalStaff} unit="名" icon={<Users className="w-5 h-5" />} color="text-blue-600" />
            <AdminStatCard title="全研修完了者" value={fullyCompletedStaff} unit="名" icon={<BookCheck className="w-5 h-5" />} color="text-emerald-600" subValue={`全 ${currentAssignments.length} 項目完了`} />
            <AdminStatCard title="計画進捗率" value={progressRate} unit="%" icon={<TrendingUp className="w-5 h-5" />} color="text-orange-600" isProgress />
          </div>
        </div>

        {/* Visual Timeline Section */}
        <section className="space-y-8">
          <TrainingTimeline 
            startMonth={facility?.corporation?.fiscalYearStartMonth || 4} 
            assignments={currentAssignments} 
          />
        </section>

        {/* Staff Table */}
        <StaffClient staffMembers={staffMembers as any} currentAssignments={currentAssignments} />
      </main>
    </div>
  );
}

function AdminStatCard({ title, value, unit, icon, color, subValue, isProgress }: { title: string, value: number, unit: string, icon: React.ReactNode, color: string, subValue?: string, isProgress?: boolean }) {
  return (
    <Card className="bg-white border-slate-200/60 rounded-[2rem] shadow-sm overflow-hidden">
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
          <div className={`${color} opacity-80`}>{icon}</div>
        </div>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-3xl font-black text-slate-900 tabular-nums">{value}</span>
          <span className="text-xs font-bold text-slate-400">{unit}</span>
        </div>
        {isProgress ? (
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="bg-orange-500 h-full" style={{ width: `${value}%` }}></div>
          </div>
        ) : subValue ? (
          <p className="text-[10px] font-bold text-slate-400 uppercase">{subValue}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
