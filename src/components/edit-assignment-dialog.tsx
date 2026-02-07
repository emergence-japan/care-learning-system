"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Check, Loader2, Trash2, Calendar } from "lucide-react";
import { updateCourseAssignment, deleteCourseAssignment } from "@/lib/actions";

interface Props {
  assignment: {
    id: string;
    course: {
      title: string;
    };
    startDate: Date;
    endDate: Date;
  };
  onClose: () => void;
}

export function EditAssignmentDialog({ assignment, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // yyyy-mm-dd 形式に変換
  const formatDate = (date: Date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  const [startDate, setStartDate] = useState(formatDate(assignment.startDate));
  const [endDate, setEndDate] = useState(formatDate(assignment.endDate));

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      await updateCourseAssignment(assignment.id, new Date(startDate), new Date(endDate));
      onClose();
    } catch (error) {
      console.error(error);
      alert("更新に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`研修「${assignment.course.title}」の計画を削除しますか？
※スタッフの受講記録自体は削除されません。`)) return;
    setIsDeleting(true);
    try {
      await deleteCourseAssignment(assignment.id);
      onClose();
    } catch (error) {
      console.error(error);
      alert("削除に失敗しました。");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl border-none overflow-hidden animate-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 leading-tight">計画の編集</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Edit Schedule</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </div>

        <CardContent className="p-8 space-y-8">
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Training Course</label>
              <p className="text-sm font-bold text-slate-900 bg-slate-50 p-4 rounded-xl border border-slate-100">{assignment.course.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Start Date</label>
                <input 
                  type="date" 
                  className="w-full h-14 px-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all text-sm font-bold bg-slate-50/50"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">End Date</label>
                <input 
                  type="date" 
                  className="w-full h-14 px-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all text-sm font-bold bg-slate-50/50"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 h-12 rounded-xl border-slate-200 text-slate-500 font-bold text-sm"
                onClick={onClose}
              >
                キャンセル
              </Button>
              <Button 
                className="flex-[2] h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
                onClick={handleUpdate}
                disabled={isSubmitting || isDeleting}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "変更を保存"}
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              className="w-full h-10 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl text-xs font-bold transition-all"
              onClick={handleDelete}
              disabled={isSubmitting || isDeleting}
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : <><Trash2 className="w-3.5 h-3.5 mr-2" /> 計画から削除する</>}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
