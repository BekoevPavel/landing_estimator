# 📚 Документация проекта Landing Estimator

> Главный навигатор по документации проекта

---

## 🎯 Быстрый старт

**Новичок в проекте?** Выберите путь:

### 📣 Маркетолог/Продакт:
1. 🎤 [PITCH_ONEPAGER.md](./PITCH_ONEPAGER.md) - One-pager для питча
2. 📋 [MARKETING_CHEATSHEET.md](./MARKETING_CHEATSHEET.md) - Шпаргалка (ключевые сообщения)
3. 📖 [MARKETING_STRATEGY.md](./MARKETING_STRATEGY.md) - Полная стратегия (креативы, письма)

### 💻 Разработчик:
1. 👇 Этот файл - обзор проекта
2. 🌍 Секция **"Локализация (i18n)"** ниже - как работать с переводами
3. 📖 [ARCHITECTURE.md](./ARCHITECTURE.md) - как устроен код
4. 🚀 [NETLIFY_SETUP.md](./NETLIFY_SETUP.md) - как задеплоить

---

## 📖 О проекте

**Landing Estimator** - AI-powered лендинг для оценки проектов с интеграцией Stripe платежей.

### Стек технологий
- **Frontend:** React 18.3 + TypeScript + Vite
- **UI:** Tailwind CSS + shadcn/ui + Radix UI
- **Анимации:** Framer Motion
- **Локализация:** i18next + react-i18next (EN, RU)
- **Платежи:** Stripe (тестовый режим)
- **Хостинг:** Netlify + Serverless Functions

### Команды для работы
```bash
# Разработка
npm run dev              # Локальная разработка (порт 3000, мок оплаты)
netlify dev             # С Netlify Functions (порт 8888, реальный Stripe)

# Сборка и деплой
npm run build           # Production сборка
git push origin main    # Автодеплой на Netlify
```

---

## 📁 Структура документации

### 🎯 [MARKETING_STRATEGY.md](./MARKETING_STRATEGY.md) - Маркетинговая стратегия
**Читай если:**
- Нужно создать креативы для рекламы
- Пишешь тексты для лендинга
- Готовишь продающие письма
- Хочешь понять позиционирование

**Что внутри:**
- Целевая аудитория и их боли
- 10 готовых креативов для соцсетей
- Полная структура лендинга (11 блоков)
- 6 продающих писем (welcome, cart, features, case study)
- Ответы на возражения
- Метрики и KPI

**Ключевые фишки:**
- 📊 "ChatGPT vs EstimateFast" — сравнение для креативов
- 💰 ROI калькулятор ($1000 → $149)
- 🎯 Позиционирование: "Команда агентов > одна модель"

---

### 🏗️ [ARCHITECTURE.md](./ARCHITECTURE.md) - Архитектура проекта
**Читай если:**
- Нужно понять, как устроен код
- Хочешь добавить новую фичу
- Нужно изменить конфигурацию

**Что внутри:**
- Структура папок и файлов
- Принципы архитектуры (DRY, SOLID, Clean Code)
- Основные компоненты и хуки
- Примеры расширения проекта
- Конфигурация (Stripe, pricing, env)

**Быстрые примеры:**
```typescript
// Добавить тарифный план
// → src/config/pricing.config.ts

// Изменить тему Stripe
// → src/config/stripe.config.ts

// Использовать оплату
const payment = usePayment();
payment.createPayment(amount, plan, email);
```

---

### 🎉 [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - История изменений
**Читай если:**
- Интересно, что было сделано
- Хочешь понять, почему код такой
- Нужны метрики улучшений

**Что внутри:**
- Список изменений в коде
- Сравнение "до" и "после"
- Метрики улучшений (PricingSection: 350 строк → 87 строк)
- Применённые принципы
- Roadmap дальнейших улучшений

**Ключевые цифры:**
- `-75%` строк кода в PricingSection
- `0%` дублирования логики
- `9/10` читаемость кода (было 4/10)

---

### 🚀 [NETLIFY_SETUP.md](./NETLIFY_SETUP.md) - Деплой на Netlify
**Читай если:**
- Нужно задеплоить проект
- Не работает Stripe на проде
- Нужно настроить переменные окружения

**Что внутри:**
- Пошаговая инструкция деплоя
- Настройка переменных окружения
- Тестирование Stripe интеграции
- Отладка проблем
- Локальная разработка с Netlify Dev

**Важные шаги:**
1. Создать проект на Netlify
2. Добавить переменные окружения (STRIPE_KEYS)
3. Задеплоить
4. Протестировать с картой `4242 4242 4242 4242`

---

## 🗂️ Структура кода

