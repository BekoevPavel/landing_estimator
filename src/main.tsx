import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n"; // Инициализация i18n
import { initPostHog } from "./analytics/posthog.config"; // Инициализация PostHog

// Инициализируем PostHog для аналитики и A/B тестов
initPostHog();

createRoot(document.getElementById("root")!).render(<App />);
  