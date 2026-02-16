import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  LogOut, BookOpen, CheckCircle2, Clock, Sparkles, ArrowRight, UserCircle, 
  AlertCircle, Trophy, Flame, Zap, Target, Scale, HeartPulse, Shield, 
  ChevronRight, Brain, Microscope, AlertTriangle, Lock, UserCheck, 
  Footprints, Stethoscope, Heart, Smile 
} from "lucide-react";
import Link from "next/link";
import { StaffTrainingPlan } from "@/components/staff-training-plan";
import { ConfettiTrigger } from "@/components/confetti-trigger";
import { cn } from "@/lib/utils";

// --- Helper Functions ---

function getRankInfo(progress: number, completed: number, total: number) {
  if (progress === 100) return { title: "Diamond", color: "text-cyan-400", bg: "bg-cyan-500/10", ring: "ring-cyan-500/30", icon: <Trophy className="w-3 h-3" />, glow: "shadow-[0_0_15px_rgba(34,211,238,0.4)]" };
  if (progress >= 90) return { title: "Platinum", color: "text-indigo-300", bg: "bg-indigo-500/10", ring: "ring-indigo-500/30", icon: <Trophy className="w-3 h-3" />, glow: "" };
  if (progress >= 70) return { title: "Gold", color: "text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/30", icon: <Trophy className="w-3 h-3" />, glow: "" };
  if (progress >= 40) return { title: "Silver", color: "text-slate-300", bg: "bg-slate-500/10", ring: "ring-slate-500/30", icon: <Trophy className="w-3 h-3" />, glow: "" };
  if (progress >= 15) return { title: "Bronze", color: "text-orange-400", bg: "bg-orange-500/10", ring: "ring-orange-500/30", icon: <Trophy className="w-3 h-3" />, glow: "" };
  return { title: "Novice", color: "text-slate-500", bg: "bg-white/5", ring: "ring-white/10", icon: <Target className="w-3 h-3" />, glow: "" };
}

function getNextRankInfo(completed: number, total: number) {
  if (completed === total) return null;
  const targets = [
    { name: "Bronze", count: Math.ceil(total * 0.15) },
    { name: "Silver", count: Math.ceil(total * 0.40) },
    { name: "Gold", count: Math.ceil(total * 0.70) },
    { name: "Platinum", count: Math.ceil(total * 0.90) },
    { name: "Diamond", count: total },
  ];
  const next = targets.find(t => t.count > completed);
  return next ? { name: next.name, remaining: next.count - completed } : null;
}

