# 🎨 Figma AI Prompt — Анимация мультиагентной системы EstimateFast

> **Профессиональный промпт для создания анимированной визуализации процесса работы AI-агентов**

---

## 📋 ГЛАВНЫЙ ПРОМПТ ДЛЯ FIGMA AI

```
Ты — эксперт в UX/UI дизайне и motion design. Создай профессиональную 
анимированную визуализацию процесса работы мультиагентной AI-системы 
для оценки проектов.

КОНТЕКСТ:
EstimateFast — это платформа, где команда из 10 специализированных 
AI-агентов коллаборативно оценивает software-проекты. Нужно показать, 
как агенты параллельно работают, советуются друг с другом, выявляют 
противоречия и приходят к консенсусу — всё это за 15-20 минут.

ЦЕЛЬ АНИМАЦИИ:
Визуально продемонстрировать преимущество мультиагентной системы над 
одиночной моделью (ChatGPT). Показать "человечность" процесса — агенты 
"думают", "общаются", "спорят" и "договариваются" как реальная команда.

ЦЕЛЕВАЯ АУДИТОРИЯ:
- Фрилансеры (developers, designers, PMs)
- CTO и Tech Leads аутсорс-компаний
- Технически подкованные пользователи

СТИЛЬ:
- Современный, технологичный, минималистичный
- B2B SaaS aesthetic (как Linear, Notion, Vercel)
- Плавные анимации (не агрессивные)
- Профессиональный, но дружелюбный tone

---

ТЕХНИЧЕСКАЯ СТРУКТУРА:

Создай анимацию длительностью 90 секунд, состоящую из 13 последовательных 
сцен. Каждая сцена должна плавно переходить в следующую.

Canvas: 1920×1080px (Full HD, landscape)
Framerate: 60 FPS
Easing: cubic-bezier(0.4, 0.0, 0.2, 1) — Material Design standard
Background: Dark theme (#0A0A0A) с subtle gradient

---

СОСТАВ ПЕРСОНАЖЕЙ (AI-агенты):

1. 👨‍💼 Tech Lead AI
   Иконка: Галстук + clipboard
   Цвет: Синий #3B82F6
   Позиция: Центр координации (оркестратор)

2. 🤝 Account Manager AI
   Иконка: Улыбка + headset
   Цвет: Фиолетовый #8B5CF6
   Позиция: Интерфейс с клиентом

3. 👨‍💻 Backend Engineer AI
   Иконка: Terminal + код </>
   Цвет: Зеленый #10B981
   Позиция: Технический слой (левый)

4. 👨‍💻 Frontend Engineer AI
   Иконка: Browser window + React logo
   Цвет: Зеленый #10B981 (чуть светлее)
   Позиция: Технический слой (правый)

5. 📊 Product Manager AI
   Иконка: Kanban board
   Цвет: Фиолетовый #8B5CF6
   Позиция: Product layer

6. 🎨 Designer AI
   Иконка: Палитра + Figma logo
   Цвет: Розовый #EC4899
   Позиция: Product layer

7. 🧪 QA Engineer AI
   Иконка: Bug icon + checklist
   Цвет: Оранжевый #F59E0B
   Позиция: Quality layer

8. 🚀 DevOps AI
   Иконка: Облако + шестеренка
   Цвет: Оранжевый #F97316
   Позиция: Quality layer

9. 📈 Risk Analyst AI
   Иконка: График с warning triangle
   Цвет: Красный #EF4444
   Позиция: Analysis layer

10. 🏢 Industry Advisor AI
    Иконка: Building + галочка
    Цвет: Серый #6B7280
    Позиция: Analysis layer

ВИЗУАЛЬНЫЙ СТИЛЬ АГЕНТОВ:
- Каждый агент — это круглая аватарка (80px diameter)
- С иконкой в центре (40px)
- Светящийся border (2px) цвета агента
- При активности — pulsing glow effect
- Имя агента под аватаркой (14px, Inter Medium)

---

ДЕТАЛЬНОЕ ОПИСАНИЕ 13 СЦЕН:

═══════════════════════════════════════════════════════════
СЦЕНА 1: "Первичный brief" (0:00-0:05, длительность 5 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Слева: Силуэт клиента (human icon) с документом
- Центр: Документ летит к Account Manager AI (плавная траектория)
- Справа: Account Manager принимает → передает Tech Lead AI
- Tech Lead AI "активируется" (glow animation)

АНИМАЦИЯ:
[0:00] Клиент появляется слева (fade in + slide from left)
[0:01] Документ вылетает от клиента (bezier curve trajectory)
[0:02] Account Manager AI загорается (glow pulse)
[0:03] Документ трансформируется в structured brief
[0:04] Brief передается Tech Lead AI (connecting line animation)
[0:05] Tech Lead начинает светиться ярче

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Документ: Иконка 📄 с lines внутри
- Connecting lines: Animated dashed lines (#3B82F6, 2px)
- Particles: Мелкие точки летят вместе с документом
- Sound effect note: "Document received" (если будет звук)

ТЕКСТ НА ЭКРАНЕ:
Top-center: "Phase 0: Initial Briefing"
Bottom-center: "Client submits project description"

═══════════════════════════════════════════════════════════
СЦЕНА 2: "Параллельный анализ" (0:05-0:15, длительность 10 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Центр: Tech Lead AI (большой, 120px)
- Вокруг по кругу: 8 других агентов (80px each)
- Radius: 350px от центра

АНИМАЦИЯ:
[0:05] Tech Lead отправляет "импульс" (expanding circle wave)
[0:06] Все 8 агентов появляются одновременно (scale from 0 to 1)
[0:07-0:13] Агенты "думают":
  - Rotating circle loader вокруг каждого (spinner)
  - Pulsing glow (0.5s interval, staggered start)
  - Иконки вопросов ❓ появляются над агентами (random positions)
[0:14] Все вопросы начинают лететь к Tech Lead
[0:15] Tech Lead собирает все вопросы (convergence animation)

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- "Думание": 3 точки (…) bouncing animation над каждым агентом
- Вопросы: Маленькие ❓ иконки (24px) летят хаотично
- Connections: Thin lines (1px, цвет агента) от каждого к Tech Lead
- Background: Subtle grid pattern (#FFFFFF, 5% opacity)

ТЕКСТ НА ЭКРАНЕ:
Top: "Phase 1: Parallel Discovery"
Bottom: "8 agents analyze simultaneously"
Counter: "Questions generated: 0 → 45" (animated count-up)

═══════════════════════════════════════════════════════════
СЦЕНА 3: "Согласование вопросов" (0:15-0:23, длительность 8 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Центр: Tech Lead AI (увеличивается до 150px)
- Вокруг него: Облако из вопросов (45 штук)
- Справа: Account Manager AI ждет результата

АНИМАЦИЯ:
[0:15] 45 вопросов вокруг Tech Lead (chaotic swarm)
[0:16-0:18] Фильтрация:
  - Дубликаты исчезают (fade out + scale down, 10 вопросов)
  - Оставшиеся группируются по цветам (4 группы)
[0:19-0:21] Приоритизация:
  - 🔴 Critical (10 вопросов) — летят вверх
  - 🟡 High (15 вопросов) — летят в середину
  - 🟢 Medium (10 вопросов) — летят вниз
[0:22] Все вопросы формируют аккуратный список
[0:23] Список летит к Account Manager AI

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Вопросы: Карточки (120×40px) с emoji и коротким текстом
- Группировка: Карточки магнитятся друг к другу (magnetic snap)
- Цветные метки: Dots слева от каждой карточки
- Исчезающие дубликаты: Красный X появляется перед fade out

ТЕКСТ НА ЭКРАНЕ:
Top: "Tech Lead filters & prioritizes"
Stats (animated):
- "45 questions generated"
- "10 duplicates removed"
- "35 questions organized"

═══════════════════════════════════════════════════════════
СЦЕНА 4: "Клиент отвечает" (0:23-0:26, длительность 3 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Слева: Account Manager AI отправляет questionnaire
- Центр: Силуэт клиента с ноутбуком
- Справа: Typing animation

АНИМАЦИЯ:
[0:23] Questionnaire летит от Account Manager к клиенту
[0:24] Клиент "печатает" (animated typing indicator)
[0:25] Форма заполняется (progress bar 0% → 100%)
[0:26] Ответы отправляются обратно (reverse trajectory)

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Questionnaire: Стек карточек (stack of cards)
- Typing: Три bouncing dots (как в iMessage)
- Progress: Linear progress bar под клиентом (#10B981)
- Checkmarks: Появляются на заполненных вопросах

ТЕКСТ НА ЭКРАНЕ:
Top: "Phase 2: Client Response"
Bottom: "35 questions answered (2-24 hours)"
Timer: "⏱️ 00:00 → 02:30" (fast-forward effect)

═══════════════════════════════════════════════════════════
СЦЕНА 5: "Совместная оценка" (0:26-0:38, длительность 12 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Top: Account Manager распределяет ответы
- Center: 6 агентов в ряд (Backend, Frontend, PM, Designer, QA, DevOps)
- Под каждым: Progress bar + часы

АНИМАЦИЯ:
[0:26] Ответы разлетаются от Account Manager к агентам
[0:27-0:35] Параллельная работа:
  - Progress bars заполняются (разная скорость)
  - Числа часов увеличиваются (count-up animation)
  - Backend: 0h → 450h (6 сек)
  - Frontend: 0h → 490h (7 сек)
  - PM: 0h → 180h (4 сек)
  - Designer: 0h → 244h (5 сек)
  - QA: 0h → 376h (6 сек)
  - DevOps: 0h → 108h (3 сек)
[0:35-0:38] "Разговоры" между агентами:
  - Frontend ↔ Backend: Speech bubble "API endpoints?"
  - PM ↔ Designer: Speech bubble "18 screens ✓"

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Progress bars: Height 8px, rounded, gradient fill
- Числа: Monospace font, 24px, cyan color (#06B6D4)
- Speech bubbles: Rounded rectangles, tail pointing to agent
- Connecting lines: Animated between talking agents

ТЕКСТ НА ЭКРАНЕ:
Top: "Phase 3: Collaborative Estimation"
Bottom: "Agents work in parallel & consult each other"

═══════════════════════════════════════════════════════════
СЦЕНА 6: "Выявление противоречий" (0:38-0:46, длительность 8 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Центр: Tech Lead AI (становится крупнее)
- Слева: Frontend AI с числом "15 screens"
- Справа: Designer AI с числом "22 screens"
- Между ними: Warning triangle ⚠️

АНИМАЦИЯ:
[0:38] Tech Lead замечает несоответствие (shake animation)
[0:39] Warning triangle появляется (scale + pulse)
[0:40] Tech Lead отправляет сигнал Frontend и Designer
[0:41-0:44] "Meeting":
  - Три агента образуют треугольник
  - Speech bubbles появляются по очереди:
    - Frontend: "Only layouts"
    - Designer: "Including modals"
    - Tech Lead: "Let's align"
[0:45] Consensus: "18 screens ✓"
[0:46] Warning исчезает, зеленая галочка появляется

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Shake: 2px amplitude, 0.2s duration
- Warning triangle: Orange #F59E0B, pulsing glow
- Speech bubbles: Sequential appearance (0.5s delay each)
- Consensus badge: Green circle (#10B981) с галочкой

ТЕКСТ НА ЭКРАНЕ:
Top: "Tech Lead detects discrepancy"
Center: "15 screens ≠ 22 screens"
Bottom: "→ Aligned: 18 screens ✓"

═══════════════════════════════════════════════════════════
СЦЕНА 7: "Коллективная оценка сложной фичи" (0:46-0:56, 10 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Центр: Feature card "Real-time collaborative editing"
- Вокруг: Backend, Frontend, Risk Analyst, Tech Lead

АНИМАЦИЯ:
[0:46] Feature card появляется (scale up + glow)
[0:47] Четыре агента "собираются" вокруг (move to positions)
[0:48-0:54] Оценки появляются по очереди:
  - Backend: "120-180h" + "High complexity"
  - Frontend: "80-120h"
  - Risk Analyst: "40% overrun risk"
  - Tech Lead: "Recommendation: POC first"
[0:55] Consensus: "200-300h + 2-week POC"
[0:56] Feature card помечается "HIGH RISK" badge

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Feature card: 400×200px, rounded 16px, gradient bg
- Оценки: Появляются как "стикеры" вокруг карты
- Risk badge: Red badge (#EF4444) с warning icon
- POC note: Yellow sticky note visual

ТЕКСТ НА ЭКРАНЕ:
Top: "Complex feature requires team discussion"
Bottom: "Consensus reached: 200-300h + POC phase"

═══════════════════════════════════════════════════════════
СЦЕНА 8: "Follow-up вопросы" (0:56-1:01, длительность 5 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Слева: Tech Lead формирует пакет
- Центр: Пакет с двумя частями
- Справа: Account Manager получает и отправляет клиенту

АНИМАЦИЯ:
[0:56] Tech Lead собирает данные (swirl effect)
[0:57] Формируется пакет из двух частей:
  - Top: "Preliminary: $80K-120K"
  - Bottom: "15 follow-up questions"
[0:58] Пакет летит к Account Manager
[0:59] Account Manager форматирует (card flip animation)
[1:00] Отправка клиенту (trajectory to left)

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Пакет: Два stacked rectangles (300×150px each)
- Swirl: Particles converging to Tech Lead
- Card flip: 3D rotation effect (180°)
- Trajectory: Bezier curve с trailing particles

ТЕКСТ НА ЭКРАНЕ:
Top: "Iteration 1 complete"
Stats:
- "✓ Preliminary estimate ready"
- "? 15 clarifying questions"

═══════════════════════════════════════════════════════════
СЦЕНА 9: "Итерация 2" (1:01-1:09, длительность 8 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Слева: Клиент отвечает частично (5 из 15)
- Центр: Account Manager применяет assumptions
- Справа: Агенты обновляют оценки

АНИМАЦИЯ:
[1:01] 15 вопросов появляются
[1:02] 5 вопросов становятся зелеными (answered)
[1:03] 10 остаются серыми (unanswered)
[1:04] Account Manager добавляет "Assumption" badges к 10
[1:05-1:08] Агенты обновляют цифры:
  - Backend: 450h → 470h (number morphing)
  - Frontend: 490h → 510h (number morphing)
[1:09] Финальные цифры зафиксированы (lock icon)

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Questions: Grid layout (3×5)
- Answered: Green checkmark (#10B981)
- Assumptions: Orange "A" badge (#F59E0B)
- Number morphing: Smooth transition, highlight new digits
- Lock icon: Appears with "click" animation

ТЕКСТ НА ЭКРАНЕ:
Top: "Phase 4: Iteration 2"
Stats:
- "5/15 questions answered"
- "10 assumptions applied"
- "Estimates refined → ±20% accuracy"

═══════════════════════════════════════════════════════════
СЦЕНА 10: "Риск-анализ" (1:09-1:19, длительность 10 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Центр: Risk Analyst AI (крупно)
- Вокруг: 8 risk cards появляются по кругу

АНИМАЦИЯ:
[1:09] Risk Analyst активируется (intense glow)
[1:10-1:15] Риски появляются один за другим (0.5s delay):
  - 🔴 Risk 1: "API integration" (+40h)
  - 🔴 Risk 2: "WebSockets" (+60h)
  - 🔴 Risk 3: "Performance" (+24h)
  - 🟡 Risk 4-8: (меньший размер)
[1:16] Risk cards группируются:
  - 🔴 HIGH: 3 риска — вверх
  - 🟡 MEDIUM: 5 рисков — вниз
[1:17-1:18] Подсчет буферов (animated calculation):
  - "High risks: +180h"
  - "Medium risks: +60h"
  - "Total buffer: +240h"
[1:19] Буфер добавляется к estimate (number update)

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Risk cards: 250×100px, colored border (red/orange)
- Risk icon: Triangle with ! inside
- Buffer calculation: Mathematical formula visualization
- Charts: Mini bar chart показывает distribution

ТЕКСТ НА ЭКРАНЕ:
Top: "Phase 5: Risk Analysis"
Stats (final):
- "8 risks identified"
- "Mitigation strategies: 8"
- "Buffer added: +240h (13%)"

═══════════════════════════════════════════════════════════
СЦЕНА 11: "Industry Advisor" (1:19-1:24, длительность 5 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Слева: Industry Advisor AI
- Центр: Industry badge "E-commerce"
- Справа: Три recommendation cards

АНИМАЦИЯ:
[1:19] Industry Advisor появляется (fade in + scale)
[1:20] Industry badge "E-commerce" светится
[1:21] Recommendations появляются (stack animation):
  - 🔒 "GDPR compliance +16h"
  - 📧 "Cart abandonment +24h"
  - 📊 "Inventory edge cases +16h"
[1:22] Recommendations добавляются к estimate
[1:23] Industry Advisor кивает (subtle nod animation)
[1:24] Badge "Industry-optimized ✓" появляется

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Industry badge: Rounded rectangle, gradient bg
- Recommendations: Cards с иконками и часами
- Stack animation: Cards появляются снизу вверх
- Nod animation: 5° rotation up-down

ТЕКСТ НА ЭКРАНЕ:
Top: "Industry-specific adjustments"
Bottom: "+56h for e-commerce best practices"

═══════════════════════════════════════════════════════════
СЦЕНА 12: "Финальная сборка отчета" (1:24-1:36, 12 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Центр: Tech Lead AI (orchestrator mode)
- Вокруг: Секции отчета "влетают" и складываются

АНИМАЦИЯ:
[1:24] Tech Lead в центре, pulsing
[1:25-1:32] Секции появляются одна за другой:
  1. 📋 "247 user stories" (from PM)
  2. ⏱️ "Timeline 24 weeks" (Gantt chart visualization)
  3. 💰 "$114,444 cost" (from calculations)
  4. ⚠️ "8 risks + mitigation" (from Risk Analyst)
  5. 🏢 "Industry notes" (from Industry Advisor)
  6. 👥 "Team: 6 people" (avatars)
  7. 📊 "Confidence: ±15%" (gauge visual)
[1:33] Все секции "складываются" в документ (stacking)
[1:34] Документ "переплетается" (binding animation)
[1:35] Final report badge появляется (stamp effect)
[1:36] Checkmark ✓ (large, green, pulsing)

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Секции: Cards (400×200px) летят из разных углов
- Gantt chart: Mini timeline с colored bars
- Cost breakdown: Stacked bar chart
- Document: 3D perspective, pages flipping
- Stamp effect: Rotation + scale с "thud" visual

ТЕКСТ НА ЭКРАНЕ:
Top: "Final Report Assembly"
Stats (sequential):
- "15 pages"
- "247 tasks"
- "±15% accuracy"
- "18 minutes total"

═══════════════════════════════════════════════════════════
СЦЕНА 13: "Отправка клиенту" (1:36-1:39, длительность 3 сек)
═══════════════════════════════════════════════════════════

КОМПОЗИЦИЯ:
- Центр: Final report (большой документ)
- Слева: Account Manager берет отчет
- Справа: Клиент получает

АНИМАЦИЯ:
[1:36] Account Manager "берет" отчет (hand gesture)
[1:37] Отчет летит к клиенту (fast trajectory)
[1:38] Клиент получает (glow + confetti)
[1:39] Success message появляется (fade in + scale)

ВИЗУАЛЬНЫЕ ДЕТАЛИ:
- Hand gesture: Subtle animation (cursor-like)
- Trajectory: Fast bezier curve с motion blur
- Confetti: Colorful particles (50 pieces)
- Success message: Large text с иконкой 🎉

ТЕКСТ НА ЭКРАНЕ:
Center (large):
"✅ Complete Project Estimate Ready!"
Bottom:
"⚡ 18 minutes | 📋 247 tasks | 💰 $114K | ⚠️ 8 risks analyzed"

═══════════════════════════════════════════════════════════

---

ФИНАЛЬНЫЕ ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ:

TYPOGRAPHY:
- Primary: Inter (Google Fonts)
- Headings: Inter Bold, 24-32px
- Body: Inter Regular, 14-16px
- Monospace (numbers): JetBrains Mono, 18-24px

COLORS PALETTE:
- Background: #0A0A0A (dark)
- Surface: #1A1A1A
- Text primary: #FFFFFF
- Text secondary: #A1A1A1
- Accent blue: #3B82F6
- Accent green: #10B981
- Accent purple: #8B5CF6
- Accent orange: #F59E0B
- Accent red: #EF4444
- Success: #10B981
- Warning: #F59E0B
- Error: #EF4444

ANIMATION TIMINGS:
- Fast: 200ms (hover, clicks)
- Medium: 400ms (transitions)
- Slow: 600ms (entrances)
- Elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55)

EFFECTS:
- Blur: backdrop-filter blur(20px)
- Shadow: 0 8px 32px rgba(0,0,0,0.3)
- Glow: box-shadow 0 0 20px color
- Particles: 3-5px circles, opacity 0.6

EXPORT SETTINGS:
- Format: MP4 (H.264)
- Resolution: 1920×1080 (Full HD)
- Framerate: 60 FPS
- Bitrate: 8 Mbps (high quality)
- Альтернатива: WebM (VP9) для web

---

РЕФЕРЕНСЫ СТИЛЯ (для вдохновения):
1. Linear.app — анимации transitions
2. Stripe.com — motion design
3. Apple WWDC keynotes — product animations
4. Vercel.com — minimalist tech aesthetic
5. Figma Config презентации — diagram animations

---

ДОПОЛНИТЕЛЬНЫЕ ДЕТАЛИ:

ACCESSIBILITY:
- Все анимации должны работать при prefers-reduced-motion
- Цвета проходят WCAG AA для контрастности
- Текст читаем на любом фоне (добавить semi-transparent bg если нужно)

RESPONSIVE:
- Если нужна mobile версия: 1080×1920 (portrait)
- UI масштабируется пропорционально

LOOPABILITY:
- Анимация может зацикливаться (после сцены 13 возврат к сцене 1)
- Fade out в конце → fade in в начале

---

ПРИОРИТЕТЫ КАЧЕСТВА:
1. Плавность анимаций (60 FPS обязательно)
2. Четкость визуальной иерархии
3. Понятность процесса (даже без звука)
4. Профессиональный вид (B2B SaaS level)
5. Эмоциональная привлекательность

---

DELIVERABLES:
1. Figma file (.fig) с всеми сценами на отдельных frames
2. Экспорт MP4 (Full HD, 60fps)
3. Экспорт отдельных сцен (для редактирования)
4. Экспорт key frames (для превью)
5. Assets (иконки агентов в SVG)

---

ВАЖНЫЕ АКЦЕНТЫ:
⭐ Показать "человечность" AI — агенты как real team
⭐ Параллельность работы (speed advantage)
⭐ Коллаборацию (accuracy advantage)
⭐ Консенсус после disagreement (trust building)
⭐ Итеративность процесса (thoroughness)
⭐ Профессионализм результата (detailed report)

---

НАЧНИ С:
1. Создай canvas 1920×1080px
2. Установи dark theme background (#0A0A0A)
3. Создай 10 агентов (аватарки с иконками)
4. Построй первую сцену (Сцена 1: Первичный brief)
5. Добавь плавные переходы между состояниями

Let's make it amazing! 🎬✨
```

