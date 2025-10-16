# 🧪 Тестирование Payment Intent функции

## 🔍 Проверка конфигурации (GET запрос)

Теперь вы можете просто открыть URL в браузере для проверки конфигурации:

```
https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent
```

**Ожидаемый ответ:**
```json
{
  "message": "Payment Intent API - Ready",
  "method": "POST",
  "endpoint": "/.netlify/functions/create-payment-intent",
  "configuration": {
    "hasStripeKey": true,
    "keyPrefix": "sk_test_51...",
    "keyType": "TEST",
    "nodeVersion": "v18.x.x",
    "netlifyContext": "production"
  },
  "requiredFields": ["amount", "planName"],
  "optionalFields": ["email"],
  "testWithCurl": "curl -X POST ..."
}
```

### ✅ Если видите:
- `"hasStripeKey": true` и `"keyType": "TEST"` или `"LIVE"` → **Всё настроено правильно!** ✨
- `"hasStripeKey": false` → **Ключ не установлен** → Добавьте через Netlify UI
- `"keyType": "INVALID"` → **Неправильный формат ключа** → Проверьте ключ в Stripe Dashboard

---

## 🧪 Тестирование создания платежа (POST запрос)

### Вариант 1: Через curl (в терминале)

```bash
# Тестовый запрос на создание Payment Intent
curl -X POST https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10,
    "planName": "Test Plan",
    "email": "test@example.com"
  }'
```

**Ожидаемый успешный ответ:**
```json
{
  "clientSecret": "pi_xxx_secret_yyy"
}
```

**Возможные ошибки:**

1. **"STRIPE_SECRET_KEY not configured"**
   ```json
   {
     "error": "Server configuration error",
     "message": "STRIPE_SECRET_KEY not configured"
   }
   ```
   → Добавьте ключ через Netlify UI

2. **"Missing required fields"**
   ```json
   {
     "error": "Validation error",
     "message": "Missing required fields: amount and planName"
   }
   ```
   → Проверьте, что передаёте `amount` и `planName`

3. **"Invalid API Key provided"**
   ```json
   {
     "error": "Payment processing error",
     "message": "Invalid API Key provided"
   }
   ```
   → Проверьте правильность ключа в Stripe Dashboard

### Вариант 2: Через JavaScript (в консоли браузера)

Откройте консоль разработчика (F12) на вашем сайте и выполните:

```javascript
// Тест создания Payment Intent
fetch('/.netlify/functions/create-payment-intent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 10,
    planName: 'Test Plan',
    email: 'test@example.com'
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('✅ Успех:', data);
    if (data.clientSecret) {
      console.log('🎉 Payment Intent создан!');
      console.log('Client Secret:', data.clientSecret);
    }
  })
  .catch(error => {
    console.error('❌ Ошибка:', error);
  });
```

### Вариант 3: Через Postman или Insomnia

**URL:** `https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent`  
**Method:** POST  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "amount": 10,
  "planName": "Test Plan",
  "email": "test@example.com"
}
```

---

## 📊 Проверка логов на Netlify

1. Зайдите в Netlify UI
2. **Functions** → `create-payment-intent`
3. Посмотрите последние вызовы

В логах должны быть:
```
🔍 Netlify Function: create-payment-intent called
🔑 Environment check: { hasStripeKey: true, keyType: "TEST", ... }
📦 Request data: { amount: 10, planName: "Test Plan", ... }
💳 Creating PaymentIntent with Stripe...
✅ PaymentIntent created: pi_xxxxx
```

---

## 🎯 Полный чек-лист проверки

### Шаг 1: Проверка конфигурации
- [ ] Откройте в браузере: `https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent`
- [ ] Убедитесь: `"hasStripeKey": true`
- [ ] Убедитесь: `"keyType": "TEST"` или `"LIVE"`

### Шаг 2: Проверка тестовой функции
- [ ] Откройте: `https://ваш-сайт.netlify.app/.netlify/functions/test-env`
- [ ] Проверьте: `"hasSecretKey": true`

### Шаг 3: Тестирование создания платежа
- [ ] Выполните curl команду из GET ответа
- [ ] Получите `clientSecret` в ответе
- [ ] Проверьте логи в Netlify UI

### Шаг 4: Проверка в Stripe Dashboard
- [ ] Зайдите в https://dashboard.stripe.com/test/payments
- [ ] Должны увидеть созданный Payment Intent
- [ ] Статус: "Requires payment method" (это нормально для теста)

---

## 🚀 Локальное тестирование (для разработки)

### Через Netlify Dev:

```bash
# Запустите локальный сервер с функциями
npm run netlify:dev

# В другом терминале:
curl -X POST http://localhost:8888/.netlify/functions/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 10, "planName": "Local Test"}'
```

### Переменные окружения для локальной разработки:

Создайте файл `.env` (если ещё не создан):
```bash
cp .env.example .env
```

Добавьте ваши ключи:
```env
STRIPE_SECRET_KEY=sk_test_ваш_ключ
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_ваш_ключ
```

---

## 🔧 Быстрые команды для копирования

### Проверка конфигурации (замените URL на ваш):
```bash
# GET - проверка конфигурации
curl https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent

# Или откройте в браузере
open https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent
```

### Тестовый платёж (замените URL на ваш):
```bash
# POST - создание Payment Intent
curl -X POST https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 10, "planName": "Test", "email": "test@test.com"}'
```

---

## ❓ FAQ

**Q: Что делать, если получаю "hasStripeKey": false?**  
A: Добавьте переменную `STRIPE_SECRET_KEY` через Netlify UI и запустите новый деплой.

**Q: Можно ли использовать GET для реальных платежей?**  
A: Нет! GET используется только для проверки конфигурации. Реальные платежи только через POST.

**Q: Безопасно ли показывать keyPrefix в GET ответе?**  
A: Да, показываются только первые 15 символов для отладки. Полный ключ никогда не раскрывается.

**Q: Что делать после успешных тестов?**  
A: Удалите тестовую функцию `test-env.js` и можете отключить GET поддержку в `create-payment-intent.js` если хотите.

---

**Удачного тестирования! 🎉**

