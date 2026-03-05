import {
  Shield, Brain, Microscope, AlertTriangle, HeartPulse, Lock, Scale, UserCheck,
  Flame, Footprints, Stethoscope, Heart, Smile, Zap, Clock, Trophy, BookOpen, CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeItem = {
  id: string;
  label: string;
  badgeIcon: string | null;
  unlocked: boolean;
};

type Props = {
  badges: BadgeItem[];
  completedCount: number;
};

const colorMap: Record<string, string> = {
  Shield: "from-blue-400 to-blue-700", Brain: "from-purple-400 to-purple-700",
  Microscope: "from-emerald-400 to-emerald-700", AlertTriangle: "from-amber-400 to-amber-700",
  HeartPulse: "from-rose-400 to-rose-700", Lock: "from-indigo-400 to-indigo-700",
  Scale: "from-slate-400 to-slate-700", UserCheck: "from-sky-400 to-sky-700",
  Flame: "from-orange-400 to-orange-700", Footprints: "from-teal-400 to-teal-700",
  Stethoscope: "from-red-400 to-red-700", Heart: "from-pink-400 to-pink-700",
  Smile: "from-yellow-400 to-yellow-700",
};

function getIcon(name: string | null) {
  switch (name) {
    case "Shield": return <Shield className="w-4 h-4" />;
    case "Brain": return <Brain className="w-4 h-4" />;
    case "Microscope": return <Microscope className="w-4 h-4" />;
    case "AlertTriangle": return <AlertTriangle className="w-4 h-4" />;
    case "HeartPulse": return <HeartPulse className="w-4 h-4" />;
    case "Lock": return <Lock className="w-4 h-4" />;
    case "Scale": return <Scale className="w-4 h-4" />;
    case "UserCheck": return <UserCheck className="w-4 h-4" />;
    case "Flame": return <Flame className="w-4 h-4" />;
    case "Footprints": return <Footprints className="w-4 h-4" />;
    case "Stethoscope": return <Stethoscope className="w-4 h-4" />;
    case "Heart": return <Heart className="w-4 h-4" />;
    case "Smile": return <Smile className="w-4 h-4" />;
    case "Zap": return <Zap className="w-4 h-4" />;
    case "Clock": return <Clock className="w-4 h-4" />;
    case "Trophy": return <Trophy className="w-4 h-4" />;
    default: return <BookOpen className="w-4 h-4" />;
  }
}

export function BadgeCollection({ badges, completedCount }: Props) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-1.5 h-3 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          Elite Skill Collection
        </h3>
        <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 shadow-sm">
          {completedCount} / 13 Unlocked
        </span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-7 gap-y-10 gap-x-4">
        {badges.map((badge) => {
          const jewelColor = colorMap[badge.badgeIcon ?? ""] || "from-slate-400 to-slate-600";
          return (
            <div key={badge.id} className="flex flex-col items-center gap-3 group/medal">
              <div className="relative">
                {badge.unlocked && <div className="absolute inset-0 bg-white blur-xl opacity-40 scale-150 animate-pulse" />}
                <div className={cn(
                  "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl rotate-45 flex items-center justify-center transition-all duration-700 relative z-10 overflow-hidden shadow-xl",
                  badge.unlocked ? "bg-gradient-to-br from-amber-200 via-amber-500 to-amber-300 ring-2 ring-amber-400" : "bg-slate-100 ring-1 ring-slate-200 opacity-30 grayscale"
                )}>
                  <div className={cn(
                    "absolute inset-1 rounded-xl -rotate-45 flex items-center justify-center overflow-hidden",
                    badge.unlocked ? `bg-gradient-to-br ${jewelColor} shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]` : "bg-slate-200"
                  )}>
                    {badge.unlocked && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover/medal:translate-x-full transition-transform duration-1000" />}
                    <div className={cn("relative z-10 transition-all duration-500 group-hover/medal:scale-110", badge.unlocked ? "text-white" : "text-slate-400")}>
                      {getIcon(badge.badgeIcon)}
                    </div>
                  </div>
                </div>
                {badge.unlocked && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg border border-amber-200 z-20 animate-bounce">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                )}
              </div>
              <span className={cn("text-[8px] font-black text-center uppercase truncate w-full px-0.5", badge.unlocked ? "text-amber-900" : "text-slate-300")}>
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
