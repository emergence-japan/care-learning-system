"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2, Quote, Calendar, BookOpen, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface ActionPlanDialogProps {
  staffName: string;
  courseTitle: string;
  content: string;
  completedAt: Date | null;
  trigger: React.ReactNode;
}

export function ActionPlanDialog({
  staffName,
  courseTitle,
  content,
  completedAt,
  trigger,
}: ActionPlanDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="bg-white border-slate-200 text-slate-600 rounded-[2rem] sm:max-w-[500px] p-0 overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-blue-500" />
        
        <DialogHeader className="p-8 pb-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-50 p-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-2 py-0.5">
              Course Completed
            </Badge>
          </div>
          <DialogTitle className="text-2xl font-black text-slate-900 leading-tight tracking-tight">
            行動宣言：{staffName} さん
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8">
          {/* Course Info */}
          <div className="flex items-center gap-6 text-slate-500">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold">{courseTitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold">
                {completedAt ? format(completedAt, 'yyyy/MM/dd', { locale: ja }) : '---'}
              </span>
            </div>
          </div>

          {/* Plan Content */}
          <div className="relative bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-slate-200 -z-0" />
            <p className="relative z-10 text-lg font-medium text-slate-700 leading-relaxed italic">
              “{content}”
            </p>
          </div>

          <div className="pt-4 flex justify-end">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Care Learning System HQ</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}