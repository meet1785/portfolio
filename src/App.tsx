import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { morphingBlob, float3D, rotate3D, particleFloat } from './utils/animations';
import AppContent from './components/AppContent';
import LandingPage from './components/LandingPage';
import WorksPage from './components/WorksPage';
import ResumePage from './components/ResumePage';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router basename="/portfolio">
        <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
          {/* Enhanced 3D Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden hidden dark:block">
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
          <div className="absolute inset-0 opacity-5 hidden dark:block">
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
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
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

export default App;