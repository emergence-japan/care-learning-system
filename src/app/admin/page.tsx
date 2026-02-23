import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { 
  Users, LogOut, 
  Briefcase, GraduationCap, 
  CalendarDays, MessageSquare, ClipboardList
} from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { SystemNotification } from "@/components/system-notification";
import { AdminClient } from "./admin-client";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const facilityId = session.user.facilityId;
  const facility = await prisma.facility.findUnique({ 
    where: { id: facilityId || "" },
    include: { corporation: true }
  });

  if (!facility) return <div className="p-20">施設が見つかりません</div>;

  const [rawStaff, rawAssignments] = await Promise.all([
    prisma.user.findMany({
      where: { facilityId: facilityId || "", role: "STAFF" },
      include: { enrollments: { include: { course: true } } },
      orderBy: { name: 'asc' }
    }),
    prisma.courseAssignment.findMany({
      where: { facilityId: facilityId || "" },
      include: { course: true },
      orderBy: { endDate: 'asc' }
    })
  ]);

  // 日付データの文字列化（Next.jsシリアライズ対策）
  const assignments = (rawAssignments || []).map(a => ({
    ...a,
    endDate: a.endDate.toISOString(),
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));

  const staffMembers = (rawStaff || []).map(s => ({
    ...s,
    enrollments: (s.enrollments || []).map(e => ({
      ...e,
      completedAt: e.completedAt ? e.completedAt.toISOString() : null,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
    }))
  }));

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="h-20 lg:h-24 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4 lg:gap-12">
          <MobileNav />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-900 rounded flex items-center justify-center shadow-lg">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="font-black text-xl lg:text-2xl tracking-tighter text-slate-900 uppercase">CARE LEARNING</span>
          </div>
          <div className="hidden lg:flex items-center gap-3 border-l border-slate-100 pl-6 text-slate-400">
            <p className="text-[10px] font-bold mt-1 uppercase tracking-wider">{facility.name}</p>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 space-y-2 shrink-0">
          <div className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-slate-900 text-white shadow-xl">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-[13px] font-bold">スタッフ管理</span>
          </div>
          <div className="mt-auto pt-6 border-t border-slate-50">
             <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-600 transition-all w-full text-left font-bold text-sm">
                <LogOut className="w-5 h-5" />
                <span>ログアウト</span>
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12">
          <SystemNotification />
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-700 text-xs font-bold">
              現在、ステップ3：レイアウトとスタッフ管理のテスト中
            </div>
            
            <AdminClient 
              staffMembers={staffMembers as any}
              currentAssignments={assignments as any}
              maxStaff={facility.maxStaff ?? 20}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
