import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from '../utils/useDebounce';
import { pageTransition, staggerContainer } from '../utils/animations';
import ProjectCard from './ProjectCard'; // Assuming ProjectCard is also refactored

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

export default WorksPage;