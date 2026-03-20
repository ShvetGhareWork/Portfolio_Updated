"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, FileText } from "lucide-react";

const socials = [
    { icon: Github, label: "GITHUB", href: "https://github.com/ShvetGhareWork" },
    { icon: Linkedin, label: "LINKEDIN", href: "https://www.linkedin.com/in/shvetghare1234" },
    { icon: FileText, label: "RESUME", href: "/Shvet_Resume.pdf" },
];

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-16 lg:px-24 py-24 sm:py-28 md:py-32 overflow-hidden"
        >
            {/* Header Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-5 sm:mb-6 md:mb-10"
            >
                <p className="font-mono text-[10px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.6em] text-neutral-400 dark:text-accent uppercase">
                    0 8
                </p>
            </motion.div>

            {/* Massive Heading */}
            <div className="flex flex-col items-center w-full max-w-7xl mx-auto z-10">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="font-sans font-black text-[40px] xs:text-[52px] sm:text-[72px] md:text-[110px] lg:text-[140px] xl:text-[170px] leading-[0.88] tracking-tighter uppercase text-black dark:text-accent"
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
                className="font-sans text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-neutral-500 dark:text-neutral-400 mt-6 sm:mt-8 md:mt-12 max-w-[260px] sm:max-w-sm md:max-w-xl leading-relaxed font-medium z-10"
            >
                Open to freelance, full-time, and collaborations.<br className="hidden sm:block" />
                Contact: <span className="text-black dark:text-white">shvetgharework@gmail.com</span> | <span className="text-black dark:text-white">+91 7249832504</span>
            </motion.p>

            {/* Email CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-4"
            >
                <a
                    href="mailto:shvetgharework@gmail.com"
                    className="inline-block bg-accent text-black font-mono font-black text-xs tracking-[0.2em] px-12 py-5 uppercase transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000000] dark:hover:shadow-[10px_10px_0_0_#ffffff]"
                >
                    SEND AN EMAIL
                </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 mt-14 sm:mt-16 md:mt-24 items-center z-10"
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
                        <Icon size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                        <span className="font-mono text-[9px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline-block">
                            {label}
                        </span>
                    </a>
                ))}
            </motion.div>

            {/* Background Watermark 08 */}
            <div className="absolute bottom-28 sm:bottom-32 md:bottom-24 left-1/2 -translate-x-1/2 leading-none select-none pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-60">
                <span className="font-sans font-black text-[60px] sm:text-[100px] md:text-[180px] lg:text-[260px] text-neutral-100/60 dark:text-neutral-900/10 whitespace-nowrap transition-colors duration-700">
                    08
                </span>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 md:px-16 lg:px-24 py-6 sm:py-8 md:py-10 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3 md:gap-0 z-20 bg-white/80 dark:bg-black/80 backdrop-blur-sm transition-colors">
                {/* Brand */}
                <div className="flex flex-col items-center sm:items-start gap-0.5">
                    <span className="font-sans font-black text-base md:text-xl tracking-tighter uppercase">SIMPLISTIC</span>
                    <span className="font-mono text-[9px] md:text-[10px] text-neutral-400 uppercase tracking-widest">© 2026 SHVET GHARE</span>
                </div>

                {/* Credit — hidden on very small screens */}
                <p className="hidden sm:block font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-neutral-400 text-center">
                    DESIGNED & BUILT WITH IDE
                </p>

                {/* Nav Links */}
                <div className="flex gap-4 sm:gap-6 md:gap-8">
                    {[
                        { label: "LINKEDIN", href: "https://www.linkedin.com/in/shvetghare1234" },
                        { label: "GITHUB", href: "https://github.com/ShvetGhareWork" }
                    ].map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-[9px] md:text-[10px] font-black tracking-widest text-neutral-400 hover:text-black dark:hover:text-accent transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}