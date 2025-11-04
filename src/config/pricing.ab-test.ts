import { posthog } from '../analytics/posthog.config';
import { Zap, Crown, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * A/B Test конфигурация для ценообразования
 *
 * Variant A: Baseline ($22/$65/$150)
 * Variant B: Aggressive India Pricing ($18/$49/$120)
 *
 * PostHog автоматически делает 50/50 split между вариантами
 *
 * ⚠️ ЕДИНСТВЕННЫЙ ИСТОЧНИК ПРАВДЫ ДЛЯ ЦЕН!
 * Все цены должны браться ТОЛЬКО отсюда!
 */

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
}

// ==========================================
// VARIANT A: BASELINE PRICING
// ==========================================
const VARIANT_A: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    icon: Zap,
    price: 22,
    displayPrice: '$22',
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
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    icon: Crown,
    price: 65,
    displayPrice: '$65',
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
  },
  {
    id: 'agency',
    name: 'Agency Pack',
    icon: Building2,
    price: 150,
    displayPrice: '$150',
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
  },
];

// ==========================================
// VARIANT B: AGGRESSIVE INDIA PRICING
// ==========================================
const VARIANT_B: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter Pack',
    icon: Zap,
    price: 18,
    displayPrice: '$18',
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
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    icon: Crown,
    price: 49,
    displayPrice: '$49',
    period: '/project',
    description: 'Most popular for complex projects',
    tokens: 1500,
    highlighted: true,
    popular: true,
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
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderGradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'agency',
    name: 'Agency Pack',
    icon: Building2,
    price: 120,
    displayPrice: '$120',
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






