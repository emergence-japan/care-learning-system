import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookCheck, TrendingUp, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

export default async function AdminDashboardPage() {
  const session = await auth();

  // 権限チェック
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const facilityId = (session.user as any).facilityId;
  if (!facilityId) {
    return <div className="p-8 text-center">所属施設が設定されていません。システム管理者に連絡してください。</div>;
  }

  // 施設情報の取得
  const facility = await prisma.facility.findUnique({
    where: { id: facilityId },
  });

  // 所属スタッフと受講実績の取得
  const staffMembers = await prisma.user.findMany({
    where: {
      facilityId: facilityId,
      role: "STAFF",
    },
    include: {
      enrollments: {
        include: {
          course: true,
        },
      },
    },
  });

  // 全研修数の取得（進捗率算出用）
  const totalCoursesCount = await prisma.course.count();
  
  // 統計の算出
  const totalStaff = staffMembers.length;
  const completedEnrollments = staffMembers.reduce((acc, user) => {
    return acc + user.enrollments.filter(e => e.status === 'COMPLETED').length;
  }, 0);
  const totalAssignments = totalStaff * totalCoursesCount;
  const progressRate = totalAssignments > 0 
    ? Math.round((completedEnrollments / totalAssignments) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-zinc-50 pb-12 font-sans">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl text-zinc-900">管理者用ダッシュボード</h1>
            <p className="text-xs text-zinc-500 font-medium">{facility?.name}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button variant="ghost" size="sm" className="text-zinc-500">
              <LogOut className="w-4 h-4 mr-2" />
              ログアウト
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-zinc-100 shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">所属スタッフ</CardTitle>
              <Users className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStaff} 名</div>
            </CardContent>
          </Card>
          <Card className="border-zinc-100 shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">完了済み研修数</CardTitle>
              <BookCheck className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedEnrollments} 件</div>
            </CardContent>
          </Card>
          <Card className="border-zinc-100 shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">施設全体進捗率</CardTitle>
              <TrendingUp className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progressRate}%</div>
              <div className="mt-2 w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-orange-500 h-full transition-all duration-500" 
                  style={{ width: `${progressRate}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Table */}
        <section className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="p-6 border-b border-zinc-100">
            <h3 className="font-bold text-lg text-zinc-900">スタッフ別受講状況</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50">
                  <th className="px-6 py-4 text-sm font-bold text-zinc-500">氏名</th>
                  <th className="px-6 py-4 text-sm font-bold text-zinc-500">進捗状況</th>
                  <th className="px-6 py-4 text-sm font-bold text-zinc-500">最終更新</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {staffMembers.length > 0 ? (
                  staffMembers.map((staff) => (
                    <tr key={staff.id} className="hover:bg-zinc-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-zinc-900">{staff.name}</div>
                        <div className="text-xs text-zinc-400">{staff.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-zinc-700">
                            {staff.enrollments.filter(e => e.status === 'COMPLETED').length} / {totalCoursesCount} 完了
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-500">
                        {staff.updatedAt.toLocaleDateString('ja-JP')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-12 text-center text-zinc-500">
                      スタッフが登録されていません。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
