import { Github, Linkedin, Mail, Code, FileText, Home, Briefcase, ExternalLink, Download } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider} from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition, fadeInUp, scaleIn, staggerContainer} from './utils/animations';
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
  React: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  TypeScript: "https://cdn.worldvectorlogo.com/logos/typescript.svg",  
  "Tailwind CSS": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  Redux: "https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png",  
  "Node.js": "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",    
  Express: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
  MongoDB: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",    
  Git: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
  Docker: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
  AWS: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
  Vercel: "https://cdn.worldvectorlogo.com/logos/vercel.svg",             
  JavaScript: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",     
  "C++": "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
  Python: "https://cdn.worldvectorlogo.com/logos/python-5.svg",
  Java: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
  Vite: "https://vitejs.dev/logo.svg",
  'vite': "https://cdn.worldvectorlogo.com/logos/vitejs.svg"
};

const AppContent: React.FC = () => {
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <span className="text-white font-semibold text-xl font-primary">Meet Shah</span>
              </motion.div>
              
              {/* Navigation Links */}
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

              {/* Social Links */}
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
          </div>
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
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 py-20">
          {/* Profile Image */}
          <motion.div
            variants={scaleIn}
            initial="initial"
            animate="animate"
            className="relative"
          >
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              {/* Main image */}
              <img
                src={img} 
                alt="Meet Timir Shah"
                className="relative w-full h-full object-cover rounded-full border-4 border-white/20 shadow-2xl backdrop-blur-sm"
                style={{
                  objectPosition: 'center top',
                  objectFit: 'cover'
                }}
              />
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500/20 rounded-full backdrop-blur-sm animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500/20 rounded-full backdrop-blur-sm animate-float animation-delay-2000"></div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white font-heading">
                Meet Timir 
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"> Shah</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 font-body">
                Full Stack Developer & Problem Solver
              </p>
              <p className="text-lg text-white/60 max-w-2xl font-body">
                Passionate about creating innovative digital solutions with modern technologies. 
                Specializing in MERN stack, React, TypeScript, and cloud deployment.
              </p>
            </motion.div>
            
            <motion.div
              variants={scaleIn}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link 
                to="/works" 
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl font-body"
              >
                <span className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5" />
                  <span>View My Work</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                to="/resume" 
                className="group relative inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-105 font-body"
              >
                <span className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Resume</span>
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced "Stay Connected" section */}
      <motion.div 
        className="py-20 bg-gradient-to-t from-black/20 to-transparent"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-heading">
            Let's Connect
          </h2>
          <p className="text-lg text-white/70 mb-8 font-body">
            Follow me on social media and let's build something amazing together.
          </p>
          <div className="flex justify-center space-x-6">
            {[
              { href: "https://linkedin.com/in/meetshah1708", icon: Linkedin, label: "LinkedIn", color: "from-blue-600 to-blue-700" },
              { href: "https://github.com/meetshah1708", icon: Github, label: "GitHub", color: "from-gray-600 to-gray-700" },
              { href: "mailto:meetshah1785@gmail.com", icon: Mail, label: "Email", color: "from-red-600 to-red-700" },
            ].map((social) => (
              <a
                key={social.href}
                href={social.href}
                target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={`group relative p-4 bg-gradient-to-br ${social.color} rounded-2xl text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl`}
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WorksPage: React.FC = () => {
  const projects = [
    {
      title: "YouTube Clone",
      description: "A modern YouTube clone built with React, featuring real-time comments, streaming, and a responsive UI with modern design patterns.",
      link: "https://youtube-meet.vercel.app/",
      github: "https://github.com/meetshah1708/youtube",
      tech: ['React', 'Tailwind CSS', 'Redux'],
      featured: true
    },
    {
      title: "Netflix-Clone",
      description: "A Netflix clone built with React and Vite, featuring user authentication, movie browsing, and a responsive design.",
      github: "https://github.com/meetshah1708/Netflix-Clone",
      tech: ['React', 'vite', 'Tailwind CSS']
    },
    {
      title: "Blog App",
      description: "Full-stack blog platform with user authentication, CRUD operations, and markdown support for content creation.",
      github: "https://github.com/meetshah1708/blog-app",
      tech: ['Next.js', 'MongoDB', 'Express', 'Node.js']
    },
    {
      title: "MERN Stack Template",
      description: "A comprehensive MERN stack template demonstrating CRUD operations, user authentication, and clean project structure.",
      github: "https://github.com/meetshah1708/mern",
      tech: ['MongoDB', 'Express', 'React', 'Node.js']
    },
    {
      title: "QuizApp",
      description: "Interactive quiz application with multiple question categories, user scoring, and responsive UI with modern animations.",
      github: "https://github.com/meetshah1708/quizapp",
      tech: ['React', 'vite', 'CSS']
    },
    {
      title: "PromptDunia",
      description: "A platform to explore and share AI prompts, complete with community-driven content and rating features.",
      github: "https://github.com/meetshah1708/PromptDunia",
      tech: ['Next.js', 'Tailwind CSS', 'TypeScript']
    },
  ];

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
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-body">
            A collection of projects showcasing my skills in full-stack development, modern frameworks, and innovative solutions.
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </motion.div>
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
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-heading">
            My <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Resume</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto font-body">
            Skills, experience, and coding achievements that define my journey as a developer.
          </p>
        </motion.div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 font-heading">Technical Skills</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <SkillCategory title="Frontend" skills={['React', 'TypeScript', 'Tailwind CSS', 'Redux']} />
              <SkillCategory title="Backend" skills={['Node.js', 'Express', 'MongoDB']} />
              <SkillCategory title="Tools" skills={['Git', 'Docker', 'AWS', 'Vercel']} />
              <SkillCategory title="Languages" skills={['JavaScript', 'C++', 'Python', 'Java']} />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
        >
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-white/80 font-body">
              I'm Meet Timir Shah, a Computer Engineering student at TCET, University of Mumbai, passionate about creating innovative digital solutions. With expertise in full-stack development using MERN Stack and proficiency in languages like Java, C++, Javascript, and Python, I've successfully developed projects including a YouTube clone using React JS and Rapid API.
            </p>
            <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
              My experience extends to working with databases (MySQL, MongoDB), modern development tools (Docker, Git, RESTful APIs), and frameworks (React, Next.js, Express.js). As an AI PE intern at Vault of Codes and a participant in prestigious competitions like SIH 2023-24 and Flipkart Grid 6.0, I've demonstrated my problem-solving abilities through 300+ coding challenges across platforms.
            </p>
            <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
              I'm constantly building personal projects while maintaining a balance with interests in table tennis and community volunteering. Currently seeking opportunities to leverage my technical skills and creative approach to contribute to innovative projects.
            </p>
          </div>
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
}

const ProjectCard = ({ title, description, link, github, tech, featured }: ProjectCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      className={`group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-2xl ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors font-heading">
          {title}
        </h3>
        
        <p className="text-white/70 font-body">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tech.map(t => (
            <div key={t} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
              {skillIcons[t] && (
                <img 
                  src={skillIcons[t]} 
                  alt={t} 
                  className="w-4 h-4" 
                />
              )}
              <span className="text-sm text-white/80 font-body">{t}</span>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-4 pt-4">
          {link && (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors font-body"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors font-body"
          >
            <Github className="w-4 h-4" />
            <span>View Code</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

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