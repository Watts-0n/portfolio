"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Database,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  Clock,
  ChevronRight,
  Boxes,
  Layers,
  Workflow,
  Container as ContainerIcon,
  Globe,
  Palette,
  Braces,
  Server,
  GitBranch,
  MonitorSmartphone,
} from "lucide-react";
import { Container } from "@/components/zippystarter/container";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProjectImage } from "@/components/project-image";
import StatusPanel from "@/components/ui/statusPanel";
import DecryptedText from "@/components/ui/decryptText";
import { useState, useEffect, useRef } from "react";
import LogoLoop from "@/components/ui/LogoLoop";
import TiltedCard from "@/components/ui/TiltedCard";
import { GlassPanel } from "@/components/ui/glass-panel";
import PixelBlast from "@/components/ui/background";

// Animated skill bar component
function SkillBar({ skill, level, delay = 0 }: { skill: string; level: number; delay?: number }) {
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

// Glitch text component
function GlitchText({ children, className }: { children: React.ReactNode; className?: string }) {
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

export default function Home() {
  const projects = [
    {
      title: "Nebula Dashboard",
      description: "Real-time analytics platform for distributed systems. Built with React, WebSocket, and Go.",
      tags: ["React", "Go", "WebSocket", "D3.js"],
      image: "/project-placeholder-1.jpg",
      link: "#", repo: "#", year: "2024", status: "LIVE",
    },
    {
      title: "Void Chain",
      description: "Decentralized identity verification protocol. Smart contracts written in Solidity.",
      tags: ["Solidity", "Ethereum", "Web3.js", "Node.js"],
      image: "/project-placeholder-2.jpg",
      link: "#", repo: "#", year: "2024", status: "LIVE",
    },
    {
      title: "Cyber Construct",
      description: "3D architectural visualization tool running in the browser using WebGL.",
      tags: ["Three.js", "WebGL", "Vue", "Python"],
      image: "/project-placeholder-3.jpg",
      link: "#", repo: "#", year: "2023", status: "ARCHIVED",
    },
    {
      title: "Signal OS",
      description: "Encrypted peer-to-peer messaging protocol with end-to-end encryption and zero-knowledge proofs.",
      tags: ["Rust", "WebRTC", "WASM", "TypeScript"],
      image: "/project-placeholder-3.jpg",
      link: "#", repo: "#", year: "2023", status: "WIP",
    },
    {
      title: "Quantum Grid",
      description: "Distributed computing framework for ML workloads with automatic load balancing.",
      tags: ["Go", "Kubernetes", "gRPC", "Python"],
      image: "/project-placeholder-1.jpg",
      link: "#", repo: "#", year: "2024", status: "LIVE",
    },
    {
      title: "Neural Forge",
      description: "Visual ML pipeline editor with drag-and-drop nodes and real-time training previews.",
      tags: ["Python", "React", "TensorFlow", "FastAPI"],
      image: "/project-placeholder-2.jpg",
      link: "#", repo: "#", year: "2024", status: "WIP",
    },
    {
      title: "Orbit CMS",
      description: "Headless content management system with GraphQL API and edge caching.",
      tags: ["Node.js", "GraphQL", "PostgreSQL", "Redis"],
      image: "/project-placeholder-3.jpg",
      link: "#", repo: "#", year: "2023", status: "LIVE",
    },
    {
      title: "Phantom Auth",
      description: "Zero-knowledge authentication library with passkey support and biometric fallback.",
      tags: ["TypeScript", "WebAuthn", "ZKPP", "Rust"],
      image: "/project-placeholder-1.jpg",
      link: "#", repo: "#", year: "2024", status: "LIVE",
    },
    {
      title: "Drift Engine",
      description: "Realtime collaborative whiteboard with CRDT conflict resolution and canvas rendering.",
      tags: ["React", "Yjs", "WebRTC", "Canvas API"],
      image: "/project-placeholder-2.jpg",
      link: "#", repo: "#", year: "2023", status: "ARCHIVED",
    },
    {
      title: "Flux Monitor",
      description: "Infrastructure observability dashboard aggregating Prometheus, Loki, and Tempo traces.",
      tags: ["Go", "Grafana", "Prometheus", "Docker"],
      image: "/project-placeholder-3.jpg",
      link: "#", repo: "#", year: "2024", status: "LIVE",
    },
  ];

  const skills = [
    {
      category: "Frontend",
      icon: <Code2 className="h-4 w-4" />,
      items: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Three.js", level: 75 },
        { name: "Tailwind CSS", level: 92 },
      ],
    },
    {
      category: "Backend",
      icon: <Database className="h-4 w-4" />,
      items: [
        { name: "Node.js", level: 88 },
        { name: "Go", level: 82 },
        { name: "PostgreSQL", level: 85 },
        { name: "Redis", level: 78 },
      ],
    },
    {
      category: "DevOps",
      icon: <Terminal className="h-4 w-4" />,
      items: [
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 72 },
        { name: "AWS", level: 80 },
        { name: "Linux", level: 88 },
      ],
    },
  ];

  const blogPosts = [
    {
      title: "Optimizing React Render Cycles in High-Frequency Data Apps",
      date: "Oct 12, 2024",
      readTime: "5 min",
      excerpt: "Deep dive into memoization strategies and custom hooks for handling 100+ updates per second.",
      tags: ["React", "Performance"],
      lineNum: "001",
    },
    {
      title: "The State of WebAssembly in 2024",
      date: "Sep 28, 2024",
      readTime: "8 min",
      excerpt: "Is WASM ready to replace JavaScript for heavy compute tasks? A performance benchmark.",
      tags: ["WASM", "JavaScript"],
      lineNum: "002",
    },
    {
      title: "Building a Custom Kubernetes Operator with Go",
      date: "Aug 15, 2024",
      readTime: "12 min",
      excerpt: "Automating stateful application management using the Operator pattern.",
      tags: ["Go", "Kubernetes"],
      lineNum: "003",
    },
  ];

  const statusColor: Record<string, string> = {
    LIVE: "text-primary",
    WIP: "text-yellow-500",
    ARCHIVED: "text-muted-foreground",
  };

  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE = 5; // 1 featured + 4 in bento

  // ── Adaptive bento grid sub-components ──────────────────────────
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

  // Build bento rows from a supplied list (supports slicing for initial/expanded view)
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

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Scrollable PixelBlast background — covers the entire page height */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <PixelBlast
          variant="triangle"
          pixelSize={4}
          color="#c0c0c0"
          patternScale={50}
          patternDensity={0.3}
          pixelSizeJitter={0}
          enableRipples={false}
          speed={0.5}
          edgeFade={0}
          transparent
        />
      </div>
      {/* Navigation / Header */}
      <Container
        component="header"
        wrapperClassName="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
        className="mx-auto max-w-7xl flex items-center justify-between h-16 uppercase"
      >
        <div className="text-xl font-bold font-mono tracking-tighter">
          Dāvids<span className="text-primary">_</span>Locāns
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground ">
          <Link href="#projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link href="#skills" className="hover:text-primary transition-colors">Skills</Link>
          <Link href="#blog" className="hover:text-primary transition-colors">Logs</Link>
          <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>
        <Button
          variant="outline"
          className="font-mono text-xs border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary"
        >
          resume_v4.pdf
        </Button>
      </Container>

      {/* Hero Section */}
      <Container
        wrapperClassName="relative select-none min-h-screen flex items-center pt-16 overflow-hidden"
        className="mx-auto max-w-7xl flex-1"
      >
        {/* Background Image with Overlay */}
        <div className="fixed w-screen h-screen inset-0 z-0">
          <div className="relative w-screen h-screen bg-background overflow-hidden">
            <div className="animate-hero-breathe absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('/hero-bg.jpg')] before:absolute before:inset-0 before:bg-primary before:mix-blend-color-dodge dark:before:mix-blend-color" />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/50 to-background" />
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center pt-8 pt:sm-0">
          <div className="space-y-6">
            <div className="inline-flex backdrop-blur-xs items-center gap-2 py-1 px-3 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              SYSTEM ONLINE // AVAILABLE FOR HIRE
            </div>
            <DecryptedText
              revealDirection="start"
              sequential
              useOriginalCharsOnly={false}
              speed={100}
              animateOn="view"
              staggerDelay={250}
              loop={5000}
              elementByElement={true}
            >
              <h1 className="text-6xl md:text-8xl font-display tracking-tighter leading-[0.9]">
                FULL
                <br />
                Stack
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-foreground">
                  Dev_
                </span>
              </h1>
            </DecryptedText>
            <p className="md:text-xl text-muted-foreground max-w-md leading-relaxed">
              Architecting digital voids and crafting high-performance web
              experiences. Specialized in scalable distributed systems and
              interactive 3D interfaces.
            </p>
            <div className="flex gap-6 pt-6 items-center">
              <Link
                href="#projects"
                className={cn("uppercase rounded-none font-mono", buttonVariants({ variant: "default", size: "lg" }))}
              >
                View projects <ArrowRight className="size-4" />
              </Link>
              <div className="w-px h-8 bg-border" />
              <div className="flex gap-2">
                <Link href="#" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="#" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Decorative Abstract Element */}
          <StatusPanel projects={projects.length} />
        </div>
      </Container>

      {/* ═══════════════════════════════════════════
          PROJECTS SECTION - REDESIGNED
      ═══════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════
          SKILLS SECTION - REDESIGNED
      ═══════════════════════════════════════════ */}
      <Container
        id="skills"
        component="section"
        wrapperClassName="relative z-10 py-24 border-t border-border bg-secondary/5"
        className="mx-auto max-w-7xl flex-1"
      >
        {/* Section Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="font-mono text-xs text-muted-foreground mb-3 flex items-center gap-2">
              <span className="text-primary">▸</span> SECTION 02
            </div>
            <h2 className="text-4xl md:text-6xl font-display tracking-tighter mb-4">
              TECH_STACK
            </h2>
            <div className="h-[2px] w-24 bg-primary" />
          </div>
          <p className="text-muted-foreground max-w-sm text-right hidden md:block">
            Weapons of choice for engineering digital products. Always evolving.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left — Skill Groups with Bars */}
          <GlassPanel className="md:col-span-8 grid sm:grid-cols-3 gap-8 p-4 py-15 h-auto sm:h-[300]">
            {skills.map((group, gIdx) => (
              <div key={gIdx} className="space-y-5">
                {/* Category header */}
                <div className="flex items-center gap-2 pb-3 border-b border-primary/30">
                  <span className="text-primary">{group.icon}</span>
                  <h3 className="font-display text-sm tracking-widest uppercase">
                    {group.category}
                  </h3>
                </div>
                {/* Skill bars */}
                <div className="space-y-4">
                  {group.items.map((item, sIdx) => (
                    <SkillBar
                      key={sIdx}
                      skill={item.name}
                      level={item.level}
                      delay={gIdx * 150 + sIdx * 100}
                    />
                  ))}
                </div>
              </div>
            ))}
          </GlassPanel>

          {/* Right — Attribute boxes */}
          <div className="md:col-span-4 grid grid-cols-2 gap-3 content-start">
            <div className="col-span-2 font-mono text-xs text-muted-foreground mb-2">
              // CORE ATTRIBUTES
            </div>
            {[
              { icon: <Code2 className="h-6 w-6" />, label: "CLEAN_CODE", desc: "SOLID principles, clean architecture" },
              { icon: <Database className="h-6 w-6" />, label: "SCALABLE_DB", desc: "Schema design, query optimization" },
              { icon: <Cpu className="h-6 w-6" />, label: "PERFORMANCE", desc: "Sub-100ms render targets" },
              { icon: <Terminal className="h-6 w-6" />, label: "DEVOPS", desc: "CI/CD, IaC, containerization" },
            ].map((attr, i) => (
              <div
                key={i}
                className="group p-4 border border-border bg-background hover:border-primary transition-all duration-300 flex flex-col gap-2 relative overflow-hidden"
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-4 h-[2px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 left-0 w-[2px] h-4 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-primary">{attr.icon}</span>
                <span className="font-mono text-[10px] font-bold tracking-widest">{attr.label}</span>
                <span className="font-mono text-[9px] text-muted-foreground leading-relaxed">{attr.desc}</span>
              </div>
            ))}

            {/* Extra: tools list */}
            <div className="col-span-2 mt-2 p-4 border border-border bg-background">
              <div className="font-mono text-[10px] text-muted-foreground mb-3">// TOOLS &amp; STACK</div>
              <div className="flex flex-wrap gap-1.5">
                {["Git", "Linux", "AWS", "Kubernetes", "Figma", "Docker", "Vim", "Terraform"].map((tool) => (
                  <span key={tool} className="font-mono text-[9px] px-2 py-1 border border-border hover:border-primary hover:text-primary transition-colors cursor-default">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* ═══════════════════════════════════════════
          LOGO LOOP - TECH MARQUEE
      ═══════════════════════════════════════════ */}
      <Container
        component="section"
        wrapperClassName="relative z-10 py-12 border-t border-b border-border backdrop-blur-[3px] shadow-lg"
        className="max-w-7xl mx-auto"
      >
        <LogoLoop
          logos={[
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><Braces className="size-4" /> React</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><Layers className="size-4" /> Next.js</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><Code2 className="size-4" /> TypeScript</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><Server className="size-4" /> Node.js</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><Terminal className="size-4" /> Go</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><Database className="size-4" /> PostgreSQL</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><ContainerIcon className="size-4" /> Docker</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><Boxes className="size-4" /> Kubernetes</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><Globe className="size-4" /> Three.js</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><Palette className="size-4" /> Tailwind</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><Workflow className="size-4" /> Redis</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><GitBranch className="size-4" /> Git</span> },
            { node: <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"><MonitorSmartphone className="size-4" /> Figma</span> },
          ]}
          speed={80}
          gap={48}
          logoHeight={20}
          pauseOnHover={true}
          fadeOut={false}
          scaleOnHover={true}
        />
      </Container>

      {/* ═══════════════════════════════════════════
          BLOG / TRANSMISSIONS - REDESIGNED
      ═══════════════════════════════════════════ */}
      <Container
        id="blog"
        component="section"
        wrapperClassName="relative z-10 py-24 border-t border-border"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="font-mono text-xs text-muted-foreground mb-3 flex items-center gap-2">
              <span className="text-primary">▸</span> SECTION 03
            </div>
            <h2 className="text-4xl md:text-6xl font-display tracking-tighter mb-4">
              TRANSMISSIONS
            </h2>
            <div className="h-[2px] w-24 bg-primary" />
          </div>
          <Button variant="outline" className="font-mono text-xs hidden md:flex items-center gap-2 border-primary/30 hover:border-primary hover:text-primary">
            VIEW ALL <ChevronRight className="size-3" />
          </Button>
        </div>

        {/* Terminal-style post list */}
        <GlassPanel corners={false} className="border border-border">
          {/* Terminal bar */}
          <div className="border-b border-border bg-card px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            </div>
            <span className="font-mono text-xs text-muted-foreground ml-2">~/logs/transmissions</span>
          </div>

          {/* Posts */}
          {blogPosts.map((post, index) => (
            <Link href="#" key={index} className="group block">
              <div className="grid md:grid-cols-[60px_1fr_auto] items-stretch border-b border-border last:border-b-0 hover:bg-card transition-colors duration-200">
                {/* Line number */}
                <div className="font-mono text-xs text-muted-foreground/60 border-r border-border flex items-center justify-center p-4 select-none">
                  {post.lineNum}
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] px-1.5 py-0.5 border border-primary/30 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display group-hover:text-primary transition-colors mb-2 text-balance leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>
                {/* Metadata */}
                <div className="border-l border-border flex flex-col justify-center items-end gap-2 p-4 md:p-6 min-w-[120px]">
                  <span className="font-mono text-[9px] text-muted-foreground whitespace-nowrap">{post.date}</span>
                  <div className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground">
                    <Clock className="size-2.5" /> {post.readTime}
                  </div>
                  <ArrowUpRight className="size-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-2" />
                </div>
              </div>
            </Link>
          ))}
        </GlassPanel>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" className="font-mono text-xs">VIEW ALL TRANSMISSIONS</Button>
        </div>
      </Container>

      {/* ═══════════════════════════════════════════
          CONTACT SECTION - REDESIGNED
      ═══════════════════════════════════════════ */}
      <Container
        id="contact"
        component="section"
        wrapperClassName="relative z-10 py-24 border-t border-border bg-card/20 backdrop-blur-[3px] shadow-lg"
        className="max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left side — label + info */}
          <div>
            <div className="font-mono text-xs text-muted-foreground mb-3 flex items-center gap-2">
              <span className="text-primary">▸</span> SECTION 04
            </div>
            <h2 className="text-4xl md:text-6xl font-display tracking-tighter mb-4">
              INITIATE_
              <br />
              CONTACT
            </h2>
            <div className="h-[2px] w-24 bg-primary mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-xs">
              Have a project in mind or just want to discuss the singularity? Send a signal through the void.
            </p>

            {/* Contact methods */}
            <div className="space-y-4">
              {[
                { icon: <Mail className="h-4 w-4" />, label: "EMAIL", value: "davids@locans.dev" },
                { icon: <Github className="h-4 w-4" />, label: "GITHUB", value: "github.com/watts0n" },
                { icon: <Linkedin className="h-4 w-4" />, label: "LINKEDIN", value: "linkedin.com/in/davids" },
              ].map((method, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-8 h-8 border border-border group-hover:border-primary transition-colors flex items-center justify-center text-muted-foreground group-hover:text-primary">
                    {method.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-muted-foreground tracking-widest">{method.label}</div>
                    <div className="font-mono text-xs group-hover:text-primary transition-colors">{method.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side — form */}
          <div className="relative">
            {/* Corner brackets */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary pointer-events-none" />

            <div className="p-8 border border-border bg-background">
              <div className="font-mono text-[10px] text-muted-foreground mb-6">// NEW_MESSAGE.init()</div>
              <form className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono text-muted-foreground tracking-widest">NAME</label>
                    <Input id="name" placeholder="John Doe" className="font-mono text-sm rounded-none border-border focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono text-muted-foreground tracking-widest">EMAIL</label>
                    <Input id="email" type="email" placeholder="john@example.com" className="font-mono text-sm rounded-none border-border focus:border-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-xs font-mono text-muted-foreground tracking-widest">SUBJECT</label>
                  <Input id="subject" placeholder="Project inquiry / Collaboration / ..." className="font-mono text-sm rounded-none border-border focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-muted-foreground tracking-widest">MESSAGE</label>
                  <Textarea id="message" placeholder="Enter your transmission..." className="min-h-[140px] font-mono text-sm rounded-none border-border focus:border-primary resize-none" />
                </div>
                <Button type="submit" className="w-full font-mono text-sm uppercase rounded-none hover:translate-y-[-1px] transition-all duration-200" size="lg">
                  SEND TRANSMISSION <ArrowRight className="ml-2 size-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <Container
        component="footer"
        wrapperClassName="relative z-10 border-t border-border bg-background"
        className="py-12 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="text-sm font-bold font-mono tracking-tighter">
              Dāvids<span className="text-primary">_</span>Locāns
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="text-xs font-mono text-muted-foreground">
              © 2025. ALL RIGHTS RESERVED.
            </div>
          </div>
          <div className="flex gap-6 text-xs font-mono text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">GITHUB</Link>
            <Link href="#" className="hover:text-primary transition-colors">LINKEDIN</Link>
            <Link href="#" className="hover:text-primary transition-colors">TWITTER</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
