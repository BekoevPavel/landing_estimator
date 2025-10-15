/**
 * i18n конфигурация для локализации
 * Поддерживаемые языки: en, ru
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/translation.json";
import ruTranslation from "./locales/ru/translation.json";

// Определение языка по умолчанию
const DEFAULT_LANGUAGE = "en";

// Получение сохраненного языка из localStorage или использование языка браузера
const getInitialLanguage = (): string => {
  const savedLanguage = localStorage.getItem("i18nextLng");
  if (savedLanguage && ["en", "ru"].includes(savedLanguage)) {
    return savedLanguage;
  }
  
  // Определение языка браузера
  const browserLanguage = navigator.language.split("-")[0];
  return ["en", "ru"].includes(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE;
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ru: {
        translation: ruTranslation,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false, // React уже экранирует значения
    },
    react: {
      useSuspense: false, // Отключаем Suspense для простоты
    },
  });

// Сохранение выбранного языка в localStorage при изменении
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("i18nextLng", lng);
  document.documentElement.lang = lng;
});

export default i18n;

