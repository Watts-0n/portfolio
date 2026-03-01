# Design System: Dāvids Locāns Portfolio
**Device Type:** Desktop-first (1280px canvas, responsive down to mobile)
**Framework:** Next.js (App Router) + Tailwind CSS v4 + TypeScript

---

## 1. Visual Theme & Atmosphere

The portfolio embodies a **"Cyber-Industrial Engineering Terminal"** — a brutalist-technical aesthetic that blends the precision of a NASA mission dashboard with the raw elegance of a developer's workspace. The design philosophy is **"Blueprint Meets System Console"**: achromatic restraint, monospace typography, and mechanically precise UI elements create a controlled, authoritative presence.

The mood is **Stoic Modernism** — every element feels deliberate and engineered. Visual tension arises from contrasting elements: a hand-drawn sketch portrait colliding with pixel-perfect system metrics, massive whitespace against dense uppercase type, animated geometric particles drifting behind razor-sharp card borders.

**Interactive layer:** A subtle triangle-pattern particle field (`PixelBlast`) floats across the entire page as a persistent background. The hero title uses a `DecryptedText` animation that sequentially reveals characters in a terminal-decode effect.

**Tone words:** Clinical, Precise, Engineered, Minimal, Technical, Authoritative, Systematic, Brutalist, Achromatic, Alive.

---

## 2. Color Palette & Roles

The system operates in **dual mode** (light/dark) using CSS custom properties with `oklch()` color notation.

### Light Mode

| Descriptive Name | Value | Functional Role |
|---|---|---|
| **Paper White Canvas** | `oklch(0.98 0 0)` ≈ `#fafafa` | Primary page background — the "engineering graph paper" base |
| **Ink Black Prose** | `oklch(0.1 0.01 286)` ≈ `#0f0e14` | All foreground text, headings, body copy |
| **Neutral Steel Primary** | `#646464` | Primary accent — buttons, focus rings, badges, hero gradient start, status indicators. A deliberately **neutral gray**, avoiding color bias |
| **Pure Signal White** | `oklch(0.98 0 0)` ≈ `#fafafa` | Primary-foreground (text on primary buttons) |
| **Frosted Card Surface** | `oklch(0.96 0.005 286)` ≈ `#f2f1f5` | Card backgrounds, elevated containers |
| **Mist Secondary** | `oklch(0.92 0.01 286)` ≈ `#e8e7ec` | Secondary surfaces, skill section tinted background, muted/accent colors |
| **Ghost System Gray** | `oklch(0.45 0.01 286)` ≈ `#6b6a71` | Muted foreground — labels, metadata, navigation text, form labels |
| **Blueprint Grid** | `oklch(0.88 0.01 286)` ≈ `#dddce2` | ALL borders — card edges, section dividers, input outlines, nav underline |
| **Destructive Red** | `oklch(0.55 0.2 20)` ≈ `#c13030` | Error states, destructive actions (reserved) |

### Dark Mode

| Descriptive Name | Value | Functional Role |
|---|---|---|
| **Void Black Canvas** | `oklch(0.1 0.01 286)` ≈ `#0f0e14` | Background — deep, near-true-black |
| **High Signal White** | `oklch(0.98 0 0)` ≈ `#fafafa` | All foreground text |
| **Electric Lime Primary** | `oklch(0.88 0.2 120)` ≈ `#a8d600` | Primary accent — vivid chartreuse–lime that electrifies the dark canvas |
| **Deep Charcoal Surface** | `oklch(0.12 0.01 286)` ≈ `#17161d` | Card/popover backgrounds |
| **Dim Gray Secondary** | `oklch(0.2 0.02 286)` ≈ `#2c2a35` | Secondary surfaces, muted backgrounds, borders, inputs |
| **Soft Gray Text** | `oklch(0.6 0.01 286)` ≈ `#918f98` | Muted foreground — reduced emphasis text |
| **Ember Accent** | `oklch(0.25 0.02 286)` ≈ `#38363f` | Accent background, elevated surfaces |

