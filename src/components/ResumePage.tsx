import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { pageTransition, fadeInUp } from '../utils/animations';
import SkillCategory from './SkillCategory'; // Assuming SkillCategory is also refactored
import ProfileCard from './ProfileCard'; // Assuming ProfileCard is also refactored

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

export default ResumePage;