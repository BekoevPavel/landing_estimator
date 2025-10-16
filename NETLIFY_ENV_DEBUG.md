# Отладка переменных окружения Stripe на Netlify

## 🔍 Проверка переменных окружения

### Шаг 1: Проверьте настройки в Netlify UI

1. Зайдите в ваш проект на Netlify
2. Перейдите в **Site Configuration** → **Environment Variables**
3. Убедитесь, что добавлены следующие переменные:
   - `STRIPE_SECRET_KEY` - для серверной функции (должен начинаться с `sk_test_` или `sk_live_`)
   - `VITE_STRIPE_PUBLISHABLE_KEY` - для фронтенда (должен начинаться с `pk_test_` или `pk_live_`)

### Шаг 2: Проверьте область видимости переменных

В Netlify есть разные уровни переменных:
- **Production** - только для production деплоя
- **Deploy previews** - для preview деплоев
- **Branch deploys** - для определенных веток

**Важно:** Убедитесь, что переменные добавлены для всех нужных окружений!

### Шаг 3: Проверьте формат ключей

Правильные форматы ключей Stripe:
```
STRIPE_SECRET_KEY=sk_test_51Abc...xyz
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Abc...xyz
```

**Ошибки, которых нужно избегать:**
- ❌ Пробелы в начале/конце значения
- ❌ Кавычки вокруг значения (Netlify не требует кавычек)
- ❌ Неправильный префикс ключа

### Шаг 4: Триггерите новый деплой

После добавления/изменения переменных окружения:
1. Переменные НЕ применяются к старым деплоям автоматически
2. Нужно запустить новый деплой: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

## 🐛 Отладка через логи

### Проверьте логи функции:

1. Зайдите в **Functions** в Netlify UI
2. Найдите функцию `create-payment-intent`
3. Посмотрите последние вызовы и их логи

В логах вы должны увидеть вывод от строк 66-71:
```javascript
console.log("🔑 Environment check:", {
  hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
  keyPrefix: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 15) : "NOT_SET",
  allEnvKeys: Object.keys(process.env).filter(k => k.includes('STRIPE'))
});
```

Ожидаемый результат:
```
🔑 Environment check: {
  hasStripeKey: true,
  keyPrefix: "sk_test_51Abc",
  allEnvKeys: ["STRIPE_SECRET_KEY"]
}
```

Если видите:
```
🔑 Environment check: {
  hasStripeKey: false,
  keyPrefix: "NOT_SET",
  allEnvKeys: []
}
```
Значит переменная не установлена или не применена.

## 🔧 Быстрая проверка

### Вариант 1: Через Netlify CLI

```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Залогиньтесь
netlify login

# Перейдите в директорию проекта
cd /Users/pavelbekoev/landing_estimator

# Проверьте переменные окружения
netlify env:list

# Если переменных нет, добавьте их:
netlify env:set STRIPE_SECRET_KEY "sk_test_ваш_ключ"
netlify env:set VITE_STRIPE_PUBLISHABLE_KEY "pk_test_ваш_ключ"
```

### Вариант 2: Создайте тестовую функцию для проверки

Создайте временную функцию для проверки переменных:

```javascript
// netlify/functions/test-env.js
exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
      stripeKeyPrefix: process.env.STRIPE_SECRET_KEY 
        ? process.env.STRIPE_SECRET_KEY.substring(0, 15) 
        : "NOT_SET",
      allStripeKeys: Object.keys(process.env).filter(k => k.includes('STRIPE')),
      nodeVersion: process.version,
    }),
  };
};
```

После деплоя вызовите: `https://ваш-сайт.netlify.app/.netlify/functions/test-env`

## ✅ Чек-лист решения проблемы

- [ ] Переменные добавлены в Netlify UI (Site Configuration → Environment Variables)
- [ ] Переменные добавлены для правильного окружения (Production/Deploy previews)
- [ ] Ключи имеют правильный формат (sk_test_ или sk_live_)
- [ ] Нет лишних пробелов или кавычек в значениях
- [ ] Запущен новый деплой после добавления переменных
- [ ] Проверены логи функции в Netlify UI
- [ ] package.json содержит зависимость "stripe" (для функций)

## 📦 Проверка зависимостей

Убедитесь, что в package.json есть:
```json
{
  "dependencies": {
    "stripe": "^14.0.0" // или любая другая версия
  }
}
```

Если нет, добавьте:
```bash
npm install stripe
git add package.json package-lock.json
git commit -m "Add stripe dependency"
git push
```

## 🚨 Частые ошибки

1. **Ошибка**: "Stripe is not a constructor"
   - **Причина**: Не установлен npm пакет `stripe`
   - **Решение**: `npm install stripe`

2. **Ошибка**: "STRIPE_SECRET_KEY not configured"
   - **Причина**: Переменная окружения не установлена
   - **Решение**: Добавьте через Netlify UI и пересоберите

3. **Ошибка**: "Invalid API Key provided"
   - **Причина**: Неправильный формат ключа или использован publishable key вместо secret
   - **Решение**: Проверьте, что используется ключ с префиксом `sk_`

## 🔐 Безопасность

**ВАЖНО**: Никогда не коммитьте секретные ключи в git!
- ✅ Используйте переменные окружения
- ✅ Добавьте `.env` в `.gitignore`
- ❌ Не хардкодьте ключи в коде
- ❌ Не используйте secret key на фронтенде

---

После выполнения всех шагов ваши ключи Stripe должны работать на Netlify! 🎉

