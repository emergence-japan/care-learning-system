import { Trophy, Target } from "lucide-react";
import { cn } from "@/lib/utils";

type RankInfo = { title: string; color: string; bg: string; ring: string; glow: string };

function getRankInfo(progress: number): RankInfo {
  if (progress === 100) return { title: "Diamond", color: "text-cyan-400", bg: "bg-cyan-500/10", ring: "ring-cyan-500/30", glow: "shadow-[0_0_15px_rgba(34,211,238,0.4)]" };
  if (progress >= 90) return { title: "Platinum", color: "text-indigo-300", bg: "bg-indigo-500/10", ring: "ring-indigo-500/30", glow: "" };
  if (progress >= 70) return { title: "Gold", color: "text-amber-400", bg: "bg-amber-500/10", ring: "ring-amber-500/30", glow: "" };
  if (progress >= 40) return { title: "Silver", color: "text-slate-300", bg: "bg-slate-500/10", ring: "ring-slate-500/30", glow: "" };
  if (progress >= 15) return { title: "Bronze", color: "text-orange-400", bg: "bg-orange-500/10", ring: "ring-orange-500/30", glow: "" };
  return { title: "Novice", color: "text-slate-500", bg: "bg-white/5", ring: "ring-white/10", glow: "" };
}

function getNextRankInfo(completed: number, total: number) {
  if (completed === total) return null;
  const targets = [
    { name: "Bronze", count: Math.ceil(total * 0.15) },
    { name: "Silver", count: Math.ceil(total * 0.40) },
    { name: "Gold", count: Math.ceil(total * 0.70) },
    { name: "Platinum", count: Math.ceil(total * 0.90) },
    { name: "Diamond", count: total },
  ];
  const next = targets.find(t => t.count > completed);
  return next ? { name: next.name, remaining: next.count - completed } : null;
}

type Props = {
  progressPercentage: number;
  completedCourses: number;
  totalCourses: number;
};

export function ProgressHero({ progressPercentage, completedCourses, totalCourses }: Props) {
  const rank = getRankInfo(progressPercentage);
  const nextRank = getNextRankInfo(completedCourses, totalCourses);

  return (
    <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
      <div className="relative z-10 flex items-center justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold leading-tight tracking-tight">
            {progressPercentage === 100 ? "すべての研修を修了しました" :
             progressPercentage === 0 ? "本年度の学習を開始しましょう" :
             "着実にステップアップしています"}
          </h2>
        </div>
        <div className="text-right flex flex-col items-end gap-1">
          <div className="flex items-center gap-4">
            <span className="text-5xl font-black tracking-tighter tabular-nums leading-none">
              {progressPercentage}<span className="text-xl text-slate-500 ml-1">%</span>
            </span>
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 shadow-lg",
              rank.bg, rank.color, rank.ring, rank.glow
            )}>
              {rank.title === "Novice" ? <Target className="w-6 h-6" /> : <Trophy className="w-6 h-6" />}
            </div>
          </div>
          <div className="space-y-0.5 mt-2">
            <p className={cn("text-xs font-black uppercase tracking-[0.2em]", rank.color)}>
              {rank.title} Rank
            </p>
            {nextRank && (
              <p className="text-[9px] font-bold text-slate-500 whitespace-nowrap">
                あと <span className="text-white">{nextRank.remaining}</span> 科目で <span className="text-blue-400 font-black">{nextRank.name}</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 transition-all duration-1000 ease-out" style={{ width: `${progressPercentage}%` }} />
      </div>
    </div>
  );
}
