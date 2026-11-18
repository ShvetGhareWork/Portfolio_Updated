import type { Project, Experience, Education, Article, SkillCategory } from "./types";

export const projects: Project[] = [
  {
    category: "DISTRIBUTED SYSTEMS",
    title: "Self-Healing Microservice Architecture",
    description: "Fault-tolerant microservice architecture featuring automated fault detection, health monitoring, dynamic rerouting, and self-healing mechanisms.",
    technologies: ["Spring Boot", "Docker", "Kafka", "Redis", "Resilience4j", "Java"],
    year: "2026",
    image: "/projects/self-healing.png",
    href: "https://github.com/ShvetGhareWork/Self-Healing-Microservice-Architecture",
    theme: "lime"
  },
  {
    category: "DISTRIBUTED SYSTEMS",
    title: "Ticketizer",
    description: "High-concurrency distributed ticket engine featuring Spring Boot, Redis Lua locks, Kafka streams, JWT auth, Razorpay payments, and inline QR generation.",
    technologies: ["Spring Boot", "Redis", "Kafka", "JWT", "Razorpay", "Java", "Lua"],
    year: "2026",
    image: "/projects/ticketizer.png",
    href: "https://github.com/ShvetGhareWork/Ticketizer",
    theme: "cyan"
  },
  {
    category: "SYSTEMS & AI",
    title: "ZeroGrid",
    description: "Autonomous off-grid rescue coordination engine engineered for extreme Indian monsoons — powered by Native Android BLE 5.0 / Wi-Fi Direct P2P mesh and AWS ECS Fargate running Amazon Bedrock AI.",
    technologies: ["Android BLE 5.0", "Wi-Fi Direct", "AWS Fargate", "Bedrock AI", "Next.js", "TypeScript"],
    year: "2026",
    image: "/projects/zerogrid.png",
    href: "https://master.dyb9dpeoxofx1.amplifyapp.com/",
    liveUrl: "https://master.dyb9dpeoxofx1.amplifyapp.com/",
    theme: "lime"
  },
  {
    category: "SYSTEMS & AI",
    title: "Atlas",
    description: "Event-driven microservices platform for supply chain & logistics — built with Spring Boot, Apache Kafka, Redis, and Python FastAPI. Features async order processing, AI-powered delivery prediction, JWT security, CI/CD via GitHub Actions, and Kubernetes deployment on AWS EKS.",
    technologies: ["Spring Boot", "Apache Kafka", "Redis", "FastAPI", "Python", "Kubernetes", "AWS EKS", "JWT", "GitHub Actions"],
    year: "2026",
    image: "/projects/atlas.png",
    href: "https://github.com/ShvetGhareWork/Atlas",
    theme: "cyan"
  },
  {
    category: "FINTECH & AI",
    title: "NiveshIQ",
    description: "AI-powered personal finance mentor for Indian retail investors — portfolio X-Ray with true XIRR, fund overlap heatmap, tax wizard, and Money Health Score.",
    technologies: ["React", "Tailwind CSS", "Chart.js", "Gemini AI", "ExcelJS"],
    year: "2026",
    image: "/projects/niveshiq.png",
    href: "https://niveshiq-tau.vercel.app/",
    liveUrl: "https://niveshiq-tau.vercel.app/",
    theme: "cyan"
  },
  { 
    category: "HEALTH & AI", 
    title: "NutriSnap", 
    description: "High-performance health and fitness ecosystem bridging members and pro coaches through real-time tracking, Groq-powered nutritional analysis, and secure Razorpay integration.", 
    technologies: ["Next.js", "Node.js", "MongoDB", "Gemini AI", "Razorpay", "Cloudinary"],
    year: "2026", 
    image: "/projects/nutrisnap.png",
    href: "https://nutrisnap-eight.vercel.app/",
    liveUrl: "https://nutrisnap-eight.vercel.app/",
    theme: "lime"
  },
  { 
    category: "LMS & EDUCATION", 
    title: "EduAble", 
    description: "Specially-abled learning platform with an automated FFmpeg captioning pipeline (n8n) and secure JWT-based video streaming.", 
    technologies: ["Next.js", "n8n", "FFmpeg", "JWT", "MongoDB"],
    year: "2026", 
    image: "/projects/edu-able.png",
    href: "https://edu-able.vercel.app/",
    liveUrl: "https://edu-able.vercel.app/",
    theme: "lime"
  },
  { 
    category: "AI & EDTECH", 
    title: "CareerPath-AI", 
    description: "Personalized AI profiling system mapping traits and skills to real-time industrial demand for demand-driven career paths.", 
    technologies: ["Next.js", "OpenAI", "PostgreSQL", "Prisma"],
    year: "2025", 
    image: "/projects/career-path.png",
    href: "https://career-path-ai-frontend.vercel.app/",
    liveUrl: "https://career-path-ai-frontend.vercel.app/",
    theme: "cyan"
  },
  { 
    category: "AI & ECOMMERCE", 
    title: "LuxeVault", 
    description: "AI-enhanced E-commerce platform featuring a Zepto-sourced dummy product database with 8 Gemini-powered modules and secure Razorpay integration.", 
    technologies: ["MongoDB", "Express", "React", "Node.js", "Gemini AI", "Razorpay"],
    year: "2025", 
    image: "/projects/luxevault.png",
    href: "https://ai-enhanced-e-commerce-platform.vercel.app/",
    liveUrl: "https://ai-enhanced-e-commerce-platform.vercel.app/",
    theme: "lime"
  },
  { 
    category: "AI & WEB3", 
    title: "OpenGuild", 
    description: "AI project-matching engine with a token-based incentive economy and real-time Socket.IO features for builder communities.", 
    technologies: ["React", "Socket.IO", "Ethereum", "Solidity", "Node.js"],
    year: "2025", 
    image: "/projects/openguild.png",
    href: "https://openguild.vercel.app/",
    liveUrl: "https://openguild.vercel.app/",
    theme: "cyan"
  },
];

