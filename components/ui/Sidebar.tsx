"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const sections = [
    { id: "hero", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "projects", label: "PROJECTS" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "skills", label: "SKILLS" },
    { id: "education", label: "EDUCATION" },
    { id: "writing", label: "ACCOLADES" },
    { id: "contact", label: "CONTACT" },
];

export default function Sidebar() {
    const [activeSectionId, setActiveSectionId] = useState("hero");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActiveSectionId(e.target.id)),
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );
        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const activeLabel =
        sections.find((s) => s.id === activeSectionId)?.label ?? "HOME";

    return (
        /*
         * hidden on mobile (nav is in HeroSection header instead).
         * On md+ it becomes a 16-wide fixed left rail.
         * z-40 — below modals/dropdowns (those use z-50+) but above page content.
         */
        <aside
            aria-label="Section navigation"
            className="hidden md:flex fixed left-0 top-0 bottom-0 w-16 z-40
                       flex-col items-center py-8
                       border-r border-neutral-100 dark:border-neutral-900
                       bg-white/90 dark:bg-black/90 backdrop-blur-md
                       transition-colors duration-700"
        >
            {/* ── Rotating section label ──
                The container is rotated -90°. We give it an explicit width that
                matches the sidebar height budget so it doesn't clip or overflow.
                Using `writing-mode` instead of rotate avoids the clipping issue
                with `overflow:hidden` on the parent. */}
            <div
                className="flex-none flex items-center justify-center mb-10 overflow-hidden"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", height: "96px" }}
            >
                <AnimatePresence mode="wait">
                    <motion.span
                        key={activeLabel}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="font-mono text-[9px] font-black tracking-[0.45em] text-[#BFFF00] uppercase whitespace-nowrap"
                    >
                        {activeLabel}
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* ── Nav dots ──
                Tooltip appears to the RIGHT of the dot (left-full + ml-3).
                Previous code used `left-12` which overflowed into page content
                and was invisible because `overflow:hidden` clipped it.
                We use `left-full` + a small ml so it appears just outside the sidebar. */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-4">
                {sections.map(({ id, label }) => {
                    const isActive = activeSectionId === id;
                    return (
                        <a
                            key={id}
                            href={`#${id}`}
                            aria-label={label}
                            className="group relative flex items-center justify-center w-8 h-8"
                        >
                            <motion.div
                                animate={{
                                    scale: isActive ? 1.6 : 1,
                                    backgroundColor: isActive ? "#BFFF00" : "transparent",
                                    borderColor: isActive ? "#BFFF00" : "#71717a",
                                }}
                                transition={{ duration: 0.2 }}
                                className="w-1.5 h-1.5 rounded-full border"
                                style={{ borderColor: isActive ? "#BFFF00" : undefined }}
                            />

                            {/* Tooltip — outside sidebar, never clipped */}
                            <span
                                className="pointer-events-none absolute left-full ml-3
                                           font-mono text-[9px] font-black tracking-[0.18em] uppercase
                                           text-[#BFFF00] bg-black dark:bg-neutral-950
                                           px-2 py-1 rounded-sm whitespace-nowrap
                                           opacity-0 group-hover:opacity-100
                                           translate-x-1 group-hover:translate-x-0
                                           transition-all duration-150"
                            >
                                {label}
                            </span>
                        </a>
                    );
                })}
            </nav>

            {/* ── Social icons ── */}
            <div className="mt-auto flex flex-col items-center gap-4 pt-4">
                {[
                    { href: "https://github.com/ShvetGhareWork", icon: Github, label: "GITHUB" },
                    { href: "https://www.linkedin.com/in/shvetghare1234", icon: Linkedin, label: "LINKEDIN" },
                ].map(({ href, icon: Icon, label }) => (
                    <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="group relative flex items-center justify-center w-8 h-8
                                   text-neutral-400 hover:text-[#BFFF00] transition-colors duration-200"
                    >
                        <Icon size={16} strokeWidth={1.5} />

                        <span
                            className="pointer-events-none absolute left-full ml-3
                                       font-mono text-[9px] font-black tracking-[0.18em] uppercase
                                       text-[#BFFF00] bg-black dark:bg-neutral-950
                                       px-2 py-1 rounded-sm whitespace-nowrap
                                       opacity-0 group-hover:opacity-100
                                       translate-x-1 group-hover:translate-x-0
                                       transition-all duration-150"
                        >
                            {label}
                        </span>
                    </a>
                ))}
            </div>
        </aside>
    );
}