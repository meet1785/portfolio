import React from 'react';
import { Github, Linkedin, Mail, Code, FileText, Home, Briefcase } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


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
  CodeChef: "https://cdn.worldvectorlogo.com/logos/codechef.svg"  // updated CodeChef icon
};

const skillIcons: Record<string, string> = {
  React: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  TypeScript: "https://cdn.worldvectorlogo.com/logos/typescript.svg",  // updated TypeScript icon
  "Tailwind CSS": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  Redux: "https://upload.wikimedia.org/wikipedia/commons/4/49/Redux.png",  
  "Node.js": "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",    // updated Node.js icon
  Express: "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png",
  MongoDB: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",    // updated MongoDB icon
  Git: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png",
  Docker: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
  AWS: "https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png",
  Vercel: "https://cdn.worldvectorlogo.com/logos/vercel.svg",             // updated Vercel icon
  JavaScript: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",     // updated JavaScript icon
  "C++": "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
  Python: "https://cdn.worldvectorlogo.com/logos/python-5.svg",
  Java: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-tr from-green-50 to-blue-100">
        <nav className="bg-white shadow-sm fixed w-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center px-4 text-gray-700 hover:text-gray-900">
                  <Home className="w-5 h-5 mr-2" />
                  Home
                </Link>
                <Link to="/works" className="flex items-center px-4 text-gray-700 hover:text-gray-900">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Works
                </Link>
                <Link to="/resume" className="flex items-center px-4 text-gray-700 hover:text-gray-900">
                  <FileText className="w-5 h-5 mr-2" />
                  Resume
                </Link>
                <Link to="/about" className="flex items-center px-4 text-gray-700 hover:text-gray-900">
                  About
                </Link>
                <Link to="/contact" className="flex items-center px-4 text-gray-700 hover:text-gray-900">
                  Contact
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <a href="mailto:meetshah1785@gmail.com" className="text-gray-500 hover:text-gray-900">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="https://github.com/meetshah1708" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/meetshah1708" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="pt-16">
      <div
        className="relative h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #0f172a, #1e293b 50%, #334155), url('https://source.unsplash.com/featured/?programming,developer')",
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-6 animate-fade-in">Meet Timir Shah</h1>
          <p className="text-2xl mb-8 animate-slide-up">Full Stack Developer & Problem Solver</p>
          <div className="space-x-4">
            <Link to="/works" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              View My Work
            </Link>
            <Link to="/resume" className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Resume
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Testimonials</h2>
        <div className="flex flex-col space-y-4">
          <blockquote className="bg-white rounded-lg p-4 text-gray-700">
            "Great to work with! Highly recommended."
          </blockquote>
          <blockquote className="bg-white rounded-lg p-4 text-gray-700">
            "Delivers quality code on tight deadlines."
          </blockquote>
        </div>
      </div>
    </div>
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
      tech: ['React', 'vite', 'Tailwind CSS']
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
      tech: ['React', 'vite', 'CSS']
    },
    {
      title: "PromptDunia",
      description: "A platform to explore and share AI prompts, complete with community-driven content and rating features.",
      github: "https://github.com/meetshah1708/PromptDunia",
      tech: ['Next.js', 'Tailwind CSS', 'TypeScript']
    },
   
    {
      title: "E-commerce Platform",
      description: "Feature-rich e-commerce application with product management, cart functionality, and payment integration.",
      github: "https://github.com/meetshah1708/ecommerce",
      tech: ['React', 'Node.js', 'MongoDB']
    }
  ];

  return (
    <div className="pt-24 pb-16">
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
    <div className="pt-24 pb-16">
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
    <div className="pt-24 pb-16 max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
      <p className="text-gray-700 leading-relaxed">
        I am a dedicated Full Stack Developer with a strong passion for building scalable and efficient applications. 
        My interests span web development, problem-solving, and exploring new technologies to craft innovative solutions.
      </p>
    </div>
  );
};

const ContactPage: React.FC = () => {
  return (
    <div className="pt-24 pb-16 max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Me</h2>
      <form className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border w-full p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 rounded"
        />
        <textarea
          placeholder="Your message..."
          className="border w-full p-2 rounded h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
      <p className="mt-4 text-gray-700">
        For direct inquiries, email me at: <span className="font-semibold text-blue-600">meetshah1785@gmail.com</span>
      </p>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  description: string;
  link?: string;
  github: string;
  tech: string[];
}

function ProjectCard({ title, description, link, github, tech }: ProjectCardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
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
          <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <Code className="w-4 h-4 mr-2" />
            Live Demo
          </a>
        )}
        <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-gray-600 hover:text-gray-800">
          <Github className="w-4 h-4 mr-2" />
          View Code
        </a>
      </div>
    </div>
  );
}

function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
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
    </div>
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