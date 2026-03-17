import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { StaffTrainingPlan } from "@/components/staff-training-plan";
import { ConfettiTrigger } from "@/components/confetti-trigger";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { ProgressHero } from "@/components/dashboard/progress-hero";
import { CourseList } from "@/components/dashboard/course-list";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true, facilityId: true, role: true, name: true,
      facility: { select: { name: true } },
      corporation: { select: { name: true, fiscalYearStartMonth: true } },
    },
  });

  if (user?.role === "ADMIN") redirect("/admin");
  if (user?.role === "HQ") redirect("/hq");
  if (user?.role === "SUPER_ADMIN") redirect("/super-admin");

  const fiscalYearStartMonth = user?.corporation?.fiscalYearStartMonth || 4;

  if (!user?.facilityId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50/50">
        <Card className="max-w-md w-full p-10 text-center space-y-6 rounded-[2rem] border-none shadow-2xl bg-white/80 backdrop-blur-xl">
          <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto ring-1 ring-amber-100">
            <AlertCircle className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">所属施設が未設定です</h2>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <Button variant="outline" type="submit" className="w-full h-14 rounded-xl border-slate-200">ログアウト</Button>
          </form>
        </Card>
      </div>
    );
  }

  const [assignments, enrollments] = await Promise.all([
    prisma.courseAssignment.findMany({
      where: { facilityId: user.facilityId },
      include: { course: { select: { id: true, title: true, description: true, badgeLabel: true, badgeIcon: true } } },
      orderBy: { endDate: 'asc' },
    }),
    prisma.enrollment.findMany({ where: { userId: user.id } }),
  ]);

  const today = new Date();

  // 同一コースが複数ある場合、第N回ラベルを付与
  const courseCounts: Record<string, number> = {};
  const courseSessionIndex: Record<string, number> = {};
  assignments.forEach(a => {
    courseCounts[a.courseId] = (courseCounts[a.courseId] || 0) + 1;
  });

  const learningPlan = assignments.map(assignment => {
    const isMultiSession = courseCounts[assignment.courseId] > 1;
    courseSessionIndex[assignment.courseId] = (courseSessionIndex[assignment.courseId] || 0) + 1;
    const sessionNumber = courseSessionIndex[assignment.courseId];

    const enrollment = enrollments.find(e => e.assignmentId === assignment.id);
    const diffDays = Math.ceil((assignment.endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const title = assignment.course.title;
    const keywordMatch = (k: string) => title.includes(k);

    let label = "";
    let iconName = "";
    if (keywordMatch("虐待")) { label = "虐待防止"; iconName = "Shield"; }
    else if (keywordMatch("認知症")) { label = "認知症"; iconName = "Brain"; }
    else if (keywordMatch("感染症")) { label = "感染症"; iconName = "Microscope"; }
    else if (keywordMatch("事故")) { label = "事故防止"; iconName = "AlertTriangle"; }
    else if (keywordMatch("緊急")) { label = "緊急対応"; iconName = "HeartPulse"; }
    else if (keywordMatch("プライバシー")) { label = "個人情報"; iconName = "Lock"; }
    else if (keywordMatch("倫理")) { label = "倫理遵守"; iconName = "Scale"; }
    else if (keywordMatch("接遇")) { label = "接遇マナー"; iconName = "UserCheck"; }
    else if (keywordMatch("災害")) { label = "災害対策"; iconName = "Flame"; }
    else if (keywordMatch("介護予防")) { label = "介護予防"; iconName = "Footprints"; }
    else if (keywordMatch("医療")) { label = "医療連携"; iconName = "Stethoscope"; }
    else if (keywordMatch("看取り")) { label = "看取り"; iconName = "Heart"; }
    else if (keywordMatch("精神的")) { label = "精神ケア"; iconName = "Smile"; }
    else { label = assignment.course.badgeLabel || title.substring(0, 4); iconName = "BookOpen"; }

    const isCompleted = enrollment?.status === "COMPLETED";
    const isUpcoming = !isCompleted && assignment.startDate.getTime() > today.getTime();

    return {
      assignmentId: assignment.id,
      courseId: assignment.courseId,
      title,
      description: assignment.course.description,
      badgeLabel: label,
      badgeIcon: iconName,
      sessionLabel: isMultiSession ? `第${sessionNumber}回` : null,
      status: enrollment?.status || "NOT_STARTED",
      startDate: assignment.startDate,
      endDate: assignment.endDate,
      daysLeft: diffDays,
      isOverdue: diffDays < 0,
      isUpcoming,
      completedAt: enrollment?.completedAt ? enrollment.completedAt.toISOString() : null,
    };
  }).sort((a, b) => {
    if (a.status === "COMPLETED" && b.status !== "COMPLETED") return 1;
    if (a.status !== "COMPLETED" && b.status === "COMPLETED") return -1;
    return a.endDate.getTime() - b.endDate.getTime();
  });

  const totalCourses = learningPlan.length;
  const completedCourses = learningPlan.filter(c => c.status === "COMPLETED").length;
  const progressPercentage = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12 font-sans antialiased">
      <ConfettiTrigger isVisible={progressPercentage === 100} />
      <DashboardHeader
        corporationName={user.corporation?.name}
        facilityName={user.facility?.name}
        userName={user.name ?? undefined}
      />
      <main className="max-w-2xl mx-auto px-6 py-8 space-y-10">
        <ProgressHero
          progressPercentage={progressPercentage}
          completedCourses={completedCourses}
          totalCourses={totalCourses}
        />
        <StaffTrainingPlan assignments={learningPlan} startMonth={fiscalYearStartMonth} />
        <CourseList
          learningPlan={learningPlan}
          staffName={user.name ?? ""}
          corporationName={user.corporation?.name ?? ""}
          facilityName={user.facility?.name ?? ""}
        />
      </main>
    </div>
  );
}
