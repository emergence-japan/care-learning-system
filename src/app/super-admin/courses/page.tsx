import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ChevronLeft, BookOpen, Video, HelpCircle, Activity, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteCourse } from "@/lib/actions";
import Link from "next/link";

export default async function CourseManagementPage() {
  const session = await auth();

  if (!session?.user || (session.user as any).role !== "SUPER_ADMIN") {
    redirect("/");
  }

  const courses = await prisma.course.findMany({
    include: {
      _count: {
        select: { 
          questions: true,
          slides: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white pb-20">
      {/* Premium Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 h-20 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay opacity-50" />
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <Link href="/super-admin">
              <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-white/10 text-white/60">
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div>
              <h1 className="font-black text-xl tracking-tight leading-none">Content Management</h1>
              <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em] mt-1.5">研修コンテンツの統括管理</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-400" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-12 space-y-10">
        {/* Intro Section */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100 mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Active Curriculum</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">配信中の研修コース</h2>
          <p className="text-slate-500 font-medium text-sm">
            現在システムで公開されている全ての研修です。コンテンツの追加・編集はプロフェッショナル・エディターを通じて行われます。
          </p>
        </div>

        {/* Courses List - Premium Cards */}
        <div className="grid grid-cols-1 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="group bg-white border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-12px_rgba(0,0,0,0.12)] transition-all duration-500">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-stretch">
                  <div className="flex-1 p-10 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">
                        {course.description || "研修内容の詳細が設定されています。"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <LayoutGrid className="w-3.5 h-3.5 text-blue-500" />
                        {course._count.slides} Slides
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                        {course._count.questions} Questions
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <Video className="w-3.5 h-3.5 text-red-500" />
                        {course.videoUrl ? "Full Video" : "No Video"}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50/50 p-6 sm:w-40 flex sm:flex-col gap-3 justify-center items-center border-t sm:border-t-0 sm:border-l border-slate-100">
                    <Button variant="outline" className="w-full rounded-2xl border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all font-bold text-xs">
                      管理
                    </Button>
                    <form action={async () => {
                      "use server";
                      await deleteCourse(course.id);
                    }} className="w-full">
                      <Button variant="ghost" className="w-full text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {courses.length === 0 && (
            <div className="text-center py-24 bg-white/50 border-2 border-dashed border-slate-200 rounded-[3rem] space-y-4">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-slate-200" />
              </div>
              <div className="space-y-1">
                <p className="text-slate-900 font-bold">研修コースがありません</p>
                <p className="text-slate-400 text-sm">システム・エディターからコンテンツを追加してください。</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}