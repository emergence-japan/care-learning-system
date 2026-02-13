import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { CourseClient } from "@/app/courses/[id]/course-client";

export default async function AdminCoursePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/");
  }

  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      slides: {
        orderBy: { order: 'asc' },
      },
      questions: {
        orderBy: { order: 'asc' },
        include: {
          choices: true,
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  // プレビュー用のダミーハンドラー
  const handleComplete = async () => { "use server"; console.log("Preview: Complete"); };
  const handleSubmitTest = async () => { "use server"; return { isPassed: true, score: 100, total: 100 }; };
  const handleSaveActionPlan = async () => { "use server"; console.log("Preview: Save Action Plan"); };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white pb-20">
      {/* 受講者画面と全く同じヘッダー */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 h-20 flex items-center px-6">
        <div className="max-w-xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest">
            Admin Preview Mode
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Curriculum</span>
            <h1 className="font-bold text-sm text-slate-900 truncate max-w-[200px]">プレビュー中</h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 pt-10 space-y-10">
        <section className="text-center space-y-4">
          <div className="inline-block bg-slate-900 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
            Professional Course
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {course.title}
          </h2>
          <p className="text-slate-500 font-medium text-sm max-w-sm mx-auto">
            {course.description}
          </p>
        </section>

        {/* 受講者画面と全く同じクライアントプレイヤー */}
        <CourseClient
          courseId={id}
          title={course.title}
          introduction={course.introduction}
          learningObjectives={course.learningObjectives}
          slides={course.slides}
          questions={course.questions}
          courseVideoUrl={course.videoUrl}
          isInitialCompleted={false}
          initialActionPlan=""
          onComplete={handleComplete}
          onSubmitTest={handleSubmitTest}
          onSaveActionPlan={handleSaveActionPlan}
        />
        
        <div className="mt-20 p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-center">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">End of Preview</p>
           <p className="text-[10px] text-slate-300 mt-1">このページは管理者のみがアクセス可能です</p>
        </div>
      </main>
    </div>
  );
}
