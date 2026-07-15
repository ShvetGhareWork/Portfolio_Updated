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
    id: "4",
    title: "Atlas",
    description: "Event-driven microservices platform for supply chain & logistics — built with Spring Boot, Apache Kafka, Redis, and Python FastAPI. Features async order processing, AI-powered delivery prediction, JWT security, CI/CD via GitHub Actions, and Kubernetes deployment on AWS EKS.",
    tech: ["Spring Boot", "Apache Kafka", "Redis", "FastAPI", "Python", "Kubernetes", "AWS EKS", "JWT", "GitHub Actions"],
    github: "https://github.com/ShvetGhareWork/Atlas",
    live: "https://github.com/ShvetGhareWork/Atlas",
    image: "/projects/atlas.png"
  },
  {
    id: "5",
    title: "Ticketizer",
    description: "High-concurrency distributed ticket engine featuring Spring Boot, Redis Lua locks, Kafka streams, JWT auth, Razorpay payments, and inline QR generation.",
    tech: ["Spring Boot", "Redis", "Kafka", "JWT", "Razorpay", "Java", "Lua"],
    github: "https://github.com/ShvetGhareWork/Ticketizer",
    live: "https://github.com/ShvetGhareWork/Ticketizer",
    image: "/projects/ticketizer.png"
  },
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
