import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Zap, CheckCircle } from "lucide-react";
import { Button } from "../../ui/button";
import { VIEWPORT_ONCE } from "../../../constants/animations";

interface CTASectionProps {
  onStartTest: () => void;
}

export function CTASection({ onStartTest }: CTASectionProps) {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-primary/20 via-accent/20 to-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
        >
          <h2 className="mb-4 text-4xl md:text-5xl">
            {t("landing.cta.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {t("landing.cta.description")}
          </p>
          <Button
            onClick={onStartTest}
            size="lg"
            className="px-12 py-8 rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-lg"
          >
            {t("landing.cta.button")}
            <Zap className="ml-2 w-6 h-6" />
          </Button>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              {t("landing.cta.badges.noCard")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              {t("landing.cta.badges.fastTime")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              {t("landing.cta.badges.immediate")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

