import { useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Gift,
  Zap,
  Star,
  Rocket,
  MessageCircle,
  Lock
} from "lucide-react";
import { Button } from "./ui/button";

interface FoundersCircleScreenProps {
  initialEmail?: string;
}

export default function FoundersCircleScreen({ initialEmail = "" }: FoundersCircleScreenProps) {
  const { t } = useTranslation();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
    // Here you would normally send to backend
  };

  const benefits = [
    {
      icon: Sparkles,
      textKey: "founders.benefits.discount.title",
      detailKey: "founders.benefits.discount.detail",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Zap,
      textKey: "founders.benefits.priority.title",
      detailKey: "founders.benefits.priority.detail",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Gift,
      textKey: "founders.benefits.bonusCredits.title",
      detailKey: "founders.benefits.bonusCredits.detail",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: MessageCircle,
      textKey: "founders.benefits.founderAccess.title",
      detailKey: "founders.benefits.founderAccess.detail",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Lock,
      textKey: "founders.benefits.closedBeta.title",
      detailKey: "founders.benefits.closedBeta.detail",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-2xl">
        {/* Celebration Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            {/* Confetti particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: Math.cos(i * 45 * Math.PI / 180) * 60,
                  y: Math.sin(i * 45 * Math.PI / 180) * 60,
                }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.8 }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12"
        >
          {/* Main Title */}
          <h1 className="text-center mb-8 text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent">
            {t("founders.title")}
          </h1>

          {/* Reassurance Block */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-6 mb-8"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-green-100">{t("founders.reassurance.noCharge")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <span className="text-primary-foreground">{t("founders.reassurance.earlyAdopter")}</span>
              </div>
            </div>
          </motion.div>

          {/* Benefits Heading */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <h3 className="flex items-center gap-2 mb-6 text-xl font-semibold">
              <Gift className="w-6 h-6 text-primary" />
              {t("founders.benefitsTitle")}
            </h3>
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4 mb-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.textKey}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-start gap-4 bg-secondary/50 rounded-xl p-4 hover:bg-secondary/70 transition-colors group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${benefit.gradient} flex items-center justify-center flex-shrink-0`}>
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    <span className="font-medium">{t(benefit.textKey)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t(benefit.detailKey)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline Note */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-4 mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">{t("founders.timeline.title")}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {t("founders.timeline.subtitle")}
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            {!isConfirmed ? (
              <Button
                onClick={handleConfirm}
                size="lg"
                className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              >
                {t("founders.cta.confirm")}
                <CheckCircle2 className="ml-2 w-5 h-5" />
              </Button>
            ) : (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="font-medium text-green-100">{t("founders.confirmed.title")}</p>
                <p className="text-sm text-green-200/60 mt-1">
                  {t("founders.confirmed.subtitle")}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            {t("founders.footer.text")}{" "}
            <a href="mailto:estimatemyfast@gmail.com" className="text-primary hover:underline">
              estimatemyfast@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}




