"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

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
            {/* Navbar */}
            <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-5 sm:py-8">
                <nav className="flex items-center justify-between max-w-screen-2xl mx-auto relative">

                    {/* Menu button (Left) */}
                    <div className="relative">
                        <button
                            ref={buttonRef}
                            type="button"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-neutral-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMenuOpen
                                ? <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                                : <Menu className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                            }
                        </button>

                        {isMenuOpen && (
                            <div
                                ref={menuRef}
                                className="absolute top-full left-0 w-44 sm:w-48 md:w-56 bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl shadow-sm mt-2 p-3 sm:p-4 z-[100]"
                            >
                                {menuItems.map((item) => {
                                    const isActive = activeSection === item.href.slice(1);
                                    return (
                                        <a key={item.label}
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block text-base sm:text-lg md:text-xl font-bold font-mono tracking-tight py-1.5 px-2 transition-colors duration-200"
                                            style={{ color: isActive ? "#C3E41D" : undefined }}
                                            onMouseEnter={(e) => (e.currentTarget.style.color = "#C3E41D")}
                                            onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#C3E41D" : "")}
                                        >
                                            {item.label}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Logo (Center) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span
                            className="text-4xl sm:text-5xl md:text-7xl text-black dark:text-white font-logo font-bold"
                            style={{ fontFamily: "'Brush Script MT', cursive, serif" }}
                        >
                            SG
                        </span>
                    </div>

                    {/* Theme Toggle (Right) */}
                    <div className="flex items-center">
                        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                    </div>
                </nav>
            </header>

            {/* Centered name */}
            <div className="flex flex-col items-center justify-center min-h-screen pt-24 pb-16 px-4 text-center">
                <div className="relative flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
                    
                    {/* Section indicator matching other sections */}
                    <div className="absolute top-0 left-0 sm:left-4 md:left-8 flex items-center gap-4 text-neutral-400 font-mono text-[11px] font-bold tracking-[0.4em] opacity-80 mb-12 sm:mb-16">
                        <span>0 1</span>
                    </div>

                    {/* Name container with refined spacing */}
                    <div
                        className="relative z-0 w-full flex flex-col items-center py-12"
                        style={{ fontSize: "clamp(80px, 16vw, 420px)" }}
                    >
                        <div className="leading-[0.85] tracking-tighter">
                            <BlurText
                                text="SHVET"
                                delay={80}
                                animateBy="letters"
                                direction="top"
                                className="font-sans font-black uppercase text-accent opacity-90"
                            />
                        </div>
                        <div className="leading-[0.85] tracking-tighter -mt-[0.1em]">
                            <BlurText
                                text="GHARE"
                                delay={100}
                                animateBy="letters"
                                direction="top"
                                className="font-sans font-black uppercase text-accent opacity-90"
                            />
                        </div>
                    </div>

                    {/* Profile photo — refined dimensions and overlap */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <div
                            className="overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] ring-4 sm:ring-8 ring-white/5 dark:ring-black/10 bg-neutral-200 dark:bg-neutral-800 pointer-events-auto cursor-pointer"
                            style={{
                                width: "clamp(100px, 15vw, 220px)",
                                height: "clamp(150px, 22vw, 330px)",
                                borderRadius: "clamp(40px, 6vw, 80px)",
                            }}
                        >
                            <img
                                src="/images/hero-profile.jpg"
                                alt="SHVET GHARE"
                                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700 transform hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

                {/* Tagline */}
                <div className="mt-8 sm:mt-12 md:mt-16 max-w-[260px] sm:max-w-md md:max-w-xl px-4">
                    <BlurText
                        text="Designing human experiences in code."
                        delay={100}
                        animateBy="words"
                        direction="top"
                        className="font-sans text-[14px] sm:text-[18px] md:text-[22px] lg:text-[24px] text-neutral-600 dark:text-neutral-400 tracking-tight font-medium"
                    />
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <button
                    type="button"
                    className="p-2 text-neutral-400 hover:text-black dark:hover:text-white transition-all duration-300 animate-bounce"
                    aria-label="Scroll down"
                    onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                >
                    <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                </button>
            </div>
        </section>
    );
}