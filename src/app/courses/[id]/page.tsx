import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { completeEnrollment, submitTestResults, saveActionPlan } from "@/lib/actions";
import { CourseClient } from "./course-client";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id!,
        courseId: id,
      },
    },
    include: {
      course: {
        include: {
          slides: {
            orderBy: {
              order: 'asc',
            },
          },
          questions: {
            orderBy: {
              order: 'asc',
            },
            include: {
              choices: true,
            },
          },
        },
      },
    },
  });

  if (!enrollment) {
    notFound();
  }

  // 開始日チェック（監査対応：計画期間外の受講を制限）
  const assignment = await prisma.courseAssignment.findUnique({
    where: {
      facilityId_courseId: {
        facilityId: session.user.facilityId!,
        courseId: id,
      },
    },
  });

  const now = new Date();
  if (assignment && assignment.startDate > now && enrollment.status !== 'COMPLETED') {
    redirect("/");
  }

  const handleComplete = async () => {
    "use server";
    await completeEnrollment(id);
  };

  const handleSubmitTest = async (answers: Record<string, string>) => {
    "use server";
    return await submitTestResults(id, answers);
  };

  const handleSaveActionPlan = async (actionPlan: string) => {
    "use server";
    await saveActionPlan(id, actionPlan);
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
            {enrollment.course.title}
          </h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full mt-6 mb-4"></div>
          <p className="text-slate-500 font-bold text-base max-w-xl mx-auto leading-relaxed">
            {enrollment.course.description}
          </p>
        </section>

        <div className="bg-white rounded-[3.5rem] p-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-slate-100">
          <CourseClient
            courseId={id}
            title={enrollment.course.title}
            introduction={enrollment.course.introduction}
            learningObjectives={enrollment.course.learningObjectives}
            slides={enrollment.course.slides}
            questions={enrollment.course.questions}
            courseVideoUrl={enrollment.course.videoUrl}
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