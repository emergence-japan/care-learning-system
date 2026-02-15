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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 今日の日付 (yyyy-mm-dd)
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  // 今年度の計算 (リセットボタン用)
  const defaultStartYear = now.getFullYear(); 
  const fiscalYearStart = `${defaultStartYear}-04-01`;
  const fiscalYearEnd = `${defaultStartYear + 1}-03-31`;

  // 開始日が変更された際、2週間後を終了日にセットする
  const handleStartDateChange = (val: string) => {
    setStartDate(val);
    if (val) {
      const date = new Date(val);
      date.setDate(date.getDate() + 14); // 14日後をセット
      // yyyy-mm-dd 形式にフォーマット
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      setEndDate(`${year}-${month}-${day}`);
    }
  };

  const handleAssign = async () => {
    if (!selectedCourseId || !startDate || !endDate) return;
    setIsSubmitting(true);
    try {
      await assignCourseToFacility(selectedCourseId, new Date(startDate), new Date(endDate));
      setSelectedCourseId("");
      setStartDate("");
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
      <Button 
        onClick={() => {
          setStartDate("");
          setEndDate("");
          setIsOpen(true);
        }}
        className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white rounded-full px-5 h-9 font-bold text-xs flex items-center gap-2 shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span>計画を立てる</span>
      </Button>

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
                {/* 期間プリセットボタン */}
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setStartDate(fiscalYearStart);
                      setEndDate(fiscalYearEnd);
                    }}
                    className="text-[10px] font-black uppercase tracking-widest text-blue-600 border-blue-100 bg-blue-50/30 hover:bg-blue-50 rounded-full h-7"
                  >
                    {defaultStartYear}年度にセット
                  </Button>
                </div>

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
                      <option 
                        key={course.id} 
                        value={course.id}
                        disabled={assignedIds.includes(course.id)}
                        className={assignedIds.includes(course.id) ? "text-slate-400" : ""}
                      >
                        {course.title} {assignedIds.includes(course.id) ? " (設定済み)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Start Date</label>
                    <input 
                      type="date" 
                      min={todayStr}
                      className="w-full h-14 px-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all text-sm font-bold bg-slate-50/50"
                      value={startDate}
                      onChange={(e) => handleStartDateChange(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">End Date (Deadline)</label>
                    <input 
                      type="date" 
                      min={startDate || todayStr}
                      className="w-full h-14 px-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 focus:ring-0 transition-all text-sm font-bold bg-slate-50/50"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
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
                  disabled={!selectedCourseId || !startDate || !endDate || isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
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
