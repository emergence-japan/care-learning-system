import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, CheckCircle2, Clock, Sparkles, ArrowRight, UserCircle } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // 管理者の場合はそれぞれのダッシュボードへ
  const role = (session.user as any).role;
  if (role === "ADMIN") redirect("/admin");
  if (role === "HQ") redirect("/hq");
  if (role === "SUPER_ADMIN") redirect("/super-admin");

  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      course: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return { label: '受講済', color: 'text-emerald-600 bg-emerald-50', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
      case 'IN_PROGRESS':
        return { label: '受講中', color: 'text-blue-600 bg-blue-50', icon: <Clock className="w-3.5 h-3.5" /> };
      default:
        return { label: '未受講', color: 'text-slate-400 bg-slate-50', icon: <BookOpen className="w-3.5 h-3.5" /> };
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white pb-20">
      {/* Premium Navigation Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 h-20 flex items-center px-6">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
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
              <span className="text-xs font-bold text-slate-600">{session.user.name}さん</span>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <Button variant="ghost" size="icon" type="submit" className="rounded-full hover:bg-red-50 hover:text-red-600 transition-colors">
                <LogOut className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-10 space-y-12">
        {/* Welcome Section with Visual Depth */}
        <section className="relative">
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <Sparkles className="w-48 h-48 text-white" />
            </div>
            <div className="relative z-10 space-y-4 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Current Status</span>
              </div>
              <h2 className="text-3xl font-black text-white leading-tight">
                こんにちは、{session.user.name}さん。<br />
                今日も学びを深めましょう。
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                あなたの成長が、利用者様の最高の笑顔に繋がります。
              </p>
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="space-y-8">
          <div className="flex items-end justify-between px-2">
            <div className="space-y-1">
              <h3 className="font-black text-2xl text-slate-900 tracking-tight">研修カリキュラム</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Available Courses ({enrollments.length})</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrollments.length > 0 ? (
              enrollments.map((enrollment) => {
                const statusInfo = getStatusInfo(enrollment.status);
                const isCompleted = enrollment.status === 'COMPLETED';
                
                return (
                  <Card key={enrollment.id} className="group relative bg-white border-slate-200/60 rounded-[2rem] overflow-hidden shadow-[0_15px_40px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] transition-all duration-500 hover:-translate-y-2">
                    <CardContent className="p-0">
                      {/* Card Header Color Strip */}
                      <div className={cn("h-2 w-full", isCompleted ? "bg-emerald-500" : "bg-blue-600")} />
                      
                      <div className="p-8 space-y-6">
                        <div className="flex justify-between items-start">
                          <div className={cn("px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 shadow-sm", statusInfo.color)}>
                            {statusInfo.icon}
                            {statusInfo.label}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xl font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                            {enrollment.course.title}
                          </h4>
                          <p className="text-slate-500 text-xs font-medium leading-relaxed line-clamp-2">
                            {enrollment.course.description || "プロフェッショナルな介護技術と知識を身につけるための特別研修です。"}
                          </p>
                        </div>

                        <Link href={`/courses/${enrollment.courseId}`} className="block">
                          <Button className={cn(
                            "w-full h-14 rounded-2xl font-black text-sm shadow-lg transition-all active:scale-[0.98] group/btn",
                            isCompleted 
                              ? "bg-slate-50 text-slate-600 hover:bg-slate-100 shadow-none border border-slate-200" 
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
              })
            ) : (
              <div className="col-span-full py-20 bg-white border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold">現在、割り当てられた研修はありません</p>
                  <p className="text-slate-400 text-sm">新しい研修が追加されるまでお待ちください。</p>
                </div>
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