### Status Colors (Project States)
| State | Color | Usage |
|---|---|---|
| **LIVE** | `text-primary` | Active, deployed projects |
| **WIP** | `text-yellow-500` | Work-in-progress projects |
| **ARCHIVED** | `text-muted-foreground` | Completed/retired projects |

> **Critical note:** Light mode is near-achromatic — the primary (`#646464`) is a pure neutral gray. Dark mode introduces a **high-saturation lime-green primary** that creates dramatic contrast. Resist adding new hue families — the power is in the restraint.

---

## 3. Typography Rules

### Font Families
- **Sans-serif / Display:** **Space Grotesk** (`--font-sans: 'Space Grotesk', sans-serif`) — Used for body text (regular, 400 weight). Loaded via `next/font/google`.
- **Monospace / Technical UI:** **JetBrains Mono** (`--font-mono: 'JetBrains Mono', monospace`) — Used for navigation, button labels, tech badges, system metrics, form labels, footer links, and all "terminal" text. Also serves as the **display font family** for major headings.

### Typographic Utility Classes
- `font-display` → JetBrains Mono, 700 weight, tighter letter-spacing (display headings)
- `font-body` → Space Grotesk, 400 weight, normal letter-spacing (body text)

### Typographic Conventions
- **Display headings** (`FULL Stack Dev_`, `SELECTED WORKS`, `TECH_STACK`, `INITIATE_CONTACT`, `TRANSMISSIONS`): `font-display` class — JetBrains Mono Bold, **ALL CAPS** or mixed case, with underscores replacing spaces for the terminal metaphor. Sizes: `text-6xl md:text-8xl` for hero, `text-4xl md:text-6xl` for sections.
- **Section labels:** `font-mono text-xs text-muted-foreground` above each heading — format: `▸ SECTION 01`, `▸ SECTION 02`, etc. Acts as a breadcrumb/index for the page narrative.
- **Navigation links** (`PROJECTS`, `SKILLS`, `LOGS`, `CONTACT`): `text-sm font-medium`, muted foreground, uppercase, wide tracking.
- **Brand wordmark** (`Dāvids_Locāns`): `font-mono text-xl font-bold tracking-tighter` — underscore separator, primary-colored blinking cursor.
- **Resume button** (`resume_v4.pdf`): `font-mono text-xs` — lowercase underscore notation, styled as a file reference.
- **Tech badges** (`React`, `WebSocket`): `font-mono text-xs` in `<Badge>` components or simple borders.
- **Body text**: `text-base` or `md:text-xl`, Space Grotesk Regular, `text-muted-foreground`, `max-w-md`, relaxed line-height.
- **System metrics labels** (`CPU_LOAD`, `GPU_LOAD`, `RAM`, `MEMORY`): `font-mono text-xs text-muted-foreground`, tabular numbers for value alignment.
- **Code/terminal comments:** Prefixed with `//` — used for inline section labels (`// CORE ATTRIBUTES`, `// NEW_MESSAGE.init()`, `// TOOLS & STACK`). Always `font-mono text-xs text-muted-foreground`.
- **Line numbers:** Zero-padded 3-digit monospace (`001`, `002`, `003`) — used in the Transmissions terminal list. `text-muted-foreground/40`.

---

## 4. Component Stylings

### Navigation Bar
- **Position:** Fixed to viewport top, `z-50`, with `bg-background/80 backdrop-blur-md` for frosted glass effect
- **Border:** Single 1px `border-border` hairline below
- **Height:** `h-16` (64px)
- **Left:** Brand wordmark in `font-mono text-xl font-bold tracking-tighter`, with primary-colored underscore
- **Center:** Nav links — `hidden md:flex gap-8`, monospace, small text, `text-muted-foreground`, primary on hover
- **Right:** Ghost resume button — `font-mono text-xs`, thin `border-primary/50`, `hover:bg-primary/10`
- **Text casing:** ALL CAPS throughout

