/**
 * Секция выбора тарифного плана и оформления заказа
 * Рефакторинг: разбито на мелкие компоненты, использует хук usePayment
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { PricingCard } from "./pricing/PricingCard";
import { CheckoutForm } from "./pricing/CheckoutForm";
import { PRICING_PLANS, getPlanByName } from "../config/pricing.config";
import { usePayment } from "../hooks/usePayment";

interface PricingSectionProps {
  onComplete: () => void;
  key?: string;
}

export default function PricingSection({ onComplete }: PricingSectionProps) {
  const { t } = useTranslation();
  const [selectedPlanName, setSelectedPlanName] = useState(null as string | null);
  const [email, setEmail] = useState("");

  const selectedPlan = selectedPlanName
    ? getPlanByName(selectedPlanName)
    : null;

  const payment = usePayment({
    onSuccess: onComplete,
  });

  // Автоматически создаём payment intent при выборе плана и вводе email
  useEffect(() => {
    if (selectedPlan && email) {
      payment.createPayment(selectedPlan.price, selectedPlan.name, email);
    }
  }, [selectedPlan?.id, email]);

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

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PRICING_PLANS.map((plan, index) => {
            const translatedPlan = pricingPlans[index];
            return (
              <PricingCard
                key={plan.id}
                plan={{ ...plan, ...translatedPlan }}
                isSelected={selectedPlanName === plan.name}
                onSelect={() => setSelectedPlanName(plan.name)}
                animationDelay={0.3 + index * 0.1}
              />
            );
          })}
        </div>

        {/* Checkout Form */}
        {selectedPlan && (
          <CheckoutForm
            selectedPlan={selectedPlan}
            clientSecret={payment.clientSecret}
            isLoading={payment.isLoading}
            error={payment.error}
            onEmailChange={setEmail}
            onPaymentSuccess={payment.handlePaymentSuccess}
            onPaymentError={payment.handlePaymentError}
          />
        )}
      </div>
    </motion.section>
  );
}
