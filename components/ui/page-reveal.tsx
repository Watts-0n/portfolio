"use client";
import { motion } from "motion/react";
import { ReactNode, useState, useEffect, useLayoutEffect } from "react";
import { globalLoadingState } from "@/lib/loading-state";

const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function PageReveal({ children }: { children: ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(globalLoadingState.getIsLoaded());

    useIsomorphicLayoutEffect(() => {
        // If preloader was cached, trigger reveal immediately (before paint)
        try {
            if (sessionStorage.getItem("preloader_shown")) {
                setIsLoaded(true);
                globalLoadingState.setLoaded(true);
                return;
            }
        } catch {}

        const unsubscribe = globalLoadingState.subscribe(setIsLoaded);
        return unsubscribe;
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1, y: "100vh" }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 1, y: "100vh" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
            {children}
        </motion.div>
    );
}