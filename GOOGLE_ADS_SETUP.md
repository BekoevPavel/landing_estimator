# 🚀 Google Ads Setup — EstimateFast

**Дата создания:** 20 октября 2025  
**Бюджет:** $150 (smoke test)  
**Цель:** Валидация спроса на AI project estimation tool

---

## ✅ ЧТО УЖЕ НАСТРОЕНО

### 📊 Campaign Settings

```
Campaign Name: Campaign #1
Type: Search
Status: DRAFT (не запущена)

Goal: Website traffic → Clicks
Network: Google Search only (без Partners, без Display)
```

### 🌍 Targeting

```
Location: India (tier-1 cities only)
  - Bangalore
  - Hyderabad
  - Pune
  - Gurgaon
  - Noida

Language: English

Audiences: None (observation mode for all)
```

### 💰 Budget & Bidding

```
Daily Budget: 525 THB/день (~$15)
Total Budget: ~5,250 THB ($150)
Duration: 10 дней

Bid Strategy: Maximize Clicks
Max CPC: 35 THB (~$1)
Avg Expected CPC: 25 THB (~$0.70)

Expected Results:
- Clicks: ~210
- Sign-ups (20% CR): ~40
- Payment attempts (5% CR): ~10-12
```

### 🔑 Keywords (7 штук, Phrase Match)

```
"project estimation tool"
"project cost calculator"
"freelance project calculator"
"estimate project cost"
"software estimation tool"
"project pricing calculator"
"ai project estimation"

Negative Keywords:
free, tutorial, template, excel, course, diy
```

### 📝 Ad Copy

**Headlines (6):**
1. AI Project Estimates in 30 Min
2. 8 AI Agents Like Senior Team
3. Stop Undercharging Projects
4. 8 AI Agents Estimate Projects
5. Freelancers Earn 40% More
6. 200+ Tasks Detailed Backlog

**Descriptions (4):**
1. 8 AI agents work like senior team: Engineer, Designer, PM, QA, DevOps, Analyst. 30 minutes.
2. ChatGPT = 1 junior AI. EstimateFast = 8 senior AI agents. Detailed backlog, not guesses.
3. Humans: 5 hours, ±50% accuracy. Our AI team: 30 min, ±15% accuracy. 200+ detailed tasks.
4. First 100 users: 50% off lifetime. Join waitlist ₹1,600/month. Perfect for freelancers.

**Extensions:**
- Display path: /freelancers/waitlist
- Callouts: 8 AI Agents, 30-Min Estimates, ±15% Accuracy, 50% Off
- Structured snippets: Services (estimation, backlog, risk analysis, etc.)

---

## 🔴 ТЕКУЩИЙ СТАТУС

### ⚫ Campaign Status: DRAFT

```
❌ Не запущена
❌ Не на review
❌ Деньги не тратятся
❌ Ads не показываются

Причина: Payment method не добавлен (ошибка Thai billing + KZ card)
```

### 💳 Payment Issue

```
Проблема: Thai billing profile + Kazakhstan card = mismatch
Решение: Создать Kazakhstan payments profile

Нужно:
- Country: Kazakhstan
- Address: Abay Avenue, 68, Almaty, 050000
- Card: казахская Visa/Mastercard
```

### 📊 Tracking Status

```
❌ Google Tag (gtag.js) НЕ установлен
❌ Conversion tracking НЕ настроен
❌ НЕ будет видно:
   - Sign-ups
   - Payment attempts
   - Только: clicks, impressions, CTR
```

---

## 📋 TODO (Before Launch)

### 1. Доделать лендинг
```
☐ Проверить форму sign-up
☐ Проверить "фейковую платежку"
☐ Текст после payment attempt: "Thanks! Launching soon. You're on priority list."
☐ Тесты на мобильном
☐ Английский везде
```

### 2. Установить Google Tag
```
☐ Скопировать код из Google Ads
☐ Вставить в <head> на estimatefast.ink
☐ Задеплоить
```

### 3. Настроить Conversion Tracking
```
☐ В Google Ads: Goals → Conversions → New conversion
☐ Event 1: "sign_up" (email submitted)
☐ Event 2: "payment_attempt" (clicked Pay) ← главная метрика!
☐ Добавить gtag events на лендинг
```

