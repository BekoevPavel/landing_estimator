# ⚡ Быстрое решение проблемы с Stripe на Netlify

## 🎯 Проблема
Netlify функции не видят переменные окружения `STRIPE_SECRET_KEY`

## ✅ Решение за 5 минут

### Вариант 1: Через Netlify UI (рекомендуется)

1. **Откройте настройки проекта на Netlify:**
   - Зайдите на https://app.netlify.com
   - Выберите ваш проект
   - Перейдите: **Site Configuration** → **Environment Variables**

2. **Добавьте переменные:**
   ```
   Имя: STRIPE_SECRET_KEY
   Значение: sk_test_ваш_ключ (из Stripe Dashboard)
   Scope: Production, Deploy Previews, Branch Deploys (выберите все)
   
   Имя: VITE_STRIPE_PUBLISHABLE_KEY  
   Значение: pk_test_ваш_ключ (из Stripe Dashboard)
   Scope: Production, Deploy Previews, Branch Deploys (выберите все)
   ```

3. **Запустите новый деплой:**
   - **Deploys** → **Trigger deploy** → **Clear cache and deploy site**
   - ⚠️ Важно: Старые деплои не получат новые переменные!

4. **Проверьте результат:**
   - После деплоя откройте: `https://ваш-сайт.netlify.app/.netlify/functions/test-env`
   - Должны увидеть `"hasSecretKey": true` и правильный префикс ключа

### Вариант 2: Через Netlify CLI (для продвинутых)

```bash
# 1. Установите Netlify CLI (если не установлен)
npm install -g netlify-cli

# 2. Войдите в аккаунт
netlify login

# 3. Перейдите в директорию проекта
cd /Users/pavelbekoev/landing_estimator

# 4. Добавьте переменные
netlify env:set STRIPE_SECRET_KEY "sk_test_ваш_ключ"
netlify env:set VITE_STRIPE_PUBLISHABLE_KEY "pk_test_ваш_ключ"

# 5. Проверьте, что переменные добавились
./check-netlify-env.sh

# 6. Запустите новый деплой
git commit --allow-empty -m "Trigger rebuild for env vars"
git push
```

## 🔍 Где взять ключи Stripe?

1. Зайдите в [Stripe Dashboard](https://dashboard.stripe.com/)
2. Перейдите: **Developers** → **API keys**
3. Скопируйте:
   - **Secret key** (начинается с `sk_test_...`) → для `STRIPE_SECRET_KEY`
   - **Publishable key** (начинается с `pk_test_...`) → для `VITE_STRIPE_PUBLISHABLE_KEY`

## 🐛 Как проверить, что все работает?

### Проверка 1: Тестовая функция
```bash
curl https://ваш-сайт.netlify.app/.netlify/functions/test-env
```

Ожидаемый результат:
```json
{
  "stripe": {
    "hasSecretKey": true,
    "secretKeyPrefix": "sk_test_51...",
    "secretKeyLength": 107
  },
  "stripeEnvKeys": ["STRIPE_SECRET_KEY"]
}
```

### Проверка 2: Логи в Netlify

1. Зайдите в Netlify UI
2. **Functions** → `create-payment-intent`
3. Посмотрите последние логи
4. Должны увидеть:
   ```
   🔑 Environment check: {
     hasStripeKey: true,
     keyPrefix: "sk_test_51...",
     keyType: "TEST",
     ...
   }
   ```

## ❌ Частые ошибки

### Ошибка 1: `"hasSecretKey": false`
**Причина:** Переменная не установлена или не применена  
**Решение:** Добавьте переменную через UI и запустите новый деплой

### Ошибка 2: `keyType: "INVALID"`
**Причина:** Неправильный формат ключа (не начинается с `sk_test_` или `sk_live_`)  
**Решение:** Проверьте, что скопировали **Secret key**, а не Publishable key

### Ошибка 3: Переменные добавлены, но все равно не работают
**Причина:** Не запущен новый деплой  
**Решение:** Переменные применяются только к новым деплоям. Запустите "Clear cache and deploy site"

### Ошибка 4: В логах видно `allEnvKeys: []`
**Причина:** Переменные не добавлены для нужного окружения (Production/Preview)  
**Решение:** В настройках переменной выберите все окружения (Scopes)

## 🧹 После отладки

Когда все заработает, удалите тестовую функцию:
```bash
rm netlify/functions/test-env.js
git add netlify/functions/test-env.js
git commit -m "Remove test env function"
git push
```

## 📚 Подробная документация

Для детальной информации см. файл: **NETLIFY_ENV_DEBUG.md**

---

**Вопросы?** Проверьте логи функции в Netlify UI → Functions → create-payment-intent

