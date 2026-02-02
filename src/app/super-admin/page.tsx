import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, LogOut, LayoutDashboard, Building, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import Link from "next/link";

export default async function SuperAdminDashboardPage() {
  const session = await auth();

  // 権限チェック
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/");
  }

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
                <CardTitle className="text-sm font-bold text-zinc-500 uppercase">コンテンツ管理</CardTitle>
                <BookOpen className="w-4 h-4 text-zinc-400 group-hover:text-red-600 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">研修コース</div>
                <p className="text-xs text-zinc-400 mt-1">動画・クイズの新規作成と編集</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/super-admin/organizations" className="block h-full">
            <Card className="h-full hover:border-red-300 transition-all cursor-pointer group shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-zinc-500 uppercase">組織管理</CardTitle>
                <Building className="w-4 h-4 text-zinc-400 group-hover:text-red-600 transition-colors" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black">法人・施設</div>
                <p className="text-xs text-zinc-400 mt-1">契約組織の登録と管理</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:border-red-300 transition-all cursor-pointer group shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold text-zinc-500 uppercase">全体統計</CardTitle>
              <LayoutDashboard className="w-4 h-4 text-zinc-400 group-hover:text-red-600 transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black">システム状況</div>
              <p className="text-xs text-zinc-400 mt-1">全法人の受講実績サマリー</p>
            </CardContent>
          </Card>
        </section>

        {/* Welcome Message */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-black text-zinc-900">管理者コンソールへようこそ</h2>
          <p className="text-zinc-500 max-w-lg mx-auto leading-relaxed">
            ここからシステム全体の管理を行います。上のメニューから操作を選択してください。
            現在はプロトタイプ段階のため、主要な機能を順次実装中です。
          </p>
        </div>
      </main>
    </div>
  );
}
