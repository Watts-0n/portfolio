"use client";

import { useState, useEffect, useRef } from "react";

export function SkillBar({ skill, level, delay = 0 }: { skill: string; level: number; delay?: number }) {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setWidth(level), delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [level, delay]);

    return (
        <div ref={ref} className="group flex items-center gap-4">
            <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors w-24 shrink-0">
                {skill}
            </span>
            <div className="flex-1 h-[2px] bg-border relative overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: `${width}%` }}
                />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums w-8 text-right">
                {level}%
            </span>
        </div>
    );
}
