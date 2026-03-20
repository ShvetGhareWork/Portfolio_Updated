export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux", "Three.js"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL", "Prisma", "Redis"]
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "Docker", "AWS", "GitHub Actions", "Vercel", "Figma", "Postman"]
  }
];
