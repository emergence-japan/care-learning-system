import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, TrendingUp, LogOut, 
  PieChart, LayoutDashboard, Users as UsersIcon, MessageSquare
} from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { NotificationBell } from "@/components/notification-bell";
import { PrintButton } from "@/components/print-button";
import { FacilityMonitoringClient } from "./facility-monitoring-client";
import { AddFacilityDialog } from "@/components/add-facility-dialog";
import { AddAdminGlobalDialog } from "@/components/add-admin-global-dialog";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default async function HQDashboardPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "HQ") {
    redirect("/");
  }

  const isSuspended = session.user.isSuspended;

  const corporationId = session.user.corporationId;
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
            where: { role: { in: ["STAFF", "ADMIN"] } },
            include: { enrollments: true },
          },
          assignments: {
            include: { course: true }
          }
        },
      },
    },
  });

  if (!corporation) return null;

  const currentFacilitiesCount = corporation._count.facilities;
  const currentStaffCount = corporation.facilities.reduce((acc, f) => 
    acc + f.users.filter(u => u.role === "STAFF").length, 0
  );

  const facilityStats = corporation.facilities.map(facility => {
    const staffMembers = facility.users.filter(u => u.role === "STAFF");
    const adminMembers = facility.users.filter(u => u.role === "ADMIN");
    const totalStaff = staffMembers.length;
    
    // この施設に割り当てられている研修のみを対象に進捗を計算
    const assignedCourseIds = facility.assignments.map(a => a.courseId);
    
    const completedEnrollments = staffMembers.reduce((acc, user) => {
      return acc + user.enrollments.filter(e => 
        e.status === 'COMPLETED' && assignedCourseIds.includes(e.courseId)
      ).length;
    }, 0);
    
    const totalAssignments = totalStaff * assignedCourseIds.length;
    const progressRate = totalAssignments > 0 
      ? Math.round((completedEnrollments / totalAssignments) * 100) 
      : 0;

    return { 
      id: facility.id, 
      name: facility.name, 
      type: facility.type,
      isActive: facility.isActive,
      staffCount: totalStaff, 
      maxStaff: facility.maxStaff,
      progressRate,
      admins: adminMembers.map(a => ({
        id: a.id,
        name: a.name,
        loginId: a.loginId
      })),
      assignments: facility.assignments.map(a => ({
        id: a.id,
        courseTitle: a.course.title,
        endDate: a.endDate,
        completedCount: staffMembers.filter(u => 
          u.enrollments.some(e => e.courseId === a.courseId && e.status === 'COMPLETED')
        ).length
      }))
    };
  }) || [];

  const totalFacilities = facilityStats.length;
  const avgProgressRate = totalFacilities > 0 
    ? Math.round(facilityStats.reduce((acc, f) => acc + f.progressRate, 0) / totalFacilities) 
    : 0;

  return (
    <div className="h-screen bg-[#120a0a] flex flex-col font-sans overflow-hidden">
      
      {/* TuneCore Style Top Header */}
      <header className="h-20 lg:h-24 bg-[#120a0a] px-4 lg:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4 lg:gap-12">
          <MobileNav />
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded flex items-center justify-center">
              <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-[#120a0a]" />
            </div>
            <span className="font-black text-xl lg:text-2xl tracking-tighter text-white">careCORE HQ</span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <UsersIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-bold text-sm leading-none">{session.user.name} さんのダッシュボード</h2>
                <p className="text-[10px] text-blue-400 font-bold mt-1 uppercase tracking-wider">{corporation.name}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <NotificationBell alerts={[]} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#120a0a] hidden lg:flex flex-col p-6 space-y-2 overflow-y-auto custom-scrollbar shrink-0">
          <a href="#overview">
            <TuneSidebarItem icon={<LayoutDashboard className="w-5 h-5" />} label="オーバービュー" active />
          </a>
          <a href="#facility-monitoring">
            <TuneSidebarItem icon={<PieChart className="w-5 h-5" />} label="施設別モニタリング" />
          </a>
          <Link href="/hq/inquiry">
            <TuneSidebarItem icon={<MessageSquare className="w-5 h-5" />} label="サポートセンター" />
          </Link>
          
          <div className="mt-auto pt-6 border-t border-slate-800">
             <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-white transition-colors w-full text-left">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-bold">ログアウト</span>
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-tl-[4rem] overflow-y-auto p-6 lg:p-12 shadow-2xl relative">
          
          {isSuspended && (
            <div className="max-w-6xl mx-auto mb-8 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-4 text-red-800 animate-pulse">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <div>
                <p className="font-black text-sm">【利用停止中】契約満了または停止設定により、現在このアカウントは「閲覧・出力のみ」の制限モードになっています。</p>
                <p className="text-xs font-bold mt-0.5">新規登録や情報の変更、研修の実施などは行えません。監査用書類の出力は引き続き可能です。</p>
              </div>
            </div>
          )}

          {/* Print Only Header */}
          <div className="print-only mb-10 border-b-2 border-slate-900 pb-6">
            <h1 className="text-3xl font-bold text-slate-900 font-sans">法人研修実施状況報告書</h1>
            <div className="mt-4 grid grid-cols-2 text-sm font-sans">
              <div>
                <p><span className="font-bold">法人名：</span> {corporation.name}</p>
              </div>
              <div className="text-right">
                <p><span className="font-bold">出力日：</span> {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Top Section: Overview */}
            <div id="overview" className="space-y-8 scroll-mt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <LayoutDashboard className="w-4 h-4 text-slate-900" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">オーバービュー</h3>
                </div>
                
                <div className="flex items-center gap-2">
                  <PrintButton />
                </div>
              </div>

              {/* HQ Insights - Grid containing Progress and Limits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HQStatCard title="法人全体進捗" value={avgProgressRate} label="%" icon={<TrendingUp className="w-6 h-6" />} color="bg-orange-600" isProgress />
                
                <div className="no-print">
                  <OrgLimitStatus 
                    type="staff" 
                    label="登録スタッフ枠" 
                    current={currentStaffCount} 
                    max={corporation.maxStaff} 
                  />
                </div>
              </div>
            </div>

            {/* Middle Section: Facility Monitoring */}
            <div id="facility-monitoring" className="space-y-6 scroll-mt-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <PieChart className="w-4 h-4 text-slate-900" />
                  </div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-bold text-xl text-slate-900">施設別モニタリング</h3>
                    <span className="text-sm font-bold text-slate-400">
                      {currentFacilitiesCount} <span className="text-[10px] text-slate-300 mx-0.5">/</span> {corporation.maxFacilities} <span className="text-[10px] font-bold ml-1">施設</span>
                    </span>
                  </div>
                </div>
                <div className="no-print flex items-center gap-3">
                  {!isSuspended && (
                    <>
                      <AddFacilityDialog disabled={currentFacilitiesCount >= corporation.maxFacilities} />
                      <AddAdminGlobalDialog facilities={facilityStats.map(f => ({ id: f.id, name: f.name }))} />
                    </>
                  )}
                </div>
              </div>

              <FacilityMonitoringClient facilities={facilityStats as any} isCorporationSuspended={isSuspended} />
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
    </div>
  );
}

function HQStatCard({ title, value, label, icon, color, isProgress }: { title: string, value: number, label: string, icon: React.ReactNode, color: string, isProgress?: boolean }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`${color} p-2 rounded-xl text-white`}>
            {icon}
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 tabular-nums">{value}</span>
              <span className="text-xs font-bold text-slate-400">{label}</span>
            </div>
          </div>
        </div>
      </div>
      {isProgress && (
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold uppercase">
            <span className="text-slate-400">Progress</span>
            <span className="text-slate-900">{value}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className={`${color} h-full transition-all duration-1000`} style={{ width: `${value}%` }}></div>
          </div>
        </div>
      )}
    </div>
  );
}
