"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/zippystarter/container";
import DecryptedText from "@/components/ui/decryptText";
import StatusPanel from "@/components/ui/statusPanel";
import { projects } from "@/lib/data";

export function HeroSection() {
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else if (id === "top") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <>
            {/* Navigation / Header */}
            <Container
                component="header"
                wrapperClassName="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
                className="mx-auto max-w-7xl flex items-center justify-between h-16 uppercase"
            >
                <div
                    className="text-xl font-bold font-mono tracking-tighter cursor-pointer"
                    onClick={(e) => scrollToSection(e, "top")}
                >
                    Dāvids<span className="text-primary">_</span>Locāns
                </div>
                <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground ">
                    <a
                        href="#projects"
                        onClick={(e) => scrollToSection(e, "projects")}
                        className="hover:text-black pb-1 border-b-2 border-transparent hover:border-black transition-all duration-200"
                    >
                        Projects
                    </a>
                    <a
                        href="#skills"
                        onClick={(e) => scrollToSection(e, "skills")}
                        className="hover:text-black pb-1 border-b-2 border-transparent hover:border-black transition-all duration-200"
                    >
                        Skills
                    </a>
                    <a
                        href="#experience"
                        onClick={(e) => scrollToSection(e, "experience")}
                        className="hover:text-black pb-1 border-b-2 border-transparent hover:border-black transition-all duration-200"
                    >
                        Experience
                    </a>
                    <a
                        href="#contact"
                        onClick={(e) => scrollToSection(e, "contact")}
                        className="hover:text-black pb-1 border-b-2 border-transparent hover:border-black transition-all duration-200"
                    >
                        Contact
                    </a>
                </nav>
                <Button
                    variant="outline"
                    className="font-mono text-xs border-primary/50 hover:bg-primary/10 hover:text-black hover:border-primary"
                >
                    resume_v4.pdf
                </Button>
            </Container>

            {/* Hero Section */}
            <Container
                wrapperClassName="relative select-none min-h-screen flex items-center pt-16 overflow-hidden"
                className="mx-auto max-w-7xl flex-1"
            >
                {/* Background removed - handled globally in layout.tsx */}
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
