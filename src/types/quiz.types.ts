/**
 * Quiz Types - Psychometric Estimation Quiz
 * Based on AI_ESTIMATOR_QUIZ_V2.md specification
 */

// ============================================================
// ARCHETYPE TYPES
// ============================================================

export type ArchetypeKey = "visionary" | "analyst" | "negotiator" | "protector";

export interface Archetype {
  key: ArchetypeKey;
  title: string;
  summary: string;
  strengths: string[];
  risks: string[];
  ai_support: string[];
  pain_points: string[];
}

// ============================================================
// QUESTION TYPES
// ============================================================

export type QuestionType = "single_choice" | "multiple_choice";

export interface OptionWeights {
  visionary?: number;
  analyst?: number;
  negotiator?: number;
  protector?: number;
}

export interface QuestionOption {
  id: string;
  label: string;
  weights: OptionWeights;
}

export interface Question {
  id: string;
  title: string;
  helper: string;
  type: QuestionType;
  max_selections?: number; // for multiple_choice
  options: QuestionOption[];
}

// ============================================================
// ANSWER TYPES
// ============================================================

export interface SingleChoiceAnswer {
  question_id: string;
  option_id: string;
}

export interface MultipleChoiceAnswer {
  question_id: string;
  option_ids: string[];
}

export type QuizAnswer = SingleChoiceAnswer | MultipleChoiceAnswer;

// ============================================================
// SCORING TYPES
// ============================================================

export interface ArchetypeScores {
  visionary: number;
  analyst: number;
  negotiator: number;
  protector: number;
}

export interface TieBreakerMapping {
  question_id: string;
  mapping: Record<string, ArchetypeKey>;
}

export interface ScoringRules {
  method: "sum_weights_per_archetype";
  tie_breakers: TieBreakerMapping[];
  hybrid_threshold: number;
}

// ============================================================
// RESULT TYPES
// ============================================================

export interface QuizResult {
  primary_archetype: ArchetypeKey;
  secondary_archetype?: ArchetypeKey; // if within threshold
  scores: ArchetypeScores;
  is_hybrid: boolean;
  archetype_data: Archetype;
}

// ============================================================
// HELPER TYPE GUARDS
// ============================================================

export function isMultipleChoiceAnswer(
  answer: QuizAnswer
): answer is MultipleChoiceAnswer {
  return "option_ids" in answer;
}

export function isSingleChoiceAnswer(
  answer: QuizAnswer
): answer is SingleChoiceAnswer {
  return "option_id" in answer;
}

