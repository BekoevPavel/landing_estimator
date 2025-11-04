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
    id: "starter",
    name: "Basic",
    icon: Zap,
    price: 49,
    displayPrice: "$49",
    period: "/project",
    description: "Perfect for small projects",
    features: [
      "Choose 3 agents from the pool",
      "Projects up to 2 months",
      "Detailed brief & backlog",
      "Task breakdown with agent debate",
      "Risk assessment & cost estimates",
      "Cost optimization advice",
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    borderGradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "professional",
    name: "Pro",
    icon: Crown,
    price: 149,
    displayPrice: "$149",
    period: "/project",
    description: "Most popular for complex projects",
    popular: true,
    features: [
      "Choose 6 agents from the pool",
      "Projects up to 5 months",
      "Everything in Basic, plus:",
      "Advanced risk & resource planning",
      "Detailed technical specifications",
      "Interactive dashboard",
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    borderGradient: "from-purple-500 to-pink-500",
  },
  {
    id: "agency",
    name: "Enterprise",
    icon: Building2,
    price: 499,
    displayPrice: "$499",
    period: "/project",
    description: "For mission-critical estimates",
    features: [
      "Choose 8+ agents from the pool",
      "Enterprise-scale projects (6+ months)",
      "Everything in Pro, plus:",
      "Multi-phase project planning",
      "Risk mitigation strategies",
      "Custom agent configuration",
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

