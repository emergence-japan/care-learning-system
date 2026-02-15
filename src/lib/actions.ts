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
      loginId: formData.get("loginId"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return "ログインIDまたはパスワードが正しくありません。";
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

export async function saveActionPlan(courseId: string, actionPlan: string) {
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
      actionPlan,
      status: "COMPLETED",
      completedAt: new Date(),
    },
  });

  revalidatePath("/");
  revalidatePath(`/courses/${courseId}`);
}

export async function registerStaff(
  formData: FormData,
) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user.isSuspended) {
    throw new Error("利用停止中のため、この操作は許可されていません。");
  }

  const facilityId = session.user.facilityId;
  if (!facilityId) {
    throw new Error("Facility not assigned to admin");
  }

  // 制限チェック（施設単位）
  const facility = await prisma.facility.findUnique({
    where: { id: facilityId },
    include: { 
      _count: {
        select: { users: { where: { role: "STAFF" } } }
      }
    }
  });

  if (!facility) {
    throw new Error("Facility not found");
  }

  if (facility._count.users >= facility.maxStaff) {
    return `施設のスタッフ登録枠の上限（${facility.maxStaff}名）に達しています。`;
  }

  const name = formData.get("name") as string;
  const loginId = formData.get("loginId") as string;
  const password = formData.get("password") as string;

  if (!name || !loginId || !password) {
    return "全ての項目（氏名、ログインID、パスワード）を入力してください。";
  }

  const existingUser = await prisma.user.findUnique({
    where: { loginId },
  });

  if (existingUser) {
    return "このログインIDは既に登録されています。別のIDを指定してください。";
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      loginId,
      password,
      role: "STAFF",
      facilityId,
      corporationId: facility.corporationId,
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

export async function updateUser(userId: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user) throw new Error("Unauthorized");

  if (session.user.isSuspended) {
    throw new Error("利用停止中のため、この操作は許可されていません。");
  }

  const name = formData.get("name") as string;
  const loginId = formData.get("loginId") as string;
  const password = formData.get("password") as string;

  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, corporationId: true, facilityId: true }
  });

  if (!targetUser) throw new Error("User not found");

  // 権限チェック
  const requesterRole = session.user.role;
  let isAuthorized = false;

  if (requesterRole === "SUPER_ADMIN") {
    isAuthorized = true;
  } else if (requesterRole === "HQ") {
    // HQは自法人のユーザーのみ更新可能
    if (targetUser.corporationId === session.user.corporationId) {
      isAuthorized = true;
    }
  } else if (requesterRole === "ADMIN") {
    // ADMINは自施設のスタッフのみ更新可能
    if (targetUser.facilityId === session.user.facilityId && targetUser.role === "STAFF") {
      isAuthorized = true;
    }
  }

  if (!isAuthorized) throw new Error("Forbidden");

  // ログインIDが重複していないかチェック（変更する場合のみ）
  if (loginId) {
    const existing = await prisma.user.findFirst({
      where: { 
        loginId,
        NOT: { id: userId }
      }
    });
    if (existing) return "このログインIDは既に使用されています。";
  }

  const updateData: any = {};
  if (name) updateData.name = name;
  if (loginId) updateData.loginId = loginId;
  if (password && password.length >= 4) updateData.password = password;

  await prisma.user.update({
    where: { id: userId },
    data: updateData
  });

  revalidatePath("/admin");
  revalidatePath("/hq");
  revalidatePath("/super-admin/organizations");
  revalidatePath("/hq/facilities/[id]", "page");
}

export async function hqUpdateUserPassword(userId: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "HQ") {
    throw new Error("Unauthorized");
  }

  const newPassword = formData.get("password") as string;
  if (!newPassword || newPassword.length < 4) {
    return "パスワードは4文字以上で入力してください。";
  }

  // 対象ユーザーが自分の法人に属しているかチェック
  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { corporationId: true }
  });

  if (!targetUser || targetUser.corporationId !== session.user.corporationId) {
    throw new Error("Forbidden: You can only update users within your corporation.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { password: newPassword }
  });

  revalidatePath("/hq/facilities/[id]", "page");
}