```
src/
├── config/              # 🔧 Конфигурация
│   ├── pricing.config.ts    # Тарифные планы (добавлять новые сюда)
│   ├── stripe.config.ts     # Stripe ключи и темы
│   └── env.config.ts        # Dev/prod режимы
│
├── locales/             # 🌍 Локализация (i18n)
│   ├── en/                  # Английские переводы
│   │   └── translation.json # Все тексты EN
│   └── ru/                  # Русские переводы
│       └── translation.json # Все тексты RU
│
├── constants/           # 🎨 Константы дизайна
│   ├── gradients.ts         # Градиенты для консистентности
│   └── animations.ts        # Motion анимации
│
├── hooks/               # 🎣 Переиспользуемые хуки
│   └── usePayment.ts        # Управление платежами (главный хук)
│
├── services/            # 🔨 Бизнес-логика
│   └── stripe.service.ts    # Stripe API (создание платежей)
│
├── types/               # 📝 TypeScript типы
│   └── stripe.types.ts      # Типы для платежей
│
├── i18n.ts              # 🌍 Конфигурация i18next
│
├── components/          # ⚛️ React компоненты
│   ├── landing/             # 🎯 Модульный лендинг
│   │   ├── data/            # Данные лендинга
│   │   │   ├── aiAgents.ts       # Список AI агентов
│   │   │   ├── problems.ts       # Проблемы пользователей
│   │   │   ├── comparison.ts     # Сравнение методов
│   │   │   ├── deliverables.ts   # Что получит клиент
│   │   │   ├── testimonials.ts   # Отзывы
│   │   │   └── faqs.ts           # FAQ
│   │   └── sections/        # Секции лендинга
│   │       ├── LandingHeroSection.tsx      # Hero
│   │       ├── ProblemsSection.tsx         # Проблемы
│   │       ├── ComparisonSection.tsx       # Сравнение
│   │       ├── SolutionSection.tsx         # Решение
│   │       ├── TestimonialsSection.tsx     # Отзывы
│   │       ├── FAQSection.tsx              # FAQ
│   │       ├── CTASection.tsx              # Призыв к действию
│   │       └── FooterSection.tsx           # Футер
│   │
│   ├── pricing/             # Компоненты оплаты
│   │   ├── PricingCard.tsx      # Карточка тарифа
│   │   └── CheckoutForm.tsx     # Форма оплаты
│   │
│   ├── LandingPage.tsx          # 🎯 Композиция лендинга (40 строк!)
│   ├── Header.tsx               # Шапка с навигацией
│   ├── LanguageSwitcher.tsx     # 🌍 Переключатель языков (EN/RU)
│   ├── PricingSection.tsx       # Секция тарифов
│   ├── HeroSection.tsx          # Приветственный экран теста
│   ├── QuizSection.tsx          # Квиз
│   ├── ResultScreen.tsx         # Результаты
│   └── WaitlistScreen.tsx       # Waitlist
│
└── netlify/functions/   # ☁️ Serverless
    └── create-payment-intent.js  # Создание Payment Intent
```

---

## 🏗️ Архитектура лендинга

### Модульная структура
Лендинг построен по принципу **композиции** для максимальной поддерживаемости:

```typescript
// LandingPage.tsx - всего 40 строк!
<LandingHeroSection />
<ProblemsSection />
<ComparisonSection />
<SolutionSection />
<TestimonialsSection />
<FAQSection />
<CTASection />
<FooterSection />
```

### Разделение на слои

**1. Данные (`landing/data/`)** - изолированные данные без JSX:
```typescript
// aiAgents.ts, problems.ts, comparison.ts, etc.
export const aiAgents = [...]; // Чистые данные
```

**2. Константы (`constants/`)** - переиспользуемые стили:
```typescript
// gradients.ts
export const GRADIENTS = {
  primary: "bg-gradient-to-r from-primary to-accent",
  // ...
};

// animations.ts
export const FADE_IN_UP = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};
```

**3. Секции (`landing/sections/`)** - изолированные компоненты UI:
- Каждая секция - отдельный файл
- Импортирует только свои данные
- Легко тестировать и изменять

### Преимущества новой архитектуры
✅ **Модульность:** Легко добавить/удалить секцию  
✅ **Декомпозиция:** `LandingPage.tsx` 782 строки → 40 строк  
✅ **Без дублирования:** Константы градиентов и анимаций переиспользуются  
✅ **Читаемость:** Каждый файл < 200 строк  
✅ **Масштабируемость:** Легко добавить новые данные и секции

---

## 🎯 Частые задачи

### Изменить контент лендинга
📍 **Папка:** `src/components/landing/data/`  
⏱️ **Время:** 1 минута

