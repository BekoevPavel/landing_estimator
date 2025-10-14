import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface QuizSectionProps {
  onComplete: () => void;
  key?: string;
}

const questions = [
  {
    id: 1,
    question: "How do you usually estimate project timelines?",
    helper: "Understanding your current approach helps us calibrate the AI team",
    options: [
      { label: "Gut feeling & experience", value: "intuition" },
      { label: "Historical data analysis", value: "data" },
      { label: "Team consensus meetings", value: "consensus" },
      { label: "Third-party tools", value: "tools" },
    ],
  },
  {
    id: 2,
    question: "How confident are your current estimates?",
    helper: "This helps us understand where you need the most support",
    options: [
      { label: "Very confident - rarely off", value: "high" },
      { label: "Moderately confident", value: "medium" },
      { label: "Not very confident", value: "low" },
      { label: "I avoid giving estimates", value: "avoid" },
    ],
  },
  {
    id: 3,
    question: "What causes overruns most often?",
    helper: "The AI team will analyze these risk factors in your projects",
    options: [
      { label: "Unclear requirements", value: "requirements" },
      { label: "Technical complexity", value: "technical" },
      { label: "Scope creep", value: "scope" },
      { label: "Team capacity issues", value: "capacity" },
    ],
  },
  {
    id: 4,
    question: "Do you factor design or QA in estimates?",
    helper: "Our AI team includes specialists for complete coverage",
    options: [
      { label: "Always - it's built in", value: "always" },
      { label: "Sometimes", value: "sometimes" },
      { label: "Rarely", value: "rarely" },
      { label: "Never - just development", value: "never" },
    ],
  },
  {
    id: 5,
    question: "What's your biggest estimation pain point?",
    helper: "Your final answer - let's identify where AI can help most",
    options: [
      { label: "Taking too much time", value: "time" },
      { label: "Lack of historical data", value: "data" },
      { label: "Stakeholder pressure", value: "pressure" },
      { label: "Unknown unknowns", value: "unknowns" },
    ],
  },
];

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({} as Record<number, string>);
  const [isProcessing, setIsProcessing] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
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
              Question {currentQuestion + 1} of {questions.length}
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
                <span>Got it — the AI team is analyzing your input…</span>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
