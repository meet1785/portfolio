import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, HeadingLevel, AlignmentType } from 'docx';

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  summary: string;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    gpa: string;
    graduation: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    achievements: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    achievements: string[];
  }>;
  skills: {
    [category: string]: string[];
  };
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    skills: string[];
  }>;
  achievements: Array<{
    title: string;
    description: string;
  }>;
}

export const generateResumeData = (): ResumeData => {
  return {
    personalInfo: {
      name: "Meet Shah",
      title: "Full Stack Developer & AI Engineer",
      email: "meetshah1785@gmail.com",
      phone: "+91-XXXXXXXXXX",
      location: "Mumbai, Maharashtra, India",
      linkedin: "https://www.linkedin.com/in/meetshah1708",
      github: "https://github.com/meet1785"
    },
    summary: "Computer Engineering student at Thakur College of Engineering and Technology with expertise in full-stack development, AI/ML, and cloud technologies. Passionate about creating innovative digital solutions with 300+ DSA problems solved and multiple certifications in cutting-edge technologies.",
    education: [
      {
        degree: "Bachelor of Engineering, Computer Engineering",
        institution: "Thakur College of Engineering and Technology",
        location: "Mumbai, Maharashtra",
        gpa: "9.4/10.0",
        graduation: "Expected 2026"
      },
      {
        degree: "Higher Secondary Certificate (H.S.C.)",
        institution: "Maharashtra State Board",
        location: "Maharashtra, India",
        gpa: "82%",
        graduation: "2022"
      },
      {
        degree: "Secondary School Certificate (S.S.C.)",
        institution: "Maharashtra State Board",
        location: "Maharashtra, India",
        gpa: "94.8%",
        graduation: "2020"
      }
    ],
    experience: [
      {
        title: "Business Analyst Intern",
        company: "Neoprism Consultancy And Services",
        location: "Remote",
        startDate: "2024",
        endDate: "2025",
        achievements: [
          "Authored 20+ white papers for SMEs, driving data-informed digital marketing strategies",
          "Collaborated with cross-functional teams to analyze KPIs and recommend growth solutions"
        ]
      },
      {
        title: "AI Prompt Engineering Intern",
        company: "VaultOfCodes",
        location: "Remote",
        startDate: "2024",
        endDate: "2025",
        achievements: [
          "Designed and fine-tuned prompts for LLMs to improve NLP model accuracy in text generation tasks",
          "Explored generative AI tools for behavior modeling and iterative prompt optimization"
        ]
      }
    ],
    projects: [
      {
        name: "AuthenticityNet — AI Deepfake Detection System",
        description: "Built ensemble deep learning system using CNN, EfficientNet, and VGG16 for image authenticity verification",
        technologies: ["Python", "TensorFlow", "OpenCV", "FastAPI", "React"],
        achievements: [
          "Implemented GradCAM heatmaps for visual explanations and intelligent caching for ~99% faster repeated predictions",
          "Developed React frontend with analytics dashboard and FastAPI backend with 15+ REST endpoints"
        ]
      },
      {
        name: "Smart Assistant — AI Chrome Extension",
        description: "Engineered Chrome extension with LeetCode integration for problem analysis, code review, and debugging assistance",
        technologies: ["JavaScript", "Chrome APIs", "Google Gemini API", "React"],
        achievements: [
          "Built AI mock interview system with timer, code editor, and real-time feedback powered by Google Gemini API",
          "Implemented gamified XP/level system with learning path management, YouTube video summaries, and quiz generation"
        ]
      },
      {
        name: "BudgetBuddy ERP — Enterprise Resource Planning",
        description: "Developed enterprise-grade ERP with 23+ granular permissions across 5 categories and role-based access control",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB", "Express"],
        achievements: [
          "Built interactive analytics dashboard with Recharts, dark/light theme, and responsive design with React + TypeScript",
          "Implemented full CRUD operations with Node.js/Express backend and MongoDB with JWT authentication"
        ]
      }
    ],
    skills: {
      "Programming Languages": ["Python", "TypeScript", "JavaScript", "Java", "C++", "Bash", "SQL"],
      "Web Development": ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
      "Backend Development": ["Node.js", "Express", "FastAPI", "REST APIs", "JWT"],
      "AI & Machine Learning": ["TensorFlow", "Scikit-learn", "OpenCV", "OpenAI API", "Google Gemini API"],
      "Databases": ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
      "DevOps & Tools": ["Git", "GitHub Actions", "Docker", "VS Code", "Linux", "Postman", "npm"]
    },
    certifications: [
      {
        name: "Google Cybersecurity Specialization",
        issuer: "Coursera",
        date: "Jan 2024",
        skills: ["Cybersecurity", "Network Security", "Risk Management"]
      }
    ],
    achievements: [
      {
        title: "SMART INDIA HACKATHON – Team Lead",
        description: "Led end-to-end project planning and coordination during national-level hackathon events (2023–2024)"
      },
      {
        title: "TCS CodeVita 2024 – Round 2 Qualifier",
        description: "Advanced to Round 2 in TCS CodeVita competitive programming contest"
      },
      {
        title: "300+ DSA Problems Solved",
        description: "Solved 300+ Data Structures and Algorithms problems on LeetCode, GeeksforGeeks, and CodeChef"
      }
    ]
  };
};

