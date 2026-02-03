import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, CheckCircle2, Clock, Sparkles, ArrowRight, UserCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { facilityId: true, role: true, name: true }
  });

  // 管理者の場合はそれぞれのダッシュボードへ
  if (user?.role === "ADMIN") redirect("/admin");
  if (user?.role === "HQ") redirect("/hq");
  if (user?.role === "SUPER_ADMIN") redirect("/super-admin");

  if (!user?.facilityId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <Card className="max-w-md w-full p-8 text-center space-y-4 rounded-[2rem]">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold">所属施設が未設定です</h2>
          <p className="text-slate-500">管理者による施設へのアサインをお待ちください。</p>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <Button variant="outline" type="submit" className="rounded-xl">ログアウト</Button>
          </form>
        </Card>
      </div>
    );
  }

  // 1. この施設に割り当てられている研修計画（期限）を取得
  const assignments = await prisma.courseAssignment.findMany({
    where: { facilityId: user.facilityId },
    include: { course: true }
  });

  // 2. スタッフの受講状況を取得
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    include: { course: true }
  });

  // 3. 計画（Assignment）と受講状況（Enrollment）を統合
  const learningPlan = assignments.map(assignment => {
    const enrollment = enrollments.find(e => e.courseId === assignment.courseId);
    
    // 残り日数の計算
    const today = new Date();
    const diffTime = assignment.endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      courseId: assignment.courseId,
      title: assignment.course.title,
      description: assignment.course.description,
      status: enrollment?.status || 'NOT_STARTED',
      endDate: assignment.endDate,
      daysLeft: diffDays,
      isOverdue: diffDays < 0
    };
  }).sort((a, b) => {
    // 未完了かつ期限が近いものを優先
    if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') return 1;
    if (a.status !== 'COMPLETED' && b.status === 'COMPLETED') return -1;
    return a.endDate.getTime() - b.endDate.getTime();
  });

  const getStatusInfo = (status: string, isOverdue: boolean) => {
    if (status === 'COMPLETED') {
      return { label: '受講済', color: 'text-emerald-600 bg-emerald-50', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
    }
    if (isOverdue) {
      return { label: '期限切れ', color: 'text-red-600 bg-red-50', icon: <AlertCircle className="w-3.5 h-3.5" /> };
    }
    if (status === 'IN_PROGRESS') {
      return { label: '受講中', color: 'text-blue-600 bg-blue-50', icon: <Clock className="w-3.5 h-3.5" /> };
    }
    return { label: '未受講', color: 'text-slate-400 bg-slate-50', icon: <BookOpen className="w-3.5 h-3.5" /> };
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white pb-20">
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 h-20 flex items-center px-6">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xs">CL</span>
            </div>
            <div>
              <h1 className="font-bold text-base text-slate-900 leading-none">ケア・ラーニング</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Professional LMS</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
              <UserCircle className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-600">{user?.name}さん</span>
            </div>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <Button variant="ghost" size="icon" type="submit" className="rounded-full hover:bg-red-50 hover:text-red-600">
                <LogOut className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-10 space-y-12">
        <section className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Sparkles className="w-48 h-48 text-white" />
          </div>
          <div className="relative z-10 space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Learning Plan 2024</span>
            </div>
            <h2 className="text-3xl font-black text-white leading-tight">
              こんにちは、{user?.name}さん。
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed">
              施設が計画した現在の研修プランです。期限内に受講を完了させましょう。
            </p>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-end justify-between px-2">
            <h3 className="font-black text-2xl text-slate-900 tracking-tight">現在の研修プラン</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPlan.map((item) => {
              const statusInfo = getStatusInfo(item.status, item.isOverdue);
              const isCompleted = item.status === 'COMPLETED';
              
              return (
                <Card key={item.courseId} className="group relative bg-white border-slate-200/60 rounded-[2rem] overflow-hidden shadow-[0_15px_40px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2">
                  <CardContent className="p-0">
                    <div className={cn("h-2 w-full", isCompleted ? "bg-emerald-500" : item.isOverdue ? "bg-red-500" : "bg-blue-600")} />
                    
                    <div className="p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className={cn("px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 shadow-sm", statusInfo.color)}>
                          {statusInfo.icon}
                          {statusInfo.label}
                        </div>
                        {!isCompleted && (
                          <div className={cn("text-[10px] font-black", item.isOverdue ? "text-red-600" : "text-slate-400")}>
                            {item.isOverdue ? "期限切れ" : `残り ${item.daysLeft} 日`}
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xl font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2">
                          期限: {item.endDate.toLocaleDateString('ja-JP')}
                        </p>
                      </div>

                      <Link href={`/courses/${item.courseId}`} className="block">
                        <Button className={cn(
                          "w-full h-14 rounded-2xl font-black text-sm shadow-lg transition-all active:scale-[0.98] group/btn",
                          isCompleted 
                            ? "bg-slate-50 text-slate-600 hover:bg-slate-100 shadow-none border border-slate-200" 
                            : item.isOverdue
                            ? "bg-red-600 text-white hover:bg-red-700 shadow-red-100"
                            : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200"
                        )}>
                          {isCompleted ? 'もう一度復習する' : '研修を開始する'}
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {learningPlan.length === 0 && (
              <div className="col-span-full py-20 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] text-center space-y-4">
                <BookOpen className="w-8 h-8 text-slate-200 mx-auto" />
                <p className="text-slate-400 font-bold">現在、進行中の研修計画はありません。</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}