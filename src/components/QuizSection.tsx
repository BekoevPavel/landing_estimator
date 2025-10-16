import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Loader2, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { QUIZ_QUESTIONS } from "../data/quiz.data";
import { calculateQuizResult } from "../services/quiz.service";
import { QUIZ_CONSTANTS, ARCHETYPE_KEYS } from "../constants/quiz.constants";
import {
  QuizAnswer,
  QuizResult,
  Archetype,
  ArchetypeKey,
  Question as QuestionType,
} from "../types/quiz.types";

interface QuizSectionProps {
  onComplete: (result: QuizResult) => void;
  key?: string;
}

interface LocalizedQuestion {
  id: string;
  title: string;
  helper: string;
  type: "single_choice" | "multiple_choice";
  max_selections?: number;
  options: Array<{ id: string; label: string }>;
}

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get localized questions
  const localizedQuestions = t("quiz.questions", {
    returnObjects: true,
  }) as LocalizedQuestion[];

  const question = localizedQuestions[currentQuestion];
  const questionData = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / localizedQuestions.length) * 100;

  const isMultipleChoice = question.type === "multiple_choice";
  const maxSelections = question.max_selections || QUIZ_CONSTANTS.MAX_MULTIPLE_SELECTIONS;

  // Handle single choice answer
  const handleSingleAnswer = (optionId: string) => {
    setIsProcessing(true);

    const answer: QuizAnswer = {
      question_id: question.id,
      option_id: optionId,
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    setTimeout(() => {
      setIsProcessing(false);
      moveToNextQuestion(newAnswers);
    }, QUIZ_CONSTANTS.TRANSITION_DELAY_MS);
  };

  // Handle multiple choice selection
  const handleMultipleToggle = (optionId: string) => {
    if (selectedMultiple.includes(optionId)) {
      setSelectedMultiple(selectedMultiple.filter((id) => id !== optionId));
    } else {
      if (selectedMultiple.length < maxSelections) {
        setSelectedMultiple([...selectedMultiple, optionId]);
      }
    }
  };

  // Confirm multiple choice answer
  const handleMultipleConfirm = () => {
    if (selectedMultiple.length === 0) return;

    setIsProcessing(true);

    const answer: QuizAnswer = {
      question_id: question.id,
      option_ids: selectedMultiple,
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    setTimeout(() => {
      setIsProcessing(false);
      setSelectedMultiple([]);
      moveToNextQuestion(newAnswers);
    }, QUIZ_CONSTANTS.TRANSITION_DELAY_MS);
  };

  // Move to next question or calculate result
  const moveToNextQuestion = (currentAnswers: QuizAnswer[]) => {
    if (currentQuestion < localizedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateAndShowResult(currentAnswers);
    }
  };

  // Type guard for ArchetypeKey validation
  const isArchetypeKey = (key: string): key is ArchetypeKey => {
    return ARCHETYPE_KEYS.includes(key as ArchetypeKey);
  };

  // Calculate final result
  const calculateAndShowResult = (finalAnswers: QuizAnswer[]) => {
    const archetypes = t("quiz.archetypes", {
      returnObjects: true,
    }) as Record<string, Archetype>;

    const archetypesArray: Archetype[] = Object.entries(archetypes)
      .filter(([key]) => isArchetypeKey(key))
      .map(([key, data]) => ({
        key: key as ArchetypeKey, // Safe after filter
        ...data,
      }));

    // Map localized questions to Question type with weights
    const questionsWithWeights: QuestionType[] = QUIZ_QUESTIONS;

    const result = calculateQuizResult(
      finalAnswers,
      questionsWithWeights,
      archetypesArray
    );

    onComplete(result);
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
              {t("quiz.progress", {
                current: currentQuestion + 1,
                total: localizedQuestions.length,
              })}
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
            <h2 className="mb-3">{question.title}</h2>
            <p className="text-sm text-muted-foreground mb-8">
              {question.helper}
            </p>

            {/* Single Choice Options */}
            {!isMultipleChoice && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSingleAnswer(option.id)}
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
            )}

            {/* Multiple Choice Options */}
            {isMultipleChoice && (
              <>
                <div className="space-y-3 mb-6">
                  {question.options.map((option, index) => {
                    const isSelected = selectedMultiple.includes(option.id);
                    return (
                      <motion.button
                        key={option.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleMultipleToggle(option.id)}
                        disabled={
                          isProcessing ||
                          (!isSelected && selectedMultiple.length >= maxSelections)
                        }
                        className={`w-full p-4 rounded-2xl border transition-all duration-200 text-left disabled:cursor-not-allowed ${
                          isSelected
                            ? "bg-primary/10 border-primary"
                            : "bg-secondary/50 hover:bg-secondary border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option.label}</span>
                          {isSelected && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {selectedMultiple.length} / {maxSelections} selected
                  </span>
                  <Button
                    onClick={handleMultipleConfirm}
                    disabled={selectedMultiple.length === 0 || isProcessing}
                    className="px-6"
                  >
                    Continue
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </>
            )}

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
