"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { globalLoadingState } from "@/lib/loading-state";

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
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isComplete, setIsComplete] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [actualProgress, setActualProgress] = useState(0);

    const visibleLines = BOOT_SEQUENCE.slice(0, activeIndex + 1);

    // Track actual page loading progress
    useEffect(() => {
        let maxAssets = 0;
        let loadedAssets = 0;

        const updateProgress = () => {
            if (maxAssets === 0) {
                setActualProgress(100);
            } else {
                setActualProgress(Math.floor((loadedAssets / maxAssets) * 100));
            }
        };

        const handleAssetLoad = () => {
            loadedAssets++;
            updateProgress();
        };

        const checkAssets = () => {
            const images = Array.from(document.images);
            const videos = Array.from(document.querySelectorAll("video"));
            const media = [...images, ...videos];

            maxAssets = media.length;
            loadedAssets = 0;

            if (maxAssets === 0) {
                setActualProgress(100);
            } else {
                media.forEach((asset) => {
                    if (asset instanceof HTMLImageElement) {
                        if (asset.complete) {
                            loadedAssets++;
                        } else {
                            asset.addEventListener("load", handleAssetLoad, { once: true });
                            asset.addEventListener("error", handleAssetLoad, { once: true });
                        }
                    } else if (asset instanceof HTMLVideoElement) {
                        if (asset.readyState >= 3) {
                            loadedAssets++;
                        } else {
                            asset.addEventListener("canplaythrough", handleAssetLoad, { once: true });
                            asset.addEventListener("error", handleAssetLoad, { once: true });
                        }
                    }
                });
                updateProgress();
            }
        };

        if (document.readyState === "complete") {
            checkAssets();
        } else {
            window.addEventListener("load", checkAssets);
        }

        // Backup safeguard - force completion after 8s so users never get stuck
        const timeout = setTimeout(() => {
            setActualProgress(100);
        }, 3000);

        return () => {
            window.removeEventListener("load", checkAssets);
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        let current = activeIndex === -1 ? 0 : activeIndex;

        const advanceSequence = () => {
            if (current < BOOT_SEQUENCE.length - 1) {
                // Stop at VERIFYING_INTEGRITY (index 5) if loading is not complete
                if (current === BOOT_SEQUENCE.length - 2 && actualProgress < 100) {
                    return;
                }
                setActiveIndex(current);
                current++;
            } else if (current === BOOT_SEQUENCE.length - 1) {
                // Final step (SYSTEM_ONLINE)
                setActiveIndex(current);
                current++;
                clearInterval(interval);
                setTimeout(() => {
                    setIsComplete(true);
                    globalLoadingState.setLoaded(true);
                    setTimeout(() => {
                        setIsVisible(false);
                    }, 1100); // Wait for exit animation (800ms) + small buffer
                }, 400); // Reduced pause after SYSTEM_ONLINE
            }
        };

        const interval = setInterval(advanceSequence, 150); // Faster delay between lines

        return () => clearInterval(interval);
    }, [actualProgress, activeIndex]);

    if (!isVisible) return null;

    const visualProgressWidth = Math.max(
        ((activeIndex + 1) / BOOT_SEQUENCE.length) * 100,
        actualProgress * ((BOOT_SEQUENCE.length - 1) / BOOT_SEQUENCE.length)
    );

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ y: "-100%" }}
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

                        {visibleLines.map((line, index) => (
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
                            animate={{ width: `${visualProgressWidth}%` }}
                            transition={{ ease: "linear", duration: 0.3 }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
