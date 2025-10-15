# AI Estimator — Psychometric Quiz Spec (v2.0 — Enhanced)

> **Улучшения**: Усилена эмоциональная кривая, добавлены вопросы про последствия ошибок и прошлые попытки решения. Структура оптимизирована для максимального вовлечения и осознания проблемы.

---

## 📊 Архетипы оценщиков

```json
{
  "version": "2.0.0",
  "lang": "en",
  "archetypes": [
    {
      "key": "visionary",
      "title": "The Visionary",
      "summary": "Fast, big-picture, intuition-driven. Great at momentum, weaker at risk granularity.",
      "strengths": ["Speed", "Creativity", "Pattern recognition"],
      "risks": ["Underestimating complexity", "Skipping validation"],
      "ai_support": ["Risk Analyst AI", "Engineer AI"],
      "pain_points": ["Clients complain estimates are too optimistic", "Teams struggle to deliver on time"]
    },
    {
      "key": "analyst",
      "title": "The Analyst",
      "summary": "Data-driven, precise, and structured. May overanalyze and slow decisions.",
      "strengths": ["Accuracy", "Repeatability", "Modeling"],
      "risks": ["Analysis paralysis", "Low agility"],
      "ai_support": ["Product Manager AI", "Benchmarking AI"],
      "pain_points": ["Spend too much time on estimates", "Miss opportunities due to slow response"]
    },
    {
      "key": "negotiator",
      "title": "The Negotiator",
      "summary": "Stakeholder-oriented, consensus builder. Needs stronger technical grounding.",
      "strengths": ["Alignment", "Persuasion", "Expectation management"],
      "risks": ["People-pleasing bias", "Soft estimates"],
      "ai_support": ["Engineer AI", "Risk Analyst AI"],
      "pain_points": ["Estimates get challenged by engineers", "Struggle to defend numbers under pressure"]
    },
    {
      "key": "protector",
      "title": "The Protector",
      "summary": "Reliability and buffers first. Safeguards team, may over-pad and slow delivery.",
      "strengths": ["Risk control", "Team safety", "Predictability"],
      "risks": ["Over-buffering", "Conservatism"],
      "ai_support": ["Designer AI", "Data Analyst AI"],
      "pain_points": ["Lose deals to competitors with lower estimates", "Clients perceive as slow/expensive"]
    }
  ],

  "questions": [
    {
      "id": "q1",
      "title": "How often do your project estimates turn out accurate?",
      "helper": "Be honest — this helps us calibrate the AI team for your reality",
      "type": "single_choice",
      "options": [
        { 
          "id": "q1_o1", 
          "label": "Usually nail it (80%+ accuracy)", 
          "weights": { "analyst": 2, "protector": 1 } 
        },
        { 
          "id": "q1_o2", 
          "label": "About half the time — coin flip", 
          "weights": { "negotiator": 2, "visionary": 1 } 
        },
        { 
          "id": "q1_o3", 
          "label": "Often off — usually underestimate", 
          "weights": { "visionary": 2, "negotiator": 1 } 
        },
        { 
          "id": "q1_o4", 
          "label": "Often off — usually overestimate", 
          "weights": { "protector": 2, "analyst": 1 } 
        }
      ]
    },

    {
      "id": "q2",
      "title": "Think of the last project where your estimate was way off. What went wrong?",
      "helper": "Specific failures reveal patterns we can fix with AI",
      "type": "single_choice",
      "options": [
        { 
          "id": "q2_o1", 
          "label": "Client hid key requirements until later", 
          "weights": { "negotiator": 2, "protector": 1 } 
        },
        { 
          "id": "q2_o2", 
          "label": "Tech turned out way more complex", 
          "weights": { "analyst": 2, "visionary": 1 } 
        },
        { 
          "id": "q2_o3", 
          "label": "Team velocity was slower than expected", 
          "weights": { "protector": 2, "analyst": 1 } 
        },
        { 
          "id": "q2_o4", 
          "label": "I just didn't factor in enough unknowns", 
          "weights": { "visionary": 2 } 
        }
      ]
    },

    {
      "id": "q3",
      "title": "When timelines start to slip, what do you feel first?",
      "helper": "Emotional reactions reveal decision patterns under uncertainty",
      "type": "single_choice",
      "options": [
        { 
          "id": "q3_o1", 
          "label": "Irritation — the plan should've worked", 
          "weights": { "protector": 2, "analyst": 1 } 
        },
        { 
          "id": "q3_o2", 
          "label": "Calm — we'll just recalc and move on", 
          "weights": { "analyst": 2 } 
        },
        { 
          "id": "q3_o3", 
          "label": "Guilt — I underestimated risks", 
          "weights": { "protector": 2, "negotiator": 1 } 
        },
        { 
          "id": "q3_o4", 
          "label": "Neutral — that's normal in projects", 
          "weights": { "visionary": 2 } 
        }
      ]
    },

    {
      "id": "q4",
      "title": "What blocks accurate estimates most often?",
      "helper": "Pinpoints your uncertainty hotspot",
      "type": "single_choice",
      "options": [
        { 
          "id": "q4_o1", 
          "label": "Unclear or changing requirements", 
          "weights": { "negotiator": 2, "analyst": 1, "protector": 1 } 
        },
        { 
          "id": "q4_o2", 
          "label": "Technical complexity & unknowns", 
          "weights": { "analyst": 2, "visionary": 1 } 
        },
        { 
          "id": "q4_o3", 
          "label": "Stakeholder pressure to lowball", 
          "weights": { "negotiator": 2, "protector": 1 } 
        },
        { 
          "id": "q4_o4", 
          "label": "No reliable historical data", 
          "weights": { "analyst": 2, "protector": 1 } 
        }
      ]
    },

    {
      "id": "q5",
      "title": "What happens when you deliver an estimate that turns out wrong?",
      "helper": "Understanding consequences helps us prioritize the right AI safeguards",
      "type": "single_choice",
      "options": [
        { 
          "id": "q5_o1", 
          "label": "Lose client trust / future deals", 
          "weights": { "negotiator": 2, "protector": 1 } 
        },
        { 
          "id": "q5_o2", 
          "label": "Team burns out from crunch", 
          "weights": { "protector": 2, "analyst": 1 } 
        },
        { 
          "id": "q5_o3", 
          "label": "Have to cut scope / quality", 
          "weights": { "visionary": 2, "negotiator": 1 } 
        },
        { 
          "id": "q5_o4", 
          "label": "Look unprofessional to stakeholders", 
          "weights": { "negotiator": 2, "analyst": 1 } 
        }
      ]
    },

    {
      "id": "q6",
      "title": "What have you tried to improve estimation accuracy?",
      "helper": "Knowing what hasn't worked helps us avoid repeating it",
      "type": "multiple_choice",
      "max_selections": 3,
      "options": [
        { 
          "id": "q6_o1", 
          "label": "Read books / took courses on estimation", 
          "weights": { "analyst": 1, "protector": 1 } 
        },
        { 
          "id": "q6_o2", 
          "label": "Built templates & processes", 
          "weights": { "analyst": 2, "protector": 1 } 
        },
        { 
          "id": "q6_o3", 
          "label": "Got more people involved in estimating", 
          "weights": { "negotiator": 2, "protector": 1 } 
        },
        { 
          "id": "q6_o4", 
          "label": "Used third-party estimation tools", 
          "weights": { "analyst": 1, "visionary": 1 } 
        },
        { 
          "id": "q6_o5", 
          "label": "Nothing formal — no time/resources", 
          "weights": { "visionary": 2 } 
        }
      ]
    },

    {
      "id": "q7",
      "title": "What matters most in your ideal estimate?",
      "helper": "Trade-off between speed, accuracy, persuasion, and protection",
      "type": "single_choice",
      "options": [
        { 
          "id": "q7_o1", 
          "label": "Speed — give a solid ballpark fast", 
          "weights": { "visionary": 2 } 
        },
        { 
          "id": "q7_o2", 
          "label": "Accuracy — I'd rather take longer and be precise", 
          "weights": { "analyst": 2, "protector": 1 } 
        },
        { 
          "id": "q7_o3", 
          "label": "Buy-in — persuade clients & stakeholders", 
          "weights": { "negotiator": 2 } 
        },
        { 
          "id": "q7_o4", 
          "label": "Safety — protect team from overcommitment", 
          "weights": { "protector": 2, "negotiator": 1 } 
        }
      ]
    },

    {
      "id": "q8",
      "title": "With an AI expert team at your fingertips, what would you delegate first?",
      "helper": "Reveals your highest-tension area and AI agent priority",
      "type": "single_choice",
      "options": [
        { 
          "id": "q8_o1", 
          "label": "Validation & error-checking my numbers", 
          "weights": { "analyst": 2, "protector": 1 } 
        },
        { 
          "id": "q8_o2", 
          "label": "Objective benchmarks & comps", 
          "weights": { "analyst": 1, "protector": 1, "negotiator": 1 } 
        },
        { 
          "id": "q8_o3", 
          "label": "Client-ready justification & presentation", 
          "weights": { "negotiator": 2 } 
        },
        { 
          "id": "q8_o4", 
          "label": "Just make it faster end-to-end", 
          "weights": { "visionary": 2 } 
        }
      ]
    }
  ],

  "scoringRules": {
    "method": "sum_weights_per_archetype",
    "tie_breakers": [
      {
        "question_id": "q7",
        "mapping": {
          "q7_o1": "visionary",
          "q7_o2": "analyst",
          "q7_o3": "negotiator",
          "q7_o4": "protector"
        }
      },
      {
        "question_id": "q8",
        "mapping": {
          "q8_o4": "visionary",
          "q8_o1": "analyst",
          "q8_o3": "negotiator",
          "q8_o2": "protector"
        }
      }
    ],
    "hybrid_threshold": 1,
    "hybrid_label_format": "{{top1}}-{{top2}}",
    "outputs": {
      "primary": "archetype_with_max_score",
      "secondary": "second_best_if_within_threshold"
    }
  },

  "resultTemplates": {
    "title": "Your Estimation Style — {{archetype.title}}",
    "paragraph": "{{archetype.summary}} Our AI-team analyzed your answers and identified optimization points specific to your style.",
    "bullets_strengths_prefix": "Your strengths:",
    "bullets_risks_prefix": "Watch out for:",
    "bullets_pain_points_prefix": "Common pain points we'll solve:",
    "cta_primary": "Get Your Custom AI Team + Full Project Estimate",
    "cta_secondary": "See How {{archetype.title}}s Work With AI",
    "agent_block_title": "AI Experts Assigned to You",
    "agent_block_note": "We pair you with agents that complement your style for balanced, realistic estimates.",
    "social_proof": "Join 1,200+ {{archetype.title}}s who've cut estimation time by 73%"
  },

  "flowOptimization": {
    "emotional_curve": [
      { "question": "q1", "emotion": "Acknowledgment",     "intensity": 3 },
      { "question": "q2", "emotion": "Pain (specific)",    "intensity": 6 },
      { "question": "q3", "emotion": "Pain (emotional)",   "intensity": 7 },
      { "question": "q4", "emotion": "Pain (systemic)",    "intensity": 8 },
      { "question": "q5", "emotion": "Fear (consequences)", "intensity": 9 },
      { "question": "q6", "emotion": "Frustration (failed attempts)", "intensity": 8 },
      { "question": "q7", "emotion": "Clarity (priorities)", "intensity": 5 },
      { "question": "q8", "emotion": "Hope (solution)",     "intensity": 4 }
    ],
    "notes": "Peak pain at Q5, then Q6 reinforces 'nothing else worked', Q7-Q8 provide relief and agency"
  },

  "exampleEvaluationPseudocode": [
    "// inputs: answers[] = [{question_id, option_id}, ...]",
    "scores = { visionary:0, analyst:0, negotiator:0, protector:0 }",
    "",
    "for each answer in answers:",
    "  if (answer.question_id == 'q6'): // multiple choice",
    "    for each selected_option in answer.option_ids:",
    "      w = questions.q6.options.find(o=>o.id==selected_option).weights",
    "      for (k in w) scores[k] += w[k]",
    "  else:",
    "    w = questions[answer.question_id].options.find(o=>o.id==answer.option_id).weights",
    "    for (k in w) scores[k] += w[k]",
    "",
    "// pick top",
    "sorted = sort_desc(scores)",
    "top1 = sorted[0]; top2 = sorted[1]",
    "",
    "if (top1.value - top2.value <= hybrid_threshold):",
    "  // tie or near-tie → consult tie_breakers in order",
    "  for (tb of scoringRules.tie_breakers):",
    "    ans = answers.find(a => a.question_id == tb.question_id)",
    "    if (ans && tb.mapping[ans.option_id]) { ",
    "      top1.key = tb.mapping[ans.option_id]; ",
    "      break ",
    "    }",
    "",
    "  // still close → return hybrid label (e.g., Visionary-Analyst)",
    "  if (abs(scores[top1.key] - scores[top2.key]) <= hybrid_threshold)",
    "     hybrid = true",
    "",
    "result = hybrid ? `${top1.key}-${top2.key}` : top1.key",
    "return { ",
    "  result, ",
    "  scores, ",
    "  archetype: archetypes[result],",
    "  ai_agents: archetypes[result].ai_support",
    "}"
  ]
}
```

