"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, FileText } from "lucide-react";

const socials = [
    { icon: Github, label: "GITHUB", href: "https://github.com/ShvetGhareWork" },
    { icon: Linkedin, label: "LINKEDIN", href: "https://www.linkedin.com/in/shvetghare1234" },
    { icon: FileText, label: "RESUME", href: "/Shvet_Resume.pdf" },
];

export default function ContactSection() {
    const [copied, setCopied] = useState(false);

    return (
        <section
            id="contact"
            className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-16 lg:px-24 pt-20 pb-32 sm:pt-24 sm:pb-36 md:pt-28 md:pb-40 overflow-hidden"
        >
            {/* Header Breadcrumb */}

            {/* Massive Heading */}
            <div className="flex flex-col items-center w-full max-w-7xl mx-auto z-10">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-sans font-black text-[clamp(2.8rem,10vw,11rem)] leading-[0.88] tracking-tighter uppercase text-black dark:text-accent w-full"
                >
                    LET'S WORK<br />TOGETHER
                </motion.h2>
            </div>

            {/* Subline */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="font-sans text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-neutral-500 dark:text-neutral-400 mt-6 sm:mt-8 md:mt-12 max-w-[280px] sm:max-w-sm md:max-w-xl leading-relaxed font-medium z-10"
            >
                Open to freelance, full-time, and collaborations.
                <br className="hidden xs:block" />
                <span className="block mt-1 sm:mt-2">
                    Contact:{" "}
                    <a
                        href="mailto:shvetgharework@gmail.com"
                        className="text-black dark:text-white hover:underline underline-offset-2 transition-all"
                    >
                        shvetgharework@gmail.com
                    </a>
                    <span className="mx-1 opacity-40">|</span>
                    <a
                        href="tel:+917249832504"
                        className="text-black dark:text-white hover:underline underline-offset-2 transition-all"
                    >
                        +91 7249832504
                    </a>
                </span>
            </motion.p>

            {/* Email CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-8 sm:mt-10 md:mt-12 z-10 flex flex-col items-center gap-4"
            >
                <button
                    onClick={() => {
                        // Copy first to avoid focus loss errors
                        navigator.clipboard.writeText("shvetgharework@gmail.com").then(() => {
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                            // Then open mailto
                            window.location.href = "mailto:shvetgharework@gmail.com";
                        }).catch((err) => {
                            console.error("Clipboard error:", err);
                        });
                    }}
                    className="inline-block bg-accent text-black font-mono font-black text-[10px] sm:text-xs tracking-[0.2em] px-8 sm:px-10 md:px-12 py-4 sm:py-5 uppercase transition-all duration-200 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000000] sm:hover:shadow-[10px_10px_0_0_#000000] dark:hover:shadow-[6px_6px_0_0_#ffffff] dark:sm:hover:shadow-[10px_10px_0_0_#ffffff]"
                >
                    {copied ? "EMAIL COPIED!" : "SEND AN EMAIL"}
                </button>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest opacity-50">
                    Clicks to open & copies address
                </p>
            </motion.div>

            {/* Social Icons */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex justify-center gap-8 sm:gap-10 md:gap-14 mt-12 sm:mt-16 md:mt-20 items-center z-10"
            >
                {socials.map(({ icon: Icon, label, href }) => (
                    <a
                        key={label}
                        href={href}
                        title={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2 md:gap-3 text-neutral-400 dark:text-neutral-600 hover:text-black dark:hover:text-accent transition-all duration-300"
                    >
                        <Icon
                            size={20}
                            strokeWidth={1.5}
                            className="group-hover:scale-110 transition-transform sm:w-[18px] sm:h-[18px]"
                        />
                        <span className="font-mono text-[9px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline-block">
                            {label}
                        </span>
                    </a>
                ))}
            </motion.div>

            {/* Background Watermark 08 */}
            <div className="absolute top-[60%] sm:top-[65%] md:top-[60%] left-1/2 -translate-x-1/2 leading-none select-none pointer-events-none z-0 overflow-hidden opacity-10 dark:opacity-20 transition-opacity duration-700">
                <span className="font-sans font-black text-[80px] sm:text-[130px] md:text-[200px] lg:text-[280px] text-neutral-200 dark:text-neutral-900 whitespace-nowrap transition-colors duration-700">
                    08
                </span>
            </div>

            {/* Footer */}
            <div className="mt-20 md:mt-32 w-full px-5 sm:px-8 md:px-16 lg:px-24 py-10 sm:py-12 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-0 z-20 bg-white/95 dark:bg-black/95 backdrop-blur-md transition-all duration-700">

                {/* Brand */}
                <div className="flex flex-col items-center sm:items-start gap-1">
                    <span className="font-sans font-black text-xl sm:text-2xl md:text-3xl tracking-[-0.05em] uppercase text-accent">
                        SIMPLISTIC
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.4em] font-black">
                        © 2026 SHVET GHARE
                    </span>
                </div>

                {/* Credit — only shown on md+ */}
                <p className="hidden md:block font-mono text-[10px] uppercase tracking-[0.5em] text-neutral-300 dark:text-neutral-700 font-black">
                    DESIGNED & BUILT WITH PRECISION
                </p>

                {/* Nav Links */}
                <div className="flex gap-8 sm:gap-10 md:gap-12">
                    {[
                        { label: "LINKEDIN", href: "https://www.linkedin.com/in/shvetghare1234" },
                        { label: "GITHUB", href: "https://github.com/ShvetGhareWork" },
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative font-mono text-[10px] font-black tracking-widest text-neutral-400 hover:text-accent transition-all duration-300"
                        >
                            <span className="relative z-10">{item.label}</span>
                            <span className="absolute bottom-[-1px] left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}