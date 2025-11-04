import { posthog } from './posthog.config';
import type { PricingVariant } from '../config/pricing.ab-test';

/**
 * Centralized event tracking для аналитики
 * 
 * Все события для A/B теста ценообразования
 */

/**
 * Пользователь увидел страницу с ценами
 */
export const trackPricingViewed = (variant: PricingVariant) => {
  posthog.capture('pricing_viewed', {
    variant,
    timestamp: new Date().toISOString(),
  });
  
  console.log(`📊 [Analytics] Pricing viewed - Variant ${variant}`);
};

/**
 * Пользователь выбрал тарифный план (кликнул на кнопку)
 */
export const trackPlanSelected = (
  variant: PricingVariant,
  planId: string,
  price: number
) => {
  posthog.capture('plan_selected', {
    variant,
    plan: planId,
    price,
  });
  
  console.log(`📊 [Analytics] Plan selected - ${planId} ($${price}) - Variant ${variant}`);
};

/**
 * Пользователь начал процесс оплаты
 * Это ГЛАВНАЯ метрика для A/B теста!
 */
export const trackPaymentAttempt = (
  variant: PricingVariant,
  planId: string,
  price: number
) => {
  posthog.capture('payment_attempt', {
    variant,
    plan: planId,
    price,
    value: price, // для revenue tracking
  });
  
  console.log(`💳 [Analytics] Payment attempt - ${planId} ($${price}) - Variant ${variant}`);
};

/**
 * Оплата успешно завершена
 */
export const trackPaymentSuccess = (
  variant: PricingVariant,
  planId: string,
  price: number
) => {
  posthog.capture('payment_success', {
    variant,
    plan: planId,
    revenue: price, // PostHog автоматически считает revenue
  });
  
  console.log(`✅ [Analytics] Payment success - ${planId} ($${price}) - Variant ${variant}`);
};

/**
 * Время, проведённое на странице с ценами
 * Помогает понять engagement
 */
export const trackTimeOnPricing = (
  seconds: number,
  variant: PricingVariant
) => {
  posthog.capture('pricing_time_spent', {
    duration_seconds: seconds,
    variant,
  });
  
  console.log(`⏱️ [Analytics] Time on pricing - ${seconds}s - Variant ${variant}`);
};

/**
 * Пользователь связался для Agency плана
 */
export const trackAgencyContact = (variant: PricingVariant) => {
  posthog.capture('agency_contact_clicked', {
    variant,
  });
  
  console.log(`📞 [Analytics] Agency contact - Variant ${variant}`);
};






