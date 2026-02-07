"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";

interface Course {
  id: string;
  title: string;
}

interface Props {
  staffName: string;
  incompleteCourses: Course[];
}

export function StaffIncompleteCoursesDialog({ staffName, incompleteCourses }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="ghost" 
        size="icon" 
        className="w-8 h-8 text-slate-400 hover:text-[#1d4ed8] hover:bg-blue-50 shadow-none transition-all"
        title="未受講科目を確認"
      >
        <BookOpen className="w-3.5 h-3.5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border-none overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">未完了の研修</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{staffName} さん</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white">
                <X className="w-5 h-5 text-slate-400" />
              </Button>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                {incompleteCourses.length > 0 ? (
                  <>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                      対象科目: {incompleteCourses.length} 件
                    </div>
                    <div className="max-h-[40vh] overflow-y-auto space-y-2 custom-scrollbar pr-2 text-left">
                      {incompleteCourses.map(course => (
                        <div key={course.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-left">
                          <span className="text-xs font-bold text-slate-700 leading-relaxed block text-left">
                            {course.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <p className="text-sm font-bold text-slate-900">全ての研修を完了しています</p>
                  </div>
                )}
                <Button 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl h-11 transition-all mt-2"
                >
                  閉じる
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
