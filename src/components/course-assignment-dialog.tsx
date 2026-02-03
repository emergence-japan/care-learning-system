"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Plus, X, Check, Loader2 } from "lucide-react";
import { assignCourseToFacility } from "@/lib/actions";

interface Course {
  id: string;
  title: string;
}

interface Assignment {
  courseId: string;
  endDate: Date;
}

interface Props {
  courses: Course[];
  currentAssignments: Assignment[];
}

export function CourseAssignmentDialog({ courses, currentAssignments }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAssign = async () => {
    if (!selectedCourseId || !endDate) return;
    setIsSubmitting(true);
    try {
      await assignCourseToFacility(selectedCourseId, new Date(), new Date(endDate));
      setSelectedCourseId("");
      setEndDate("");
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert("割当に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const assignedIds = currentAssignments.map(a => a.courseId);

  return (
    <>
      <Card className="border-slate-200/60 shadow-sm rounded-[2rem] overflow-hidden bg-white group hover:border-blue-200 transition-all cursor-pointer" onClick={() => setIsOpen(true)}>
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <CalendarDays className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900">研修計画を立てる</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Annual Training Plan</p>
            </div>
          </div>
          <Plus className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-all" />
        </CardContent>
      </Card>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border-none overflow-hidden animate-in zoom-in duration-200">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-black text-xl text-slate-900 tracking-tight">研修の割当・期限設定</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white">
                <X className="w-5 h-5 text-slate-400" />
              </Button>
            </div>

            <CardContent className="p-8 space-y-8">
              <div className="space-y-6">
                {/* Course Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Select Course</label>
                  <select 
                    className="w-full h-14 px-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all text-sm font-bold bg-slate-50/50"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                  >
                    <option value="">研修を選択してください</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.title} {assignedIds.includes(course.id) ? " (設定済み)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Selection */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Set Deadline</label>
                  <input 
                    type="date" 
                    className="w-full h-14 px-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all text-sm font-bold bg-slate-50/50"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-14 rounded-2xl border-slate-200 text-slate-400 font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  キャンセル
                </Button>
                <Button 
                  className="flex-[2] h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-xl shadow-blue-100 disabled:opacity-50"
                  onClick={handleAssign}
                  disabled={!selectedCourseId || !endDate || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>計画に追加する <Check className="ml-2 w-4 h-4" /></>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
