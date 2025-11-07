/**
 * Конфигурация окружения
 * Централизованное определение режима работы приложения
 */

/**
 * Проверяет, работает ли приложение в dev режиме
 * Dev режим = любой localhost (включая Netlify Dev на 8888)
 */
export const isDevelopmentMode = (): boolean => {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.port === "3000" ||
    window.location.port === "8888"
  );
};

/**
 * Проверяет, работает ли приложение в Netlify Dev режиме
 * Netlify Dev обычно использует порт 8888
 */
export const isNetlifyDevMode = (): boolean => {
  return window.location.port === "8888";
};

/**
 * API эндпоинты
 */
export const API_ENDPOINTS = {
  createPaymentIntent: "/.netlify/functions/create-payment-intent",
} as const;

