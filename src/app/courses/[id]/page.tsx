import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  // 本来は enrollment を通じて取得すべきだが、まずは course を直接取得してテストを通す
  // 後で Prisma の include 等を調整する
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: id,
      },
    },
    include: {
      course: true,
    },
  });

  if (!enrollment) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-12">
      <header className="bg-white border-b sticky top-0 z-10 h-16 flex items-center px-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </Link>
        <h1 className="font-bold text-lg ml-2 truncate">研修詳細</h1>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6">
        <h2 className="text-2xl font-bold text-zinc-900 leading-tight">
          {enrollment.course.title}
        </h2>
        
        <div className="mt-6 aspect-video bg-zinc-100 rounded-2xl flex items-center justify-center border border-zinc-200">
          <p className="text-zinc-500 font-medium">動画プレイヤーがここに表示されます</p>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="font-bold text-lg text-zinc-900">研修の内容</h3>
          <p className="text-zinc-600 leading-relaxed">
            {enrollment.course.description || "説明はありません。"}
          </p>
        </div>

        <div className="mt-12">
          <Button className="w-full h-14 text-xl font-bold bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl">
            受講を完了する
          </Button>
        </div>
      </main>
    </div>
  );
}
