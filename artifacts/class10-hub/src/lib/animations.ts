import { Variants } from "framer-motion";

// Faster spring presets (reduced travel distance + snappier spring)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 340, damping: 26 } }
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 340, damping: 26 } }
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 340, damping: 26 } }
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 340, damping: 26 } }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 360, damping: 28 } }
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 450, damping: 22 } }
};

// Stagger containers — all faster
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.07 }
  }
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.035, delayChildren: 0.04 }
  }
};

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

// Page transition — fast snap
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } }
};

export const cardHover = {
  scale: 1.03,
  y: -3,
  transition: { type: "spring", stiffness: 380, damping: 22 }
};

export const buttonTap = { scale: 0.95 };
export const buttonHover = { scale: 1.05, transition: { type: "spring", stiffness: 450, damping: 20 } };

export const slideInFromBottom: Variants = {
  hidden: { y: "100%", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 360, damping: 32 } }
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -8, scale: 0.85 },
  show: { opacity: 1, rotate: 0, scale: 1, transition: { type: "spring", stiffness: 360, damping: 24 } }
};

export const viewportOnce = { once: true, margin: "-50px" };