### 4. Добавить Payment Method
```
☐ Google Ads → Resume draft
☐ Create Kazakhstan payments profile
☐ Добавить казахскую карту
☐ Submit campaign
```

### 5. Запустить!
```
☐ Status: Draft → Under review (1-2 часа)
☐ После approval: Enabled → показывается
☐ Начинается трата $15/день
```

---

## 🗓️ ROADMAP

### Week 1 (Days 1-7): Data Collection

```
Bid Strategy: Clicks (maximize traffic)
Budget: $15/день × 7 = $105

Track:
✅ Clicks
✅ CTR
✅ Avg CPC
✅ Sign-ups (manual или через gtag)
✅ Payment attempts ← ГЛАВНАЯ МЕТРИКА

Success Criteria:
✅ Payment attempts > 10 = спрос есть
✅ Payment attempts > 15 = strong validation
❌ Payment attempts < 5 = pivot
```

### Week 2 (Days 8-10): Optimize or Stop

```
If payment attempts > 15:
  ✅ Switch bid strategy: Clicks → Conversions
  ✅ Target: payment_attempt event
  ✅ Spend remaining $45
  ✅ Build MVP!

If payment attempts < 10:
  ⚠️ Analyze data:
     - CTR плохой? → Fix ads
     - Sign-ups есть но payment нет? → Fix pricing/offer
     - Всё плохо? → Pivot or stop
```

### After Validation (если спрос есть):

```
1. Build MVP (реальный продукт)
2. Switch to subscription model ($20-30/mo)
3. Scale ads:
   - Budget: $50-100/день
   - Add: USA, UK, Canada
   - Conversion bidding на payment
4. Profit! 🚀
```

---

## 📊 KEY METRICS TO TRACK

```
Primary Metric:
🎯 Payment Attempts (willingness to pay)
   Goal: 10-15+ за $150

Secondary Metrics:
- Sign-ups: 30-50
- Sign-up CR: 15-25%
- Payment CR: 5-8% of sign-ups
- CPC: $0.70-1.00
- CTR: 2-5%

If payment attempts > 15 за $150:
= $10 per validated customer
= Отличный результат для smoke test!
```

---

## 🔥 КРИТИЧНЫЕ МОМЕНТЫ

### 1. Conversion Tracking = Must Have
```
Без gtag не увидишь payment attempts
= Не поймешь есть ли спрос
= Зря потратишь $150

Решение: Установить до запуска!
```

### 2. Payment Intent > Sign-ups
```
Sign-ups = "интересно"
Payment attempts = "готов платить"

Payment attempts - это твоя главная метрика для go/no-go!
```

### 3. Switch to Conversions bidding
```
Только после 15+ conversions
Иначе Google не успеет обучиться
```

---

## 📞 NEXT SESSION CHECKLIST

Когда вернешься через 3 дня:

```
1. ☐ Проверить статус кампании (Draft / Running / Paused?)
2. ☐ Если Running: посмотреть metrics
3. ☐ Сколько payment attempts?
4. ☐ Если > 15: switch to Conversions bidding
5. ☐ Если < 5: анализ и pivot
```

---

## 🎯 КОНТАКТЫ И НАСТРОЙКИ

```
Google Ads Account: 836-126-9805
Campaign ID: #1
Gtag ID: AW-1765393916

Landing: https://estimatefast.ink
Billing: Kazakhstan (Almaty)
Currency: THB (но можно будет KZT после смены billing)
```

---

## 💡 ВАЖНЫЕ ССЫЛКИ

- [MARKETING_CHEATSHEET.md](./MARKETING_CHEATSHEET.md) - Messaging & copy
- [MARKETING_DELIVERABLES.md](./MARKETING_DELIVERABLES.md) - Strategy overview
- Google Ads: https://ads.google.com
- Conversion tracking guide: https://support.google.com/google-ads/answer/1722054

---

**Версия:** 1.0  
**Статус:** ⚫ DRAFT (ready to launch after payment setup)  
**Next Step:** Установить gtag + добавить payment → Launch! 🚀

