"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
    project: Project;
    isDark: boolean;
}

export default function ProjectCard({ project, isDark }: ProjectCardProps) {
    return (
        <a
            href={project.href}
            className="group flex flex-col rounded-2xl p-7 transition-all duration-300 cursor-pointer"
            style={{
                backgroundColor: isDark ? "hsl(0 0% 9%)" : "#ffffff",
                border: `1px solid ${isDark ? "hsl(0 0% 17%)" : "hsl(0 0% 88%)"}`,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C3E41D";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = isDark
                    ? "hsl(0 0% 17%)"
                    : "hsl(0 0% 88%)";
            }}
        >
            {/* Category pill */}
            <span
                className="self-start text-[10px] font-bold uppercase rounded-full px-3 py-1 font-fira tracking-wider"
                style={{ backgroundColor: "#C3E41D", color: "#000000" }}
            >
                {project.category}
            </span>

            {/* Title */}
            <h3
                className="font-fira font-bold text-xl mt-4 leading-snug tracking-tight"
                style={{ color: isDark ? "#ffffff" : "#0a0a0a" }}
            >
                {project.title}
            </h3>

            {/* Description */}
            <p
                className="font-antic text-[15px] mt-3 leading-relaxed flex-1"
                style={{ color: isDark ? "hsl(0 0% 52%)" : "hsl(0 0% 42%)" }}
            >
                {project.description}
            </p>

            {/* Footer */}
            <div
                className="mt-6 pt-5 flex justify-between items-center"
                style={{
                    borderTop: `1px solid ${isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 92%)"}`,
                }}
            >
                <span
                    className="font-fira text-[12px]"
                    style={{ color: isDark ? "hsl(0 0% 40%)" : "hsl(0 0% 60%)" }}
                >
                    {project.year}
                </span>
                <ArrowUpRight
                    size={18}
                    className="transition-colors duration-300"
                    style={{ color: isDark ? "hsl(0 0% 40%)" : "hsl(0 0% 58%)" }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as SVGElement).style.color = "#C3E41D";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as SVGElement).style.color = isDark
                            ? "hsl(0 0% 40%)"
                            : "hsl(0 0% 58%)";
                    }}
                />
            </div>
        </a>
    );
}
