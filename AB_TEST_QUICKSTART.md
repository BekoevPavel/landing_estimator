# ⚡ A/B Test Quick Start

## 🎯 3 шага до запуска

### 1️⃣ Зарегистрируйся в PostHog (5 минут)

```
https://app.posthog.com/signup
→ Создай проект (Web → React)
→ Скопируй Project API Key (phc_xxxxx)
```

### 2️⃣ Создай Feature Flag в PostHog

```
Feature Flags → New flag
→ Key: pricing_test
→ Release: 50% variant-a, 50% variant-b
→ Save & Enable
```

### 3️⃣ Создай .env.local в корне проекта

```bash
# Создай файл
touch .env.local

# Добавь в него:
VITE_POSTHOG_KEY=phc_ТВОЙ_КЛЮЧ_СЮДА
```

### Бонус: Microsoft Clarity (опционально, 2 минуты)

```
https://clarity.microsoft.com
→ New project: EstimateFast
→ Скопируй Project ID
→ Вставь в index.html вместо YOUR_CLARITY_PROJECT_ID
```

---

## ▶️ Запуск

```bash
npm run dev
```

Открой http://localhost:5173 и:

✅ В консоли увидишь: `✅ PostHog initialized`  
✅ На pricing странице увидишь: `🧪 A/B Test Active: Variant A`  
✅ Обнови страницу 5 раз → иногда увидишь Variant B (цены $18/$49/$120)

---

## 📊 Проверка данных

**PostHog:**
```
app.posthog.com → Activity
→ Увидишь события: pricing_viewed, plan_selected
```

**Clarity:**
```
clarity.microsoft.com → Recordings
→ Через 5 минут увидишь первые записи
```

---

## 🚀 Деплой на Netlify

```bash
# 1. Добавь env var на Netlify
Site Settings → Environment Variables
→ VITE_POSTHOG_KEY = твой_ключ

# 2. Deploy
git add .
git commit -m "Add A/B test"
git push origin main
```

---

**Подробная инструкция:** см. `AB_TEST_SETUP.md`

🎉 **Готово!**







