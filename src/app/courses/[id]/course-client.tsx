"use client";

import { useState } from "react";
import { SlidePlayer } from "@/components/slide-player";
import { ComprehensionTest } from "@/components/comprehension-test";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight, Lightbulb, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: string;
  title: string;
  content: string;
  order: number;
}

interface Question {
  id: string;
  text: string;
  explanation: string | null;
  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}

interface CourseClientProps {
  courseId: string;
  title: string;
  introduction: string | null;
  learningObjectives: string | null;
  slides: Slide[];
  questions: Question[];
  courseVideoUrl: string | null;
  isInitialCompleted: boolean;
  initialActionPlan: string | null;
  onComplete: () => Promise<void>;
  onSubmitTest: (answers: Record<string, string>) => Promise<{ isPassed: boolean; score: number; total: number }>;
  onSaveActionPlan: (actionPlan: string) => Promise<void>;
}

export function CourseClient({
  courseId,
  title,
  introduction,
  learningObjectives,
  slides,
  questions,
  courseVideoUrl,
  isInitialCompleted,
  initialActionPlan,
  onComplete,
  onSubmitTest,
  onSaveActionPlan,
}: CourseClientProps) {
  const [view, setView] = useState<"intro" | "objectives" | "learning" | "test" | "action_plan" | "completed">(
    isInitialCompleted ? "completed" : introduction ? "intro" : learningObjectives ? "objectives" : slides.length > 0 ? "learning" : questions.length > 0 ? "test" : "learning"
  );
  const [actionPlan, setActionPlan] = useState(initialActionPlan || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLearningComplete = () => {
    if (questions.length > 0) {
      setView("test");
    } else {
      setView("action_plan");
    }
  };

  const handleSaveActionPlan = async () => {
    if (!actionPlan.trim()) return;
    setIsSubmitting(true);
    try {
      await onSaveActionPlan(actionPlan);
      setView("completed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 1.02, transition: { duration: 0.3 } }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-slate-50">
      <AnimatePresence mode="wait">
        {view === "intro" && introduction && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full flex flex-col items-center justify-start pt-2 bg-slate-50">
            <div className="w-full max-w-5xl px-4 py-2">
              <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: introduction }} />
            </div>
            <Button className="mt-4 w-full max-w-xl h-16 shrink-0 rounded-[2.5rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl shadow-2xl shadow-blue-200 group transition-all" onClick={() => setView(learningObjectives ? "objectives" : "learning")}>
              研修を開始する <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>
        )}

        {view === "objectives" && learningObjectives && (
          <motion.div key="objectives" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full flex flex-col items-center justify-start pt-2 bg-slate-50">
            <div className="w-full max-w-5xl px-4 py-2">
              <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: learningObjectives }} />
            </div>
            <div className="mt-4 w-full max-w-xl shrink-0">
              <Button className="w-full h-16 rounded-[2.5rem] bg-slate-900 text-white hover:bg-black font-black text-2xl shadow-2xl shadow-slate-200 group" onClick={() => setView("learning")}>
                学習プログラムへ進む <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>
        )}

        {view === "learning" && (
          <motion.div key="learning" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full">
            <SlidePlayer slides={slides} courseVideoUrl={courseVideoUrl} onComplete={handleLearningComplete} showTest={questions.length > 0} />
          </motion.div>
        )}

        {view === "test" && (
          <motion.div key="test" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full flex flex-col">
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              <ComprehensionTest courseId={courseId} questions={questions} onSubmit={async (answers) => {
                const result = await onSubmitTest(answers);
                if (result.isPassed) setView("action_plan");
                return result;
              }} />
            </div>
          </motion.div>
        )}

        {view === "action_plan" && (
          <motion.div key="action_plan" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full flex flex-col items-center">
            <div className="flex-1 min-h-0 w-full max-w-4xl bg-white border border-slate-200 rounded-[3rem] p-8 lg:p-12 shadow-2xl overflow-y-auto mb-6">
              <div className="flex flex-col items-center text-center space-y-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h4 className="text-3xl font-black text-slate-900 tracking-tight">明日からの行動宣言</h4>
                <p className="text-slate-500 font-bold text-sm">学んだことを、現場でどう活かしますか？</p>
              </div>
              <textarea 
                className="w-full h-40 p-8 rounded-[2rem] bg-slate-50 border-2 border-slate-100 text-slate-900 text-xl font-black focus:border-blue-500 focus:ring-0 transition-all resize-none placeholder:text-slate-300 shadow-inner"
                placeholder="例：言葉遣いを丁寧にします。"
                value={actionPlan} 
                onChange={(e) => setActionPlan(e.target.value)} 
              />
            </div>
            <Button className="w-full max-w-2xl h-16 shrink-0 rounded-[2.5rem] bg-slate-900 hover:bg-black text-white font-black text-xl shadow-2xl shadow-slate-200 group transition-all active:scale-95" onClick={handleSaveActionPlan} disabled={!actionPlan.trim() || isSubmitting}>
              <span>{isSubmitting ? "送信中..." : "宣言を確定して修了する"}</span>
              <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}

        {view === "completed" && (
          <motion.div key="completed" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="h-full flex flex-col items-center justify-center text-center">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 scale-150 animate-pulse"></div>
              <div className="w-32 h-32 bg-emerald-500 rounded-[3rem] flex items-center justify-center relative z-10 shadow-2xl shadow-emerald-200 rotate-6 transition-transform hover:rotate-0 duration-500">
                <Award className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="space-y-4 mb-12 relative z-10">
              <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">研修課程を修了しました</h3>
              <p className="text-slate-500 font-bold text-lg max-w-md mx-auto">
                大変お疲れ様でした。学んだ知識を活かし、<br/>より良いケアを目指しましょう。
              </p>
            </div>
            <Button variant="outline" className="rounded-full px-12 h-14 border-slate-200 text-slate-500 hover:text-slate-900 font-black text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-slate-50 transition-all" onClick={() => setView("intro")}>
              最初からもう一度見る
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
