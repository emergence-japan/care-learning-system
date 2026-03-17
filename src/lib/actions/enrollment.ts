"use server";

import { revalidatePath } from "next/cache";
import { UnauthorizedError, NotFoundError } from "@/lib/errors";
import { courseRepository, enrollmentRepository } from "@/lib/repositories";

export async function completeEnrollment(courseId: string, assignmentId: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user?.id) throw new UnauthorizedError();

  await enrollmentRepository.update(session.user.id, assignmentId, {
    status: "COMPLETED",
    completedAt: new Date(),
  });

  revalidatePath("/");
  revalidatePath(`/courses/${courseId}`);
}

export async function submitTestResults(
  courseId: string,
  assignmentId: string,
  answers: Record<string, string>,
) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user?.id) throw new UnauthorizedError();

  const course = await courseRepository.findByIdWithQuestions(courseId);
  if (!course) throw new NotFoundError("コースが見つかりません。");

  let correctCount = 0;
  course.questions.forEach((question) => {
    const selectedChoiceId = answers[question.id];
    const correctChoice = question.choices.find((c) => c.isCorrect);
    if (correctChoice && selectedChoiceId === correctChoice.id) {
      correctCount++;
    }
  });

  const isPassed = correctCount === course.questions.length;

  if (isPassed) {
    await enrollmentRepository.update(session.user.id, assignmentId, {
      status: "COMPLETED",
      completedAt: new Date(),
    });

    revalidatePath("/");
    revalidatePath(`/courses/${courseId}`);
  }

  return { isPassed, score: correctCount, total: course.questions.length };
}

export async function saveActionPlan(courseId: string, assignmentId: string, actionPlan: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user?.id) throw new UnauthorizedError();

  await enrollmentRepository.update(session.user.id, assignmentId, {
    actionPlan,
    status: "COMPLETED",
    completedAt: new Date(),
  });

  revalidatePath("/");
  revalidatePath(`/courses/${courseId}`);
}