---

## 🎯 Психологические улучшения v2.0

### Что изменилось:

#### 1. **Q1 (переработан)**
- **Было**: "How do you usually estimate?" (нейтрально)
- **Стало**: "How often accurate?" → **сразу признание проблемы**

#### 2. **Q2 (новый — конкретная боль)**
- "Think of the LAST project where..." → **активация эмоциональной памяти**
- Заставляет вспомнить **реальный провал**

#### 3. **Q5 (новый — последствия)**
- "What HAPPENS when wrong?" → **социальный/финансовый страх**
- **Пик боли** в середине квиза (см. emotional_curve)

#### 4. **Q6 (новый — прошлые попытки)**
- "What have you tried?" → показывает, что **обычные методы не работают**
- Подготавливает к тому, что **только AI-решение может помочь**

#### 5. **Emotional Curve оптимизирована**
```
Intensity
9 |                    ●Q5 (peak pain - consequences)
8 |              ●Q4         ●Q6 (frustration)
7 |        ●Q3
6 |   ●Q2
5 |                                        ●Q7
4 |                                             ●Q8 (hope)
3 | ●Q1
  +--------------------------------------------------→ Flow
    acknowledge → pain → fear → frustration → hope
```

### Манипулятивные триггеры:

| Триггер | Вопросы | Эффект |
|---------|---------|--------|
| **Социальное доказательство** | Result template | "Join 1,200+ Visionaries..." |
| **Страх потери** (loss aversion) | Q5 | "Lose client trust / deals" |
| **Якорение на проблеме** | Q1-Q6 | 6 вопросов усиливают боль |
| **Контраст** (pain → relief) | Q6 → Q7-Q8 | "Nothing worked" → "AI can help" |
| **Специфичность** | Q2 | "Last project" = конкретная память |
| **Эмпатическое зеркало** | Q3 | "What do you FEEL?" |
| **Презумпция неизбежности** | Q3, Q5 | "WHEN timelines slip", "WHEN wrong" |

