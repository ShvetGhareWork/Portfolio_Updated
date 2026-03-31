"use client";

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const SPRING_CONFIG = { damping: 25, stiffness: 200, mass: 0.5 };

/**
 * MagneticWord component handles the local magnetic pull for individual words.
 */
function MagneticWord({ children }: { children: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, SPRING_CONFIG);
    const springY = useSpring(y, SPRING_CONFIG);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = (clientX - centerX);
        const distanceY = (clientY - centerY);
        
        // Magnetic influence area (120px radius)
        const radius = 120;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < radius) {
            // Stronger pull when closer
            const power = (1 - distance / radius) * 0.4;
            x.set(distanceX * power);
            y.set(distanceY * power);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY, display: 'inline-block' }}
            className="inline-block relative z-10 mx-[2px] transition-colors duration-300 hover:text-accent select-none"
        >
            {children}
        </motion.span>
    );
}

interface CinematicPretextBioProps {
    text: string;
    font?: string;
    lineHeight?: number;
    className?: string;
}

/**
 * CinematicPretextBio uses @chenglou/pretext for high-performance layout
 * and implement a magnetic word interaction.
 */
export default function CinematicPretextBio({ 
    text, 
    font = '500 18px "Inter", sans-serif', 
    lineHeight = 28,
    className = ""
}: CinematicPretextBioProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    // 1. Prepare: Run this once (or when text/font changes)
    // Pretext handles all languages, emojis, and bidi layout off-DOM.
    const prepared = useMemo(() => {
        try {
            return prepareWithSegments(text, font);
        } catch (e) {
            console.error("Pretext preparation failed:", e);
            return null;
        }
    }, [text, font]);

    // 2. Observer: Track container width without causing layout thrashes
    useEffect(() => {
        if (!containerRef.current) return;
        
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // 3. Layout: Pure arithmetic pass (ultra fast, ~0.1ms)
    const layoutResult = useMemo(() => {
        if (!prepared || width === 0) return null;
        return layoutWithLines(prepared, width, lineHeight);
    }, [prepared, width, lineHeight]);

    return (
        <div 
            ref={containerRef} 
            className={`relative w-full ${className}`}
            style={{ height: layoutResult?.height || 'auto' }}
        >
            {layoutResult?.lines.map((line, lineIdx) => (
                <div 
                    key={lineIdx} 
                    className="flex flex-wrap overflow-visible"
                    style={{ height: lineHeight, width: '100%' }}
                >
                    {line.text.split(' ').map((word, wordIdx) => (
                        <MagneticWord key={`${lineIdx}-${wordIdx}`}>
                            {word}
                        </MagneticWord>
                    ))}
                </div>
            ))}
            
            {/* Fallback for SSR or measure lag */}
            {!layoutResult && (
                <p className="opacity-0">{text}</p>
            )}
        </div>
    );
}
