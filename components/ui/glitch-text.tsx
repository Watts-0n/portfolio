"use client";

import { cn } from "@/lib/utils";

export function GlitchText({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={cn("relative inline-block group", className)}>
            {children}
            <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100 text-primary"
                style={{ clipPath: "inset(30% 0 50% 0)" }}
                aria-hidden
            >
                {children}
            </span>
        </span>
    );
}
