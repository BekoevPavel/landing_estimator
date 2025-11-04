import posthog from 'posthog-js';

/**
 * Инициализация PostHog для аналитики и A/B тестов
 * 
 * Возможности:
 * - Session recording (запись движений мыши, кликов)
 * - Event tracking (конверсии, клики на кнопки)
 * - A/B тесты через Feature Flags
 * - Funnels (воронка конверсий)
 */
export const initPostHog = () => {
  if (typeof window === 'undefined') return;
  
  // Получаем ключ из environment variables
  const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
  
  if (!posthogKey) {
    console.warn('⚠️ PostHog key not found. Analytics disabled.');
    return;
  }
  
  posthog.init(posthogKey, {
    api_host: 'https://app.posthog.com',
    
    // Session Recording - записываем движения мыши, клики, скролл
    session_recording: {
      maskAllInputs: false, // записывать ввод в формы (пароли автоматически замаскированы)
      recordCrossOriginIframes: true,
    },
    
    // Auto capture - автоматически ловит клики на кнопки и ссылки
    autocapture: true,
    capture_pageview: true, // автоматический tracking переходов между страницами
    capture_pageleave: true, // отслеживание выхода со страницы
    
    // Performance
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        posthog.debug(); // включаем debug mode в development
        console.log('✅ PostHog initialized in DEBUG mode');
      }
    },
  });
};

// Export для использования в компонентах
export { posthog };






