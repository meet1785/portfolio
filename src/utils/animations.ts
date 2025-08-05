import { Variants } from "framer-motion";

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    rotateY: -10
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const slideInFromLeft: Variants = {
  initial: { 
    opacity: 0, 
    x: -50,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const slideInFromRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 50,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const rotateIn: Variants = {
  initial: { 
    opacity: 0, 
    rotate: -10,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const bounceIn: Variants = {
  initial: { 
    opacity: 0, 
    y: -100,
    scale: 0.3
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
      duration: 0.8
    }
  }
};

export const typewriter: Variants = {
  initial: { 
    opacity: 0,
    x: -50
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const floatUpDown: Variants = {
  initial: { 
    y: 0,
    opacity: 1
  },
  animate: { 
    y: [-10, 10, -10],
    opacity: 1,
    transition: {
      y: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

export const pulseGlow: Variants = {
  initial: { 
    opacity: 0.5,
    scale: 1
  },
  animate: { 
    opacity: [0.5, 1, 0.5],
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
