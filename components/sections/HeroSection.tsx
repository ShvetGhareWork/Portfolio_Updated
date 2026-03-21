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
    { label: "WRITING", href: "#writing" },
    { label: "CONTACT", href: "#contact" },
];

export default function HeroSection() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

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
                                {menuItems.map((item) => (

                                    <a key={item.label}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-base sm:text-lg md:text-xl font-bold font-mono tracking-tight py-1.5 px-2 transition-colors duration-200"
                                        style={{ color: item.highlight ? "#C3E41D" : undefined }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "#C3E41D")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = item.highlight ? "#C3E41D" : "")}
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Logo (Center) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span
                            className="text-4xl sm:text-5xl md:text-7xl text-black dark:text-white font-logo"
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
            <div className="flex flex-col items-center justify-center min-h-screen pt-16 sm:pt-20 px-2 sm:px-4 text-center">
                <div className="relative flex flex-col items-center justify-center w-full">

                    {/*
                        Font-size math:
                        Phone  (~390px):  18vw × 3.9  = 70px/char → "SHVET" ≈ 298px — fills ~76% width ✓
                        Tablet (~768px):  18vw × 7.68 = 138px/char → hits 480px cap at ~2667px, so tablet uses 138px ✓
                        Desktop(1440px):  18vw × 14.4 = 259px/char → still under 480px cap ✓
                        Wide   (2200px+): capped at 480px ✓
                    */}
                    <div
                        className="relative z-0 leading-none w-full flex flex-col items-center"
                        style={{ fontSize: "clamp(70px, 18vw, 480px)" }}
                    >
                        <div>
                            <BlurText
                                text="SHVET"
                                delay={80}
                                animateBy="letters"
                                direction="top"
                                className="font-sans font-black leading-[0.8] tracking-tighter uppercase whitespace-nowrap text-accent opacity-90"
                                style={{ fontSize: "clamp(100px, 18vw, 480px)" }}
                            />
                        </div>
                        <div>
                            <BlurText
                                text="GHARE"
                                delay={100}
                                animateBy="letters"
                                direction="top"
                                className="font-sans font-black leading-[0.8] tracking-tighter uppercase whitespace-nowrap text-accent opacity-90"
                                style={{ fontSize: "clamp(100px, 18vw, 480px)" }}
                            />
                        </div>
                    </div>

                    {/* Profile photo — tracks name size */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                        <div
                            className="overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] ring-4 sm:ring-8 ring-white/5 dark:ring-black/5 bg-neutral-200 dark:bg-neutral-800 pointer-events-auto cursor-pointer"
                            style={{
                                width: "clamp(80px, 13vw, 240px)",
                                height: "clamp(128px, 21vw, 384px)",
                                borderRadius: "clamp(32px, 5vw, 96px)",
                            }}
                        >
                            <img
                                src="/images/hero-profile.jpg"
                                alt="SHVET GHARE"
                                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Tagline */}
                <div className="mt-10 sm:mt-16 md:mt-24 max-w-[260px] sm:max-w-sm md:max-w-lg px-4">
                    <BlurText
                        text="Designing human experiences in code."
                        delay={100}
                        animateBy="words"
                        direction="top"
                        className="font-sans text-[13px] sm:text-[16px] md:text-[20px] lg:text-[22px] text-neutral-600 dark:text-neutral-400 tracking-tight font-medium"
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