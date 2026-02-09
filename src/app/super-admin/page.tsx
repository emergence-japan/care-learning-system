import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, Building2, BookOpen, LogOut, 
  Settings, LayoutDashboard, ChevronRight, Activity,
  Server, ShieldCheck, Zap
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
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-blue-500/30">
      
      {/* Sidebar / Navigation (Vertical on Desktop) */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 lg:w-64 bg-[#0f172a] border-r border-slate-800 z-50 flex flex-col items-center lg:items-stretch py-8 hidden md:flex">
        <div className="px-6 mb-12 flex items-center gap-4 justify-center lg:justify-start">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="hidden lg:block">
            <h1 className="font-black text-lg tracking-tight leading-none text-white">LMS ADMIN</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">System Control</p>
          </div>
        </div>

        <div className="flex-1 w-full px-4 space-y-2">
          <NavItem icon={<LayoutDashboard />} label="ダッシュボード" active />
          <NavItem icon={<Building2 />} label="組織・施設管理" href="/super-admin/organizations" />
          <NavItem icon={<BookOpen />} label="研修コース管理" href="/super-admin/courses" />
        </div>

        <div className="px-4 mt-auto">
          <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800 mb-6 hidden lg:block">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">システムステータス</span>
            </div>
            <p className="text-xs text-slate-300 font-mono">全システム正常稼働中</p>
            <p className="text-[10px] text-slate-600 font-mono mt-1">v2.4.0-stable</p>
          </div>

          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all w-full group">
              <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
              <span className="hidden lg:inline text-sm font-bold group-hover:text-red-400 transition-colors">ログアウト</span>
            </button>
          </form>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="md:hidden h-16 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">LMS ADMIN</span>
        </div>
        <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
          <Button variant="ghost" size="icon" className="text-slate-400">
            <LogOut className="w-5 h-5" />
          </Button>
        </form>
      </header>

      {/* Main Content */}
      <main className="md:pl-20 lg:pl-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-12 lg:px-12 lg:py-16 space-y-12">
          
          {/* Header Section */}
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">システム管理概要</h2>
            <p className="text-slate-400 font-medium">システム全体の稼働状況と主要なメトリクス</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <StatCard title="総法人数" value={corpCount} icon={<Building2 className="w-5 h-5" />} color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/20" />
            <StatCard title="総施設数" value={facilityCount} icon={<LayoutDashboard className="w-5 h-5" />} color="text-indigo-400" bg="bg-indigo-500/10" border="border-indigo-500/20" />
            <StatCard title="利用者数" value={userCount} icon={<Users className="w-5 h-5" />} color="text-violet-400" bg="bg-violet-500/10" border="border-violet-500/20" />
            <StatCard title="公開済みコース" value={courseCount} icon={<BookOpen className="w-5 h-5" />} color="text-emerald-400" bg="bg-emerald-500/10" border="border-emerald-500/20" />
          </div>

          {/* Portals Section */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-blue-500" />
              <h3 className="font-bold text-xl text-white">クイックアクセス</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PortalCard 
                title="Organization Management" 
                subtitle="組織・施設管理"
                desc="法人アカウントの発行、施設構成の管理、管理者権限の設定を行います。"
                link="/super-admin/organizations"
                icon={<Building2 className="w-8 h-8" />}
                stats={`${corpCount} 法人 / ${facilityCount} 施設`}
                color="from-blue-600 to-blue-800"
              />
              <PortalCard 
                title="Content Management" 
                subtitle="研修コース管理"
                desc="学習スライドのアップロード、理解度テストの作成、配信設定を一元管理します。"
                link="/super-admin/courses"
                icon={<BookOpen className="w-8 h-8" />}
                stats={`${courseCount} コース公開中`}
                color="from-emerald-600 to-emerald-800"
              />
            </div>
          </div>
          
          {/* Recent Activity Mockup (Visual Only) */}
          <div className="pt-8 border-t border-slate-800 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-300">システムアクティビティ</h3>
                <span className="text-xs font-mono text-slate-500">リアルタイムモニタリング</span>
             </div>
             <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 space-y-4">
                <ActivityRow time="今さっき" action="システムバックアップ" status="完了" />
                <ActivityRow time="2分前" action="ユーザー同期処理" status="実行中" />
                <ActivityRow time="1時間前" action="データベース最適化" status="完了" />
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, href }: { icon: React.ReactNode, label: string, active?: boolean, href?: string }) {
  const content = (
    <div className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
      <div className={`${active ? 'text-white' : 'group-hover:text-white transition-colors'}`}>{icon}</div>
      <span className="hidden lg:block text-sm font-bold">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white hidden lg:block" />}
    </div>
  );

  return href ? <Link href={href} className="block">{content}</Link> : <div className="cursor-pointer">{content}</div>;
}

function StatCard({ title, value, icon, color, bg, border }: { title: string, value: number, icon: React.ReactNode, color: string, bg: string, border: string }) {
  return (
    <Card className={`bg-[#1e293b] border ${border} rounded-[1.5rem] shadow-xl overflow-hidden relative group hover:scale-[1.02] transition-transform duration-300`}>
      <div className={`absolute top-0 right-0 p-32 ${bg} blur-[60px] rounded-full opacity-20 group-hover:opacity-30 transition-opacity`} />
      <CardContent className="p-6 relative z-10 space-y-4">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">{title}</p>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${bg} ${color} shadow-inner`}>
            {icon}
          </div>
          <p className="text-3xl font-black text-white tabular-nums tracking-tight">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PortalCard({ title, subtitle, desc, link, icon, stats, color }: { title: string, subtitle: string, desc: string, link: string, icon: React.ReactNode, stats: string, color: string }) {
  return (
    <Link href={link} className="block group h-full">
      <div className="h-full bg-[#1e293b] border border-slate-700/50 rounded-[2rem] overflow-hidden relative hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 group">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        <div className="p-8 lg:p-10 h-full flex flex-col relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg text-white group-hover:scale-110 transition-transform duration-500`}>
              {icon}
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:text-white transition-all duration-300">
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white" />
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            <h4 className="text-2xl font-black text-white tracking-tight">{subtitle}</h4>
            <p className="text-sm font-bold text-blue-400 uppercase tracking-widest">Portal Navigation</p>
          </div>
          
          <p className="text-slate-400 font-medium leading-relaxed text-sm mb-8 flex-1">{desc}</p>
          
          <div className="pt-6 border-t border-slate-800 flex items-center gap-3">
             <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
             <span className="text-xs font-bold text-slate-300 font-mono">{stats}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ActivityRow({ time, action, status }: { time: string, action: string, status: string }) {
  return (
    <div className="flex items-center justify-between text-sm py-2 border-b border-slate-800/50 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        <span className="font-medium text-slate-300">{action}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status === '実行中' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
          {status}
        </span>
        <span className="text-xs text-slate-500 font-mono">{time}</span>
      </div>
    </div>
  );
}
