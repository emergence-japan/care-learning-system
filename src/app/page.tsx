import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, CheckCircle2, Clock, Sparkles, ArrowRight, UserCircle, AlertCircle, Trophy, Flame, Zap, Target, Scale, HeartPulse, Shield } from "lucide-react";
import Link from "next/link";
import { StaffTrainingPlan } from "@/components/staff-training-plan";
import { ConfettiTrigger } from "@/components/confetti-trigger";
import { cn } from "@/lib/utils";

// --- Helper Functions ---

function getRankInfo(progress: number) {
  if (progress === 100) return { title: "Grand Master", color: "text-amber-600", bg: "bg-amber-50", ring: "ring-amber-200" };
  if (progress >= 80) return { title: "Expert", color: "text-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-200" };
  if (progress >= 50) return { title: "Professional", color: "text-indigo-600", bg: "bg-indigo-50", ring: "ring-indigo-200" };
  if (progress >= 20) return { title: "Advanced Learner", color: "text-blue-600", bg: "bg-blue-50", ring: "ring-blue-200" };
  if (progress > 0) return { title: "Learner", color: "text-slate-600", bg: "bg-slate-50", ring: "ring-slate-200" };
  return { title: "Novice", color: "text-slate-400", bg: "bg-white", ring: "ring-slate-100" };
}

