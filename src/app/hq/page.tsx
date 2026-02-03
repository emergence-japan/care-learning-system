import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, TrendingUp, LogOut, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import Link from "next/link";

export default async function HQDashboardPage() {
  const session = await auth();

  // 権限チェック
  if (!session?.user || (session.user as any).role !== "HQ") {
    redirect("/");
  }

  const corporationId = (session.user as any).corporationId;
  if (!corporationId) {
    return <div className="p-8 text-center">所属法人が設定されていません。システム管理者に連絡してください。</div>;
  }

  // 法人情報と施設一覧（スタッフと受講実績を含む）を取得
  const corporation = await prisma.corporation.findUnique({
    where: { id: corporationId },
    include: {
      facilities: {
        include: {
          users: {
            where: { role: "STAFF" },
            include: {
              enrollments: true,
            },
          },
        },
      },
    },
  });

  // 全研修数の取得
  const totalCoursesCount = await prisma.course.count();

  // 施設ごとの統計データ作成
  const facilityStats = corporation?.facilities.map(facility => {
    const totalStaff = facility.users.length;
    const completedEnrollments = facility.users.reduce((acc, user) => {
      return acc + user.enrollments.filter(e => e.status === 'COMPLETED').length;
    }, 0);
    const totalAssignments = totalStaff * totalCoursesCount;
    const progressRate = totalAssignments > 0 
      ? Math.round((completedEnrollments / totalAssignments) * 100) 
      : 0;

    return {
      id: facility.id,
      name: facility.name,
      staffCount: totalStaff,
      progressRate,
    };
  }) || [];

  // 法人全体統計
  const totalFacilities = facilityStats.length;
  const avgProgressRate = totalFacilities > 0 
    ? Math.round(facilityStats.reduce((acc, f) => acc + f.progressRate, 0) / totalFacilities) 
    : 0;

  return (
    <div className="min-h-screen bg-zinc-50 pb-12 font-sans">
      {/* Header */}
      <header className="bg-zinc-900 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-800 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">法人本部ダッシュボード</h1>
              <p className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase">Corporate Headquarters</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-zinc-300 hidden sm:inline">{corporation?.name}</span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                <LogOut className="w-4 h-4 mr-2" />
                ログアウト
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-8">
        {/* HQ Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-zinc-100 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-tight">管理施設数</p>
                <div className="text-3xl font-black text-zinc-900">{totalFacilities} <span className="text-sm font-normal text-zinc-400">施設</span></div>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white border-zinc-100 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-tight">法人全体進捗率</p>
                <div className="text-3xl font-black text-zinc-900">{avgProgressRate}%</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-2xl text-right">
                <TrendingUp className="w-8 h-8 text-orange-600 ml-auto" />
                <div className="mt-2 w-24 bg-orange-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-orange-600 h-full" style={{ width: `${avgProgressRate}%` }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Facility Cards List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-black text-xl text-zinc-900 flex items-center gap-2">
              運営施設一覧
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facilityStats.map((facility) => (
              <Card key={facility.id} className="group hover:border-zinc-300 transition-all duration-300 rounded-2xl shadow-sm border-zinc-100 overflow-hidden bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                      <h4 className="font-bold text-xl text-zinc-900 group-hover:text-blue-600 transition-colors">{facility.name}</h4>
                      <p className="text-sm text-zinc-500 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        スタッフ {facility.staffCount} 名
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-zinc-900">{facility.progressRate}%</div>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase">Progress</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-zinc-900 h-full transition-all duration-1000 group-hover:bg-blue-600" 
                        style={{ width: `${facility.progressRate}%` }}
                      ></div>
                    </div>
                    
                    <Button variant="outline" className="w-full justify-between rounded-xl group-hover:bg-zinc-900 group-hover:text-white transition-all border-zinc-200">
                      詳細データを見る
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
