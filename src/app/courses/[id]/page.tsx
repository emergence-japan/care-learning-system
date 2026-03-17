import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { completeEnrollment, submitTestResults, saveActionPlan } from "@/lib/actions";
import { CourseClient } from "./course-client";
import { enrollmentRepository } from "@/lib/repositories";

export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ assignment?: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;
  const { assignment: assignmentId } = await searchParams;

  if (!assignmentId) {
    redirect("/");
  }

  // アサインが自施設のものか検証
  const assignment = await prisma.courseAssignment.findFirst({
    where: { id: assignmentId, facilityId: session.user.facilityId!, courseId: id },
  });

  if (!assignment) {
    notFound();
  }

  // 開始日チェック（計画期間外の受講を制限）
  const now = new Date();
  const isStarted = assignment.startDate <= now;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      slides: { orderBy: { order: 'asc' } },
      questions: {
        orderBy: { order: 'asc' },
        include: { choices: true },
      },
    },
  });

  if (!course) {
    notFound();
  }

  // 受講記録をアサイン単位で upsert（初回アクセス時に作成）
  const enrollment = await enrollmentRepository.upsertForAssignment(
    session.user.id!,
    id,
    assignmentId,
  );

  // 開始前かつ未完了の場合はダッシュボードへリダイレクト
  if (!isStarted && enrollment.status !== 'COMPLETED') {
    redirect("/");
  }

  const handleComplete = async () => {
    "use server";
    await completeEnrollment(id, assignmentId);
  };

  const handleSubmitTest = async (answers: Record<string, string>) => {
    "use server";
    return await submitTestResults(id, assignmentId, answers);
  };

  const handleSaveActionPlan = async (actionPlan: string) => {
    "use server";
    await saveActionPlan(id, assignmentId, actionPlan);
  };

  return (
    <div
      className="min-h-screen !bg-slate-50 pb-16 relative overflow-hidden light"
      style={{
        backgroundColor: '#f8fafc',
        ['--background' as any]: 'oklch(0.985 0 0)',
        ['--card' as any]: 'oklch(1 0 0)'
      }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px]" />
      </div>

      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-50 h-20 flex items-center px-6 shadow-sm">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2 pr-4 text-slate-500 hover:text-slate-900 font-black text-xs uppercase tracking-widest">
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span>Back</span>
            </Button>
          </Link>
          <div className="flex flex-col items-center">
            <div className="w-8 h-1 bg-slate-900 rounded-full mb-2"></div>
            <h1 className="font-black text-[10px] uppercase tracking-[0.4em] text-slate-900">Training Session</h1>
          </div>
          <div className="w-24 flex justify-end">
            <div className="w-10 h-10 bg-slate-50 rounded-full border border-slate-100"></div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-12 relative z-10">
        <section className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Legal Compliance 2024</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {course.title}
          </h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full mt-6 mb-4"></div>
          <p className="text-slate-500 font-bold text-base max-w-xl mx-auto leading-relaxed">
            {course.description}
          </p>
        </section>

        <div className="sm:bg-white sm:rounded-[3.5rem] sm:p-4 sm:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] sm:border sm:border-slate-100">
          <CourseClient
            courseId={id}
            title={course.title}
            introduction={course.introduction}
            learningObjectives={course.learningObjectives}
            slides={course.slides}
            questions={course.questions}
            courseVideoUrl={course.videoUrl}
            isInitialCompleted={enrollment.status === "COMPLETED"}
            initialActionPlan={enrollment.actionPlan}
            onComplete={handleComplete}
            onSubmitTest={handleSubmitTest}
            onSaveActionPlan={handleSaveActionPlan}
          />
        </div>
      </main>
    </div>
  );
}
