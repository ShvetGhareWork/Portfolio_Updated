"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

function ProjectCard({ project }: { project: Project }) {
  const isGithub = project.href?.includes("github.com");
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      }}
      href={project.href ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-900 transition-all duration-500 hover:border-accent hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_32px_rgba(195,228,29,0.05)] overflow-hidden"
    >
      <div>
        {/* Visual Thumbnail */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-200 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-900">
          {project.image && !imgError ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-black">
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                Preview Unavailable
              </span>
            </div>
          )}

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

          {/* Top-Left Category Tag */}
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="bg-accent text-black font-mono font-black text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 shadow-sm">
              {project.category}
            </span>
          </div>

          {/* Top-Right Live/Repo Indicator */}
          <div className="absolute top-3.5 right-3.5 z-10">
            {isGithub ? (
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 bg-black/75 dark:bg-black/90 text-neutral-200 border border-neutral-700/60 backdrop-blur-md">
                <Github size={11} />
                SOURCE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-wider px-2.5 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 backdrop-blur-md shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE SITE
              </span>
            )}
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-5 sm:p-6 flex flex-col">
          <div className="flex justify-between items-start mb-2.5">
            <h3 className="font-sans font-black text-xl sm:text-2xl leading-tight tracking-tight uppercase text-black dark:text-white group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          <p className="font-sans text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal mb-5 line-clamp-3">
            {project.description}
          </p>

          {/* Technologies Badges */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800/80 px-2 py-0.5 uppercase tracking-wide group-hover:border-accent/30 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="font-mono text-[9px] font-bold text-neutral-400 dark:text-neutral-500 px-1 py-0.5 uppercase">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="px-5 sm:px-6 py-3.5 border-t border-neutral-200 dark:border-neutral-900 bg-neutral-100/40 dark:bg-neutral-950/40 flex justify-between items-center group-hover:border-accent/30 transition-colors duration-300">
        <span className="font-mono text-[10px] font-bold text-neutral-400 dark:text-neutral-500 tracking-widest uppercase">
          {project.year} • {isGithub ? "REPOSITORY" : "PRODUCTION"}
        </span>

        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
          <span>VIEW</span>
          <div className="w-6 h-6 flex items-center justify-center rounded-none bg-neutral-200 dark:bg-neutral-800 group-hover:bg-accent group-hover:text-black transition-all duration-300">
            <ArrowUpRight
              size={13}
              strokeWidth={2.5}
              className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("ALL PROJECTS");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["ALL PROJECTS", ...cats];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL PROJECTS") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white px-5 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 md:py-32 overflow-hidden"
    >
      {/* Background Watermark 02 */}
      <div className="absolute bottom-[-5%] right-[-5%] leading-none select-none pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-80">
        <span className="font-sans font-black text-[clamp(200px,38vw,700px)] text-neutral-100 dark:text-neutral-900/30 transition-colors duration-700 block translate-x-[15%]">
          02
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4 flex items-center gap-2"
          >
            <span>02 / SELECTED WORK</span>
            <span className="inline-block w-2 h-2 rounded-full bg-accent" />
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-sans font-black text-[clamp(44px,10vw,110px)] tracking-tighter uppercase leading-[0.8] text-black dark:text-white">
                FEATURED
              </h2>
              <h3 className="font-sans font-black text-[clamp(32px,7vw,75px)] tracking-tighter uppercase leading-[0.85] text-accent mt-2">
                PROJECTS
              </h3>
            </div>
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest max-w-xs text-left sm:text-right">
              Architecting high-concurrency backends, distributed systems & AI products
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-8 sm:mt-12 overflow-x-auto scrollbar-none pb-2 border-b border-neutral-200 dark:border-neutral-900">
            <div className="flex items-center gap-2 min-w-max">
              {categories.map((cat) => {
                const count =
                  cat === "ALL PROJECTS"
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-mono text-[10px] uppercase tracking-wider px-3.5 py-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "bg-accent text-black font-black shadow-sm"
                        : "bg-neutral-100/80 dark:bg-neutral-900/60 text-neutral-500 hover:text-black dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800/60"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[8px] font-bold px-1.5 py-0.2 ${
                        isActive
                          ? "bg-black/20 text-black"
                          : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects Responsive Grid (Spacious, clean gap-6 / gap-8) */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
