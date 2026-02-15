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
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-bold text-lg text-zinc-900">理解度テスト</h3>
        <span className="text-sm font-medium text-zinc-500">
          設問 {currentStep + 1} / {totalQuestions}
        </span>
      </div>

      <Card className="border-zinc-100 shadow-sm rounded-2xl overflow-hidden">
        <CardHeader className="bg-zinc-50/50 p-6">
          <CardTitle className="text-lg leading-snug font-bold">
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          {currentQuestion.choices.map((choice) => {
            const isSelected = currentSelectedChoiceId === choice.id;
            const showCorrect = showExplanation && choice.isCorrect;
            const showWrong = showExplanation && isSelected && !choice.isCorrect;

            return (
              <button
                key={choice.id}
                disabled={showExplanation}
                onClick={() => handleChoiceSelect(currentQuestion.id, choice.id)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all flex items-center justify-between ${
                  showCorrect
                    ? "border-green-500 bg-green-50 text-green-900 shadow-sm"
                    : showWrong
                    ? "border-red-500 bg-red-50 text-red-900 shadow-sm"
                    : isSelected
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-md"
                    : "border-zinc-100 bg-white text-zinc-700 hover:border-zinc-200"
                }`}
              >
                <span className="font-medium text-sm">{choice.text}</span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 ml-2" />}
                {showWrong && <AlertCircle className="w-5 h-5 text-red-600 shrink-0 ml-2" />}
              </button>
            );
          })}

          {showExplanation && (
            <div className="mt-6 p-5 bg-zinc-900 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 mb-2 text-white/70">
                <ChevronRight className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">解説</span>
              </div>
              <p className="text-sm text-white leading-relaxed">
                {currentQuestion.explanation || "この問題の解説はありません。"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {!showExplanation ? (
        <Button
          disabled={!currentSelectedChoiceId}
          onClick={handleCheckAnswer}
          className="w-full h-14 text-xl font-bold bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl shadow-lg disabled:opacity-30 transition-all"
        >
          回答を確認する
        </Button>
      ) : (
        <Button
          onClick={handleNext}
          className="w-full h-14 text-xl font-bold bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl shadow-lg animate-in zoom-in duration-200"
        >
          {currentStep < totalQuestions - 1 ? "次の問題へ" : "結果を確認する"}
        </Button>
      )}
    </div>
  );
}