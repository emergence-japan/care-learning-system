import Link from "next/link";
import {
  Shield, Brain, Microscope, AlertTriangle, HeartPulse, Lock, Scale, UserCheck,
  Flame, Footprints, Stethoscope, Heart, Smile, Zap, Clock, Trophy, BookOpen,
  ArrowRight, CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CertificateDownloadButton } from "@/components/certificate-download-button";
import { getTranslations } from "next-intl/server";

export type LearningPlanItem = {
  assignmentId: string;
  courseId: string;
  title: string;
  badgeIcon: string;
  sessionLabel: string | null;
  status: string;
  startDate: Date;
  endDate: Date;
  daysLeft: number;
  isOverdue: boolean;
  isUpcoming: boolean;
  completedAt: string | null;
};

type StatusLabels = {
  completed: string;
  notStarted: string;
  overdue: string;
  inProgress: string;
  upcoming: string;
  daysLeft: (days: number) => string;
  trainingPrograms: string;
};

type Props = {
  learningPlan: LearningPlanItem[];
  staffName: string;
  corporationName: string;
  facilityName: string;
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

const getStatusInfo = (status: string, isOverdue: boolean, isUpcoming: boolean, labels: StatusLabels) => {
  if (status === "COMPLETED") return { label: labels.completed, color: "text-emerald-600", dot: "bg-emerald-500" };
  if (isUpcoming) return { label: labels.notStarted, color: "text-slate-400", dot: "bg-slate-300" };
  if (isOverdue) return { label: labels.overdue, color: "text-rose-600", dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" };
  if (status === "IN_PROGRESS") return { label: labels.inProgress, color: "text-blue-600", dot: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" };
  return { label: labels.upcoming, color: "text-slate-400", dot: "bg-slate-300" };
};

function CourseListItem({ item, staffName, corporationName, facilityName, labels }: { item: LearningPlanItem; staffName: string; corporationName: string; facilityName: string; labels: StatusLabels }) {
  const statusInfo = getStatusInfo(item.status, item.isOverdue, item.isUpcoming, labels);
  const isCompleted = item.status === "COMPLETED";
  const icon = getIcon(item.badgeIcon);

  const content = (
    <div className={cn(
      "relative bg-white border border-slate-200 rounded-2xl transition-all duration-400 overflow-hidden",
      item.isUpcoming ? "bg-slate-200/40 cursor-not-allowed border-dashed border-slate-300 opacity-70" : "hover:border-blue-600/30 hover:shadow-xl hover:shadow-blue-900/5",
      isCompleted && "bg-emerald-50/20 border-emerald-100/50"
    )}>
      <div className="p-5 flex items-center justify-between gap-6">
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border transition-transform duration-500",
            !item.isUpcoming && "group-hover:scale-110",
            isCompleted ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
            item.isOverdue ? "bg-rose-50 border-rose-100 text-rose-500" :
            item.isUpcoming ? "bg-slate-200 border-slate-300 text-slate-400 grayscale" :
            "bg-blue-50 border-blue-100 text-blue-600"
          )}>
            {icon}
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className={cn("w-1.5 h-1.5 rounded-full", statusInfo.dot)} />
                <span className={cn("text-[9px] font-bold uppercase tracking-wider", statusInfo.color)}>
                  {statusInfo.label}
                </span>
              </div>
              {item.sessionLabel && (
                <>
                  <div className="h-3 w-px bg-slate-200" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.sessionLabel}
                  </span>
                </>
              )}
              <div className="h-3 w-px bg-slate-200" />
              {!isCompleted && (
                <span className={cn("text-[10px] font-bold whitespace-nowrap",
                  item.isUpcoming ? "text-slate-400" :
                  item.isOverdue ? "text-rose-500" : "text-slate-400"
                )}>
                  {item.isUpcoming ? `${item.startDate.toLocaleDateString()} より開始` :
                   item.isOverdue ? labels.overdue : labels.daysLeft(item.daysLeft)}
                </span>
              )}
            </div>
            <h4 className={cn("text-base font-bold tracking-tight transition-colors",
              isCompleted ? "text-emerald-900/70" :
              item.isUpcoming ? "text-slate-400" :
              "text-slate-900 group-hover:text-blue-600"
            )}>
              {item.title}
            </h4>
          </div>
        </div>
        <div className="shrink-0">
          {isCompleted ? (
            <div className="flex flex-col items-end gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/50 flex items-center justify-center text-emerald-600 shadow-inner">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              {item.completedAt && (
                <CertificateDownloadButton
                  staffName={staffName}
                  corporationName={corporationName}
                  facilityName={facilityName}
                  courseTitle={item.title}
                  sessionLabel={item.sessionLabel}
                  completedAt={new Date(item.completedAt).toLocaleDateString("ja-JP")}
                />
              )}
            </div>
          ) : item.isUpcoming ? (
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl border border-slate-300 bg-slate-300/30 flex flex-col items-center justify-center text-slate-400">
              <Lock className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
              <span className="text-[7px] font-black uppercase tracking-widest">Locked</span>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute -inset-2 bg-blue-500/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-slate-900 rounded-xl flex flex-col items-center justify-center shadow-xl transition-all duration-500 group-hover:bg-blue-600 group-hover:scale-105 active:scale-95">
                <span className="text-[8px] font-black text-blue-400 uppercase tracking-tighter mb-0.5">Start</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (item.isUpcoming) return <div>{content}</div>;
  return (
    <Link
      href={`/courses/${item.courseId}?assignment=${item.assignmentId}`}
      className="block group"
    >
      {content}
    </Link>
  );
}

export async function CourseList({ learningPlan, staffName, corporationName, facilityName }: Props) {
  const t = await getTranslations('dashboard');

  const labels: StatusLabels = {
    completed: t('statusCompleted'),
    notStarted: t('statusNotStarted'),
    overdue: t('statusOverdue'),
    inProgress: t('statusInProgress'),
    upcoming: t('statusUpcoming'),
    daysLeft: (days: number) => t('daysLeft', { days }),
    trainingPrograms: t('trainingPrograms'),
  };

  return (
    <section className="space-y-4">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
        <div className="w-1 h-3 bg-slate-900 rounded-full" /> {labels.trainingPrograms}
      </h3>
      <div className="space-y-2">
        {learningPlan.map((item) => (
          <CourseListItem key={item.assignmentId} item={item} staffName={staffName} corporationName={corporationName} facilityName={facilityName} labels={labels} />
        ))}
      </div>
    </section>
  );
}
