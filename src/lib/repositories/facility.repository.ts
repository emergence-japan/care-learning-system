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
          // 退職者(deletedAt!=null)は maxStaff 枠から除外する
          select: { users: { where: { role: "STAFF", deletedAt: null } } },
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

  async update(id: string, data: { name?: string; type?: string | null; maxStaff?: number; isActive?: boolean }) {
    return prisma.facility.update({ where: { id }, data });
  },

  async deleteWithUsers(id: string) {
    // Inquiry.senderId / CourseAssignment.facilityId are required FKs (ON DELETE RESTRICT),
    // so all dependent rows must be removed before users / the facility.
    return prisma.$transaction([
      prisma.enrollment.deleteMany({ where: { user: { facilityId: id } } }),
      prisma.inquiryReply.deleteMany({ where: { inquiry: { sender: { facilityId: id } } } }),
      prisma.inquiry.deleteMany({ where: { sender: { facilityId: id } } }),
      prisma.courseAssignment.deleteMany({ where: { facilityId: id } }),
      prisma.user.deleteMany({ where: { facilityId: id } }),
      prisma.facility.delete({ where: { id } }),
    ]);
  },

  async deleteManyByCorporation(corporationId: string) {
    return prisma.facility.deleteMany({ where: { corporationId } });
  },
};
