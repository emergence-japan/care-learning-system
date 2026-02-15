import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { completeEnrollment, submitTestResults, saveActionPlan } from "@/lib/actions";
import { CourseClient } from "./course-client";
import { StaffMobileNav } from "@/components/staff-mobile-nav";

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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-white pb-24">
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 h-20 flex items-center px-6">
        <div className="max-w-xl mx-auto w-full flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-slate-100 transition-all">
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </Button>
          </Link>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Curriculum</span>
            <h1 className="font-bold text-sm text-slate-900 truncate max-w-[200px]">研修受講</h1>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 pt-10 space-y-10">
        <section className="text-center space-y-4">
          <div className="inline-block bg-slate-900 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
            Professional Course
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {enrollment.course.title}
          </h2>
          <p className="text-slate-500 font-medium text-sm max-w-sm mx-auto">
            {enrollment.course.description}
          </p>
        </section>

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
      </main>

      <StaffMobileNav />
    </div>
  );
}