"use client";

import Link from "next/link";
import { Container } from "@/components/zippystarter/container";

export function Footer() {
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
        <Container
            component="footer"
            wrapperClassName="relative z-10 border-t border-border bg-background"
            className="py-12 max-w-7xl mx-auto"
        >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
                <div className="flex items-center gap-4">
                    <div 
                        className="text-sm font-bold font-mono tracking-tighter cursor-pointer"
                        onClick={(e) => scrollToSection(e, "top")}
                    >
                        Dāvids<span className="text-primary">_</span>Locāns
                    </div>
                    <div className="w-px h-4 bg-border" />
                    <div className="text-xs font-mono text-muted-foreground">
                        © 2025. ALL RIGHTS RESERVED.
                    </div>
                </div>
                <div className="flex gap-6 text-xs font-mono text-muted-foreground">
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
                    <Link href="#" className="hover:text-black pb-1 border-b-2 border-transparent hover:border-black transition-all duration-200">GITHUB</Link>
                    <Link href="#" className="hover:text-black pb-1 border-b-2 border-transparent hover:border-black transition-all duration-200">LINKEDIN</Link>
                    <Link href="#" className="hover:text-black pb-1 border-b-2 border-transparent hover:border-black transition-all duration-200">TWITTER</Link>
                </div>
            </div>
        </Container>
    );
}
