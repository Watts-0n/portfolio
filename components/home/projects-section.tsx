"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectImage } from "@/components/project-image";
import { GlassPanel } from "@/components/ui/glass-panel";
import TiltedCard from "@/components/ui/TiltedCard";
import { Container } from "@/components/zippystarter/container";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/data";

const statusColor: Record<string, string> = {
    LIVE: "text-primary",
    WIP: "text-yellow-500",
    ARCHIVED: "text-muted-foreground",
};

const INITIAL_VISIBLE = 5;

type Project = typeof projects[0];

const WideCard = ({ p, idx }: { p: Project; idx: number }) => (
    <GlassPanel background="bg-card/50" className="md:col-span-5 group relative overflow-hidden flex flex-col border border-border hover:border-primary/50 transition-all duration-500">
        <div className="relative overflow-hidden h-48 shrink-0">
            <ProjectImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0" />
            <div className="absolute top-3 right-3 font-mono text-[36px] font-bold text-border/60 leading-none select-none">
                {String(idx + 2).padStart(2, "0")}
            </div>
        </div>
        <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between">
                <span className={cn("font-mono text-[9px] tracking-widest", statusColor[p.status])}>◉ {p.status}</span>
                <span className="font-mono text-[9px] text-muted-foreground">{p.year}</span>
            </div>
            <h3 className="text-xl font-display group-hover:text-primary transition-colors leading-tight">{p.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed flex-1">{p.description}</p>
            <div className="flex flex-wrap gap-1">
                {p.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 border border-border">{tag}</span>
                ))}
            </div>
            <div className="flex gap-4 pt-3 border-t border-border">
                <Link href={p.link} className="font-mono text-[9px] flex items-center gap-1 hover:text-primary transition-colors">DEMO <ExternalLink className="size-2.5" /></Link>
                <Link href={p.repo} className="font-mono text-[9px] flex items-center gap-1 hover:text-primary transition-colors">CODE <Github className="size-2.5" /></Link>
            </div>
        </div>
    </GlassPanel>
);

const MidCard = ({ p, idx }: { p: Project; idx: number }) => (
    <GlassPanel background="bg-card/50" className="group relative overflow-hidden flex flex-col border border-border hover:border-primary/50 transition-all duration-500">
        <div className="relative overflow-hidden h-32 shrink-0">
            <ProjectImage src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0" />
            <div className="absolute top-2 right-3 font-mono text-[28px] font-bold text-border/60 leading-none select-none">
                {String(idx + 2).padStart(2, "0")}
            </div>
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
            <div className="flex items-center justify-between">
                <span className={cn("font-mono text-[9px] tracking-widest", statusColor[p.status])}>◉ {p.status}</span>
                <span className="font-mono text-[9px] text-muted-foreground">{p.year}</span>
            </div>
            <h3 className="text-base font-display group-hover:text-primary transition-colors">{p.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">{p.description}</p>
            <div className="flex gap-3 pt-2 border-t border-border">
                <Link href={p.link} className="font-mono text-[9px] flex items-center gap-1 hover:text-primary transition-colors">DEMO <ExternalLink className="size-2.5" /></Link>
                <Link href={p.repo} className="font-mono text-[9px] flex items-center gap-1 hover:text-primary transition-colors">CODE <Github className="size-2.5" /></Link>
            </div>
        </div>
    </GlassPanel>
);

const DarkCard = ({ p, idx }: { p: Project; idx: number }) => (
    <GlassPanel background="bg-foreground" inverted className="md:col-span-3 group relative overflow-hidden bg-foreground dark:bg-card flex flex-col">
        <div className="absolute inset-0">
            <ProjectImage src={p.image} alt={p.title} className="h-full w-full object-cover opacity-35 dark:opacity-20 group-hover:opacity-45 transition-opacity duration-500" />
        </div>
        <div className="relative z-10 p-5 flex flex-col gap-3 h-full min-h-[200px]">
            <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-widest text-primary-foreground/70 dark:text-primary">◉ {p.status}</span>
                <span className="font-mono text-[28px] font-bold text-white/10 leading-none select-none">
                    {String(idx + 2).padStart(2, "0")}
                </span>
            </div>
            <div className="flex-1 flex flex-col justify-end">
                <h3 className="text-lg font-display text-primary-foreground dark:text-foreground group-hover:text-white transition-colors mb-1">{p.title}</h3>
                <p className="text-xs text-primary-foreground/50 dark:text-muted-foreground leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                    {p.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 border border-white/20 text-white/60">{tag}</span>
                    ))}
                </div>
                <div className="flex gap-4 pt-2 border-t border-white/20">
                    <Link href={p.link} className="font-mono text-[9px] flex items-center gap-1 text-white/60 hover:text-white transition-colors">DEMO <ExternalLink className="size-2.5" /></Link>
                    <Link href={p.repo} className="font-mono text-[9px] flex items-center gap-1 text-white/60 hover:text-white transition-colors">CODE <Github className="size-2.5" /></Link>
                </div>
            </div>
        </div>
    </GlassPanel>
);

