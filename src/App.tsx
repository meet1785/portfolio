import React from 'react';
import { Github, Linkedin, Mail, FileText, Home, Briefcase, ExternalLink, Download, Menu, X } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider} from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition, fadeInUp, scaleIn, staggerContainer, typewriter, rotate3D, cardHover3D, float3D, morphingBlob, particleFloat} from './utils/animations';
import { useDebounce } from './utils/useDebounce';
import img from '/meet.jpeg'; 

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
  CodeChef:" data:image/jpeg;base64,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"
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Modern Glassmorphism Navigation */}
      <nav className="fixed w-full z-50 top-0">
        <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo/Brand */}
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/" className="flex items-center space-x-2 group" onClick={closeMobileMenu}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <span className="text-white font-semibold text-xl font-primary group-hover:text-blue-300 transition-colors duration-300">Meet Shah</span>
                </Link>
              </motion.div>
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-1">
                {[
                  { to: "/", label: "Home", icon: Home },
                  { to: "/works", label: "Works", icon: Briefcase },
                  { to: "/resume", label: "Resume", icon: FileText },
                  { to: "/about", label: "About", icon: null },
                ].map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link 
                      to={item.to} 
                      className="relative group px-4 py-2 rounded-xl text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 font-body"
                    >
                      <div className="flex items-center space-x-2">
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.label}</span>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Desktop Social Links */}
              <div className="hidden md:flex items-center space-x-3">
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {[
                    { href: "mailto:meetshah1785@gmail.com", icon: Mail, label: "Email" },
                    { href: "https://github.com/meetshah1708", icon: Github, label: "GitHub" },
                    { href: "https://linkedin.com/in/meetshah1708", icon: Linkedin, label: "LinkedIn" },
                  ].map((social) => (
                    <a
                      key={social.href}
                      href={social.href}
                      target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="group relative p-2 rounded-xl text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10 hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-xl text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10"
                onClick={toggleMobileMenu}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden backdrop-blur-xl bg-white/10 border-t border-white/10"
              >
                <div className="px-6 py-4 space-y-2">
                  {[
                    { to: "/", label: "Home", icon: Home },
                    { to: "/works", label: "Works", icon: Briefcase },
                    { to: "/resume", label: "Resume", icon: FileText },
                    { to: "/about", label: "About", icon: null },
                  ].map((item, index) => (
                    <motion.div
                      key={item.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link 
                        to={item.to}
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 font-body"
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Social Links */}
                  <motion.div 
                    className="flex justify-center space-x-4 pt-4 border-t border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    {[
                      { href: "mailto:meetshah1785@gmail.com", icon: Mail, label: "Email" },
                      { href: "https://github.com/meetshah1708", icon: Github, label: "GitHub" },
                      { href: "https://linkedin.com/in/meetshah1708", icon: Linkedin, label: "LinkedIn" },
                    ].map((social) => (
                      <a
                        key={social.href}
                        href={social.href}
                        target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl text-white/70 hover:text-white transition-all duration-300 hover:bg-white/10"
                        aria-label={social.label}
                        onClick={closeMobileMenu}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Enhanced 3D Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              variants={morphingBlob}
              initial="initial"
              animate="animate"
              className="absolute -top-4 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            ></motion.div>
            <motion.div 
              variants={float3D}
              initial="initial"
              animate="animate"
              className="absolute -top-4 -right-4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            ></motion.div>
            <motion.div 
              variants={rotate3D}
              initial="initial"
              animate="animate"
              className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
            ></motion.div>
            <motion.div 
              variants={morphingBlob}
              initial="initial"
              animate="animate"
              className="absolute top-1/2 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-15"
            ></motion.div>
            <motion.div 
              variants={float3D}
              initial="initial"
              animate="animate"
              className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-15"
            ></motion.div>
          </div>

          {/* Enhanced 3D grid pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <motion.div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            ></motion.div>
          </div>

          {/* Enhanced 3D floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                variants={particleFloat}
                initial="initial"
                animate="animate"
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  background: `linear-gradient(45deg, 
                    rgba(59, 130, 246, ${0.3 + Math.random() * 0.4}), 
                    rgba(147, 51, 234, ${0.3 + Math.random() * 0.4})
                  )`,
                  filter: 'blur(0.5px)',
                  boxShadow: `0 0 ${4 + Math.random() * 8}px rgba(59, 130, 246, 0.3)`,
                }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            <AppContent />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

const LandingPage: React.FC = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Enhanced 3D Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            variants={particleFloat}
            initial="initial"
            animate="animate"
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
        {/* Larger floating geometric shapes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`geo-${i}`}
            variants={float3D}
            initial="initial"
            animate="animate"
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              background: `linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(168, 85, 247, 0.3))`,
              borderRadius: Math.random() > 0.5 ? '50%' : '20%',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          />
        ))}
      </div>

      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 py-20">
          {/* Enhanced Profile Image with 3D Effects */}
          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <div className="relative w-96 h-96 lg:w-[30rem] lg:h-[30rem]" style={{ perspective: '1000px' }}>
              {/* Enhanced morphing background */}
              <motion.div 
                variants={morphingBlob}
                initial="initial"
                animate="animate"
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 blur-2xl opacity-20"
              ></motion.div>
              {/* Main image with enhanced 3D hover effects */}
              <motion.img
                src={img} 
                alt="Meet Shah"
                className="relative w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl backdrop-blur-sm"
                style={{
                  objectPosition: 'center top',
                  objectFit: 'cover',
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{ 
                  scale: 1.08,
                  rotateY: 15,
                  rotateX: 5,
                  z: 50,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.95 }}
              />
              {/* Enhanced floating 3D elements */}
              <motion.div 
                variants={float3D}
                initial="initial"
                animate="animate"
                className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-blue-500/40 to-cyan-500/40 rounded-full backdrop-blur-sm border border-white/30 shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              ></motion.div>
              <motion.div 
                variants={rotate3D}
                initial="initial"
                animate="animate"
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-lg backdrop-blur-sm border border-white/30 shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              ></motion.div>
              <motion.div 
                variants={float3D}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5 }}
                className="absolute top-1/2 -left-10 w-8 h-8 bg-gradient-to-r from-yellow-500/40 to-orange-500/40 rounded-full backdrop-blur-sm border border-white/30 shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              ></motion.div>
              {/* Additional geometric shapes */}
              <motion.div 
                variants={rotate3D}
                initial="initial"
                animate="animate"
                transition={{ delay: 1 }}
                className="absolute top-10 -right-4 w-6 h-6 bg-gradient-to-r from-emerald-500/40 to-teal-500/40 rotate-45 backdrop-blur-sm border border-white/30 shadow-lg"
                style={{ transformStyle: 'preserve-3d' }}
              ></motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-4">
              <motion.h1 
                variants={typewriter}
                className="text-5xl lg:text-7xl font-bold text-white font-heading"
              >
                Meet 
                <motion.span 
                  variants={typewriter}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                > Shah</motion.span>
              </motion.h1>
              <motion.p 
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
                className="text-xl lg:text-2xl text-white/80 font-body"
              >
                Computer Engineering Student & Full Stack Developer
              </motion.p>
              <motion.p 
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
                className="text-lg text-white/60 max-w-2xl font-body leading-relaxed"
              >
                Passionate Computer Engineering student from Mumbai with CGPI 9.4/10.0, specializing in MERN stack development,  
                AI/ML applications, and innovative digital solutions. Currently seeking opportunities to contribute to impactful projects.
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div variants={scaleIn} transition={{ delay: 0.8 }}>
                <Link 
                  to="/works" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl font-body overflow-hidden"
                >
                  <span className="flex items-center space-x-2 relative z-10">
                    <Briefcase className="w-5 h-5" />
                    <span>View My Work</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white/10 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              </motion.div>
              
              <motion.div variants={scaleIn} transition={{ delay: 1 }}>
                <Link 
                  to="/resume" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105 font-body overflow-hidden"
                >
                  <span className="flex items-center space-x-2 relative z-10">
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    <span>Resume</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced "Stay Connected" section */}
      <motion.div 
        className="py-20 bg-gradient-to-t from-black/20 to-transparent"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-3xl lg:text-4xl font-bold text-white mb-6 font-heading"
          >
            Let's Connect
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-lg text-white/70 mb-8 font-body"
          >
            Follow me on social media and let's build something amazing together.
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              { href: "https://linkedin.com/in/meetshah1708", icon: Linkedin, label: "LinkedIn", color: "from-blue-600 to-blue-700" },
              { href: "https://github.com/meetshah1708", icon: Github, label: "GitHub", color: "from-gray-600 to-gray-700" },
              { href: "mailto:meetshah1785@gmail.com", icon: Mail, label: "Email", color: "from-red-600 to-red-700" },
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`group relative p-4 bg-gradient-to-br ${social.color} rounded-2xl text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl overflow-hidden`}
                aria-label={social.label}
                variants={scaleIn}
                initial="initial"
                animate="animate"
                transition={{ delay: 1.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.15,
                  rotateY: 10,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-6 h-6 relative z-10" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </motion.a>
            ))}
          </motion.div>
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
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-heading">
            My <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8 font-body">
            A collection of projects showcasing my skills in full-stack development, modern frameworks, and innovative solutions.
          </p>
          
          {/* Technology Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {filterOptions.map((tech, index) => (
              <motion.button
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterChange(tech)}
                className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-200 font-body overflow-hidden group ${
                  selectedFilter === tech
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-sm'
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            ))}
          </motion.div>
          
          {/* Project count with loading state */}
          <motion.div 
            key={`${selectedFilter}-${isLoading}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-white/60 font-body flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border border-white/30 border-t-white/60 rounded-full"
                />
                <span>Filtering projects...</span>
              </>
            ) : (
              <span>
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
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-heading">
            My <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Resume</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8 font-body">
            Computer Engineering Student | Full Stack Developer | Problem Solver
          </p>
          <div className="flex justify-center">
            <motion.a 
              href="/resume.pdf" 
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </motion.a>
          </div>
        </motion.div>

        <div className="space-y-12">
          {/* Education Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 font-heading">Education</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold text-white font-heading">Bachelor of Engineering, Computer Engineering</h3>
                <p className="text-blue-400 font-semibold">Thakur College of Engineering and Technology, University of Mumbai</p>
                <p className="text-white/60">CGPI: 9.4/10.0</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-white font-heading">Higher Secondary Certificate (H.S.C.)</h3>
                <p className="text-purple-400 font-semibold">Maharashtra State Board</p>
                <p className="text-white/60">Score: 82% | JEE Mains & CET Percentile: 96%ile</p>
              </div>
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-bold text-white font-heading">Secondary School Certificate (S.S.C.)</h3>
                <p className="text-green-400 font-semibold">Maharashtra State Board</p>
                <p className="text-white/60">Score: 94.8%</p>
              </div>
            </div>
          </motion.section>

          {/* Work Experience Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 font-heading">Work Experience</h2>
            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-bold text-white font-heading">Business Analyst Intern</h3>
                <p className="text-blue-400 font-semibold mb-2">Neoprism Consultancy And Services</p>
                <ul className="text-white/70 space-y-2 font-body">
                  <li>• Authored 20+ white papers for SMEs, driving data-informed digital marketing strategies</li>
                  <li>• Collaborated with cross-functional teams to analyze KPIs and recommend growth solutions</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-bold text-white font-heading">AI Prompt Engineering Intern</h3>
                <p className="text-purple-400 font-semibold mb-2">VaultOfCodes (Remote)</p>
                <ul className="text-white/70 space-y-2 font-body">
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
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 font-heading">University Projects</h2>
            <div className="space-y-8">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-bold text-white font-heading">YouTube Clone – React Webapp</h3>
                <ul className="text-white/70 space-y-2 font-body mt-2">
                  <li>• Designed and implemented a responsive video streaming platform using React.js and RapidAPI</li>
                  <li>• Enabled real-time content fetching and dynamic video playback functionality</li>
                  <li>• Deployed on Vercel with production-ready configuration, ensuring high performance and intuitive UI/UX</li>
                </ul>
              </div>
              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-bold text-white font-heading">Email Reply Generator – Spring Boot, React, Chrome Extension</h3>
                <ul className="text-white/70 space-y-2 font-body mt-2">
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
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 font-heading">Technical Skills</h2>
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
  
  return (
    <motion.div
      variants={cardHover3D}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:border-white/20 overflow-hidden ${featured ? 'md:col-span-2 lg:col-span-1 ring-2 ring-blue-500/20' : ''}`}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Enhanced 3D background gradient effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={isHovered ? { 
          scale: 1.05,
          rotateZ: 2,
        } : { 
          scale: 1,
          rotateZ: 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
      />
      
      {/* Floating holographic overlay */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent, rgba(147, 51, 234, 0.1), transparent)',
          backgroundSize: '200% 200%',
        }}
        animate={isHovered ? { 
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          scale: [1, 1.02, 1]
        } : { 
          backgroundPosition: '0% 50%',
          scale: 1 
        }}
        transition={{ 
          duration: 3, 
          repeat: isHovered ? Infinity : 0, 
          ease: "linear" 
        }}
      />

      {/* Featured badge with 3D effect */}
      {featured && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
          className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-xl z-20 border border-white/20"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ 
            scale: 1.15,
            rotateY: 10,
            z: 20,
            transition: { duration: 0.2 }
          }}
        >
          <motion.span
            animate={isHovered ? { scale: 1.1, rotateZ: 5 } : { scale: 1, rotateZ: 0 }}
            transition={{ duration: 0.2 }}
          >
            ✨ Featured
          </motion.span>
        </motion.div>
      )}
      
      {/* Category badge with 3D effect */}
      {category && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.3, type: "spring" }}
          className="absolute top-4 left-4 bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-2 rounded-full z-15 border border-white/30 shadow-lg"
          style={{ transformStyle: 'preserve-3d' }}
          whileHover={{ 
            scale: 1.1, 
            y: -2,
            rotateX: 10,
            z: 15,
            transition: { duration: 0.2 }
          }}
        >
          {category}
        </motion.div>
      )}
      
      {/* Content container with proper top margin to avoid overlap */}
      <div className={`space-y-4 relative z-10 ${category || featured ? 'mt-10' : 'mt-3'}`}>
        <motion.h3 
          className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors font-heading"
          animate={isHovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-white/70 font-body line-clamp-3"
          animate={isHovered ? { color: "rgba(255, 255, 255, 0.9)" } : { color: "rgba(255, 255, 255, 0.7)" }}
          transition={{ duration: 0.2 }}
        >
          {description}
        </motion.p>
        
        <div className="flex flex-wrap gap-2">
          {tech.map((t, index) => (
            <motion.div 
              key={t} 
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full group-hover:bg-white/20 transition-colors border border-white/10"
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
            >
              {skillIcons[t] && (
                <motion.img 
                  src={skillIcons[t]} 
                  alt={t} 
                  className="w-4 h-4" 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <span className="text-sm text-white/80 font-body">{t}</span>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="flex space-x-4 pt-4"
          animate={isHovered ? { y: -2 } : { y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {link && (
            <motion.a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors font-body"
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                whileHover={{ rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.div>
              <span>Live Demo</span>
            </motion.a>
          )}
          <motion.a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors font-body"
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            >
              <Github className="w-4 h-4" />
            </motion.div>
            <span>View Code</span>
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
