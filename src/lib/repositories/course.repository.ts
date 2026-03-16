import prisma from "@/lib/prisma";

export const courseRepository = {
  async findByIdWithQuestions(id: string) {
    return prisma.course.findUnique({
      where: { id },
      include: {
        questions: {
          include: { choices: true },
        },
      },
    });
  },

  async findAllIds() {
    return prisma.course.findMany({ select: { id: true } });
  },

  async create(data: {
    slug: string;
    title: string;
    description?: string | null;
    videoUrl?: string | null;
  }) {
    return prisma.course.create({ data });
  },

  async update(
    id: string,
    data: { title?: string; description?: string | null; videoUrl?: string | null },
  ) {
    return prisma.course.update({ where: { id }, data });
  },

  async deleteWithRelations(id: string) {
    await prisma.choice.deleteMany({ where: { question: { courseId: id } } });
    await prisma.question.deleteMany({ where: { courseId: id } });
    await prisma.slide.deleteMany({ where: { courseId: id } });
    await prisma.enrollment.deleteMany({ where: { courseId: id } });
    await prisma.courseAssignment.deleteMany({ where: { courseId: id } });
    return prisma.course.delete({ where: { id } });
  },

  async createAssignment(
    facilityId: string,
    courseId: string,
    startDate: Date,
    endDate: Date,
  ) {
    return prisma.courseAssignment.create({
      data: { facilityId, courseId, startDate, endDate },
    });
  },

  async updateAssignment(id: string, facilityId: string, startDate: Date, endDate: Date) {
    return prisma.courseAssignment.update({
      where: { id, facilityId },
      data: { startDate, endDate },
    });
  },

  async deleteAssignment(id: string, facilityId: string) {
    return prisma.courseAssignment.deleteMany({ where: { id, facilityId } });
  },
};
