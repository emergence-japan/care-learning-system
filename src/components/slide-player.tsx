"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, PlayCircle, XCircle, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: string;
  title: string;
  content: string;
  order: number;
}

interface SlidePlayerProps {
  slides: Slide[];
  courseVideoUrl: string | null;
  onComplete: () => void;
  showTest: boolean;
}

export function SlidePlayer({ slides, courseVideoUrl, onComplete, showTest }: SlidePlayerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentSlide = slides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === slides.length - 1;
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  const nextSlide = () => {
    if (isLastSlide) {
      onComplete();
    } else {
      setDirection(1);
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("embed/")) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : "";
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(10px)",
    }),
  };

  return (
    <div className="space-y-8">
      {/* Stage Meta Information */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center ring-1 ring-blue-50">
            <Layers className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">メイン講義セッション</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Section {currentSlideIndex + 1} / {slides.length}</p>
            </div>
          </div>
        </div>
        
        {courseVideoUrl && (
          <button 
            onClick={() => setShowVideo(!showVideo)}
            className={cn(
              "group relative px-6 py-2.5 rounded-full text-xs font-black transition-all duration-500 overflow-hidden",
              showVideo 
                ? "bg-slate-900 text-white" 
                : "bg-white text-blue-600 ring-1 ring-blue-100 hover:ring-blue-600 shadow-sm"
            )}
          >
            <div className="relative z-10 flex items-center gap-2">
              {showVideo ? (
                <><XCircle className="w-4 h-4" /> スライドに戻る</>
              ) : (
                <><PlayCircle className="w-4 h-4 group-hover:scale-110 transition-transform" /> 解説動画を見る</>
              )}
            </div>
          </button>
        )}
      </div>

      {/* Progress Experience */}
      <div className="px-2 space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Progress</span>
          <span className="text-[10px] font-black text-slate-400 tabular-nums">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
          <motion.div 
            className="bg-blue-600 h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* The Premium Stage */}
      <div className="relative">
        {/* Ambient Background Glows */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative bg-white border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_-10px_rgba(0,0,0,0.1)] min-h-[520px] flex flex-col backdrop-blur-sm">
          <AnimatePresence mode="wait" custom={direction}>
            {showVideo && courseVideoUrl ? (
              <motion.div 
                key="video-theater"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-slate-950 flex flex-col z-20"
              >
                <div className="flex-1 relative">
                  <iframe
                    width="100%"
                    height="100%"
                    src={getYouTubeEmbedUrl(courseVideoUrl)}
                    title="Course Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0"
                  ></iframe>
                </div>
                <div className="p-6 bg-slate-900/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <p className="text-white text-[10px] font-black tracking-[0.2em] uppercase">Cinema Mode</p>
                  </div>
                  <button onClick={() => setShowVideo(false)} className="px-6 py-2 rounded-full text-[10px] font-black bg-white/10 hover:bg-white/20 text-white transition-all">
                    スライドへ戻る
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 30 },
                  opacity: { duration: 0.4 },
                  filter: { duration: 0.4 }
                }}
                className="flex-1 flex flex-col"
              >
                {/* Header Accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-bl-[5rem] -z-10" />
                
                <div className="p-10 pb-6 text-center">
                  <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">Topic Overview</span>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-[1.1]">
                    {currentSlide.title}
                  </h3>
                </div>

                <div className="px-10 pb-12 flex-1 overflow-y-auto premium-content">
                  <div 
                    className="prose prose-slate max-w-none 
                      prose-p:text-slate-600 prose-p:text-lg prose-p:leading-relaxed
                      prose-strong:text-slate-900 prose-strong:font-black
                      prose-ul:space-y-4 prose-li:text-slate-600"
                    dangerouslySetInnerHTML={{ __html: currentSlide.content }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Control Experience */}
      <div className="flex gap-6 px-2">
        <button
          className="flex-1 h-20 rounded-3xl text-slate-400 hover:text-slate-900 font-bold transition-all flex items-center justify-center gap-2 hover:bg-slate-50 disabled:opacity-0"
          onClick={prevSlide}
          disabled={currentSlideIndex === 0 || showVideo}
        >
          <ChevronLeft className="w-6 h-6" /> 
          <span className="hidden sm:inline">PREV</span>
        </button>
        
        <button
          className={cn(
            "flex-[3] h-20 rounded-[2rem] font-black text-xl shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25)] transition-all active:scale-[0.97] flex items-center justify-center gap-3",
            isLastSlide && !showTest 
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          )}
          onClick={nextSlide}
          disabled={showVideo}
        >
          {isLastSlide ? (showTest ? "理解度テストを開始する" : "受講を完了する") : "次のステップへ"}
          {!isLastSlide && <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />}
        </button>
      </div>
    </div>
  );
}