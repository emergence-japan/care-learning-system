import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ChevronLeft, BookOpen, Video, HelpCircle, Activity, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/delete-button";
import Link from "next/link";

export default async function CourseManagementPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/");
  }

  const courses = await prisma.course.findMany({
    include: {
      _count: {
        select: { 
          questions: true,
          slides: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Premium Sidebar-aligned Header */}
      <header className="h-20 bg-[#0f172a] border-b border-slate-800 sticky top-0 z-50 flex items-center px-6 lg:px-12 justify-between">
        <div className="flex items-center gap-6">
          <Link href="/super-admin">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5 text-slate-400">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-black text-lg tracking-tight leading-none text-white">Content Library</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">研修コンテンツ統括管理</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{courses.length} Courses Active</span>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs h-9 px-4 shadow-lg shadow-blue-900/20">
            新規コース作成
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 lg:px-12">
        <div className="mb-8 space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tight">公開中の研修プログラム</h2>
          <p className="text-slate-500 text-sm font-medium">システム全体で利用可能なカリキュラムの一覧です</p>
        </div>

        {/* Compact List View */}
        <div className="bg-[#1e293b] border border-slate-800 rounded-[1.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-8 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] w-[40%]">研修タイトル / 説明</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">コンテンツ量</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">メディア</th>
                  <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] text-right">アクション</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                          <span className="font-bold text-slate-200 group-hover:text-white transition-colors">{course.title}</span>
                        </div>
                        <p className="text-xs text-slate-500 font-medium line-clamp-1 pl-5">
                          {course.description || "詳細説明なし"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-black text-slate-300 tabular-nums">{course._count.slides}</span>
                          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">Slides</span>
                        </div>
                        <div className="w-px h-4 bg-slate-800" />
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-black text-slate-300 tabular-nums">{course._count.questions}</span>
                          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">Tests</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-900/50 border border-slate-800">
                        {course.videoUrl ? (
                          <>
                            <Video className="w-3 h-3 text-red-500" />
                            <span className="text-[9px] font-bold text-slate-400 uppercase">Video Attached</span>
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                            <span className="text-[9px] font-bold text-slate-600 uppercase">No Video</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/super-admin/courses/${course.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-slate-700 transition-all">
                            内容確認・編集
                          </Button>
                        </Link>
                        <DeleteButton 
                          id={course.id} 
                          name={course.title} 
                          type="course" 
                          className="h-8 w-8 rounded-lg" 
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {courses.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto border border-slate-800">
                <BookOpen className="w-6 h-6 text-slate-700" />
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 font-bold">研修コースが登録されていません</p>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">No active curriculum found</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}