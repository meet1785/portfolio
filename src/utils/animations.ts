import { Variants } from "framer-motion";

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.15,
      ease: "easeIn"
    }
  }
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { 
      staggerChildren: 0.03,
      delayChildren: 0.05
    }
  }
};

export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const slideInFromLeft: Variants = {
  initial: { 
    opacity: 0, 
    x: -30
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const slideInFromRight: Variants = {
  initial: { 
    opacity: 0, 
    x: 30
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const rotateIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const bounceIn: Variants = {
  initial: { 
    opacity: 0, 
    y: -20,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.4
    }
  }
};

export const typewriter: Variants = {
  initial: { 
    opacity: 0,
    x: -20
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.4,
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
    y: [-5, 5, -5],
    opacity: 1,
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

export const pulseGlow: Variants = {
  initial: { 
    opacity: 0.3,
    scale: 1
  },
  animate: { 
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Enhanced 3D animations for portfolio
export const rotate3D: Variants = {
  initial: { 
    rotateY: 0,
    rotateX: 0,
  },
  animate: { 
    rotateY: [0, 5, -5, 0],
    rotateX: [0, 2, -2, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const cardHover3D: Variants = {
  initial: { 
    rotateY: 0,
    rotateX: 0,
    z: 0,
    scale: 1
  },
  hover: { 
    rotateY: 8,
    rotateX: 8,
    z: 50,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const float3D: Variants = {
  initial: { 
    y: 0,
    rotateY: 0,
    rotateZ: 0
  },
  animate: { 
    y: [-10, 10, -10],
    rotateY: [0, 360],
    rotateZ: [0, 5, -5, 0],
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      },
      rotateY: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      },
      rotateZ: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

export const morphingBlob: Variants = {
  initial: { 
    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
    scale: 1
  },
  animate: { 
    borderRadius: [
      "30% 70% 70% 30% / 30% 30% 70% 70%",
      "70% 30% 30% 70% / 70% 70% 30% 30%",
      "50% 50% 50% 50% / 50% 50% 50% 50%",
      "30% 70% 70% 30% / 30% 30% 70% 70%"
    ],
    scale: [1, 1.1, 0.9, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const particleFloat: Variants = {
  initial: { 
    y: 0,
    x: 0,
    opacity: 0.6
  },
  animate: { 
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 2
    }
  }
};

// ===== NEW MODERN ANIMATIONS =====

// Text reveal with smooth stagger
export const textReveal: Variants = {
  initial: { 
    y: 100,
    opacity: 0
  },
  animate: { 
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Magnetic hover effect for cards
export const magneticHover: Variants = {
  initial: { 
    scale: 1,
    boxShadow: '0 0 0 rgba(59, 130, 246, 0)'
  },
  hover: { 
    scale: 1.02,
    boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Glowing pulse for interactive elements
export const glowPulse: Variants = {
  initial: { 
    boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
  },
  animate: { 
    boxShadow: [
      '0 0 20px rgba(99, 102, 241, 0.3)',
      '0 0 40px rgba(99, 102, 241, 0.5)',
      '0 0 20px rgba(99, 102, 241, 0.3)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Perspective tilt for cards
export const perspectiveTilt: Variants = {
  initial: { 
    rotateX: 0,
    rotateY: 0,
    transformPerspective: 1000
  },
  hover: { 
    rotateX: -5,
    rotateY: 10,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Slide up with elastic effect
export const elasticSlideUp: Variants = {
  initial: { 
    y: 60,
    opacity: 0
  },
  animate: { 
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

// Aurora gradient animation
export const auroraGradient: Variants = {
  initial: { 
    backgroundPosition: '0% 50%'
  },
  animate: { 
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Orbit animation for decorative elements
export const orbitRotation: Variants = {
  initial: { 
    rotate: 0
  },
  animate: { 
    rotate: 360,
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Scale with blur entrance
export const scaleBlurIn: Variants = {
  initial: { 
    scale: 0.8,
    opacity: 0,
    filter: 'blur(10px)'
  },
  animate: { 
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Shimmer effect for loading/highlighting
export const shimmerEffect: Variants = {
  initial: { 
    x: '-100%'
  },
  animate: { 
    x: '100%',
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
      repeatDelay: 0.5
    }
  }
};

// Counter animation helper
export const countUp: Variants = {
  initial: { 
    opacity: 0,
    scale: 0.5
  },
  animate: { 
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

// Enhanced stagger with better timing
export const staggerChildren: Variants = {
  initial: {},
  animate: {
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Flip card animation
export const flipCard: Variants = {
  initial: { 
    rotateY: 0
  },
  flip: { 
    rotateY: 180,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
};

// Wiggle animation for attention
export const wiggle: Variants = {
  initial: { 
    rotate: 0
  },
  animate: { 
    rotate: [0, -3, 3, -3, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};
