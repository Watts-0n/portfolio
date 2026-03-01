"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";
export function PageReveal({ children }: { children: ReactNode }) {
    // Preloader sequence: ~2100ms typing + 500ms pause + 800ms exit = 3400ms.
    // We fade the page in slightly before the preloader finishes sliding out for a smooth transition.
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6, ease: [0.76, 0, 0.24, 1] }}
        >
            {children}
        </motion.div>
    );
}