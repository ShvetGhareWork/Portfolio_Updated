export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    role: "Senior Frontend Engineer",
    company: "Stark Industries",
    period: "2023 - Present",
    description: [
      "Architected and implemented a next-generation UI component library used across multiple autonomous systems.",
      "Optimized rendering performance for real-time telemetry displays by 40%.",
      "Mentored junior developers and led workshops on modern React patterns."
    ]
  },
  {
    id: "2",
    role: "Full Stack Developer",
    company: "Wayne Enterprises",
    period: "2021 - 2023",
    description: [
      "Developed robust backend services for asset tracking and logistics management.",
      "Implemented secure, encrypted communication protocols for internal tools.",
      "Collaborated with cross-functional teams to deliver critical infrastructure updates."
    ]
  },
  {
    id: "3",
    role: "Junior Web Developer",
    company: "Cyberdyne Systems",
    period: "2019 - 2021",
    description: [
      "Built responsive web interfaces for system diagnostic tools.",
      "Maintained and updated legacy codebases to modern standards.",
      "Assisted in the design and implementation of automated testing suites."
    ]
  }
];
