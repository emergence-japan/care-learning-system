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
    <div className="w-full h-full flex flex-col items-center bg-[#fffdf0]">
      <AnimatePresence mode="wait">
        {view === "intro" && introduction && (
          <motion.div key="intro" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full flex flex-col items-center justify-start pt-2">
            <div className="w-full max-w-5xl px-4 py-2">
              <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: introduction }} />
            </div>
            <Button className="mt-4 w-full max-w-xl h-16 shrink-0 rounded-[2.5rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl shadow-2xl shadow-blue-200 group transition-all" onClick={() => setView(learningObjectives ? "objectives" : "learning")}>
              研修を開始する <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>
        )}

        {view === "objectives" && learningObjectives && (
          <motion.div key="objectives" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full flex flex-col items-center justify-start pt-2">
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
            <div className="flex-1 min-h-0 w-full max-w-4xl bg-[#1e293b] border border-slate-800 rounded-[3rem] p-8 lg:p-12 shadow-2xl overflow-y-auto mb-6">
              <h4 className="text-3xl font-black text-white mb-6 text-center">明日からの行動宣言</h4>
              <textarea 
                className="w-full h-40 p-8 rounded-[2rem] bg-slate-900 border-2 border-slate-800 text-white text-xl font-medium focus:border-blue-500 focus:ring-0 transition-all resize-none"
                placeholder="例：言葉遣いを丁寧にします。"
                value={actionPlan} 
                onChange={(e) => setActionPlan(e.target.value)} 
              />
            </div>
            <Button className="w-full max-w-2xl h-16 shrink-0 rounded-[2rem] bg-blue-600 text-white font-black text-2xl shadow-xl" onClick={handleSaveActionPlan} disabled={!actionPlan.trim() || isSubmitting}>
              {isSubmitting ? "送信中..." : "宣言を確定して修了する"}
            </Button>
          </motion.div>
        )}

        {view === "completed" && (
          <motion.div key="completed" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="h-full flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 ring-1 ring-emerald-500/20">
              <Award className="w-16 h-16 text-emerald-400" />
            </div>
            <h3 className="text-4xl font-black text-white mb-8">研修課程を修了しました</h3>
            <Button variant="outline" className="rounded-full px-12 h-14 border-slate-800 text-slate-400 hover:text-white" onClick={() => setView("intro")}>最初からもう一度見る</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
