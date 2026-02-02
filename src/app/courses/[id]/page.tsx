import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { completeEnrollment } from "@/lib/actions";

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

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  const embedUrl = enrollment.course.videoUrl ? getYouTubeEmbedUrl(enrollment.course.videoUrl) : "";

  const isCompleted = enrollment.status === "COMPLETED";

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
        
        <div className="mt-6 aspect-video bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200">
          {embedUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-zinc-500 font-medium">動画の準備ができていません</p>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="font-bold text-lg text-zinc-900">研修の内容</h3>
          <p className="text-zinc-600 leading-relaxed">
            {enrollment.course.description || "説明はありません。"}
          </p>
        </div>

        <div className="mt-12">
          {isCompleted ? (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center justify-center text-green-800 font-bold">
              受講完了済みです
            </div>
          ) : (
            <form action={async () => {
              "use server";
              await completeEnrollment(id);
            }}>
              <Button type="submit" className="w-full h-14 text-xl font-bold bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl">
                受講を完了する
              </Button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
