export interface Project {
  category: string;
  title: string;
  description: string;
  year: string;
  href?: string;
}

export interface Experience {
  dates: string;
  role: string;
  company: string;
  bullets: string[];
}

export interface Education {
  institution: string;
  degree: string;
  years: string;
  award: string;
}

export interface Article {
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  href?: string;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}
