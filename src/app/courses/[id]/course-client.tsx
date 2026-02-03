"use client";

import { useState } from "react";
import { SlidePlayer } from "@/components/slide-player";
import { ComprehensionTest } from "@/components/comprehension-test";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, ArrowRight, Sparkles, Target, Lightbulb } from "lucide-react";
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
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  if (view === "completed") {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 py-4">
        <div className="relative bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-emerald-400" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-emerald-50 p-6 rounded-full mb-6 ring-8 ring-emerald-50/50">
              <Award className="w-16 h-16 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">研修課程を修了しました</h3>
            <div className="my-10 w-full border-y border-slate-50 py-8 flex flex-col items-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Your Action Plan</p>
              <p className="text-xl font-bold text-slate-800 italic px-4 leading-relaxed">「{actionPlan || initialActionPlan}」</p>
            </div>
            <Button variant="outline" className="rounded-full px-8 h-12 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold" onClick={() => setView("intro")}>
              最初からもう一度見る
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {view === "intro" && introduction && (
        <motion.div key="intro" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
          <div className="bg-white border border-blue-100 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(59,130,246,0.08)] relative">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
              <Lightbulb className="w-48 h-48 text-blue-600" />
            </div>
            <div className="p-8 border-b border-blue-50 bg-blue-50/30 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <h3 className="font-bold text-[10px] uppercase tracking-widest text-blue-600/70">Introduction</h3>
            </div>
            <div className="p-10 pt-12">
              <div 
                className="prose prose-slate max-w-none 
                  prose-p:text-slate-600 prose-p:text-lg prose-p:leading-relaxed
                  prose-strong:text-blue-900 prose-strong:font-bold"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            </div>
          </div>
          <Button 
            className="w-full h-20 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl shadow-xl shadow-blue-100 group transition-all"
            onClick={() => setView(learningObjectives ? "objectives" : "learning")}
          >
            研修をはじめる <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
          </Button>
        </motion.div>
      )}

      {view === "objectives" && learningObjectives && (
        <motion.div key="objectives" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
              <Target className="w-5 h-5 text-slate-900" />
              <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400">Objectives</h3>
            </div>
            <div className="p-10">
              <p className="text-blue-600 font-bold mb-8 text-sm border-l-4 border-blue-600 pl-4">この研修を終えたとき、あなたは以下の姿を目指します。</p>
              <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: learningObjectives }} />
            </div>
          </div>
          <div className="space-y-4">
            <Button 
              className="w-full h-20 rounded-[1.5rem] bg-slate-900 text-white hover:bg-slate-800 font-bold text-xl shadow-xl transition-all"
              onClick={() => setView("learning")}
            >
              学習を開始する <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
            </Button>
            <Button variant="ghost" className="w-full text-slate-400 font-bold" onClick={() => setView("intro")}>前に戻る</Button>
          </div>
        </motion.div>
      )}

      {view === "learning" && (
        <motion.div key="learning" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
          <SlidePlayer slides={slides} courseVideoUrl={courseVideoUrl} onComplete={handleLearningComplete} showTest={questions.length > 0} />
        </motion.div>
      )}

      {view === "test" && (
        <motion.div key="test" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
          <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-slate-900">理解度テスト</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 font-bold" onClick={() => setView("learning")}>スライドに戻る</Button>
          </div>
          <ComprehensionTest 
            courseId={courseId} 
            questions={questions} 
            onSubmit={async (answers) => {
              const result = await onSubmitTest(answers);
              if (result.isPassed) setView("action_plan");
              return result;
            }}
          />
        </motion.div>
      )}

      {view === "action_plan" && (
        <motion.div key="action_plan" variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
          <div className="bg-white border border-blue-100 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(59,130,246,0.08)]">
            <div className="p-8 border-b border-blue-50 bg-blue-50/30">
              <h3 className="font-bold text-[10px] uppercase tracking-widest text-blue-600/70">Next Step: Action Plan</h3>
            </div>
            <div className="p-10 space-y-8">
              <div className="space-y-3">
                <h4 className="text-2xl font-bold text-slate-900 leading-tight">明日からの行動を、<br/>自分の言葉で宣言しましょう。</h4>
                <p className="text-slate-500 font-medium">具体的なアクションを1つ、決めてください。</p>
              </div>
              <textarea
                className="w-full h-40 p-6 rounded-[1.5rem] bg-slate-50 border-2 border-slate-100 focus:border-blue-500 focus:bg-white focus:ring-0 transition-all resize-none text-slate-800 text-lg font-medium placeholder:text-slate-300"
                placeholder="例：言葉遣いを一つずつ丁寧にし、利用者様と目を合わせて挨拶します。"
                value={actionPlan}
                onChange={(e) => setActionPlan(e.target.value)}
              />
            </div>
          </div>
          <Button 
            className="w-full h-20 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl shadow-xl shadow-blue-100 disabled:opacity-30 transition-all"
            onClick={handleSaveActionPlan}
            disabled={!actionPlan.trim() || isSubmitting}
          >
            {isSubmitting ? "送信中..." : "宣言を確定して修了する"}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
