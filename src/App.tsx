import React from 'react';
import { Github, Linkedin, Mail, FileText, Briefcase, ExternalLink, Download, Menu, X, ArrowRight, Sparkles, Code2, Zap, Rocket, Award, GraduationCap, Send, CheckCircle, AlertCircle, Loader2, Activity, BarChart3, Flame, TrendingUp, Home } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { ThemeProvider} from './context/ThemeContext';
import { motion, AnimatePresence, useScroll, useMotionValue, useSpring } from 'framer-motion';
import { pageTransition, fadeInUp, staggerContainer, cardHover3D } from './utils/animations';
import { useDebounce } from './utils/useDebounce';
import { useLocalStorage } from './utils/useLocalStorage';
import { EMAILJS_CONFIG, RATE_LIMIT_MS } from './utils/emailConfig';
import { generatePDFResume, generateDOCXResume, generateResumeData } from './utils/resumeGenerator';
import { PortfolioBackgroundScene } from './components/scene/PortfolioBackgroundScene';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import emailjs from '@emailjs/browser';

const CarJourneyLanding = React.lazy(async () => {
  const mod = await import('./components/scene/CyberpunkJourney');
  return { default: mod.CarJourneyLanding };
});

// Contact Form Schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be less than 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Initialize data globally for the App component
const DATA = generateResumeData();

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
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(99, 102, 241, 0.08) 25%, rgba(14, 165, 233, 0.04) 50%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, transparent 70%)',
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 z-[100] origin-left"
        style={{ scaleX }}
      />
      {/* Glow effect */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 z-[99] origin-left blur-sm opacity-60"
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
      'rgba(56, 189, 248, 0.5)',
      'rgba(99, 102, 241, 0.4)',
      'rgba(14, 165, 233, 0.35)',
      'rgba(59, 130, 246, 0.4)',
    ];
    const glowColors = [
      'rgba(56, 189, 248, 0.3)',
      'rgba(99, 102, 241, 0.25)',
      'rgba(14, 165, 233, 0.25)',
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

  // Hide on mobile to prevent flickering
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
      {/* Hexagon */}
      <motion.div
        className="absolute top-20 right-[15%] w-20 h-20 border border-sky-400/30 will-change-transform"
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
        className="absolute bottom-32 left-[20%] w-16 h-16 border border-blue-500/30 will-change-transform"
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
        className="absolute top-1/3 left-[10%] w-12 h-12 border border-indigo-500/30 will-change-transform"
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
        className="absolute bottom-1/4 right-[25%] w-24 h-24 border border-sky-400/20 rounded-full will-change-transform"
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

const codolioProfileUrl = 'https://codolio.com/profile/meetshah1708';

const dashboardHighlights = [
  {
    title: 'Cross-platform tracking',
    description: 'Coding activity tracking across platforms with a single analytics view for interview-ready signal.',
    icon: Activity,
  },
  {
    title: 'Language analytics',
    description: 'Language usage analytics that make tech breadth and implementation habits visible at a glance.',
    icon: BarChart3,
  },
  {
    title: 'Problem solving momentum',
    description: 'Problem solving statistics, streaks, and contribution trends that show consistency over time.',
    icon: Flame,
  },
  {
    title: 'Growth insights',
    description: 'Developer growth insights that turn raw coding output into a clearer professional narrative.',
    icon: TrendingUp,
  },
];

const dashboardTags = [
  'Data Analytics',
  'Competitive Programming',
  'Coding Metrics',
  'Developer Portfolio',
];

type BuildFrameworkCard = {
  title: string;
  description: string;
  cta: string;
  to: '/works' | '/resume' | '/contact';
  icon: React.ComponentType<{ className?: string }>;
};

const buildFrameworkCards: BuildFrameworkCard[] = [
  {
    title: 'Explore Work',
    description: 'See shipped products, architecture choices, and measurable outcomes.',
    cta: 'Open Works',
    to: '/works',
    icon: Briefcase,
  },
  {
    title: 'Review Resume',
    description: 'Scan technical depth, achievements, and timeline in one focused view.',
    cta: 'Open Resume',
    to: '/resume',
    icon: FileText,
  },
  {
    title: 'Start a Conversation',
    description: 'Discuss roles, collaborations, or product ideas directly and quickly.',
    cta: 'Open Contact',
    to: '/contact',
    icon: Mail,
  },
];

const profileIcons: Record<string, string> = {
  LeetCode: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
  GeeksForGeeks: "https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg",
  CodeChef:" data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAwEEBQYHAgj/xAA+EAABAwIEAwMKBAUDBQAAAAABAAIDBBEFBhIhMUFRE2FxByIjQlKBkaGxwRQyYtFTcoLh8BYk0hUzNEOy/8QAGgEBAQEBAQEBAAAAAAAAAAAAAAIBAwQGBf/EACcRAQEAAgEEAgIABwAAAAAAAAABAhEDBCExQRITBVEUIjNhgZGh/9oADAMBAAIRAxEAPwDuKIiAiIgIiICIiAioSBzUTpm+rv8ARBMqEqxkqHunbDGbPfuf0jqvZiIaSXknncLdC61DqFUHvVjZeXkNFybLBkUWP1vafNd81UVMg42I7wgv0Vmyubez2Ed4U8U0cn5HgoJUREBERAREQEREBERAREQERRVEnZMuLaiQG36oEkrWcdz0VsKiaSZzI2tsACXE2tf3KVzAGm+56nmoHHsz2o2ts4dy0Sua+3nG6oApXbhebWBTyxaYeO0qaic+1ob4BXzvylWWEC9IXni55JV6lERHfZWc7tVVHCODfPd9gr+yxlCe3rKmU+77fRbILxw3OyjcFMR1Xhw2WCzqn9lGTzOzQqAGO1iQW9F5f6asDBu2Pc+KletYuKevIOmbhyd+6yLXBzQWkEHmFgXWU1FV9g4Mkv2Z+RWabtmUVAQRccFVY0REQEREBERAREQFZYiztmCK9jxB71eq1qh5zUFlhtU97jTz7vaPNKuy3UwtI4iyx847HEYJRtrNj4rJC/A8VTIjoZTJSgH8zDoPuU7hsVY0LtNZVxfq1N7v82V+ns9LHBz/ALQt5hxur5Y7CTplqY+j/wB1kbJSIp3aIHu6NKscFb6GVx4l9vl/dXeIG1HL/KoMHFqIHq4n7fZPTL5XRChmcI4nv6NupyFaVw1sZEPXeAfAblZGoaOO0Ot35n7r28KdwHLhyUL1tED7C91adoXyGw2CkrH2GgcTuV4ib6O55rfTPbKYRVF3oJDuBdp6hZRau1zo5mvZ+YEELZwprYqiIsaIiICIiAiIgKGpbdl+YUyo4XBCDDYmL04eOLHAhZBp1AOHMK3q49UErOdiq0L9dJCerix8RsqYgYdOMvHtM+wWS4LHSi2MQu6st9VkLoRjqT0eLTs5OBKyZ4LGT+jxmF/J4sfgQsldKRa4l/4UvgqYYLUMXff6r1iAvRSgeylANNFD3tunpl8pSrd3nVTb+qz6q4cVbNN5pT4D5LGqnYWUT+BKlcrWrfohd1Oy0rHykyzEjmbe5XDhYADkoaVt3X5DgpnlbkmFJGZqyNg4XufALZFjsIp9DDM8Wc/gOgWRU1UERFjRERAREQEREBERAK8lw5rE5ozBR5cwx1bW63XcGRxsHnSPPAD9+S5NW5kzNnSvFDQB0TJOFPA7S1o6vf8AU/JZctKxx26HmjPuF4G10ULhWVvAQRO2af1O5fVMg5pq8z0tTJV0DacQvaGSxklkl73AvzH3WIwLyV0FMGSYxUOq5bXMUfmRX+p+/Rb/AE1NDSwMhpomRRMFmsYLAJN7bl8Z2iXktaxzK0lZiQxXB8UkwrESzs5ZWRCRszeQc24uRyN1s3JYzMWKtwTBKzEns1injLgzhqdwA95ISom99mDhyNTzvEuYsSrcYl9mZ5ZCPCNvLuJIWRwjLNNguKPqMKlfTUcsemShaPR6+T2+zttYLlzsy53q6OXG4pZW0MTvPfGxojb1GniQOu/iuo5Lxx2YMAgrpWBs1yyUAWGocbLJYvKX2zyoTZVUNZO2mpZZ330xsLzbuF1SEmpVBXEajNOccXjqsXoH1EeHwElxpwNEY47342HFdB8m+Y6nMODSurtJqqaXs3vaLahYEH5qZlKu42TbbVoufc44tlquhio8MjkpXs1Gom1aSfZBB2t39VvQUc8EVRGY542SMPFrxcFamVo+BeVDCa4MjxSJ+Hznm464j/UOHvAW709TDVQtmppGSxOF2vY4EH3rVMa8neXsRa8x0xopiNpKc2APe3gVzTDMUxbJmYJqCjmFU2ObQ6CM6o5vADg778VO7F/GZeHfEXiF7nxRvc0sc5oJaeW3Be1bmIiICIiAiIgIiINaztlWPNFHBG+qfTyU7i6NwF2knqOfBcxqcCzVkmqdWUuswgedPTDWwt/W3iB/l13NUU3GVWOVnZzXL/lVpZwyPG6cwuO3bwguae8jj8Lrf8PxKixKnE+HVMVTEdtUTg4A9D0PctczLkDCMZL5YYxRVTtzLC2wcf1N4FaplDIuPYVmeKqlkjgpoH3fJHIfTMts2w5dx4JLZ5VZje8dZ5LHY/hrcYwWtw57tP4iJzA7jpPI+42KyI4JYKnPxXz9JVZkwuinyw+GdkUjjqhbAXOfc76DbdpXXfJ9hNRg2WKamrG6KhxMsjPZLuXwstkICpYAbKZNVeWe5pVR1UbZoHxSfkkaWu8CqQytnjEkbgWn5EGxHxBQ1EYqG05eO1c0uDOenr4b2VI8OI14zJlSKuy9DDIaOpc7s3sgL9bTt5hHO1rjjdb75K8CqsHwWeSuidDNVy6xE7YsaAALjkea3YAb2QABTIu57mgKzxTE6PCqZ1TiFTHTwt9Z5tc9B1PcFerUM45M/wBT19JPJXSwxU7S10Qbe997jvW1M1fLUsbzVi+c6/8A6PleGaGmJ9JLeznDq4+q3u4lbhk/JNBlyNszg2pr/Wnc38vc0cvqs3geC4fgdE2lw2nbDGLajxc89XHmVkLDokn7VcvULKqItQIiICIiAiIgIiICIiICIiDQfKNkmXHXNxLCmt/Hxt0vicbCdo4b8nDv2PDZcjraCsoJjFXUk9PJ7MjC1fTSjkiZILSMa9vRwuFGWO3THkuPZ8xMY97g2NjnOvsGi5K23LPk+xjGJmSVsMlDRcXSSiz3Do1p395C7dFTQwm8UMcZ/QwBSpMG3ltWmG0MGG0MNHRxCOCFuljR9fFc7zz5OpqiplxLL7GudIS+akuG3PMsJ29xIXUFQqrNzTnMrLt8y1lFWUMpiraWenkHqyxlp+ahY10jtEbHPceAa0kn4L6dkjZI3TIxrm9HC68RU0EJvDBFGerWAKLg6/bXHcm+T6uxOriqsapn02HsId2cmz5+7Tyb1v/AHXZ27NAtZVCqrk055ZXK9xERakREQEREBERB//Z"
};

const skillIcons: Record<string, string> = {
  // Programming Languages
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  SQL: "https://img.icons8.com/color/48/sql.png",
  Bash: "https://img.icons8.com/color/48/bash.png",
  Rust: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-plain.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  Kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg",

  // Frontend Technologies
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  Vue: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
  Angular: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Material-UI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg",
  "Framer Motion": "https://img.icons8.com/color/48/framer.png",
  SASS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg",
  HTML5: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  Redux: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
  Zustand: "https://img.icons8.com/color/48/zustand.png",
  Recoil: "https://img.icons8.com/color/48/recoil.png",

  // Backend Technologies
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  "Spring Boot": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  Django: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
  REST: "https://img.icons8.com/color/48/api.png",
  GraphQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg",
  WebSocket: "https://img.icons8.com/color/48/websocket.png",
  tRPC: "https://img.icons8.com/color/48/trpc.png",
  "RabbitMQ": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg",
  gRPC: "https://img.icons8.com/color/48/grpc.png",

  // AI & Machine Learning
  TensorFlow: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  PyTorch: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
  "Scikit-learn": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  Keras: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg",
  "OpenAI API": "https://img.icons8.com/color/48/openai.png",
  "Claude API": "https://img.icons8.com/color/48/claude-ai.png",
  LangChain: "https://img.icons8.com/color/48/langchain.png",
  "Hugging Face": "https://img.icons8.com/color/48/hugging-face.png",
  spaCy: "https://img.icons8.com/color/48/spacy.png",
  NLTK: "https://img.icons8.com/color/48/nltk.png",
  OpenCV: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
  Transformers: "https://img.icons8.com/color/48/transformers.png",
  MLflow: "https://img.icons8.com/color/48/mlflow.png",
  DVC: "https://img.icons8.com/color/48/dvc.png",
  "Weights & Biases": "https://img.icons8.com/color/48/weights-and-biases.png",
  Kubeflow: "https://img.icons8.com/color/48/kubeflow.png",

  // Cloud & DevOps
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  Azure: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  GCP: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
  Vercel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
  Netlify: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  Kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
  Terraform: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg",
  Ansible: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg",
  "GitHub Actions": "https://img.icons8.com/color/48/github-actions.png",
  Jenkins: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg",
  "GitLab CI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg",
  CircleCI: "https://img.icons8.com/color/48/circleci.png",
  Prometheus: "https://img.icons8.com/color/48/prometheus.png",
  Grafana: "https://img.icons8.com/color/48/grafana.png",
  "ELK Stack": "https://img.icons8.com/color/48/elastic.png",
  Datadog: "https://img.icons8.com/color/48/datadog.png",

  // Databases
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  Redis: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
  Cassandra: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cassandra/cassandra-original.svg",
  "DynamoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dynamodb/dynamodb-original.svg",
  "Apache Spark": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg",
  Kafka: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
  Airflow: "https://img.icons8.com/color/48/apache-airflow.png",
  Pandas: "https://img.icons8.com/color/48/pandas.png",
  Tableau: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tableau/tableau-original.svg",
  "Power BI": "https://img.icons8.com/color/48/power-bi.png",
  Looker: "https://img.icons8.com/color/48/looker.png",
  Metabase: "https://img.icons8.com/color/48/metabase.png",

  // Tools & Technologies
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  Linux: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  Postman: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  Jest: "https://img.icons8.com/color/48/jest.png",
  Cypress: "https://img.icons8.com/color/48/cypress.png",
  Selenium: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg",
  Playwright: "https://img.icons8.com/color/48/playwright.png",
  SonarQube: "https://img.icons8.com/color/48/sonarqube.png",
  Prettier: "https://img.icons8.com/color/48/prettier.png",
  Husky: "https://img.icons8.com/color/48/husky.png",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  Webpack: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webpack/webpack-original.svg",
  ESLint: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/eslint/eslint-original.svg",

  // Emerging Technologies
  Solidity: "https://img.icons8.com/color/48/solidity.png",
  "Web3.js": "https://img.icons8.com/color/48/web3.png",
  IPFS: "https://img.icons8.com/color/48/ipfs.png",
  Unity: "https://img.icons8.com/color/48/unity.png",
  "Unreal Engine": "https://img.icons8.com/color/48/unreal-engine.png",
  WebXR: "https://img.icons8.com/color/48/webxr.png",
  Three: "https://img.icons8.com/color/48/threejs.png",
  Qiskit: "https://img.icons8.com/color/48/qiskit.png",
  Cirq: "https://img.icons8.com/color/48/cirq.png",

  // Security
  OWASP: "https://img.icons8.com/color/48/owasp.png",
  JWT: "https://img.icons8.com/color/48/jwt.png",
  OAuth: "https://img.icons8.com/color/48/oauth.png",
  SSL: "https://img.icons8.com/color/48/ssl.png",

  // Legacy/Alternative names
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "Google Cloud Platform": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  "AI/ML": "https://img.icons8.com/color/48/artificial-intelligence.png",
  NLP: "https://img.icons8.com/color/48/natural-language-processing.png"
};

const AppContent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navItems = React.useMemo(
    () => [
      { to: '/', label: 'Home' },
      { to: '/works', label: 'Work' },
      { to: '/resume', label: 'Resume' },
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' },
    ],
    []
  );

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
      <nav className={`fixed z-[100] w-full top-0 flex justify-center transition-all duration-700 ease-out ${scrolled ? 'pt-4' : 'pt-6'}`}>
        <motion.div 
          className={`relative flex items-center justify-between mx-4 w-full max-w-5xl md:w-auto md:gap-8 px-4 py-3 md:px-6 md:py-2.5 rounded-2xl md:rounded-full border transition-all duration-500 ${
            scrolled 
              ? 'bg-[#030712]/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl' 
              : 'bg-transparent border-transparent md:bg-[#030712]/40 md:border-white/5 md:backdrop-blur-md'
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/" className="group flex items-center gap-2 md:mr-4 z-10" onClick={closeMobileMenu}>
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 text-white font-bold text-xs overflow-hidden">
               <span className="relative z-10">MS</span>
               <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-white font-semibold tracking-tight text-sm hidden sm:block group-hover:text-cyan-200 transition-colors">
              Meet Shah
            </span>
          </Link>

          <div className="hidden md:flex items-center relative z-10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-20">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBackground"
                        className="absolute inset-0 bg-white/10 rounded-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 z-10 ml-4">
             <a href={DATA.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
               <Github className="w-5 h-5" />
             </a>
             <a href={DATA.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
               <Linkedin className="w-5 h-5" />
             </a>
             <Link to="/contact" className="ml-2 bg-white text-black hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105">
               Let's Talk
             </Link>
          </div>

          <button
            className="md:hidden relative z-10 text-slate-300 hover:text-white transition-colors w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Slide-down within the floating bar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute top-full left-0 right-0 mt-2 p-2 bg-[#030712]/90 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl md:hidden overflow-hidden flex flex-col gap-1 z-0 origin-top"
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-white/10 border border-white/10 text-white'
                          : 'bg-transparent border border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="flex items-center gap-4 px-4 py-3 mt-2 mb-1 border-t border-white/10">
                   <a href={DATA.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                     <Github className="w-5 h-5" />
                   </a>
                   <a href={DATA.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                     <Linkedin className="w-5 h-5" />
                   </a>
                   <div className="flex-1" />
                   <Link to="/contact" onClick={closeMobileMenu} className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-bold text-center">
                     Hire Me
                   </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </nav>

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<React.Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-cyan-400 font-mono tracking-widest text-xl">INITIALIZING_SYSTEM...</div>}><CarJourneyLanding /></React.Suspense>} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/projects" element={<WorksPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

const CodingActivityDashboardSection: React.FC = () => {
  return (
    <motion.section
      className="py-24 lg:py-32 border-t border-white/5"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_1.15fr] items-stretch">
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium mb-6">
                <BarChart3 className="w-4 h-4" />
                <span>Developer Analytics</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
                Coding Activity <span className="text-gradient-accent">Dashboard</span>
              </h2>
              <p className="text-base lg:text-lg text-white/55 max-w-2xl leading-relaxed">
                A real-time coding portfolio that aggregates my programming activity across platforms. It highlights problem-solving consistency, language usage, and coding growth over time.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {dashboardHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_60px_rgba(2,6,23,0.35)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 p-3 rounded-2xl bg-sky-500/10 border border-sky-400/20 text-sky-300">
                      <highlight.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">{highlight.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{highlight.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-sky-950/60 p-6 shadow-[0_25px_80px_rgba(8,47,73,0.28)]">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {dashboardTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.2em] text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-white/70 leading-relaxed">
                My coding activity is tracked using Codolio, an analytics dashboard that aggregates my programming contributions, problem solving progress, and language usage across platforms.
              </p>

              <div className="mt-6 rounded-2xl border border-emerald-400/15 bg-emerald-500/5 p-5">
                <h3 className="text-sm uppercase tracking-[0.25em] text-emerald-300/80 mb-2">Why This Matters</h3>
                <p className="text-sm lg:text-base text-white/65 leading-relaxed">
                  Recruiters can quickly evaluate my coding consistency, problem solving ability, and language proficiency through a visual dashboard.
                </p>
              </div>

              <a
                href={codolioProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 text-sm font-semibold rounded-full transition-all duration-300 hover:bg-sky-400 hover:text-white hover:shadow-lg hover:shadow-sky-500/25"
              >
                <span>View Full Coding Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <div className="space-y-5 h-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#020617]/90 shadow-[0_24px_90px_rgba(2,6,23,0.55)] h-full min-h-[520px] sm:min-h-[640px] lg:min-h-[760px]"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 bg-white/[0.03]">
                <div>
                  <p className="text-sm font-medium text-white">Embedded Dashboard</p>
                  <p className="text-xs text-white/45">Live Codolio profile embed</p>
                </div>
                <a
                  href={codolioProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-sky-300 hover:text-sky-200 transition-colors"
                >
                  <span>Open profile</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <iframe
                src={codolioProfileUrl}
                title="Meet Shah Codolio coding activity dashboard"
                loading="lazy"
                className="w-full h-full min-h-[480px] sm:min-h-[640px] lg:min-h-[760px] bg-slate-950"
                style={{ border: '0' }}
              />
            </motion.div>

            {/* Removed fallback preview card per request */}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router basename="/portfolio">
        <div className="min-h-screen bg-[#030712] relative overflow-hidden">
          {/* Scroll Progress Bar */}
          <ScrollProgress />
          
          {/* Cursor Glow Effect */}
          <CursorGlow />
          
          {/* Dynamic WebGL background with layered overlays */}
          <div className="fixed inset-0 z-0">
            <PortfolioBackgroundScene />

            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0c1222] to-blue-950/50" />
            
            {/* Aurora Gradient Background */}
            <div className="absolute inset-0 aurora-gradient opacity-80" />
            
            {/* Hexagon grid pattern */}
            <div className="absolute inset-0 hexagon-grid opacity-30" />
            
            {/* Noise texture */}
            <div className="absolute inset-0 noise-overlay opacity-50" />
          </div>

          {/* Enhanced 3D grid pattern overlay */}
          <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 hidden md:block">
            <motion.div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)
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

          {/* Supplemental CSS-driven motion for depth layering */}
          <FloatingShapes />
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

  const roles = React.useMemo(
    () => ['Full Stack Developer', 'AI/ML Engineer', 'DevOps Practitioner', 'Problem Solver'],
    []
  );

  const featuredProjects = React.useMemo(
    () => [
      {
        title: 'AuthenticityNet',
        desc: 'Deepfake detection platform using CNN + EfficientNet + VGG16 with GradCAM explanations and analytics.',
        tech: ['React', 'Python', 'FastAPI', 'Deep Learning'],
        github: 'https://github.com/meet1785/authenticity-core',
        link: '',
      },
      {
        title: 'Smart Assistant',
        desc: 'AI productivity extension with coding analysis, mock interviews, summaries, and learning workflows.',
        tech: ['TypeScript', 'React', 'Gemini AI', 'Chrome Extension'],
        github: 'https://github.com/meet1785/smart-assistant',
        link: '',
      },
      {
        title: 'ShortClips',
        desc: 'End-to-end AI clip-generation pipeline from long videos using Whisper, Gemini and MoviePy.',
        tech: ['Python', 'FastAPI', 'Whisper', 'Gemini Pro'],
        github: 'https://github.com/meet1785/shortclips',
        link: '',
      },
      {
        title: 'YouTube Clone',
        desc: 'Responsive video platform with live API data, channel views, search and production deployment.',
        tech: ['React', 'JavaScript', 'RapidAPI', 'Vercel'],
        github: 'https://github.com/meetshah1708/youtube',
        link: 'https://youtube-meet.vercel.app/',
      },
    ],
    []
  );

  React.useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          window.setTimeout(() => setIsDeleting(true), 1900);
        }
      } else if (displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, isDeleting ? 48 : 96);

    return () => window.clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen relative overflow-hidden"
    >
      <React.Suspense
        fallback={
          <section className="relative min-h-[95svh] border-b border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(129,140,248,0.14),transparent_48%)]" />
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-10">
              <div className="rounded-3xl border border-white/12 bg-slate-950/45 p-7 backdrop-blur-xl">
                <p className="text-sm text-cyan-100/80 mb-2">Loading 3D Car Journey...</p>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-300 to-indigo-300"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </div>
            </div>
          </section>
        }
      >
        <CarJourneyLanding displayedRole={displayedText} />
      </React.Suspense>

      <motion.section
        className="py-20 lg:py-24 border-t border-white/6"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/70 mb-3">Proof of execution</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white">
              Built with consistency, depth, and <span className="text-gradient-accent">delivery focus</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <AnimatedCounter value={20} suffix="+" label="Projects Built" icon={<Briefcase className="w-6 h-6" />} />
            <AnimatedCounter value={300} suffix="+" label="DSA Problems" icon={<Code2 className="w-6 h-6" />} />
            <AnimatedCounter value={9.4} suffix="" label="CGPI Score" icon={<GraduationCap className="w-6 h-6" />} />
            <AnimatedCounter value={50} suffix="+" label="GCP Badges" icon={<Award className="w-6 h-6" />} />
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 lg:py-24 border-t border-white/6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/70 mb-3">Featured Work</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white max-w-2xl leading-tight">
                Real systems with measurable outcomes, not just demo screens.
              </h2>
            </div>
            <Link
              to="/works"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-300/30 bg-cyan-500/10 text-cyan-100 font-medium hover:bg-cyan-500/15 transition-all"
            >
              <span>View all projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredProjects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link || project.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl border border-white/12 bg-gradient-to-b from-white/[0.055] to-white/[0.02] p-6 backdrop-blur-md overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,0.18),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(99,102,241,0.15),transparent_50%)]" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-200 transition-colors">
                      {project.title}
                    </h3>
                    {project.link ? (
                      <ExternalLink className="w-4 h-4 text-cyan-200/70" />
                    ) : (
                      <Github className="w-4 h-4 text-cyan-200/70" />
                    )}
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed mb-5">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-[11px] border border-white/12 bg-white/[0.04] text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 lg:py-20 border-t border-white/6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/70 mb-3">Build Framework</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
              Three fast paths to evaluate collaboration fit
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {buildFrameworkCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-3xl border border-white/12 bg-white/[0.03] px-5 py-6 backdrop-blur-md"
              >
                <div className="w-11 h-11 rounded-2xl border border-cyan-200/25 bg-cyan-500/10 text-cyan-200 flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5">{card.description}</p>
                <Link to={card.to} className="inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-cyan-100">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <CodingActivityDashboardSection />

      <motion.section
        className="py-24 lg:py-28 border-t border-white/6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-5">
            Let us build a product users remember.
          </h2>
          <p className="text-white/50 text-base lg:text-lg mb-10 max-w-2xl mx-auto">
            Open to full-time roles, product engineering collaborations, and AI-focused project work.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:meetshah1785@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-semibold hover:bg-cyan-300 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email Me</span>
            </a>
            <a
              href="https://linkedin.com/in/meetshah1708"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white/90 font-semibold hover:bg-white/10"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/meet1785"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white/90 font-semibold hover:bg-white/10"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </motion.section>

      <footer className="border-t border-white/6 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/40">
          <p>© 2026 Meet Shah. Crafted with React, Framer Motion, and Three.js.</p>
          <div className="flex items-center gap-5">
            <a href="https://github.com/meet1785" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/meetshah1708" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">LinkedIn</a>
            <a href="mailto:meetshah1785@gmail.com" className="hover:text-white/70 transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

const WorksPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useLocalStorage<string>('works-filter', 'All');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const debouncedFilter = useDebounce(selectedFilter, 50);
  
  const projects = React.useMemo(() => [
    {
      title: "YouTube Clone — Video Platform",
      description: "A modern YouTube clone with real-time video streaming, dynamic content fetching via RapidAPI, channel pages, video search, and fully responsive design. Deployed live on Vercel.",
      link: "https://youtube-meet.vercel.app/",
      github: "https://github.com/meetshah1708/youtube",
      tech: ['React', 'JavaScript', 'CSS'],
      featured: true,
      category: 'Web App'
    },
    {
      title: "AuthenticityNet — AI Deepfake Detection",
      description: "AI-powered image authenticity verification using ensemble deep learning (CNN, EfficientNet, VGG16) with GradCAM visual explanations, intelligent caching (~99% faster), analytics dashboard, and 15+ REST API endpoints.",
      github: "https://github.com/meet1785/authenticity-core",
      tech: ['React', 'TypeScript', 'Python', 'FastAPI', 'AI/ML'],
      featured: true,
      category: 'AI/ML'
    },
    {
      title: "Smart Assistant — AI Learning Companion",
      description: "Chrome extension with LeetCode integration (problem analysis, code review, debugging), YouTube video summaries & quizzes, AI mock interview system with timer & real-time feedback, gamified XP/level system, and learning path management.",
      github: "https://github.com/meet1785/smart-assistant",
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'AI/ML', 'Webpack'],
      featured: true,
      category: 'AI/ML'
    },
    {
      title: "ShortClips — AI Video Pipeline",
      description: "End-to-end AI tool converting long videos into viral 15-60s clips using OpenAI Whisper transcription, PySceneDetect, Google Gemini Pro content analysis, and MoviePy editing with auto-captions, zoom effects, and 9:16 formatting.",
      github: "https://github.com/meet1785/shortclips",
      tech: ['Python', 'FastAPI', 'AI/ML'],
      featured: true,
      category: 'AI/ML'
    },
    {
      title: "BudgetBuddy — Enterprise ERP System",
      description: "Enterprise-grade ERP with 23+ granular permissions across 5 categories, role-based access control (Admin/Manager/User), interactive Recharts analytics dashboard, dark/light theme, and full CRUD budget & expense management.",
      github: "https://github.com/meet1785/budgetbuddy-erp",
      tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      featured: true,
      category: 'Full Stack'
    },
    {
      title: "FinanceGPT — AI Personal Finance",
      description: "Comprehensive personal finance platform powered by Google Gemini AI with real-time dashboard, AI financial chat with retry logic, smart expense tracker, budget planner, portfolio management with simulated live updates, and investment calculator.",
      github: "https://github.com/meet1785/gemini-money",
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'AI/ML'],
      featured: true,
      category: 'AI/ML'
    },
    {
      title: "VideoGen — AI Text-to-Video",
      description: "AI video generation service from text prompts with platform-specific presets (Instagram 9:16, YouTube 16:9, Shorts), async task tracking, n8n webhook integration, Docker deployment, and configurable inference parameters.",
      github: "https://github.com/meet1785/videogen",
      tech: ['Python', 'FastAPI', 'Docker'],
      featured: true,
      category: 'AI/ML'
    },
    {
      title: "YouTubeSEO — AI Analytics Tool",
      description: "AI-powered YouTube SEO analyzer with auto metadata extraction, CTR & engagement analytics, comment sentiment analysis, competitive benchmarking against top-ranking videos, and AI-driven optimization recommendations with batch CSV/JSON export.",
      github: "https://github.com/meet1785/youseo",
      tech: ['Python', 'AI/ML'],
      category: 'AI/ML'
    },
    {
      title: "DevSecOps Pipeline — LenDen",
      description: "Production DevSecOps pipeline with Dockerized Node.js app, Terraform AWS infrastructure provisioning, Jenkins CI/CD pipeline, Trivy container security scanning, and AI-driven security vulnerability remediation.",
      github: "https://github.com/meet1785/LenDen-Ass",
      tech: ['Docker', 'AWS'],
      category: 'DevOps'
    },
    {
      title: "Cultural Fest — Event Platform",
      description: "Full-stack event management platform for cultural festivals with Angular frontend, Spring Boot backend, PostgreSQL database, Jakarta Bean Validation, and comprehensive RESTful API with field-specific error handling.",
      github: "https://github.com/meet1785/cultural-fest",
      tech: ['TypeScript', 'Java', 'Spring Boot'],
      category: 'Full Stack'
    },
    {
      title: "MySaaS — SaaS Boilerplate",
      description: "Production-ready full-stack SaaS application with JWT + bcrypt authentication, Stripe payment integration, Docker + docker-compose deployment, GitHub Actions CI/CD, PostgreSQL, and structured service architecture.",
      github: "https://github.com/meet1785/mysaas",
      tech: ['React', 'TypeScript', 'Node.js', 'Docker'],
      category: 'Full Stack'
    },
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium mb-6"
          >
            <Code2 className="w-4 h-4" />
            <span>Explore My Work</span>
          </motion.div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-heading">
            All <span className="text-gradient-animate">Projects</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 font-body">
            10 curated projects across AI/ML, enterprise full-stack, and DevOps — each built to production standards.
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
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-sm font-medium mb-6"
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
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              onClick={() => {
                generatePDFResume(generateResumeData());
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 cta-shine"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              onClick={async () => {
                await generateDOCXResume(generateResumeData());
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 cta-shine"
            >
              <Download className="w-5 h-5" />
              <span>Download DOCX</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-white/50">
              ATS-friendly resume with professional formatting
            </p>
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
              <div className="p-2 rounded-lg bg-sky-500/20">
                <Sparkles className="w-6 h-6 text-sky-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading">Education</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-sky-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">Bachelor of Engineering, Computer Engineering</h3>
                <p className="text-sky-400 font-semibold">Thakur College of Engineering and Technology, University of Mumbai</p>
                <p className="text-white/60">CGPI: 9.4/10.0</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">Higher Secondary Certificate (H.S.C.)</h3>
                <p className="text-blue-400 font-semibold">Maharashtra State Board</p>
                <p className="text-white/60">Score: 82% | JEE Mains & CET Percentile: 96%ile</p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">Secondary School Certificate (S.S.C.)</h3>
                <p className="text-indigo-400 font-semibold">Maharashtra State Board</p>
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
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading">Work Experience</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-sky-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">Business Analyst Intern</h3>
                <p className="text-sky-400 font-semibold mb-2">Neoprism Consultancy And Services</p>
                <ul className="text-white/60 space-y-2 font-body">
                  <li>• Authored 20+ white papers for SMEs, driving data-informed digital marketing strategies</li>
                  <li>• Collaborated with cross-functional teams to analyze KPIs and recommend growth solutions</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">AI Prompt Engineering Intern</h3>
                <p className="text-blue-400 font-semibold mb-2">VaultOfCodes (Remote)</p>
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
              <div className="p-2 rounded-lg bg-sky-500/20">
                <Code2 className="w-6 h-6 text-sky-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading">University Projects</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-sky-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">AuthenticityNet — AI Deepfake Detection System</h3>
                <ul className="text-white/60 space-y-2 font-body mt-2">
                  <li>• Built ensemble deep learning system using CNN, EfficientNet, and VGG16 for image authenticity verification</li>
                  <li>• Implemented GradCAM heatmaps for visual explanations and intelligent caching for ~99% faster repeated predictions</li>
                  <li>• Developed React frontend with analytics dashboard and FastAPI backend with 15+ REST endpoints</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">Smart Assistant — AI Chrome Extension</h3>
                <ul className="text-white/60 space-y-2 font-body mt-2">
                  <li>• Engineered Chrome extension with LeetCode integration for problem analysis, code review, and debugging assistance</li>
                  <li>• Built AI mock interview system with timer, code editor, and real-time feedback powered by Google Gemini API</li>
                  <li>• Implemented gamified XP/level system with learning path management, YouTube video summaries, and quiz generation</li>
                </ul>
              </div>
              <div className="border-l-4 border-indigo-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-xl font-bold text-white font-heading">BudgetBuddy ERP — Enterprise Resource Planning</h3>
                <ul className="text-white/60 space-y-2 font-body mt-2">
                  <li>• Developed enterprise-grade ERP with 23+ granular permissions across 5 categories and role-based access control</li>
                  <li>• Built interactive analytics dashboard with Recharts, dark/light theme, and responsive design with React + TypeScript</li>
                  <li>• Implemented full CRUD operations with Node.js/Express backend and MongoDB with JWT authentication</li>
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
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading">Technical Skills</h2>
            </div>

            {/* Core Programming Languages */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-sky-400 mb-4 font-heading">Programming Languages</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SkillCategory title="Primary" skills={['Python', 'TypeScript', 'JavaScript', 'Java']} />
                <SkillCategory title="Scripting & Query" skills={['Bash', 'SQL']} />
                <SkillCategory title="Systems" skills={['C++']} />
              </div>
            </div>

            {/* Modern Web Development */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-400 mb-4 font-heading">Web Development</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <SkillCategory title="Frontend" skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS']} />
                <SkillCategory title="UI/UX" skills={['Framer Motion', 'CSS3', 'HTML5', 'Responsive Design']} />
                <SkillCategory title="Build Tools" skills={['Vite', 'Webpack', 'ESLint', 'npm']} />
                <SkillCategory title="Browser APIs" skills={['Chrome Extensions', 'Web APIs', 'Local Storage']} />
              </div>
            </div>

            {/* Backend & APIs */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-indigo-400 mb-4 font-heading">Backend & APIs</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SkillCategory title="Frameworks" skills={['Node.js', 'Express', 'FastAPI', 'JWT']} />
                <SkillCategory title="API Design" skills={['REST APIs', 'GraphQL', 'Postman']} />
                <SkillCategory title="Authentication" skills={['OAuth', 'JWT', 'Session Management']} />
              </div>
            </div>

            {/* AI & Machine Learning */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-purple-400 mb-4 font-heading">AI & Machine Learning</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <SkillCategory title="ML Frameworks" skills={['TensorFlow', 'Scikit-learn', 'OpenCV']} />
                <SkillCategory title="Generative AI" skills={['OpenAI API', 'Google Gemini API', 'LangChain']} />
                <SkillCategory title="Computer Vision" skills={['CNN', 'EfficientNet', 'VGG16', 'GradCAM']} />
                <SkillCategory title="NLP" skills={['Text Processing', 'API Integration']} />
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-heading">DevOps & Tools</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <SkillCategory title="Version Control" skills={['Git', 'GitHub', 'GitHub Actions']} />
                <SkillCategory title="Containerization" skills={['Docker', 'Docker Compose']} />
                <SkillCategory title="Cloud Platforms" skills={['Vercel', 'Netlify', 'Firebase']} />
                <SkillCategory title="Development" skills={['VS Code', 'Linux', 'npm', 'Postman']} />
              </div>
            </div>

            {/* Databases */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 font-heading">Databases</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SkillCategory title="NoSQL" skills={['MongoDB', 'Firebase']} />
                <SkillCategory title="SQL" skills={['PostgreSQL', 'MySQL']} />
                <SkillCategory title="Data Processing" skills={['Pandas', 'NumPy']} />
              </div>
            </div>

            {/* Cybersecurity & Quality */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-rose-400 mb-4 font-heading">Security & Quality Assurance</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SkillCategory title="Security" skills={['JWT', 'OAuth', 'SSL/TLS', 'OWASP']} />
                <SkillCategory title="Testing" skills={['Jest', 'Cypress', 'Postman', 'Playwright']} />
                <SkillCategory title="Code Quality" skills={['ESLint', 'Prettier', 'Husky']} />
              </div>
            </div>
          </motion.section>

          {/* Virtual Experience Programs Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-indigo-500/20">
                <Rocket className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading">Virtual Experience Programs</h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-red-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-lg font-bold text-white font-heading">Wells Fargo – Software Engineering Job Simulation | Forage</h3>
                <p className="text-white/70 font-body">Completed software engineering simulation focusing on enterprise development practices</p>
                <p className="text-white/50 text-sm mt-1">Aug 2025</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-lg font-bold text-white font-heading">JP Morgan – Advanced Software Engineering | Forage</h3>
                <p className="text-white/70 font-body">Created a live stock dashboard using Python and JPM's Perspective library</p>
                <p className="text-white/50 text-sm mt-1">Sep 2024</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-lg font-bold text-white font-heading">Goldman Sachs – Software Engineering | Forage</h3>
                <p className="text-white/70 font-body">Optimized Python code and implemented unit tests to improve performance</p>
                <p className="text-white/50 text-sm mt-1">Feb 2025</p>
              </div>
              <div className="border-l-4 border-green-600 pl-6 hover:bg-white/5 py-3 rounded-r-xl transition-colors">
                <h3 className="text-lg font-bold text-white font-heading">Deloitte Australia – Data Analytics | Forage</h3>
                <p className="text-white/70 font-body">Built Tableau dashboards and analyzed data to support decisions</p>
                <p className="text-white/50 text-sm mt-1">Jun 2025</p>
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
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-indigo-500/20">
                <Award className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white font-heading">Certifications & Training</h2>
            </div>
            
            {/* AI & Cloud Certifications */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-sky-400 mb-4 font-heading">AI & Cloud Technologies</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-xl p-5 hover:border-blue-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">Microsoft Azure AI Essentials Professional Certificate</h3>
                  <p className="text-white/50 text-xs mb-2">Microsoft & LinkedIn • Feb 2026</p>
                  <p className="text-white/60 text-sm">Azure AI Studio, Generative AI, NLP</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">Google Arcade Facilitator</h3>
                  <p className="text-white/50 text-xs mb-2">Google Cloud Platform • 2024</p>
                  <p className="text-white/60 text-sm">50+ GCP Skill Badges Earned</p>
                </div>
              </div>
            </div>

            {/* Backend & System Design */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-400 mb-4 font-heading">Backend & System Design</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gradient-to-br from-sky-500/10 to-blue-500/10 border border-sky-500/20 rounded-xl p-5 hover:border-sky-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">Backend System Design</h3>
                  <p className="text-white/50 text-xs mb-2">Frontend Masters • Feb 2026</p>
                  <p className="text-white/60 text-sm">Advanced system architecture patterns</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-5 hover:border-cyan-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">Introduction to Backend Architectures</h3>
                  <p className="text-white/50 text-xs mb-2">Frontend Masters • Feb 2026</p>
                  <p className="text-white/60 text-sm">Scalable backend development</p>
                </div>
              </div>
            </div>

            {/* AI Development & Prompt Engineering */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-indigo-400 mb-4 font-heading">AI Development & Automation</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-5 hover:border-indigo-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">Build an AI Agent from Scratch</h3>
                  <p className="text-white/50 text-xs mb-2">Frontend Masters • Nov 2025</p>
                  <p className="text-white/60 text-sm">AI agent architecture & implementation</p>
                </div>
                <div className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-xl p-5 hover:border-violet-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">Practical Prompt Engineering</h3>
                  <p className="text-white/50 text-xs mb-2">Frontend Masters • Nov 2025</p>
                  <p className="text-white/60 text-sm">LLM optimization & prompt design</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-5 hover:border-orange-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">Claude Code in Action</h3>
                  <p className="text-white/50 text-xs mb-2">Anthropic • Feb 2026</p>
                  <p className="text-white/60 text-sm">AI-assisted development practices</p>
                </div>
              </div>
            </div>

            {/* Business & Leadership */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4 font-heading">Business & Leadership</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-5 hover:border-emerald-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">McKinsey.org Forward Program</h3>
                  <p className="text-white/50 text-xs mb-2">McKinsey & Company • Dec 2025</p>
                  <p className="text-white/60 text-sm">Leadership, Strategic Thinking, Business Storytelling</p>
                </div>
              </div>
            </div>

            {/* Programming & Security */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-rose-400 mb-4 font-heading">Programming & Security</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-xl p-5 hover:border-red-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">Google Cybersecurity Specialization</h3>
                  <p className="text-white/50 text-xs mb-2">Coursera • Jan 2024</p>
                  <p className="text-white/60 text-sm">CompTIA Security+ aligned</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-5 hover:border-blue-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">Data Science Essentials with Python</h3>
                  <p className="text-white/50 text-xs mb-2">Cisco • Sep 2025</p>
                  <p className="text-white/60 text-sm">Data analysis & visualization</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 rounded-xl p-5 hover:border-indigo-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">C++ Essentials 1</h3>
                  <p className="text-white/50 text-xs mb-2">Cisco • Sep 2025</p>
                  <p className="text-white/60 text-sm">Core C++ programming concepts</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-4 font-heading">Competitive Achievements</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">TCS CodeVita 2024</h3>
                  <p className="text-white/50 text-xs mb-2">Tata Consultancy Services • 2024</p>
                  <p className="text-white/60 text-sm">Round 2 Qualifier</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-5 hover:border-green-500/40 transition-all">
                  <h3 className="text-white font-semibold mb-1">300+ DSA Problems Solved</h3>
                  <p className="text-white/50 text-xs mb-2">Multiple Platforms • 2023-2025</p>
                  <p className="text-white/60 text-sm">LeetCode, GeeksforGeeks, CodeChef</p>
                </div>
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
            About <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">Me</span>
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
                with a CGPI of 9.4/10.0. I specialize in building AI-powered applications and enterprise-grade full-stack systems 
                that solve real problems at scale.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                My strongest work includes <strong className="text-white">AuthenticityNet</strong> — a deepfake detection system using CNN, EfficientNet & VGG16 
                ensemble learning with GradCAM visual explanations; <strong className="text-white">Smart Assistant</strong> — a Chrome extension with LeetCode integration, 
                AI mock interviews, and gamified learning; and <strong className="text-white">ShortClips</strong> — an end-to-end AI pipeline that converts long 
                videos into viral clips using OpenAI Whisper, Gemini Pro, and MoviePy.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                I work across the full stack with React, TypeScript, Node.js, Python, FastAPI, Spring Boot, Docker, 
                and cloud platforms (AWS, GCP). I've built enterprise ERP systems with 23+ granular permissions, 
                AI-powered finance platforms, SaaS boilerplates with Stripe integration, and production DevSecOps pipelines with 
                Terraform and Jenkins.
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
                I'm actively building AI/ML systems and production-grade applications. I'm looking for 
                opportunities where I can apply my deep learning, full-stack, and DevOps skills to build 
                products that make a real impact.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                My experience spans deep learning model development (CNN, EfficientNet, VGG16), modern frontend 
                (React, TypeScript, Tailwind), robust backends (Node.js, FastAPI, Spring Boot), containerization 
                (Docker, Terraform), cloud infrastructure (AWS, GCP), and CI/CD pipelines (GitHub Actions, Jenkins).
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

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [lastSubmissionTime, setLastSubmissionTime] = React.useState<number>(0);
  const formRef = React.useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const now = Date.now();

    // Rate limiting check
    if (now - lastSubmissionTime < RATE_LIMIT_MS) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: 'meetshah1785@gmail.com',
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      setSubmitStatus('success');
      setLastSubmissionTime(now);
      reset();
    } catch (error) {
      console.error('Email send failed:', error);

      // Check if EmailJS is not configured
      if (EMAILJS_CONFIG.SERVICE_ID === 'your_service_id') {
        setSubmitStatus('error');
        // Show configuration message
        alert('Email service not configured. Please contact meetshah1785@gmail.com directly.');
        return;
      }

      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Get In <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-body">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 font-heading">Let's Connect</h2>
              <p className="text-white/70 mb-8 font-body">
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-sky-500/20">
                  <Mail className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-white/60">meetshah1785@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-blue-500/20">
                  <Github className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">GitHub</h3>
                  <a href="https://github.com/meet1785" className="text-white/60 hover:text-blue-400 transition-colors">
                    github.com/meet1785
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-indigo-500/20">
                  <Linkedin className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">LinkedIn</h3>
                  <a href="https://linkedin.com/in/meetshah1708" className="text-white/60 hover:text-indigo-400 transition-colors">
                    linkedin.com/in/meetshah1708
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-emerald-500/20">
                  <span className="w-6 h-6 text-emerald-400 flex items-center justify-center text-lg">📍</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Location</h3>
                  <p className="text-white/60">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 to-blue-500/10 border border-sky-500/20">
              <h3 className="text-white font-semibold mb-2">Response Time</h3>
              <p className="text-white/60 text-sm">
                I typically respond within 24 hours. For urgent inquiries, feel free to call or connect on LinkedIn.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Full Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email Address *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                  Subject *
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Failed to send message</span>
                  </div>
                  <p className="text-red-300 text-sm mt-1">
                    Please try again or contact me directly at meetshah1785@gmail.com
                  </p>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Message sent successfully!</span>
                  </div>
                  <p className="text-green-300 text-sm mt-1">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const NotFoundPage: React.FC = () => {
  const location = useLocation();

  const quickLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/works', label: 'Work', icon: Briefcase },
    { to: '/resume', label: 'Resume', icon: FileText },
    { to: '/about', label: 'About', icon: Award },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="pt-28 pb-16 min-h-screen flex items-center justify-center"
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Animated 404 heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <h1 className="text-8xl lg:text-9xl font-bold font-heading bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent select-none">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-heading">
            Page Not Found
          </h2>
          <p className="text-lg text-white/60 font-body mb-2">
            The page <code className="bg-white/10 px-2 py-0.5 rounded text-sky-300 text-sm font-mono">{location.pathname}</code> doesn't exist.
          </p>
          <p className="text-white/40 font-body mb-10">
            It may have been moved or the URL might be incorrect.
          </p>
        </motion.div>

        {/* Quick navigation links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10"
        >
          {quickLinks.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.08, duration: 0.3 }}
            >
              <Link
                to={item.to}
                className="group flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-sky-500/30 transition-all duration-300 text-white/70 hover:text-white"
              >
                <item.icon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
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
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-sky-500/30 transition-colors duration-500" />
      
      {/* Spotlight effect following mouse */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(56, 189, 248, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Animated border gradient on hover */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(99, 102, 241, 0.1), rgba(14, 165, 233, 0.1))',
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
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 blur-lg opacity-60" />
            <div className="relative bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-3xl shadow-xl border-l border-b border-white/20">
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
          className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300 font-heading mb-3"
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
              className="flex items-center space-x-1.5 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 group-hover:border-sky-500/20 group-hover:bg-white/10 transition-all duration-300"
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
              className="group/link inline-flex items-center space-x-2 text-sky-400 hover:text-sky-300 transition-colors font-medium text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center space-x-1.5 bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20 group-hover/link:bg-sky-500/20 transition-colors">
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
  const [imageFailed, setImageFailed] = React.useState(false);
  const iconSrc = (profileIcons[platform] || "").trim();
  return (
    <motion.a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeInUp}
      className="group block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center"
    >
      {iconSrc && !imageFailed ? (
        <img
          src={iconSrc}
          alt={`${platform} icon`}
          className="mx-auto w-12 h-12 mb-4 group-hover:scale-110 transition-transform"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-500/10 text-sm font-semibold text-sky-300">
          {platform.slice(0, 2).toUpperCase()}
        </div>
      )}
      <h3 className="text-lg font-bold text-white mb-2 font-heading">{platform}</h3>
      <p className="text-white/70 font-body">@{username}</p>
    </motion.a>
  );
}

export default App;
