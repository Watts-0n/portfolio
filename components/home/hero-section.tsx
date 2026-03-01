"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/zippystarter/container";
import DecryptedText from "@/components/ui/decryptText";
import StatusPanel from "@/components/ui/statusPanel";
import { projects } from "@/lib/data";

const PixelBlast = dynamic(() => import("@/components/ui/background"), {
    ssr: false,
});

export function HeroSection() {
    return (
        <>
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
                    <Link href="#experience" className="hover:text-primary transition-colors">Experience</Link>
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
        </>
    );
}
