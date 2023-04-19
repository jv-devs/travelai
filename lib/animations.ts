export const fade = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
  exit: {
    opacity: 0,
  },
}

export const riseWithFade = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
  exit: {
    opacity: 0,
    y: -50,
  },
}

export const riseWithFadeDelay = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, 0.01, 0.05, 0.95],
      delay: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: -100,
  },
}

export const slideFromLeft = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, 0.01, 0.05, 0.95],
      delay: 0.4,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
  },
}

export const staggerChildren = {
  animate: {
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
}

export const wordAnimation = {
  initial: {
    y: 100,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
}

export const staggerImages = {
  animate: {
    transition: {
      delayChildren: 1.5,
      staggerChildren: 0.25,
    },
  },
}

export const imageAnimation = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
}
