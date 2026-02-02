"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const { signIn } = await import("@/auth");
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return "メールアドレスまたはパスワードが正しくありません。";
    }
    throw error;
  }
}

export async function completeEnrollment(courseId: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.enrollment.update({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId,
      },
    },
    data: {
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });

  revalidatePath("/");
  revalidatePath(`/courses/${courseId}`);
}

export async function submitTestResults(courseId: string, answers: Record<string, string>) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // サーバー側で正解を検証
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      questions: {
        include: {
          choices: true,
        },
      },
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

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
    await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });

    revalidatePath("/");
    revalidatePath(`/courses/${courseId}`);
  }

  return { isPassed, score: correctCount, total: course.questions.length };
}

export async function registerStaff(
  prevState: string | undefined,
  formData: FormData,
) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const facilityId = (session.user as any).facilityId;
  if (!facilityId) {
    throw new Error("Facility not assigned to admin");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return "全ての項目を入力してください。";
  }

  // メールアドレスの重複チェック
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return "このメールアドレスは既に登録されています。";
  }

  // ユーザーの作成
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password, // 本来はハッシュ化すべきだが、プロトタイプなので簡易的に。authorize側も平文対応済み。
      role: "STAFF",
      facilityId,
    },
  });

  // 全研修の取得
  const courses = await prisma.course.findMany({
    select: { id: true },
  });

  // 全研修への割り当て（受講実績の作成）
  if (courses.length > 0) {
    await prisma.enrollment.createMany({
      data: courses.map((course) => ({
        userId: newUser.id,
        courseId: course.id,
        status: "NOT_STARTED",
      })),
    });
  }

  revalidatePath("/admin");
}
