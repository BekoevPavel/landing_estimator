import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Zap } from "lucide-react";

interface HeaderProps {
  onLogoClick: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <div className="font-semibold">{t("header.title")}</div>
            <div className="text-xs text-muted-foreground">{t("header.subtitle")}</div>
          </div>
        </button>
      </div>
    </motion.header>
  );
}

