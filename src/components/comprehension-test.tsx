"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, ChevronRight } from "lucide-react";

type Choice = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: string;
  text: string;
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
  const [showResult, setShowResult] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState({ current: 0, total: 0 });

  const currentQuestion = questions[currentStep];
  const totalQuestions = questions.length;

  const handleChoiceSelect = (questionId: string, choiceId: string) => {
    setSelectedChoices((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const handleNext = async () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // サーバーへ送信して検証
      setIsSubmitting(true);
      try {
        const result = await onSubmit(selectedChoices);
        setIsPassed(result.isPassed);
        setScore({ current: result.score, total: result.total });
        setShowResult(true);
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
      <Card className="border-2 rounded-2xl overflow-hidden shadow-lg animate-in fade-in zoom-in duration-300">
        <CardContent className="p-8 text-center space-y-6">
          {isPassed ? (
            <>
              <div className="flex justify-center">
                <CheckCircle2 className="w-20 h-20 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900">合格です！</h3>
              <p className="text-zinc-600">
                おめでとうございます！ {score.total}問中{score.current}問正解しました。研修受講を完了として記録しました。
              </p>
              <Button 
                onClick={() => window.location.href = "/"}
                className="w-full h-14 text-xl font-bold bg-green-600 hover:bg-green-700 text-white rounded-2xl"
              >
                ダッシュボードに戻る
              </Button>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <XCircle className="w-20 h-20 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900">もう一度復習しましょう</h3>
              <p className="text-zinc-600">
                残念ながら、{score.total}問中{score.current}問の正解でした。全問正解で合格となります。動画をもう一度確認して再挑戦しましょう。
              </p>
              <Button 
                onClick={() => {
                  setShowResult(false);
                  setCurrentStep(0);
                  setSelectedChoices({});
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
          <CardTitle className="text-xl leading-snug">
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          {currentQuestion.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleChoiceSelect(currentQuestion.id, choice.id)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all flex items-center justify-between ${
                selectedChoices[currentQuestion.id] === choice.id
                  ? "border-zinc-900 bg-zinc-900 text-white shadow-md"
                  : "border-zinc-100 bg-white text-zinc-700 hover:border-zinc-200"
              }`}
            >
              <span className="font-medium">{choice.text}</span>
              {selectedChoices[currentQuestion.id] === choice.id && (
                <ChevronRight className="w-5 h-5 opacity-70" />
              )}
            </button>
          ))}
        </CardContent>
      </Card>

      <Button
        disabled={!selectedChoices[currentQuestion.id]}
        onClick={handleNext}
        className="w-full h-14 text-xl font-bold bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl shadow-lg disabled:opacity-30 transition-all"
      >
        {currentStep < totalQuestions - 1 ? "次の問題へ" : "結果を確認する"}
      </Button>
    </div>
  );
}