```typescript
// src/components/landing/data/problems.ts
export const problems = [
  {
    icon: AlertTriangle,
    title: "Новая проблема",
    stat: "90%",
    description: "описание",
    quote: "цитата клиента",
  }
];
```

### Добавить новую секцию лендинга
📍 **Папка:** `src/components/landing/sections/`  
⏱️ **Время:** 10 минут

1. Создай файл `NewSection.tsx`
2. Импортируй в `LandingPage.tsx`
3. Добавь в композицию: `<NewSection />`

### Добавить новый тарифный план
📍 **Файл:** `src/config/pricing.config.ts`  
⏱️ **Время:** 2 минуты

```typescript
export const PRICING_PLANS: PricingPlan[] = [
  // ... existing plans
  {
    id: "new-plan",
    name: "New Plan",
    price: 199,
    displayPrice: "$199",
    features: ["Feature 1", "Feature 2"],
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderGradient: "from-blue-500 to-cyan-500",
  }
];
```

### Изменить тему Stripe
📍 **Файл:** `src/config/stripe.config.ts`  
⏱️ **Время:** 1 минута

```typescript
export const STRIPE_APPEARANCE_DARK = {
  variables: {
    colorPrimary: "#YOUR_COLOR", // ← Измени здесь
  },
};
```

### Добавить новый компонент с оплатой
📍 **Файл:** Любой компонент  
⏱️ **Время:** 5 минут

```typescript
import { usePayment } from "../hooks/usePayment";

const payment = usePayment({
  onSuccess: () => console.log("Оплачено!"),
  onError: (error) => console.error(error),
});

payment.createPayment(100, "Plan Name", "email@test.com");
```

---

## 🌍 Локализация (i18n)

Проект полностью локализован на **2 языка**: 🇺🇸 English и 🇷🇺 Русский.

### Архитектура локализации

**Библиотеки:**
- `i18next` - ядро локализации
- `react-i18next` - React интеграция

**Ключевые файлы:**
```
src/
├── i18n.ts                        # Конфигурация i18next
├── locales/
│   ├── en/translation.json        # 🇺🇸 Все английские тексты
│   └── ru/translation.json        # 🇷🇺 Все русские тексты
└── components/
    └── LanguageSwitcher.tsx       # Переключатель языков
```

### Как работает

**1. Инициализация**
```typescript
// main.tsx
import "./i18n"; // Инициализация перед App
```

**2. Использование в компонентах**
```typescript
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <h1>{t("landing.hero.title")}</h1>
  );
}
```

**3. Массивы данных**
```typescript
const problems = t("landing.problems.items", { 
  returnObjects: true 
}) as Array<{ title: string; description: string }>;
```

### Структура translation.json

```json
{
  "header": {
    "title": "EstimateFast",
    "subtitle": "AI Team Estimation"
  },
  "landing": {
    "hero": { "title": "...", "description": "..." },
    "problems": { "items": [...] },
    // ... другие секции
  },
  "quiz": { "questions": [...] },
  "pricing": { "plans": [...] },
  "resultScreen": { "agents": [...] }
}
```

### Добавить новый перевод

📍 **Файлы:** `src/locales/en/translation.json` и `src/locales/ru/translation.json`  
⏱️ **Время:** 5 минут

**Шаг 1:** Добавь ключ в оба файла
```json
// en/translation.json
{
  "newSection": {
    "title": "New Feature",
    "description": "Amazing feature"
  }
}

// ru/translation.json
{
  "newSection": {
    "title": "Новая фича",
    "description": "Потрясающая фича"
  }
}
```

**Шаг 2:** Используй в компоненте
```typescript
const { t } = useTranslation();
return <h1>{t("newSection.title")}</h1>;
```

### Добавить новый язык

⏱️ **Время:** 20 минут

**Шаг 1:** Создай файл перевода
```bash
mkdir src/locales/de
touch src/locales/de/translation.json
```

**Шаг 2:** Скопируй структуру из `en/translation.json`

**Шаг 3:** Обнови `i18n.ts`
```typescript
import deTranslation from "./locales/de/translation.json";

i18n.init({
  resources: {
    en: { translation: enTranslation },
    ru: { translation: ruTranslation },
    de: { translation: deTranslation }, // Добавь здесь
  },
  // ...
});
```

**Шаг 4:** Обнови `LanguageSwitcher.tsx` для 3+ языков

### Фичи локализации

✅ **Автоопределение языка** - по браузеру или localStorage  
✅ **Персистентность** - язык сохраняется между сессиями  
✅ **Моментальное переключение** - без перезагрузки страницы  
✅ **100% покрытие** - все 15 компонентов локализованы  
✅ **UX-оптимизация** - переключатель в правом верхнем углу (международный стандарт)

### Какие компоненты локализованы

