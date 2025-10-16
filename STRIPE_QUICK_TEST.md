# ⚡ Быстрая проверка Stripe - 30 секунд

## 🎯 Что я исправил

**Проблема:** Вы открывали функцию в браузере (GET запрос), но она принимала только POST.

**Решение:** Теперь функция поддерживает GET для отладки! 🎉

---

## 🚀 Проверьте прямо сейчас!

### Шаг 1: Откройте в браузере
```
https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent
```

### Шаг 2: Смотрите результат

#### ✅ Если всё хорошо:
```json
{
  "configuration": {
    "hasStripeKey": true,
    "keyType": "TEST",
    "keyPrefix": "sk_test_51..."
  }
}
```
**→ Всё настроено правильно! Можно использовать!** 🎉

#### ❌ Если ключа нет:
```json
{
  "configuration": {
    "hasStripeKey": false,
    "keyType": "MISSING",
    "keyPrefix": "NOT_SET"
  }
}
```
**→ Нужно добавить ключ на Netlify** (см. ниже)

---

## 🔧 Быстрое исправление (если ключа нет)

### Вариант А: Через Netlify UI (2 минуты)

1. https://app.netlify.com → ваш проект
2. **Site Configuration** → **Environment Variables**
3. **Add a variable**:
   - Key: `STRIPE_SECRET_KEY`
   - Value: `sk_test_ваш_ключ` (из Stripe Dashboard)
   - Scopes: выберите все
4. **Deploys** → **Trigger deploy** → **Clear cache and deploy site**
5. Подождите 1-2 минуты (пока соберётся)
6. Обновите страницу с проверкой - должно быть `"hasStripeKey": true` ✅

### Вариант Б: Через CLI (1 минута)

```bash
# Добавьте ключ
netlify env:set STRIPE_SECRET_KEY "sk_test_ваш_ключ"

# Запустите деплой
git commit --allow-empty -m "Trigger rebuild"
git push
```

---

## 📍 Где взять ключ Stripe

1. https://dashboard.stripe.com/
2. **Developers** → **API keys**
3. Скопируйте **Secret key** (начинается с `sk_test_...`)

---

## 🧪 Тестовый платёж (после успешной проверки)

Скопируйте команду curl из GET ответа или используйте:

```bash
curl -X POST https://ваш-сайт.netlify.app/.netlify/functions/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 10, "planName": "Test Plan"}'
```

**Ожидаемый ответ:**
```json
{
  "clientSecret": "pi_xxx_secret_yyy"
}
```

---

## 📋 Дополнительные материалы

- **TEST_PAYMENT_FUNCTION.md** - детальное руководство по тестированию
- **QUICK_FIX_STRIPE.md** - полная инструкция по настройке
- **NETLIFY_ENV_DEBUG.md** - глубокая отладка проблем

---

**Вопросы?** Просто откройте URL в браузере и смотрите статус! 🚀

