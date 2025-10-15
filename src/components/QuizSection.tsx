import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface QuizSectionProps {
  onComplete: () => void;
  key?: string;
}

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({} as Record<number, string>);
  const [isProcessing, setIsProcessing] = useState(false);

  const questions = t("quiz.questions", { returnObjects: true }) as Array<{
    question: string;
    helper: string;
    options: Array<{ label: string; value: string }>;
  }>;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete();
      }
    }, 800);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">
              {t("quiz.progress", { current: currentQuestion + 1, total: questions.length })}
            </span>
            <span className="text-sm text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12"
          >
            <h2 className="mb-3">{question.question}</h2>
            <p className="text-sm text-muted-foreground mb-8">
              {question.helper}
            </p>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option.value)}
                  disabled={isProcessing}
                  className="w-full p-4 rounded-2xl bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/50 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>

            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 flex items-center gap-2 text-sm text-primary"
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t("quiz.processing")}</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
