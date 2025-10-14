#!/usr/bin/env node

/**
 * Тестовый скрипт для проверки Stripe API
 * Использование: node test-stripe-api.js
 */

const https = require('https');

// Цвета для вывода в консоль
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, ...args) {
  console.log(color, ...args, colors.reset);
}

// Тестовые данные
const testData = {
  amount: 10,
  planName: 'Test Payment',
  email: 'test@example.com',
};

const apiUrl = 'http://localhost:8888/.netlify/functions/create-payment-intent';

async function testNetlifyFunction() {
  log(colors.cyan, '\n🧪 Тест 1: Netlify Function');
  log(colors.blue, '📡 URL:', apiUrl);
  log(colors.blue, '📦 Data:', JSON.stringify(testData, null, 2));

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    log(colors.yellow, '\n📊 Status:', response.status, response.statusText);
    
    const data = await response.json();
    
    if (response.ok) {
      log(colors.green, '✅ Успех!');
      log(colors.green, '🔑 Client Secret получен:', data.clientSecret.substring(0, 30) + '...');
    } else {
      log(colors.red, '❌ Ошибка!');
      log(colors.red, '💬 Message:', data.message || data.error);
      if (data.hint) {
        log(colors.yellow, '💡 Hint:', data.hint);
      }
    }
  } catch (error) {
    log(colors.red, '❌ Ошибка запроса:', error.message);
  }
}

async function testStripeDirectly() {
  log(colors.cyan, '\n🧪 Тест 2: Прямой запрос к Stripe API');
  
  // Пытаемся прочитать ключ из .env
  
  let stripeKey = 'sk_test_51SHG8eHMmvX1TBOSHyi6dEj4kfMOFhR2EZjH4i5RJ106DVja65n5niY9XDhxMOsZJt9kh1MToG6F6MzqvueLVAzT00NoSw96lX';
  
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const match = envContent.match(stripeKey);
      if (match) {
        stripeKey = match[1].trim();
        log(colors.blue, '🔑 Ключ найден в .env');
        log(colors.blue, '📌 Preview:', stripeKey.substring(0, 20) + '...');
      }
    }
  } catch (error) {
    log(colors.yellow, '⚠️  Не удалось прочитать .env:', error.message);
  }

  if (!stripeKey) {
    log(colors.yellow, '⚠️  STRIPE_SECRET_KEY не найден в .env, пропускаем тест');
    return;
  }

  // Тестовый запрос к Stripe API
  const stripe = require('stripe')(stripeKey);
  
  try {
    log(colors.blue, '💳 Пытаемся создать PaymentIntent...');
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // $10.00
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    log(colors.green, '✅ PaymentIntent создан успешно!');
    log(colors.green, '🆔 ID:', paymentIntent.id);
    log(colors.green, '💰 Amount:', paymentIntent.amount / 100, 'USD');
    log(colors.green, '🔑 Client Secret:', paymentIntent.client_secret.substring(0, 30) + '...');
    
  } catch (error) {
    log(colors.red, '❌ Ошибка Stripe API!');
    log(colors.red, '🔴 Type:', error.type);
    log(colors.red, '💬 Message:', error.message);
    
    if (error.type === 'StripeAuthenticationError') {
      log(colors.yellow, '\n💡 Решение:');
      log(colors.yellow, '   1. Зайдите на https://dashboard.stripe.com/test/apikeys');
      log(colors.yellow, '   2. Скопируйте актуальный Secret key');
      log(colors.yellow, '   3. Обновите STRIPE_SECRET_KEY в .env файле');
      log(colors.yellow, '   4. Перезапустите netlify dev');
    }
  }
}

// Запуск тестов
(async () => {
  log(colors.cyan, '═══════════════════════════════════════════════');
  log(colors.cyan, '        ТЕСТИРОВАНИЕ STRIPE ИНТЕГРАЦИИ         ');
  log(colors.cyan, '═══════════════════════════════════════════════');

  await testNetlifyFunction();
  await testStripeDirectly();

  log(colors.cyan, '\n═══════════════════════════════════════════════');
  log(colors.cyan, '                 ТЕСТЫ ЗАВЕРШЕНЫ               ');
  log(colors.cyan, '═══════════════════════════════════════════════\n');
})();

