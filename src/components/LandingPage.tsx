import { LandingHeroSection } from "./landing/sections/LandingHeroSection";
import { ProblemsSection } from "./landing/sections/ProblemsSection";
import { ComparisonSection } from "./landing/sections/ComparisonSection";
import { SolutionSection } from "./landing/sections/SolutionSection";
import { TestimonialsSection } from "./landing/sections/TestimonialsSection";
import { FAQSection } from "./landing/sections/FAQSection";
import { CTASection } from "./landing/sections/CTASection";
import { FooterSection } from "./landing/sections/FooterSection";

interface LandingPageProps {
  onStartTest: () => void;
}

/**
 * Главная страница лендинга - композиция всех секций
 * 
 * Структура:
 * 1. Hero - приветственная секция с CTA
 * 2. Problems - почему оценка проектов болезненна
 * 3. Comparison - сравнение традиционных методов
 * 4. Solution - Multi-Agent система + демо ChatGPT vs EstimateFast
 * 5. Testimonials - отзывы пользователей
 * 6. FAQ - частые вопросы
 * 7. CTA - финальный призыв к действию
 * 8. Footer - подвал с навигацией
 */
export default function LandingPage({ onStartTest }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      <LandingHeroSection onStartTest={onStartTest} />
      <ProblemsSection />
      <ComparisonSection onStartTest={onStartTest} />
      <SolutionSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection onStartTest={onStartTest} />
      <FooterSection />
    </div>
  );
}
