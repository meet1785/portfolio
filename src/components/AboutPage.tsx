import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { pageTransition } from '../utils/animations';

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
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-body">
            Computer Engineering Student | CGPI: 9.4/10.0 | Mumbai
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-white/80 font-body">
                I'm Meet Shah, a Computer Engineering student at Thakur College of Engineering and Technology, University of Mumbai,
                with a stellar CGPI of 9.4/10.0. Based in Mumbai, I'm passionate about creating innovative digital solutions and
                solving complex problems through technology.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                With expertise in the MERN Stack and proficiency in languages like Java, C++, JavaScript, and Python, I've successfully
                developed multiple projects including a YouTube clone using React.js and RapidAPI, and an Email Reply Generator with
                Spring Boot and Chrome extension integration.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                My professional experience includes working as a Business Analyst Intern at Neoprism Consultancy, where I authored 20+
                white papers for SMEs and collaborated on data-driven marketing strategies. As an AI Prompt Engineering Intern at
                VaultOfCodes, I designed and fine-tuned prompts for LLMs to improve NLP model accuracy.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-heading">Leadership & Activities</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-white/80 font-body">
                Beyond academics, I actively participate in leadership roles and community service. As a Team Lead for Smart India
                Hackathon (2023-24), I coordinated end-to-end project planning during national-level events. My involvement as an
                NSS Volunteer has enabled me to organize social initiatives benefiting 50+ individuals through community outreach.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                I also contribute to the TSDW Sports Team, where I've coordinated 10+ inter-college sports and tech events with
                200+ participants across campuses, demonstrating my ability to manage large-scale events and work with diverse teams.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-heading">Achievements & Certifications</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-white/80 font-body">
                My commitment to continuous learning is reflected in my achievements: Google Cybersecurity Certificate (Coursera),
                Google Arcade Facilitator with 50+ GCP Skill Badges, and qualifying for TCS CodeVita 2024 Round 2. I've demonstrated
                my problem-solving abilities through solving 300+ DSA problems across platforms like LeetCode, GeeksforGeeks, and CodeChef.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                I've also participated in prestigious competitions like Flipkart Grid 6.0 and gained valuable industry exposure through
                virtual experience programs with JP Morgan (Advanced Software Engineering), Goldman Sachs (Software Engineering), and
                Deloitte Australia (Data Analytics).
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-heading">Looking Forward</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-white/80 font-body">
                I'm constantly building personal projects while maintaining a balance with interests in table tennis and community
                volunteering. Currently seeking opportunities to leverage my technical skills and creative approach to contribute
                to innovative projects and make a meaningful impact in the technology industry.
              </p>
              <p className="text-lg leading-relaxed text-white/80 font-body mt-6">
                My experience with modern development tools (Docker, Git, RESTful APIs), cloud platforms (Google Cloud Platform, Firebase),
                and frameworks (React, Next.js, Express.js) positions me well for tackling complex technological challenges and building
                scalable solutions.
              </p>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-6 font-heading">Let's Connect</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-white/80">meetshah1785@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white/80">📱 8591744570</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white/80">📍 Mumbai, India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;