import { posthog } from '../analytics/posthog.config';
import { Zap, Crown, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * A/B Test конфигурация для ценообразования
 *
 * Variant A: Baseline ($5/$15/$50)
 * Variant B: Higher Pricing ($10/$30/$80)
 *
 * PostHog автоматически делает 50/50 split между вариантами
 *
 * ⚠️ ЕДИНСТВЕННЫЙ ИСТОЧНИК ПРАВДЫ ДЛЯ ЦЕН!
 * Все цены должны браться ТОЛЬКО отсюда!
 */

/**
 * Environment detection for Paddle price IDs
 * DEV: Uses sandbox price IDs (test payments)
 * PROD: Uses production price IDs (real payments)
 */
const isDev = import.meta.env.DEV && import.meta.env.VITE_PADDLE_ENV !== 'production';

/**
 * Paddle Price IDs - Sandbox (for local development)
 */
const SANDBOX_PRICE_IDS = {
  starterA: 'pri_01kb9zcgbhrh4c9gtke0ppspq4',     // $5
  starterB: 'pri_01kb9zd3yxap1x24w00gjefhqk',     // $10
  professionalA: 'pri_01kb9zdn868qm2wjt8rswtjxb1', // $15
  professionalB: 'pri_01kb9zed3v16wsecwtfqefk6sd', // $30
  maxA: 'pri_01kb9zezvwpjzb2f8xwc4ay7bv',         // $50
  maxB: 'pri_01kb9zfng1mamqdak665qtf62c',         // $80
};

/**
 * Paddle Price IDs - Production (for deployed app)
 */
const PRODUCTION_PRICE_IDS = {
  starterA: 'pri_01kb843d5331ana8t0a8g2010g',     // $5
  starterB: 'pri_01kb844n77w7s0rq1pxq47jv4p',     // $10
  professionalA: 'pri_01kb845pb30ww55997ms9rnr4f', // $15
  professionalB: 'pri_01kb846aqyhtvd6t3adpwz7sa0', // $30
  maxA: 'pri_01kb84727pqrersph1af1071j9',         // $50 (fixed typo: 1071j9 not 107lj9)
  maxB: 'pri_01kb847ykxfy578n87mqq6ksk3',         // $80
};

// Select price IDs based on environment
const PRICE_IDS = isDev ? SANDBOX_PRICE_IDS : PRODUCTION_PRICE_IDS;

export type PricingVariant = 'A' | 'B';

export interface PricingPlan {
  id: 'starter' | 'professional' | 'agency';
  name: string;
  icon: LucideIcon;
  price: number;
  displayPrice: string;
  period: string;
  description: string;
  tokens: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  popular?: boolean;
  gradient: string;
  borderGradient: string;
  /**
   * Paddle price ID for this plan
   * Used when PAYMENT_PROVIDER is set to 'paddle'
   */
  paddlePriceId: string;
}

// ==========================================
// VARIANT A: BASELINE PRICING
// ==========================================
const VARIANT_A: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    icon: Zap,
    price: 5,
    displayPrice: '$5',
    period: '/project',
    description: 'Perfect for small projects',
    tokens: 500,
    features: [
      '500 tokens (never expire)',
      'All 8 AI agents',
      '1 small project',
      'Full project breakdown',
      'PDF export',
      'Email support',
    ],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderGradient: 'from-blue-500 to-cyan-500',
    paddlePriceId: PRICE_IDS.starterA, // $5
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    icon: Crown,
    price: 15,
    displayPrice: '$15',
    period: '/project',
    description: 'Most popular for complex projects',
    tokens: 1500,
    highlighted: true,
    popular: true,
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
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderGradient: 'from-purple-500 to-pink-500',
    paddlePriceId: PRICE_IDS.professionalA, // $15
  },
  {
    id: 'agency',
    name: 'Max Pack',
    icon: Building2,
    price: 50,
    displayPrice: '$50',
    period: '/project',
    description: 'For mission-critical estimates',
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
    gradient: 'from-orange-500/20 to-red-500/20',
    borderGradient: 'from-orange-500 to-red-500',
    paddlePriceId: PRICE_IDS.maxA, // $50
  },
];

// ==========================================
// VARIANT B: HIGHER PRICING TEST
// ==========================================
const VARIANT_B: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    icon: Zap,
    price: 10,
    displayPrice: '$10',
    period: '/project',
    description: 'Perfect for small projects',
    tokens: 500,
    features: [
      '500 tokens (never expire)',
      'All 8 AI agents',
      '1 small project',
      'Full project breakdown',
      'PDF export',
      'Email support',
    ],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderGradient: 'from-blue-500 to-cyan-500',
    paddlePriceId: PRICE_IDS.starterB, // $10
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    icon: Crown,
    price: 30,
    displayPrice: '$30',
    period: '/project',
    description: 'Most popular for complex projects',
    tokens: 1500,
    highlighted: true,
    popular: true,
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
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderGradient: 'from-purple-500 to-pink-500',
    paddlePriceId: PRICE_IDS.professionalB, // $30
  },
  {
    id: 'agency',
    name: 'Max Pack',
    icon: Building2,
    price: 80,
    displayPrice: '$80',
    period: '/project',
    description: 'For mission-critical estimates',
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
    gradient: 'from-orange-500/20 to-red-500/20',
    borderGradient: 'from-orange-500 to-red-500',
    paddlePriceId: PRICE_IDS.maxB, // $80
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

/**
 * Получить план по ID из текущего A/B варианта
 */
export function getPlanById(planId: string): PricingPlan | undefined {
  const plans = getPricingPlans();
  return plans.find((plan) => plan.id === planId);
}

/**
 * Получить все планы (для совместимости со старым кодом)
 * @deprecated Используйте getPricingPlans() для A/B тестирования
 */
export const PRICING_PLANS = VARIANT_A;