---

## 📈 Метрики успеха квиза

### Целевые показатели:

```javascript
{
  "completion_rate": ">85%",  // 8 вопросов, но эмоциональный крючок сильный
  "time_to_complete": "2-3 min",
  "CTA_click_rate": ">40%",   // после 8 вопросов + персональный результат
  "perceived_empathy": ">8/10",  // "они меня понимают"
  "perceived_urgency": ">7/10",  // "мне нужна помощь сейчас"
}
```

### A/B тесты (рекомендации):

1. **Variant A**: Текущая структура (8 вопросов)
2. **Variant B**: Сократить до 6 (убрать Q6, Q7) для higher completion rate
3. **Variant C**: Добавить social proof в хелперы ("73% PMs underestimate by 40%+")

---

## 🚀 Рекомендации по лендингу

### Placement квиза:

```
┌─────────────────────────────────────┐
│ HERO: "Stop Guessing Project Times" │
│ Subhead: AI team estimates for you  │
│ CTA: "Find Your Estimation Style" ──┼──► запуск квиза
└─────────────────────────────────────┘

After quiz:
┌─────────────────────────────────────┐
│ "You're a VISIONARY"                │
│ Your AI Team: Risk Analyst + Engineer│
│ [Get Custom Estimate]  ◄─── hot lead│
└─────────────────────────────────────┘
```

