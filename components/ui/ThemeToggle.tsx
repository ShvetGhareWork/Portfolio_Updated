'use client';

import React from 'react';

interface ThemeToggleProps {
    isDark: boolean;
    onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-14 h-7" />; // Placeholder to maintain layout
    }

    return (
        <button
            type="button"
            onClick={onToggle}
            className="relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none"
            style={{
                backgroundColor: isDark ? 'hsl(0 0% 18%)' : 'hsl(0 0% 88%)',
            }}
            aria-label="Toggle theme"
        >
            <div
                className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full transition-transform duration-300"
                style={{
                    backgroundColor: isDark ? '#C3E41D' : 'hsl(0 0% 10%)',
                    transform: isDark ? 'translateX(28px)' : 'translateX(0)',
                }}
            />
        </button>
    );
}
