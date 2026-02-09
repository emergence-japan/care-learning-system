import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, ChevronLeft, CalendarDays, 
  Users, AlertCircle, CheckCircle2,
  Clock, TrendingUp, ShieldCheck,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { HQResetPasswordDialog } from "@/components/hq-reset-password-dialog";
import { ActionPlanDialog } from "@/components/action-plan-dialog";
import { TrainingTimeline } from "@/components/training-timeline";

// 施設詳細ページ
export default async function HQFacilityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "HQ") {
    redirect("/");
  }

  const { id } = await params;

  // 1. 施設情報の取得（スタッフ、管理者、割り当てられた研修、および所属法人の年度設定を含む）
  const facility = await prisma.facility.findUnique({
    where: { id },
    include: {
      users: {
        where: { role: { in: ["STAFF", "ADMIN"] } },
        include: {
          enrollments: {
            include: {
              course: true
            }
          }
        },
        orderBy: { name: 'asc' } // 名前順
      },
      assignments: {
        include: {
          course: true
        },
        orderBy: { endDate: 'asc' } // 期限が近い順
      },
      corporation: true
    }
  });

  if (!facility || !facility.corporation) {
    return <div className="p-20 text-center font-bold text-slate-400">施設情報が見つかりません。</div>;
  }

  // 自分の法人かチェック
  if (facility.corporationId !== session.user.corporationId) {
    return <div className="p-20 text-center font-bold text-slate-400">アクセス権限がありません。</div>;
  }

  // データの整理
  const admins = facility.users.filter(u => u.role === "ADMIN");
  const staffMembers = facility.users.filter(u => u.role === "STAFF");
  const assignments = facility.assignments;

  // 全体の進捗計算
  const totalAssignmentsCount = staffMembers.length * assignments.length;
  let completedCount = 0;
  
  staffMembers.forEach(staff => {
    assignments.forEach(assign => {
      const enrollment = staff.enrollments.find(e => e.courseId === assign.courseId);
      if (enrollment?.status === "COMPLETED") {
        completedCount++;
      }
    });
  });

  const progressRate = totalAssignmentsCount > 0 
    ? Math.round((completedCount / totalAssignmentsCount) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 font-sans pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 h-20 flex items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/hq">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl lg:text-2xl font-black text-white lg:text-slate-900 tracking-tight">{facility.name}</h1>
              {facility.type && (
                <Badge variant="outline" className="text-[10px] text-blue-600 border-blue-200 bg-blue-50 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {facility.type}
                </Badge>
              )}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Building2 className="w-3 h-3" />
              Facility Dashboard
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 space-y-12">
        
        {/* KPI Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="研修進捗率" 
            value={`${progressRate}%`} 
            icon={<TrendingUp className="w-6 h-6 text-blue-600" />} 
            desc="全スタッフ × 全割当研修"
          />
          <StatCard 
            title="所属スタッフ数" 
            value={`${staffMembers.length} / ${facility.maxStaff}`} 
            icon={<Users className="w-6 h-6 text-emerald-600" />} 
            desc="現在稼働中のスタッフ"
          />
          
          {/* 施設管理者カード */}
          <div className="p-6 rounded-2xl border bg-white border-slate-200 flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">施設管理者</p>
                <div className="space-y-2.5 max-h-[80px] overflow-y-auto custom-scrollbar pr-2">
                  {admins.length > 0 ? admins.map(admin => (
                    <div key={admin.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-black text-slate-900 truncate">{admin.name}</span>
                        <span className="text-[9px] text-slate-400 font-mono hidden xl:inline">ID:{admin.loginId}</span>
                      </div>
                      <HQResetPasswordDialog userId={admin.id} userName={admin.name} />
                    </div>
                  )) : (
                    <p className="text-xs text-slate-400 italic">未登録</p>
                  )}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 shrink-0 ml-4">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2">施設全体の運用責任者</p>
          </div>
        </section>

        {/* 年間研修計画セクションを追加 */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">年間研修計画</h3>
          </div>
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 lg:p-10 shadow-sm overflow-hidden">
            <TrainingTimeline 
              startMonth={facility.corporation.fiscalYearStartMonth} 
              assignments={assignments} 
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-10">
          
          {/* Main Column: Staff Progress Matrix (Expanded to full width) */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                スタッフ別進捗状況
              </h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                      <th className="px-1 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-tighter sticky left-0 bg-slate-50 z-20 w-[50px] border-r border-slate-100 text-center">
                        氏名/ID
                      </th>
                      {assignments.map(assign => (
                        <th key={assign.id} className="px-1 py-4 font-bold text-[10px] text-slate-400 uppercase tracking-wider w-[80px] border-r border-slate-100 text-center">
                          <div className="truncate text-slate-700" title={assign.course.title}>{assign.course.title}</div>
                          <div className="text-[9px] text-slate-400 mt-1 font-normal">
                            ~ {format(assign.endDate, 'MM/dd', { locale: ja })}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {staffMembers.length > 0 ? (
                      assignments.length > 0 ? (
                        staffMembers.map(staff => (
                          <tr key={staff.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-1 py-4 font-bold text-sm text-slate-900 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors border-r border-slate-100 z-10 shadow-[4px_0_10px_-2px_rgba(0,0,0,0.05)] w-[50px]">
                              <div className="min-w-0 text-center">
                                <div className="truncate text-xs font-bold" title={staff.name}>{staff.name}</div>
                                <div className="text-[8px] text-slate-500 font-mono mt-0.5 tracking-tighter truncate opacity-60">ID:{staff.loginId}</div>
                              </div>
                            </td>
                            {assignments.map(assign => {
                              const enrollment = staff.enrollments.find(e => e.courseId === assign.courseId);
                              const isCompleted = enrollment?.status === "COMPLETED";
                              const isOverdue = !isCompleted && new Date() > new Date(assign.endDate);
                              const daysLeft = Math.ceil((new Date(assign.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

                              return (
                                <td key={assign.id} className="px-1 py-4 text-center align-middle border-r border-slate-100">
                                  {isCompleted ? (
                                    <ActionPlanDialog 
                                      staffName={staff.name}
                                      courseTitle={assign.course.title}
                                      content={enrollment.actionPlan || "アクションプランは未入力です"}
                                      completedAt={enrollment.completedAt}
                                      trigger={
                                        <button className="flex flex-col items-center gap-1 hover:scale-110 transition-transform cursor-pointer group/btn mx-auto">
                                          <CheckCircle2 className="w-5 h-5 text-emerald-500 group-hover/btn:text-emerald-600" />
                                          <span className="text-[9px] font-bold text-emerald-600/70 group-hover/btn:text-emerald-700 whitespace-nowrap">受講済</span>
                                        </button>
                                      }
                                    />
                                  ) : isOverdue ? (
                                    <div className="flex flex-col items-center gap-1">
                                      <AlertCircle className="w-5 h-5 text-red-500" />
                                      <span className="text-[9px] font-bold text-red-500/70 whitespace-nowrap">期限切れ</span>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                                      <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex items-center justify-center text-[9px] font-mono text-slate-400">
                                        {daysLeft > 0 ? daysLeft : 0}
                                      </div>
                                      <span className="text-[9px] font-bold text-slate-400 whitespace-nowrap">あと {daysLeft} 日</span>
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={1} className="p-8 text-center text-slate-400 font-bold text-sm sticky left-0 bg-white">
                            この施設にはまだ研修が割り当てられていません。
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan={assignments.length + 1} className="p-8 text-center text-slate-400 font-bold text-sm">
                          スタッフが登録されていません
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, desc, highlight = false }: { title: string, value: string, icon: React.ReactNode, desc: string, highlight?: boolean }) {
  return (
    <div className={`p-6 rounded-2xl border ${highlight ? 'bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200' : 'bg-white border-slate-200'} shadow-sm`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{title}</p>
          <h3 className={`text-3xl font-black tracking-tight ${highlight ? 'text-amber-500' : 'text-slate-900'}`}>{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${highlight ? 'bg-amber-100 text-amber-600' : 'bg-slate-50 text-slate-600'}`}>
          {icon}
        </div>
      </div>
      <p className="text-[10px] font-bold text-slate-400">{desc}</p>
    </div>
  );
}