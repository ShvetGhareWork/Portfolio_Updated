"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

export default function ExperienceSection() {
    return (
        <section
            id="experience"
            className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white px-5 sm:px-8 md:px-16 lg:px-24 py-20 md:py-32 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-16 md:mb-24 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center gap-4 text-neutral-400 font-mono text-[11px] font-bold tracking-[0.4em]">
                        <span>0 4</span>
                    </div>
                    <h2 className="font-sans font-black text-[clamp(52px,12vw,140px)] tracking-tighter uppercase leading-[0.75] text-black dark:text-white">
                        EXPERIENCE
                    </h2>
                    <div className="w-full h-[3px] bg-accent border-none mt-4 max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-lg" />
                </div>
            </div>

            {/* Timeline Wrapper */}
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="relative">
                    {/* Vertical line — starts after the date column on md+ */}
                    <div className="absolute left-[100px] sm:left-[120px] md:left-[135px] top-4 bottom-0 w-px bg-neutral-100 dark:bg-neutral-900 hidden md:block" />

                    <div className="flex flex-col gap-12 md:gap-24">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="group flex flex-col md:flex-row relative"
                            >
                                {/* Left side: Dates */}
                                <div className="md:w-[120px] md:flex-shrink-0 mb-3 md:mb-0">
                                    <span className="font-mono text-[10px] sm:text-[11px] font-black tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                                        {exp.dates}
                                    </span>
                                </div>

                                {/* Timeline Node */}
                                <div className="hidden md:flex absolute left-[135px] -translate-x-1/2 top-1.5 z-20 items-center justify-center">
                                    <div className="w-2.5 h-2.5 bg-accent dark:bg-accent rotate-45 transform transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(195,228,29,0.5)]" />
                                </div>

                                {/* Mobile timeline dot */}
                                <div className="md:hidden flex items-center gap-3 mb-3">
                                    <div className="w-2 h-2 bg-accent rotate-45 flex-shrink-0" />
                                    <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
                                </div>

                                {/* Right side: Content */}
                                <div className="md:pl-20 flex-1 min-w-0">
                                    <h3 className="font-sans font-black text-[clamp(22px,5vw,48px)] tracking-tighter uppercase leading-none mb-2 md:mb-3 text-black dark:text-white group-hover:text-accent transition-colors duration-300">
                                        {exp.role}
                                    </h3>
                                    <p className="font-mono text-[11px] sm:text-[12px] md:text-[13px] font-black tracking-[0.2em] text-accent uppercase mb-5 md:mb-8">
                                        {exp.company}
                                    </p>

                                    <ul className="space-y-3 md:space-y-4 w-full max-w-3xl">
                                        {exp.bullets.map((bullet, j) => (
                                            <li
                                                key={j}
                                                className="flex gap-3 md:gap-4 font-body text-[14px] md:text-[15px] lg:text-[16px] text-neutral-500 dark:text-neutral-400 leading-relaxed group/item transition-colors"
                                            >
                                                <span className="text-accent font-mono font-black mt-1 flex-shrink-0 transition-transform group-hover/item:translate-x-1">
                                                    —
                                                </span>
                                                <span className="group-hover/item:text-black dark:group-hover/item:text-white transition-colors duration-300 break-words min-w-0">
                                                    {bullet}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Watermark 04 — clipped so it never causes overflow */}
            <div className="absolute top-[40%] right-[-5%] leading-none select-none pointer-events-none z-0 overflow-hidden opacity-50 dark:opacity-100">
                <span className="font-sans font-black text-[clamp(150px,35vw,600px)] text-neutral-100/60 dark:text-neutral-900/20 transition-colors duration-700 block translate-x-[10%]">
                    04
                </span>
            </div>

            {/* Bottom Brand Line */}
            <div className="mt-20 md:mt-32 pt-10 md:pt-20 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-end opacity-50">
                <div className="flex flex-col gap-2" />
                <div className="text-right" />
            </div>
        </section>
    );
}