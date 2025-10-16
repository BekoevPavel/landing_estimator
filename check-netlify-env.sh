#!/bin/bash

# 🔍 Скрипт для проверки переменных окружения на Netlify
# Использование: ./check-netlify-env.sh

echo "🔍 Проверка переменных окружения Netlify..."
echo ""

# Проверяем, установлен ли Netlify CLI
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI не установлен!"
    echo "📦 Установите его командой: npm install -g netlify-cli"
    echo ""
    exit 1
fi

echo "✅ Netlify CLI установлен"
echo ""

# Проверяем авторизацию
echo "🔐 Проверяем авторизацию..."
if ! netlify status &> /dev/null; then
    echo "❌ Не авторизованы в Netlify"
    echo "🔑 Выполните: netlify login"
    echo ""
    exit 1
fi

echo "✅ Авторизованы в Netlify"
echo ""

# Показываем список переменных окружения
echo "📋 Список переменных окружения:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
netlify env:list
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Проверяем наличие ключевых переменных
echo "🔑 Проверка Stripe переменных:"
echo ""

if netlify env:get STRIPE_SECRET_KEY &> /dev/null; then
    KEY_PREFIX=$(netlify env:get STRIPE_SECRET_KEY | head -c 15)
    echo "✅ STRIPE_SECRET_KEY: установлен (префикс: $KEY_PREFIX...)"
else
    echo "❌ STRIPE_SECRET_KEY: НЕ УСТАНОВЛЕН!"
    echo "   Добавьте командой: netlify env:set STRIPE_SECRET_KEY 'sk_test_ваш_ключ'"
fi

if netlify env:get VITE_STRIPE_PUBLISHABLE_KEY &> /dev/null; then
    KEY_PREFIX=$(netlify env:get VITE_STRIPE_PUBLISHABLE_KEY | head -c 15)
    echo "✅ VITE_STRIPE_PUBLISHABLE_KEY: установлен (префикс: $KEY_PREFIX...)"
else
    echo "❌ VITE_STRIPE_PUBLISHABLE_KEY: НЕ УСТАНОВЛЕН!"
    echo "   Добавьте командой: netlify env:set VITE_STRIPE_PUBLISHABLE_KEY 'pk_test_ваш_ключ'"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Следующие шаги:"
echo "1. Если переменные не установлены, добавьте их:"
echo "   netlify env:set STRIPE_SECRET_KEY 'sk_test_...'"
echo "   netlify env:set VITE_STRIPE_PUBLISHABLE_KEY 'pk_test_...'"
echo ""
echo "2. После добавления переменных запустите новый деплой:"
echo "   git commit --allow-empty -m 'Trigger rebuild for env vars'"
echo "   git push"
echo ""
echo "3. Или через Netlify UI: Deploys → Trigger deploy → Clear cache and deploy site"
echo ""
echo "4. Проверьте функцию test-env после деплоя:"
echo "   curl https://ваш-сайт.netlify.app/.netlify/functions/test-env"
echo ""

