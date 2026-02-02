import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, LogOut, LayoutDashboard, Building, BookOpen, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import Link from "next/link";

export default async function SuperAdminDashboardPage() {
  const session = await auth();

  // 権限チェック
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/");
  }

  // システム全体統計の取得
  const totalCorporations = await prisma.corporation.count();
  const totalFacilities = await prisma.facility.count();
  const totalStaff = await prisma.user.count({ where: { role: "STAFF" } });
  const totalCourses = await prisma.course.count();

  // 全受講実績の集計
  const allEnrollments = await prisma.enrollment.findMany({
    select: { status: true }
  });
  
  const completedCount = allEnrollments.filter(e => e.status === 'COMPLETED').length;
  const totalPossible = totalStaff * totalCourses;
  const overallProgressRate = totalPossible > 0 
    ? Math.round((completedCount / totalPossible) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-zinc-50 pb-12 font-sans text-zinc-900">
      {/* Header */}
      <header className="bg-red-950 text-white sticky top-0 z-10 shadow-xl border-b border-red-900/50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-900 p-2 rounded-lg ring-1 ring-red-800">
              <ShieldAlert className="w-5 h-5 text-red-200" />
            </div>
            <div>
              <h1 className="font-black text-lg leading-tight tracking-tight">システム全体管理</h1>
              <p className="text-[10px] text-red-300 font-bold tracking-widest uppercase opacity-80">Super Admin Console</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-black bg-red-900/50 px-3 py-1 rounded-full border border-red-800 text-red-100 hidden sm:inline">
              SYSTEM ROOT
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <Button variant="ghost" size="sm" className="text-red-200 hover:text-white hover:bg-red-900/50">
                <LogOut className="w-4 h-4 mr-2" />
                ログアウト
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-10 space-y-10">
        {/* Navigation Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/super-admin/courses" className="block h-full">
            <Card className="h-full hover:border-red-300 transition-all cursor-pointer group shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-zinc-500 uppercase tracking-wider">コンテンツ管理</CardTitle>
                <BookOpen className="w-4 h-4 text-zinc-400 group-hover:text-red-600 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">研修コース</div>
                <p className="text-xs text-zinc-400 mt-1 font-medium">全 {totalCourses} 項目の管理</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/super-admin/organizations" className="block h-full">
            <Card className="h-full hover:border-red-300 transition-all cursor-pointer group shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-zinc-500 uppercase tracking-wider">組織管理</CardTitle>
                <Building className="w-4 h-4 text-zinc-400 group-hover:text-red-600 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">法人・施設</div>
                <p className="text-xs text-zinc-400 mt-1 font-medium">{totalCorporations} 法人 / {totalFacilities} 施設の管理</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:border-red-300 transition-all group shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-zinc-500 uppercase tracking-wider">全体進捗</CardTitle>
              <Activity className="w-4 h-4 text-zinc-400 group-hover:text-red-600 transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">{overallProgressRate}%</div>
              <p className="text-xs text-zinc-400 mt-1 font-medium">全スタッフ {totalStaff} 名の平均</p>
            </CardContent>
          </Card>
        </section>

        {/* System Overview Details */}
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
            <h2 className="text-2xl font-black text-zinc-900">システム概況</h2>
            <div className="bg-zinc-100 px-4 py-1 rounded-full text-xs font-bold text-zinc-500 uppercase">Snapshot</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
            <div className="p-8 text-center space-y-1">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Corporations</p>
              <p className="text-4xl font-black text-zinc-900">{totalCorporations}</p>
            </div>
            <div className="p-8 text-center space-y-1">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Facilities</p>
              <p className="text-4xl font-black text-zinc-900">{totalFacilities}</p>
            </div>
            <div className="p-8 text-center space-y-1">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Total Users</p>
              <p className="text-4xl font-black text-zinc-900">{totalStaff}</p>
            </div>
            <div className="p-8 text-center space-y-1">
              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Enrollments</p>
              <p className="text-4xl font-black text-zinc-900">{allEnrollments.length}</p>
            </div>
          </div>
        </div>

        {/* Quick Help */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 space-y-2">
            <h4 className="font-bold text-red-900 text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" /> 運用メモ
            </h4>
            <p className="text-xs text-red-700 leading-relaxed">
              新しい法人と契約した際は、「組織管理」から法人を登録し、続けて施設を登録してください。
              各施設の管理画面からスタッフ登録を行うよう、各施設長に案内してください。
            </p>
          </div>
          <div className="bg-zinc-900 text-white rounded-2xl p-6 space-y-2 shadow-inner">
            <h4 className="font-bold text-zinc-100 text-sm">システム状況</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              データベース: SQLite (Vercel移行時にPostgreSQLへ変更予定)<br />
              認証基盤: Auth.js (NextAuth v5)<br />
              最終デプロイ: 2026-02-02
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}