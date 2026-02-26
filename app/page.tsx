import Link from "next/link";
import { Container } from "@/components/zippystarter/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SkillBar } from "@/components/ui/skill-bar";
import { skills, blogPosts } from "@/lib/data";
import { ChevronRight, ArrowUpRight, Clock, Code2, Database, Cpu, Terminal, Braces, Layers, Server, Container as ContainerIcon, Boxes, Globe, Palette, Workflow, GitBranch, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoLoop from "@/components/ui/LogoLoop";
import { HeroSection } from "@/components/home/hero-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { ContactSection } from "@/components/home/contact-section";

// This is a Next.js Server Component by default in App Router
export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-x-hidden">

      <HeroSection />

      <ProjectsSection />

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

      <ContactSection />

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
