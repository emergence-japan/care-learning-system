import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const userRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, role: true, corporationId: true, facilityId: true },
    });
  },

  async findByLoginId(loginId: string) {
    return prisma.user.findUnique({ where: { loginId } });
  },

  async findLoginIdConflict(loginId: string, excludeId: string) {
    return prisma.user.findFirst({
      where: { loginId, NOT: { id: excludeId } },
    });
  },

  async findByIdForCorpCheck(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { corporationId: true },
    });
  },

  async findByIdForFacilityCheck(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { facilityId: true },
    });
  },

  async create(data: {
    name: string;
    loginId: string;
    password: string;
    role: string;
    facilityId?: string | null;
    corporationId?: string | null;
  }) {
    return prisma.user.create({ data: data as any });
  },

  async createWithHashedPassword(data: {
    name: string;
    loginId: string;
    password: string;
    role: string;
    facilityId?: string | null;
    corporationId?: string | null;
  }) {
    return prisma.user.create({
      data: {
        ...(data as any),
        password: await bcrypt.hash(data.password, 12),
      },
    });
  },

  async update(id: string, data: Record<string, unknown>) {
    return prisma.user.update({ where: { id }, data });
  },

  async updatePassword(id: string, newPassword: string) {
    return prisma.user.update({
      where: { id },
      data: { password: await bcrypt.hash(newPassword, 12) },
    });
  },

  async deleteWithEnrollments(id: string) {
    await prisma.enrollment.deleteMany({ where: { userId: id } });
    return prisma.user.delete({ where: { id } });
  },

  async deleteManyByFacility(facilityId: string) {
    return prisma.user.deleteMany({ where: { facilityId } });
  },

  async deleteManyByCorporation(corporationId: string) {
    return prisma.user.deleteMany({ where: { corporationId } });
  },
};
