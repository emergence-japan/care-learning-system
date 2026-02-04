import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, Users, TrendingUp, LogOut, 
  ArrowRight, ShieldCheck, PieChart, Map, Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/delete-button";
import { OrgLimitStatus } from "@/components/org-limit-status";

export default async function HQDashboardPage() {
// ... (既存のコード)
  const corporationId = (session.user as any).corporationId;
  if (!corporationId) {
    return <div className="p-20 text-center font-bold text-slate-400">所属法人が設定されていません。</div>;
  }

  const corporation = await prisma.corporation.findUnique({
    where: { id: corporationId },
    include: {
      _count: {
        select: { facilities: true }
      },
      facilities: {
        include: {
          _count: {
            select: { users: { where: { role: "STAFF" } } }
          },
          users: {
            where: { role: "STAFF" },
            include: { enrollments: true },
          },
        },
      },
    },
  });

  if (!corporation) return null;

  const totalCoursesCount = await prisma.course.count();
  const currentFacilitiesCount = corporation._count.facilities;
  const currentStaffCount = corporation.facilities.reduce((acc, f) => acc + f._count.users, 0);

  const facilityStats = corporation.facilities.map(facility => {
// ... (既存のコード)
    const totalStaff = facility.users.length;
    const completedEnrollments = facility.users.reduce((acc, user) => {
      return acc + user.enrollments.filter(e => e.status === 'COMPLETED').length;
    }, 0);
    const totalAssignments = totalStaff * totalCoursesCount;
    const progressRate = totalAssignments > 0 
      ? Math.round((completedEnrollments / totalAssignments) * 100) 
      : 0;

    return { id: facility.id, name: facility.name, staffCount: totalStaff, progressRate };
  }) || [];

  const totalFacilities = facilityStats.length;
  const avgProgressRate = totalFacilities > 0 
    ? Math.round(facilityStats.reduce((acc, f) => acc + f.progressRate, 0) / totalFacilities) 
    : 0;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white pb-20">
      {/* HQ Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 h-20 shadow-2xl overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg -rotate-2">
              <Building2 className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight leading-none">HQ Dashboard</h1>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1.5">{corporation?.name}</p>
            </div>
          </div>
          
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-all">
              <LogOut className="w-4 h-4 mr-2" /> ログアウト
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 space-y-12">
        {/* Organization Limits Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OrgLimitStatus 
            type="facility" 
            label="運営施設枠" 
            current={currentFacilitiesCount} 
            max={corporation.maxFacilities} 
          />
          <OrgLimitStatus 
            type="staff" 
            label="登録スタッフ枠" 
            current={currentStaffCount} 
            max={corporation.maxStaff} 
          />
        </div>

        {/* HQ Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <HQStatCard title="運営施設数" value={totalFacilities} label="施設" icon={<Map className="w-6 h-6" />} color="bg-blue-600" />
          <HQStatCard title="法人全体進捗" value={avgProgressRate} label="%" icon={<TrendingUp className="w-6 h-6" />} color="bg-orange-600" isProgress />
          <div className="bg-white border border-slate-200/60 rounded-[2rem] p-8 flex flex-col justify-center shadow-sm">
            <div className="flex items-center gap-3 text-emerald-600 mb-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Compliance Status</span>
            </div>
            <p className="text-xl font-black text-slate-900 leading-tight">全サービスの義務化項目<br/>100% 準拠中</p>
          </div>
        </div>

        {/* Facility Management Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <PieChart className="w-5 h-5 text-slate-400" />
              <h3 className="font-black text-2xl text-slate-900 tracking-tight">施設別モニタリング</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilityStats.map((facility) => (
              <Card key={facility.id} className="group relative bg-white border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-black text-2xl text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{facility.name}</h4>
                        <DeleteButton id={facility.id} name={facility.name} type="facility" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                        <Users className="w-3.5 h-3.5" />
                        所属スタッフ {facility.staffCount} 名
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-slate-900 tabular-nums">{facility.progressRate}%</div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Completion</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-slate-900 h-full transition-all duration-1000 group-hover:bg-blue-600" 
                        style={{ width: `${facility.progressRate}%` }}
                      ></div>
                    </div>
                    
                    <Button variant="outline" className="w-full h-14 rounded-2xl justify-between px-6 border-slate-200 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all font-black text-xs uppercase tracking-widest">
                      詳細データを開く
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function HQStatCard({ title, value, label, icon, color, isProgress }: { title: string, value: number, label: string, icon: React.ReactNode, color: string, isProgress?: boolean }) {
  return (
    <Card className="bg-white border-slate-200/60 rounded-[2rem] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] overflow-hidden">
      <CardContent className="p-8 flex items-center justify-between">
        <div className="space-y-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{title}</p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900 tabular-nums">{value}</span>
            <span className="text-sm font-bold text-slate-400">{label}</span>
          </div>
          {isProgress && (
            <div className="w-24 bg-slate-100 rounded-full h-1 overflow-hidden">
              <div className={`${color} h-full`} style={{ width: `${value}%` }}></div>
            </div>
          )}
        </div>
        <div className={`${color} p-4 rounded-2xl text-white shadow-lg shadow-slate-100`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}