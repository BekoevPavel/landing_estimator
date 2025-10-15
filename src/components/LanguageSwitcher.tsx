/**
 * Независимый компонент переключателя языка
 * Архитектурное решение: вынесен из Header для использования на всех экранах
 * UX: Правый верхний угол - международный стандарт для language switcher
 */

import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  const getLanguageDisplay = () => {
    return i18n.language === "en" ? "🇺🇸 EN" : "🇷🇺 RU";
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 backdrop-blur-xl border border-border hover:border-primary/50 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-primary/20"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4 text-primary" />
      <span>{getLanguageDisplay()}</span>
    </motion.button>
  );
}