---

## 📝 Заметки по использованию

### Как использовать этот промпт:

1. **Скопируй весь промпт** (от "Ты — эксперт..." до "Let's make it amazing!")
2. **Вставь в Figma AI** (если есть функция генерации анимаций)
3. **Или используй для briefing дизайнера** (передай как ТЗ)
4. **Или используй с Motion Design AI** (Runway, Pika, etc.)

### Альтернативные инструменты:

Если Figma AI не поддерживает такую сложность, используй:
- **Figma + Plugin** (например, "Figmotion", "Flow", "Jitter")
- **After Effects** (для профессиональной анимации)
- **Rive** (для интерактивных анимаций)
- **Lottie** (для web-friendly анимаций)

### Упрощенная версия (если AI не справляется):

Можно разбить на 3 ключевые сцены:
1. **Сцена 2 + 3** — Параллельный анализ и фильтрация (20 сек)
2. **Сцена 5 + 6** — Коллаборация и консенсус (20 сек)
3. **Сцена 12 + 13** — Финальный отчет и отправка (15 сек)

Итого: 55 секунд — более реалистично для AI генерации.

---

**Создано:** 2025-10-16  
**Для:** Figma AI / Motion Design AI / Дизайнеры  
**Формат:** Профессиональный промпт по best practices  
**Статус:** Ready to use 🎨

