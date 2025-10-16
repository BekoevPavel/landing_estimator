# 🔧 Отладка Stripe на Netlify - Краткая памятка

## 📋 Что я сделал для вас

### 1. **Улучшил логирование в функции create-payment-intent**
Теперь при каждом вызове функции в логах будет видно:
- Есть ли ключ Stripe
- Первые 15 символов ключа
- Длина ключа
- Тип ключа (TEST/LIVE/INVALID/MISSING)
- Все переменные окружения с "STRIPE"
- Версия Node.js
- Контекст Netlify (production/deploy-preview/branch-deploy)

### 2. **Создал тестовую функцию `test-env.js`**
Путь: `netlify/functions/test-env.js`

После деплоя можно вызвать:
```
https://ваш-сайт.netlify.app/.netlify/functions/test-env
```

Она покажет полную информацию о переменных окружения.

### 3. **Создал скрипт для проверки через CLI**
Файл: `check-netlify-env.sh`

Запуск:
```bash
./check-netlify-env.sh
```

Скрипт проверит:
- Установлен ли Netlify CLI
- Авторизованы ли вы
- Какие переменные установлены
- Правильные ли префиксы у ключей Stripe

### 4. **Написал подробные инструкции**
- **QUICK_FIX_STRIPE.md** - быстрое решение за 5 минут
- **NETLIFY_ENV_DEBUG.md** - полная документация по отладке

## 🎯 Что нужно сделать прямо сейчас

### Шаг 1: Добавьте переменные на Netlify

Зайдите на https://app.netlify.com → ваш проект → **Site Configuration** → **Environment Variables**

Добавьте:
```
STRIPE_SECRET_KEY = sk_test_ваш_ключ
VITE_STRIPE_PUBLISHABLE_KEY = pk_test_ваш_ключ
```

**Важно:** Выберите все Scopes (Production + Deploy Previews + Branch Deploys)

### Шаг 2: Запустите новый деплой

Через Netlify UI: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

Или через git:
```bash
git commit --allow-empty -m "Trigger rebuild for env vars"
git push
```

### Шаг 3: Проверьте результат

**Вариант А:** Откройте тестовую функцию в браузере:
```
https://ваш-сайт.netlify.app/.netlify/functions/test-env
```

**Вариант Б:** Посмотрите логи в Netlify UI:
1. Functions → create-payment-intent
2. Найдите последний вызов
3. Ищите строку `🔑 Environment check:`

Должны увидеть:
```javascript
{
  hasStripeKey: true,
  keyPrefix: "sk_test_51...",
  keyType: "TEST",
  ...
}
```

## 🚀 Где взять ключи Stripe

1. https://dashboard.stripe.com/
2. Developers → API keys
3. Скопируйте оба ключа (Secret и Publishable)

## ⚠️ Важные замечания

1. **Переменные применяются только к новым деплоям**  
   После добавления переменных обязательно запустите новый деплой!

2. **Не забудьте выбрать все Scopes**  
   Переменные должны быть доступны для Production, Deploy Previews и Branch Deploys

3. **Проверьте формат ключей**  
   - Secret key начинается с `sk_test_` или `sk_live_`
   - Publishable key начинается с `pk_test_` или `pk_live_`

4. **Удалите тестовую функцию после отладки**  
   ```bash
   rm netlify/functions/test-env.js
   ```

## 🔍 Типичные проблемы и решения

| Проблема | Причина | Решение |
|----------|---------|---------|
| `hasStripeKey: false` | Переменная не установлена | Добавьте через Netlify UI |
| `keyType: "INVALID"` | Неправильный формат ключа | Проверьте, что используете Secret key (sk_...) |
| `allEnvKeys: []` | Переменные не видны | Запустите новый деплой |
| `keyPrefix: "NOT_SET"` | Не выбраны нужные Scopes | Добавьте переменную для всех окружений |

## 📞 Если ничего не помогло

1. Запустите скрипт проверки:
   ```bash
   ./check-netlify-env.sh
   ```

2. Посмотрите логи функции в Netlify UI

3. Проверьте, что в package.json есть зависимость `"stripe"` (уже есть в вашем проекте)

4. Откройте NETLIFY_ENV_DEBUG.md для детальной инструкции

---

**Удачи с настройкой! 🚀**

