import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, CheckCircle2, Clock, Sparkles, ArrowRight, UserCircle, AlertCircle, Trophy, Flame, Zap, Target } from "lucide-react";
import Link from "next/link";
import { StaffMobileNav } from "@/components/staff-mobile-nav";
import { StaffTrainingPlan } from "@/components/staff-training-plan";
import { cn } from "@/lib/utils";

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

  const assignments = await prisma.courseAssignment.findMany({
    where: { facilityId: user.facilityId },
    include: { course: true }
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

  const getStatusInfo = (status: string, isOverdue: boolean) => {
    if (status === 'COMPLETED') return { label: 'Complete', color: 'text-emerald-600 bg-emerald-50', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
    if (isOverdue) return { label: 'Overdue', color: 'text-rose-600 bg-rose-50', icon: <AlertCircle className="w-3.5 h-3.5" /> };
    if (status === 'IN_PROGRESS') return { label: 'In Progress', color: 'text-indigo-600 bg-indigo-50', icon: <Clock className="w-3.5 h-3.5" /> };
    return { label: 'Available', color: 'text-slate-400 bg-slate-50', icon: <BookOpen className="w-3.5 h-3.5" /> };
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans antialiased">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-slate-200/40 h-14 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-[10px]">CL</span>
          </div>
          <h1 className="font-black text-slate-900 text-xs tracking-tight uppercase">Care Learning</h1>
        </div>
        <div className="flex items-center gap-3">
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
        <Card className="bg-white border-none rounded-[2rem] p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest ring-1 ring-indigo-100">
                <Target className="w-3 h-3" /> Progress
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {progressPercentage === 100 ? <>完了しました！</> : 
                 progressPercentage === 0 ? <>最初の一歩を<br/>踏み出しましょう</> : 
                 progressPercentage < 70 ? <>着実に進んでいますね</> : <>ゴールは目前です</>}
              </h2>
            </div>
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle className="text-slate-50" cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle className="text-indigo-600" cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${progressPercentage}, 100`} strokeLinecap="round" />
              </svg>
              <span className="absolute text-xl font-black text-slate-900">{progressPercentage}%</span>
            </div>
          </div>
        </Card>

        {/* Schedule Table - 隙間を詰め、直下に配置 */}
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
                      {/* Course Icon */}
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

                      {/* Premium Action Button */}
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
                              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-indigo-400 rounded-full border-2 border-slate-900 animate-pulse" />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    
                    {/* Status Progress Line */}
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
      <StaffMobileNav />
    </div>
  );
}
