import prisma from "@/lib/prisma";
import type { EnrollmentStatus } from "@/types";

export const enrollmentRepository = {
  async update(
    userId: string,
    courseId: string,
    data: {
      status?: EnrollmentStatus;
      completedAt?: Date | null;
      actionPlan?: string | null;
    },
  ) {
    return prisma.enrollment.update({
      where: { userId_courseId: { userId, courseId } },
      data,
    });
  },

  async createManyForUser(userId: string, courseIds: string[]) {
    return prisma.enrollment.createMany({
      data: courseIds.map((courseId) => ({
        userId,
        courseId,
        status: "NOT_STARTED",
      })),
    });
  },

  async createForCourse(userId: string, courseId: string) {
    return prisma.enrollment.create({
      data: { userId, courseId, status: "NOT_STARTED" },
    });
  },

  async upsertForStaff(userId: string, courseId: string) {
    return prisma.enrollment.upsert({
      where: { userId_courseId: { userId, courseId } },
      create: { userId, courseId, status: "NOT_STARTED" },
      update: {},
    });
  },
};
