import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Download, Linkedin, Github, Mail } from 'lucide-react';
import { pageTransition, fadeInUp, scaleIn, staggerContainer, typewriter, float3D, rotate3D, morphingBlob, particleFloat } from '../utils/animations';
import img from '/meet.jpeg';

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
                className="text-5xl lg:text-7xl font-bold text-gray-800 dark:text-white font-heading"
              >
                Meet
                <motion.span
                  variants={typewriter}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                > Shah</motion.span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
                className="text-xl lg:text-2xl text-gray-600 dark:text-white/80 font-body"
              >
                Computer Engineering Student & Full Stack Developer
              </motion.p>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-500 dark:text-white/60 max-w-2xl font-body leading-relaxed"
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
                  className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-gray-400 dark:border-white/20 text-gray-800 dark:text-white font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:scale-105 font-body overflow-hidden"
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
        className="py-20 bg-gray-100 dark:bg-gradient-to-t dark:from-black/20 dark:to-transparent"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6 font-heading"
          >
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="text-lg text-gray-600 dark:text-white/70 mb-8 font-body"
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

export default LandingPage;