"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
    { id: "hero", label: "01 HOME" },
    { id: "about", label: "02 ABOUT" },
    { id: "projects", label: "03 PROJECTS" },
    { id: "experience", label: "04 EXPERIENCE" },
    { id: "skills", label: "05 SKILLS" },
    { id: "education", label: "06 EDUCATION" },
    { id: "writing", label: "07 ACHIEVEMENTS" },
    { id: "contact", label: "08 CONTACT" },
];

export default function Sidebar() {
    const [activeSectionId, setActiveSectionId] = useState("hero");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSectionId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const activeLabel = sections.find(s => s.id === activeSectionId)?.label || "HOME";

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-16 border-r border-neutral-100 dark:border-neutral-900 bg-white dark:bg-black transition-colors duration-700 hidden md:flex flex-col items-center py-12 z-[100]">
            {/* Dynamic Vertical Text */}
            <div className="flex-none -rotate-90 origin-center whitespace-nowrap mb-20 translate-y-24">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={activeLabel}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="font-mono text-[10px] font-black tracking-[0.5em] text-accent uppercase inline-block"
                    >
                        {activeLabel}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* Navigation Dots System */}
            <div className="flex-1 flex flex-col items-center justify-center gap-5">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="group relative flex items-center justify-center p-2"
                        title={section.label}
                    >
                        <motion.div
                            animate={{
                                scale: activeSectionId === section.id ? 1.5 : 1,
                                backgroundColor: activeSectionId === section.id ? "#C3E41D" : "transparent",
                                borderColor: activeSectionId === section.id ? "#C3E41D" : "#888",
                            }}
                            className={`w-1.5 h-1.5 rounded-full border border-neutral-300 dark:border-neutral-800 transition-colors duration-300 group-hover:border-accent`}
                        />
                        {/* Tooltip Label (Optional, matches Monolith aesthetic) */}
                        <span className="absolute left-10 font-mono text-[9px] font-black tracking-widest text-accent opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black px-2 py-1 rounded-sm">
                            {section.label}
                        </span>
                    </a>
                ))}
            </div>

            {/* Year Indicator */}
            <div className="mt-auto">
                <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-800 rotate-90 inline-block font-black tracking-widest">2026</span>
            </div>
        </aside>
    );
}
