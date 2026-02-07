import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Building2, BookOpen, LogOut, 
  Settings, LayoutDashboard, ChevronRight, Activity 
} from "lucide-react";
import Link from "next/link";
export default async function SuperAdminDashboard() {
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/");
  }

  // 統計データの取得
  const [corpCount, facilityCount, userCount, courseCount] = await Promise.all([
    prisma.corporation.count(),
    prisma.facility.count(),
    prisma.user.count({ where: { NOT: { role: 'SUPER_ADMIN' } } }),
    prisma.course.count()
  ]);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white pb-20">
      {/* Premium Sidebar-style Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 h-20 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay opacity-50" />
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg rotate-3">
              <Settings className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tight leading-none">System Control</h1>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1.5 text-center">Super Administration</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-xs font-black text-white/60 uppercase tracking-widest">Operator</span>
              <span className="text-sm font-bold text-blue-400">{session.user.name}</span>
            </div>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-red-500/20 hover:text-red-400 transition-all text-white/40">
                <LogOut className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Corporations" value={corpCount} icon={<Building2 className="w-6 h-6" />} color="bg-blue-600" />
          <StatCard title="Total Facilities" value={facilityCount} icon={<LayoutDashboard className="w-6 h-6" />} color="bg-indigo-600" />
          <StatCard title="Active Users" value={userCount} icon={<Users className="w-6 h-6" />} color="bg-violet-600" />
          <StatCard title="Learning Courses" value={courseCount} icon={<BookOpen className="w-6 h-6" />} color="bg-emerald-600" />
        </div>

        {/* Management Portals */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <Activity className="w-5 h-5 text-slate-400" />
            <h3 className="font-black text-2xl text-slate-900 tracking-tight">管理ポータル</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PortalCard 
              title="組織・施設管理" 
              desc="法人の新規登録、施設構成の変更、および管理者権限の紐付けを行います。"
              link="/super-admin/organizations"
              icon={<Building2 className="w-8 h-8" />}
              stats={`${corpCount} 法人 / ${facilityCount} 施設`}
            />
            <PortalCard 
              title="研修コンテンツ管理" 
              desc="学習スライドの編集、理解度テストの作成、および全スタッフへの配信設定。"
              link="/super-admin/courses"
              icon={<BookOpen className="w-8 h-8" />}
              stats={`${courseCount} コース公開中`}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: number, icon: React.ReactNode, color: string }) {
  return (
    <Card className="bg-white border-slate-200/60 rounded-[2rem] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-xl transition-all duration-500">
      <CardContent className="p-8">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{title}</p>
            <p className="text-4xl font-black text-slate-900 tabular-nums">{value}</p>
          </div>
          <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PortalCard({ title, desc, link, icon, stats }: { title: string, desc: string, link: string, icon: React.ReactNode, stats: string }) {
  return (
    <Link href={link} className="block group">
      <Card className="h-full bg-white border-slate-200/60 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden group-hover:shadow-[0_30px_70px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 relative group-hover:-translate-y-1">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] group-hover:bg-blue-50 transition-colors duration-500" />
        <CardContent className="p-10 space-y-8 relative z-10">
          <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-500">
            {icon}
          </div>
          <div className="space-y-3">
            <h4 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h4>
            <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
          </div>
          <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">{stats}</span>
            <div className="flex items-center gap-2 text-slate-900 font-black text-xs group-hover:gap-4 transition-all">
              GO TO PORTAL <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
