"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlidePlayer } from "@/components/slide-player";

interface PreviewButtonProps {
  courseTitle: string;
  slides: any[];
  videoUrl: string | null;
}

export function PreviewButton({ courseTitle, slides, videoUrl }: PreviewButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-9 px-4 rounded-xl border-blue-500/30 bg-blue-500/5 text-blue-400 hover:text-white hover:bg-blue-600 transition-all text-xs font-bold">
          <Play className="w-3.5 h-3.5 mr-2 fill-current" /> 受講画面をプレビュー
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] w-full p-0 bg-slate-900 border-slate-800 overflow-hidden h-[95vh] flex flex-col focus:outline-none rounded-[2rem]">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 z-[110]" />
        
        <DialogHeader className="p-6 border-b border-slate-800 shrink-0 bg-slate-900 flex flex-row items-center justify-between">
          <DialogTitle className="text-white flex items-center gap-3 text-base">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <Play className="w-4 h-4 text-blue-400 fill-current" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Live Preview Mode</span>
              <span className="font-bold tracking-tight">{courseTitle}</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-[#f8fafc] custom-scrollbar p-4 md:p-12">
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
              <SlidePlayer 
                slides={slides} 
                courseVideoUrl={videoUrl} 
                onComplete={async () => {
                  console.log("Preview end");
                }} 
                showTest={false}
              />
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-slate-900 border-t border-slate-800 text-center shrink-0">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">これは管理者用プレビュー画面です。実際の受講履歴には反映されません。</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