### Hero Section
- **Layout:** Full viewport height (`min-h-screen`), two-column grid on desktop
- **Background layering:** (1) `PixelBlast` triangle particle canvas (fullscreen absolute), (2) background image with color-dodge blend mode overlay, (3) gradient fade `from-background/80 via-background/50 to-background`
- **Status badge:** Pill-shaped (`rounded-full`), `border-primary/30 bg-primary/5`, with animated pulsing green dot and monospace text `SYSTEM ONLINE // AVAILABLE FOR HIRE`
- **Title animation:** `DecryptedText` component — reveals characters sequentially in a decode effect, loops every 5 seconds
- **CTA Button (Primary):** `buttonVariants({ size: "lg" })` — primary fill, uppercase, with arrow icon
- **Social icons:** Ghost icon buttons (GitHub, LinkedIn, Mail)

### Status Panel (Hero Right Side)
- **Shape:** Large rectangle (`h-[500px]`) with **CSS corner-bracket styling** — L-shaped 2px borders at each corner using absolute-positioned `div` elements
- **Background:** `bg-card/10 backdrop-blur-sm` with `shadow-xl`
- **Content:** Split layout — metrics bars on left, portrait image on right
- **Progress bars:** `h-1` track with `bg-primary/20` base, animated `bg-primary` fill with `transition-all duration-700`
- **Metrics:** CPU_LOAD, GPU_LOAD, RAM, MEMORY — values animate randomly every 1.8s
- **Footer stat:** Project count as `text-4xl font-bold` number (zero-padded: "10") with "PROJECTS" label below
- **All text:** `font-mono text-xs text-muted-foreground`, `tabular-nums` for number alignment

### Project Cards — Featured (First Project)
- **Layout:** Full-width two-column split (`md:grid-cols-[1fr_1fr]`), minimum height `360px`
- **Image side:** `overflow-hidden`, image wrapped in `TiltedCard` for 3D rotation, scales to `102%` on `group-hover`, primary-tinted overlay on hover (`bg-primary/10`)
- **Content side:** `p-8`, flex column layout, `justify-between`
- **Ghost index number:** Absolute-positioned in top-right corner — `text-[80px] font-bold text-border` (very faint), `select-none pointer-events-none`. Acts as decorative layer.
- **Status badge:** `◉ LIVE / WIP / ARCHIVED` — `font-mono text-[10px] tracking-widest`, colored by state
- **Year label:** `font-mono text-[10px] text-muted-foreground` alongside `//` separator
- **Title:** `text-3xl md:text-4xl font-display`, primary on `group-hover`
- **Actions:** `LIVE DEMO` & `SOURCE` with `ArrowUpRight` / `Github` icons — micro-translate on hover

### Project Cards — Bento Grid (Remaining Projects)
- **Layout:** Adaptive bento grid system (`grid-cols-1 md:grid-cols-12 gap-4`). Renders in blocks of 4 cards per row:
  - **Wide Card:** `md:col-span-5`, `h-48` image area.
  - **Mid Cards:** Two stacked cards in a `md:col-span-4 grid grid-rows-2 gap-4`, `h-32` image area.
  - **Dark Card:** `md:col-span-3`, inverted colors (`bg-foreground` / `dark:bg-card`), dark overlay (`opacity-35`), min-height `200px`.
- **Container:** `GlassPanel` components with `border border-border` and hover state `hover:border-primary/50`.
- **Index overlay:** Absolute positioned top-right in image area, zero-padded large numbers (e.g., `text-[36px]` or `text-[28px]`), `text-border/60` or `text-white/10` for dark cards.
- **Content area:** Flexible padding, shows status badge (`◉ LIVE`), year, title, description, and tags (sliced to max 3 on dark cards).
- **Actions:** Tiny `font-mono text-[9px]` links (`DEMO`, `CODE`) with icon (`ExternalLink`, `Github`) above a `border-t` divider.
- **Load More CTA:** Mono button, "LOAD ALL PROJECTS [ +N MORE ]" centered at bottom, border styling, toggles all projects visibility.

