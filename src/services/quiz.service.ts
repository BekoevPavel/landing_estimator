/**
 * Quiz Scoring Service
 * Implements psychometric scoring logic from AI_ESTIMATOR_QUIZ_V2.md
 */

import {
  ArchetypeKey,
  ArchetypeScores,
  QuizAnswer,
  QuizResult,
  Question,
  Archetype,
  TieBreakerMapping,
  isMultipleChoiceAnswer,
  isSingleChoiceAnswer,
} from "../types/quiz.types";

// ============================================================
// SCORING CONFIGURATION
// ============================================================

const HYBRID_THRESHOLD = 1;

const TIE_BREAKERS: TieBreakerMapping[] = [
  {
    question_id: "q7",
    mapping: {
      q7_o1: "visionary",
      q7_o2: "analyst",
      q7_o3: "negotiator",
      q7_o4: "protector",
    },
  },
  {
    question_id: "q8",
    mapping: {
      q8_o4: "visionary",
      q8_o1: "analyst",
      q8_o3: "negotiator",
      q8_o2: "protector",
    },
  },
];

// ============================================================
// SCORING FUNCTIONS
// ============================================================

/**
 * Initialize empty scores for all archetypes
 */
function createEmptyScores(): ArchetypeScores {
  return {
    visionary: 0,
    analyst: 0,
    negotiator: 0,
    protector: 0,
  };
}

/**
 * Add weights to scores for a single option
 */
function addWeightsToScores(
  scores: ArchetypeScores,
  weights: Record<string, number>
): void {
  for (const [archetype, weight] of Object.entries(weights)) {
    if (archetype in scores) {
      scores[archetype as ArchetypeKey] += weight;
    }
  }
}

/**
 * Calculate total scores from all answers
 */
export function calculateScores(
  answers: QuizAnswer[],
  questions: Question[]
): ArchetypeScores {
  const scores = createEmptyScores();

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.question_id);
    if (!question) continue;

    if (isMultipleChoiceAnswer(answer)) {
      // Multiple choice: sum weights from all selected options
      for (const optionId of answer.option_ids) {
        const option = question.options.find((o) => o.id === optionId);
        if (option?.weights) {
          addWeightsToScores(scores, option.weights);
        }
      }
    } else if (isSingleChoiceAnswer(answer)) {
      // Single choice: add weights from selected option
      const option = question.options.find((o) => o.id === answer.option_id);
      if (option?.weights) {
        addWeightsToScores(scores, option.weights);
      }
    }
  }

  return scores;
}

/**
 * Find archetype(s) with highest score
 */
function findTopArchetypes(scores: ArchetypeScores): {
  first: { key: ArchetypeKey; score: number };
  second: { key: ArchetypeKey; score: number };
} {
  const entries = Object.entries(scores) as [ArchetypeKey, number][];
  const sorted = entries.sort((a, b) => b[1] - a[1]);

  return {
    first: { key: sorted[0][0], score: sorted[0][1] },
    second: { key: sorted[1][0], score: sorted[1][1] },
  };
}

/**
 * Apply tie-breaker rules to determine winner
 */
function applyTieBreaker(
  answers: QuizAnswer[],
  topArchetypes: { first: { key: ArchetypeKey }; second: { key: ArchetypeKey } }
): ArchetypeKey | null {
  for (const tieBreaker of TIE_BREAKERS) {
    const answer = answers.find((a) => a.question_id === tieBreaker.question_id);
    
    if (answer && isSingleChoiceAnswer(answer)) {
      const resolvedArchetype = tieBreaker.mapping[answer.option_id];
      if (resolvedArchetype) {
        return resolvedArchetype;
      }
    }
  }

  return null;
}

/**
 * Determine if result should be hybrid (close scores)
 */
function isHybridResult(
  firstScore: number,
  secondScore: number,
  threshold: number
): boolean {
  return Math.abs(firstScore - secondScore) <= threshold;
}

// ============================================================
// MAIN SCORING FUNCTION
// ============================================================

/**
 * Calculate quiz result from answers
 * 
 * @param answers - User's answers to quiz questions
 * @param questions - Quiz questions with weights
 * @param archetypes - Archetype definitions with descriptions
 * @returns Complete quiz result with primary/secondary archetypes
 */
export function calculateQuizResult(
  answers: QuizAnswer[],
  questions: Question[],
  archetypes: Archetype[]
): QuizResult {
  // Step 1: Calculate raw scores
  const scores = calculateScores(answers, questions);

  // Step 2: Find top 2 archetypes
  const { first, second } = findTopArchetypes(scores);

  // Step 3: Check for tie/near-tie
  const isNearTie = isHybridResult(first.score, second.score, HYBRID_THRESHOLD);

  let primaryArchetype = first.key;
  let secondaryArchetype: ArchetypeKey | undefined = undefined;
  let isHybrid = false;

  if (isNearTie) {
    // Apply tie-breaker rules
    const tieBreakerResult = applyTieBreaker(answers, { first, second });
    
    if (tieBreakerResult) {
      primaryArchetype = tieBreakerResult;
    }

    // Still close after tie-breaker? Mark as hybrid
    if (Math.abs(scores[first.key] - scores[second.key]) <= HYBRID_THRESHOLD) {
      secondaryArchetype = second.key;
      isHybrid = true;
    }
  }

  // Step 4: Get archetype data
  const archetypeData = archetypes.find((a) => a.key === primaryArchetype);
  
  if (!archetypeData) {
    throw new Error(`Archetype not found: ${primaryArchetype}`);
  }

  return {
    primary_archetype: primaryArchetype,
    secondary_archetype: secondaryArchetype,
    scores,
    is_hybrid: isHybrid,
    archetype_data: archetypeData,
  };
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get archetype display name (handles hybrid cases)
 */
export function getArchetypeDisplayName(
  result: QuizResult,
  archetypes: Archetype[]
): string {
  if (result.is_hybrid && result.secondary_archetype) {
    const secondary = archetypes.find((a) => a.key === result.secondary_archetype);
    return `${result.archetype_data.title}-${secondary?.title}`;
  }
  
  return result.archetype_data.title;
}

/**
 * Validate quiz answers completeness
 */
export function validateAnswers(
  answers: QuizAnswer[],
  questions: Question[]
): { isValid: boolean; missingQuestions: string[] } {
  const answeredQuestionIds = new Set(answers.map((a) => a.question_id));
  const missingQuestions = questions
    .filter((q) => !answeredQuestionIds.has(q.id))
    .map((q) => q.id);

  return {
    isValid: missingQuestions.length === 0,
    missingQuestions,
  };
}

