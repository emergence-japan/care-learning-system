import prisma from "@/lib/prisma";

export const facilityRepository = {
  async findById(id: string) {
    return prisma.facility.findUnique({
      where: { id },
      select: { corporationId: true },
    });
  },

  async findByIdWithStaffCount(id: string) {
    return prisma.facility.findUnique({
      where: { id },
      include: {
        _count: {
          select: { users: { where: { role: "STAFF" } } },
        },
      },
    });
  },

  async findByCorpAndName(corporationId: string, name: string) {
    return prisma.facility.findUnique({
      where: { corporationId_name: { corporationId, name } },
    });
  },

  async create(data: {
    name: string;
    type?: string | null;
    corporationId: string;
    maxStaff: number;
  }) {
    return prisma.facility.create({ data });
  },

  async update(id: string, data: { name?: string; maxStaff?: number; isActive?: boolean }) {
    return prisma.facility.update({ where: { id }, data });
  },

  async deleteWithUsers(id: string) {
    await prisma.enrollment.deleteMany({ where: { user: { facilityId: id } } });
    await prisma.user.deleteMany({ where: { facilityId: id } });
    return prisma.facility.delete({ where: { id } });
  },

  async deleteManyByCorporation(corporationId: string) {
    return prisma.facility.deleteMany({ where: { corporationId } });
  },
};