### Skills Section
- **Background:** `bg-secondary/5` tinted surface band with top border
- **Layout:** 12-column grid — 8 cols for skill groups with bars, 4 cols for attribute tiles + tools
- **Category headers:** `font-display text-sm tracking-widest uppercase` with category icon (`Code2`, `Database`, `Terminal`) and `border-b border-primary/30` underline
- **Skill bars (`SkillBar` component):**
  - Three-column row: skill name (`w-24 font-mono text-xs`) | animated fill bar (`flex-1 h-[2px]`) | percentage label (`w-8 font-mono text-[10px] text-right`)
  - Bar track: `bg-border`, fill: `bg-primary`
  - Animation: `transition-all duration-1000 ease-out`, triggered on scroll via `IntersectionObserver`, stagger delay by group + index
- **Core Attribute tiles:** `aspect-auto p-4 border border-border bg-background` — icon + `font-mono text-[10px] font-bold` label + `font-mono text-[9px] text-muted-foreground` description
  - **Corner accent on hover:** absolute `w-4 h-[2px]` and `w-[2px] h-4` at top-left — primary color, fades in with `group-hover`
- **Tools tag row:** Flat inline tags — `font-mono text-[9px] px-2 py-1 border border-border hover:border-primary hover:text-primary` — no background, just border outline

### Logo Loop / Tech Marquee
- **Positioning:** Lives below Skills section and above Transmissions section.
- **Layout:** `py-12 border-t border-b border-border backdrop-blur-[3px] shadow-lg` wrapper
- **Content:** Monospace tech names (e.g. `React`, `Docker`, `PostgreSQL`) paired with Lucide icons (`font-mono text-xs text-muted-foreground hover:text-primary`). Uses the `LogoLoop` component scrolling at `speed={80}`.

### Blog / Transmissions Section
- **Container:** Single `border border-border` wrapper inside a `GlassPanel`
- **Terminal bar header:**
  - Three colored dots: `w-2.5 h-2.5 rounded-full` in `bg-red-400/60`, `bg-yellow-400/60`, `bg-green-400/60`
  - Path label: `font-mono text-xs text-muted-foreground` — `~/logs/transmissions`
  - Background: `bg-card`, separated by `border-b border-border`
- **Post row layout:** `grid md:grid-cols-[60px_1fr_auto]` — line number column | content | metadata column
- **Line number column:** `font-mono text-xs text-muted-foreground/60`, `border-r border-border`, `flex items-center justify-center`
- **Content area:** `p-6` — topic tags (outlined, `border border-primary/30 text-primary font-mono text-[9px]`), title `text-xl md:text-2xl font-display`, excerpt `text-sm text-muted-foreground`
- **Metadata column:** `border-l border-border min-w-[120px]` — date, read time with `Clock` icon, `ArrowUpRight` arrow that micro-translates on `group-hover`
- **Row hover:** `hover:bg-card transition-colors duration-200`
- **Section CTA:** `VIEW ALL` ghost button — top-right alignment on desktop, centered below on mobile

### Contact Section
- **Layout:** Two-column grid (`md:grid-cols-2 gap-16`) — info/labels left, form right
- **Left column:**
  - Section label (`▸ SECTION 04`), large heading
  - Description paragraph (`max-w-xs`)
  - **Contact method list:** Each entry — `w-8 h-8 border border-border` icon box + label/value stack. Icon box and value both transition to `text-primary border-primary` on `group-hover`
- **Right column (form wrapper):**
  - **Corner bracket decoration:** Four absolute-positioned `div` elements at each corner — `w-6 h-6`, `border-t-2 border-l-2 border-primary` etc. Offset `-3px` outside the form box. Purely visual.
  - Inner box: `p-8 border border-border bg-background`
  - Header comment: `// NEW_MESSAGE.init()` — `font-mono text-[10px] text-muted-foreground`
  - Fields: NAME, EMAIL, SUBJECT, MESSAGE — labels `text-xs font-mono text-muted-foreground tracking-widest`, inputs `rounded-none border-border font-mono text-sm`
  - Submit: Full-width `rounded-none` primary button with `ArrowRight` icon

### Buttons (Design Tokens via `button.tsx`)
| Variant | Fill | Text | Border | Shape |
|---|---|---|---|---|
| **Default (Primary)** | `bg-primary` | `text-primary-foreground` | None | `rounded-md` (from `--radius`) |
| **Outline / Ghost** | Transparent / `bg-accent` on hover | `text-foreground` | `border-input` | Same radius |
| **Secondary** | `bg-secondary` | `text-secondary-foreground` | None | Same radius |

