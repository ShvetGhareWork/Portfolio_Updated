"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, FileText, CheckCircle, AlertCircle } from "lucide-react";

const socials = [
    { icon: Github, label: "GITHUB", href: "https://github.com/ShvetGhareWork" },
    { icon: Linkedin, label: "LINKEDIN", href: "https://www.linkedin.com/in/shvetghare1234" },
    { icon: FileText, label: "RESUME", href: "/Shvet_Resume.pdf" },
];

export default function ContactSection() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [sendError, setSendError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSendError(false);

        try {
            const formData = new FormData();
            formData.append("access_key", "ab7eba12-b1e6-4cd9-afc9-23141d1acde8");
            formData.append("name", formState.name);
            formData.append("email", formState.email);
            formData.append("message", formState.message);
            formData.append("subject", `New Portfolio Contact: ${formState.name}`);
            formData.append("from_name", "Portfolio Contact Form");

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setSubmitted(true);
                setFormState({ name: "", email: "", message: "" });
            } else {
                setSendError(true);
            }
        } catch {
            setSendError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-700 overflow-hidden
                       px-5 pt-20 pb-24
                       sm:px-8 sm:pt-28 sm:pb-32
                       md:px-16 md:pt-36 md:pb-40
                       lg:px-24"
        >
            {/* Background watermark — clipped so it never causes overflow */}
            <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.04] dark:opacity-[0.07] z-0"
            >
                <span className="font-sans font-black text-[40vw] leading-none text-black dark:text-white whitespace-nowrap">
                    08
                </span>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full">

                {/* ── Section label ── */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-4"
                >
                    07 / CONTACT
                </motion.p>

                {/* ── Main grid ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">

                    {/* LEFT — heading, copy, socials */}
                    <div className="lg:col-span-5">
                        <motion.h2
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="font-sans font-black leading-[0.88] tracking-tighter uppercase text-black dark:text-[#BFFF00] mb-6
                                       text-[clamp(2.4rem,10vw,6.5rem)]"
                        >
                            LET&apos;S<br />WORK<br />TOGETHER
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25, duration: 0.6 }}
                            className="font-sans text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8 max-w-sm"
                        >
                            Whether you have a specific project in mind or just want to explore a
                            potential collaboration — I&apos;m ready to build something exceptional.
                        </motion.p>

                        {/* Social cards — always 3-up on any width */}
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            {socials.map(({ icon: Icon, label, href }, i) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                                    className="group flex flex-col items-center justify-center gap-2 py-4 sm:py-5 px-2
                                               border border-neutral-200 dark:border-neutral-800
                                               hover:border-[#BFFF00] hover:bg-neutral-50 dark:hover:bg-neutral-950
                                               transition-all duration-200"
                                >
                                    <Icon
                                        size={18}
                                        className="text-neutral-400 group-hover:text-[#BFFF00] transition-colors"
                                    />
                                    <span className="font-mono text-[8px] sm:text-[9px] font-black tracking-[0.15em] text-neutral-500 dark:text-neutral-400 group-hover:text-[#BFFF00] transition-colors">
                                        {label}
                                    </span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Direct email line */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 font-mono text-[10px] tracking-[0.15em] text-neutral-400"
                        >
                            OR EMAIL DIRECTLY:{" "}
                            <a
                                href="mailto:shvetgharework@gmail.com"
                                className="text-black dark:text-white hover:text-[#BFFF00] dark:hover:text-[#BFFF00] transition-colors underline underline-offset-4"
                            >
                                shvetgharework@gmail.com
                            </a>
                        </motion.p>
                    </div>

                    {/* RIGHT — contact form */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="lg:col-span-7 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900
                                   p-6 sm:p-8 md:p-10"
                    >
                        {submitted ? (
                            /* ── Success state ── */
                            <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                                <div className="w-14 h-14 rounded-full bg-[#BFFF00] flex items-center justify-center">
                                    <CheckCircle size={28} className="text-black" />
                                </div>
                                <h3 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tighter">
                                    Message Sent
                                </h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xs">
                                    I&apos;ll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-4 bg-[#BFFF00] text-black font-mono font-black text-[10px] tracking-[0.2em] px-10 py-4 uppercase
                                               transition-all hover:translate-x-[3px] hover:-translate-y-[3px]
                                               hover:shadow-[6px_6px_0_0_#000] dark:hover:shadow-[6px_6px_0_0_#fff]"
                                >
                                    SEND_ANOTHER
                                </button>
                            </div>
                        ) : (
                            /* ── Form ── */
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                                {/* Name */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-mono text-[9px] font-black tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-600">
                                        NAME
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Your name"
                                        value={formState.name}
                                        onChange={e => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800
                                                   p-3.5 font-sans text-sm
                                                   focus:border-[#BFFF00] outline-none transition-colors
                                                   placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-mono text-[9px] font-black tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-600">
                                        EMAIL
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formState.email}
                                        onChange={e => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800
                                                   p-3.5 font-sans text-sm
                                                   focus:border-[#BFFF00] outline-none transition-colors
                                                   placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
                                    />
                                </div>

                                {/* Message */}
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-mono text-[9px] font-black tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-600">
                                        MESSAGE
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        placeholder="Project details or collaboration ideas..."
                                        value={formState.message}
                                        onChange={e => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800
                                                   p-3.5 font-sans text-sm
                                                   focus:border-[#BFFF00] outline-none resize-none transition-colors
                                                   placeholder:text-neutral-300 dark:placeholder:text-neutral-700"
                                    />
                                </div>

                                {/* Error message */}
                                {sendError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-red-500 text-xs font-mono tracking-wide"
                                    >
                                        <AlertCircle size={14} />
                                        Transmission failed — please try again or email directly.
                                    </motion.div>
                                )}

                                {/* Submit button — proper <button type="submit"> */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="self-start bg-[#BFFF00] text-black font-mono font-black text-[10px] tracking-[0.2em] uppercase
                                               px-10 py-4 sm:px-14 sm:py-5
                                               transition-all duration-150
                                               hover:translate-x-[3px] hover:-translate-y-[3px]
                                               hover:shadow-[6px_6px_0_0_#000] dark:hover:shadow-[6px_6px_0_0_#fff]
                                               disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                                >
                                    {isSubmitting ? "TRANSMITTING..." : "SEND_MESSAGE →"}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* ── Footer ── */}
            <div className="relative z-10 max-w-7xl mx-auto mt-24 sm:mt-32 pt-8 border-t border-neutral-200 dark:border-neutral-900
                            flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center sm:items-start gap-0.5">
                    <span className="font-sans font-black text-xl tracking-tighter uppercase text-[#BFFF00]">
                        SIMPLISTIC
                    </span>
                    <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-[0.35em]">
                        © 2026 SHVET GHARE
                    </span>
                </div>
                <p className="font-mono text-[9px] text-neutral-400 uppercase tracking-[0.2em] hidden sm:block">
                    DESIGNED &amp; BUILT WITH PRECISION
                </p>
                <div className="flex gap-8 font-mono text-[9px] font-black tracking-[0.2em] text-neutral-400">
                    <a href="https://github.com/ShvetGhareWork" className="hover:text-[#BFFF00] transition-colors">GITHUB</a>
                    <a href="https://www.linkedin.com/in/shvetghare1234" className="hover:text-[#BFFF00] transition-colors">LINKEDIN</a>
                    <a href="mailto:shvetgharework@gmail.com" className="hover:text-[#BFFF00] transition-colors">EMAIL</a>
                </div>
            </div>
        </section>
    );
}