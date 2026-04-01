"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Github, Linkedin } from "lucide-react";
import { BlurText } from "@/components/ui/BlurText";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

const menuItems = [
    { label: "HOME", href: "#hero", highlight: true },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "SKILLS", href: "#skills" },
    { label: "EDUCATION", href: "#education" },
    { label: "ACCOLADES", href: "#writing" },
    { label: "CONTACT", href: "#contact" },
];

export default function HeroSection() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [isMobile, setIsMobile] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        const sectionIds = ["hero", "about", "projects", "experience", "skills", "education", "writing", "contact"];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMenuOpen]);

    return (
        <section
            id="hero"
            className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white overflow-hidden"
        >
            {/* Pixelated Persona Guide (Laptop Only) */}
            {!isMobile && (
                <motion.div
                    initial={{ x: -250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                        duration: 5,
                        delay: 0.5,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="fixed bottom-[-9vh] left-[max(5px,1vw)] z-[100] w-32 sm:w-40 md:w-48 aspect-square pointer-events-none"
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                    }}
                >
                    <div className="relative w-full h-full">
                        <video
                            src="/videos/video.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                            style={{
                                imageRendering: 'pixelated',
                                filter: 'drop-shadow(0 0 10px #C3E41D)',
                                maskImage: 'radial-gradient(circle at center, black 35%, transparent 65%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, black 35%, transparent 65%)',
                            }}
                        />
                    </div>
                </motion.div>
            )}

            {/* Header / Navbar (Simplified for Minimalist Audit) */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-6 sm:py-10 transition-all duration-500 bg-gradient-to-b from-black/10 to-transparent pointer-events-none">
                <nav className="flex items-center justify-between max-w-screen-2xl mx-auto relative px-4 pointer-events-auto">

                    {/* Left: Global Menu Toggle (Transparent/Empty on Desktop) */}
                    <div className="flex items-center md:hidden">
                        <div className="relative">
                            <button
                                ref={buttonRef}
                                type="button"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="group p-2 text-neutral-400 hover:text-accent transition-all duration-300 flex items-center gap-3"
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex flex-col justify-center items-center gap-1.5 sm:gap-2">
                                    <motion.span
                                        animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 4.5 : 0 }}
                                        className="w-full h-[1.5px] bg-current transition-all"
                                    />
                                    <motion.span
                                        animate={{ opacity: isMenuOpen ? 0 : 1 }}
                                        className="w-full h-[1.5px] bg-current"
                                    />
                                    <motion.span
                                        animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -4.5 : 0 }}
                                        className="w-full h-[1.5px] bg-current transition-all"
                                    />
                                </div>
                                <span className="font-mono text-[9px] font-black tracking-[0.4em] hidden sm:inline-block">MENU</span>
                            </button>

                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        ref={menuRef}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 w-56 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl shadow-2xl mt-4 p-5 z-[100] backdrop-blur-xl"
                                    >
                                        {menuItems.map((item) => (
                                            <a key={item.label}
                                                href={item.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="group flex justify-between items-center text-sm font-black font-mono tracking-widest py-3 px-3 transition-all duration-200 hover:text-accent"
                                                style={{ color: activeSection === item.href.slice(1) ? "#C3E41D" : undefined }}
                                            >
                                                {item.label}
                                                <div className={`w-1.5 h-1.5 bg-accent rounded-full transition-opacity ${activeSection === item.href.slice(1) ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`} />
                                            </a>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Spacer for Desktop (replaces Menu) */}
                    <div className="hidden md:block w-32" />

                    {/* Center: Logo (Signature) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group pointer-events-none">
                        <span
                            className="relative text-3xl sm:text-4xl text-black dark:text-white font-logo font-bold select-none cursor-default transition-all duration-500 group-hover:scale-110 tracking-widest pointer-events-auto"
                            style={{
                                fontFamily: "'Brush Script MT', cursive, serif",
                                textShadow: "0 0 25px rgba(195, 228, 29, 0.4)"
                            }}
                        >
                            SG
                        </span>
                    </div>

                    {/* Right: Theme Toggle */}
                    <div className="flex items-center w-32 justify-end">
                        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                    </div>
                </nav>
            </header>

            {/* Main Content: Funnel Layout */}
            <div className="relative min-h-screen flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 pt-20">
                <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12 lg:gap-20">

                    {/* Left: Information Pile */}
                    <div className="relative z-20 flex flex-col items-start text-left w-full lg:w-[65%] order-2 lg:order-1">

                        {/* Role Descriptor (Enhanced for Audit) */}
                        <div className="mb-4 sm:mb-6">
                            <span className="inline-block font-mono text-accent text-[11px] sm:text-[12px] font-black tracking-[0.4em] uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000">
                                Full-Stack Engineer ·
                            </span>
                        </div>

                        {/* Name (Big, Left Aligned) */}
                        <div
                            className="relative flex flex-col items-start leading-[0.85] tracking-tighter mb-8 sm:mb-10"
                            style={{ fontSize: "clamp(60px, 12vw, 220px)" }}
                        >
                            <BlurText
                                text="SHVET"
                                delay={80}
                                animateBy="letters"
                                direction="top"
                                className="font-sans font-black uppercase text-black dark:text-white"
                            />
                            <div className="-mt-[0.05em]">
                                <BlurText
                                    text="GHARE"
                                    delay={100}
                                    animateBy="letters"
                                    direction="top"
                                    className="font-sans font-black uppercase text-accent"
                                />
                            </div>
                        </div>

                        {/* Tagline (High-Contrast White, Corrected for Audit) */}
                        <div className="max-w-xl mb-12 sm:mb-16">
                            <p className="text-[20px] sm:text-[22px] md:text-[24px] font-medium text-black dark:text-white leading-relaxed tracking-tight opacity-100">
                                Designing human experiences in code. Full-stack software engineer obsessed with high-fidelity interaction and scalable performance.
                            </p>
                        </div>

                        {/* Funnel CTAs */}
                        <div className="flex flex-wrap gap-4 sm:gap-6 w-full sm:w-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                                className="mt-2 sm:mt-4"
                            >
                                <a
                                    href="#projects"
                                    className="inline-block bg-accent text-black font-mono font-black text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] px-8 sm:px-12 py-4 sm:py-5 uppercase transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000000] sm:hover:shadow-[10px_10px_0_0_#000000] dark:hover:shadow-[8px_8px_0_0_#ffffff] sm:dark:hover:shadow-[10px_10px_0_0_#ffffff]"
                                >
                                    SEE_MY_WORK
                                </a>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                viewport={{ once: true }}
                                className="mt-2 sm:mt-4"
                            >
                                <a
                                    href="#contact"
                                    className="inline-block border-2 border-accent bg-transparent text-accent font-mono font-black text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] px-8 sm:px-12 py-4 sm:py-5 uppercase transition-all"
                                >
                                    GET_IN_TOUCH
                                </a>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: Portrait (Bottom Aligned and Floating) */}
                    <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[500px] lg:w-[45%] lg:absolute lg:right-4 xl:right-[5vw] lg:bottom-0 z-30 order-1 lg:order-2 flex justify-center items-end">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{
                                opacity: 1,
                                y: [10, -10, 10],
                            }}
                            transition={{
                                opacity: { duration: 1.5 },
                                y: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="relative w-full aspect-[4/5] group"
                        >
                            {/* Decorative Glow */}
                            <div className="absolute rounded-full hidden" />

                            <div
                                className="relative w-full h-full overflow-hidden rounded-t-[100px] sm:rounded-t-[140px] lg:rounded-t-[180px]"
                                style={{
                                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                                }}
                            >
                                <img
                                    className="w-full h-full object-cover scale-110 object-top transition-all duration-1000"
                                    alt="Shvet Portrait"
                                    src="/images/hero-profile.jpg"
                                />

                                {/* Simple Interactive Overlay */}
                                <div className="absolute inset-0 group-hover:bg-transparent duration-500" />
                            </div>

                            {/* Floating Metadata Tag */}

                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3">
                <span className="font-mono text-[9px] font-black tracking-[0.4em] text-neutral-400 dark:text-neutral-600 uppercase">SCROLL</span>
                <button
                    type="button"
                    className="p-2 text-neutral-400 hover:text-accent transition-all duration-300 animate-bounce"
                    aria-label="Scroll down"
                    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                >
                    <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1} />
                </button>
            </div>
        </section>
    );
}   