import { useState } from "react";
import { motion } from "motion/react";
import { Check, Zap, Crown, Building2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface PricingSectionProps {
  onComplete: () => void;
}

const plans = [
  {
    name: "Basic",
    icon: Zap,
    price: "$49",
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
    name: "Pro",
    icon: Crown,
    price: "$149",
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
    name: "Enterprise",
    icon: Building2,
    price: "$499",
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

export default function PricingSection({ onComplete }: PricingSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");

  const handleProceed = () => {
    if (!selectedPlan || !email) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

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
          <h1 className="mb-4">Choose Your AI Team</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the plan that matches your project complexity. All estimates include detailed analysis and actionable insights.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative cursor-pointer group ${
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
                  selectedPlan === plan.name
                    ? "border-primary shadow-lg shadow-primary/20 scale-105"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${plan.borderGradient} mb-6`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl">{plan.price}</span>
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
                    variant={selectedPlan === plan.name ? "default" : "outline"}
                    className="w-full rounded-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(plan.name);
                    }}
                  >
                    {selectedPlan === plan.name ? "Selected" : "Select Plan"}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Checkout Form */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-8"
          >
            <h3 className="mb-4">Complete Your Order</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Test Mode — no real payment will be processed.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm mb-2 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="text-sm mb-2 block">Card Number</label>
                <Input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm mb-2 block">Expiry</label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm mb-2 block">CVC</label>
                  <Input
                    type="text"
                    placeholder="123"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleProceed}
              disabled={!email || isProcessing}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-accent"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