export async function updateStaffPassword(staffId: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const newPassword = formData.get("password") as string;
  if (!newPassword || newPassword.length < 4) {
    return "パスワードは4文字以上で入力してください。";
  }

  // 自分の施設のスタッフかどうかのチェック
  const staff = await prisma.user.findUnique({
    where: { id: staffId },
    select: { facilityId: true }
  });

  if (!staff || staff.facilityId !== session.user.facilityId) {
    throw new Error("Forbidden");
  }

  await prisma.user.update({
    where: { id: staffId },
    data: { password: newPassword }
  });

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
  // タイトルから英数字のみを抽出してslugを生成、またはタイムスタンプを付与
  const slug = title.toLowerCase().replace(/[^a-z0-9]/g, "-") || `course-${Date.now()}`;

  const newCourse = await prisma.course.create({
    data: {
      slug,
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
  const maxFacilities = parseInt(formData.get("maxFacilities") as string) || 10;
  const maxStaff = parseInt(formData.get("maxStaff") as string) || 100;

  await prisma.corporation.create({
    data: { 
      name,
      maxFacilities,
      maxStaff
    },
  });

  revalidatePath("/super-admin/organizations");
}

export async function updateCorporation(id: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const maxFacilities = parseInt(formData.get("maxFacilities") as string);
  const maxStaff = parseInt(formData.get("maxStaff") as string);

  await prisma.corporation.update({
    where: { id },
    data: { 
      name,
      maxFacilities,
      maxStaff
    },
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
  const type = formData.get("type") as string;
  const corporationId = formData.get("corporationId") as string;
  const maxStaff = parseInt(formData.get("maxStaff") as string) || 20;

  // 制限チェック (法人単位の施設数制限は維持)
  const corporation = await prisma.corporation.findUnique({
    where: { id: corporationId },
    include: { _count: { select: { facilities: true } } }
  });

  if (!corporation) throw new Error("Corporation not found");
  if (corporation._count.facilities >= corporation.maxFacilities) {
    throw new Error(`施設登録枠の上限（${corporation.maxFacilities}施設）に達しています。`);
  }

  await prisma.facility.create({
    data: {
      name,
      type,
      corporationId,
      maxStaff
    },
  });

  revalidatePath("/super-admin/organizations");
}

export async function hqCreateFacility(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "HQ") {
    throw new Error("Unauthorized");
  }

  if (session.user.isSuspended) {
    throw new Error("利用停止中のため、この操作は許可されていません。");
  }

  const corporationId = session.user.corporationId;
  if (!corporationId) throw new Error("Corporation not assigned");

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const maxStaff = parseInt(formData.get("maxStaff") as string) || 20;

  if (!name) return "施設名を入力してください。";

  // 制限チェック
  const corporation = await prisma.corporation.findUnique({
    where: { id: corporationId },
    include: { _count: { select: { facilities: true } } }
  });

  if (!corporation) throw new Error("Corporation not found");
  if (corporation._count.facilities >= corporation.maxFacilities) {
    return `法人全体の施設登録枠の上限（${corporation.maxFacilities}施設）に達しています。これ以上追加できません。`;
  }

  // 施設名の重複チェック
  const existingFacility = await prisma.facility.findUnique({
    where: { name }
  });

  if (existingFacility) {
    return "同じ名前の施設が既に存在します。";
  }

  await prisma.facility.create({
    data: {
      name,
      type,
      corporationId,
      maxStaff
    },
  });

  revalidatePath("/hq");
}

export async function hqUpdateFacility(id: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "HQ") {
    throw new Error("Unauthorized");
  }

  if (session.user.isSuspended) {
    throw new Error("利用停止中のため、この操作は許可されていません。");
  }

  const name = formData.get("name") as string;
  const maxStaff = parseInt(formData.get("maxStaff") as string);

  // 自分の法人の施設かチェック
  const facility = await prisma.facility.findUnique({
    where: { id },
    select: { corporationId: true }
  });

  if (!facility || facility.corporationId !== session.user.corporationId) {
    throw new Error("Forbidden");
  }

  await prisma.facility.update({
    where: { id },
    data: { 
      name,
      maxStaff: isNaN(maxStaff) ? undefined : maxStaff
    },
  });

  revalidatePath("/hq");
  revalidatePath("/hq/facilities/[id]", "page");
}

export async function hqCreateAdmin(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "HQ") {
    throw new Error("Unauthorized");
  }

  if (session.user.isSuspended) {
    throw new Error("利用停止中のため、この操作は許可されていません。");
  }

  const corporationId = session.user.corporationId;
  const facilityId = formData.get("facilityId") as string;
  const name = formData.get("name") as string;
  const loginId = formData.get("loginId") as string;
  const password = formData.get("password") as string;

  if (!name || !loginId || !password || !facilityId) {
    return "全ての項目を入力してください。";
  }

  // ログインIDの重複チェック
  const existingUser = await prisma.user.findUnique({
    where: { loginId },
  });

  if (existingUser) {
    return "このログインIDは既に登録されています。";
  }

  await prisma.user.create({
    data: {
      name,
      loginId,
      password,
      role: "ADMIN",
      corporationId,
      facilityId,
    },
  });

  revalidatePath("/hq");
}

export async function updateFacility(id: string, formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const maxStaff = parseInt(formData.get("maxStaff") as string);

  await prisma.facility.update({
    where: { id },
    data: { 
      name,
      maxStaff
    },
  });

  revalidatePath("/super-admin/organizations");
}

export async function toggleCorporationStatus(id: string, isActive: boolean) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.corporation.update({
    where: { id },
    data: { isActive },
  });

  revalidatePath("/super-admin/organizations");
  revalidatePath("/super-admin");
}

export async function toggleFacilityStatus(id: string, isActive: boolean) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  await prisma.facility.update({
    where: { id },
    data: { isActive },
  });

  revalidatePath("/super-admin/organizations");
  revalidatePath("/hq");
}

