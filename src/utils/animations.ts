import { Variants } from "framer-motion";

// Page transitions with 3D depth
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    y: 30,
    scale: 0.98,
    filter: "blur(10px)"
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0, 
    y: -30,
    scale: 0.98,
    filter: "blur(10px)",
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.8,
    filter: "blur(10px)"
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
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

// Enhanced 3D animations for portfolio - Recruiter-focused
export const rotate3D: Variants = {
  initial: { 
    rotateY: 0,
    rotateX: 0,
    rotateZ: 0,
  },
  animate: { 
    rotateY: [0, 8, -8, 0],
    rotateX: [0, 4, -4, 0],
    rotateZ: [0, 1, -1, 0],
    transition: {
      duration: 8,
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
    scale: 1,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
  },
  hover: { 
    rotateY: 10,
    rotateX: 8,
    z: 80,
    scale: 1.05,
    boxShadow: "0 30px 60px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.15)",
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const float3D: Variants = {
  initial: { 
    y: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1
  },
  animate: { 
    y: [-15, 15, -15],
    rotateY: [0, 360],
    rotateZ: [0, 8, -8, 0],
    scale: [1, 1.05, 1],
    transition: {
      y: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      },
      rotateY: {
        duration: 25,
        repeat: Infinity,
        ease: "linear"
      },
      rotateZ: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      },
      scale: {
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
    scale: 1,
    rotate: 0
  },
  animate: { 
    borderRadius: [
      "30% 70% 70% 30% / 30% 30% 70% 70%",
      "70% 30% 30% 70% / 70% 70% 30% 30%",
      "50% 50% 50% 50% / 50% 50% 50% 50%",
      "60% 40% 60% 40% / 40% 60% 40% 60%",
      "30% 70% 70% 30% / 30% 30% 70% 70%"
    ],
    scale: [1, 1.15, 0.9, 1.1, 1],
    rotate: [0, 10, -10, 5, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const particleFloat: Variants = {
  initial: { 
    y: 0,
    x: 0,
    opacity: 0.4,
    scale: 1
  },
  animate: { 
    y: [-30, 30, -30],
    x: [-20, 20, -20],
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.3, 1],
    transition: {
      duration: Math.random() * 4 + 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 3
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

// Slide up with elastic effect - Enhanced
export const elasticSlideUp: Variants = {
  initial: { 
    y: 80,
    opacity: 0,
    scale: 0.9,
    filter: "blur(10px)"
  },
  animate: { 
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.8
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
      duration: 15,
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

// ===== NEW RECRUITER-FOCUSED ANIMATIONS =====

// Dramatic entrance for hero elements
export const heroEntrance: Variants = {
  initial: {
    opacity: 0,
    y: 100,
    scale: 0.8,
    rotateX: -20,
    filter: "blur(20px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.15
    }
  }
};

// Floating with depth effect
export const floatWithDepth: Variants = {
  initial: {
    y: 0,
    z: 0,
    rotateX: 0
  },
  animate: {
    y: [-20, 20, -20],
    z: [0, 30, 0],
    rotateX: [0, 5, -5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Glow pulse for important elements
export const glowPulseEnhanced: Variants = {
  initial: {
    boxShadow: "0 0 20px rgba(99, 102, 241, 0.2)"
  },
  animate: {
    boxShadow: [
      "0 0 20px rgba(99, 102, 241, 0.2)",
      "0 0 40px rgba(99, 102, 241, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)",
      "0 0 20px rgba(99, 102, 241, 0.2)"
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Text reveal with split animation
export const textRevealSplit: Variants = {
  initial: {
    opacity: 0,
    y: 50,
    skewY: 5
  },
  animate: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Card flip animation for reveals
export const cardFlip3D: Variants = {
  initial: {
    rotateY: -90,
    opacity: 0,
    scale: 0.8
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Ripple effect for buttons
export const rippleEffect: Variants = {
  initial: {
    scale: 0,
    opacity: 0.5
  },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Orbit rotation for decorative elements
export const orbitSpin: Variants = {
  initial: {
    rotate: 0
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 40,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Counter bounce for stats
export const counterBounce: Variants = {
  initial: {
    scale: 0,
    opacity: 0
  },
  animate: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Magnetic hover for interactive elements
export const magneticPull: Variants = {
  initial: {
    x: 0,
    y: 0
  },
  hover: {
    x: 5,
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

// Stagger with wave effect
export const staggerWave: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      staggerDirection: 1
    }
  }
};

// Parallax depth layers
export const parallaxLayer: Variants = {
  initial: {
    y: 0
  },
  animate: (depth: number) => ({
    y: depth * 10,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Shimmer loading effect
export const shimmerLoading: Variants = {
  initial: {
    backgroundPosition: "-200% 0"
  },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Bounce in with rotation
export const bounceInRotate: Variants = {
  initial: {
    scale: 0,
    rotate: -180,
    opacity: 0
  },
  animate: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15
    }
  }
};

// Slide in from side with blur
export const slideInBlur: Variants = {
  initial: {
    x: -100,
    opacity: 0,
    filter: "blur(10px)"
  },
  animate: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Pop in with overshoot
export const popInOvershoot: Variants = {
  initial: {
    scale: 0,
    opacity: 0
  },
  animate: {
    scale: [0, 1.15, 0.95, 1],
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};
