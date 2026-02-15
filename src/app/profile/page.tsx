import { auth, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, Shield, ChevronRight } from "lucide-react";
import { StaffMobileNav } from "@/components/staff-mobile-nav";
import { cn } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, role: true, facility: { select: { name: true } } }
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/50 h-16 px-4 flex items-center justify-center">
        <h1 className="font-bold text-slate-900 text-lg">プロフィール</h1>
      </header>

      <main className="max-w-md mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center border-4 border-white shadow-xl">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900">{user?.name}</h2>
            <p className="text-sm font-bold text-slate-400">{user?.facility?.name || "所属なし"}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 space-y-1">
           <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                 <Settings className="w-5 h-5" />
               </div>
               <span className="font-bold text-slate-700">アカウント設定</span>
             </div>
             <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
           </div>
           
           <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                 <Shield className="w-5 h-5" />
               </div>
               <span className="font-bold text-slate-700">プライバシーポリシー</span>
             </div>
             <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
           </div>
        </div>

        <div className="pt-8">
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <Button variant="destructive" type="submit" className="w-full h-14 rounded-2xl font-bold shadow-red-100 shadow-lg">
              <LogOut className="w-5 h-5 mr-2" />
              ログアウト
            </Button>
          </form>
          <p className="text-center text-[10px] text-slate-400 font-bold mt-6 uppercase tracking-widest">
            Care Learning System v1.0.0
          </p>
        </div>
      </main>

      <StaffMobileNav />
    </div>
  );
}
