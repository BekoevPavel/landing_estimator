import { motion } from "motion/react";
import { Sparkles, CheckCircle, Zap, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../ui/button";
import { GRADIENT_TEXT } from "../../../constants/gradients";
import { fadeInUpWithDelay } from "../../../constants/animations";

interface LandingHeroSectionProps {
  onStartTest: () => void;
}

export function LandingHeroSection({ onStartTest }: LandingHeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          {...fadeInUpWithDelay(0.2)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {t("landing.hero.badge")}
          </span>
        </motion.div>

        <motion.h1
          {...fadeInUpWithDelay(0.3)}
          className={`mb-6 text-5xl md:text-7xl tracking-tight max-w-5xl mx-auto ${GRADIENT_TEXT.primary}`}
        >
          {t("landing.hero.title")}
        </motion.h1>

        <motion.p
          {...fadeInUpWithDelay(0.4)}
          className="mb-12 max-w-3xl mx-auto text-xl text-muted-foreground"
        >
          {t("landing.hero.description")}
        </motion.p>

        <motion.div
          {...fadeInUpWithDelay(0.5)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            onClick={onStartTest}
            size="lg"
            className="px-8 py-6 rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            {t("landing.hero.cta")}
            <Zap className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-6 rounded-2xl"
            onClick={() => {
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t("landing.hero.ctaSecondary")}
            <ChevronDown className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          {...fadeInUpWithDelay(0.6)}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground mb-16"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            {t("landing.hero.badges.noRegistration")}
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            {t("landing.hero.badges.fastTime")}
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            {t("landing.hero.badges.accuracy")}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeInUpWithDelay(0.7)}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6">
            <div className={`text-3xl mb-2 ${GRADIENT_TEXT.accent}`}>
              2,847
            </div>
            <div className="text-sm text-muted-foreground">{t("landing.hero.stats.projects")}</div>
          </div>
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6">
            <div className={`text-3xl mb-2 ${GRADIENT_TEXT.accent}`}>
              $5.2M
            </div>
            <div className="text-sm text-muted-foreground">{t("landing.hero.stats.accuracy")}</div>
          </div>
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6">
            <div className={`text-3xl mb-2 ${GRADIENT_TEXT.accent}`}>
              4.9/5
            </div>
            <div className="text-sm text-muted-foreground">{t("landing.hero.stats.rating")}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

