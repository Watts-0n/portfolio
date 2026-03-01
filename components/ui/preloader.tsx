"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const BOOT_SEQUENCE = [
    "INIT_SYSTEM_BOOT...",
    "ESTABLISHING_SECURE_CONNECTION...",
    "DECRYPTING_ASSETS...",
    "LOADING_KERNEL_MODULES...",
    "MOUNTING_VIRTUAL_DOM...",
    "VERIFYING_INTEGRITY...",
    "SYSTEM_ONLINE.",
];

export function Preloader() {
    const [lines, setLines] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let currentLine = 0;

        const interval = setInterval(() => {
            if (currentLine < BOOT_SEQUENCE.length) {
                setLines((prev) => [...prev, BOOT_SEQUENCE[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(() => setIsVisible(false), 800); // Wait for exit animation
                }, 500); // Brief pause after SYSTEM_ONLINE
            }
        }, 300); // Delay between lines

        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-100 bg-background flex flex-col items-start justify-end p-8 md:p-12 overflow-hidden"
                >
                    {/* Subtle grid background */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                    {/* Terminal output area */}
                    <div className="relative z-10 w-full max-w-3xl space-y-2">
                        <div className="font-mono text-xs text-muted-foreground mb-6">
                            <span className="text-primary">▸</span> TERMINAL_SESSION_STARTED
                        </div>

                        {lines.map((line, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="font-mono text-sm md:text-base text-muted-foreground flex items-center gap-3"
                            >
                                <span className="text-primary/50 text-xs">[{String(index + 1).padStart(2, '0')}]</span>
                                <span className={index === BOOT_SEQUENCE.length - 1 ? "text-primary" : ""}>
                                    {line}
                                </span>
                            </motion.div>
                        ))}

                        {/* Blinking cursor */}
                        <motion.div
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                            className="w-3 h-5 bg-primary mt-2 ml-10"
                        />
                    </div>

                    {/* Progress bar at bottom */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary/20">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            animate={{ width: `${(lines.length / BOOT_SEQUENCE.length) * 100}%` }}
                            transition={{ ease: "linear", duration: 0.3 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
