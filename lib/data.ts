import type { Project, Experience, Education, Article, SkillCategory } from "./types";

export const projects: Project[] = [
  { 
    category: "LMS & EDUCATION", 
    title: "EduAble", 
    description: "Specially-abled learning platform with an automated FFmpeg captioning pipeline (n8n) and secure JWT-based video streaming.", 
    technologies: ["Next.js", "n8n", "FFmpeg", "JWT", "MongoDB"],
    year: "2026", 
    image: "/projects/edu-able.png",
    href: "https://edu-able.vercel.app/" 
  },
  {
  category: "FINTECH & AI",
  title: "NiveshIQ",
  description: "AI-powered personal finance mentor for Indian retail investors — portfolio X-Ray with true XIRR, fund overlap heatmap, tax wizard, and Money Health Score.",
  technologies: ["React", "Tailwind CSS", "Chart.js", "Gemini AI", "ExcelJS"],
  year: "2026",
  image: "/projects/niveshiq.png",
  href: "https://niveshiq-tau.vercel.app/"
},
  { 
    category: "AI & EDTECH", 
    title: "CareerPath-AI", 
    description: "Personalized AI profiling system mapping traits and skills to real-time industrial demand for demand-driven career paths.", 
    technologies: ["Next.js", "OpenAI", "PostgreSQL", "Prisma"],
    year: "2025", 
    image: "/projects/career-path.png",
    href: "https://career-path-ai-frontend.vercel.app/" 
  },
  { 
    category: "AI & ECOMMERCE", 
    title: "LuxeVault", 
    description: "AI-enhanced E-commerce platform featuring a Zepto-sourced dummy product database with 8 Gemini-powered modules and secure Razorpay integration.", 
    technologies: ["MongoDB", "Express", "React", "Node.js", "Gemini AI", "Razorpay"],
    year: "2025", 
    image: "/projects/luxevault.png",
    href: "https://ai-enhanced-e-commerce-platform.vercel.app/" 
  },
  { 
    category: "AI & WEB3", 
    title: "OpenGuild", 
    description: "AI project-matching engine with a token-based incentive economy and real-time Socket.IO features for builder communities.", 
    technologies: ["React", "Socket.IO", "Ethereum", "Solidity", "Node.js"],
    year: "2025", 
    image: "/projects/openguild.png", // Placeholder if needed
    href: "https://openguild.vercel.app/" 
  },
];

export const experiences: Experience[] = [
  { 
    dates: "2026", 
    role: "Hackathon Winner", 
    company: "CODEAUTOMATA VER. 2.0, CSMIT Panvel", 
    bullets: [
      "Secured 1st place in the intra-college hackathon competing against 90+ teams.",
      "Developed a real-time solution addressing complex automated workflows using modern tech stacks.",
      "Recognized for innovative system design and rapid implementation under high-pressure constraints."
    ] 
  }
];

export const education: Education[] = [
  { 
    institution: "Universal College of Engineering, Mumbai", 
    degree: "B.E. in Computer Engineering", 
    years: "2023 — PRESENT", 
    award: "SGPA: 9.39 (Top of Batch)" 
  },
  { 
    institution: "Annasaheb Vartak College, Vasai", 
    degree: "Higher Secondary Education (HSC/12th)", 
    years: "2021 — 2023", 
    award: "82.83%" 
  },
];

export const skillCategories: SkillCategory[] = [
  { 
    label: "LANGUAGES & FRAMEWORKS", 
    skills: ["JavaScript", "Node.js", "React.js", "Next.js", "Express.js", "MongoDB", "Socket.IO", "Java"] 
  },
  { 
    label: "CLOUD & DEVOPS", 
    skills: ["AWS (EC2, S3, IAM, Route 53)", "Docker", "Kubernetes", "Google Cloud Storage"] 
  },
  { 
    label: "APIS & AUTH", 
    skills: ["RESTful API Design", "JWT", "Google OAuth (Passport.js)", "Razorpay", "Google Gemini API"] 
  },
  { 
    label: "TOOLS", 
    skills: ["Git & GitHub", "Redis", "FFmpeg (WebAssembly)", "Postman"] 
  },
  { 
    label: "SPOKEN LANGUAGES", 
    skills: ["English", "Marathi", "Hindi", "German (Learning)"] 
  },
];

export const articles: Article[] = [
  { 
    category: "CERTIFICATION", 
    title: "AWS Solutions Architect (UDEMY)", 
    excerpt: "Certified Solutions Architect – Associate. Proficient in designing secure, resilient, and high-performing applications on AWS.", 
    readTime: "ISSUED 2025", 
    href: "" 
  },
  { 
    category: "CERTIFICATION", 
    title: "MERN Stack Development", 
    excerpt: "Completed Advanced Backend Bootcamp and Ultimate React Course, covering exhaustive full-stack system architecture.", 
    readTime: "ISSUED 2025", 
    href: "#" 
  },
  { 
    category: "AWARDS & LEADERSHIP", 
    title: "Cultural Secretary (Leadership)", 
    excerpt: "Elected as Cultural Secretary of the College Student Council, managing events for 2,000+ students and overseeing council operations.", 
    readTime: "2024 — PRESENT", 
    href: "#" 
  },
];

export const stats = [
  { num: "02+", label: "YEARS EXP" },
  { num: "150+", label: "COMMITS / MO" },
  { num: "9.39", label: "BATCH TOPPER SGPA" },
  { num: "05+", label: "PLATFORM SHIPPED" },
];