export async function createOrgUser(formData: FormData) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name") as string;
  const loginId = formData.get("loginId") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as "HQ" | "ADMIN";
  const corporationId = formData.get("corporationId") as string;
  const facilityId = (formData.get("facilityId") as string) || null;

  if (!name || !loginId || !password) {
    return "全ての必須項目（氏名、ログインID、パスワード）を入力してください。";
  }

  // ログインIDの重複チェック
  const existingUser = await prisma.user.findUnique({
    where: { loginId },
  });

  if (existingUser) {
    return "このログインIDは既に登録されています。";
  }

  await prisma.user.create({
    data: {
      name,
      loginId,
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

  // 関連データを順番に削除（外部キー制約エラーを避けるため）
  await prisma.choice.deleteMany({ where: { question: { courseId: id } } });
  await prisma.question.deleteMany({ where: { courseId: id } });
  await prisma.slide.deleteMany({ where: { courseId: id } });
  await prisma.enrollment.deleteMany({ where: { courseId: id } });
  await prisma.courseAssignment.deleteMany({ where: { courseId: id } });
  await prisma.course.delete({ where: { id } });

  revalidatePath("/super-admin/courses");
  revalidatePath("/");
}

// --- DELETION ACTIONS ---

export async function deleteCorporation(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized");
  }

  // 関連データの削除（カスケード設定がない場合を考慮）
  await prisma.enrollment.deleteMany({ where: { user: { corporationId: id } } });
  await prisma.user.deleteMany({ where: { corporationId: id } });
  await prisma.facility.deleteMany({ where: { corporationId: id } });
  await prisma.corporation.delete({ where: { id } });

  revalidatePath("/super-admin/organizations");
}

export async function deleteFacility(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();
  const role = (session?.user as any)?.role;

  if (!session?.user || (role !== "SUPER_ADMIN" && role !== "HQ")) {
    throw new Error("Unauthorized");
  }

  // 施設管理者の場合、自分の法人に属しているかチェックが必要（HQの場合）
  if (role === "HQ") {
    const facility = await prisma.facility.findUnique({
      where: { id },
      select: { corporationId: true }
    });
    if (facility?.corporationId !== session.user.corporationId) {
      throw new Error("Forbidden");
    }
  }

  await prisma.enrollment.deleteMany({ where: { user: { facilityId: id } } });
  await prisma.user.deleteMany({ where: { facilityId: id } });
  await prisma.facility.delete({ where: { id } });

  revalidatePath("/super-admin/organizations");
  revalidatePath("/hq");
}

export async function deleteUser(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();
  const role = (session?.user as any)?.role;

  if (!session?.user || (role !== "SUPER_ADMIN" && role !== "HQ" && role !== "ADMIN")) {
    throw new Error("Unauthorized");
  }

  // HQの場合、自分の法人に属しているかチェック
  if (role === "HQ") {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { corporationId: true }
    });
    if (user?.corporationId !== session.user.corporationId) {
      throw new Error("Forbidden");
    }
  }

  // ADMINの場合、自分の施設に属しているかチェック
  if (role === "ADMIN") {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { facilityId: true }
    });
    if (user?.facilityId !== session.user.facilityId) {
      throw new Error("Forbidden");
    }
  }

  await prisma.enrollment.deleteMany({ where: { userId: id } });
  await prisma.user.delete({ where: { id } });

  revalidatePath("/admin");
  revalidatePath("/hq");
  revalidatePath("/super-admin/organizations");
  return { success: true };
}

