"use client";

import { useState, useRef, useEffect } from "react";

type ExperienceItem = {
    title: string;
    company: string;
    date: string;
    readTime: string;
    excerpt: string;
    tags: string[];
    lineNum: string;
};

export function ExperienceList({ items }: { items: ExperienceItem[] }) {
    const [isAtTop, setIsAtTop] = useState(true);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const sentinelTopRef = useRef<HTMLDivElement>(null);
    const sentinelBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === sentinelTopRef.current) {
                        setIsAtTop(entry.isIntersecting);
                    } else if (entry.target === sentinelBottomRef.current) {
                        setIsAtBottom(entry.isIntersecting);
                    }
                });
            },
            {
                root: scrollContainerRef.current,
                rootMargin: "0px",
                threshold: 0,
            }
        );

        if (sentinelTopRef.current) {
            observer.observe(sentinelTopRef.current);
        }
        if (sentinelBottomRef.current) {
            observer.observe(sentinelBottomRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative">
            <div
                ref={scrollContainerRef}
                className="overflow-y-auto max-h-[550px] scrollbar-custom relative"
            >
                {/* Sentinel element for detecting scroll start */}
                <div ref={sentinelTopRef} className="h-px w-full pointer-events-none" />

                {items.map((item, index) => (
                    <div key={index} className="group relative grid md:grid-cols-[60px_1fr_auto] items-stretch transition-colors duration-200" >
                        {/* Mobile horizontal separator - inset and consistent strength */}
                        {index !== items.length - 1 && (
                            <div className="absolute bottom-0 left-6 right-6 border-b border-border md:hidden" />
                        )}
                        {/* Line number */}
                        <div className={`font-mono text-xs text-muted-foreground/60 md:border-r border-border flex items-center justify-center p-4 select-none ${index === items.length - 1 ? "pb-8" : ""}`}>
                            {item.lineNum}
                        </div>
                        {/* Content */}
                        <div className={`p-6 ${index === items.length - 1 ? "pb-10" : ""}`}>
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                {item.tags.map((tag) => (
                                    <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 border border-primary/30 text-primary">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-xl md:text-2xl font-display group-hover:text-primary transition-colors mb-2 text-balance leading-tight">
                                {item.title} <span className="text-primary/50 text-base md:text-lg">@ {item.company}</span>
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                                {item.excerpt}
                            </p>
                        </div>
                        {/* Metadata */}
                        <div className={`md:border-l border-border flex flex-col justify-center items-center gap-2 w-full md:w-[120px] p-6 md:p-0 ${index === items.length - 1 ? "pb-8" : ""}`}>
                            <span className="font-mono text-[9px] text-muted-foreground whitespace-nowrap">{item.date}</span>
                            <div className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground uppercase">
                                <div className="size-1.5 rounded-full bg-primary" /> {item.readTime}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Sentinel element for detecting scroll end */}
                <div ref={sentinelBottomRef} className="h-px w-full pointer-events-none" />
            </div>

            {/* Top fade indicator */}
            <div
                className={`pointer-events-none absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-card to-transparent transition-opacity duration-300 z-10 ${isAtTop ? "opacity-0" : "opacity-100"
                    }`}
            />

            {/* Bottom fade indicator */}
            <div
                className={`pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-card to-transparent transition-opacity duration-300 z-10 ${isAtBottom ? "opacity-0" : "opacity-100"
                    }`}
            />
        </div>
    );
}
