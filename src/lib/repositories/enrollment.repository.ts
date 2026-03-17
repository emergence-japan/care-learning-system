import prisma from "@/lib/prisma";
import type { EnrollmentStatus } from "@/types";

export const enrollmentRepository = {
  async update(
    userId: string,
    assignmentId: string,
    data: {
      status?: EnrollmentStatus;
      completedAt?: Date | null;
      actionPlan?: string | null;
    },
  ) {
    return prisma.enrollment.update({
      where: { userId_assignmentId: { userId, assignmentId } },
      data,
    });
  },

  async upsertForAssignment(userId: string, courseId: string, assignmentId: string) {
    return prisma.enrollment.upsert({
      where: { userId_assignmentId: { userId, assignmentId } },
      create: { userId, courseId, assignmentId, status: "NOT_STARTED" },
      update: {},
    });
  },
};
