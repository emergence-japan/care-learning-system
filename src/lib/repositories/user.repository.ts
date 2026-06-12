import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { Role } from "@prisma/client";

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

  // 物理削除前の保持期間チェック用。deletedAt（退職日時）を取得する。
  async findByIdForRetentionCheck(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { deletedAt: true },
    });
  },

  // 保持期間（cutoff より前に退職した）を経過した退職者を施設/法人スコープで取得。
  // scope が空なら全件（SUPER_ADMIN 用）。
  async findPurgeable(cutoff: Date, scope: { facilityId?: string; corporationId?: string }) {
    return prisma.user.findMany({
      where: {
        deletedAt: { not: null, lt: cutoff },
        ...(scope.facilityId ? { facilityId: scope.facilityId } : {}),
        ...(scope.corporationId ? { corporationId: scope.corporationId } : {}),
      },
      select: { id: true, name: true, loginId: true, deletedAt: true },
      orderBy: { deletedAt: "asc" },
    });
  },

  async create(data: {
    name: string;
    loginId: string;
    password: string;
    role: Role;
    facilityId?: string | null;
    corporationId?: string | null;
  }) {
    return prisma.user.create({ data });
  },

  async createWithHashedPassword(data: {
    name: string;
    loginId: string;
    password: string;
    role: Role;
    facilityId?: string | null;
    corporationId?: string | null;
  }) {
    return prisma.user.create({
      data: {
        ...data,
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

  // 退職処理（論理削除）: deletedAt をセットするだけ。受講記録(Enrollment)・
  // 問い合わせ等は監査のため保持する。
  async retire(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  // 完全削除（物理削除）。退職後の保持期間が経過したスタッフを消す用途で使用予定。
  async deleteWithEnrollments(id: string) {
    // Inquiry.senderId is a required FK (ON DELETE RESTRICT), so the user's
    // inquiries (and their replies) must be removed before the user.
    return prisma.$transaction([
      prisma.enrollment.deleteMany({ where: { userId: id } }),
      prisma.inquiryReply.deleteMany({ where: { inquiry: { senderId: id } } }),
      prisma.inquiry.deleteMany({ where: { senderId: id } }),
      prisma.user.delete({ where: { id } }),
    ]);
  },

  async deleteManyByFacility(facilityId: string) {
    return prisma.user.deleteMany({ where: { facilityId } });
  },

  async deleteManyByCorporation(corporationId: string) {
    return prisma.user.deleteMany({ where: { corporationId } });
  },
};
