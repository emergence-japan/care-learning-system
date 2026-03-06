"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, FileText, PlayCircle } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"slide" | "video">("slide");
  const [direction, setDirection] = useState(0);

  const currentSlide = slides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === slides.length - 1;
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  // スクロールを無効にするスライドのインデックス (0始まり)
  const nonScrollableIndices = [0, 3, 11, 15, 19, 20, 21];
  const isScrollDisabled = nonScrollableIndices.includes(currentSlideIndex);

  const nextSlide = () => {
    if (!isLastSlide) {
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
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : "";
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 30 : -30, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 30 : -30, opacity: 0 }),
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-start space-y-2 lg:space-y-4 bg-slate-50">

      {/* 1. Tab + Progress Bar */}
      <div className="shrink-0 w-full space-y-0">
        {/* Tabs - only show when video exists */}
        {courseVideoUrl && (
          <div className="flex px-4 pt-2 gap-2">
            <button
              onClick={() => setActiveTab("slide")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black transition-all",
                activeTab === "slide"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-400 hover:text-slate-700"
              )}
            >
              <FileText className="w-3.5 h-3.5" />
              スライド
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={cn(
                "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black transition-all",
                activeTab === "video"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-400 hover:text-slate-700"
              )}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              動画
            </button>
          </div>
        )}
        {/* Progress Bar - only for slides */}
        {activeTab === "slide" && (
          <div className="w-full bg-slate-200 h-1 overflow-hidden rounded-full mt-2">
            <motion.div className="bg-blue-600 h-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {/* 2. Main Area */}
      <div className="flex-1 min-h-0 w-full flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-8">

        {/* Video Tab */}
        {activeTab === "video" && courseVideoUrl && (
          <div className="w-full lg:max-w-5xl">
            <div className="relative w-full aspect-video bg-black rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={getYouTubeEmbedUrl(courseVideoUrl)}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Slide Tab */}
        {activeTab === "slide" && (
          <>
            {/* Slide Container */}
            <div className="flex-1 w-full h-full lg:max-w-5xl bg-white border border-slate-200 rounded-[2rem] lg:rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl relative order-1 lg:order-2">
              <div className="shrink-0 px-5 lg:px-6 py-2 lg:py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h4 className="font-black text-slate-900 text-[10px] lg:text-xs uppercase tracking-widest truncate pr-4">{currentSlide.title}</h4>
                <span className="text-[10px] font-mono text-slate-400 tracking-widest">{(currentSlideIndex + 1).toString().padStart(2, '0')} / {slides.length}</span>
              </div>
              <div className={cn(
                "flex-1 relative flex flex-col justify-center",
                isScrollDisabled ? "overflow-hidden" : "overflow-y-auto custom-scrollbar"
              )}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentSlide.id}
                    custom={direction}
                    variants={variants}
                    transition={{ duration: 0.3 }}
                    className="p-5 lg:p-10 w-full"
                  >
                    <div className="max-w-4xl mx-auto">
                      <div
                        className="prose prose-slate max-w-none
                          prose-p:text-slate-700 prose-p:text-sm lg:prose-p:text-xl prose-p:leading-relaxed
                          prose-strong:text-blue-600
                          prose-ul:space-y-2 lg:prose-ul:space-y-4 prose-li:text-slate-700 prose-li:text-xs lg:prose-li:text-lg prose-ul:inline-block prose-ul:text-left
                          prose-h4:text-base lg:prose-h4:text-3xl prose-h4:font-black prose-h4:text-slate-900 prose-h4:mb-4"
                        style={{ maxWidth: 'none' }}
                        dangerouslySetInnerHTML={{ __html: currentSlide.content }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex w-full lg:w-auto lg:contents justify-between items-center px-4 lg:px-0 order-2 lg:order-none shrink-0 pb-2 lg:pb-0">
              <button
                className={cn(
                  "w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 lg:order-1 shrink-0",
                  "bg-white border border-slate-200 text-slate-400 hover:text-blue-600 shadow-md",
                  currentSlideIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
              >
                <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
              </button>
              <button
                className={cn(
                  "w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl lg:order-3 shrink-0",
                  "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/20",
                  "hover:scale-110 active:scale-95",
                  isLastSlide ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
                onClick={nextSlide}
                disabled={isLastSlide}
              >
                <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* 3. テストに進むボタン */}
      <div className="shrink-0 w-full px-4 pb-3">
        <button
          onClick={onComplete}
          className="w-full h-12 rounded-[2rem] bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-sm tracking-wide shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2"
        >
          理解度テストに進む
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