### Post-quiz engagement:

1. **Email sequence** (персонализированная по архетипу):
   - Day 1: "How Visionaries cut estimation time by 60%"
   - Day 3: Case study (Visionary клиент)
   - Day 7: Free 15-min consultation

2. **Retargeting ads** с копирайтом по архетипу:
   - Visionary: "Stop losing deals to slow estimates"
   - Analyst: "Your precision, 10x faster"
   - Negotiator: "Win more stakeholder trust"
   - Protector: "Protect your team without over-padding"

---

## 📝 Чеклист внедрения

- [ ] Разработать UI для квиза (прогресс-бар обязателен)
- [ ] Интеграция с email/CRM для сбора лидов
- [ ] A/B тест версий (6 vs 8 вопросов)
- [ ] Настроить аналитику (drop-off points)
- [ ] Подготовить 4 персонализированных email sequences
- [ ] Создать landing pages для каждого архетипа
- [ ] Настроить ретаргетинг по архетипам

---

## 🎓 Психологическая механика (для команды)

### Почему это работает:

1. **Эффект Барнума** (Forer effect): Результат кажется персональным, хотя 4 типа
2. **Прогрессивная профилирование**: Каждый вопрос → больше commitment
3. **Когнитивный диссонанс**: "Я профи, но estimates плохие" → нужна помощь
4. **Эффект IKEA**: Человек САМ прошел квиз → ценит результат выше
5. **Реципрокность**: Дали бесплатный инсайт → чувствует обязанность ответить на CTA

### Этические границы:

✅ **OK**:
- Показывать реальные боли
- Предлагать решение, которое работает
- Персонализировать коммуникацию

❌ **NOT OK**:
- Искусственно накачивать страх без решения
- Обещать то, что AI не может
- Скрывать ограничения продукта

---

**Version**: 2.0.0  
**Last Updated**: 2025-10-15  
**Author**: Psychology-backed estimation quiz for AI Estimator landing page  
**Status**: Ready for implementation

