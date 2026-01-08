import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Sparkles, Users, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { GRADIENTS, GRADIENT_TEXT } from "../constants/gradients";
import { fadeInUpWithDelay } from "../constants/animations";
import { trackQuizStarted } from "../analytics/events";

interface HeroSectionProps {
  onStart: () => void;
  key?: string;
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-12"
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${GRADIENTS.hero}`} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          {...fadeInUpWithDelay(0.2)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">{t("heroSection.badge")}</span>
        </motion.div>

        <motion.h1
          {...fadeInUpWithDelay(0.3)}
          className={`mb-6 text-5xl md:text-7xl tracking-tight ${GRADIENT_TEXT.primary}`}
        >
          {t("heroSection.title")}
        </motion.h1>

        <motion.p
          {...fadeInUpWithDelay(0.4)}
          className="mb-8 max-w-2xl mx-auto text-muted-foreground"
        >
          {t("heroSection.description")}
        </motion.p>

        {/* Quiz Info Card */}
        <motion.div
          {...fadeInUpWithDelay(0.45)}
          className="mb-12 max-w-2xl mx-auto bg-card/50 backdrop-blur-xl border border-primary/30 rounded-2xl p-6"
        >
          <p className="text-sm mb-3 text-primary font-medium">
            {t("heroSection.quiz.title")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("heroSection.quiz.description")}
          </p>
        </motion.div>

        <motion.div
          {...fadeInUpWithDelay(0.5)}
          className="mb-12"
        >
          <Button
            onClick={() => {
              trackQuizStarted();
              onStart();
            }}
            size="lg"
            className="px-8 py-6 rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            {t("heroSection.button")}
            <Zap className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        {/* Visual Team Representation */}
        <motion.div
          {...fadeInUpWithDelay(0.6)}
          className="mt-12 md:mt-24 flex items-center justify-center gap-4"
        >
          <div className="relative">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-sm border border-border flex items-center justify-center"
                style={{
                  left: `${i * 40}px`,
                  zIndex: 5 - i,
                }}
              >
                <Users className="w-5 h-5 text-primary" />
              </motion.div>
            ))}
          </div>
          <div className="ml-52 text-left">
            <p className="text-sm text-muted-foreground">
              {t("heroSection.team.title")}
            </p>
            <p className="text-xs text-muted-foreground/60">
              {t("heroSection.team.subtitle")}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
