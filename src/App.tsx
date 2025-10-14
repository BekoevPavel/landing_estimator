import React, { useState } from "react";
import { AnimatePresence } from "motion/react";
import HeroSection from "./components/HeroSection";
import QuizSection from "./components/QuizSection";
import ResultScreen from "./components/ResultScreen";
import PricingSection from "./components/PricingSection";
import WaitlistScreen from "./components/WaitlistScreen";
import TestStripePayment from "./components/TestStripePayment";
import { Button } from "./components/ui/button";
import { FlaskConical } from "lucide-react";

type Step = "hero" | "quiz" | "result" | "pricing" | "waitlist";

export default function App() {
  const [currentStep, setCurrentStep] = useState("hero" as Step);
  const [showTestMode, setShowTestMode] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Кнопка для открытия тестового режима */}
      {!showTestMode && (
        <Button
          onClick={() => setShowTestMode(true)}
          className="fixed bottom-6 right-6 z-40 shadow-lg"
          size="lg"
          variant="outline"
        >
          <FlaskConical className="mr-2 h-5 w-5" />
          Тест Stripe
        </Button>
      )}

      {/* Тестовое окно Stripe */}
      {showTestMode && (
        <TestStripePayment onClose={() => setShowTestMode(false)} />
      )}

      <AnimatePresence mode="wait">
        {currentStep === "hero" && (
          <HeroSection
            key="hero"
            onStart={() => setCurrentStep("quiz")}
          />
        )}
        {currentStep === "quiz" && (
          <QuizSection
            key="quiz"
            onComplete={() => setCurrentStep("result")}
          />
        )}
        {currentStep === "result" && (
          <ResultScreen
            key="result"
            onContinue={() => setCurrentStep("pricing")}
          />
        )}
        {currentStep === "pricing" && (
          <PricingSection
            key="pricing"
            onComplete={() => setCurrentStep("waitlist")}
          />
        )}
        {currentStep === "waitlist" && (
          <WaitlistScreen key="waitlist" />
        )}
      </AnimatePresence>
    </div>
  );
}
