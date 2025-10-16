/**
 * Quiz Data - Questions with Weights
 * Based on AI_ESTIMATOR_QUIZ_V2.md specification
 */

import { Question } from "../types/quiz.types";

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: "q1",
    title: "quiz.questions.0.title", // i18n key
    helper: "quiz.questions.0.helper",
    type: "single_choice",
    options: [
      { 
        id: "q1_o1", 
        label: "quiz.questions.0.options.0.label",
        weights: { analyst: 2, protector: 1 }
      },
      { 
        id: "q1_o2", 
        label: "quiz.questions.0.options.1.label",
        weights: { negotiator: 2, visionary: 1 }
      },
      { 
        id: "q1_o3", 
        label: "quiz.questions.0.options.2.label",
        weights: { visionary: 2, negotiator: 1 }
      },
      { 
        id: "q1_o4", 
        label: "quiz.questions.0.options.3.label",
        weights: { protector: 2, analyst: 1 }
      }
    ]
  },
  {
    id: "q2",
    title: "quiz.questions.1.title",
    helper: "quiz.questions.1.helper",
    type: "single_choice",
    options: [
      { 
        id: "q2_o1", 
        label: "quiz.questions.1.options.0.label",
        weights: { negotiator: 2, protector: 1 }
      },
      { 
        id: "q2_o2", 
        label: "quiz.questions.1.options.1.label",
        weights: { analyst: 2, visionary: 1 }
      },
      { 
        id: "q2_o3", 
        label: "quiz.questions.1.options.2.label",
        weights: { protector: 2, analyst: 1 }
      },
      { 
        id: "q2_o4", 
        label: "quiz.questions.1.options.3.label",
        weights: { visionary: 2 }
      }
    ]
  },
  {
    id: "q3",
    title: "quiz.questions.2.title",
    helper: "quiz.questions.2.helper",
    type: "single_choice",
    options: [
      { 
        id: "q3_o1", 
        label: "quiz.questions.2.options.0.label",
        weights: { protector: 2, analyst: 1 }
      },
      { 
        id: "q3_o2", 
        label: "quiz.questions.2.options.1.label",
        weights: { analyst: 2 }
      },
      { 
        id: "q3_o3", 
        label: "quiz.questions.2.options.2.label",
        weights: { protector: 2, negotiator: 1 }
      },
      { 
        id: "q3_o4", 
        label: "quiz.questions.2.options.3.label",
        weights: { visionary: 2 }
      }
    ]
  },
  {
    id: "q4",
    title: "quiz.questions.3.title",
    helper: "quiz.questions.3.helper",
    type: "single_choice",
    options: [
      { 
        id: "q4_o1", 
        label: "quiz.questions.3.options.0.label",
        weights: { negotiator: 2, analyst: 1, protector: 1 }
      },
      { 
        id: "q4_o2", 
        label: "quiz.questions.3.options.1.label",
        weights: { analyst: 2, visionary: 1 }
      },
      { 
        id: "q4_o3", 
        label: "quiz.questions.3.options.2.label",
        weights: { negotiator: 2, protector: 1 }
      },
      { 
        id: "q4_o4", 
        label: "quiz.questions.3.options.3.label",
        weights: { analyst: 2, protector: 1 }
      }
    ]
  },
  {
    id: "q5",
    title: "quiz.questions.4.title",
    helper: "quiz.questions.4.helper",
    type: "single_choice",
    options: [
      { 
        id: "q5_o1", 
        label: "quiz.questions.4.options.0.label",
        weights: { negotiator: 2, protector: 1 }
      },
      { 
        id: "q5_o2", 
        label: "quiz.questions.4.options.1.label",
        weights: { protector: 2, analyst: 1 }
      },
      { 
        id: "q5_o3", 
        label: "quiz.questions.4.options.2.label",
        weights: { visionary: 2, negotiator: 1 }
      },
      { 
        id: "q5_o4", 
        label: "quiz.questions.4.options.3.label",
        weights: { negotiator: 2, analyst: 1 }
      }
    ]
  },
  {
    id: "q6",
    title: "quiz.questions.5.title",
    helper: "quiz.questions.5.helper",
    type: "multiple_choice",
    max_selections: 3,
    options: [
      { 
        id: "q6_o1", 
        label: "quiz.questions.5.options.0.label",
        weights: { analyst: 1, protector: 1 }
      },
      { 
        id: "q6_o2", 
        label: "quiz.questions.5.options.1.label",
        weights: { analyst: 2, protector: 1 }
      },
      { 
        id: "q6_o3", 
        label: "quiz.questions.5.options.2.label",
        weights: { negotiator: 2, protector: 1 }
      },
      { 
        id: "q6_o4", 
        label: "quiz.questions.5.options.3.label",
        weights: { analyst: 1, visionary: 1 }
      },
      { 
        id: "q6_o5", 
        label: "quiz.questions.5.options.4.label",
        weights: { visionary: 2 }
      }
    ]
  },
  {
    id: "q7",
    title: "quiz.questions.6.title",
    helper: "quiz.questions.6.helper",
    type: "single_choice",
    options: [
      { 
        id: "q7_o1", 
        label: "quiz.questions.6.options.0.label",
        weights: { visionary: 2 }
      },
      { 
        id: "q7_o2", 
        label: "quiz.questions.6.options.1.label",
        weights: { analyst: 2, protector: 1 }
      },
      { 
        id: "q7_o3", 
        label: "quiz.questions.6.options.2.label",
        weights: { negotiator: 2 }
      },
      { 
        id: "q7_o4", 
        label: "quiz.questions.6.options.3.label",
        weights: { protector: 2, negotiator: 1 }
      }
    ]
  },
  {
    id: "q8",
    title: "quiz.questions.7.title",
    helper: "quiz.questions.7.helper",
    type: "single_choice",
    options: [
      { 
        id: "q8_o1", 
        label: "quiz.questions.7.options.0.label",
        weights: { analyst: 2, protector: 1 }
      },
      { 
        id: "q8_o2", 
        label: "quiz.questions.7.options.1.label",
        weights: { analyst: 1, protector: 1, negotiator: 1 }
      },
      { 
        id: "q8_o3", 
        label: "quiz.questions.7.options.2.label",
        weights: { negotiator: 2 }
      },
      { 
        id: "q8_o4", 
        label: "quiz.questions.7.options.3.label",
        weights: { visionary: 2 }
      }
    ]
  }
];

