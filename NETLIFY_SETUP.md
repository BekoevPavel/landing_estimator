# 🚀 Инструкция по деплою на Netlify со Stripe

> 📚 [← Вернуться к главной документации](./DOCS.md)

## 📋 Что было добавлено

1. ✅ Конфигурация Netlify (`netlify.toml`)
2. ✅ Serverless функция для создания PaymentIntent
3. ✅ Интеграция Stripe Elements в фронтенд
4. ✅ Зависимости для работы со Stripe

---

## 🔑 Шаг 1: Подготовка переменных окружения

### Создайте файл `.env` в корне проекта:

```bash
# Копируйте .env.example и заполните значения
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_ваш_ключ_здесь
STRIPE_SECRET_KEY=sk_test_ваш_ключ_здесь
```

**Ваши ключи из Stripe Dashboard:**
- Publishable key: `pk_test_51SHG8eHMmvX1TB0SAVLt7JP7Xjtzc7...`
- Secret key: `sk_test_51SHG8eHMmvX1TB0SHyi6dEj4kfM0Fh...`

⚠️ **Важно:** Файл `.env` уже добавлен в `.gitignore` и не будет залит в Git!

---

## 🌐 Шаг 2: Создание проекта на Netlify

### Вариант A: Через веб-интерфейс (проще)

1. Перейдите на [netlify.com](https://netlify.com)
2. Нажмите **"Add new site"** → **"Import an existing project"**
3. Выберите **GitHub** и авторизуйте доступ
4. Найдите репозиторий `landing_estimator`
5. Netlify автоматически определит настройки из `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
6. **НЕ деплойте пока!** Сначала настройте переменные окружения ⬇️

### Вариант B: Через Netlify CLI (для продвинутых)

```bash
# Установите Netlify CLI глобально
npm install -g netlify-cli

# Авторизуйтесь
netlify login

# Инициализируйте проект
netlify init

# Следуйте инструкциям в терминале
```

---

## 🔐 Шаг 3: Настройка переменных окружения на Netlify

**Это самый важный шаг!**

1. В Dashboard вашего сайта на Netlify перейдите:
   - **Site settings** → **Environment variables**

2. Добавьте две переменные:

   | Key | Value | Scopes |
   |-----|-------|--------|
   | `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_test_51SHG8e...` | All scopes |
   | `STRIPE_SECRET_KEY` | `sk_test_51SHG8e...` | All scopes |

3. Нажмите **Save**

---

## 🚀 Шаг 4: Деплой!

### Если через веб-интерфейс:
После добавления переменных окружения нажмите **"Deploy site"** или **"Trigger deploy"**

### Если через CLI:
```bash
netlify deploy --prod
```

### Автоматический деплой (настройка один раз):
После первого деплоя каждый `git push` будет автоматически деплоить сайт:

```bash
git add .
git commit -m "Added Stripe integration"
git push origin main
```

Netlify автоматически:
1. Заберет код из GitHub
2. Запустит `npm run build`
3. Задеплоит фронтенд
4. Задеплоит serverless функции
5. Настроит маршруты

---

## ✅ Шаг 5: Проверка работы

После деплоя:

1. Откройте ваш сайт (URL вида `https://your-site-name.netlify.app`)
2. Пройдите до страницы pricing
3. Выберите план
4. Введите email
5. Должна появиться форма Stripe для оплаты
6. Используйте тестовую карту: **4242 4242 4242 4242**
   - Любая будущая дата (например, 12/25)
   - Любой CVC (например, 123)

---

## 🔍 Отладка проблем

### Если форма Stripe не появляется:

1. **Проверьте переменные окружения:**
   ```bash
   # В Netlify CLI
   netlify env:list
   ```

2. **Проверьте логи функций:**
   - Netlify Dashboard → Functions → Выберите `create-payment-intent`
   - Посмотрите логи вызовов

3. **Проверьте консоль браузера:**
   - Откройте DevTools (F12)
   - Вкладка Console - ищите ошибки

### Если функция не работает:

```bash
# Локальная отладка с Netlify Dev
netlify dev

# Это запустит:
# - Фронтенд на localhost:8888
# - Функции локально
```

---

## 🎯 Локальная разработка с Netlify Dev

Для тестирования функций локально:

```bash
# Убедитесь, что .env файл создан с ключами

# Запустите Netlify Dev
netlify dev

# Или используйте обычный Vite
npm run dev
# (но функции не будут работать без Netlify Dev)
```

---

## 📊 Мониторинг платежей

Все тестовые платежи можно отслеживать в Stripe Dashboard:
- [https://dashboard.stripe.com/test/payments](https://dashboard.stripe.com/test/payments)

---

## 🔄 Переход на production режим

Когда будете готовы к реальным платежам:

1. В Stripe Dashboard переключите Test mode → Live mode
2. Скопируйте production ключи (`pk_live_...` и `sk_live_...`)
3. На Netlify обновите переменные окружения на production ключи
4. Пересоберите сайт

---

## 🆘 Нужна помощь?

- Netlify Docs: https://docs.netlify.com
- Stripe Docs: https://stripe.com/docs
- Ваши логи функций: Netlify Dashboard → Functions

---

## ✨ Готово!

Теперь у вас:
- ✅ Автоматический деплой из GitHub
- ✅ Работающая интеграция Stripe
- ✅ Serverless функции для обработки платежей
- ✅ Один `git push` для обновления всего

**Следующий шаг:** `git push` и всё автоматически задеплоится! 🚀
