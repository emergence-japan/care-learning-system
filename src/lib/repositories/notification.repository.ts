import prisma from "@/lib/prisma";
import type { Severity, Role } from "@/types";

export const notificationRepository = {
  async create(data: {
    title: string;
    content: string;
    severity: Severity;
    targetRole: Role | null;
    targetCorporationId: string | null;
    targetFacilityId: string | null;
    expiresAt: Date | null;
    authorId: string;
  }) {
    return prisma.notification.create({ data });
  },

  async delete(id: string) {
    return prisma.notification.delete({ where: { id } });
  },
};
