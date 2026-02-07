"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Users, AlertCircle } from "lucide-react";

interface User {
  id: string;
  name: string;
}

interface Props {
  courseTitle: string;
  incompleteUsers: User[];
  totalCount: number;
}

export function IncompleteUsersDialog({ courseTitle, incompleteUsers, totalCount }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (incompleteUsers.length === 0) {
    return (
      <div className="min-w-[100px] text-right">
        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
          全員完了
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="min-w-[100px] text-right">
        <button 
          onClick={() => setIsOpen(true)}
          className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-all"
        >
          未受講を確認 ({incompleteUsers.length})
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-sm bg-white rounded-3xl shadow-2xl border-none overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">未完了スタッフ</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{courseTitle}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white">
                <X className="w-5 h-5 text-slate-400" />
              </Button>
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                  <span>スタッフ名</span>
                  <span>ステータス: 未受講</span>
                </div>
                <div className="max-h-[40vh] overflow-y-auto space-y-1 custom-scrollbar pr-2">
                  {incompleteUsers.map(user => (
                    <div key={user.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{user.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-center text-slate-400 pt-2 border-t border-slate-50">
                  全 {totalCount} 名中 {incompleteUsers.length} 名が未完了です
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
