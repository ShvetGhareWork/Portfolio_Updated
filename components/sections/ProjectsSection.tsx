"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

const categories = ["ALL PROJECTS", "HEALTH & AI", "LMS & EDUCATION", "AI & EDTECH", "AI & WEB3", "AI & ECOMMERCE", "FINTECH & AI"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.a
            layout
            initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
                opacity: { duration: 0.4 },
                filter: { duration: 0.4 }
            }}
            href={project.href ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 transition-colors duration-500 hover:border-accent hover:bg-white dark:hover:bg-neutral-950 overflow-hidden"
        >
            {/* Visual Thumbnail */}
            <div className="relative w-full aspect-video overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-black">
                        <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">No Preview</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Category Tag Overlay */}
                <div className="absolute top-4 left-4">
                    <span className="bg-accent text-black font-mono font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 backdrop-blur-md">
                        {project.category}
                    </span>
                </div>
            </div>

            <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-sans font-black text-xl sm:text-2xl leading-tight tracking-tighter uppercase text-black dark:text-white group-hover:text-accent transition-colors duration-300">
                        {project.title}
                    </h3>
                </div>

                <p className="font-sans text-[12px] sm:text-[13px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium mb-6">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="font-mono text-[8px] font-bold text-neutral-400 dark:text-neutral-500 border border-neutral-100 dark:border-neutral-800 px-1.5 py-0.5 uppercase tracking-wider group-hover:border-accent/30 transition-colors duration-300"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="font-mono text-[8px] font-bold text-neutral-500 border border-transparent px-1.5 py-0.5 uppercase">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>

                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center group-hover:border-accent/30 transition-colors duration-300">
                    <span className="font-mono text-[10px] font-bold text-neutral-400 dark:text-neutral-600 tracking-widest">
                        {project.year}
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-neutral-100 dark:border-neutral-800 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300">
                        <ArrowUpRight size={14} strokeWidth={2.5} />
                    </div>
                </div>
            </div>
        </motion.a>
    );
}

export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState("ALL PROJECTS");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const filteredProjects = activeCategory === "ALL PROJECTS"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section
            id="projects"
            className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white px-5 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 md:py-32 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-12 sm:mb-16 md:mb-20 max-w-7xl mx-auto w-full">
                {/* Section Label */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-6"
                >
                    02 / PROJECTS
                </motion.p>
                <div className="flex flex-col gap-4 sm:gap-6">
                    <h2 className="font-sans font-black text-[52px] sm:text-[72px] md:text-[96px] lg:text-[112px] xl:text-[128px] tracking-tighter uppercase leading-[0.85] text-black dark:text-white">
                        PROJECTS
                    </h2>
                </div>

                {/* Filter Tabs — horizontally scrollable on mobile */}
                <div className="mt-10 sm:mt-16 -mx-5 sm:mx-0 px-5 sm:px-0 overflow-x-auto scrollbar-none">
                    <div className="flex gap-6 sm:gap-8 md:gap-12 min-w-max sm:min-w-0 sm:flex-wrap pb-4 border-b border-neutral-100 dark:border-neutral-900">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative font-mono text-[10px] font-black tracking-[0.2em] uppercase transition-colors duration-200 pb-4 whitespace-nowrap ${activeCategory === cat
                                    ? "text-black dark:text-white"
                                    : "text-neutral-300 dark:text-neutral-700 hover:text-neutral-500 dark:hover:text-neutral-400"
                                    }`}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filteredProjects.map((project, i) => (
                            <ProjectCard key={project.title} project={project} index={i} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Background Watermark 03 */}
            <div className="absolute bottom-[-5%] right-[-5%] leading-none select-none pointer-events-none z-0 overflow-hidden opacity-50 dark:opacity-100">
                <span className="font-sans font-black text-[clamp(200px,40vw,800px)] text-neutral-100/60 dark:text-neutral-900/40 transition-colors duration-700 block translate-x-[15%]">
                    03
                </span>
            </div>
        </section>
    );
}