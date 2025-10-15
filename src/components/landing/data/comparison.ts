import { Brain, AlertTriangle, Users, FileText } from "lucide-react";

export const comparison = [
  {
    method: "ChatGPT/Claude",
    problem: "Single model, no specialization",
    result: "Superficial estimate, ignores risks",
    icon: Brain,
  },
  {
    method: '"Gut feeling" estimate',
    problem: "Subjective, depends on experience",
    result: "±50% error margin",
    icon: AlertTriangle,
  },
  {
    method: "Manual team estimation",
    problem: "Expensive, slow, bottleneck on seniors",
    result: "$1000+, 5+ hours",
    icon: Users,
  },
  {
    method: "Simple calculators",
    problem: "Primitive math",
    result: "Doesn't account for UX, risks, integrations",
    icon: FileText,
  },
];