const renderBentoGrid = (list: typeof projects) => {
    if (list.length === 0) return null;

    const rows: React.ReactElement[] = [];
    let i = 0;
    let globalIdx = 0; // index within list[]

    while (i < list.length) {
        const p0 = list[i];     // wide
        const p1 = list[i + 1]; // mid top
        const p2 = list[i + 2]; // mid bottom
        const p3 = list[i + 3]; // dark

        const rowBaseIdx = globalIdx;

        rows.push(
            <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                {p0 && <WideCard p={p0} idx={rowBaseIdx} />}
                <div className="md:col-span-4 grid grid-rows-2 gap-4 ">
                    {p1 ? <MidCard p={p1} idx={rowBaseIdx + 1} /> : <div />}
                    {p2 ? <MidCard p={p2} idx={rowBaseIdx + 2} /> : <div />}
                </div>
                {p3
                    ? <DarkCard p={p3} idx={rowBaseIdx + 3} />
                    : <div className="md:col-span-3" />
                }
            </div>
        );

        i += 4;
        globalIdx += 4;
    }

    return <div className="flex flex-col">{rows}</div>;
};

export function ProjectsSection() {
    const [showAll, setShowAll] = useState(false);

    return (
        <Container
            id="projects"
            component="section"
            wrapperClassName="relative z-10 py-24 border-t border-border backdrop-blur-[3px] shadow-lg"
            className="mx-auto max-w-7xl flex-1"
        >
            {/* Section Header */}
            <div className="flex justify-between items-end mb-16 gap-4">
                <div>
                    <div className="font-mono text-xs text-muted-foreground mb-3 flex items-center gap-2">
                        <span className="text-primary">▸</span> SECTION 01
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display tracking-tighter mb-4">
                        SELECTED
                        <br />
                        WORKS
                    </h2>
                    <div className="h-[2px] w-24 bg-primary" />
                </div>
                <p className="text-muted-foreground max-w-sm text-left hidden md:block">
                    A collection of experiments, production apps, and open source
                    contributions.
                </p>
            </div>

            {/* Featured Project (first one — big) */}
            <GlassPanel background="bg-card/50" className="mb-6 group relative border border-border hover:border-primary/50 transition-all duration-500">
                <div className="grid md:grid-cols-[1fr_1fr] min-h-[360px]">
                    {/* Image side — TiltedCard 3D effect */}
                    <TiltedCard
                        containerHeight="100%"
                        containerWidth="100%"
                        rotateAmplitude={8}
                        scaleOnHover={1.02}
                        className="min-h-[240px]"
                    >
                        <div className="relative overflow-hidden w-full h-full">
                            <ProjectImage src={projects[0].image} alt={projects[0].title} className="h-full w-full min-h-[240px] object-cover" />
                            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </TiltedCard>
                    {/* Content side */}
                    <div className="p-8 flex flex-col justify-between relative">
                        {/* Index number */}
                        <div className="absolute top-6 right-8 font-mono text-[80px] font-bold text-border leading-none select-none pointer-events-none">
                            01
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={cn("font-mono text-[10px] tracking-widest", statusColor[projects[0].status])}>
                                    ◉ {projects[0].status}
                                </span>
                                <span className="font-mono text-[10px] text-muted-foreground">// {projects[0].year}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-display tracking-tighter mb-4 group-hover:text-primary transition-colors">
                                {projects[0].title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-6 max-w-sm">
                                {projects[0].description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {projects[0].tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="font-mono text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-6 mt-8">
                            <Link
                                href={projects[0].link}
                                className="font-mono text-xs flex items-center gap-2 hover:text-primary transition-colors group/link"
                            >
                                LIVE DEMO <ArrowUpRight className="size-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </Link>
                            <Link
                                href={projects[0].repo}
                                className="font-mono text-xs flex items-center gap-2 hover:text-primary transition-colors group/link"
                            >
                                SOURCE <Github className="size-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </GlassPanel>

            {/* Remaining projects — adaptive bento grid */}
            {(() => {
                const bentoList = projects.slice(1, showAll ? projects.length : INITIAL_VISIBLE);
                const hasMore = projects.length > INITIAL_VISIBLE;
                return (
                    <>
                        {renderBentoGrid(bentoList)}
                        {hasMore && (
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={() => setShowAll((v) => !v)}
                                    className="group font-mono text-xs px-8 py-3 border border-border hover:border-primary bg-card hover:bg-primary/5 transition-all duration-300 flex items-center gap-3"
                                >
                                    <span className="text-primary">▸</span>
                                    {showAll
                                        ? `COLLAPSE [ ${projects.length - INITIAL_VISIBLE} HIDDEN ]`
                                        : `LOAD ALL PROJECTS [ +${projects.length - INITIAL_VISIBLE} MORE ]`}
                                    <span className={cn(
                                        "transition-transform duration-300",
                                        showAll ? "rotate-180" : "rotate-0"
                                    )}>▾</span>
                                </button>
                            </div>
                        )}
                    </>
                );
            })()}
        </Container>
    );
}
