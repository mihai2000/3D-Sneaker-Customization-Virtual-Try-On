import { Variants } from 'framer-motion';

export const transition = { type: 'spring', duration: 0.8 };

export type SlideDirection = 'left' | 'right' | 'up' | 'down';

/**
 * Returns slide animation variants based on direction
 */
export const slideAnimation = (direction: SlideDirection): Variants => {
  return {
    initial: {
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0 },
    },
  };
};

export const fadeAnimation: Variants = {
  initial: {
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};

export const headTextAnimation: Variants = {
  initial: {
    x: 100,
    opacity: 0,
    transition: {
      type: 'spring',
      damping: 5,
      stiffness: 40,
      restDelta: 0.001,
      duration: 0.3,
    },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 5,
      stiffness: 40,
      restDelta: 0.001,
      duration: 0.3,
    },
  },
};

export const headContentAnimation: Variants = {
  initial: {
    y: 100,
    opacity: 0,
    transition: {
      type: 'spring',
      damping: 7,
      stiffness: 30,
      restDelta: 0.001,
      duration: 0.6,
      delay: 0.2,
      delayChildren: 0.2,
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 7,
      stiffness: 30,
      restDelta: 0.001,
      duration: 0.6,
      delay: 0.2,
      delayChildren: 0.2,
    },
  },
};

export const headContainerAnimation: Variants = {
  initial: {
    x: -100,
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};
