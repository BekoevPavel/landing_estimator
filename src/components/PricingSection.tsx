/**
 * Секция выбора тарифного плана и оформления заказа
 * Встроенная форма Stripe БЕЗ модалки - показываем прямо на странице
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { PricingCard } from "./pricing/PricingCard";
import { CheckoutForm } from "./pricing/CheckoutForm";
import { PRICING_PLANS, getPlanById } from "../config/pricing.config";
import { usePayment } from "../hooks/usePayment";
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

  const selectedPlan = selectedPlanId ? getPlanById(selectedPlanId) : null;

  const payment = usePayment({
    onSuccess: () => {
      console.log("✅ Payment successful");
      onComplete();
    },
  });

  // Открываем форму checkout при выборе плана
  const handlePlanSelect = (planId: string) => {
    console.log("🎯 Smoke test: Plan selected:", planId);
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
  useEffect(() => {
    if (selectedPlan && email && showCheckout) {
      console.log("💳 Creating payment intent for:", selectedPlan.name);
      payment.createPayment(selectedPlan.price, selectedPlan.name, email);
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

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PRICING_PLANS.map((plan, index) => {
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
                  {selectedPlan &&
                    t("pricing.checkout.description", {
                      planName: selectedPlan.name,
                      planPrice: selectedPlan.displayPrice,
                    })}
                </p>
              </div>

              {/* Checkout Form */}
              {selectedPlan && (
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8">
                  <CheckoutForm
                    selectedPlan={selectedPlan}
                    clientSecret={payment.clientSecret}
                    isLoading={payment.isLoading}
                    error={payment.error}
                    onEmailChange={setEmail}
                    onPaymentSuccess={payment.handlePaymentSuccess}
                    onPaymentError={handlePaymentError}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
