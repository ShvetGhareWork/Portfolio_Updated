"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import type { SkillCategory } from "@/lib/types";

function SkillTag({ label }: { label: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, borderColor: "#C3E41D", color: "#C3E41D" }}
            className="font-mono text-[11px] sm:text-[12px] md:text-[13px] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 text-neutral-600 dark:text-neutral-400 cursor-default transition-colors duration-300"
        >
            {label}
        </motion.div>
    );
}

function CategoryBlock({ category, index }: { category: SkillCategory; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col"
        >
            <h3 className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-accent font-black mb-4 md:mb-6">
                {category.label}
            </h3>
            <div className="flex flex-wrap gap-2 md:gap-3">
                {category.skills.map((skill) => (
                    <SkillTag key={skill} label={skill} />
                ))}
            </div>
        </motion.div>
    );
}

export default function SkillsSection() {
    return (
        <section
            id="skills"
            className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white px-5 sm:px-8 md:px-16 lg:px-24 py-20 md:py-32 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-16 md:mb-24 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center gap-4 text-neutral-400 font-mono text-[11px] font-bold tracking-[0.4em]">
                        <span>0 5</span>
                    </div>
                    {/* 
                        Use viewport-relative sizing that matches the screenshot:
                        ~400px wide heading at ~1500px viewport = ~27vw
                        On mobile we allow it to be large (min 64px) so it fills width
                    */}
                    <h2 className="font-sans font-black text-[clamp(64px,18vw,160px)] tracking-tighter uppercase leading-[0.75] text-black dark:text-white">
                        SKILLS
                    </h2>
                    <div className="w-full h-[3px] bg-accent border-none mt-4 max-w-[240px] sm:max-w-xs md:max-w-sm" />
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 md:gap-x-16 lg:gap-x-20 gap-y-10 md:gap-y-16 max-w-7xl mx-auto w-full relative z-10">
                {skillCategories.map((cat, i) => (
                    <CategoryBlock key={cat.label} category={cat} index={i} />
                ))}
            </div>

            {/* Background Watermark 05 */}
            <div className="absolute bottom-[-5%] right-[-5%] leading-none select-none pointer-events-none z-0 overflow-hidden opacity-50 dark:opacity-100">
                <span className="font-sans font-black text-[clamp(200px,38vw,600px)] text-neutral-100/60 dark:text-neutral-900/20 transition-colors duration-700 block translate-x-[15%] translate-y-[15%]">
                    05
                </span>
            </div>

            {/* Footer Brand Line */}
            <div className="mt-20 md:mt-40 pt-8 md:pt-10 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center opacity-30">
                <div className="flex gap-8" />
            </div>
        </section>
    );
}