const getIcon = (name: string | null) => {
  switch (name) {
    case 'Shield': return <Shield className="w-4 h-4" />;
    case 'Brain': return <Brain className="w-4 h-4" />;
    case 'Microscope': return <Microscope className="w-4 h-4" />;
    case 'AlertTriangle': return <AlertTriangle className="w-4 h-4" />;
    case 'HeartPulse': return <HeartPulse className="w-4 h-4" />;
    case 'Lock': return <Lock className="w-4 h-4" />;
    case 'Scale': return <Scale className="w-4 h-4" />;
    case 'UserCheck': return <UserCheck className="w-4 h-4" />;
    case 'Flame': return <Flame className="w-4 h-4" />;
    case 'Footprints': return <Footprints className="w-4 h-4" />;
    case 'Stethoscope': return <Stethoscope className="w-4 h-4" />;
    case 'Heart': return <Heart className="w-4 h-4" />;
    case 'Smile': return <Smile className="w-4 h-4" />;
    case 'Zap': return <Zap className="w-4 h-4" />;
    case 'Clock': return <Clock className="w-4 h-4" />;
    case 'Trophy': return <Trophy className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
};

const getStatusInfo = (status: string, isOverdue: boolean, isUpcoming: boolean) => {
  if (status === 'COMPLETED') return { label: '受講完了', color: 'text-emerald-600', dot: 'bg-emerald-500' };
  if (isUpcoming) return { label: '開始前', color: 'text-slate-400', dot: 'bg-slate-300' };
  if (isOverdue) return { label: '期限超過', color: 'text-rose-600', dot: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]' };
  if (status === 'IN_PROGRESS') return { label: '受講中', color: 'text-blue-600', dot: 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]' };
  return { label: '未受講', color: 'text-slate-400', dot: 'bg-slate-300' };
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { 
      id: true,
      facilityId: true, 
      role: true, 
      name: true,
      facility: {
        select: { name: true }
      },
      corporation: {
        select: { name: true, fiscalYearStartMonth: true }
      }
    }
  });

  if (user?.role === "ADMIN") redirect("/admin");
  if (user?.role === "HQ") redirect("/hq");
  if (user?.role === "SUPER_ADMIN") redirect("/super-admin");

  const fiscalYearStartMonth = user?.corporation?.fiscalYearStartMonth || 4;

  if (!user?.facilityId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50/50">
        <Card className="max-w-md w-full p-10 text-center space-y-6 rounded-[2rem] border-none shadow-2xl bg-white/80 backdrop-blur-xl">
          <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-amber-100">
            <AlertCircle className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">所属施設が未設定です</h2>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <Button variant="outline" type="submit" className="w-full h-14 rounded-xl border-slate-200">ログアウト</Button>
          </form>
        </Card>
      </div>
    );
  }

  const assignments = await prisma.courseAssignment.findMany({
    where: { facilityId: user.facilityId },
    include: { 
      course: {
        select: {
          id: true, title: true, description: true, badgeLabel: true, badgeIcon: true,
        }
      }
    }
  });

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    include: { course: true }
  });

  const today = new Date();

  const learningPlan = assignments.map(assignment => {
    const enrollment = enrollments.find(e => e.courseId === assignment.courseId);
    const diffTime = assignment.endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const title = assignment.course.title;
    const keywordMatch = (k: string) => title.includes(k);
    let iconName = "";
    let label = "";

    if (keywordMatch('虐待')) { label = '虐待防止'; iconName = 'Shield'; }
    else if (keywordMatch('認知症')) { label = '認知症'; iconName = 'Brain'; }
    else if (keywordMatch('感染症')) { label = '感染症'; iconName = 'Microscope'; }
    else if (keywordMatch('事故')) { label = '事故防止'; iconName = 'AlertTriangle'; }
    else if (keywordMatch('緊急')) { label = '緊急対応'; iconName = 'HeartPulse'; }
    else if (keywordMatch('プライバシー')) { label = '個人情報'; iconName = 'Lock'; }
    else if (keywordMatch('倫理')) { label = '倫理遵守'; iconName = 'Scale'; }
    else if (keywordMatch('接遇')) { label = '接遇マナー'; iconName = 'UserCheck'; }
    else if (keywordMatch('災害')) { label = '災害対策'; iconName = 'Flame'; }
    else if (keywordMatch('介護予防')) { label = '介護予防'; iconName = 'Footprints'; }
    else if (keywordMatch('医療')) { label = '医療連携'; iconName = 'Stethoscope'; }
    else if (keywordMatch('看取り')) { label = '看取り'; iconName = 'Heart'; }
    else if (keywordMatch('精神的')) { label = '精神ケア'; iconName = 'Smile'; }
    else { label = assignment.course.badgeLabel || title.substring(0, 4); iconName = 'BookOpen'; }

    const isCompleted = enrollment?.status === 'COMPLETED';
    const isUpcoming = !isCompleted && assignment.startDate.getTime() > today.getTime();

    return {
      courseId: assignment.courseId,
      title: title,
      description: assignment.course.description,
      badgeLabel: label,
      badgeIcon: iconName,
      status: enrollment?.status || 'NOT_STARTED',
      startDate: assignment.startDate,
      endDate: assignment.endDate,
      daysLeft: diffDays,
      isOverdue: diffDays < 0,
      isUpcoming
    };
  }).sort((a, b) => {
    if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') return 1;
    if (a.status !== 'COMPLETED' && b.status === 'COMPLETED') return -1;
    return a.endDate.getTime() - b.endDate.getTime();
  });

  const totalCourses = learningPlan.length;
  const completedCourses = learningPlan.filter(c => c.status === 'COMPLETED').length;
  const progressPercentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

  const rank = getRankInfo(progressPercentage, completedCourses, totalCourses);
  const nextRank = getNextRankInfo(completedCourses, totalCourses);

  const individualBadges = learningPlan.map(item => ({
    id: item.courseId,
    label: item.badgeLabel,
    icon: getIcon(item.badgeIcon),
    unlocked: item.status === 'COMPLETED'
  }));

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 font-sans antialiased">
      <ConfettiTrigger isVisible={progressPercentage === 100} />
      
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3 px-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-[10px]">CLS</span>
              </div>
              <h1 className="font-black text-slate-900 text-sm tracking-tighter">介護研修システム</h1>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span className="text-[10px] font-bold tracking-tight">{user?.corporation?.name}</span>
              <span className="text-[8px] opacity-30">/</span>
              <span className="text-[10px] font-black text-slate-900">{user?.facility?.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[9px] font-black uppercase tracking-widest">Care Learning System</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-900 tracking-tight">{user?.name} 様</span>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 mx-1" />
            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button className="group flex flex-col items-center gap-1 text-slate-400 hover:text-rose-600 transition-all duration-300">
                <div className="p-2 rounded-xl group-hover:bg-rose-50 transition-colors">
                  <LogOut className="w-6 h-6" />
                </div>
                <span className="text-[8px] font-black uppercase tracking-tighter">Logout</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-10">
        
        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold leading-tight tracking-tight">
                {progressPercentage === 100 ? "すべての研修を修了しました" : 
                 progressPercentage === 0 ? "本年度の学習を開始しましょう" : 
                 "着実にステップアップしています"}
              </h2>
            </div>

            <div className="text-right flex flex-col items-end gap-1">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black tracking-tighter tabular-nums leading-none">
                  {progressPercentage}<span className="text-xl text-slate-500 ml-1">%</span>
                </span>
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 shadow-lg",
                  rank.bg, rank.color, rank.ring, rank.glow
                )}>
                  {rank.title === "Novice" ? <Target className="w-6 h-6" /> : <Trophy className="w-6 h-6" />}
                </div>
              </div>
              <div className="space-y-0.5 mt-2">
                <p className={cn("text-xs font-black uppercase tracking-[0.2em]", rank.color)}>
                  {rank.title} Rank
                </p>
                {nextRank && (
                  <p className="text-[9px] font-bold text-slate-500 whitespace-nowrap">
                    あと <span className="text-white">{nextRank.remaining}</span> 科目で <span className="text-blue-400 font-black">{nextRank.name}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-1000 ease-out" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <div className="w-1.5 h-3 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" /> 
              Elite Skill Collection
            </h3>
            <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shadow-sm">
              {completedCourses} / 13 Unlocked
            </span>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-y-10 gap-x-4">
            {individualBadges.map((badge) => {
              const colorMap: Record<string, string> = {
                'Shield': 'from-blue-400 to-blue-700', 'Brain': 'from-purple-400 to-purple-700', 'Microscope': 'from-emerald-400 to-emerald-700',
                'AlertTriangle': 'from-amber-400 to-amber-700', 'HeartPulse': 'from-rose-400 to-rose-700', 'Lock': 'from-indigo-400 to-indigo-700',
                'Scale': 'from-slate-400 to-slate-700', 'UserCheck': 'from-sky-400 to-sky-700', 'Flame': 'from-orange-400 to-orange-700',
                'Footprints': 'from-teal-400 to-teal-700', 'Stethoscope': 'from-red-400 to-red-700', 'Heart': 'from-pink-400 to-pink-700', 'Smile': 'from-yellow-400 to-yellow-700',
              };
              const jewelColor = colorMap[badge.id] || 'from-slate-400 to-slate-600';

              return (
                <div key={badge.id} className="flex flex-col items-center gap-3 group/medal">
                  <div className="relative">
                    {badge.unlocked && <div className="absolute inset-0 bg-white blur-xl opacity-40 scale-150 animate-pulse" />}
                    <div className={cn(
                      "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl rotate-45 flex items-center justify-center transition-all duration-700 relative z-10 overflow-hidden shadow-xl",
                      badge.unlocked ? "bg-gradient-to-br from-amber-200 via-amber-500 to-amber-300 ring-2 ring-amber-400" : "bg-slate-100 ring-1 ring-slate-200 opacity-30 grayscale"
                    )}>
                      <div className={cn(
                        "absolute inset-1 rounded-xl -rotate-45 flex items-center justify-center overflow-hidden",
                        badge.unlocked ? `bg-gradient-to-br ${jewelColor} shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]` : "bg-slate-200"
                      )}>
                        {badge.unlocked && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover/medal:translate-x-full transition-transform duration-1000" />}
                        <div className={cn("relative z-10 transition-all duration-500 group-hover/medal:scale-110", badge.unlocked ? "text-white" : "text-slate-400")}>{badge.icon}</div>
                      </div>
                    </div>
                    {badge.unlocked && <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border border-amber-200 z-20 animate-bounce"><CheckCircle2 className="w-4 h-4 text-emerald-500" /></div>}
                  </div>
                  <span className={cn("text-[8px] font-black text-center uppercase truncate w-full px-0.5", badge.unlocked ? "text-amber-900" : "text-slate-300")}>{badge.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        <StaffTrainingPlan assignments={learningPlan} startMonth={fiscalYearStartMonth} />

        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
            <div className="w-1 h-3 bg-slate-900 rounded-full" /> 研修プログラム
          </h3>
          <div className="space-y-2">
            {learningPlan.map((item) => {
              const statusInfo = getStatusInfo(item.status, item.isOverdue, item.isUpcoming);
              const isCompleted = item.status === 'COMPLETED';
              const icon = getIcon(item.badgeIcon);
              
                            const ContentUI = (
              
                              <div className={cn(
              
                                "relative bg-white border border-slate-200 rounded-2xl transition-all duration-400 overflow-hidden",
              
                                item.isUpcoming ? "bg-slate-200/40 cursor-not-allowed border-dashed border-slate-300 opacity-70" : "hover:border-blue-600/30 hover:shadow-xl hover:shadow-blue-900/5",
              
                                isCompleted && "bg-emerald-50/20 border-emerald-100/50"
              
                              )}>
              
                                <div className="p-5 flex items-center justify-between gap-6">
              
                                  <div className="flex items-center gap-5 flex-1 min-w-0">
              
                                    <div className={cn(
              
                                      "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border transition-transform duration-500",
              
                                      !item.isUpcoming && "group-hover:scale-110",
              
                                      isCompleted ? "bg-emerald-50 border-emerald-100 text-emerald-600" : 
              
                                      item.isOverdue ? "bg-rose-50 border-rose-100 text-rose-500" :
              
                                      item.isUpcoming ? "bg-slate-200 border-slate-300 text-slate-400 grayscale" :
              
                                      "bg-blue-50 border-blue-100 text-blue-600"
              
                                    )}>
              
                                      {icon}
              
                                    </div>
              
              
              
                                    <div className="flex-1 min-w-0 space-y-1">
              
                                      <div className="flex items-center gap-3">
              
                                        <div className="flex items-center gap-1.5">
              
                                          <div className={cn("w-1.5 h-1.5 rounded-full", statusInfo.dot)} />
              
                                          <span className={cn("text-[9px] font-bold uppercase tracking-wider", statusInfo.color)}>
              
                                            {statusInfo.label}
              
                                          </span>
              
                                        </div>
              
                                        <div className="h-3 w-px bg-slate-200" />
              
                                        {!isCompleted && (
              
                                          <span className={cn("text-[10px] font-bold whitespace-nowrap", 
              
                                            item.isUpcoming ? "text-slate-400" : 
              
                                            item.isOverdue ? "text-rose-500" : "text-slate-400"
              
                                          )}>
              
                                            {item.isUpcoming ? `${item.startDate.toLocaleDateString()} より開始` : 
              
                                             item.isOverdue ? "期限超過" : `残り ${item.daysLeft} 日`}
              
                                          </span>
              
                                        )}
              
                                      </div>
              
                                      <h4 className={cn("text-base font-bold tracking-tight transition-colors", 
              
                                        isCompleted ? "text-emerald-900/70" : 
              
                                        item.isUpcoming ? "text-slate-400" :
              
                                        "text-slate-900 group-hover:text-blue-600"
              
                                      )}>
              
                                        {item.title}
              
                                      </h4>
              
                                    </div>
              
                                  </div>
              
              
              
                                  <div className="shrink-0">
              
                                    {isCompleted ? (
              
                                      <div className="w-12 h-12 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600 shadow-inner">
              
                                        <CheckCircle2 className="w-6 h-6" />
              
                                      </div>
              
                                    ) : item.isUpcoming ? (
              
                                      <div className="w-16 h-16 rounded-xl border border-slate-300 bg-slate-300/30 flex flex-col items-center justify-center text-slate-400">
              
                                        <Lock className="w-5 h-5 mb-1" />
              
                                        <span className="text-[7px] font-black uppercase tracking-widest">Locked</span>
              
                                      </div>
              
                                    ) : (
              
                                      <div className="relative">
              
                                        <div className="absolute -inset-2 bg-blue-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              
                                        <div className="relative w-16 h-16 bg-slate-900 rounded-xl flex flex-col items-center justify-center shadow-xl transition-all duration-500 group-hover:bg-blue-600 group-hover:scale-105 active:scale-95">
              
                                          <span className="text-[8px] font-black text-blue-400 uppercase tracking-tighter mb-0.5">Start</span>
              
                                          <ArrowRight className="w-5 h-5 text-white" />
              
                                        </div>
              
                                      </div>
              
                                    )}
              
                                  </div>
              
                                </div>
              
                              </div>
              );

              return item.isUpcoming ? (
                <div key={item.courseId}>{ContentUI}</div>
              ) : (
                <Link href={`/courses/${item.courseId}`} key={item.courseId} className="block group">
                  {ContentUI}
                </Link>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
