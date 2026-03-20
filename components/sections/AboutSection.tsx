"use client";

import { motion } from "framer-motion";

const skills = [
    "REACT", "NEXT.JS", "NODE.JS", "MONGODB", "AWS", "DOCKER", "KUBERNETES", "JAVA"
];

const stats = [
    { num: "01+", label: "YEARS EXPERIENCE" },
    { num: "90", label: "COMMITS / MONTH" }
];

export default function AboutSection() {
    return (
        <section
            id="about"
            className="relative min-h-screen bg-white transition-colors duration-700 dark:bg-black text-black dark:text-white flex items-center px-5 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-20 overflow-hidden"
        >
            {/* Background Watermark 02 */}
            <div className="absolute bottom-[-10%] right-[-5%] md:right-[-10%] leading-none select-none pointer-events-none z-0 overflow-hidden opacity-50 dark:opacity-100">
                <span className="font-sans font-black text-[clamp(250px,45vw,700px)] text-neutral-100/60 dark:text-neutral-900/40 transition-colors duration-700 block translate-x-[15%]">
                    02
                </span>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-20 items-start">

                    {/* Left Column: Title & Description */}
                    <div className="lg:col-span-6 space-y-8 sm:space-y-12">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-4 text-neutral-400 font-mono text-[11px] font-bold tracking-[0.4em]">
                                <span>0 2</span>
                            </div>
                            <h2 className="font-sans font-black text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] tracking-tight uppercase text-accent mb-2">
                                SHVET GHARE
                            </h2>
                            <h2 className="font-sans font-black text-[64px] sm:text-[80px] md:text-[96px] lg:text-[110px] xl:text-[120px] tracking-tighter uppercase leading-[0.8] text-black dark:text-white">
                                ABOUT
                            </h2>
                            <div className="w-full h-[3px] bg-accent border-none mt-2 max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-lg" />
                        </div>

                        <div className="space-y-8 sm:space-y-10 max-w-lg">
                            <p className="font-sans text-[15px] sm:text-[17px] md:text-[18px] lg:text-[19px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
                                Full-Stack Software Engineer with hands-on experience building and deploying scalable web
                                applications using React, Node.js, MongoDB, and AWS (EC2, S3, Route 53). Developed 4 production
                                ready systems integrating AI APIs, real-time communication (Socket.IO), and secure authentication
                                (JWT, OAuth). Proven ability to own the full development lifecycle — from system design to cloud
                                deployment — with a 9.39 SGPA in Computer Engineering
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse flex-shrink-0" />
                                <span className="font-mono text-[10px] font-black tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
                                    AVAILABLE FOR PROJECTS
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Stats & Skills Grid */}
                    <div className="lg:col-span-6 flex flex-col gap-8 sm:gap-10 lg:gap-12 lg:pl-10">

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-6 sm:gap-10">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="font-sans font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-accent leading-none">
                                        {stat.num}
                                    </div>
                                    <div className="font-mono text-[9px] sm:text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neutral-400 dark:text-neutral-500 mt-3 sm:mt-5 leading-tight">
                                        {stat.label.split(' / ').map((line, idx) => (
                                            <div key={idx}>{line}</div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="w-full h-px bg-neutral-100 dark:bg-neutral-900 border-none" />

                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-2">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    className="border border-neutral-100 dark:border-neutral-900 px-2 sm:px-3 py-3 sm:py-3.5 flex items-center justify-center text-center transition-all hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-default font-mono text-[9px] sm:text-[10px] font-black tracking-widest uppercase"
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                            className="mt-2 sm:mt-4"
                        >
                            <a
                                href="/Shvet_Resume.pdf"
                                download
                                className="inline-block bg-accent text-black font-mono font-black text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] px-8 sm:px-12 py-4 sm:py-5 uppercase transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000000] sm:hover:shadow-[10px_10px_0_0_#000000] dark:hover:shadow-[8px_8px_0_0_#ffffff] sm:dark:hover:shadow-[10px_10px_0_0_#ffffff]"
                            >
                                DOWNLOAD_CV
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}