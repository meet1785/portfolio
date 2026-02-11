import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { cardHover3D } from '../utils/animations';
import { skillIcons } from '../utils/skillIcons';

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

export default ProjectCard;