"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/zippystarter/container";
import { Mail, Github, Linkedin, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactSection() {
    const [emailStr, setEmailStr] = useState("loading...");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
                setTimeout(() => setStatus("idle"), 5000); // Reset after 5 seconds
            } else {
                const result = await response.json();
                setStatus("error");
                setErrorMessage(result.error || "Transmission failed.");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage("Network error. Could not send signal.");
        }
    };

    useEffect(() => {
        const u = "davidslocans";
        const d = "gmail.com";
        setEmailStr(`${u}@${d}`);
    }, []);

    return (
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
                            { icon: <Mail className="h-4 w-4" />, label: "EMAIL", value: emailStr, href: emailStr !== "loading..." ? `mailto:${emailStr}` : "#" },
                            /* Temporarily hidden
                            { icon: <Github className="h-4 w-4" />, label: "GITHUB", value: "github.com/watts0n", href: "https://github.com/watts0n" },
                            { icon: <Linkedin className="h-4 w-4" />, label: "LINKEDIN", value: "linkedin.com/in/davids", href: "https://linkedin.com/in/davids" },
                            */
                        ].map((method, i) => (
                            <a
                                key={i}
                                href={method.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 group cursor-pointer"
                            >
                                <div className="w-8 h-8 border border-border group-hover:border-primary transition-colors flex items-center justify-center text-muted-foreground group-hover:text-primary">
                                    {method.icon}
                                </div>
                                <div>
                                    <div className="font-mono text-[9px] text-muted-foreground tracking-widest">{method.label}</div>
                                    <div className="font-mono text-xs group-hover:text-primary transition-colors">{method.value}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right side — form */}
                <div className="relative bg-card/30">
                    {/* Corner brackets */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-primary pointer-events-none" />
                    <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-primary pointer-events-none" />
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-primary pointer-events-none" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-primary pointer-events-none" />

                    <div className="p-8 border border-border">
                        <div className="font-mono text-[10px] text-muted-foreground mb-6">// NEW_MESSAGE.init()</div>
                        <form onSubmit={handleSubmit} className="grid gap-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-xs font-mono text-muted-foreground tracking-widest">NAME</label>
                                    <Input name="name" id="name" placeholder="John Doe" className="font-mono text-sm rounded-none border-border focus:border-primary bg-card/70" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-mono text-muted-foreground tracking-widest">EMAIL</label>
                                    <Input name="email" id="email" type="email" placeholder="john@example.com" className="font-mono text-sm rounded-none border-border focus:border-primary bg-card/70" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-xs font-mono text-muted-foreground tracking-widest">SUBJECT</label>
                                <Input name="subject" id="subject" placeholder="Project inquiry / Collaboration / ..." className="font-mono text-sm rounded-none border-border focus:border-primary bg-card/70" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs font-mono text-muted-foreground tracking-widest">MESSAGE</label>
                                <Textarea name="message" id="message" placeholder="Enter your transmission..." className="min-h-[140px] font-mono text-sm rounded-none border-border focus:border-primary resize-none bg-card/70" />
                            </div>
                            <div>
                                <Button type="submit" disabled={status === "loading" || status === "success"} className="w-full font-mono text-sm uppercase rounded-none transition-all" size="lg">
                                    {status === "loading" ? (
                                        <>TRANSMITTING... <Loader2 className="ml-2 size-4 animate-spin" /></>
                                    ) : status === "success" ? (
                                        <>TRANSMISSION DELIVERED <CheckCircle2 className="ml-2 size-4 text-green-500" /></>
                                    ) : (
                                        <>SEND TRANSMISSION <ArrowRight className="ml-2 size-4" /></>
                                    )}
                                </Button>
                                {status === "error" && (
                                    <p className="text-red-500 text-xs font-mono text-center mt-3 tracking-widest">{errorMessage}</p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}
