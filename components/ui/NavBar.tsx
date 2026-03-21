'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavBarProps {
    isDark: boolean;
    onToggleTheme: () => void;
}

const menuItems = [
    { label: 'HOME', href: '#hero', highlight: true },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'WRITING', href: '#writing' },
    { label: 'CONTACT', href: '#contact' },
];

export default function NavBar({ isDark, onToggleTheme }: NavBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                isOpen &&
                menuRef.current && !menuRef.current.contains(e.target as Node) &&
                btnRef.current && !btnRef.current.contains(e.target as Node)
            ) setIsOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    const bg = isDark ? '#000000' : '#ffffff';
    const textColor = isDark ? '#ffffff' : '#0a0a0a';
    const mutedColor = isDark ? 'hsl(0 0% 50%)' : 'hsl(0 0% 60%)';

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 px-6 py-5 transition-colors duration-300"
            style={{ backgroundColor: bg, borderBottom: `1px solid ${isDark ? 'hsl(0 0% 10%)' : 'hsl(0 0% 92%)'}` }}
        >
            <nav className="flex items-center justify-between max-w-screen-xl mx-auto">
                {/* Hamburger */}
                <div className="relative">
                    <button
                        ref={btnRef}
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1 transition-colors duration-300"
                        style={{ color: mutedColor }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = textColor; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = mutedColor; }}
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isOpen
                            ? <X size={28} strokeWidth={2} />
                            : <Menu size={28} strokeWidth={2} />
                        }
                    </button>

                    {isOpen && (
                        <div
                            ref={menuRef}
                            className="absolute top-full left-0 mt-3 w-52 rounded-xl p-4 z-[100]"
                            style={{
                                backgroundColor: bg,
                                border: `1px solid ${isDark ? 'hsl(0 0% 15%)' : 'hsl(0 0% 90%)'}`,
                                boxShadow: isDark ? 'none' : '0 8px 32px rgba(0,0,0,0.08)',
                            }}
                        >
                            {menuItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-lg font-bold font-fira tracking-tight py-1.5 px-2 transition-colors duration-200"
                                    style={{ color: item.highlight ? '#C3E41D' : textColor }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#C3E41D'; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = item.highlight ? '#C3E41D' : textColor; }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Signature */}
                <span
                    className="text-2xl select-none font-logo font-bold"
                    style={{
                        color: textColor,
                    }}
                >
                    A
                </span>

                {/* Theme toggle */}
                <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
            </nav>
        </header>
    );
}
