import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { X, ArrowRight, Brain, AlertTriangle, Users, FileText } from "lucide-react";
import { Button } from "../../ui/button";
import { VIEWPORT_ONCE } from "../../../constants/animations";

interface ComparisonSectionProps {
  onStartTest: () => void;
}

const COMPARISON_ICONS = [Brain, AlertTriangle, Users, FileText];

export function ComparisonSection({ onStartTest }: ComparisonSectionProps) {
  const { t } = useTranslation();
  const comparison = t("landing.comparison.items", { returnObjects: true }) as Array<{
    method: string;
    problem: string;
    result: string;
  }>;

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-4xl md:text-5xl">
            {t("landing.comparison.title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("landing.comparison.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comparison.map((item, index) => {
            const Icon = COMPARISON_ICONS[index];
            return (
              <motion.div
                key={item.method}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{item.method}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>{t("landing.comparison.labels.problem")}</strong> {item.problem}
                    </p>
                    <p className="text-sm text-destructive">
                      <strong>{t("landing.comparison.labels.result")}</strong> {item.result}
                    </p>
                  </div>
                  <X className="w-5 h-5 text-destructive flex-shrink-0" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          className="mt-12 text-center"
        >
          <Button
            onClick={onStartTest}
            size="lg"
            className="px-8 py-6 rounded-2xl bg-gradient-to-r from-primary to-accent"
          >
            {t("landing.comparison.cta")}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

