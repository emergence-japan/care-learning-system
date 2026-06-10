import prisma from "@/lib/prisma";

export const corporationRepository = {
  async findNameConflict(name: string, excludeId?: string) {
    return prisma.corporation.findFirst({
      where: excludeId ? { name, NOT: { id: excludeId } } : { name },
    });
  },

  async findByIdWithFacilityCount(id: string) {
    return prisma.corporation.findUnique({
      where: { id },
      include: { _count: { select: { facilities: true } } },
    });
  },

  async create(data: { name: string; maxFacilities: number; maxStaff: number }) {
    return prisma.corporation.create({ data });
  },

  async update(
    id: string,
    data: {
      name?: string;
      maxFacilities?: number;
      maxStaff?: number;
      isActive?: boolean;
      fiscalYearStartMonth?: number;
    },
  ) {
    return prisma.corporation.update({ where: { id }, data });
  },

  async deleteWithRelations(id: string) {
    // Users may belong to the corporation directly or via a facility, so match both.
    const userScope = {
      OR: [{ corporationId: id }, { facility: { corporationId: id } }],
    };
    // Inquiry.senderId / CourseAssignment.facilityId are required FKs (ON DELETE RESTRICT),
    // so all dependent rows must be removed before users / facilities.
    return prisma.$transaction([
      prisma.enrollment.deleteMany({ where: { user: userScope } }),
      prisma.inquiryReply.deleteMany({ where: { inquiry: { sender: userScope } } }),
      prisma.inquiry.deleteMany({ where: { sender: userScope } }),
      prisma.courseAssignment.deleteMany({ where: { facility: { corporationId: id } } }),
      prisma.user.deleteMany({ where: userScope }),
      prisma.facility.deleteMany({ where: { corporationId: id } }),
      prisma.corporation.delete({ where: { id } }),
    ]);
  },
};
