import { signOut } from "@/auth";
import { LogOut } from "lucide-react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { getTranslations } from "next-intl/server";

type Props = {
  corporationName?: string;
  facilityName?: string;
  userName?: string;
};

export async function DashboardHeader({ corporationName, facilityName, userName }: Props) {
  const t = await getTranslations('dashboard');
  const tc = await getTranslations('common');
  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700 py-3 px-6 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-slate-900 font-black text-[10px]">CLS</span>
            </div>
            <h1 className="font-black text-white text-sm tracking-tighter">{t('systemName')}</h1>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[10px] font-bold tracking-tight">{corporationName}</span>
            <span className="text-[8px] opacity-30">/</span>
            <span className="text-[10px] font-black text-slate-200">{facilityName}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <LanguageSwitcher />
          <div className="hidden sm:flex flex-col items-end">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-[9px] font-black uppercase tracking-widest">Care Learning System</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-tight truncate max-w-[120px]">
                {userName}{t('honorific') ? ` ${t('honorific')}` : ''}
              </span>
            </div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-slate-700 mx-1" />
          <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
            <button className="group flex flex-col items-center gap-1 text-slate-400 hover:text-rose-400 transition-all duration-300">
              <div className="p-2 rounded-xl group-hover:bg-rose-900/30 transition-colors">
                <LogOut className="w-6 h-6" />
              </div>
              <span className="text-[8px] font-black uppercase tracking-tighter">{tc('logout')}</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
