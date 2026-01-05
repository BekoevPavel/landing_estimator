/**
 * Секция выбора тарифного плана и оформления заказа
 * Встроенная форма Stripe БЕЗ модалки - показываем прямо на странице
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { PricingCard } from "./pricing/PricingCard";
import { CheckoutForm } from "./pricing/CheckoutForm";
import { getPricingPlans, getPricingVariant, getPlanById } from "../config/pricing.ab-test";
import {
  trackPricingViewed,
  trackPlanSelected,
  trackPaymentAttempt,
  trackTimeOnPricing
} from "../analytics/events";
import { usePayment } from "../hooks/usePayment";
import { isPaddleProvider } from "../config/payment-provider.config";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

interface PricingSectionProps {
  onComplete: () => void;
  key?: string;
}

export default function PricingSection({ onComplete }: PricingSectionProps) {
  const { t } = useTranslation();
  const [selectedPlanId, setSelectedPlanId] = useState(null as string | null);
  const [email, setEmail] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  // A/B Test: получаем вариант для этого пользователя
  const variant = getPricingVariant();
  const abTestPlans = getPricingPlans();
  
  // Таймер для отслеживания времени на странице
  const startTimeRef = useRef<number>(Date.now());

  const selectedPlan = selectedPlanId ? getPlanById(selectedPlanId) : null;

  const payment = usePayment({
    onSuccess: () => {
      console.log("✅ Payment successful");
      // Track успешную оплату
      if (selectedPlan) {
        const abPlan = abTestPlans.find(p => p.id === selectedPlan.id);
        // Используем РЕАЛЬНУЮ цену из A/B теста!
        const price = abPlan?.price || selectedPlan.price;
        
        // Импортируем trackPaymentSuccess из events
        import("../analytics/events").then(({ trackPaymentSuccess }) => {
          trackPaymentSuccess(variant, selectedPlan.id, price);
        });
      }
      onComplete();
    },
  });
  
  // Track просмотр страницы с ценами при монтировании
  useEffect(() => {
    trackPricingViewed(variant);
    
    // Track время на странице при размонтировании
    return () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnPricing(timeSpent, variant);
    };
  }, [variant]);

  // Открываем форму checkout при выборе плана
  const handlePlanSelect = (planId: string) => {
    console.log("🎯 Smoke test: Plan selected:", planId);
    
    // Track выбор плана
    const abPlan = abTestPlans.find(p => p.id === planId);
    if (abPlan) {
      trackPlanSelected(variant, planId, abPlan.price);
    }
    
    setSelectedPlanId(planId);
    setShowCheckout(true);
  };

  // Кнопка "назад" к выбору планов
  const handleBack = () => {
    setShowCheckout(false);
    setSelectedPlanId(null);
    setEmail("");
  };

  // Обработка ошибки - ведёт на Founder's Circle!
  const handlePaymentError = (error: string) => {
    console.log("📊 SMOKE TEST: User tried to pay:", error);
    console.log("✅ Redirecting to Founder's Circle anyway");
    
    // Даже при ошибке ведём на waitlist!
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  // Создаём payment intent когда есть план и email
  // IMPORTANT: Only create Stripe payment intent when using Stripe provider
  // Paddle handles its own checkout flow and does not need a payment intent
  useEffect(() => {
    // Skip payment intent creation for Paddle - it handles checkout independently
    if (isPaddleProvider()) {
      return;
    }

    if (selectedPlan && email && showCheckout) {
      console.log("💳 Creating Stripe payment intent for:", selectedPlan.name);

      // ВАЖНО: Используем цену из A/B теста!
      const abPlan = abTestPlans.find(p => p.id === selectedPlan.id);
      const price = abPlan?.price || selectedPlan.price;

      // Track попытку оплаты
      trackPaymentAttempt(variant, selectedPlan.id, price);

      payment.createPayment(price, selectedPlan.name, email);
    }
  }, [selectedPlan?.id, email, showCheckout]);

  // Получаем переведённые данные тарифных планов
  const pricingPlans = t("pricing.plans", { returnObjects: true }) as Array<{
    name: string;
    period: string;
    description: string;
    features: string[];
  }>;

  return (
    <motion.section
      id="pricing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-7xl">
        <AnimatePresence mode="wait">
          {!showCheckout ? (
            // Pricing Cards Screen
            <motion.div
              key="pricing-cards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-16"
              >
                <h1 className="mb-4">{t("landing.hero.cta")}</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("landing.cta.description")}
                </p>
              </motion.div>

              {/* Error Message */}
              {payment.error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 max-w-md mx-auto"
                >
                  <Alert variant="destructive">
                    <AlertDescription>{payment.error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {/* A/B Test Debug (только в dev) */}
              {import.meta.env.DEV && (
                <div className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-400 rounded-lg p-4 text-center mb-8">
                  <strong>🧪 A/B Test Active:</strong> Showing Variant <strong>{variant}</strong>
                  {variant === 'B' && ' (India Pricing)'}
                </div>
              )}

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {abTestPlans.map((plan, index) => {
                  const translatedPlan = pricingPlans[index];

                  return (
                    <PricingCard
                      key={plan.id}
                      plan={{ ...plan, ...translatedPlan }}
                      isSelected={selectedPlanId === plan.id}
                      onSelect={() => handlePlanSelect(plan.id)}
                      animationDelay={0.3 + index * 0.1}
                    />
                  );
                })}
              </div>

              {/* Test Card Info - Only show in dev mode */}
              {import.meta.env.DEV && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 text-center"
                >
                  <div className="inline-flex items-center gap-3 px-5 py-3 bg-card/50 border border-border rounded-full backdrop-blur-sm">
                    <span className="text-muted-foreground text-sm">Test Card:</span>
                    <code className="text-violet-400 font-mono font-medium">4242 4242 4242 4242</code>
                  </div>
                  <p className="text-muted-foreground text-xs mt-2">Any future date • Any 3-digit CVC</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            // Checkout Form Screen
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("common.back", "Back")}
              </Button>

              {/* Checkout Header */}
              <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {t("pricing.checkout.title")}
                </h2>
                <p className="text-muted-foreground">
                  {selectedPlan && (() => {
                    // Get the correct A/B test price
                    const abPlan = abTestPlans.find(p => p.id === selectedPlan.id);
                    const displayPrice = abPlan ? `$${abPlan.price}` : selectedPlan.displayPrice;
                    return t("pricing.checkout.description", {
                      planName: selectedPlan.name,
                      planPrice: displayPrice,
                    });
                  })()}
                </p>
              </div>

              {/* Checkout Form */}
              {selectedPlan && (() => {
                // Get the ACTUAL A/B test price
                const abPlan = abTestPlans.find(p => p.id === selectedPlan.id);
                const actualPrice = abPlan?.price || selectedPlan.price;

                return (
                  <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8">
                    <CheckoutForm
                      selectedPlan={selectedPlan}
                      actualPrice={actualPrice}
                      abTestVariant={variant}
                      clientSecret={payment.clientSecret}
                      isLoading={payment.isLoading}
                      error={payment.error}
                      onEmailChange={setEmail}
                      onPaymentSuccess={payment.handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                    />
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
