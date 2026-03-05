import prisma from "@/lib/prisma";

export const corporationRepository = {
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
    await prisma.enrollment.deleteMany({ where: { user: { corporationId: id } } });
    await prisma.user.deleteMany({ where: { corporationId: id } });
    await prisma.facility.deleteMany({ where: { corporationId: id } });
    return prisma.corporation.delete({ where: { id } });
  },
};
