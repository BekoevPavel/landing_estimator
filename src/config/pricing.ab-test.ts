import { posthog } from '../analytics/posthog.config';

/**
 * A/B Test конфигурация для ценообразования
 * 
 * Variant A: Baseline ($22/$65/$150)
 * Variant B: Aggressive India Pricing ($18/$49/$120)
 * 
 * PostHog автоматически делает 50/50 split между вариантами
 */

export type PricingVariant = 'A' | 'B';

export interface PricingPlan {
  id: 'starter' | 'professional' | 'agency';
  name: string;
  price: number;
  tokens: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

// ==========================================
// VARIANT A: BASELINE PRICING
// ==========================================
const VARIANT_A: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    price: 22,
    tokens: 500,
    features: [
      '500 tokens (never expire)',
      'All 8 AI agents',
      '1 small project',
      'Full project breakdown',
      'PDF export',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    price: 65,
    tokens: 1500,
    highlighted: true,
    badge: '⭐ MOST POPULAR',
    features: [
      '1,500 tokens (never expire)',
      'All 8 AI agents',
      '1 medium OR 3 small projects',
      'Advanced risk analysis',
      'Sprint planning',
      'PDF/Excel/Notion export',
      'Priority support (24h)',
    ],
  },
  {
    id: 'agency',
    name: 'Agency Pack',
    price: 150,
    tokens: 5000,
    features: [
      '5,000 tokens (never expire)',
      'All 8 AI agents + Specialist',
      '3 medium + 1 small projects',
      'White-label reports',
      'Team collaboration (3 seats)',
      'API access (beta)',
      'Priority support (4h)',
    ],
  },
];

// ==========================================
// VARIANT B: AGGRESSIVE INDIA PRICING
// ==========================================
const VARIANT_B: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    price: 18,
    tokens: 500,
    features: [
      '500 tokens (never expire)',
      'All 8 AI agents',
      '1 small project',
      'Full project breakdown',
      'PDF export',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    price: 49,
    tokens: 1500,
    highlighted: true,
    badge: '⭐ BEST VALUE - SAVE $16!',
    features: [
      '1,500 tokens (never expire)',
      'All 8 AI agents',
      '1 medium OR 3 small projects',
      'Advanced risk analysis',
      'Sprint planning',
      'PDF/Excel/Notion export',
      'Priority support (24h)',
    ],
  },
  {
    id: 'agency',
    name: 'Agency Pack',
    price: 120,
    tokens: 5000,
    features: [
      '5,000 tokens (never expire)',
      'All 8 AI agents + Specialist',
      '3 medium + 1 small projects',
      'White-label reports',
      'Team collaboration (3 seats)',
      'API access (beta)',
      'Priority support (4h)',
    ],
  },
];

/**
 * Получить текущий вариант для пользователя из PostHog Feature Flag
 * PostHog автоматически делает 50/50 split и сохраняет вариант для пользователя
 */
export const getPricingVariant = (): PricingVariant => {
  // Получаем вариант из PostHog Feature Flag
  // Для multivariate тестов нужно использовать getFeatureFlagPayload или проверять строковое значение
  const flag = posthog.getFeatureFlag('pricing_test');

  console.log('🧪 PostHog Feature Flag "pricing_test":', flag, typeof flag);

  // PostHog multivariate флаги возвращают строку с названием варианта
  // Проверяем на 'variant_india' или 'variant-india'
  const variant = (flag === 'variant_india' || flag === 'variant-india') ? 'B' : 'A';
  console.log('💰 Selected Pricing Variant:', variant);

  return variant;
};

/**
 * Получить тарифные планы для текущего варианта
 */
export const getPricingPlans = (): PricingPlan[] => {
  const variant = getPricingVariant();
  return variant === 'B' ? VARIANT_B : VARIANT_A;
};

/**
 * Прямой доступ к вариантам (для тестирования)
 */
export const PRICING_VARIANTS = {
  A: VARIANT_A,
  B: VARIANT_B,
};






