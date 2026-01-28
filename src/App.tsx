import React from 'react';
import { Github, Linkedin, Mail, FileText, Briefcase, ExternalLink, Download, Menu, X, ArrowRight, Sparkles, Code2, Zap, Rocket, Award, GraduationCap } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider} from './context/ThemeContext';
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring } from 'framer-motion';
import { pageTransition, fadeInUp, staggerContainer, rotate3D, cardHover3D, float3D, morphingBlob, floatWithDepth } from './utils/animations';
import { useDebounce } from './utils/useDebounce';
import img from '/IMG-20250308-WA0004.jpg';

// Enhanced Cursor following effect with trail
const CursorGlow: React.FC = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Primary glow */}
      <motion.div
        className="fixed w-[800px] h-[800px] rounded-full pointer-events-none z-0 hidden lg:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 25%, rgba(236, 72, 153, 0.04) 50%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Secondary smaller glow */}
      <motion.div
        className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-0 hidden lg:block"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </>
  );
};

// Enhanced Scroll progress indicator with gradient
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-cyan-500 z-[100] origin-left"
        style={{ scaleX }}
      />
      {/* Glow effect */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[99] origin-left blur-sm opacity-60"
        style={{ scaleX }}
      />
    </>
  );
};

// Optimized Particle Field - memoized for performance
const ParticleField: React.FC = React.memo(() => {
  const prefersReducedMotion = React.useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  , []);

  // Pre-generate particle data to avoid re-renders
  const particles = React.useMemo(() => {
    const colors = [
      'rgba(99, 102, 241, 0.5)',
      'rgba(139, 92, 246, 0.4)',
      'rgba(236, 72, 153, 0.35)',
      'rgba(6, 182, 212, 0.4)',
    ];
    const glowColors = [
      'rgba(99, 102, 241, 0.3)',
      'rgba(139, 92, 246, 0.25)',
      'rgba(236, 72, 153, 0.25)',
    ];
    
    // Reduced particle count for better performance (20 instead of 50)
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${(i * 5) % 100}%`,
      top: `${(i * 7) % 100}%`,
      size: 4 + (i % 5),
      color: colors[i % colors.length],
      glow: glowColors[i % glowColors.length],
      glowSize: 15 + (i % 3) * 8,
      delay: i * 0.15,
    }));
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full will-change-transform"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 6 + particle.id % 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            boxShadow: `0 0 ${particle.glowSize}px ${particle.glow}`,
          }}
        />
      ))}
    </div>
  );
});

ParticleField.displayName = 'ParticleField';

// Floating 3D Geometric Shapes
const FloatingShapes: React.FC = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = React.useMemo(() => 
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  , []);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Hexagon */}
      <motion.div
        className="absolute top-20 right-[15%] w-20 h-20 border border-indigo-500/30 will-change-transform"
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        animate={{
          rotate: [0, 360],
          y: [-20, 20, -20],
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      
      {/* Triangle */}
      <motion.div
        className="absolute bottom-32 left-[20%] w-16 h-16 border border-purple-500/30 will-change-transform"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{
          rotate: [0, -360],
          y: [-15, 15, -15],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      
      {/* Diamond */}
      <motion.div
        className="absolute top-1/3 left-[10%] w-12 h-12 border border-cyan-500/30 will-change-transform"
        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.15, 1],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      
      {/* Circle rings */}
      <motion.div
        className="absolute bottom-1/4 right-[25%] w-24 h-24 border border-pink-500/20 rounded-full will-change-transform"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Animated counter component - minimal style
const AnimatedCounter: React.FC<{ value: number; suffix?: string; label: string; icon?: React.ReactNode }> = ({ value, suffix = '', label }) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 40;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <motion.div 
      ref={ref}
      className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-2 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-white/40 uppercase tracking-wider font-medium">{label}</div>
    </motion.div>
  );
}; 

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

interface ProfileCardProps {
  platform: string;
  username: string;
  link: string;
}

const profileIcons: Record<string, string> = {
  LeetCode: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
  GeeksForGeeks: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg",
  CodeChef:" data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwEEBQYHAgj/xAA+EAABAwIEAwMKBAUDBQAAAAABAAIDBBEFBhIhMUFRE2FxByIjQlKBkaGxwRQyYtFTcoLh8BYk0hUzNEOy/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAIBAwQGBf/EACcRAQEAAgEEAgIABwAAAAAAAAABAhEDBCExQRITBVEUIjNhgZGh/9oADAMBAAIRAxEAPwDuKIiAiIgIiICIiAioSBzUTpm+rv8ARBMqEqxkqHunbDGbPfuf0jqvZiIaSXknncLdC61DqFUHvVjZeXkNFybLBkUWP1vafNd81UVMg42I7wgv0Vmyubez2Ed4U8U0cn5HgoJUREBERAREQEREBERAREQERRVEnZMuLaiQG36oEkrWcdz0VsKiaSZzI2tsACXE2tf3KVzAGm+56nmoHHsz2o2ts4dy0Sua+3nG6oApXbhebWBTyxaYeO0qaic+1ob4BXzvylWWEC9IXni55JV6lERHfZWc7tVVHCODfPd9gr+yxlCe3rKmU+77fRbILxw3OyjcFMR1Xhw2WCzqn9lGTzOzQqAGO1iQW9F5f6asDBu2Pc+KletYuKevIOmbhyd+6yLXBzQWkEHmFgXWU1FV9g4Mkv2Z+RWabtmUVAQRccFVY0REQEREBERAREQFZYiztmCK9jxB71eq1qh5zUFlhtU97jTz7vaPNKuy3UwtI4iyx847HEYJRtrNj4rJC/A8VTIjoZTJSgH8zDoPuU7hsVY0LtNZVxfq1N7v82V+ns9LHBz/ALQt5hxur5Y7CTplqY+j/wB1kbJSIp3aIHu6NKscFb6GVx4l9vl/dXeIG1HL/KoMHFqIHq4n7fZPTL5XRChmcI4nv6NupyFaVw1sZEPXeAfAblZGoaOO0Ot35n7r28KdwHLhyUL1tED7C91adoXyGw2CkrH2GgcTuV4ib6O55rfTPbKYRVF3oJDuBdp6hZRau1zo5mvZ+YEELZwprYqiIsaIiICIiAiIgKGpbdl+YUyo4XBCDDYmL04eOLHAhZBp1AOHMK3q49UErOdiq0L9dJCerix8RsqYgYdOMvHtM+wWS4LHSi2MQu6st9VkLoRjqT0eLTs5OBKyZ4LGT+jxmF/J4sfgQsldKRa4l/4UvgqYYLUMXff6r1iAvRSgeylANNFD3tunpl8pSrd3nVTb+qz6q4cVbNN5pT4D5LGqnYWUT+BKlcrWrfohd1Oy0rHykyzEjmbe5XDhYADkoaVt3X5DgpnlbkmFJGZqyNg4XufALZFjsIp9DDM8Wc/gOgWRU1UERFjRERAREQEREBERAK8lw5rE5ozBR5cwx1bW63XcGRxsHnSPPAD9+S5NW5kzNnSvFDQB0TJOFPA7S1o6vf8AU/JZctKxx26HmjPuF4G10ULhWVvAQRO2af1O5fVMg5pq8z0tTJV0DacQvaGSxklkl73AvzH3WIwLyV0FMGSYxUOq5bXMUfmRX+p+/Rb/AE1NDSwMhpomRRMFmsYLAJN7bl8Z2iXktaxzK0lZiQxXB8UkwrESzs5ZWRCRszeQc24uRyN1s3JYzMWKtwTBKzEns1injLgzhqdwA95ISom99mDhyNTzvEuYsSrcYl9mZ5ZCPCNvLuJIWRwjLNNguKPqMKlfTUcsemShaPR6+T2+zttYLlzsy53q6OXG4pZW0MTvPfGxojb1GniQOu/iuo5Lxx2YMAgrpWBs1yyUAWGocbLJYvKX2zyoTZVUNZO2mpZZ330xsLzbuF1SEmpVBXEajNOccXjqsXoH1EeHwElxpwNEY47342HFdB8m+Y6nMODSurtJqqaXs3vaLahYEH5qZlKu42TbbVoufc44tlquhio8MjkpXs1Gom1aSfZBB2t39VvQUc8EVRGY542SMPFrxcFamVo+BeVDCa4MjxSJ+Hznm464j/UOHvAW709TDVQtmppGSxOF2vY4EH3rVMa8neXsRa8x0xopiNpKc2APe3gVzTDMUxbJmYJqCjmFU2ObQ6CM6o5vADg778VO7F/GZeHfEXiF7nxRvc0sc5oJaeW3Be1bmIiICIiAiIgIiINaztlWPNFHBG+qfTyU7i6NwF2knqOfBcxqcCzVkmqdWUuswgedPTDWwt/W3iB/l13NUU3GVWOVnZzXL/lVpZwyPG6cwuO3bwguae8jj8Lrf8PxKixKnE+HVMVTEdtUTg4A9D0PctczLkDCMZL5YYxRVTtzLC2wcf1N4FaplDIuPYVmeKqlkjgpoH3fJHIfTMts2w5dx4JLZ5VZje8dZ5LHY/hrcYwWtw57tP4iJzA7jpPI+42KyI4JYKnPxXz9JVZkwuinyw+GdkUjjqhbAXOfc76DbdpXXfJ9hNRg2WKamrG6KhxMsjPZLuXwstkICpYAbKZNVeWe5pVR1UbZoHxSfkkaWu8CqQytnjEkbgWn5EGxHxBQ1EYqG05eO1c0uDOenr4b2VI8OI14zJlSKuy9DDIaOpc7s3sgL9bTt5hHO1rjjdb75K8CqsHwWeSuidDNVy6xE7YsaAALjkea3YAb2QABTIu57mgKzxTE6PCqZ1TiFTHTwt9Z5tc9B1PcFerUM45M/wBT19JPJXSwxU7S10Qbe997jvW1M1fLUsbzVi+c6/8A6PleGaGmJ9JLeznDq4+q3u4lbhk/JNBlyNszg2pr/Wnc38vc0cvqs3geC4fgdE2lw2nbDGLajxc89XHmVkLDokn7VcvULKqItQIiICIiAiIgIiICIiICIiDQfKNkmXHXNxLCmt/Hxt0vicbCdo4b8nDv2PDZcjraCsoJjFXUk9PJ7MjC1fTSjkiZILSMa9vRwuFGWO3THkuPZ8xMY97g2NjnOvsGi5K23LPk+xjGJmSVsMlDRcXSSiz3Do1p395C7dFTQwm8UMcZ/QwBSpMG3ltWmG0MGG0MNHRxCOCFuljR9fFc7zz5OpqiplxLL7GudIS+akuG3PMsJ29xIXUFQqrNzTnMrLt8y1lFWUMpiraWenkHqyxlp+ahY10jtEbHPceAa0kn4L6dkjZI3TIxrm9HC68RU0EJvDBFGerWAKLg6/bXHcm+T6uxOriqsapn02HsId2cmz5+7Tyb1v/AHXZ27NAtZVCqrk055ZXK9xERakREQEREBERB//Z"
};

const skillIcons: Record<string, string> = {
  // Frontend Technologies
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  Redux: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",

  // Backend Technologies
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",

  // Databases
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",

  // Programming Languages
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",

  // AI/ML & Data Science
  "AI/ML": "https://img.icons8.com/color/48/artificial-intelligence.png",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  NLP: "https://img.icons8.com/color/48/natural-language-processing.png",

  // Tools & DevOps
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  "Google Cloud Platform": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
  GCP: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
  Vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  Postman: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",

  // Mobile Development
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",

  // Additional Technologies
  Webpack: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg",
  Babel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/babel/babel-original.svg",
  ESLint: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg",
  Nginx: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
  Linux: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
};

const AppContent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Modern Glassmorphism Navigation */}
      <nav className={`fixed w-full z-50 top-0 transition-all duration-500 ${scrolled ? 'py-2' : 'py-3'}`}>
        <motion.div 
          className={`mx-4 lg:mx-8 transition-all duration-500 ${
            scrolled 
              ? 'py-3 backdrop-blur-xl bg-black/50' 
              : 'py-4'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center">
              {/* Logo/Brand - Minimal */}
              <Link to="/" className="text-white font-medium text-lg hover:opacity-70 transition-opacity" onClick={closeMobileMenu}>
                Meet Shah
              </Link>
              
              {/* Desktop Navigation Links - Minimal */}
              <div className="hidden md:flex items-center space-x-8">
                {[
                  { to: "/", label: "Home" },
                  { to: "/works", label: "Work" },
                  { to: "/resume", label: "Resume" },
                  { to: "/about", label: "About" },
                ].map((item) => (
                  <Link 
                    key={item.to}
                    to={item.to} 
                    className="text-white/50 hover:text-white text-sm transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Contact Link - Minimal */}
              <a 
                href="mailto:meetshah1785@gmail.com"
                className="hidden md:block text-sm text-white/50 hover:text-white transition-colors duration-300"
              >
                Contact
              </a>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white/50 hover:text-white transition-colors"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Minimal */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="px-6 py-6 space-y-4 border-t border-white/10">
                  {[
                    { to: "/", label: "Home" },
                    { to: "/works", label: "Work" },
                    { to: "/resume", label: "Resume" },
                    { to: "/about", label: "About" },
                  ].map((item) => (
                    <Link 
                      key={item.to}
                      to={item.to}
                      onClick={closeMobileMenu}
                      className="block text-white/50 hover:text-white transition-colors py-2"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <a 
                    href="mailto:meetshah1785@gmail.com"
                    className="block text-white/50 hover:text-white transition-colors py-2"
                    onClick={closeMobileMenu}
                  >
                    Contact
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router basename="/portfolio">
        <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
          {/* Scroll Progress Bar */}
          <ScrollProgress />
          
          {/* Cursor Glow Effect */}
          <CursorGlow />
          
          {/* Dynamic background with multiple layers */}
          <div className="fixed inset-0 z-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0a0a1f] to-indigo-950" />
            
            {/* Aurora Gradient Background */}
            <div className="absolute inset-0 aurora-gradient opacity-80" />
            
            {/* Hexagon grid pattern */}
            <div className="absolute inset-0 hexagon-grid opacity-30" />
            
            {/* Noise texture */}
            <div className="absolute inset-0 noise-overlay opacity-50" />
          </div>

          {/* Enhanced 3D Animated Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div 
              variants={morphingBlob}
              initial="initial"
              animate="animate"
              className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-gradient-to-r from-indigo-600/25 to-purple-600/25 rounded-full mix-blend-multiply filter blur-[100px] morph-blob"
            />
            <motion.div 
              variants={float3D}
              initial="initial"
              animate="animate"
              className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-[100px]"
            />
            <motion.div 
              variants={rotate3D}
              initial="initial"
              animate="animate"
              className="absolute -bottom-40 left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-full mix-blend-multiply filter blur-[100px]"
            />
            <motion.div 
              variants={morphingBlob}
              initial="initial"
              animate="animate"
              className="absolute top-1/3 right-1/5 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/15 to-teal-600/15 rounded-full mix-blend-multiply filter blur-[100px]"
            />
            <motion.div 
              variants={floatWithDepth}
              initial="initial"
              animate="animate"
              className="absolute bottom-1/3 left-1/5 w-[400px] h-[400px] bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full mix-blend-multiply filter blur-[100px]"
            />
          </div>

          {/* Enhanced 3D grid pattern overlay */}
          <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
            <motion.div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '100px 100px', '0px 0px'],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Floating geometric shapes */}
          <FloatingShapes />

          {/* Optimized floating particles - reduced for performance */}
          <ParticleField />
          
          <div className="relative z-10">
            <AppContent />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const LandingPage: React.FC = () => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  const roles = React.useMemo(() => ['Full Stack Developer', 'AI/ML Enthusiast', 'Problem Solver', 'Tech Innovator'], []);
  
  React.useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Minimal gradient orbs - subtle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Hero Section - Clean Minimal Design */}
      <div className="min-h-screen flex flex-col justify-center relative z-10 px-6 lg:px-16 xl:px-24 pt-24 lg:pt-0">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Main Content */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Text Content - Left Side */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              {/* Subtle Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 justify-center lg:justify-start"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span className="text-sm text-white/50 tracking-wide uppercase font-medium">Available for work</span>
              </motion.div>
              
              {/* Main Heading */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-[1.1] tracking-tight">
                  Hi, I'm{' '}
                  <span className="text-gradient-accent">Meet Shah</span>
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl text-white/60 font-light">
                  Creative Developer
                </p>
              </motion.div>
              
              {/* Role Typing */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="h-8 flex items-center justify-center lg:justify-start"
              >
                <span className="text-lg lg:text-xl text-indigo-400 font-mono">
                  {displayedText}
                  <span className="inline-block w-[2px] h-5 bg-indigo-400 ml-1 animate-pulse" />
                </span>
              </motion.div>
              
              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base lg:text-lg text-white/50 max-w-md mx-auto lg:mx-0 leading-relaxed"
              >
                Computer Engineering student at Thakur College Of Engineering And Technology, Mumbai. 
                Building exceptional digital experiences with modern technologies.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start"
              >
                <Link 
                  to="/works" 
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  to="/resume" 
                  className="group inline-flex items-center gap-2 px-6 py-3 text-white/80 text-sm font-medium rounded-full border border-white/20 transition-all duration-300 hover:border-white/50 hover:text-white hover:bg-white/5"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </Link>
              </motion.div>
              
              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-5 pt-4 justify-center lg:justify-start"
              >
                {[
                  { href: "https://github.com/meetshah1708", icon: Github, label: "GitHub" },
                  { href: "https://linkedin.com/in/meetshah1708", icon: Linkedin, label: "LinkedIn" },
                  { href: "mailto:meetshah1785@gmail.com", icon: Mail, label: "Email" },
                ].map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </motion.div>
            </div>
            
            {/* Image - Right Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative group">
                {/* Large animated glow background */}
                <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-3xl group-hover:opacity-50 transition-all duration-700 animate-pulse" />
                
                {/* Secondary glow layer */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/30 to-purple-500/20 blur-2xl opacity-60" />
                
                {/* Outer decorative ring with gradient */}
                <div className="absolute -inset-6 rounded-full border-2 border-dashed border-white/10 group-hover:border-white/20 transition-colors duration-500" style={{ animation: 'spin 30s linear infinite' }} />
                
                {/* Middle decorative ring */}
                <div className="absolute -inset-3 rounded-full border border-white/20 group-hover:border-indigo-400/40 transition-colors duration-300" />
                
                {/* Image container - LARGER SIZE */}
                <motion.div
                  className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px] rounded-full overflow-hidden border-4 border-indigo-500/40 shadow-2xl shadow-indigo-500/40"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  {/* Dark gradient background behind image for blending light backgrounds */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950" />
                  <img
                    src={img} 
                    alt="Meet Shah - Full Stack Developer"
                    className="relative w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="eager"
                    style={{ objectPosition: '50% 20%', transform: 'scale(1.3)' }}
                  />
                  {/* Bottom fade for seamless blending */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-transparent" />
                  {/* Top subtle fade */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-transparent" />
                  {/* Side fades for circular blending */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/50 via-transparent to-[#050505]/50" />
                  {/* Color tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-transparent to-purple-600/10 mix-blend-overlay" />
                  {/* Strong vignette for edge blending */}
                  <div className="absolute inset-0 shadow-[inset_0_0_120px_60px_rgba(5,5,5,0.9)]" />
                </motion.div>
                
                {/* Floating badge - CGPI */}
                <motion.div 
                  className="absolute -bottom-2 right-4 px-5 py-2.5 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-xl rounded-full border border-white/30 shadow-xl shadow-indigo-500/30"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="text-yellow-300">★</span> CGPI 9.4
                  </span>
                </motion.div>
                
                {/* Floating badge - Code icon */}
                <motion.div 
                  className="absolute top-4 -left-4 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl shadow-purple-500/30"
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Code2 className="w-6 h-6 text-white" />
                </motion.div>
                
                {/* Floating badge - React */}
                <motion.div 
                  className="absolute top-1/4 -right-6 px-4 py-2 bg-black/80 backdrop-blur-xl rounded-full border border-cyan-400/40 shadow-lg shadow-cyan-500/20"
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-xs font-semibold text-cyan-400">React.js</span>
                </motion.div>
                
                {/* Floating badge - Python/AI */}
                <motion.div 
                  className="absolute bottom-1/4 -left-8 px-4 py-2 bg-black/80 backdrop-blur-xl rounded-full border border-emerald-400/40 shadow-lg shadow-emerald-500/20"
                  initial={{ opacity: 0, scale: 0.8, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <span className="text-xs font-semibold text-emerald-400">AI/ML</span>
                </motion.div>
                
                {/* Orbiting dot decorations */}
                <div className="absolute -inset-10 pointer-events-none">
                  <motion.div 
                    className="absolute top-0 left-1/2 w-2 h-2 bg-indigo-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "0 240px" }}
                  />
                  <motion.div 
                    className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-purple-400 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "-200px 0" }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="text-xs text-white/30 uppercase tracking-widest font-medium">Scroll</span>
            <motion.div 
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div 
                className="w-1 h-1.5 bg-white/50 rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div 
        className="py-24 lg:py-32 relative border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
            <AnimatedCounter value={17} suffix="+" label="Projects" icon={<Briefcase className="w-6 h-6" />} />
            <AnimatedCounter value={300} suffix="+" label="DSA Problems" icon={<Code2 className="w-6 h-6" />} />
            <AnimatedCounter value={9.4} suffix="" label="CGPI Score" icon={<GraduationCap className="w-6 h-6" />} />
            <AnimatedCounter value={50} suffix="+" label="GCP Badges" icon={<Award className="w-6 h-6" />} />
          </div>
        </div>
      </motion.div>

      {/* Connect Section */}
      <motion.div 
        className="py-24 lg:py-32 border-t border-white/5"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's build something{' '}
            <span className="text-gradient-accent">amazing</span>
          </motion.h2>
          <p className="text-base lg:text-lg text-white/40 mb-10 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:meetshah1785@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full transition-all duration-300 hover:bg-indigo-500 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              <Mail className="w-5 h-5" />
              <span>Get in touch</span>
            </a>
            <a 
              href="https://linkedin.com/in/meetshah1708"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-white/80 font-medium rounded-full border border-white/20 transition-all duration-300 hover:border-white/50 hover:text-white hover:bg-white/5"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://github.com/meetshah1708"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-white/80 font-medium rounded-full border border-white/20 transition-all duration-300 hover:border-white/50 hover:text-white hover:bg-white/5"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WorksPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = React.useState<string>('All');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const debouncedFilter = useDebounce(selectedFilter, 50);
  
  const projects = React.useMemo(() => [
    {
      title: "YouTube Clone",
      description: "A modern YouTube clone built with React, featuring real-time video streaming, dynamic content fetching via RapidAPI, and responsive design.",
      link: "https://youtube-meet.vercel.app/",
      github: "https://github.com/meetshah1708/youtube",
      tech: ['React', 'JavaScript', 'CSS'],
      featured: true,
      category: 'Web App'
    },
    {
      title: "Email Reply Generator",
      description: "Full-stack productivity tool with Spring Boot backend and React frontend, featuring Chrome extension and AI-powered email suggestions using LLMs.",
      github: "https://github.com/meetshah1708/email-reply-generator",
      tech: ['Spring Boot', 'React', 'JavaScript', 'Chrome Extension'],
      featured: true,
      category: 'Full Stack'
    },
    {
      title: "AI Resume Screener",
      description: "Advanced AI-powered resume screening application built with TypeScript, featuring automated candidate evaluation and scoring.",
      github: "https://github.com/meetshah1708/ai-resume-screener",
      tech: ['TypeScript', 'React', 'AI/ML'],
      featured: true,
      category: 'AI/ML'
    },
    {
      title: "AuthenticityNet",
      description: "AI-powered image authenticity verification system using multiple deep learning models (CNN, EfficientNet, VGG16) with React frontend and FastAPI backend.",
      github: "https://github.com/meetshah1708/authenticity-core",
      tech: ['TypeScript', 'React', 'Python', 'AI/ML', 'FastAPI'],
      featured: true,
      category: 'AI/ML'
    },
    {
      title: "Job-Matched CV Generator",
      description: "Intelligent CV optimization tool that matches resumes to job descriptions using AI, built with React and modern frontend technologies.",
      github: "https://github.com/meetshah1708/job-matched-cv",
      link: "https://lovable.dev/projects/4883ae47-3f0e-41bb-9ce1-86a70668056e",
      tech: ['TypeScript', 'React', 'AI/ML', 'Tailwind CSS'],
      featured: true,
      category: 'AI/ML'
    },
    {
      title: "Email Reply Generator",
      description: "Intelligent email response generator with Java backend and React frontend, featuring NLP for contextual email analysis and smart reply suggestions.",
      github: "https://github.com/meetshah1708/email-reply-generator",
      tech: ['Java', 'Spring Boot', 'JavaScript', 'React', 'NLP'],
      featured: true,
      category: 'AI/ML'
    },
    {
      title: "Blogs App",
      description: "Modern blog platform with TypeScript, featuring content management, user authentication, and responsive design.",
      github: "https://github.com/meetshah1708/blogsapp",
      tech: ['TypeScript', 'React', 'CSS'],
      category: 'Web App'
    },
    {
      title: "Smart Wardrobe",
      description: "Intelligent wardrobe management system built with JavaScript, helping users organize and coordinate their clothing.",
      github: "https://github.com/meetshah1708/smart-wardrobe",
      tech: ['JavaScript', 'HTML', 'CSS'],
      category: 'Web App'
    },
    {
      title: "Netflix Clone",
      description: "Netflix-inspired streaming platform clone with user authentication, movie browsing, and responsive design.",
      github: "https://github.com/meetshah1708/netflix-clone",
      tech: ['JavaScript', 'React', 'CSS'],
      category: 'Web App'
    },
    {
      title: "Cultural Fest Website",
      description: "Event management website for cultural festivals, featuring event listings, registrations, and interactive design.",
      github: "https://github.com/meetshah1708/culturalFest",
      tech: ['HTML', 'CSS', 'JavaScript'],
      category: 'Website'
    },
    {
      title: "MERN Stack Template",
      description: "Comprehensive full-stack template demonstrating CRUD operations, authentication, and modern development practices.",
      github: "https://github.com/meetshah1708/mern",
      tech: ['MongoDB', 'Express', 'React', 'Node.js'],
      category: 'Full Stack'
    },
    {
      title: "PromptDunia",
      description: "AI prompt sharing platform for exploring and discovering creative prompts, with community features and rating system.",
      github: "https://github.com/meetshah1708/Promptdunia",
      tech: ['CSS', 'JavaScript', 'HTML'],
      category: 'Web App'
    },
    {
      title: "QuizApp",
      description: "Interactive quiz application with multiple categories, scoring system, and modern animations for engaging user experience.",
      github: "https://github.com/meetshah1708/Quizapp",
      tech: ['JavaScript', 'React', 'CSS'],
      category: 'Web App'
    },
    {
      title: "Food App",
      description: "Restaurant and food delivery application with menu browsing, ordering system, and responsive mobile-first design.",
      github: "https://github.com/meetshah1708/food-app",
      tech: ['JavaScript', 'React', 'CSS'],
      category: 'Web App'
    },
    {
      title: "Fitness Tracker",
      description: "Personal fitness tracking application with workout logging, progress monitoring, and health analytics.",
      github: "https://github.com/meetshah1708/fitness",
      tech: ['JavaScript', 'HTML', 'CSS'],
      category: 'Web App'
    },
    {
      title: "Meet Grocery",
      description: "E-commerce grocery platform with product catalog, shopping cart functionality, and order management system.",
      github: "https://github.com/meetshah1708/Proj2-MEET-GROCERY",
      tech: ['HTML', 'CSS', 'JavaScript'],
      category: 'E-commerce'
    },
    {
      title: "Calculator App",
      description: "Advanced calculator application with scientific functions, memory operations, and responsive design.",
      github: "https://github.com/meetshah1708/calculator",
      tech: ['JavaScript', 'HTML', 'CSS'],
      category: 'Utility'
    }
  ], []);

  // Get unique technologies for filter with better memoization
  const filterOptions = React.useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.tech.forEach(tech => techSet.add(tech));
    });
    return ['All', ...Array.from(techSet).sort()];
  }, [projects]);

  // Filter projects based on debounced filter value with optimized logic
  const filteredProjects = React.useMemo(() => {
    if (debouncedFilter === 'All') return projects;
    return projects.filter(project => project.tech.includes(debouncedFilter));
  }, [projects, debouncedFilter]);

  // Handle filter change with immediate visual feedback
  const handleFilterChange = React.useCallback((tech: string) => {
    setIsLoading(true);
    setSelectedFilter(tech);
    // Reset loading state after a short delay to show immediate feedback
    setTimeout(() => setIsLoading(false), 200);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="pt-28 pb-16 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6"
          >
            <Code2 className="w-4 h-4" />
            <span>Explore My Work</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-heading">
            Featured <span className="text-gradient-animate">Projects</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 font-body">
            A curated collection of projects showcasing my skills in full-stack development, AI/ML, and innovative solutions.
          </p>
          
          {/* Technology Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-8 max-w-4xl mx-auto"
          >
            {filterOptions.map((tech, index) => (
              <motion.button
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterChange(tech)}
                className={`relative px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 font-body overflow-hidden ${
                  selectedFilter === tech
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  {selectedFilter === tech && isLoading && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 border border-white/30 border-t-white rounded-full"
                    />
                  )}
                  <span>{tech}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
          
          {/* Project count with loading state */}
          <motion.div 
            key={`${selectedFilter}-${isLoading}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-white/50 font-body text-sm flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border border-white/30 border-t-white/60 rounded-full"
                />
                <span>Filtering...</span>
              </>
            ) : (
              <span className="bg-white/5 px-3 py-1 rounded-full">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
              </span>
            )}
          </motion.div>
        </motion.div>
        
        <motion.div 
          key={debouncedFilter}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut",
                  layout: { duration: 0.2 }
                }}
                layout
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/60 text-xl font-body">No projects found with the selected technology.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const ResumePage: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="pt-28 pb-16 min-h-screen"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-medium mb-6"
          >
            <FileText className="w-4 h-4" />
            <span>Professional Background</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-heading">
            My <span className="text-gradient-animate">Resume</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8 font-body">
            Computer Engineering Student • Full Stack Developer • Problem Solver
          </p>
          <div className="flex justify-center">
            <motion.a 
              href="/resume.pdf" 
              download
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 cta-shine"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>

        <div className="space-y-8">
          {/* Education Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Sparkles className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading">Education</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">Bachelor of Engineering, Computer Engineering</h3>
                <p className="text-blue-400 font-semibold">Thakur College of Engineering and Technology, University of Mumbai</p>
                <p className="text-white/60">CGPI: 9.4/10.0</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">Higher Secondary Certificate (H.S.C.)</h3>
                <p className="text-purple-400 font-semibold">Maharashtra State Board</p>
                <p className="text-white/60">Score: 82% | JEE Mains & CET Percentile: 96%ile</p>
              </div>
              <div className="border-l-4 border-emerald-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">Secondary School Certificate (S.S.C.)</h3>
                <p className="text-emerald-400 font-semibold">Maharashtra State Board</p>
                <p className="text-white/60">Score: 94.8%</p>
              </div>
            </div>
          </motion.section>

          {/* Work Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading">Work Experience</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">Business Analyst Intern</h3>
                <p className="text-indigo-400 font-semibold mb-2">Neoprism Consultancy And Services</p>
                <ul className="text-white/60 space-y-2 font-body">
                  <li>• Authored 20+ white papers for SMEs, driving data-informed digital marketing strategies</li>
                  <li>• Collaborated with cross-functional teams to analyze KPIs and recommend growth solutions</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">AI Prompt Engineering Intern</h3>
                <p className="text-purple-400 font-semibold mb-2">VaultOfCodes (Remote)</p>
                <ul className="text-white/60 space-y-2 font-body">
                  <li>• Designed and fine-tuned prompts for LLMs to improve NLP model accuracy in text generation tasks</li>
                  <li>• Explored generative AI tools for behavior modeling and iterative prompt optimization</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* University Projects Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-3xl p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Code2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading">University Projects</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-emerald-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">YouTube Clone – React Webapp</h3>
                <ul className="text-white/60 space-y-2 font-body mt-2">
                  <li>• Designed and implemented a responsive video streaming platform using React.js and RapidAPI</li>
                  <li>• Enabled real-time content fetching and dynamic video playback functionality</li>
                  <li>• Deployed on Vercel with production-ready configuration, ensuring high performance and intuitive UI/UX</li>
                </ul>
              </div>
              <div className="border-l-4 border-amber-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">Email Reply Generator – Spring Boot, React, Chrome Extension</h3>
                <ul className="text-white/60 space-y-2 font-body mt-2">
                  <li>• Developed a full-stack productivity tool integrating Spring Boot and React to automate professional email replies using LLMs</li>
                  <li>• Engineered a custom Chrome extension to embed AI-powered suggestions directly into the user's email interface</li>
                  <li>• Reduced average response time by over 40%</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Technical Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card rounded-3xl p-8 lg:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading">Technical Skills</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <SkillCategory title="Languages" skills={['Java', 'C++', 'JavaScript', 'Python']} />
              <SkillCategory title="Frontend" skills={['React.js', 'Next.js', 'HTML', 'CSS']} />
              <SkillCategory title="Backend" skills={['Node.js', 'Express.js', 'Spring Boot']} />
              <SkillCategory title="Database" skills={['MySQL', 'MongoDB', 'Firebase']} />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
              <SkillCategory title="Tools" skills={['Git', 'VS Code', 'Postman']} />
              <SkillCategory title="Cloud" skills={['Google Cloud Platform', 'Firebase', 'Vercel']} />
              <SkillCategory title="Concepts" skills={['REST APIs', 'MERN Stack', 'AI/ML']} />
            </div>
          </motion.section>

          {/* Virtual Experience Programs Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 font-heading">Virtual Experience Programs</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-lg font-bold text-white font-heading">JP Morgan – Advanced Software Engineering | Forage</h3>
                <p className="text-white/70 font-body">Created a live stock dashboard using Python and JPM's Perspective library</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-lg font-bold text-white font-heading">Goldman Sachs – Software Engineering | Forage</h3>
                <p className="text-white/70 font-body">Optimized Python code and implemented unit tests to improve performance</p>
              </div>
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-lg font-bold text-white font-heading">Deloitte Australia – Data Analytics | Forage</h3>
                <p className="text-white/70 font-body">Built Tableau dashboards and analyzed data to support decisions</p>
              </div>
            </div>
          </motion.section>

          {/* Activities & Achievements Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 font-heading">Activities & Achievements</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-lg font-bold text-white font-heading">SMART INDIA HACKATHON – Team Lead</h3>
                <p className="text-white/70 font-body">Led end-to-end project planning and coordination during national-level hackathon events (2023–2024)</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-bold text-white font-heading">NSS VOLUNTEER</h3>
                <p className="text-white/70 font-body">Organized and executed social initiatives benefiting 50+ individuals through community outreach</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-bold text-white font-heading">TSDW SPORTS TEAM</h3>
                <p className="text-white/70 font-body">Coordinated 10+ inter-college sports and tech events with 200+ participants across campuses</p>
              </div>
            </div>
          </motion.section>

          {/* Certifications & Training Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 font-heading">Certifications & Training</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-white font-semibold">Google Cybersecurity Certificate (Coursera)</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-white font-semibold">Google Arcade Facilitator (50+ GCP Skill Badges)</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-white font-semibold">TCS CodeVita 2024 (Round 2 Qualifier)</h3>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <h3 className="text-white font-semibold">300+ DSA Problems Solved</h3>
                <p className="text-white/60 text-sm">LeetCode, GeeksforGeeks, CodeChef</p>
              </div>
            </div>
          </motion.section>

          {/* Coding Profiles Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 font-heading">Coding Profiles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <ProfileCard 
                platform="LeetCode"
                username="meetshah1785"
                link="https://leetcode.com/u/meetshah1785/"
              />
              <ProfileCard 
                platform="GeeksForGeeks"
                username="meetshaz26w"
                link="https://www.geeksforgeeks.org/user/meetshaz26w/"
              />
              <ProfileCard 
                platform="CodeChef"
                username="meetshah1785"
                link="https://www.codechef.com/users/meetshah1785"
              />
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="pt-28 pb-16 min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-heading">
            About <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-body">
            Computer Engineering Student | CGPI: 9.4/10.0 | Mumbai
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-white/80 font-body">
                I'm Meet Shah, a Computer Engineering student at Thakur College of Engineering and Technology, University of Mumbai, 
                with a stellar CGPI of 9.4/10.0. Based in Mumbai, I'm passionate about creating innovative digital solutions and 
                solving complex problems through technology.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                With expertise in the MERN Stack and proficiency in languages like Java, C++, JavaScript, and Python, I've successfully 
                developed multiple projects including a YouTube clone using React.js and RapidAPI, and an Email Reply Generator with 
                Spring Boot and Chrome extension integration.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                My professional experience includes working as a Business Analyst Intern at Neoprism Consultancy, where I authored 20+ 
                white papers for SMEs and collaborated on data-driven marketing strategies. As an AI Prompt Engineering Intern at 
                VaultOfCodes, I designed and fine-tuned prompts for LLMs to improve NLP model accuracy.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-heading">Leadership & Activities</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-white/80 font-body">
                Beyond academics, I actively participate in leadership roles and community service. As a Team Lead for Smart India 
                Hackathon (2023-24), I coordinated end-to-end project planning during national-level events. My involvement as an 
                NSS Volunteer has enabled me to organize social initiatives benefiting 50+ individuals through community outreach.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                I also contribute to the TSDW Sports Team, where I've coordinated 10+ inter-college sports and tech events with 
                200+ participants across campuses, demonstrating my ability to manage large-scale events and work with diverse teams.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-heading">Achievements & Certifications</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-white/80 font-body">
                My commitment to continuous learning is reflected in my achievements: Google Cybersecurity Certificate (Coursera), 
                Google Arcade Facilitator with 50+ GCP Skill Badges, and qualifying for TCS CodeVita 2024 Round 2. I've demonstrated 
                my problem-solving abilities through solving 300+ DSA problems across platforms like LeetCode, GeeksforGeeks, and CodeChef.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                I've also participated in prestigious competitions like Flipkart Grid 6.0 and gained valuable industry exposure through 
                virtual experience programs with JP Morgan (Advanced Software Engineering), Goldman Sachs (Software Engineering), and 
                Deloitte Australia (Data Analytics).
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-heading">Looking Forward</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-white/80 font-body">
                I'm constantly building personal projects while maintaining a balance with interests in table tennis and community 
                volunteering. Currently seeking opportunities to leverage my technical skills and creative approach to contribute 
                to innovative projects and make a meaningful impact in the technology industry.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                My experience with modern development tools (Docker, Git, RESTful APIs), cloud platforms (Google Cloud Platform, Firebase), 
                and frameworks (React, Next.js, Express.js) positions me well for tackling complex technological challenges and building 
                scalable solutions.
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-heading">Let's Connect</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-white/80">meetshah1785@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white/80">📱 8591744570</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white/80">📍 Mumbai, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
  github: string;
  tech: string[];
  featured?: boolean;
  category?: string;
}

const ProjectCard = React.memo(({ title, description, link, github, tech, featured, category }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0.5, y: 0.5 });
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };
  
  return (
    <motion.div
      ref={cardRef}
      variants={cardHover3D}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl transition-all duration-500 overflow-hidden ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1200px',
        transform: isHovered 
          ? `perspective(1200px) rotateX(${(mousePosition.y - 0.5) * -10}deg) rotateY(${(mousePosition.x - 0.5) * 10}deg)` 
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
      }}
    >
      {/* Card background with glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-indigo-500/30 transition-colors duration-500" />
      
      {/* Spotlight effect following mouse */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Animated border gradient on hover */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
        }}
      />
      
      {/* Top reflection */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Featured badge with enhanced styling */}
      {featured && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
          className="absolute -top-0.5 -right-0.5 z-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 blur-lg opacity-60" />
            <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-3xl shadow-xl border-l border-b border-white/20">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Category badge */}
      {category && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.3, type: "spring" }}
          className="absolute top-4 left-4 z-15"
        >
          <div className="pro-badge">
            {category === 'AI/ML' && <Sparkles className="w-3 h-3" />}
            {category === 'Full Stack' && <Code2 className="w-3 h-3" />}
            {category === 'Web App' && <Rocket className="w-3 h-3" />}
            <span>{category}</span>
          </div>
        </motion.div>
      )}
      
      {/* Content container */}
      <div className={`relative z-10 p-6 ${category || featured ? 'mt-10' : 'mt-3'}`}>
        <motion.h3 
          className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300 font-heading mb-3"
          animate={isHovered ? { x: 6 } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-white/60 font-body line-clamp-3 group-hover:text-white/80 transition-colors duration-300 mb-4"
        >
          {description}
        </motion.p>
        
        {/* Tech stack with icons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((t, index) => (
            <motion.div 
              key={t} 
              className="flex items-center space-x-1.5 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 group-hover:border-indigo-500/20 group-hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              {skillIcons[t] && (
                <motion.img 
                  src={skillIcons[t]} 
                  alt={t} 
                  className="w-4 h-4" 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <span className="text-xs text-white/70 font-medium">{t}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Action buttons */}
        <motion.div
          className="flex items-center gap-4 pt-4 border-t border-white/5"
          animate={isHovered ? { y: -2 } : { y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {link && (
            <motion.a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group/link inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center space-x-1.5 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 group-hover/link:bg-indigo-500/20 transition-colors">
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </span>
            </motion.a>
          )}
          <motion.a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group/github inline-flex items-center space-x-2 text-white/60 hover:text-white transition-colors font-medium text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center space-x-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 group-hover/github:bg-white/10 transition-colors">
              <Github className="w-4 h-4" />
              <span>View Code</span>
            </span>
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
});

function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <motion.div
      variants={fadeInUp}
      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
    >
      <h3 className="text-lg font-bold text-white mb-4 font-heading">{title}</h3>
      <div className="space-y-3">
        {skills.map(skill => (
          <div key={skill} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-xl hover:bg-white/10 transition-colors">
            {skillIcons[skill] && (
              <img 
                src={skillIcons[skill]} 
                alt={skill} 
                className="w-6 h-6"
              />
            )}
            <span className="text-white/80 font-body">{skill}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ProfileCard({ platform, username, link }: ProfileCardProps) {
  const iconSrc = profileIcons[platform] || "";
  return (
    <motion.a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeInUp}
      className="group block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center"
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt={`${platform} icon`}
          className="mx-auto w-12 h-12 mb-4 group-hover:scale-110 transition-transform"
        />
      )}
      <h3 className="text-lg font-bold text-white mb-2 font-heading">{platform}</h3>
      <p className="text-white/70 font-body">@{username}</p>
    </motion.a>
  );
}

export default App;
