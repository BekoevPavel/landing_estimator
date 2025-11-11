import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Header from "./components/Header";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import LandingPage from "./components/LandingPage";
import HeroSection from "./components/HeroSection";
import QuizSection from "./components/QuizSection";
import ResultScreen from "./components/ResultScreen";
import PricingSection from "./components/PricingSection";
import FoundersCircleScreen from "./components/FoundersCircleScreen";
import TestStripePayment from "./components/TestStripePayment";
import PostHogDebugPanel from "./components/PostHogDebugPanel";
// import { Button } from "./components/ui/button"; // Unused after hiding test button
// import { FlaskConical } from "lucide-react"; // Unused after hiding test button
import { QuizResult } from "./types/quiz.types";
import { isDevelopmentMode } from "./config/env.config";

type Step = "landing" | "hero" | "quiz" | "result" | "pricing" | "waitlist";

export default function App() {
  // 🧪 TEMPORARY: Start directly at pricing for Stripe testing
  // TODO: Change back to "landing" for production
  const [currentStep, setCurrentStep] = useState("landing" as Step); // <-- PRODUCTION MODE
  // const [currentStep, setCurrentStep] = useState("pricing" as Step); // <-- TESTING MODE

  const [showTestMode, setShowTestMode] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const isDevMode = isDevelopmentMode();

  // Проверяем URL параметры при загрузке - возврат со Stripe
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");
    
    if (paymentStatus === "success" || paymentStatus === "canceled") {
      console.log("🎉 Smoke test complete! User returned from Stripe:", paymentStatus);
      console.log("📊 CONVERSION: User saw real Stripe checkout page");
      
      // Убираем параметры из URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Показываем Founder's Circle экран
      setCurrentStep("waitlist");
    }
  }, []);

  const handleLogoClick = () => {
    setCurrentStep("landing");
  };

  const handleStartTest = () => {
    setCurrentStep("hero");
  };

  const handleGoToPricing = () => {
    setCurrentStep("pricing");
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* PostHog Debug Panel (A/B test helper) - только в DEV режиме */}
      {isDevMode && <PostHogDebugPanel />}

      {/* Header - показываем на всех экранах кроме landing и waitlist (founders screen) */}
      {currentStep !== "landing" && currentStep !== "waitlist" && <Header onLogoClick={handleLogoClick} />}

      {/* Language Switcher - Правый верхний угол (UX best practice) */}
      {currentStep !== "waitlist" && (
        <div
          style={{
            position: 'fixed',
            top: '1.5rem',  // 24px - оптимально для всех экранов
            right: '1.5rem',
            zIndex: 50
          }}
        >
          <LanguageSwitcher />
        </div>
      )}

      {/* Secure Checkout Badge - SMALLER size for mobile, only on pricing page */}
      {currentStep === "pricing" && (
        <div
          style={{
            position: 'fixed',
            bottom: '0',
            right: '0',
            width: '180px',
            height: '70px',
            zIndex: 9999999,
            pointerEvents: 'none',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.98) 0%, rgba(168, 85, 247, 0.98) 100%)',
            backdropFilter: 'blur(12px)',
            borderTopLeftRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 -4px 20px rgba(139, 92, 246, 0.4)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">🔒</span>
            <div className="flex flex-col">
              <span className="text-white text-xs font-bold">Secure Checkout</span>
              <span className="text-white/70 text-[10px]">Powered by Stripe</span>
            </div>
          </div>
        </div>
      )}

      {/* HIDDEN: Test Stripe button - not needed anymore */}
      {/* {isDevMode && !showTestMode && currentStep !== "waitlist" && (
        <Button
          onClick={() => setShowTestMode(true)}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 40
          }}
          className="shadow-lg"
          size="lg"
          variant="outline"
        >
          <FlaskConical className="mr-2 h-5 w-5" />
          Тест Stripe
        </Button>
      )} */}

      {/* Тестовое окно Stripe */}
      {showTestMode && (
        <TestStripePayment onClose={() => setShowTestMode(false)} />
      )}

      <AnimatePresence mode="wait">
        {currentStep === "landing" && (
          <LandingPage key="landing" onStartTest={handleStartTest} onGoToPricing={handleGoToPricing} />
        )}
        {currentStep === "hero" && (
          <div key="hero" className="pt-20">
            <HeroSection onStart={() => setCurrentStep("quiz")} />
          </div>
        )}
        {currentStep === "quiz" && (
          <div key="quiz" className="pt-20">
            <QuizSection
              onComplete={(result) => {
                setQuizResult(result);
                setCurrentStep("result");
              }}
            />
          </div>
        )}
        {currentStep === "result" && quizResult && (
          <div key="result" className="pt-20">
            <ResultScreen
              result={quizResult}
              onContinue={() => setCurrentStep("pricing")}
            />
          </div>
        )}
        {currentStep === "pricing" && (
          <div key="pricing" className="pt-20">
            <PricingSection onComplete={() => setCurrentStep("waitlist")} />
          </div>
        )}
        {currentStep === "waitlist" && (
          <div key="waitlist">
            <FoundersCircleScreen />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
