# 🚀 Stripe + Netlify: Краткая инструкция

## 📋 Быстрый старт

### 1. Настройка переменных окружения на Netlify
1. Перейдите: https://app.netlify.com → ваш проект
2. **Site Configuration** → **Environment Variables**
3. Добавьте переменные:
   ```
   STRIPE_SECRET_KEY = sk_test_ваш_ключ
   VITE_STRIPE_PUBLISHABLE_KEY = pk_test_ваш_ключ
   ```
4. **Важно:** Выберите все Scopes (Production + Deploy Previews + Branch Deploys)
5. Запустите новый деплой: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

**Где взять ключи:**
- https://dashboard.stripe.com/ → **Developers** → **API keys**
- Secret key начинается с `sk_test_...`
- Publishable key начинается с `pk_test_...`

---

## 🔍 Проверка работы

### Способ 1: Через браузер (GET запрос)
Откройте URL:
```
https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent
```

**Ожидаемый ответ:**
```json
{
  "configuration": {
    "hasStripeKey": true,
    "keyType": "TEST",
    "keyPrefix": "sk_test_51..."
  }
}
```

### Способ 2: Тестовый платёж (POST запрос)
```bash
curl -X POST https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 10, "planName": "Test Plan", "email": "test@test.com"}'
```

**Ожидаемый ответ:**
```json
{
  "clientSecret": "pi_xxx_secret_yyy"
}
```

### Способ 3: Логи в Netlify UI
1. **Functions** → `create-payment-intent` → Recent logs
2. Ищите строку `🔑 Environment check:`
3. Должны увидеть `hasStripeKey: true`, `keyType: "TEST"`

---

## 🐛 Решение проблем

| Проблема | Причина | Решение |
|----------|---------|---------|
| `hasStripeKey: false` | Переменная не установлена | Добавьте через Netlify UI |
| `keyType: "INVALID"` | Неправильный формат ключа | Используйте Secret key (sk_...) |
| `keyType: "MISSING"` | Переменная не видна | Запустите новый деплой |
| Старые деплои не работают | Переменные только для новых деплоев | Trigger new deploy |

**Важно:** Переменные применяются только к новым деплоям! После добавления переменных обязательно запустите новый деплой.

---

## 🧪 Тестовые карты Stripe

**Успешный платёж:**
- Карта: `4242 4242 4242 4242`
- Срок: любая будущая дата (например, 12/25)
- CVC: любые 3 цифры (например, 123)

**Проверка 3D Secure:**
- Карта: `4000 0027 6000 3184`

**Отклонённый платёж:**
- Карта: `4000 0000 0000 0002`

Все тестовые платежи видны в: https://dashboard.stripe.com/test/payments

---

## 🚀 Локальная разработка

### С Netlify Dev (рекомендуется)
```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Создайте .env файл
cat > .env << EOF
STRIPE_SECRET_KEY=sk_test_ваш_ключ
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_ваш_ключ
EOF

# Запустите локальный сервер
netlify dev
```

Функции будут доступны на: http://localhost:8888/.netlify/functions/

---

## 📁 Архитектура Stripe в проекте

```
src/
├── config/
│   ├── stripe.config.ts       # Конфигурация Stripe (ключи, темы)
│   ├── pricing.config.ts      # Тарифные планы
│   └── env.config.ts          # Настройки окружения
├── hooks/
│   └── usePayment.ts          # Хук для работы с платежами
├── services/
│   └── stripe.service.ts      # Сервис для Stripe API
├── types/
│   └── stripe.types.ts        # TypeScript типы
└── components/
    ├── pricing/
    │   ├── PricingCard.tsx    # Карточка тарифа
    │   └── CheckoutForm.tsx   # Форма оплаты
    └── StripeCheckoutForm.tsx # Stripe Elements форма

netlify/functions/
└── create-payment-intent.js   # Serverless функция для создания платежа
```

---

## 💡 Использование в коде

### Создание платежа
```typescript
import { usePayment } from '@/hooks/usePayment';

function MyComponent() {
  const payment = usePayment({
    onSuccess: () => console.log('Оплачено!'),
    onError: (err) => console.error(err)
  });

  const handlePay = () => {
    payment.createPayment(100, "Premium Plan", "user@example.com");
  };

  return (
    <button onClick={handlePay} disabled={payment.status !== 'idle'}>
      {payment.status === 'processing' ? 'Обработка...' : 'Оплатить'}
    </button>
  );
}
```

### Добавление нового тарифного плана
Просто отредактируйте `src/config/pricing.config.ts`:
```typescript
{
  name: "Enterprise",
  priceMonthly: 199,
  features: ["Всё из Premium", "Приоритетная поддержка"]
}
```

---

## 🔄 Переход на production

Когда готовы принимать реальные платежи:

1. В Stripe Dashboard переключите **Test mode** → **Live mode**
2. Скопируйте production ключи (`pk_live_...` и `sk_live_...`)
3. На Netlify обновите переменные окружения на production ключи
4. Запустите новый деплой

**Важно:** Не забудьте протестировать всё в test mode перед переходом на production!

---

## 📚 Полезные ссылки

- **Netlify Docs:** https://docs.netlify.com/functions/overview/
- **Stripe Docs:** https://stripe.com/docs/payments/payment-intents
- **Stripe Dashboard:** https://dashboard.stripe.com/
- **Netlify Dashboard:** https://app.netlify.com/

---

## ⚠️ Что НЕ нужно делать

- ❌ Не коммитьте `.env` файл с ключами в Git
- ❌ Не используйте production ключи для разработки
- ❌ Не пропускайте тестирование с тестовыми картами
- ❌ Не забывайте выбирать все Scopes для переменных окружения

---

**Создано:** Октябрь 2025  
**Проект:** Landing Estimator  
**Статус:** ✅ Готово к использованию

