"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/data";
import type { Article } from "@/lib/types";

function ArticleCard({ article, index }: { article: Article; index: number }) {
    return (
        <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            href={article.href ?? "#"}
            className="group flex flex-col bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-800 p-6 sm:p-8 md:p-10 transition-all duration-500 hover:border-accent hover:bg-white dark:hover:bg-neutral-900"
        >
            <div className="mb-4 md:mb-6">
                <span className="bg-accent text-black font-mono font-black text-[9px] px-3 py-1.5 uppercase tracking-[0.2em] inline-block">
                    {article.category}
                </span>
            </div>

            <h3 className="font-sans font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tighter uppercase mb-3 md:mb-4 text-black dark:text-white group-hover:text-accent transition-colors duration-300">
                {article.title}
            </h3>

            <p className="font-sans text-[13px] sm:text-[14px] md:text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6 md:mb-10 flex-1">
                {article.excerpt}
            </p>

            <div className="mt-auto pt-4 md:pt-6 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center group-hover:border-accent/30 transition-colors">
                <span className="font-mono text-[10px] sm:text-[11px] font-black tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                    {article.readTime}
                </span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-neutral-100 dark:border-neutral-800 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300 flex-shrink-0">
                    <ArrowUpRight size={16} strokeWidth={2.5} className="sm:hidden" />
                    <ArrowUpRight size={18} strokeWidth={2.5} className="hidden sm:block" />
                </div>
            </div>
        </motion.a>
    );
}

export default function WritingSection() {
    return (
        <section
            id="writing"
            className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white px-5 sm:px-8 md:px-16 lg:px-24 py-20 md:py-32 overflow-hidden"
        >
            {/* Header */}
            <div className="mb-16 md:mb-24 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center gap-4 text-neutral-400 font-mono text-[11px] font-bold tracking-[0.4em]">
                        <span>0 7</span>
                    </div>
                    <h2 className="font-sans font-black text-[clamp(48px,12vw,120px)] tracking-tighter uppercase leading-[0.75] text-black dark:text-white">
                        ACCOLADES
                    </h2>
                    <div className="w-full h-[3px] bg-accent border-none mt-4 max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-lg" />
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-w-7xl mx-auto w-full relative z-10">
                {articles.map((article, i) => (
                    <ArticleCard key={article.title} article={article} index={i} />
                ))}
            </div>

            {/* CTA Button */}
            <div className="mt-12 md:mt-20 flex justify-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-4"
                >
                    <a href="#contact"
                        className="inline-block bg-accent text-black font-mono font-black text-[10px] sm:text-xs tracking-[0.2em] px-8 sm:px-12 py-4 sm:py-5 uppercase transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000000] sm:hover:shadow-[10px_10px_0_0_#000000] dark:hover:shadow-[6px_6px_0_0_#ffffff] sm:dark:hover:shadow-[10px_10px_0_0_#ffffff]">
                        GET IN TOUCH
                    </a>
                </motion.div>
            </div>

            {/* Background Watermark 07 */}
            <div className="absolute bottom-0 right-[-5%] leading-none select-none pointer-events-none z-0 overflow-hidden opacity-50 dark:opacity-100">
                <span className="font-sans font-black text-[clamp(150px,35vw,650px)] text-neutral-100/60 dark:text-neutral-900/20 transition-colors duration-700 block translate-x-[15%] translate-y-[15%]">
                    07
                </span>
            </div>

            {/* Bottom Footer Line */}
            <div className="mt-20 md:mt-40 pt-8 md:pt-10 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center opacity-30">
                <div className="hidden md:flex gap-8" />
            </div>
        </section>
    );
}