import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, BookCheck, TrendingUp, LogOut, 
  ArrowRight, UserPlus, ClipboardList, Briefcase 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RegisterStaffForm } from "@/components/register-staff-form";
import { DeleteButton } from "@/components/delete-button";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  const facilityId = (session.user as any).facilityId;
  if (!facilityId) {
    return <div className="p-20 text-center font-bold text-slate-400">所属施設が設定されていません。</div>;
  }

  const facility = await prisma.facility.findUnique({ where: { id: facilityId } });

  const staffMembers = await prisma.user.findMany({
    where: { facilityId: facilityId, role: "STAFF" },
    include: { enrollments: { include: { course: true } } },
  });

  const totalCoursesCount = await prisma.course.count();
  const totalStaff = staffMembers.length;
  const fullyCompletedStaff = staffMembers.filter(user => 
    user.enrollments.length === totalCoursesCount && user.enrollments.every(e => e.status === 'COMPLETED')
  ).length;

  const totalCompletedEnrollments = staffMembers.reduce((acc, user) => {
    return acc + user.enrollments.filter(e => e.status === 'COMPLETED').length;
  }, 0);
  const totalAssignments = totalStaff * totalCoursesCount;
  const progressRate = totalAssignments > 0 ? Math.round((totalCompletedEnrollments / totalAssignments) * 100) : 0;

  const courses = await prisma.course.findMany({
    include: { enrollments: { where: { user: { facilityId: facilityId } } } },
  });

  const courseStats = courses.map(course => {
    const completedCount = course.enrollments.filter(e => e.status === 'COMPLETED').length;
    return { id: course.id, title: course.title, completedCount, rate: totalStaff > 0 ? Math.round((completedCount / totalStaff) * 100) : 0 };
  });

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
            <Button variant="ghost" size="sm" className="rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 font-bold">
              <LogOut className="w-4 h-4 mr-2" /> ログアウト
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 space-y-12">
        {/* Registration & Top Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl" />
              <RegisterStaffForm />
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <AdminStatCard title="所属スタッフ" value={totalStaff} unit="名" icon={<Users className="w-5 h-5" />} color="text-blue-600" />
            <AdminStatCard title="全研修完了者" value={fullyCompletedStaff} unit="名" icon={<BookCheck className="w-5 h-5" />} color="text-emerald-600" subValue={`全 ${totalCoursesCount} 項目完了`} />
            <AdminStatCard title="施設進捗率" value={progressRate} unit="%" icon={<TrendingUp className="w-5 h-5" />} color="text-orange-600" isProgress />
          </div>
        </div>

        {/* Staff Progress Table */}
        <section className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-200/60 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center gap-3">
            <ClipboardList className="w-5 h-5 text-slate-400" />
            <h3 className="font-black text-xl text-slate-900 tracking-tight">スタッフ別受講モニタリング</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Staff Member</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Progress Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {staffMembers.length > 0 ? (
                  staffMembers.map((staff) => (
                    <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="font-bold text-slate-900">{staff.name}</div>
                        <div className="text-xs text-slate-400 font-medium">{staff.email}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-sm font-black text-slate-700">
                            {staff.enrollments.filter(e => e.status === 'COMPLETED').length} / {totalCoursesCount} 完了
                          </span>
                          <div className="w-32 bg-slate-100 h-1 rounded-full overflow-hidden">
                            <div className="bg-slate-900 h-full" style={{ width: `${(staff.enrollments.filter(e => e.status === 'COMPLETED').length / totalCoursesCount) * 100}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <DeleteButton id={staff.id} name={staff.name} type="user" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-8 py-20 text-center text-slate-400 font-medium">
                      スタッフが登録されていません。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Course Stats */}
        <section className="space-y-8">
          <div className="px-2 border-l-4 border-slate-900">
            <h3 className="font-black text-xl text-slate-900 tracking-tight">研修項目別サマリー</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseStats.map((course) => (
              <Card key={course.id} className="bg-white border-slate-200/60 rounded-[2rem] p-8 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Course Module</p>
                    <h4 className="font-bold text-slate-900 leading-tight">{course.title}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900">{course.rate}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-50 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: `${course.rate}%` }}></div>
                </div>
                <p className="mt-3 text-[10px] font-bold text-slate-400">COMPLETED BY {course.completedCount} / {totalStaff} STAFF</p>
              </Card>
            ))}
          </div>
        </section>
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
          <span className="text-3xl font-black text-slate-900">{value}</span>
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
