/**
 * Компонент карточки тарифного плана
 */

import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import type { PricingPlan } from "../../config/pricing.config";

interface PricingCardProps {
  plan: PricingPlan;
  isSelected: boolean;
  onSelect: () => void;
  animationDelay?: number;
  key?: string;
}

export function PricingCard({
  plan,
  isSelected,
  onSelect,
  animationDelay = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay }}
      className={`relative group ${
        plan.popular ? "md:-mt-4" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-sm z-10">
          Most Popular
        </div>
      )}

      <div
        className={`relative h-full bg-card/50 backdrop-blur-xl border-2 rounded-3xl p-8 transition-all duration-300 ${
          isSelected
            ? "border-primary shadow-lg shadow-primary/20 scale-105"
            : "border-border hover:border-primary/50"
        }`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}
        />

        <div className="relative">
          <div
            className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${plan.borderGradient} mb-6`}
          >
            <plan.icon className="w-6 h-6 text-white" />
          </div>

          <h3 className="mb-2">{plan.name}</h3>
          <p className="text-sm text-muted-foreground mb-6">
            {plan.description}
          </p>

          <div className="mb-6">
            <span className="text-4xl">{plan.displayPrice}</span>
            <span className="text-muted-foreground">{plan.period}</span>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button
            variant={isSelected ? "default" : "outline"}
            className="w-full rounded-xl"
            onClick={onSelect}
          >
            {isSelected ? "Selected" : "Select Plan"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

