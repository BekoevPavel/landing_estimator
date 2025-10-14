/**
 * Конфигурация Stripe
 * Централизованное место для всех настроек Stripe
 */

// 🔧 ВРЕМЕННО: Хардкод ключей для тестирования
// В будущем можно легко заменить на import.meta.env.VITE_STRIPE_*
export const STRIPE_KEYS = {
  publishableKey: "pk_test_51SHG8eHMmvX1TBOSAVtE7JP7Xjtzc7pEYFEXM0FUcZJjgBXV3Hm3kwYxyjLvJhCPTnb0qKiApoKNB8raNtVPoLr4009vDaQbei",
  // Секретный ключ используется только в Netlify функциях
  secretKey: "sk_test_51SHG8eHMmvX1TBOSHyi6dEj4kfMOFhR2EZjH4i5RJ106DVja65n5niY9XDhxMOsZJt9kh1MToG6F6MzqvueLVAzT00NoSw96lX",
} as const;

/**
 * Внешний вид Stripe Elements (темная тема)
 */
export const STRIPE_APPEARANCE_DARK = {
  theme: "night" as const,
  variables: {
    colorPrimary: "#8b5cf6",
    colorBackground: "#1a1a1a",
    colorText: "#ffffff",
    colorDanger: "#ef4444",
    fontFamily: "system-ui, sans-serif",
    borderRadius: "12px",
  },
};

/**
 * Внешний вид Stripe Elements (светлая тема)
 */
export const STRIPE_APPEARANCE_LIGHT = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#6366f1",
    colorBackground: "#ffffff",
    colorText: "#000000",
    colorDanger: "#ef4444",
    fontFamily: "system-ui, sans-serif",
    borderRadius: "12px",
  },
};

/**
 * Тестовые данные карт Stripe
 */
export const STRIPE_TEST_CARDS = {
  success: {
    number: "4242 4242 4242 4242",
    description: "Успешная оплата",
  },
  declined: {
    number: "4000 0000 0000 0002",
    description: "Карта отклонена",
  },
  insufficientFunds: {
    number: "4000 0000 0000 9995",
    description: "Недостаточно средств",
  },
} as const;

/**
 * Конфигурация валидации
 */
export const STRIPE_VALIDATION = {
  minAmount: 0.01,
  maxAmount: 999999,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

