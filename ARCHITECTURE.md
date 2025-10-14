# 🏗️ Архитектура проекта

> 📚 [← Вернуться к главной документации](./DOCS.md)

## 📁 Структура

```
src/
├── config/              # Конфигурация
│   ├── pricing.config.ts    # Тарифные планы
│   ├── stripe.config.ts     # Stripe (ключи, темы, валидация)
│   └── env.config.ts        # Окружение (dev/prod режимы)
│
├── hooks/               # Переиспользуемые хуки
│   └── usePayment.ts        # Управление платежами
│
├── services/            # Бизнес-логика
│   └── stripe.service.ts    # Stripe API
│
├── types/               # TypeScript типы
│   └── stripe.types.ts      # Типы для Stripe
│
├── components/          # React компоненты
│   ├── pricing/
│   │   ├── PricingCard.tsx      # Карточка тарифа
│   │   └── CheckoutForm.tsx     # Форма оплаты
│   ├── PricingSection.tsx       # Секция с ценами
│   └── StripeCheckoutForm.tsx   # Stripe форма
│
└── netlify/functions/   # Serverless функции
    └── create-payment-intent.js
```

---

## 🎯 Принципы

### Separation of Concerns
- **Config** - вся конфигурация в одном месте
- **Services** - бизнес-логика и API
- **Hooks** - логика состояния
- **Components** - только UI

### DRY (Don't Repeat Yourself)
- Единый хук `usePayment` для всех платежей
- Переиспользуемые компоненты
- Централизованная конфигурация

### Single Responsibility
- Каждый компонент отвечает за одну задачу
- Легко тестировать и модифицировать

---

## 🔧 Быстрый старт

### Добавить тарифный план

```typescript
// src/config/pricing.config.ts
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "premium",
    name: "Premium",
    price: 999,
    displayPrice: "$999",
    features: ["Feature 1", "Feature 2"],
    // ...
  }
];
```

### Изменить тему Stripe

```typescript
// src/config/stripe.config.ts
export const STRIPE_APPEARANCE_DARK = {
  variables: {
    colorPrimary: "#YOUR_COLOR",
    // ...
  },
};
```

### Использовать хук usePayment

```typescript
import { usePayment } from "../hooks/usePayment";

const payment = usePayment({
  onSuccess: () => console.log("Успешно!"),
  onError: (error) => console.error(error),
});

payment.createPayment(100, "Plan Name", "email@example.com");
```

---

## 🎨 Основные компоненты

### PricingCard
Карточка одного тарифного плана

**Props:**
- `plan: PricingPlan`
- `isSelected: boolean`
- `onSelect: () => void`
- `animationDelay?: number`

### CheckoutForm
Форма оформления заказа с Stripe

**Props:**
- `selectedPlan: PricingPlan`
- `clientSecret: string | null`
- `isLoading: boolean`
- `error: string | null`
- `onEmailChange: (email: string) => void`
- `onPaymentSuccess: () => void`
- `onPaymentError: (error: string) => void`

### usePayment Hook
Управление процессом оплаты

**Возвращает:**
- `status: PaymentStatus` - состояние
- `error: string | null` - ошибка
- `clientSecret: string | null` - Stripe secret
- `createPayment()` - создать платеж
- `handlePaymentSuccess()` - обработать успех
- `handlePaymentError()` - обработать ошибку
- `reset()` - сбросить состояние

---

## 🔐 Конфигурация

### stripe.config.ts
- `STRIPE_KEYS` - ключи
- `STRIPE_APPEARANCE_DARK` - темная тема
- `STRIPE_APPEARANCE_LIGHT` - светлая тема
- `STRIPE_TEST_CARDS` - тестовые карты
- `STRIPE_VALIDATION` - правила валидации

### pricing.config.ts
- `PRICING_PLANS` - массив планов
- `getPlanById()` - получить план по ID
- `getPlanByName()` - получить план по имени

### env.config.ts
- `isDevelopmentMode()` - dev режим (порт 3000)
- `isNetlifyDevMode()` - Netlify Dev (порт 8888)
- `isProductionMode()` - production
- `API_ENDPOINTS` - URL эндпоинтов

---

## 🧪 Режимы работы

### Dev режим (порт 3000)
```bash
npm run dev
```
- Мок оплаты (без Stripe API)
- Быстрая итерация

### Netlify Dev (порт 8888)
```bash
netlify dev
```
- Реальный Stripe (тестовый режим)
- Проверка serverless функций
- Тестовая карта: `4242 4242 4242 4242`

### Production
```bash
npm run build
```
- Полная Stripe интеграция

---

## 📊 Преимущества архитектуры

| До рефакторинга | После |
|-----------------|-------|
| 350+ строк в одном файле | 5 файлов по 50-100 строк |
| Дублирование логики | Единый хук `usePayment` |
| Хардкод везде | Централизованная конфигурация |
| Сложно добавить план | 5 строк кода |
| Нельзя переиспользовать | Компоненты везде работают |

---

## 🚀 Расширение

### Локализация (i18n)
1. Установить `react-i18next`
2. Создать `src/i18n/config.ts`
3. Обернуть тексты в `t()` функцию
4. **Время:** 4-6 часов

### Новый payment провайдер
1. Создать `src/services/paypal.service.ts`
2. Создать `src/hooks/usePayPalPayment.ts`
3. Обновить `CheckoutForm`
4. **Время:** 1 день

### Система скидок
1. Добавить `discountCode` в `pricing.config.ts`
2. Обновить `usePayment` хук
3. Добавить поле в `CheckoutForm`
4. **Время:** 2-3 часа

---

## 📝 Заметки

- Ключи временно захардкожены для упрощения разработки
- Dev режим (порт 3000) работает без Netlify Functions
- Netlify Dev (порт 8888) использует реальные Functions
- В production используйте переменные окружения
