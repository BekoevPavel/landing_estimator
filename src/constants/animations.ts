/**
 * Константы анимаций для Framer Motion
 */

export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const FADE_IN_UP = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export const FADE_IN_DOWN = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export const SLIDE_IN_LEFT = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

export const SLIDE_IN_RIGHT = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

export const SCALE_IN = {
  initial: { scale: 0 },
  animate: { scale: 1 },
};

// Функции для создания анимаций с задержкой
export const fadeInUpWithDelay = (delay: number) => ({
  ...FADE_IN_UP,
  transition: { delay },
});

export const fadeInWithDelay = (delay: number) => ({
  ...FADE_IN,
  transition: { delay },
});

export const scaleInWithDelay = (delay: number) => ({
  ...SCALE_IN,
  transition: { delay },
});

// Viewport настройки для whileInView
export const VIEWPORT_ONCE = {
  once: true,
};

