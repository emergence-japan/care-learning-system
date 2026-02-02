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

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return "このメールアドレスは既に登録されています。";
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role: "STAFF",
      facilityId,
    },
  });

  const courses = await prisma.course.findMany({
    select: { id: true },
  });

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

// --- SUPER ADMIN ACTIONS ---

export async function createCourse(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const videoUrl = formData.get("videoUrl") as string;

  const newCourse = await prisma.course.create({
    data: {
      title,
      description,
      videoUrl,
    },
  });

  // 全ユーザー（スタッフのみ）の取得
  const users = await prisma.user.findMany({
    where: { role: "STAFF" },
    select: { id: true },
  });

  // 既存の全スタッフに新しい研修を割り当てる (確実に一人ずつ)
  for (const user of users) {
    await prisma.enrollment.create({
      data: {
        userId: user.id,
        courseId: newCourse.id,
        status: "NOT_STARTED",
      }
    });
  }

  revalidatePath("/super-admin/courses");
  revalidatePath("/");
}

export async function createCorporation(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  await prisma.corporation.create({
    data: { name },
  });

  revalidatePath("/super-admin/organizations");
}

export async function createFacility(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const corporationId = formData.get("corporationId") as string;

  await prisma.facility.create({
    data: {
      name,
      corporationId,
    },
  });

  revalidatePath("/super-admin/organizations");
}

export async function createOrgUser(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as "HQ" | "ADMIN";
  const corporationId = formData.get("corporationId") as string;
  const facilityId = formData.get("facilityId") as string || null;

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

  await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
      corporationId,
      facilityId,
    },
  });

  revalidatePath("/super-admin/organizations");
}

export async function updateCourse(id: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const videoUrl = formData.get("videoUrl") as string;

  await prisma.course.update({
    where: { id },
    data: {
      title,
      description,
      videoUrl,
    },
  });

  revalidatePath("/super-admin/courses");
  revalidatePath(`/courses/${id}`);
  revalidatePath("/");
}

export async function deleteCourse(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.choice.deleteMany({ where: { question: { courseId: id } } });
  await prisma.question.deleteMany({ where: { courseId: id } });
  await prisma.enrollment.deleteMany({ where: { courseId: id } });
  await prisma.course.delete({ where: { id } });

  revalidatePath("/super-admin/courses");
  revalidatePath("/");
}