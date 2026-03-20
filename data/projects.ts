export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Quantum Cloud Dashboard",
    description: "A high-performance monitoring dashboard for distributed quantum computing clusters. Real-time telemetry, resource allocation, and predictive maintenance metrics.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Recharts", "Tailwind CSS"],
    github: "https://github.com",
    live: "https://example.com",
    image: "/images/project-1.jpg"
  },
  {
    id: "2",
    title: "EcoSphere AI",
    description: "An AI-powered environmental monitoring system that predicts local air quality and water levels using historical sensor data and satellite imagery.",
    tech: ["React", "Python", "TensorFlow", "D3.js", "FastAPI"],
    github: "https://github.com",
    live: "https://example.com",
    image: "/images/project-2.jpg"
  },
  {
    id: "3",
    title: "Nexus NFT Marketplace",
    description: "A decentralized marketplace for digital collectibles featuring instant trades, low gas fees, and a sleek user interface designed for mass adoption.",
    tech: ["Next.js", "Ethers.js", "Solidity", "Tailwind CSS", "IPFS"],
    github: "https://github.com",
    live: "https://example.com",
    image: "/images/project-3.jpg"
  }
];
