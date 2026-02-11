import { Github, Linkedin, Mail, Code, FileText, Home, Briefcase } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider} from './context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { pageTransition, fadeInUp, scaleIn} from './utils/animations';
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

// Update the color scheme constants
const colors = {
  primary: '#64FFDA',
  secondary: '#0A192F',
  accent: '#8892B0',
  text: {
    primary: '#CCD6F6',
    secondary: '#8892B0',
    dark: '#233554'
  },
  background: {
    primary: '#0A192F',
    secondary: '#112240',
    accent: '#233554'
  }
};

// Add modern fonts
const typography = {
  primary: "'Inter', sans-serif",
  secondary: "'Fira Code', monospace"
};

const AppContent: React.FC = () => {
  return (
    <>
      <nav className="bg-background-primary backdrop-blur-md bg-opacity-95 shadow-xl fixed w-full z-50 md:h-20 h-auto py-3 px-8 md:px-12 border-b border-accent/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center w-full h-full">
          <div className="flex">
            {/* Update nav links to use white text for better contrast */}
            <Link to="/" className="flex items-center px-4 text-white hover:text-gray-200">
              <Home className="w-5 h-5 mr-2" />
              Home
            </Link>
            <Link to="/works" className="flex items-center px-4 text-white hover:text-gray-200">
              <Briefcase className="w-5 h-5 mr-2" />
              Works
            </Link>
            <Link to="/resume" className="flex items-center px-4 text-white hover:text-gray-200">
              <FileText className="w-5 h-5 mr-2" />
              Resume
            </Link>
            <Link to="/about" className="flex items-center px-4 text-white hover:text-gray-200">
              About
            </Link>
            {/* <Link to="/contact" className="flex items-center px-4 text-white hover:text-gray-200">
              Contact
            </Link> */}
          </div>
          <div className="flex items-center space-x-4">
            {/* Removed dark/light mode toggle button remains removed */}
            <a href="mailto:meetshah1785@gmail.com" className="text-white hover:text-gray-200">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/meetshah1708" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/meetshah1708" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </AnimatePresence>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-[#0A192F] via-[#CCD6F6] to-[#8892B0] dark:from-[#0A192F] dark:via-[#CCD6F6] dark:to-[#8892B0]">
          {/* Modern drop shadow and padding */}
          <div className="p-4 md:p-8 shadow-xl">
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
      className="pt-24 relative overflow-hidden bg-background-primary"
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-accent opacity-90 z-0" />
      <div className="relative z-10">
        <div className="h-screen flex items-center justify-center text-white bg-gradient-to-br from-blue-600 to-purple-700 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Profile Image */}
            <motion.div
              variants={scaleIn}
              initial="initial"
              animate="animate"
              className="w-80 h-80 relative overflow-hidden"
            >
              <img
                src={img} 
                alt="Meet Timir Shah"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl"
                style={{
                  objectPosition: 'center top',
                  objectFit: 'cover'
                }}
              />
            </motion.div>

            {/* Text Content */}
            <div className="text-center md:text-left">
              <motion.h1
                className="text-6xl font-bold mb-6"
                variants={fadeInUp}
              >
                Meet Timir Shah
              </motion.h1>
              <motion.p
                className="text-2xl mb-8"
                variants={fadeInUp}
              >
                Full Stack Developer &amp; Problem Solver
              </motion.p>
              <motion.div
                className="space-x-4"
                variants={scaleIn}
              >
                <Link 
                  to="/works" 
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-background-primary font-medium 
                             transition-all duration-300 hover:bg-primary/90 hover:translate-y-[-2px] focus:ring-2 
                             focus:ring-primary/50 focus:outline-none"
                >
                  View My Work
                </Link>
                <Link 
                  to="/resume" 
                  className="inline-flex items-center px-8 py-3 rounded-lg border-2 border-text-primary text-text-primary 
                             font-medium transition-all duration-300 hover:bg-text-primary/10 hover:translate-y-[-2px] 
                             focus:ring-2 focus:ring-text-primary/50 focus:outline-none"
                >
                  Resume
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        {/* New "Stay Connected" call-to-action section */}
        <div id="follow" className="mt-16 text-center max-w-4xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Stay Connected
          </motion.h2>
          <motion.p 
            className="text-lg text-white mb-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            Follow me on social media to get the latest updates.
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-6"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <a href="https://linkedin.com/in/meetshah1708" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://github.com/meetshah1708" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <Github className="w-6 h-6" />
            </a>
            <a href="mailto:meetshah1785@gmail.com" className="text-white hover:text-gray-300">
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const WorksPage: React.FC = () => {
  const projects = [
    {
      title: "YouTube Clone",
      description: "A modern YouTube clone built with React, featuring real-time comments, streaming, and a responsive UI.",
      link: "https://youtube-meet.vercel.app/",
      github: "https://github.com/meetshah1708/youtube",
      tech: ['React', 'Tailwind CSS', 'Redux']
    },
    {
      title: "Netflix-Clone",
      description: "A Netflix clone built with React and vite, featuring user authentication, movie browsing, and a responsive design.",
      github: "https://github.com/meetshah1708/Netflix-Clone",
      tech: ['React', 'vite', 'Tailwind CSS']  // 'vite' matches the key in skillIcons
    },
    {
      title: "Blog App",
      description: "Full-stack blog platform with user authentication, CRUD operations, and markdown support.",
      github: "https://github.com/meetshah1708/blog-app",
      tech: ['Next.js', 'MongoDB', 'Express', 'Node.js']
    },
    {
      title: "MERN",
      description: "A basic MERN stack template demonstrating CRUD operations, user authentication, and a clean project structure.",
      github: "https://github.com/meetshah1708/mern",
      tech: ['MongoDB', 'Express', 'React', 'Node.js']
    },
    {
      title: "QuizApp",
      description: "Interactive quiz application with multiple question categories, user scoring, and responsive UI.",
      github: "https://github.com/meetshah1708/quizapp",
      tech: ['React', 'vite', 'CSS']  // 'vite' matches the key in skillIcons
    },
    {
      title: "PromptDunia",
      description: "A platform to explore and share AI prompts, complete with community-driven content and rating features.",
      github: "https://github.com/meetshah1708/PromptDunia",
      tech: ['Next.js', 'Tailwind CSS', 'TypeScript']
    },
   

  ];

  return (
    <div className="pt-36 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">My Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ResumePage: React.FC = () => {
  return (
    <div className="pt-36 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Resume</h2>
          
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <SkillCategory title="Frontend" skills={['React', 'TypeScript', 'Tailwind CSS', 'Redux']} />
              <SkillCategory title="Backend" skills={['Node.js', 'Express', 'MongoDB']} />
              <SkillCategory title="Tools" skills={['Git', 'Docker', 'AWS', 'Vercel']} />
              <SkillCategory title="Languages" skills={['JavaScript', 'C++', 'Python', 'Java']} />
            </div>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Coding Profiles</h3>
            <div className="grid gap-4 md:grid-cols-3">
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
          </section>
        </div>
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <div className="pt-36 pb-16 max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
      <p className="text-gray-700 leading-relaxed">
      I'm Meet Timir Shah, a Computer Engineering student at TCET, University of Mumbai, passionate about creating innovative digital solutions. With expertise in full-stack development using MERN Stack and proficiency in languages like Java, C++, Javascript, and Python, I've successfully developed projects including a YouTube clone using React JS and Rapid API. My experience extends to working with databases (MySQL, MongoDB), modern development tools (Docker, Git, RESTful APIs), and frameworks (React, Next.js, Express.js). As an AI PE intern at Vault of Codes and a participant in prestigious competitions like SIH 2023-24 and Flipkart Grid 6.0, I've demonstrated my problem-solving abilities through 300+ coding challenges across platforms. I'm constantly building personal projects while maintaining a balance with interests in table tennis and community volunteering. Currently seeking opportunities to leverage my technical skills and creative approach to contribute to innovative projects
      </p>
    </div>
  );
};

// const ContactPage: React.FC = () => {
//   return (
//     <div className="pt-24 pb-16 max-w-4xl mx-auto px-4">
//       <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Me</h2>
//       <form className="bg-background-secondary rounded-xl p-8 shadow-xl border border-accent/10">
//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full px-4 py-3 rounded-lg bg-background-primary border border-accent/20 
//                      text-text-primary placeholder-text-secondary/50 focus:ring-2 focus:ring-primary/50 
//                      focus:border-transparent focus:outline-none transition-all duration-300"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full px-4 py-3 rounded-lg bg-background-primary border border-accent/20 
//                      text-text-primary placeholder-text-secondary/50 focus:ring-2 focus:ring-primary/50 
//                      focus:border-transparent focus:outline-none transition-all duration-300"
//         />
//         <textarea
//           placeholder="Your message..."
//           className="w-full px-4 py-3 rounded-lg bg-background-primary border border-accent/20 
//                      text-text-primary placeholder-text-secondary/50 focus:ring-2 focus:ring-primary/50 
//                      focus:border-transparent focus:outline-none transition-all duration-300 h-32"
//         ></textarea>
//         <button
//           type="submit"
//           className="bg-primary text-background-primary py-2 px-4 rounded-lg font-medium 
//                      transition-all duration-300 hover:bg-primary/90 hover:translate-y-[-2px] focus:ring-2 
//                      focus:ring-primary/50 focus:outline-none"
//         >
//           Send
//         </button>
//       </form>
//       <p className="mt-4 text-gray-700">
//         For direct inquiries, email me at: <span className="font-semibold text-blue-600">meetshah1785@gmail.com</span>
//       </p>
//     </div>
//   );
// };

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
  github: string;
  tech: string[];
}

const ProjectCard = ({ title, description, link, github, tech }: ProjectCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition transform 
                  hover:-translate-y-1 border border-${colors.accent}/10`}
    >
      <h3 className={`text-xl font-semibold text-${colors.text.dark}`}
           style={{ fontFamily: typography.primary }}>
        {title}
      </h3>
      <p className={`mt-2 text-${colors.text.secondary}`}
         style={{ fontFamily: typography.primary }}>
        {description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map(t => (
          <div key={t} className="flex items-center space-x-2">
            {skillIcons[t] && (
              <img 
                src={skillIcons[t]} 
                alt={t} 
                className="w-5 h-5" 
              />
            )}
            <span className="px-2 py-1 bg-gray-200 rounded text-sm">{t}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-4">
        {link && (
          <a href={link} 
             target="_blank" 
             rel="noopener noreferrer" 
             className={`inline-flex items-center text-${colors.primary} hover:text-${colors.primary}/80`}>
            <Code className="w-4 h-4 mr-2" />
            Live Demo
          </a>
        )}
        <a href={github} 
           target="_blank" 
           rel="noopener noreferrer" 
           className={`inline-flex items-center text-${colors.text.secondary} hover:text-${colors.text.dark}`}>
          <Github className="w-4 h-4 mr-2" />
          View Code
        </a>
      </div>
    </motion.div>
  );
}

function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="bg-gray-50 rounded-xl p-4 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map(skill => (
          <div key={skill} className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm">
            {skillIcons[skill] && (
              <img 
                src={skillIcons[skill]} 
                alt={skill} 
                className="w-5 h-5"
              />
            )}
            <span className="text-sm text-gray-700">{skill}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ProfileCard({ platform, username, link }: ProfileCardProps) {
  const iconSrc = profileIcons[platform] || "";
  return (
    <>
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-white rounded-xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1 text-center"
      >
        {iconSrc && (
          <img
            src={iconSrc}
            alt={`${platform} icon`}
            className="mx-auto w-10 h-10 mb-3"
          />
        )}
        <h3 className="text-lg font-semibold text-gray-800">{platform}</h3>
        <p className="mt-1 text-gray-600">@{username}</p>
      </a>
    </>
  );
}

export default App;