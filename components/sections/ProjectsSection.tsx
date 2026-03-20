"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

const categories = ["ALL PROJECTS", "LMS & EDUCATION", "AI & EDTECH", "AI & WEB3", "AI & E-COMMERCE"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.a
            layout="position"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{
                opacity: { duration: 0.6, ease: "easeInOut" },
                y: { duration: 0.8, ease: [22, 10, 36, 1], delay: index * 0.06 },
                scale: { duration: 0.5, ease: "easeInOut" },
            }}
            href={project.href ?? "#"}
            className="group flex flex-col bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 p-5 sm:p-6 md:p-8 transition-all duration-700 hover:border-accent hover:bg-white dark:hover:bg-neutral-900"
        >
            <div className="flex justify-between items-start mb-4 sm:mb-6">
                <span className="bg-accent text-black font-mono font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 flex items-center justify-center">
                    {project.category}
                </span>
            </div>

            <h3 className="font-sans font-black text-xl sm:text-2xl md:text-3xl leading-none tracking-tighter uppercase mb-3 sm:mb-4 text-black dark:text-white group-hover:text-accent transition-colors duration-300">
                {project.title}
            </h3>

            <p className="font-sans text-[13px] sm:text-[14px] md:text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium flex-1 mb-6 sm:mb-8">
                {project.description}
            </p>

            <div className="mt-auto pt-4 sm:pt-6 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center group-hover:border-accent/30 transition-colors duration-300">
                <span className="font-mono text-[11px] font-bold text-neutral-400 dark:text-neutral-600 tracking-widest">
                    {project.year}
                </span>
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-neutral-100 dark:border-neutral-800 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300">
                    <ArrowUpRight size={16} strokeWidth={2.5} className="sm:hidden" />
                    <ArrowUpRight size={18} strokeWidth={2.5} className="hidden sm:block" />
                </div>
            </div>
        </motion.a>
    );
}

export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState("ALL PROJECTS");

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
                <div className="flex flex-col gap-4 sm:gap-6">
                    <div className="flex items-center gap-4 text-neutral-400 font-mono text-[11px] font-bold tracking-[0.4em]">
                        <span>0 3</span>
                    </div>
                    <h2 className="font-sans font-black text-[52px] sm:text-[72px] md:text-[96px] lg:text-[112px] xl:text-[128px] tracking-tighter uppercase leading-[0.85] text-black dark:text-white">
                        PROJECTS
                    </h2>
                    <div className="w-full h-[3px] bg-accent border-none mt-4 max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-lg" />
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
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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