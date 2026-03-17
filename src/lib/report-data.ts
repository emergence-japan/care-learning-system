import prisma from "@/lib/prisma";

export async function getSummaryReportData(facilityId: string, fiscalYear: number, startMonth: number = 4) {
  const startDate = new Date(fiscalYear, startMonth - 1, 1);
  const endDate = new Date(fiscalYear + 1, startMonth - 1, 0);

  const facility = await prisma.facility.findUnique({
    where: { id: facilityId },
    include: { corporation: true },
  });

  if (!facility) throw new Error("Facility not found");

  const staffCount = await prisma.user.count({
    where: { facilityId, role: "STAFF" },
  });

  const courses = await prisma.course.findMany({
    include: {
      enrollments: {
        where: {
          user: { facilityId },
          status: "COMPLETED",
          completedAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
      assignments: {
        where: { facilityId },
      },
      slides: {
        orderBy: { order: "asc" },
        select: { title: true }
      }
    },
    orderBy: { title: "asc" },
  });

  const reportCourses = courses.map((course) => {
    const assignment = course.assignments.find(a => a.facilityId === facilityId);
    const completedCount = course.enrollments.length;
    const rate = staffCount > 0 ? Math.round((completedCount / staffCount) * 100) : 0;
    
    const latestDate = course.enrollments.reduce((latest: Date | null, e) => {
      if (!e.completedAt) return latest;
      if (!latest || e.completedAt > latest) return e.completedAt;
      return latest;
    }, null);

    // クレンジング処理
    const cleanTitle = course.title.replace(/\s*（\d+年度）$/, "").trim();
    const cleanObjectives = (course.learningObjectives || "なし")
      .replace(/<[^>]*>/g, "") // HTMLタグ除去
      .replace(/&nbsp;/g, " ") // 特殊文字除去
      .trim();

    return {
      title: cleanTitle,
      targetCount: staffCount,
      completedCount,
      completionRate: rate,
      plannedEndDate: assignment ? assignment.endDate.toLocaleDateString("ja-JP") : "未設定",
      actualEndDate: latestDate ? latestDate.toLocaleDateString("ja-JP") : "未完了",
      learningObjectives: cleanObjectives,
      curriculum: course.slides.map(s => s.title.replace(/<[^>]*>/g, "").trim())
    };
  });

  return {
    corporationName: facility.corporation?.name ?? "",
    facilityName: facility.name,
    fiscalYear,
    generatedAt: new Date().toLocaleDateString("ja-JP"),
    courses: reportCourses,
  };
}

export async function getStaffReportData(userId: string, fiscalYear: number, startMonth: number = 4) {
  const startDate = new Date(fiscalYear, startMonth - 1, 1);
  const endDate = new Date(fiscalYear + 1, startMonth - 1, 0);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      facility: { include: { corporation: true } },
      enrollments: {
        include: { course: true },
        where: {
          OR: [
            { status: "COMPLETED", completedAt: { gte: startDate, lte: endDate } },
            { status: { in: ["NOT_STARTED", "IN_PROGRESS"] } }
          ]
        },
        orderBy: { course: { title: "asc" } }
      }
    }
  });

  if (!user || !user.facility) throw new Error("User or facility not found");

  return {
    staffName: user.name,
    corporationName: user.facility.corporation?.name ?? "",
    facilityName: user.facility.name,
    generatedAt: new Date().toLocaleDateString("ja-JP"),
    fiscalYear,
    enrollments: user.enrollments.map(e => ({
      courseTitle: e.course.title,
      status: e.status,
      completedAt: e.completedAt ? e.completedAt.toLocaleDateString("ja-JP") : null,
      actionPlan: e.actionPlan,
      // score: e.testScore, // TODO: DBフィールド追加後に反映
      // total: e.testTotal, 
    }))
  };
}
