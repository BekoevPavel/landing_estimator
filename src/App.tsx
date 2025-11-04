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
import { Button } from "./components/ui/button";
import { FlaskConical } from "lucide-react";
import { QuizResult } from "./types/quiz.types";

type Step = "landing" | "hero" | "quiz" | "result" | "pricing" | "waitlist";

export default function App() {
  // 🧪 TEMPORARY: Start directly at pricing for Stripe testing
  // TODO: Change back to "landing" for production
  const [currentStep, setCurrentStep] = useState("landing" as Step); // <-- PRODUCTION MODE
  // const [currentStep, setCurrentStep] = useState("pricing" as Step); // <-- TESTING MODE
  
  const [showTestMode, setShowTestMode] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

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

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* PostHog Debug Panel - только в DEV режиме */}
      {import.meta.env.DEV && <PostHogDebugPanel />}

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
      
      {/* Кнопка для открытия тестового режима */}
      {!showTestMode && currentStep !== "waitlist" && (
        <Button
          onClick={() => setShowTestMode(true)}
          style={{ 
            position: 'fixed', 
            bottom: '1.5rem',  // 24px - оптимально для всех экранов
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
      )}

      {/* Тестовое окно Stripe */}
      {showTestMode && (
        <TestStripePayment onClose={() => setShowTestMode(false)} />
      )}

      <AnimatePresence mode="wait">
        {currentStep === "landing" && (
          <LandingPage key="landing" onStartTest={handleStartTest} />
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
