"use client";

import { useState } from "react";
import { Bell, AlertTriangle, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Alert {
  courseId: string;
  courseTitle: string;
  daysLeft: number;
  incompleteCount: number;
}

interface Props {
  alerts: Alert[];
}

export function NotificationBell({ alerts }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className={`w-10 h-10 lg:w-11 lg:h-11 rounded-full border bg-slate-900 transition-all ${alerts.length > 0 ? 'border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-slate-800 text-slate-400 hover:text-white'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className={`w-5 h-5 ${alerts.length > 0 ? 'animate-bounce' : ''}`} />
      </Button>

      {alerts.length > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e11d48] text-white text-[10px] font-bold rounded-full border-2 border-[#120a0a] flex items-center justify-center">
          {alerts.length}
        </span>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-4 w-80 z-[100] animate-in fade-in zoom-in-95 duration-200">
          <Card className="bg-white border-slate-200 shadow-2xl overflow-hidden rounded-2xl">
            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Urgent Notifications</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setIsOpen(false)}>
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {alerts.length > 0 ? (
                <div className="divide-y divide-slate-50">
                  {alerts.map((alert) => (
                    <div key={alert.courseId} className="p-4 hover:bg-slate-50 transition-colors group">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-900 line-clamp-2 leading-relaxed">
                            「{alert.courseTitle}」
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-red-100 text-red-600 uppercase">
                              残り {alert.daysLeft} 日
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              未完了: {alert.incompleteCount} 名
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors self-center" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center space-y-2">
                  <Bell className="w-8 h-8 text-slate-200 mx-auto" />
                  <p className="text-xs font-bold text-slate-400">現在、通知はありません</p>
                </div>
              )}
            </div>
            
            {alerts.length > 0 && (
              <div className="p-3 bg-slate-50/50 border-t border-slate-100 text-center">
                <button className="text-[10px] font-black text-blue-600 hover:underline uppercase tracking-widest">
                  全ての状況を確認
                </button>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
