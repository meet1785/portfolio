import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';
import AppContent from './components/AppContent';
import LandingPage from './components/LandingPage';
import WorksPage from './components/WorksPage';
import ResumePage from './components/ResumePage';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router basename="/portfolio">
        <div className="min-h-screen bg-cream dark:bg-charcoal relative overflow-hidden transition-colors duration-300">
          {/* Distinctive Geometric Pattern Background */}
          <div className="absolute inset-0 overflow-hidden hidden dark:block">
            {/* Angular geometric shapes */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 opacity-10">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <polygon points="0,0 400,0 400,200" fill="#e07a5f" />
                <polygon points="400,200 400,400 200,400" fill="#3d5a3c" />
                <rect x="0" y="200" width="200" height="200" fill="#dda15e" opacity="0.5" />
              </svg>
            </div>

            {/* Left accent bars */}
            <div className="absolute top-1/4 left-0 w-2 h-32 bg-burnt opacity-40"></div>
            <div className="absolute top-1/2 left-0 w-2 h-48 bg-forest opacity-30"></div>
            <div className="absolute bottom-1/4 left-0 w-2 h-24 bg-sand opacity-50"></div>

            {/* Bottom geometric pattern */}
            <div className="absolute bottom-0 left-1/4 w-64 h-64 opacity-5">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e07a5f" strokeWidth="2" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="#3d5a3c" strokeWidth="2" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="#dda15e" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Subtle grid pattern for texture */}
          <div className="absolute inset-0 opacity-[0.02] hidden dark:block">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(224, 122, 95, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(224, 122, 95, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            ></div>
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