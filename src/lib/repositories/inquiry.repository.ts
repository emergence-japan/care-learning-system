import prisma from "@/lib/prisma";
import type { InquiryStatus } from "@/types";

export const inquiryRepository = {
  async create(data: { subject: string; content: string; senderId: string }) {
    return prisma.inquiry.create({
      data: { ...data, status: "UNREAD" },
    });
  },

  async updateStatus(id: string, status: InquiryStatus) {
    return prisma.inquiry.update({ where: { id }, data: { status } });
  },

  async createReply(data: { inquiryId: string; content: string; senderId: string }) {
    return prisma.inquiryReply.create({ data });
  },
};
