import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, BookOpen, AlertCircle, Search, Filter, Layers } from "lucide-react";
import Link from "next/link";
import { StaffMobileNav } from "@/components/staff-mobile-nav";
import { cn } from "@/lib/utils";

export default async function CoursesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    include: { course: true },
    orderBy: { updatedAt: 'desc' }
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return { label: 'Complete', color: 'text-emerald-600 bg-emerald-50 ring-emerald-100', icon: CheckCircle2 };
      case 'IN_PROGRESS':
        return { label: 'In Progress', color: 'text-indigo-600 bg-indigo-50 ring-indigo-100', icon: Clock };
      default:
        return { label: 'Available', color: 'text-slate-400 bg-slate-50 ring-slate-100', icon: BookOpen };
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans antialiased">
      {/* Premium Header */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-slate-200/40 h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <h1 className="font-black text-slate-900 text-sm uppercase tracking-tight">Library</h1>
        </div>
        <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer">
           <Search className="w-4 h-4" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-10">
        {/* Elegant Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          <button className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 transition-transform active:scale-95">All Courses</button>
          <button className="px-6 py-2.5 bg-white text-slate-500 border border-slate-200/60 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">In Progress</button>
          <button className="px-6 py-2.5 bg-white text-slate-500 border border-slate-200/60 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">Completed</button>
        </div>

        <div className="space-y-6">
          {enrollments.map((enrollment) => {
            const statusInfo = getStatusInfo(enrollment.status);
            const Icon = statusInfo.icon;
            
            return (
              <Link href={`/courses/${enrollment.courseId}`} key={enrollment.courseId} className="block group">
                <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] active:scale-[0.99] transition-all duration-500 rounded-[2.5rem] bg-white overflow-hidden">
                  <CardContent className="p-6 flex gap-6">
                    <div className={cn(
                      "w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110",
                      statusInfo.color,
                      "ring-1"
                    )}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <div className="flex-1 min-w-0 py-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className={cn("text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest", statusInfo.color)}>
                          {statusInfo.label}
                        </span>
                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest truncate">
                          Updated {new Date(enrollment.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {enrollment.course.title}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
          
          {enrollments.length === 0 && (
            <div className="text-center py-24 bg-white/50 border-2 border-dashed border-slate-200 rounded-[3rem] space-y-4">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                 <BookOpen className="w-8 h-8 text-slate-300" />
               </div>
               <p className="font-bold text-slate-400 text-sm">コースが見つかりません</p>
            </div>
          )}
        </div>
      </main>

      <StaffMobileNav />
    </div>
  );
}
