/**
 * Константы градиентов для консистентности дизайна
 */

export const GRADIENTS = {
  // Основные градиенты
  primary: "bg-gradient-to-r from-primary to-accent",
  primaryBr: "bg-gradient-to-br from-primary to-accent",
  
  // Hero секция
  hero: "bg-gradient-to-br from-purple-900/20 via-background to-background",
  
  // Карточки и секции
  cardPrimary: "bg-gradient-to-br from-primary/10 to-accent/10",
  cardAccent: "bg-gradient-to-br from-primary/20 via-accent/20 to-background",
  
  // Границы (для border-gradient)
  borderBlue: "from-blue-500 to-cyan-500",
  borderPurple: "from-purple-500 to-pink-500",
  borderOrange: "from-orange-500 to-red-500",
  borderGreen: "from-green-500 to-emerald-500",
} as const;

export const GRADIENT_TEXT = {
  primary: "bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent",
  accent: "bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent",
} as const;

