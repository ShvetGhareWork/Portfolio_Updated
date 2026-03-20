"use client";

import { useEffect, useRef, useState, useMemo, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BlurTextProps {
    text: string;
    delay?: number;
    animateBy?: "words" | "letters";
    direction?: "top" | "bottom";
    className?: string;
    style?: CSSProperties;
}

export function BlurText({
    text,
    delay = 60,
    animateBy = "words",
    direction = "top",
    className,
    style,
}: BlurTextProps) {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    const segments = useMemo(
        () => (animateBy === "words" ? text.split(" ") : text.split("")),
        [text, animateBy]
    );

    return (
        <span ref={ref} className={cn("inline-flex flex-wrap", className)} style={style}>
            {segments.map((seg, i) => (
                <span
                    key={i}
                    style={{
                        display: "inline-block",
                        filter: inView ? "blur(0px)" : "blur(10px)",
                        opacity: inView ? 1 : 0,
                        transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
                        transition: `filter 0.5s ease-out ${i * delay}ms, opacity 0.5s ease-out ${i * delay}ms, transform 0.5s ease-out ${i * delay}ms`,
                    }}
                >
                    {seg}
                    {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
                </span>
            ))}
        </span>
    );
}
