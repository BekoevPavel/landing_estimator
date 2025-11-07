import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Target,
  Zap,
  Users,
  Eye,
  GitBranch,
} from "lucide-react";
import { Button } from "./ui/button";
import { QuizResult } from "../types/quiz.types";
import { trackResultsViewed, trackContinueToPricing } from "../analytics/events";

interface ResultScreenProps {
  result: QuizResult;
  onContinue: () => void;
  key?: string;
}

// Icons for custom team features
const FEATURE_ICONS = [Zap, Users, Eye, GitBranch];
const FEATURE_COLORS = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-emerald-500",
];

export default function ResultScreen({
  result,
  onContinue,
}: ResultScreenProps) {
  const { t } = useTranslation();

  // Track results viewed
  useEffect(() => {
    trackResultsViewed();
  }, []);

  // Get localized archetype data
  const archetypeKey = result.primary_archetype;
  const archetypeData = t(`quiz.archetypes.${archetypeKey}`, {
    returnObjects: true,
  }) as typeof result.archetype_data;

  const archetypeName = archetypeData.title;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-4xl">
        {/* Result Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent mb-6"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="mb-4">
            {t("resultScreen.titleTemplate", {
              archetypeName,
            })}
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-6">
            {archetypeData.summary}
          </p>

          {/* Hybrid Badge */}
          {result.is_hybrid && result.secondary_archetype && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/50 text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                Hybrid:{" "}
                {t(`quiz.archetypes.${result.secondary_archetype}.title`)}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Strengths, Risks, Pain Points */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* Strengths */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6">
            <h4 className="mb-3 text-green-500 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              {t("resultScreen.strengthsLabel")}
            </h4>
            <ul className="space-y-2 text-sm">
              {archetypeData.strengths.map((strength, i) => (
                <li key={i} className="text-muted-foreground">
                  • {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Risks */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6">
            <h4 className="mb-3 text-orange-500 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {t("resultScreen.risksLabel")}
            </h4>
            <ul className="space-y-2 text-sm">
              {archetypeData.risks.map((risk, i) => (
                <li key={i} className="text-muted-foreground">
                  • {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Pain Points */}
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6">
            <h4 className="mb-3 text-red-500 flex items-center gap-2">
              <Target className="w-5 h-5" />
              {t("resultScreen.painPointsLabel")}
            </h4>
            <ul className="space-y-2 text-sm">
              {archetypeData.pain_points.map((point, i) => (
                <li key={i} className="text-muted-foreground">
                  • {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Custom Team Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="mb-3 text-center">{t("resultScreen.sectionTitle")}</h3>
          <p className="text-center text-sm text-muted-foreground mb-6">
            {t("resultScreen.sectionNote")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(
              t("resultScreen.customTeam.items", {
                returnObjects: true,
              }) as Array<{ title: string; description: string }>
            ).map((item, index) => {
              const Icon = FEATURE_ICONS[index];
              const color = FEATURE_COLORS[index];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="relative group"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-xl"
                    style={{
                      background: `linear-gradient(to bottom right, var(--primary), var(--accent))`,
                    }}
                  />
                  <div className="relative bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <Button
            onClick={() => {
              trackContinueToPricing();
              onContinue();
            }}
            size="lg"
            className="px-8 py-6 rounded-2xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
          >
            {t("resultScreen.button")}
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("resultScreen.footer", { archetypeName })}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
