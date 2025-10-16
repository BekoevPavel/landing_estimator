# 🎯 Quiz v2.0 — Психометрический квиз для определения типа эстиматора

## ✅ Выполнено

### 1. **Создана типизация** (`src/types/quiz.types.ts`)
- `ArchetypeKey` - 4 типа эстиматоров
- `Archetype` - структура архетипа с описаниями
- `Question` - вопросы с поддержкой `single_choice` и `multiple_choice`
- `QuizAnswer` - ответы пользователя
- `QuizResult` - результат с primary/secondary архетипами

### 2. **Создан scoring service** (`src/services/quiz.service.ts`)
- `calculateScores()` - подсчет баллов по весам из спецификации
- `calculateQuizResult()` - основная функция вычисления архетипа
- Поддержка **tie-breakers** (Q7, Q8)
- Поддержка **hybrid results** (если разница баллов ≤ 1)

### 3. **Создан data layer** (`src/data/quiz.data.ts`)
- 8 вопросов с точными весами из `AI_ESTIMATOR_QUIZ_V2.md`
- Интеграция с i18n (ключи для локализации)

### 4. **Обновлена локализация**

#### **EN** (`src/locales/en/translation.json`)
- ✅ 8 новых вопросов вместо 5
- ✅ 4 архетипа с детальными описаниями:
  - **Visionary** - быстрый, интуитивный
  - **Analyst** - точный, структурированный
  - **Negotiator** - ориентированный на стейкхолдеров
  - **Protector** - защитник команды
- ✅ Динамические шаблоны для результатов

#### **RU** (`src/locales/ru/translation.json`)
- ✅ Полный перевод всех 8 вопросов
- ✅ Перевод всех 4 архетипов
- ✅ Локализованные labels для UI

### 5. **Обновлен QuizSection.tsx**
- ✅ Поддержка `single_choice` (Q1-Q5, Q7-Q8)
- ✅ Поддержка `multiple_choice` (Q6) с max 3 selections
- ✅ Вычисление результата после последнего вопроса
- ✅ Передача `QuizResult` в callback `onComplete()`

### 6. **Обновлен ResultScreen.tsx**
- ✅ Принимает `QuizResult` как prop
- ✅ Персонализированный заголовок с именем архетипа
- ✅ Показывает **strengths, risks, pain_points**
- ✅ **Убраны конкретные AI-агенты** (т.к. еще не знаем тип проекта)
- ✅ Показывает **4 преимущества кастомного подбора команды**:
  - Style-Aware Selection (учет стиля)
  - Project-Specific Experts (эксперты под проект)
  - Blind Spot Coverage (покрытие слепых зон)
  - Collaborative Analysis (совместный анализ)
- ✅ Поддержка hybrid результатов (badge)

### 7. **Обновлен App.tsx**
- ✅ Сохранение `QuizResult` в state
- ✅ Передача результата в `ResultScreen`

---

## 🎯 Архетипы эстиматоров

| Архетип | Описание | AI-агенты | Боли |
|---------|----------|-----------|------|
| **Visionary** | Быстрый, интуитивный, видит большую картину | Risk Analyst AI, Engineer AI | Клиенты жалуются на оптимизм |
| **Analyst** | Точный, структурированный, основан на данных | Product Manager AI, Benchmarking AI | Тратит много времени на оценки |
| **Negotiator** | Ориентирован на согласие, строит консенсус | Engineer AI, Risk Analyst AI | Оценки оспариваются инженерами |
| **Protector** | Защитник команды, контроль рисков | Designer AI, Data Analyst AI | Теряет сделки из-за высоких оценок |

---

## 📊 Вопросы (эмоциональная кривая)

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

1. **Q1** - Как часто оценки точны? (признание проблемы)
2. **Q2** - Что пошло не так в последнем провале? (конкретная боль)
3. **Q3** - Что чувствуете когда сроки съезжают? (эмоциональная реакция)
4. **Q4** - Что мешает точным оценкам? (системная боль)
5. **Q5** - Что происходит при ошибке? **[PEAK PAIN]** (последствия)
6. **Q6** - Что пробовали? (прошлые попытки) **[MULTIPLE CHOICE]**
7. **Q7** - Что важнее всего? (приоритеты)
8. **Q8** - Что делегировать AI? (надежда на решение)

---

## 🔧 Как это работает

### Scoring Logic

```typescript
// 1. Собираем ответы пользователя
const answers: QuizAnswer[] = [
  { question_id: "q1", option_id: "q1_o3" }, // недооценка
  // ...
];

// 2. Подсчитываем баллы по весам
const scores = calculateScores(answers, QUIZ_QUESTIONS);
// { visionary: 8, analyst: 3, negotiator: 4, protector: 2 }

// 3. Определяем архетип (с tie-breakers и hybrid logic)
const result = calculateQuizResult(answers, QUIZ_QUESTIONS, archetypes);
// {
//   primary_archetype: "visionary",
//   secondary_archetype: undefined,
//   is_hybrid: false,
//   scores: {...},
//   archetype_data: {...}
// }
```

