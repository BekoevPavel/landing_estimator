import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { CheckCircle2, MessageCircle, Gift, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function WaitlistScreen() {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-2xl text-center">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          {t("waitlist.title")}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-12 max-w-lg mx-auto"
        >
          {t("waitlist.description")}
        </motion.p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 text-left group hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="mb-2">{t("waitlist.telegram.title")}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("waitlist.telegram.description")}
            </p>
            <Button variant="outline" className="w-full rounded-xl group-hover:border-primary">
              {t("waitlist.telegram.button")}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl p-6 text-left group hover:border-primary/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <h3 className="mb-2">{t("waitlist.discount.title")}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t("waitlist.discount.description")}
            </p>
            <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent">
              {t("waitlist.discount.button")}
            </Button>
          </motion.div>
        </div>

        {/* Survey Link */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-secondary/50 rounded-xl p-6"
        >
          <p className="text-sm text-muted-foreground mb-4">
            {t("waitlist.feedback.title")}
          </p>
          <Input
            type="text"
            placeholder={t("waitlist.feedback.placeholder")}
            className="rounded-xl mb-3"
          />
          <Button variant="outline" size="sm" className="rounded-lg">
            {t("waitlist.feedback.button")}
          </Button>
        </motion.div>

        {/* Email Confirmation */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-sm text-muted-foreground"
        >
          {t("waitlist.footer")}
        </motion.p>
      </div>
    </motion.section>
  );
}
