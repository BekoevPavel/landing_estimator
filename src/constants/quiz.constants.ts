/**
 * Quiz Constants
 * Centralized configuration for quiz behavior
 */

export const QUIZ_CONSTANTS = {
  /**
   * Delay between answer selection and next question
   * Allows UI transition animation to complete
   */
  TRANSITION_DELAY_MS: 800,

  /**
   * Maximum number of options user can select in multiple choice
   */
  MAX_MULTIPLE_SELECTIONS: 3,
} as const;

/**
 * Valid archetype keys for type checking
 */
export const ARCHETYPE_KEYS = [
  "visionary",
  "analyst", 
  "negotiator",
  "protector",
] as const;