| Компонент | Статус |
|-----------|--------|
| Header | ✅ |
| LanguageSwitcher | ✅ |
| LandingHeroSection | ✅ |
| ProblemsSection | ✅ |
| ComparisonSection | ✅ |
| SolutionSection | ✅ |
| TestimonialsSection | ✅ |
| FAQSection | ✅ |
| CTASection | ✅ |
| FooterSection | ✅ |
| HeroSection | ✅ |
| QuizSection | ✅ |
| PricingSection | ✅ |
| ResultScreen | ✅ |
| WaitlistScreen | ✅ |

---

## 🔍 Режимы работы

### 🛠️ Dev режим (порт 3000)
```bash
npm run dev
```
- ✅ Быстрая итерация UI/UX
- ✅ Мок оплаты (без Stripe API)
- ❌ Serverless функции не работают

### 🧪 Netlify Dev (порт 8888)
```bash
netlify dev
```
- ✅ Реальный Stripe (тестовый режим)
- ✅ Serverless функции работают
- ✅ Полное тестирование флоу
- 💳 Тестовая карта: `4242 4242 4242 4242`

### 🚀 Production
```bash
npm run build
git push origin main  # Автодеплой
```
- ✅ Полная Stripe интеграция
- ✅ Реальные платежи (если prod ключи)

---

## 🆘 Проблемы и решения

### Stripe форма не появляется
1. Проверь переменные окружения на Netlify
2. Открой DevTools → Console (ищи ошибки)
3. Проверь логи функций в Netlify Dashboard

### Функция не работает локально
```bash
netlify dev  # Используй вместо npm run dev
```

### Ошибка при деплое
- Проверь, что переменные окружения добавлены на Netlify
- Убедись, что `netlify.toml` в корне проекта
- Проверь логи деплоя в Netlify Dashboard

---

## 📊 Метрики проекта

| Метрика | Значение |
|---------|----------|
| **Компоненты** | 19 (8 секций лендинга + 11 основных) |
| **Конфигов** | 4 (pricing, stripe, env, i18n) |
| **Константы** | 2 (gradients, animations) |
| **Данных** | 6 (aiAgents, problems, comparison, deliverables, testimonials, faqs) |
| **Локализованные языки** | 🇺🇸 EN, 🇷🇺 RU |
| **Локализованные компоненты** | 15/15 (100%) |
| **Хуков** | 1 главный (usePayment) |
| **Serverless функций** | 1 (create-payment-intent) |
| **Строк кода (компоненты)** | ~1850 |
| **Дублирование кода** | 0% |
| **Модульность LandingPage** | ⭐ 782 строк → 40 строк (-95%) |
| **Тестовое покрытие** | 0% (TODO) |

---

## 🚀 Roadmap

### ✅ Завершено
- [x] **Локализация (i18n)** - EN/RU с автоопределением языка
- [x] **LanguageSwitcher** - компонент переключения языков
- [x] **100% перевод** - все 15 компонентов локализованы

### Легко добавить (1-2 часа)
- [ ] Экран-заглушка после квиза
- [ ] Анализ типа оценщика
- [ ] Error Boundary
- [ ] Третий язык (DE, FR, ES)

### Среднесрочно (неделя)
- [ ] Unit тесты
- [ ] Storybook
- [ ] i18n типизация (TypeScript схемы для переводов)

### Долгосрочно (месяц+)
- [ ] PayPal интеграция
- [ ] Подписки (recurring payments)
- [ ] CMS для управления планами
- [ ] Автоматический перевод через API (DeepL, Google Translate)

---

## 📞 Полезные ссылки

- **Netlify Dashboard:** [app.netlify.com](https://app.netlify.com)
- **Stripe Dashboard:** [dashboard.stripe.com](https://dashboard.stripe.com)
- **i18next Docs:** [react.i18next.com](https://react.i18next.com)
- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Stripe Docs:** [stripe.com/docs](https://stripe.com/docs)

---

## ✨ Заметки

### Stripe
- Ключи временно **захардкожены** в коде для упрощения разработки
- В production используй переменные окружения на Netlify
- Dev режим (3000) работает без Functions
- Netlify Dev (8888) работает с Functions
- Тестовая карта: `4242 4242 4242 4242`

### Локализация
- **Язык по умолчанию:** английский (EN)
- **Автоопределение:** определяется по браузеру или localStorage
- **Персистентность:** язык сохраняется между сессиями
- **Переключение:** кнопка в правом верхнем углу (UX best practice)
- **Добавить язык:** 20 минут (скопировать структуру + перевести)

---

**🎯 Теперь ты знаешь всё необходимое для работы с проектом!**

Если что-то непонятно - открывай конкретный документ по ссылкам выше 👆

