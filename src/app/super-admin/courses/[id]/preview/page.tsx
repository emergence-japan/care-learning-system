import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
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
    <div className="h-screen w-screen bg-[#0f172a] overflow-hidden flex flex-col items-center p-0 m-0 font-sans antialiased">
      <main className="w-full max-w-7xl h-full flex flex-col px-4 lg:px-12 pt-4">
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
      </main>
    </div>
  );
}
