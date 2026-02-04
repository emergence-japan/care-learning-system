"use client";

import { AlertCircle, Building2, Users } from "lucide-react";

type Props = {
  type: "facility" | "staff";
  current: number;
  max: number;
  label: string;
};

export function OrgLimitStatus({ type, current, max, label }: Props) {
  const rate = Math.round((current / max) * 100);
  const isFull = current >= max;
  const Icon = type === "facility" ? Building2 : Users;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isFull ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black tabular-nums ${isFull ? 'text-red-600' : 'text-slate-900'}`}>{current}</span>
              <span className="text-xs font-bold text-slate-400">/ {max}</span>
            </div>
          </div>
        </div>
        {isFull && (
          <div className="bg-red-100 text-red-600 p-1.5 rounded-lg animate-pulse">
            <AlertCircle className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase">
          <span className={isFull ? 'text-red-500' : 'text-slate-400'}>Utilization</span>
          <span className={isFull ? 'text-red-500' : 'text-slate-900'}>{rate}%</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${isFull ? 'bg-red-500' : 'bg-slate-900'}`} 
            style={{ width: `${Math.min(rate, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
