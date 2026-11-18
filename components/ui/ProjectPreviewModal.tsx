"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  AlertTriangle,
  Github,
  Loader2,
} from "lucide-react";
import type { Project } from "@/lib/types";

interface ProjectPreviewModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectIframeViewport({
  projectUrl,
  title,
  themeColors,
  isLime,
}: {
  projectUrl: string;
  title: string;
  themeColors: {
    primary: string;
    text: string;
    shadow: string;
  };
  isLime: boolean;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 gap-3">
          <Loader2 size={32} className={`${themeColors.text} animate-spin`} />
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-300">
            ESTABLISHING SECURE CONNECTION...
          </span>
          <div className="w-48 h-1 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                isLime ? "bg-accent" : "bg-cyan-400"
              } animate-pulse w-3/4`}
            />
          </div>
        </div>
      )}

      <iframe
        src={projectUrl}
        title={title}
        onLoad={() => setLoading(false)}
        className="w-full h-full border-0 bg-white"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </>
  );
}

export default function ProjectPreviewModal({
  project,
  isOpen,
  onClose,
}: ProjectPreviewModalProps) {
  // Close on Escape key and handle scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const isGithub = project.href?.includes("github.com");
  const isLime = project.theme !== "cyan";

  // Dynamic styling tokens based on theme (Electric Lime vs Cyan Blue)
  const themeColors = isLime
    ? {
        primary: "accent",
        glow: "rgba(195, 228, 29, 0.18)",
        border: "border-accent",
        borderAlpha: "border-accent/40",
        text: "text-accent",
        bgBadge: "bg-accent text-black",
        shadow: "shadow-[0_0_40px_rgba(195,228,29,0.2)]",
        radial: "radial-gradient(circle at 50% 30%, rgba(195,228,29,0.14) 0%, rgba(0,0,0,0.92) 75%)",
      }
    : {
        primary: "cyan-400",
        glow: "rgba(6, 182, 212, 0.18)",
        border: "border-cyan-400",
        borderAlpha: "border-cyan-400/40",
        text: "text-cyan-400",
        bgBadge: "bg-cyan-400 text-black",
        shadow: "shadow-[0_0_40px_rgba(6,182,212,0.2)]",
        radial: "radial-gradient(circle at 50% 30%, rgba(6,182,212,0.14) 0%, rgba(0,0,0,0.92) 75%)",
      };

  const projectUrl = project.liveUrl || project.href || "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 select-none">
          {/* Dynamic Ambient Background Mesh */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{ background: themeColors.radial }}
            className="fixed inset-0 backdrop-blur-xl bg-black/85"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full max-w-7xl h-[92vh] sm:h-[90vh] flex flex-col bg-neutral-950 border ${themeColors.border} ${themeColors.shadow} overflow-hidden`}
          >
            {/* Top Bar / Inspector Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-3 bg-black/95 border-b border-neutral-800">
              {/* Left Info: Status, URL, Warning */}
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      isLime ? "bg-accent" : "bg-cyan-400"
                    } animate-pulse flex-shrink-0`}
                  />
                  <span className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider text-neutral-200 truncate">
                    LIVE PREVIEW:{" "}
                    <span className={themeColors.text}>{projectUrl}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-[9px] text-neutral-400">
                  <AlertTriangle
                    size={11}
                    className={themeColors.text}
                  />
                  <span className="truncate">
                    SOME THIRD-PARTY AUTH OR HARDWARE FEATURES MAY REQUIRE FULL WINDOW
                  </span>
                </div>
              </div>

              {/* Right Actions: Open Website & Close Button */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono font-bold text-[10px] sm:text-xs tracking-wider uppercase px-3 sm:px-4 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-neutral-500 transition-all cursor-pointer"
                >
                  <span>OPEN WEBSITE</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  onClick={onClose}
                  className={`inline-flex items-center gap-1.5 font-mono font-black text-[10px] sm:text-xs tracking-wider uppercase px-3 sm:px-4 py-1.5 ${themeColors.bgBadge} transition-all hover:opacity-90 cursor-pointer`}
                >
                  <X size={13} strokeWidth={3} />
                  <span>CLOSE [ESC]</span>
                </button>
              </div>
            </div>

            {/* Viewport Body */}
            <div className="relative flex-1 w-full h-full bg-neutral-950 overflow-hidden flex flex-col">
              {/* If it's a live web app (e.g. ZeroGrid Amplify, NiveshIQ, NutriSnap, EduAble) */}
              {!isGithub && projectUrl ? (
                <ProjectIframeViewport
                  key={projectUrl}
                  projectUrl={projectUrl}
                  title={project.title}
                  themeColors={themeColors}
                  isLime={isLime}
                />
              ) : (
                /* Fallback for GitHub Repositories (which block iframes via X-Frame-Options) */
                <div className="relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-12 text-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-black overflow-y-auto">
                  <div className="max-w-2xl mx-auto flex flex-col items-center">
                    {/* Visual Screenshot or Hero Art */}
                    {project.image && (
                      <div className="relative w-full max-w-lg aspect-[16/9] mb-8 rounded-none overflow-hidden border border-neutral-800 shadow-2xl">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          unoptimized
                          className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </div>
                    )}

                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.25em] px-2.5 py-1 ${themeColors.bgBadge} font-black mb-4`}
                    >
                      {project.category}
                    </span>

                    <h3 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight uppercase mb-3">
                      {project.title}
                    </h3>

                    <p className="font-sans text-sm text-neutral-300 leading-relaxed max-w-xl mb-6">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-8">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] text-neutral-300 bg-neutral-800/80 border border-neutral-700 px-2.5 py-1 uppercase tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Direct GitHub Launch Button */}
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 font-mono font-black text-xs sm:text-sm tracking-wider uppercase px-6 py-3 ${themeColors.bgBadge} shadow-lg hover:scale-105 transition-all`}
                    >
                      <Github size={16} />
                      <span>LAUNCH GITHUB REPOSITORY</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )}

              {/* Bottom Notice Watermark */}
              <div className="absolute bottom-3 right-4 z-20 pointer-events-none">
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 bg-black/85 px-2.5 py-1 border border-neutral-800 backdrop-blur-md">
                  SOME SITES MAY PREVENT EMBEDDING
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
