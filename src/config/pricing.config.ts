/**
 * Конфигурация тарифных планов
 * Здесь находятся все настройки для pricing секции
 */

import { Zap, Crown, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PricingPlan {
  id: string;
  name: string;
  icon: LucideIcon;
  price: number;
  displayPrice: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  gradient: string;
  borderGradient: string;
}

/**
 * Список всех доступных тарифных планов
 */
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    icon: Zap,
    price: 49,
    displayPrice: "$49",
    period: "/project",
    description: "Perfect for small projects",
    features: [
      "3 AI experts (Engineer, Designer, PM)",
      "Basic complexity analysis",
      "Timeline estimation",
      "Cost breakdown",
      "24-hour delivery",
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderGradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "pro",
    name: "Pro",
    icon: Crown,
    price: 149,
    displayPrice: "$149",
    period: "/project",
    description: "Most popular for complex projects",
    popular: true,
    features: [
      "6 AI agents including Analyst & QA",
      "Advanced risk assessment",
      "Resource allocation planning",
      "Detailed technical specs",
      "12-hour delivery",
      "Revision included",
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    borderGradient: "from-purple-500 to-pink-500",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    price: 499,
    displayPrice: "$499",
    period: "/project",
    description: "For mission-critical estimates",
    features: [
      "Full virtual team (8+ AI agents)",
      "Custom industry advisor",
      "Multi-phase planning",
      "Risk mitigation strategies",
      "6-hour delivery",
      "Unlimited revisions",
      "Priority support",
    ],
    gradient: "from-orange-500/20 to-red-500/20",
    borderGradient: "from-orange-500 to-red-500",
  },
];

/**
 * Получить план по ID
 */
export function getPlanById(planId: string): PricingPlan | undefined {
  return PRICING_PLANS.find((plan) => plan.id === planId);
}