export const generatePDFResume = (data: ResumeData): void => {
  const pdf = new jsPDF();
  let yPosition = 20;

  // Helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * 5);
  };

  // Header
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.personalInfo.name, 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.personalInfo.title, 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(10);
  pdf.text(`${data.personalInfo.email} | ${data.personalInfo.phone}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`${data.personalInfo.location}`, 20, yPosition);
  yPosition += 5;
  pdf.text(`${data.personalInfo.linkedin} | ${data.personalInfo.github}`, 20, yPosition);
  yPosition += 15;

  // Summary
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PROFESSIONAL SUMMARY', 20, yPosition);
  yPosition += 8;
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  yPosition = addText(data.summary, 20, yPosition, 170);

  // Education
  yPosition += 10;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('EDUCATION', 20, yPosition);
  yPosition += 8;

  data.education.forEach(edu => {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(edu.degree, 20, yPosition);
    yPosition += 5;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${edu.institution}, ${edu.location}`, 20, yPosition);
    yPosition += 5;
    pdf.text(`${edu.graduation} | GPA: ${edu.gpa}`, 20, yPosition);
    yPosition += 8;
  });

  // Experience
  yPosition += 5;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('PROFESSIONAL EXPERIENCE', 20, yPosition);
  yPosition += 8;

  data.experience.forEach(exp => {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(exp.title, 20, yPosition);
    yPosition += 5;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${exp.company}, ${exp.location}`, 20, yPosition);
    yPosition += 5;
    pdf.text(`${exp.startDate} - ${exp.endDate}`, 20, yPosition);
    yPosition += 5;

    exp.achievements.forEach(achievement => {
      pdf.text(`• ${achievement}`, 25, yPosition);
      yPosition += 5;
    });
    yPosition += 3;
  });

  // Skills
  yPosition += 5;
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('TECHNICAL SKILLS', 20, yPosition);
  yPosition += 8;

  Object.entries(data.skills).forEach(([category, skills]) => {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(category, 20, yPosition);
    yPosition += 5;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(skills.join(', '), 20, yPosition);
    yPosition += 8;
  });

  // Projects
  if (yPosition > 250) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('KEY PROJECTS', 20, yPosition);
  yPosition += 8;

  data.projects.forEach(project => {
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = 20;
    }

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(project.name, 20, yPosition);
    yPosition += 5;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    yPosition = addText(project.description, 20, yPosition, 170);
    yPosition += 3;

    pdf.setFontSize(10);
    pdf.text(`Technologies: ${project.technologies.join(', ')}`, 20, yPosition);
    yPosition += 8;
  });

  // Certifications
  if (yPosition > 200) {
    pdf.addPage();
    yPosition = 20;
  }

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CERTIFICATIONS', 20, yPosition);
  yPosition += 8;

  data.certifications.forEach(cert => {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(cert.name, 20, yPosition);
    yPosition += 5;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`${cert.issuer} | ${cert.date}`, 20, yPosition);
    yPosition += 8;
  });

  pdf.save('Meet_Shah_Resume.pdf');
};

export const generateDOCXResume = async (data: ResumeData): Promise<void> => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        new Paragraph({
          text: data.personalInfo.name,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: data.personalInfo.title,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: `${data.personalInfo.email} | ${data.personalInfo.phone}`,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: `${data.personalInfo.location}`,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({
          text: `${data.personalInfo.linkedin} | ${data.personalInfo.github}`,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph({ text: "" }), // Empty line

        // Summary
        new Paragraph({
          text: "PROFESSIONAL SUMMARY",
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          text: data.summary,
        }),
        new Paragraph({ text: "" }),

        // Education
        new Paragraph({
          text: "EDUCATION",
          heading: HeadingLevel.HEADING_1,
        }),
        ...data.education.flatMap(edu => [
          new Paragraph({
            text: edu.degree,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: `${edu.institution}, ${edu.location}`,
          }),
          new Paragraph({
            text: `${edu.graduation} | GPA: ${edu.gpa}`,
          }),
          new Paragraph({ text: "" }),
        ]),

        // Experience
        new Paragraph({
          text: "PROFESSIONAL EXPERIENCE",
          heading: HeadingLevel.HEADING_1,
        }),
        ...data.experience.flatMap(exp => [
          new Paragraph({
            text: exp.title,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: `${exp.company}, ${exp.location}`,
          }),
          new Paragraph({
            text: `${exp.startDate} - ${exp.endDate}`,
          }),
          ...exp.achievements.map(achievement =>
            new Paragraph({
              text: `• ${achievement}`,
              indent: { left: 720 }, // 0.5 inch indent
            })
          ),
          new Paragraph({ text: "" }),
        ]),

        // Skills
        new Paragraph({
          text: "TECHNICAL SKILLS",
          heading: HeadingLevel.HEADING_1,
        }),
        ...Object.entries(data.skills).flatMap(([category, skills]) => [
          new Paragraph({
            text: category,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: skills.join(', '),
          }),
          new Paragraph({ text: "" }),
        ]),

        // Projects
        new Paragraph({
          text: "KEY PROJECTS",
          heading: HeadingLevel.HEADING_1,
        }),
        ...data.projects.flatMap(project => [
          new Paragraph({
            text: project.name,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: project.description,
          }),
          new Paragraph({
            text: `Technologies: ${project.technologies.join(', ')}`,
          }),
          new Paragraph({ text: "" }),
        ]),

        // Certifications
        new Paragraph({
          text: "CERTIFICATIONS",
          heading: HeadingLevel.HEADING_1,
        }),
        ...data.certifications.flatMap(cert => [
          new Paragraph({
            text: cert.name,
            heading: HeadingLevel.HEADING_2,
          }),
          new Paragraph({
            text: `${cert.issuer} | ${cert.date}`,
          }),
          new Paragraph({ text: "" }),
        ]),
      ],
    }],
  });

  const buffer = await Packer.toBuffer(doc);
  const blob = new Blob([new Uint8Array(buffer)], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Meet_Shah_Resume.docx';
  link.click();
};