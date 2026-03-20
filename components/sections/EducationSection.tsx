"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import type { Education } from "@/lib/types";

function EducationRow({ entry, index }: { entry: Education; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex flex-col md:flex-row justify-between items-start md:items-center py-7 md:py-10 border-b border-neutral-100 dark:border-neutral-900 transition-colors duration-500 hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 px-3 sm:px-4 -mx-3 sm:-mx-4"
        >
            {/* Left: Institution & Degree */}
            <div className="flex-1 min-w-0 pr-0 md:pr-8">
                <h3 className="font-sans font-black text-xl sm:text-2xl md:text-3xl tracking-tighter uppercase leading-tight text-black dark:text-white group-hover:text-accent transition-colors duration-300 break-words">
                    {entry.institution}
                </h3>
                <p className="font-mono text-[10px] sm:text-[11px] md:text-[12px] font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase mt-1.5 md:mt-2">
                    {entry.degree}
                </p>
            </div>

            {/* Right: Years & Award Pill */}
            <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-3 mt-4 md:mt-0 flex-shrink-0 w-full md:w-auto">
                <span className="font-mono text-[11px] sm:text-[12px] font-black tracking-widest text-neutral-300 dark:text-neutral-700 uppercase">
                    {entry.years}
                </span>
                <span className="bg-white dark:bg-transparent border border-neutral-100 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 group-hover:bg-accent group-hover:border-accent group-hover:text-black font-mono font-black text-[8px] sm:text-[9px] uppercase tracking-[0.2em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 whitespace-nowrap">
                    {entry.award}
                </span>
            </div>
        </motion.div>
    );
}

export default function EducationSection() {
    return (
        <section
            id="education"
            className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white px-5 sm:px-8 md:px-16 lg:px-24 py-20 md:py-32 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-16 md:mb-24 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center gap-4 text-neutral-400 font-mono text-[11px] font-bold tracking-[0.4em]">
                        <span>0 6</span>
                    </div>
                    <h2 className="font-sans font-black text-[clamp(48px,14vw,132px)] tracking-tighter uppercase leading-[0.75] text-black dark:text-white">
                        EDUCATION
                    </h2>
                    <div className="w-full h-[3px] bg-accent border-none mt-4 max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-lg" />
                </div>
            </div>

            {/* List Wrapper */}
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="flex flex-col">
                    {education.map((entry, i) => (
                        <EducationRow key={entry.institution} entry={entry} index={i} />
                    ))}
                </div>
            </div>

            {/* Background Watermark 06 */}
            <div className="absolute top-[40%] right-[-10%] leading-none select-none pointer-events-none z-0 overflow-hidden opacity-50 dark:opacity-100">
                <span className="font-sans font-black text-[clamp(200px,40vw,700px)] text-neutral-100/60 dark:text-neutral-900/30 transition-colors duration-700 block translate-x-[15%]">
                    06
                </span>
            </div>

            {/* Bottom Brand Line */}
            <div className="mt-20 md:mt-40 pt-8 md:pt-10 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center opacity-30">
                <div className="flex gap-8" />
            </div>
        </section>
    );
}