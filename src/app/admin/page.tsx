import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { GraduationCap, LogOut } from "lucide-react";

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

  // データの取得だけ行う（画面には出さない）
  const [staff, assignments] = await Promise.all([
    prisma.user.findMany({ where: { facilityId: facilityId || "", role: "STAFF" } }),
    prisma.courseAssignment.findMany({ where: { facilityId: facilityId || "" } })
  ]);

  return (
    <div className="p-12 space-y-8 bg-white min-h-screen">
      <div className="flex items-center gap-4">
        <GraduationCap className="w-10 h-10" />
        <h1 className="text-3xl font-black text-slate-900">ステップ2：データ取得テスト</h1>
      </div>
      
      <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
        <p className="font-bold text-emerald-800">データ取得に成功しました！</p>
        <ul className="mt-4 space-y-2 text-sm text-emerald-700 font-bold">
          <li>・所属施設: {facility.name}</li>
          <li>・登録スタッフ数: {staff.length} 名</li>
          <li>・研修割当数: {assignments.length} 件</li>
        </ul>
      </div>

      <div className="p-8 border-2 border-dashed rounded-2xl text-slate-400">
        ここまでは正常に動いています。<br/>
        この画面が表示されたら、次は「見た目」のパーツを一つずつ戻していきます。
      </div>

      <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
        <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold flex items-center gap-2">
          <LogOut className="w-5 h-5" />
          <span>ログアウト</span>
        </button>
      </form>
    </div>
  );
}
