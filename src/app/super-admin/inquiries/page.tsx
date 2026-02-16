import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, User, Building2, MessageCircle, ChevronRight, Inbox, ArrowLeft, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NotificationForm } from "./notification-form";

export default async function SuperAdminInquiriesPage() {
  const session = await auth();
  if (session?.user?.role !== "SUPER_ADMIN") return null;

  const inquiries = await prisma.inquiry.findMany({
    include: {
      sender: {
        include: {
          corporation: true,
          facility: true
        }
      },
      replies: true
    },
    orderBy: { createdAt: "desc" }
  });

  const corporations = await prisma.corporation.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  });

  const facilities = await prisma.facility.findMany({
    select: { id: true, name: true, corporationId: true },
    orderBy: { name: 'asc' }
  });

  const unreadCount = inquiries.filter(i => i.status === "UNREAD").length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/super-admin">
              <div className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer group">
                <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
              </div>
            </Link>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                サポートチケット
                <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                  <span className={`text-[11px] font-black ${unreadCount > 0 ? 'text-red-600' : 'text-slate-500'}`}>
                    {unreadCount}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">/</span>
                  <span className="text-[10px] text-slate-500 font-bold">
                    {inquiries.length}
                  </span>
                </div>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NotificationForm corporations={corporations} facilities={facilities} />
            <Button variant="outline" className="border-slate-200 text-slate-600 font-bold text-xs px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
              CSVエクスポート
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Modern Table Layout */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-50/50 border-b border-slate-200 py-4 px-6">
            <div className="col-span-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">送信元・法人名</div>
            <div className="col-span-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">件名・内容</div>
            <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ステータス</div>
            <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right px-4">送信日時</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100">
            {inquiries.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-slate-400 font-bold">現在、チケットはありません。</p>
              </div>
            ) : (
              inquiries.map((inquiry) => (
                <Link key={inquiry.id} href={`/super-admin/inquiries/${inquiry.id}`} className="block">
                  <div className="grid grid-cols-12 items-center py-5 px-6 hover:bg-slate-50 transition-all group cursor-pointer">
                    {/* Corporation / Sender */}
                    <div className="col-span-3 pr-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                          {inquiry.sender.corporation?.name || "Independent"}
                        </span>
                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mt-0.5">
                          <User className="w-3 h-3 text-slate-300" />
                          {inquiry.sender.name}
                        </span>
                      </div>
                    </div>

                    {/* Subject / Content preview */}
                    <div className="col-span-5 pr-8">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-800 truncate">
                            {inquiry.subject}
                          </span>
                          {inquiry.status === 'UNREAD' && (
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5 font-medium leading-relaxed">
                          {inquiry.content}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <StatusBadge status={inquiry.status} />
                    </div>

                    {/* Date & Action */}
                    <div className="col-span-2 flex items-center justify-end gap-4">
                      <div className="text-right">
                        <p className="text-[11px] font-bold text-slate-900 tabular-nums">
                          {inquiry.createdAt.toLocaleDateString()}
                        </p>
                        <p className="text-[10px] font-medium text-slate-400 tabular-nums mt-0.5">
                          {inquiry.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-slate-900 group-hover:text-white transition-all duration-200">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "UNREAD":
      return (
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">New Ticket</span>
        </div>
      );
    case "READ":
      return (
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Processing</span>
        </div>
      );
    case "REPLIED":
      return (
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Replied</span>
        </div>
      );
    case "CLOSED":
      return (
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Closed</span>
        </div>
      );
    default:
      return null;
  }
}
