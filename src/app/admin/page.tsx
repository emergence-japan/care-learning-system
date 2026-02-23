import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { 
  Users, LogOut, 
  GraduationCap, 
  CalendarDays, MessageSquare, ClipboardList
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const facilityId = session.user.facilityId;
  const facility = await prisma.facility.findUnique({ 
    where: { id: facilityId || "" }
  });

  if (!facility) return <div className="p-20">施設が見つかりません</div>;

  return (
    <div className="h-screen bg-slate-50 flex flex-col font-sans overflow-hidden">
      {/* Header (Minimal - No MobileNav yet) */}
      <header className="h-20 lg:h-24 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between shrink-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-slate-900 rounded flex items-center justify-center shadow-lg">
              <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <span className="font-black text-xl lg:text-2xl tracking-tighter text-slate-900">DEBUG MODE</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col p-6 space-y-2 shrink-0">
          <div className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-slate-900 text-white shadow-xl">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-[13px] font-bold">外枠テスト中</span>
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
          <div className="max-w-6xl mx-auto">
            <div className="bg-emerald-50 p-12 rounded-[2rem] border border-emerald-100 text-center">
              <h2 className="text-2xl font-black text-emerald-800">ステップ4：外枠は正常です！</h2>
              <p className="mt-4 text-emerald-600 font-bold">
                この画面が見えているなら、原因は「AdminClient」「MobileNav」「SystemNotification」のいずれかにあります。
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
