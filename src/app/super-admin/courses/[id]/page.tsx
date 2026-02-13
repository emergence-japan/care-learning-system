import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft, LayoutGrid, HelpCircle, Video, FileText, Target, Lightbulb, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "SUPER_ADMIN") {
    redirect("/");
  }

  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: {
      slides: {
        orderBy: { order: 'asc' },
      },
      questions: {
        orderBy: { order: 'asc' },
        include: {
          choices: {
            orderBy: { id: 'asc' }
          },
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans pb-20">
      {/* Premium Header */}
      <header className="h-20 bg-[#0f172a] border-b border-slate-800 sticky top-0 z-50 flex items-center px-6 lg:px-12 justify-between backdrop-blur-xl bg-[#0f172a]/80">
        <div className="flex items-center gap-6">
          <Link href="/super-admin/courses">
            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-white/5 text-slate-400">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Curriculum Editor</span>
               <div className="w-1 h-1 rounded-full bg-slate-700" />
               <span className="text-[10px] font-bold text-slate-500">{course.id}</span>
            </div>
            <h1 className="font-black text-xl tracking-tight leading-none text-white">{course.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* New Full Screen Preview Link */}
          <Link href={`/super-admin/courses/${course.id}/preview`} target="_blank">
            <Button variant="outline" className="h-9 px-4 rounded-xl border-blue-500/30 bg-blue-500/5 text-blue-400 hover:text-white hover:bg-blue-600 transition-all text-xs font-bold">
              <Eye className="w-3.5 h-3.5 mr-2" /> 受講画面をフルプレビュー
            </Button>
          </Link>

          <Button variant="outline" className="h-9 px-4 rounded-xl border-slate-800 bg-transparent text-slate-400 hover:text-white hover:bg-white/5 text-xs font-bold">
            基本情報の編集
          </Button>
          <Button className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-900/20">
            変更を保存
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        
        {/* Intro & Objectives Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-[#1e293b] border-slate-800 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-blue-400">
                <Lightbulb className="w-5 h-5" />
                <h3 className="font-black text-sm uppercase tracking-widest">注意喚起・導入</h3>
              </div>
              <div 
                className="prose prose-invert prose-sm max-w-none text-slate-400 font-medium leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course.introduction || "設定なし" }}
              />
            </CardContent>
          </Card>

          <Card className="bg-[#1e293b] border-slate-800 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3 text-emerald-400">
                <Target className="w-5 h-5" />
                <h3 className="font-black text-sm uppercase tracking-widest">学習目標</h3>
              </div>
              <div 
                className="prose prose-invert prose-sm max-w-none text-slate-400 font-medium leading-relaxed"
                dangerouslySetInnerHTML={{ __html: course.learningObjectives || "設定なし" }}
              />
            </CardContent>
          </Card>
        </section>

        {/* Video Section (If exists) */}
        {course.videoUrl && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <Video className="w-5 h-5 text-red-500" />
              <h3 className="font-black text-lg text-white">講義ビデオ</h3>
            </div>
            <div className="bg-[#1e293b] border border-slate-800 p-4 rounded-[2rem] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-200">Video Resource URL</p>
                  <p className="text-xs text-slate-500 font-mono">{course.videoUrl}</p>
                </div>
              </div>
              <Button variant="ghost" className="text-blue-400 font-bold text-xs" asChild>
                <a href={course.videoUrl} target="_blank" rel="noopener noreferrer">外部サイトで確認 <ExternalLink className="ml-2 w-3 h-3" /></a>
              </Button>
            </div>
          </section>
        )}

        {/* Slides Content Preview */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <LayoutGrid className="w-5 h-5 text-blue-500" />
              <h3 className="font-black text-xl text-white">スライド構成</h3>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold ml-2">{course.slides.length} SLIDES</span>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl border-slate-800 text-xs font-bold text-slate-400">
              スライドを追加
            </Button>
          </div>

          <div className="space-y-4">
            {course.slides.map((slide, index) => (
              <div key={slide.id} className="group relative">
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-1">
                  <span className="text-[10px] font-black text-slate-700">PAGE</span>
                  <span className="text-xl font-black text-slate-800 tracking-tighter">{(index + 1).toString().padStart(2, '0')}</span>
                </div>
                <div className="bg-[#1e293b] border border-slate-800 rounded-[2rem] overflow-hidden transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10">
                  <div className="px-8 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/30">
                    <h4 className="font-bold text-slate-200 text-sm flex items-center gap-3">
                      <FileText className="w-4 h-4 text-slate-500" />
                      {slide.title}
                    </h4>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold text-slate-500 hover:text-white">編集</Button>
                      <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold text-red-500/70 hover:text-red-500">削除</Button>
                    </div>
                  </div>
                  <div className="p-8 overflow-hidden">
                    <div 
                      className="prose prose-invert prose-slate max-w-none prose-p:text-slate-400 prose-p:leading-relaxed prose-strong:text-blue-400"
                      dangerouslySetInnerHTML={{ __html: slide.content }}
                    />
                    {slide.videoUrl && (
                      <div className="mt-6 flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
                        <Video className="w-3.5 h-3.5 text-red-500" />
                        <span className="text-[10px] font-bold text-red-500/70">スライド個別動画: {slide.videoUrl}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comprehension Test Section */}
        <section className="space-y-8 pt-8 border-t border-slate-800/50">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-emerald-500" />
              <h3 className="font-black text-xl text-white">理解度テスト</h3>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold ml-2">{course.questions.length} QUESTIONS</span>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl border-slate-800 text-xs font-bold text-slate-400">
              設問を追加
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {course.questions.map((q, qIndex) => (
              <div key={q.id} className="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Question {qIndex + 1}</p>
                    <h4 className="text-lg font-bold text-white leading-tight">{q.text}</h4>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-slate-500 hover:text-white"><LayoutGrid className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-slate-500 hover:text-red-500"><ChevronLeft className="w-4 h-4" /></Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.choices.map((choice) => (
                    <div 
                      key={choice.id} 
                      className={`p-4 rounded-xl border flex items-center justify-between transition-all ${choice.isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-800/30 border-slate-800'}`}
                    >
                      <span className={`text-sm font-bold ${choice.isCorrect ? 'text-emerald-400' : 'text-slate-400'}`}>{choice.text}</span>
                      {choice.isCorrect && (
                        <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                          <HelpCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {q.explanation && (
                  <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                      <Lightbulb className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">正解の解説</p>
                      <p className="text-sm text-slate-400 leading-relaxed font-medium">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}