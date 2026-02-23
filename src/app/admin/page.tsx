import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { LogOut, GraduationCap } from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const facilityId = session.user.facilityId;
  if (!facilityId) return <div className="p-20">施設IDがありません</div>;

  const facility = await prisma.facility.findUnique({ 
    where: { id: facilityId }
  });

  return (
    <div className="p-12 space-y-8 bg-white min-h-screen">
      <div className="flex items-center gap-4">
        <GraduationCap className="w-10 h-10" />
        <h1 className="text-3xl font-black">デバッグ表示モード</h1>
      </div>
      
      <div className="bg-slate-50 p-8 rounded-2xl border">
        <p className="text-xl font-bold">ユーザー: {session.user.name}</p>
        <p className="text-slate-500">施設: {facility?.name || "不明"}</p>
        <p className="text-slate-500 font-mono text-xs">Facility ID: {facilityId}</p>
      </div>

      <div className="p-8 border-2 border-dashed rounded-2xl text-center text-slate-400">
        現在、原因特定のため機能を一時停止しています。<br/>
        この画面が表示されたら教えてください。
      </div>

      <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
        <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold flex items-center gap-2">
          <LogOut className="w-5 h-5" />
          <span>一度ログアウトして確認</span>
        </button>
      </form>
    </div>
  );
}