> Forms use `rounded-none` inputs/buttons for a sharper, terminal-appropriate feel.

### Section Dividers
- Single 1px `border-border` — purely structural, full-width
- Used between all major sections: hero → works → skills → transmissions → contact → footer

### Section Headers (Shared Pattern)
Every section follows this consistent header structure:
```
▸ SECTION 0N          ← font-mono text-xs text-muted-foreground, mb-3
SECTION TITLE         ← text-4xl md:text-6xl font-display tracking-tighter, mb-4
━━━━━━━━             ← h-[2px] w-24 bg-primary (primary accent bar)
```
Section subtitle/description aligns right on desktop (`hidden md:block text-right`), or below the bar on mobile.

---

## 5. Layout Principles

### Grid & Spacing
- **Container:** Centered `max-w-7xl` (1280px) with safe-area padding (`--safe-area-left/right`, defaults to `1rem`, `2rem` at 1024px+)
- **Section rhythm:** Consistent `py-24` (96px top/bottom padding) per section
- **Project grid:** The `bento grid` features an adaptive `grid-cols-1 md:grid-cols-12` layout allowing varying card widths for an asymmetrical architectural look.
- **Skill grid gaps:** 48px between major sections (`gap-8`), 20px between sub-items (`space-y-5`)
- **Contact grid gap:** `gap-16` between the two columns

### Background System
Three visual layers composited (back to front):
1. **PixelBlast canvas** — Fullscreen triangle-variant particle field in `#c0c0c0`, pattern scale 50, density 0.3, moving at 0.5 speed. Creates a living, geometric texture.
2. **Section backgrounds** — Some sections add `bg-secondary/5` or `bg-card/50` tinted bands or glass panels to create depth
3. **Content** — Uses `relative z-10` to float above the background particles

### Alignment
- Section headers: **Left-aligned** with text flowing from container left edge
- Section subtitles: **Right-aligned** (desktop only, `hidden md:block`) — creates typographic tension
- Contact section: **Two-column split** (exception — info left, form right)
- Footer: `flex-row justify-between` with brand + copyright left, social links right

### Whitespace Philosophy
Whitespace **is** the design. The triangle particle background transforms empty space from "blank" to "alive" — it becomes structural, intentional, and dynamic. Sections breathe with 96px padding; grids use disciplined spacing. The result feels engineered, not sparse.

---

## 6. Interactive & Animation Patterns

### Skill Bar Animation (`SkillBar` component)
- **Trigger:** `IntersectionObserver` — fires when the container enters viewport (`threshold: 0.1`)
- **Behavior:** Width transitions from `0%` to target level over `1000ms` with `ease-out`
- **Stagger:** Each bar delayed by `groupIndex * 150ms + skillIndex * 100ms`
- **State:** Managed via `useState(0)` — one-shot (observer disconnects after firing)

### Image Hover Effects
- All project images: `group-hover:scale-105 transition-transform duration-700` — subtle zoom
- Featured project: Uses `TiltedCard` 3D rotation, plus `bg-primary/10 opacity-0 group-hover:opacity-100` tint overlay

### Corner Bracket Hover (Attribute Tiles)
- On hover: two 1px lines appear at top-left corner (`w-4 h-[2px]` + `w-[2px] h-4`) in `bg-primary`
- `opacity-0 group-hover:opacity-100 transition-opacity`

### Link Arrow Micro-animation
- `ArrowUpRight` icon: `group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform`
- Creates a subtle diagonal "exit" motion — reinforces external link semantics

### Row Highlights
- Blog post rows: `hover:bg-card transition-colors duration-200`
- Project grid cells: `hover:border-primary/50 transition-all duration-500`

---

## 7. Design System Notes for Stitch Generation

> **Copy this entire section into every Stitch prompt to ensure visual consistency.**