const getIcon = (name: string | null) => {
  switch (name) {
    case 'Shield': return <Shield className="w-4 h-4" />;
    case 'Zap': return <Zap className="w-4 h-4" />;
    case 'HeartPulse': return <HeartPulse className="w-4 h-4" />;
    case 'AlertCircle': return <AlertCircle className="w-4 h-4" />;
    case 'Clock': return <Clock className="w-4 h-4" />;
    case 'BookOpen': return <BookOpen className="w-4 h-4" />;
    case 'Scale': return <Scale className="w-4 h-4" />;
    case 'Sparkles': return <Sparkles className="w-4 h-4" />;
    case 'Flame': return <Flame className="w-4 h-4" />;
    case 'Trophy': return <Trophy className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
};

const getStatusInfo = (status: string, isOverdue: boolean) => {
  if (status === 'COMPLETED') return { label: 'Complete', color: 'text-emerald-600 bg-emerald-50', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
  if (isOverdue) return { label: 'Overdue', color: 'text-rose-600 bg-rose-50', icon: <AlertCircle className="w-3.5 h-3.5" /> };
  if (status === 'IN_PROGRESS') return { label: 'In Progress', color: 'text-indigo-600 bg-indigo-50', icon: <Clock className="w-3.5 h-3.5" /> };
  return { label: 'Available', color: 'text-slate-400 bg-slate-50', icon: <BookOpen className="w-3.5 h-3.5" /> };
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { 
      facilityId: true, 
      role: true, 
      name: true,
      corporation: {
        select: { fiscalYearStartMonth: true }
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
        <Card className="max-w-md w-full p-10 text-center space-y-6 rounded-[3rem] border-none shadow-2xl bg-white/80 backdrop-blur-xl">
          <div className="w-20 h-20 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto ring-1 ring-amber-100">
            <AlertCircle className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">所属施設が未設定です</h2>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <Button variant="outline" type="submit" className="w-full h-14 rounded-2xl border-slate-200">ログアウト</Button>
          </form>
        </Card>
      </div>
    );
  }

  // 1. この施設に割り当てられている研修計画（期限）を取得
  const assignments = await prisma.courseAssignment.findMany({
    where: { facilityId: user.facilityId },
    include: { 
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          badgeLabel: true,
          badgeIcon: true,
        }
      }
    }
  });

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    include: { course: true }
  });

  const learningPlan = assignments.map(assignment => {
    const enrollment = enrollments.find(e => e.courseId === assignment.courseId);
    const today = new Date();
    const diffTime = assignment.endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      courseId: assignment.courseId,
      title: assignment.course.title,
      description: assignment.course.description,
      badgeLabel: assignment.course.badgeLabel,
      badgeIcon: assignment.course.badgeIcon,
      status: enrollment?.status || 'NOT_STARTED',
      startDate: assignment.startDate,
      endDate: assignment.endDate,
      daysLeft: diffDays,
      isOverdue: diffDays < 0
    };
  }).sort((a, b) => {
    if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') return 1;
    if (a.status !== 'COMPLETED' && b.status === 'COMPLETED') return -1;
    return a.endDate.getTime() - b.endDate.getTime();
  });

  const totalCourses = learningPlan.length;
  const completedCourses = learningPlan.filter(c => c.status === 'COMPLETED').length;
  const progressPercentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

  // --- Dynamic Gamification Logic ---
  const rank = getRankInfo(progressPercentage);

  // Badge Logic - Dynamic with Title-based Fallback
  const individualBadges = learningPlan.map(item => {
    // Determine the icon and label based on DB fields or fallback to title matching
    const keywordMatch = (k: string) => item.title.includes(k);
    
    let label = item.badgeLabel;
    let iconName = item.badgeIcon;

    if (!label || !iconName) {
      if (keywordMatch('虐待')) { label = '虐待防止'; iconName = 'Shield'; }
      else if (keywordMatch('認知症')) { label = '認知症'; iconName = 'Zap'; }
      else if (keywordMatch('感染症')) { label = '感染症'; iconName = 'HeartPulse'; }
      else if (keywordMatch('事故')) { label = '事故防止'; iconName = 'AlertCircle'; }
      else if (keywordMatch('緊急')) { label = '緊急対応'; iconName = 'Clock'; }
      else if (keywordMatch('プライバシー')) { label = '個人情報'; iconName = 'BookOpen'; }
      else if (keywordMatch('倫理')) { label = '倫理遵守'; iconName = 'Scale'; }
      else if (keywordMatch('接遇')) { label = '接遇マナー'; iconName = 'Sparkles'; }
      else if (keywordMatch('災害')) { label = '災害対策'; iconName = 'Flame'; }
      else if (keywordMatch('介護予防')) { label = '介護予防'; iconName = 'Trophy'; }
      else if (keywordMatch('医療')) { label = '医療連携'; iconName = 'HeartPulse'; }
      else if (keywordMatch('看取り')) { label = '看取り'; iconName = 'HeartPulse'; }
      else if (keywordMatch('精神的')) { label = '精神ケア'; iconName = 'Sparkles'; }
      else { label = item.title.substring(0, 4); iconName = 'BookOpen'; }
    }

    return {
      id: item.courseId,
      label: label!,
      icon: getIcon(iconName),
      unlocked: item.status === 'COMPLETED'
    };
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12 font-sans antialiased">
      <ConfettiTrigger isVisible={progressPercentage === 100} />
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-slate-200/40 h-14 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-[10px]">CL</span>
          </div>
          <h1 className="font-black text-slate-900 text-xs tracking-tight uppercase">Care Learning</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn("hidden xs:block px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ring-1", rank.bg, rank.color, rank.ring)}>
            {rank.title}
          </div>
          <span className="text-[10px] font-black text-slate-600 uppercase">{user?.name}</span>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <Button variant="ghost" size="icon" type="submit" className="h-8 w-8 text-slate-400 hover:text-rose-600">
              <LogOut className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-6 space-y-8">
        {/* Progress Card */}
        <Card className="bg-white border-none rounded-[2rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-indigo-100/50 transition-colors duration-1000" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-10 relative z-10">
            <div className="space-y-6 flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ring-1 ring-indigo-100">
                <Target className="w-3 h-3" /> Current Status
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  {progressPercentage === 100 ? <>素晴らしい！<br/>Care Master 2024</> : 
                   progressPercentage === 0 ? <>最初の一歩を<br/>踏み出しましょう</> : 
                   progressPercentage < 70 ? <>着実に進んでいますね</> : <>ゴールは目前です</>}
                </h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest italic">
                  Rank: <span className={rank.color}>{rank.title}</span>
                </p>
              </div>
            </div>

            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle className="text-slate-50" cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle className="text-indigo-600 transition-all duration-1000 ease-in-out" cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray={`${progressPercentage}, 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900 tracking-tighter">{progressPercentage}<span className="text-sm text-indigo-400">%</span></span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Complete</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Skill Badges Showcase - Individual 13 Collection */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-slate-900 rounded-full" />
              <h3 className="font-black text-[10px] text-slate-900 uppercase tracking-widest">Skill Badge Collection</h3>
            </div>
            <span className="text-[9px] font-bold text-slate-400">{completedCourses} / 13 Unlocked</span>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-y-8 gap-x-4 max-w-2xl mx-auto">
            {individualBadges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center gap-3">
                <div className="relative group/medal cursor-default">
                  {/* Decorative Ribbon - Subtle V-shape background */}
                  {badge.unlocked && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 opacity-20 pointer-events-none">
                      <div className="absolute top-0 left-0 w-full h-full bg-indigo-600 [clip-path:polygon(0%_0%,100%_0%,50%_100%)]" />
                    </div>
                  )}

                  {/* The Medal Circle */}
                  <div className={cn(
                    "w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-700 relative z-10 overflow-hidden",
                    badge.unlocked 
                      ? "bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 shadow-[0_10px_30px_-5px_rgba(245,158,11,0.4),inset_0_2px_4px_rgba(255,255,255,0.6)] ring-2 ring-amber-300/50" 
                      : "bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] grayscale opacity-40 ring-2 ring-slate-200/50"
                  )}>
                    {/* Inner Circle for Embossed look */}
                    <div className={cn(
                      "absolute inset-1 rounded-full border border-black/5 flex items-center justify-center",
                      badge.unlocked ? "bg-gradient-to-br from-amber-400 to-amber-600 shadow-inner" : "bg-slate-300/50 shadow-inner"
                    )}>
                      {/* Shine effect */}
                      {badge.unlocked && (
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover/medal:translate-x-full transition-transform duration-1000 ease-in-out" />
                      )}
                      
                      {/* Icon */}
                      <div className={cn(
                        "relative z-10 transition-all duration-500 group-hover/medal:scale-110",
                        badge.unlocked ? "text-amber-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" : "text-slate-500"
                      )}>
                        {badge.icon}
                      </div>
                    </div>
                  </div>

                  {/* Success Sparkle for Unlocked Medals */}
                  {badge.unlocked && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce delay-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    </div>
                  )}
                </div>
                <span className={cn("text-[8px] sm:text-[9px] font-black text-center leading-tight tracking-tighter uppercase max-w-[60px]", badge.unlocked ? "text-slate-800" : "text-slate-400")}>
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule Table */}
        <StaffTrainingPlan 
          assignments={learningPlan} 
          startMonth={fiscalYearStartMonth} 
        />

        {/* Task List */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-indigo-600 rounded-full" />
            <h3 className="font-bold text-sm text-slate-900 uppercase">研修プログラム</h3>
          </div>
            {learningPlan.map((item) => {
              const statusInfo = getStatusInfo(item.status, item.isOverdue);
              const isCompleted = item.status === 'COMPLETED';
              
              return (
                <Link href={`/courses/${item.courseId}`} key={item.courseId} className="block group">
                  <Card className={cn(
                    "border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] active:scale-[0.98]",
                    isCompleted ? "bg-slate-50/80 opacity-70" : "bg-white"
                  )}>
                    <CardContent className="p-6 flex items-center gap-5">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner transition-transform duration-500 group-hover:scale-110",
                        isCompleted ? "bg-emerald-50 text-emerald-500" : item.isOverdue ? "bg-rose-50 text-rose-500" : "bg-indigo-50 text-indigo-600"
                      )}>
                        {statusInfo.icon}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md", statusInfo.color)}>
                            {statusInfo.label}
                          </span>
                          {!isCompleted && (
                            <span className={cn("text-[9px] font-bold", item.isOverdue ? "text-rose-500" : "text-slate-400")}>
                              あと {item.daysLeft} 日
                            </span>
                          )}
                        </div>
                        <h4 className={cn("font-black text-sm tracking-tight leading-tight transition-colors", isCompleted ? "text-slate-500" : "text-slate-900 group-hover:text-indigo-600")}>
                          {item.title}
                        </h4>
                      </div>

                      <div className="shrink-0">
                        {isCompleted ? (
                          <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-300">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="absolute -inset-2 bg-indigo-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative w-16 h-16 bg-slate-900 rounded-2xl flex flex-col items-center justify-center shadow-xl transition-all duration-500 group-hover:bg-indigo-600 group-hover:rotate-6">
                              <span className="text-[8px] font-black text-indigo-400 uppercase tracking-tighter mb-0.5">Start</span>
                              <ArrowRight className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    
                    {!isCompleted && (
                      <div className="h-1 w-full bg-slate-100">
                        <div className={cn("h-full transition-all duration-1000", item.isOverdue ? "bg-rose-500" : "bg-indigo-600")} style={{ width: item.status === 'IN_PROGRESS' ? '50%' : '0%' }} />
                      </div>
                    )}
                  </Card>
                </Link>
              );
            })}
        </section>
      </main>
    </div>
  );
}
