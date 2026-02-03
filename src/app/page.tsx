import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // 管理者の場合は管理者ダッシュボードへ
  if ((session.user as any).role === "ADMIN") {
    redirect("/admin");
  }

  if ((session.user as any).role === "HQ") {
    redirect("/hq");
  }

  if ((session.user as any).role === "SUPER_ADMIN") {
    redirect("/super-admin");
  }

  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      course: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return { label: '受講済', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-4 h-4 mr-1" /> };
      case 'IN_PROGRESS':
        return { label: '受講中', color: 'bg-blue-100 text-blue-800', icon: <Clock className="w-4 h-4 mr-1" /> };
      default:
        return { label: '未受講', color: 'bg-zinc-100 text-zinc-800', icon: <BookOpen className="w-4 h-4 mr-1" /> };
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-bold text-xl text-zinc-900">ケア・ラーニング</h1>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button variant="ghost" size="icon" type="submit">
              <LogOut className="w-5 h-5 text-zinc-500" />
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <section>
          <h2 className="text-zinc-500 text-sm font-medium mb-2 px-1">こんにちは、{session.user.name}さん</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100">
            <p className="text-zinc-900 font-semibold text-lg">今日も一日、お疲れ様です！</p>
            <p className="text-zinc-500 text-sm mt-1">あなたの受講状況を確認しましょう。</p>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="font-bold text-lg text-zinc-900">研修一覧</h3>
            <span className="text-sm text-zinc-500">{enrollments.length} 件</span>
          </div>

          <div className="space-y-4">
            {enrollments.length > 0 ? (
              enrollments.map((enrollment) => {
                const statusInfo = getStatusLabel(enrollment.status);
                return (
                  <Card key={enrollment.id} className="overflow-hidden border-zinc-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
                    <CardHeader className="p-4 pb-2">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold w-fit ${statusInfo.color}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </div>
                      <CardTitle className="text-lg mt-2 leading-tight">
                        {enrollment.course.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                        {enrollment.course.description || "この研修の説明はありません。"}
                      </p>
                      <Link href={`/courses/${enrollment.courseId}`}>
                        <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 font-bold text-base">
                          {enrollment.status === 'COMPLETED' ? 'もう一度見る' : '受講を開始する'}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-zinc-300">
                <p className="text-zinc-500">割り当てられた研修はありません。</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}