### Multiple Choice (Q6)

```typescript
// Вопрос 6 - "Что пробовали?"
{
  question_id: "q6",
  option_ids: ["q6_o2", "q6_o3", "q6_o5"], // max 3
}

// Веса суммируются:
// q6_o2: { analyst: 2, protector: 1 }
// q6_o3: { negotiator: 2, protector: 1 }
// q6_o5: { visionary: 2 }
// → analyst: 2, protector: 2, negotiator: 2, visionary: 2
```

---

## 🧪 Тестирование

### Запуск dev режима:
```bash
npm run dev
```

### Проверка билда:
```bash
npm run build  # ✅ Успешно
```

### Тестовые сценарии:

1. **Визионер** - выбирайте быстрые, интуитивные ответы
   - Q1: "Often off — usually underestimate"
   - Q7: "Speed — give a solid ballpark fast"
   - Q8: "Just make it faster end-to-end"

2. **Аналитик** - выбирайте точные, структурированные ответы
   - Q1: "Usually nail it (80%+ accuracy)"
   - Q7: "Accuracy — I'd rather take longer and be precise"
   - Q8: "Validation & error-checking my numbers"

3. **Переговорщик** - выбирайте ориентированные на людей ответы
   - Q4: "Unclear or changing requirements"
   - Q7: "Buy-in — persuade clients & stakeholders"
   - Q8: "Client-ready justification & presentation"

4. **Защитник** - выбирайте осторожные, безопасные ответы
   - Q1: "Often off — usually overestimate"
   - Q7: "Safety — protect team from overcommitment"

---

## 📝 Файлы изменены

```
src/
├── types/
│   └── quiz.types.ts                 ✨ NEW - типы для квиза
├── services/
│   └── quiz.service.ts               ✨ NEW - scoring logic
├── data/
│   └── quiz.data.ts                  ✨ NEW - вопросы с весами
├── locales/
│   ├── en/translation.json           🔄 UPDATED - 8 вопросов + архетипы
│   └── ru/translation.json           🔄 UPDATED - перевод
├── components/
│   ├── QuizSection.tsx               🔄 UPDATED - multiple choice
│   ├── ResultScreen.tsx              🔄 UPDATED - персонализация
│   └── App.tsx                       🔄 UPDATED - state management
```

---

## ✨ Best Practices применены

✅ **DRY** - нет дублирования кода  
✅ **SOLID** - чистая архитектура (types → services → data → UI)  
✅ **Type Safety** - полная типизация TypeScript  
✅ **Декомпозиция** - каждый файл < 300 строк  
✅ **i18n** - 100% локализация EN + RU  
✅ **Clean Code** - понятные имена, комментарии  

---

## 📝 Product Decision: Почему убрали конкретных AI-агентов?

**Проблема:**  
В первой версии показывали конкретные AI-агенты из `ai_support` (например, "Risk Analyst AI", "Engineer AI"). Но мы еще **не знаем**:
- Тип проекта (web/mobile/backend)
- Специализацию пользователя  
- Конкретные требования

**Решение:**  
Заменили на **4 преимущества кастомного подбора**:
1. ⚡ **Style-Aware Selection** - учитываем ваш стиль
2. 👥 **Project-Specific Experts** - подбираем под проект
3. 👁️ **Blind Spot Coverage** - закрываем слепые зоны
4. 🔀 **Collaborative Analysis** - команда работает вместе

**Результат:**  
- ✅ Не overcommit (не обещаем конкретных агентов раньше времени)
- ✅ Фокус на **персонализации и адаптации**
- ✅ Объясняем **ценность** подбора команды
- ✅ Подготавливаем к следующему шагу (описание проекта)

---

## 🚀 Что дальше?

Рекомендуемые улучшения (optional):

1. **Analytics** - отслеживать распределение архетипов
2. **A/B Testing** - тестировать 6 vs 8 вопросов
3. **Email Sequences** - персонализированные письма по архетипам
4. **Debug Mode** - показывать scores в dev режиме
5. **Social Proof** - реальные метрики по архетипам
6. **Project Brief Form** - следующий шаг после квиза для подбора конкретных агентов

---

**Version**: 2.0.0  
**Status**: ✅ Готово к продакшену  
**Build**: ✅ Успешно  
**Linter**: ✅ Без ошибок  
**i18n**: ✅ EN + RU  

---

🎯 **Теперь квиз полностью соответствует спецификации `AI_ESTIMATOR_QUIZ_V2.md`!**

