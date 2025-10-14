/**
 * Конфигурация окружения
 * Централизованное определение режима работы приложения
 */

/**
 * Проверяет, работает ли приложение в dev режиме
 * Dev режим = Vite dev server на порту 3000 (без Netlify Dev)
 */
export const isDevelopmentMode = (): boolean => {
  return window.location.port === "3000";
};

/**
 * Проверяет, работает ли приложение в Netlify Dev режиме
 * Netlify Dev обычно использует порт 8888
 */
export const isNetlifyDevMode = (): boolean => {
  return window.location.port === "8888";
};

/**
 * Проверяет, работает ли приложение в production
 */
export const isProductionMode = (): boolean => {
  return !isDevelopmentMode() && !isNetlifyDevMode();
};

/**
 * API эндпоинты
 */
export const API_ENDPOINTS = {
  createPaymentIntent: "/.netlify/functions/create-payment-intent",
} as const;

/**
 * Получить base URL для API запросов
 */
export const getApiBaseUrl = (): string => {
  if (isDevelopmentMode()) {
    return ""; // В dev режиме API не доступен, используем моки
  }
  return ""; // В остальных случаях используем relative paths
};

