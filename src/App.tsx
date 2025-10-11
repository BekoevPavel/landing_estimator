import { useState } from "react";
import { AnimatePresence } from "motion/react";
import HeroSection from "./components/HeroSection";
import QuizSection from "./components/QuizSection";
import ResultScreen from "./components/ResultScreen";
import PricingSection from "./components/PricingSection";
import WaitlistScreen from "./components/WaitlistScreen";

type Step = "hero" | "quiz" | "result" | "pricing" | "waitlist";

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>("hero");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
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