```
DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first (1280px canvas), responsive
- Theme: Dual-mode — Light (achromatic, clinical) / Dark (electric lime on void black)
- LIGHT MODE:
  - Background: Paper White (#fafafa / oklch(0.98 0 0))
  - Surface/Cards: Frosted Card Surface (#f2f1f5 / oklch(0.96 0.005 286))
  - Primary Accent: Neutral Steel (#646464) — a deliberate neutral gray
  - Primary Text: Ink Black (#0f0e14 / oklch(0.1 0.01 286))
  - Body Text: Same as primary text
  - Muted Text: Ghost System Gray (#6b6a71 / oklch(0.45 0.01 286))
  - Borders: Blueprint Grid (#dddce2 / oklch(0.88 0.01 286)) — 1px hairlines, NO shadows
- DARK MODE:
  - Background: Void Black (#0f0e14 / oklch(0.1 0.01 286))
  - Surface/Cards: Deep Charcoal (#17161d / oklch(0.12 0.01 286))
  - Primary Accent: Electric Lime (#a8d600 / oklch(0.88 0.2 120)) — vivid chartreuse
  - Primary Text: High Signal White (#fafafa / oklch(0.98 0 0))
  - Borders: Dim Gray (#2c2a35 / oklch(0.2 0.02 286))
- STATUS COLORS:
  - LIVE: text-primary (green indicator ◉)
  - WIP: text-yellow-500 (yellow indicator ◉)
  - ARCHIVED: text-muted-foreground (gray indicator ◉)
- TYPOGRAPHY:
  - Display/Headings: JetBrains Mono Bold — ALL CAPS, tight tracking, underscore-separated labels
  - UI/Labels: JetBrains Mono Regular — ALL CAPS monospace, for navigation, buttons, badges
  - Body: Space Grotesk Regular — sentence case, relaxed line height
  - Section index labels: "▸ SECTION 0N" format — font-mono text-xs text-muted-foreground
  - Terminal comments: "// LABEL" format — font-mono text-xs text-muted-foreground
  - Line numbers: "001", "002" zero-padded — font-mono text-xs text-muted-foreground/40
- COMPONENTS:
  - Buttons: Rounded-md (~0.5rem radius) default; rounded-none inside forms for terminal feel
  - Cards (featured): Full-width two-column split, ghost index number (text-[80px] text-border), status badge
  - Cards (grid): Adaptive Bento Grid (md:grid-cols-12), Wide, Mid, Dark cards, top-right ghost index (text-[36px]/[28px])
  - Inputs: rounded-none, 1px border, no shadow, ALLCAPS mono labels above
  - Status panels: CSS corner-bracket decoration (L-shaped borders at corners), backdrop-blur
  - Progress bars: h-[2px] thin tracks with animated fill (IntersectionObserver trigger), mono labels
  - Attribute tiles: border box with corner-accent hover effect (primary color micro-lines)
  - Terminal window: macOS-style color dots header + monospace path label + bordered post list
  - Contact form: corner bracket decoration (6px primary accent lines outside box corners)
- LAYOUT:
  - max-w-7xl container, py-24 section spacing
  - Section headers: left-aligned heading + right-aligned subtitle (desktop only)
  - Consistent "▸ SECTION 0N" label above every section heading
  - Project layout: 1 featured full-width + Bento Grid configuration
- EFFECTS:
  - DecryptedText animation (terminal decode) on hero heading
  - PixelBlast background effect (triangles, #c0c0c0)
  - LogoLoop scrolling marquee below skills section
  - Animated metric bars (CPU/GPU/RAM) with random fluctuation in status panel
  - Animated skill bars (width 0→target%, eased, stagger by group+index, scroll-triggered)
  - Frosted glass nav bar (backdrop-blur-md, bg-background/80)
  - Image zoom on hover (scale-105, 700ms) and TiltedCard 3D rotation
  - Corner accent micro-lines on attribute tile hover
  - Arrow icon micro-translate on link hover (diagonal exit motion)
- STYLE KEYWORDS: Engineering Terminal, Brutalist-Tech, System Dashboard, Bento Grid, Monospace, Blueprint, Achromatic (light), Electrified (dark), Clinical, Precise
```