export const experiences: Experience[] = [
  {
    dates: "FEB 2026 — PRESENT",
    role: "Full-Stack Developer & Project Lead",
    company: "EduAble  ·  Hackathon Project",
    bullets: [
      "Reduced caption setup time by ~80% by engineering an automated pipeline — n8n webhooks + FFmpeg — that extracts audio and generates SRT subtitle files on every upload, eliminating all manual captioning effort.",
      "Designed and deployed a full-stack LMS serving students across 3 disability categories (visual, hearing, cognitive), featuring accessible video streaming, AI-generated transcripts, and JWT-secured authentication — reducing content accessibility barriers for 100+ users.",
      "Awarded 1st Place at CODE AUTOMATA VER. 2.0 (CSMIT Panvel) among 40+ competing teams, recognized for technical innovation in AI-driven accessibility and real-world social impact."
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
    label: "LANGUAGES",
    skills: ["JavaScript", "Java", "Python", "C"]
  },
  {
    label: "FRAMEWORKS & LIBRARIES",
    skills: ["Node.js", "React.js", "Next.js", "Express.js", "Spring Boot"]
  },
  {
    label: "DATABASES & MESSAGING",
    skills: ["MongoDB", "PostgreSQL", "Redis", "Apache Kafka"]
  },
  {
    label: "CLOUD & DEVOPS",
    skills: ["AWS (EC2, S3, IAM, Route 53)", "Docker", "Google Cloud Storage", "GitHub Actions", "Prometheus", "Grafana", "Zipkin"]
  },
  {
    label: "APIS & AUTH",
    skills: ["RESTful API Design", "JWT", "Google OAuth (Passport.js)", "HMAC-SHA256", "Razorpay"]
  },
  {
    label: "TOOLS",
    skills: ["Git & GitHub", "Postman", "Maven", "Lua Scripting", "FFmpeg", "n8n"]
  },
  {
    label: "SPOKEN LANGUAGES",
    skills: ["English", "Marathi", "Hindi", "German (Learning)"]
  },
];

export const articles: Article[] = [
  {
    category: "CERTIFICATION",
    title: "AWS Certified Solutions Architect – Associate",
    excerpt: "Proficient in designing secure, resilient, and high-performing applications on AWS (EC2, S3, IAM, Route 53, EKS). Issued via Udemy.",
    readTime: "ISSUED 2025",
    href: ""
  },
  {
    category: "CERTIFICATION",
    title: "Backend Bootcamp + Ultimate React Course",
    excerpt: "Completed Advanced Backend Bootcamp and Ultimate React Course, covering exhaustive full-stack system architecture and modern React patterns.",
    readTime: "ISSUED 2025",
    href: "#"
  },
  {
    category: "CERTIFICATION",
    title: "Intro to Docker · MongoDB Basics · AWS Cloud Practitioner Essentials",
    excerpt: "Hands-on certifications covering containerisation with Docker, NoSQL with MongoDB, and foundational cloud services on AWS.",
    readTime: "ISSUED 2025",
    href: "#"
  },
  {
    category: "AWARDS & LEADERSHIP",
    title: "Hackathon Winner — CODE AUTOMATA VER. 2.0",
    excerpt: "Secured 1st Place at CSMIT Panvel among 50+ teams, recognised for technical innovation in AI-driven accessibility with EduAble LMS.",
    readTime: "2026",
    href: "#"
  },
  {
    category: "AWARDS & LEADERSHIP",
    title: "Cultural Secretary — College Student Council",
    excerpt: "Elected Cultural Secretary at Universal College of Engineering, managing large-scale cultural events and overseeing council operations.",
    readTime: "2024 — PRESENT",
    href: "#"
  },
  {
    category: "AWARDS & LEADERSHIP",
    title: "LeetCode — 360+ Problems Solved",
    excerpt: "Consistently solved 360+ problems across LinkedLists, Dynamic Programming, Graphs, Trees, and Arrays — sharpening algorithmic thinking and DSA fundamentals.",
    readTime: "ONGOING",
    href: "#leetcode"
  },
];

export const stats = [
  { num: "9.39", label: "SGPA · TOP 5–10%" },
  { num: "360+", label: "LEETCODE PROBLEMS" },
  { num: "08+", label: "PLATFORMS SHIPPED" },
  { num: "01", label: "HACKATHON WIN" },
];