// --- ASSIGNMENT ACTIONS ---

export async function assignCourseToFacility(courseId: string, startDate: Date, endDate: Date) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  if (session.user.isSuspended) {
    throw new Error("利用停止中のため、この操作は許可されていません。");
  }

  const facilityId = session.user.facilityId;
  if (!facilityId) throw new Error("Facility not assigned");

  // 1. 割当の作成または更新
  await prisma.courseAssignment.upsert({
    where: {
      facilityId_courseId: { facilityId, courseId }
    },
    create: { facilityId, courseId, startDate, endDate },
    update: { startDate, endDate }
  });

  // 2. その施設の全スタッフに対して受講レコードを生成
  const staffMembers = await prisma.user.findMany({
    where: { facilityId, role: "STAFF" },
    select: { id: true }
  });

  for (const staff of staffMembers) {
    await prisma.enrollment.upsert({
      where: {
        userId_courseId: { userId: staff.id, courseId }
      },
      create: { userId: staff.id, courseId, status: "NOT_STARTED" },
      update: {} // 既に存在する場合はステータスを維持
    });
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function updateCourseAssignment(id: string, startDate: Date, endDate: Date) {
  const { auth } = await import("@/auth");
  const session = await auth();

  const facilityId = session?.user?.facilityId;
  if (!session?.user || session.user.role !== "ADMIN" || !facilityId) {
    throw new Error("Unauthorized");
  }

  try {
    await prisma.courseAssignment.update({
      where: { 
        id,
        facilityId 
      },
      data: { startDate, endDate }
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Update assignment error:", error);
    return { success: false, error: "更新に失敗しました。" };
  }
}

export async function deleteCourseAssignment(id: string) {
  const { auth } = await import("@/auth");
  const session = await auth();

  const facilityId = session?.user?.facilityId;
  if (!session?.user || session.user.role !== "ADMIN" || !facilityId) {
    throw new Error("Unauthorized");
  }

  try {
    // deleteMany を使うことで、対象が存在しない場合でもエラーにならずに「0件削除」として成功する
    await prisma.courseAssignment.deleteMany({
      where: { 
        id,
        facilityId
      }
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Delete assignment error:", error);
    return { success: false, error: "削除に失敗しました。" };
  }
}

export async function updateFiscalYearStartMonth(month: number) {
  const { auth } = await import("@/auth");
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const corporationId = session.user.corporationId;
  if (!corporationId) throw new Error("Corporation not found");

  if (month < 1 || month > 12) throw new Error("Invalid month");

  await prisma.corporation.update({
    where: { id: corporationId },
    data: { fiscalYearStartMonth: month }
  });

  revalidatePath("/admin");
}

// --- INQUIRY ACTIONS ---

export async function createInquiry(formData: FormData) {
  const { auth } = await import('@/auth');
  const session = await auth();

  if (!session?.user?.id) throw new Error('Unauthorized');

  const subject = formData.get('subject') as string;
  const content = formData.get('content') as string;

  if (!subject || !content) {
    return '件名と内容を入力してください。';
  }

  await prisma.inquiry.create({
    data: {
      subject,
      content,
      senderId: session.user.id,
      status: 'UNREAD',
    },
  });

  revalidatePath('/admin/inquiry');
  revalidatePath('/hq/inquiry');
}

export async function createInquiryReply(inquiryId: string, content: string) {
  const { auth } = await import('@/auth');
  const session = await auth();

  if (!session?.user?.id) throw new Error('Unauthorized');

  if (!content) return '内容を入力してください。';

  await prisma.inquiryReply.create({
    data: {
      inquiryId,
      content,
      senderId: session.user.id,
    },
  });

  const inquiry = await prisma.inquiry.findUnique({
    where: { id: inquiryId },
    select: { senderId: true }
  });

  if (session.user.role === 'SUPER_ADMIN') {
    await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { status: 'REPLIED' },
    });
  }

  revalidatePath('/admin/inquiry');
  revalidatePath('/hq/inquiry');
  revalidatePath('/super-admin/inquiries');
}

export async function closeInquiry(inquiryId: string) {
  const { auth } = await import('@/auth');
  const session = await auth();

  if (!session?.user) throw new Error('Unauthorized');

  await prisma.inquiry.update({
    where: { id: inquiryId },
    data: { status: 'CLOSED' },
  });

  revalidatePath('/admin/inquiry');
  revalidatePath('/hq/inquiry');
  revalidatePath('/super-admin/inquiries');
}
