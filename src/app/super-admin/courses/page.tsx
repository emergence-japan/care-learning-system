import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Plus, Edit, Trash2, ChevronLeft, BookOpen, Video, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createCourse, deleteCourse } from "@/lib/actions";
import Link from "next/link";

export default async function CourseManagementPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/");
  }

  const courses = await prisma.course.findMany({
    include: {
      _count: {
        select: { questions: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-zinc-50 pb-12 font-sans text-zinc-900">
      {/* Header */}
      <header className="bg-red-950 text-white sticky top-0 z-10 shadow-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/super-admin">
              <Button variant="ghost" size="icon" className="text-red-200">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-bold text-lg">研修コース管理</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* New Course Form */}
          <div className="lg:col-span-1">
            <Card className="border-zinc-200 shadow-sm rounded-2xl sticky top-24">
              <CardHeader className="bg-zinc-50/50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="w-5 h-5 text-red-600" />
                  新規コース作成
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form action={createCourse} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">研修タイトル</Label>
                    <Input id="title" name="title" placeholder="例: 感染症対策研修" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">説明文</Label>
                    <textarea 
                      id="description" 
                      name="description" 
                      rows={3}
                      className="flex min-h-[80px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950"
                      placeholder="研修の概要を入力してください"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">YouTube URL</Label>
                    <Input id="videoUrl" name="videoUrl" placeholder="https://www.youtube.com/watch?v=..." />
                  </div>
                  <Button type="submit" className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 font-bold">
                    作成する
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Courses List */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-xl text-zinc-900 px-1">登録済みコース ({courses.length})</h3>
            <div className="grid grid-cols-1 gap-4">
              {courses.map((course) => (
                <Card key={course.id} className="border-zinc-200 shadow-sm rounded-2xl overflow-hidden hover:border-zinc-300 transition-colors">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="flex-1 p-6 space-y-4">
                        <div>
                          <h4 className="font-bold text-xl text-zinc-900">{course.title}</h4>
                          <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{course.description}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
                          <div className="flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            {course.videoUrl ? "動画あり" : "動画なし"}
                          </div>
                          <div className="flex items-center gap-1">
                            <HelpCircle className="w-3 h-3" />
                            クイズ {course._count.questions} 問
                          </div>
                        </div>
                      </div>
                      <div className="bg-zinc-50 p-4 sm:w-32 flex sm:flex-col gap-2 justify-center border-t sm:border-t-0 sm:border-l border-zinc-100">
                        <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                          <Edit className="w-4 h-4 mr-1" />
                          編集
                        </Button>
                        <form action={async () => {
                          "use server";
                          await deleteCourse(course.id);
                        }} className="flex-1">
                          <Button variant="ghost" size="sm" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg">
                            <Trash2 className="w-4 h-4 mr-1" />
                            削除
                          </Button>
                        </form>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {courses.length === 0 && (
                <div className="text-center py-20 bg-white border border-dashed border-zinc-300 rounded-2xl text-zinc-400">
                  まだコースが登録されていません。
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
