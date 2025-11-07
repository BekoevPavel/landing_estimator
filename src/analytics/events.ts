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

// ==================== LANDING PAGE EVENTS ====================

/**
 * Клик на главную CTA кнопку на лендинге
 */
export const trackLandingCTAClick = (location: string) => {
  posthog.capture('landing_cta_clicked', {
    location, // 'hero', 'comparison', 'cta_section', etc.
  });
  console.log(`🎯 [Analytics] Landing CTA clicked - ${location}`);
};

/**
 * Клик на кнопку "How It Works" (scroll)
 */
export const trackHowItWorksClick = () => {
  posthog.capture('how_it_works_clicked');
  console.log(`📖 [Analytics] How It Works clicked`);
};

/**
 * Открытие/закрытие FAQ
 */
export const trackFAQToggle = (question: string, isOpen: boolean) => {
  posthog.capture('faq_toggled', {
    question,
    action: isOpen ? 'opened' : 'closed',
  });
  console.log(`❓ [Analytics] FAQ ${isOpen ? 'opened' : 'closed'} - ${question}`);
};

/**
 * Клик по ссылке в футере
 */
export const trackFooterLinkClick = (linkName: string, category: string) => {
  posthog.capture('footer_link_clicked', {
    link_name: linkName,
    category, // 'product', 'resources', 'company'
  });
  console.log(`🔗 [Analytics] Footer link clicked - ${category}/${linkName}`);
};

// ==================== QUIZ EVENTS ====================

/**
 * Старт квиза
 */
export const trackQuizStarted = () => {
  posthog.capture('quiz_started');
  console.log(`🎮 [Analytics] Quiz started`);
};

/**
 * Ответ на вопрос квиза
 */
export const trackQuizAnswer = (questionIndex: number, answer: string | string[]) => {
  posthog.capture('quiz_answer', {
    question_index: questionIndex,
    answer: Array.isArray(answer) ? answer.join(', ') : answer,
  });
  console.log(`✏️ [Analytics] Quiz answer - Q${questionIndex}: ${answer}`);
};

/**
 * Завершение квиза
 */
export const trackQuizCompleted = (totalQuestions: number) => {
  posthog.capture('quiz_completed', {
    total_questions: totalQuestions,
  });
  console.log(`✅ [Analytics] Quiz completed - ${totalQuestions} questions`);
};

// ==================== NAVIGATION EVENTS ====================

/**
 * Переключение языка
 */
export const trackLanguageChange = (from: string, to: string) => {
  posthog.capture('language_changed', {
    from_language: from,
    to_language: to,
  });
  console.log(`🌍 [Analytics] Language changed - ${from} → ${to}`);
};

/**
 * Клик на логотип (возврат на главную)
 */
export const trackLogoClick = () => {
  posthog.capture('logo_clicked');
  console.log(`🏠 [Analytics] Logo clicked`);
};

// ==================== RESULT SCREEN EVENTS ====================

/**
 * Просмотр результатов квиза
 */
export const trackResultsViewed = () => {
  posthog.capture('results_viewed');
  console.log(`📊 [Analytics] Results viewed`);
};

/**
 * Переход к ценам с экрана результатов
 */
export const trackContinueToPricing = () => {
  posthog.capture('continue_to_pricing');
  console.log(`💰 [Analytics] Continue to pricing clicked`);
};






