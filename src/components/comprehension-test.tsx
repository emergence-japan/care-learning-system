"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, ChevronRight, AlertCircle, Sparkles, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

type Choice = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: string;
  text: string;
  explanation: string | null;
  choices: Choice[];
};

type Props = {
  courseId: string;
  questions: Question[];
  onSubmit: (answers: Record<string, string>) => Promise<{ isPassed: boolean; score: number; total: number }>;
};

export function ComprehensionTest({ courseId, questions, onSubmit }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState({ current: 0, total: 0 });

  const currentQuestion = questions[currentStep];
  const totalQuestions = questions.length;
  const currentSelectedChoiceId = selectedChoices[currentQuestion.id];
  const isCorrect = currentQuestion.choices.find(c => c.id === currentSelectedChoiceId)?.isCorrect;

  const handleChoiceSelect = (questionId: string, choiceId: string) => {
    if (showExplanation) return; // 解説表示中は選択不可
    setSelectedChoices((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const handleNext = async () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
      setShowExplanation(false);
    } else {
      // サーバーへ送信して最終検証
      setIsSubmitting(true);
      try {
        const result = await onSubmit(selectedChoices);
        setIsPassed(result.isPassed);
        setScore({ current: result.score, total: result.total });
        setShowResult(true);

        if (result.isPassed) {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4f46e5', '#10b981', '#f59e0b']
          });
        }
      } catch (error) {
        console.error(error);
        alert("送信中にエラーが発生しました。");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (showResult) {
    return (
      <Card className="border-none rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] animate-in fade-in zoom-in duration-500 bg-white">
        <CardContent className="p-12 text-center space-y-8 relative">
          {isPassed ? (
            <>
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Trophy className="w-48 h-48 text-indigo-600" />
              </div>
              <div className="flex justify-center relative">
                <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 scale-150 animate-pulse" />
                <div className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-emerald-200 relative z-10 rotate-3">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="space-y-3 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
                  <Sparkles className="w-3 h-3" /> Excellent
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">おめでとうございます！</h3>
                <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto text-sm">
                  理解度テストに合格しました。<br/>この研修の内容がしっかりと身についています。
                </p>
              </div>
              <Button 
                onClick={() => window.location.reload()}
                className="w-full h-16 text-lg font-black bg-slate-900 hover:bg-slate-800 text-white rounded-3xl shadow-2xl shadow-slate-200 transition-all active:scale-95 group"
              >
                <span>学習を完了する</span>
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <XCircle className="w-20 h-20 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900">もう一度復習しましょう</h3>
              <p className="text-zinc-600">
                {score.total}問中{score.current}問の正解でした。全問正解で合格となります。解説を読み直して再挑戦しましょう。
              </p>
              <Button 
                onClick={() => {
                  setShowResult(false);
                  setCurrentStep(0);
                  setSelectedChoices({});
                  setShowExplanation(false);
                }} 
                className="w-full h-14 text-xl font-bold bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl"
              >
                最初からやり直す
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3 animate-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
      <div className="flex items-center justify-between px-2 shrink-0">
        <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
          <span className="w-2 h-6 bg-slate-900 rounded-full"></span>
          理解度テスト
        </h3>
        <span className="text-sm font-black text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full">
          設問 {currentStep + 1} / {totalQuestions}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* 左側：問題文エリア */}
        <Card className="border-2 border-slate-200 shadow-2xl shadow-slate-200/40 rounded-[2.5rem] bg-white overflow-hidden flex flex-col min-h-0 shrink-0 lg:shrink">
          <CardHeader className="bg-slate-50/50 p-6 lg:p-8 flex-1 flex flex-col justify-center overflow-y-auto">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Question</div>
            <CardTitle className="text-xl lg:text-2xl leading-snug font-black text-slate-900 text-balance">
              {currentQuestion.text}
            </CardTitle>
          </CardHeader>
          {showExplanation && (
            <div className="p-6 lg:p-8 bg-slate-900 animate-in fade-in slide-in-from-bottom-4 duration-500 shrink-0">
              <div className="flex items-center gap-2 mb-2 text-white/50">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">解説</span>
              </div>
              <p className="text-sm lg:text-base text-white font-bold leading-relaxed">
                {currentQuestion.explanation || "この問題の解説はありません。"}
              </p>
            </div>
          )}
        </Card>

        {/* 右側：選択肢エリア */}
        <div className="flex flex-col gap-2 justify-between bg-slate-50/50 p-3 lg:p-4 rounded-[2.5rem] min-h-0 lg:h-full">
          <div className="space-y-2 flex-1 flex flex-col justify-center lg:overflow-y-auto pr-1">
            {currentQuestion.choices.map((choice) => {
              const isSelected = currentSelectedChoiceId === choice.id;
              const showCorrect = showExplanation && choice.isCorrect;
              const showWrong = showExplanation && isSelected && !choice.isCorrect;

              return (
                <button
                  key={choice.id}
                  disabled={showExplanation}
                  onClick={() => handleChoiceSelect(currentQuestion.id, choice.id)}
                  className={`w-full p-4 lg:p-5 text-left rounded-2xl lg:rounded-3xl border-2 transition-all flex items-center justify-between group relative overflow-hidden shrink-0 ${
                    showCorrect
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-lg shadow-emerald-100"
                      : showWrong
                      ? "border-rose-500 bg-rose-50 text-rose-900 shadow-lg shadow-rose-100"
                      : isSelected
                      ? "border-slate-900 bg-slate-900 text-white shadow-xl scale-[1.01]"
                      : "border-white bg-white text-slate-700 hover:border-slate-200 hover:shadow-lg shadow-sm"
                  }`}
                >
                  <span className="font-black text-sm lg:text-base relative z-10 pr-4">{choice.text}</span>
                  <div className="relative z-10 shrink-0">
                    {showCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-in zoom-in duration-300" />}
                    {showWrong && <AlertCircle className="w-6 h-6 text-rose-600 animate-in zoom-in duration-300" />}
                    {!showExplanation && isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2 shrink-0">
            {!showExplanation ? (
              <Button
                disabled={!currentSelectedChoiceId}
                onClick={handleCheckAnswer}
                className="w-full h-14 lg:h-16 text-lg lg:text-xl font-black bg-slate-900 hover:bg-black text-white rounded-2xl lg:rounded-3xl shadow-2xl shadow-slate-200 disabled:opacity-20 disabled:scale-100 transition-all active:scale-95 group"
              >
                <span>回答を確認する</span>
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="w-full h-14 lg:h-16 text-lg lg:text-xl font-black bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl lg:rounded-3xl shadow-2xl shadow-emerald-200 animate-in zoom-in duration-300 group"
              >
                <span>{currentStep < totalQuestions - 1 ? "次の問題へ" : "結果を確認する"}</span>
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}