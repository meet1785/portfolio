import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, FileText, Mail, Github, Linkedin, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import LandingPage from './LandingPage';
import WorksPage from './WorksPage';
import ResumePage from './ResumePage';
import AboutPage from './AboutPage';

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
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
        <div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-white/10 dark:border-white/10 shadow-lg">
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
                  <span className="text-gray-800 dark:text-white font-semibold text-xl font-primary group-hover:text-blue-500 dark:group-hover:text-blue-300 transition-colors duration-300">Meet Shah</span>
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
                      className="relative group px-4 py-2 rounded-xl text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 font-body"
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
                      className="group relative p-2 rounded-xl text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  ))}
                  <button
                    onClick={toggleTheme}
                    className="group relative p-2 rounded-xl text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-110"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 rounded-xl text-gray-700 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10"
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
                className="md:hidden backdrop-blur-xl bg-gray-100/90 dark:bg-white/10 border-t border-gray-200 dark:border-white/10"
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
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:bg-gray-200 dark:hover:bg-white/10 font-body"
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        <span>{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile Social Links */}
                  <motion.div
                    className="flex justify-center space-x-4 pt-4 border-t border-gray-200 dark:border-white/10"
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
                        className="p-3 rounded-xl text-gray-500 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:bg-gray-200 dark:hover:bg-white/10"
                        aria-label={social.label}
                        onClick={closeMobileMenu}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                    <button
                      onClick={() => {
                        toggleTheme();
                        closeMobileMenu();
                      }}
                      className="p-3 rounded-xl text-gray-500 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:bg-gray-200 dark:hover:bg-white/10"
                      aria-label="Toggle theme"
                    >
                      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
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

export default AppContent;