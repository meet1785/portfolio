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
      staggerChildren: 0.1, // Increased from 0.03 to reduce mobile jank
      delayChildren: 0.1    // Increased from 0.05
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
    opacity: [0.3, 0.5, 0.3], // Reduced intensity from 0.6 to 0.5
    scale: [1, 1.01, 1],      // Reduced from 1.02 to 1.01
    transition: {
      duration: 4,            // Increased duration to slow down animation
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Enhanced 3D animations for portfolio - optimized for mobile
export const rotate3D: Variants = {
  initial: { 
    rotateY: 0,
    rotateX: 0,
  },
  animate: { 
    rotateY: [0, 3, -3, 0],  // Reduced from [0, 5, -5, 0]
    rotateX: [0, 1, -1, 0],  // Reduced from [0, 2, -2, 0]
    transition: {
      duration: 8,           // Increased from 6 to slow down
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
    y: [-5, 5, -5],          // Reduced from [-10, 10, -10]
    rotateY: [0, 180],       // Reduced from full 360 rotation
    rotateZ: [0, 3, -3, 0],  // Reduced from [0, 5, -5, 0]
    transition: {
      y: {
        duration: 5,         // Increased from 4
        repeat: Infinity,
        ease: "easeInOut"
      },
      rotateY: {
        duration: 30,        // Increased from 20 to slow down
        repeat: Infinity,
        ease: "linear"
      },
      rotateZ: {
        duration: 8,         // Increased from 6
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
    scale: [1, 1.05, 0.95, 1], // Reduced from [1, 1.1, 0.9, 1]
    transition: {
      duration: 10,            // Increased from 8 to slow down
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
