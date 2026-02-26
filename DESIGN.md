# Design System: Dāvids Locāns Portfolio
**Stitch Project ID:** `14179918346701536450`
**Stitch Project Title:** Dāvids Locāns Portfolio — Engineering Terminal
**Device Type:** Desktop-first (1280px canvas, responsive down to mobile)
**Framework:** Next.js (App Router) + Tailwind CSS v4 + TypeScript

---

## 1. Visual Theme & Atmosphere

The portfolio embodies a **"Cyber-Industrial Engineering Terminal"** — a brutalist-technical aesthetic that blends the precision of a NASA mission dashboard with the raw elegance of a developer's workspace. The design philosophy is **"Blueprint Meets System Console"**: achromatic restraint, monospace typography, and mechanically precise UI elements create a controlled, authoritative presence.

The mood is **Stoic Modernism** — every element feels deliberate and engineered. Visual tension arises from contrasting elements: a hand-drawn sketch portrait colliding with pixel-perfect system metrics, massive whitespace against dense uppercase type, animated geometric particles drifting behind razor-sharp card borders.

**Interactive layer:** A subtle triangle-pattern particle field (`PixelBlast`) floats across the entire page as a persistent background, with a fluid `SplashCursor` effect following pointer movement — adding life without compromising the clinical precision. The hero title uses a `DecryptedText` animation that sequentially reveals characters in a terminal-decode effect.

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
- **Sans-serif / Display:** **Space Grotesk** (`--font-sans: 'Space Grotesk', sans-serif`) — Used for headings (bold, 700 weight) and body text (regular, 400 weight). Loaded via `next/font/google`.
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
- **Tech badges** (`React`, `WebSocket`): `font-mono text-xs` in `<Badge>` components.
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
- **Footer stat:** Project count as `text-4xl font-bold` number (zero-padded: "05") with "PROJECTS" label below
- **All text:** `font-mono text-xs text-muted-foreground`, `tabular-nums` for number alignment

### Project Cards — Featured (First Project)
- **Layout:** Full-width two-column split (`md:grid-cols-[1fr_1fr]`), minimum height `360px`
- **Image side:** `overflow-hidden`, image scales to `105%` on `group-hover` (`transition-transform duration-700`), primary-tinted overlay on hover (`bg-primary/10`)
- **Content side:** `p-8`, flex column layout, `justify-between`
- **Ghost index number:** Absolute-positioned in top-right corner — `text-[80px] font-bold text-border` (very faint), `select-none pointer-events-none`. Acts as decorative layer.
- **Status badge:** `◉ LIVE / WIP / ARCHIVED` — `font-mono text-[10px] tracking-widest`, colored by state
- **Year label:** `font-mono text-[10px] text-muted-foreground` alongside `//` separator
- **Title:** `text-3xl md:text-4xl font-display`, primary on `group-hover`
- **Actions:** `LIVE DEMO` & `SOURCE` with `ArrowUpRight` / `Github` icons — micro-translate on hover

### Project Cards — Grid (Remaining Projects)
- **Container:** Zero-radius (`rounded-none`), no outer gaps — cards sit flush in a `border border-border` wrapper grid
- **Grid:** `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` — 4 columns on desktop, internal `border-r border-b` dividers (CSS borders, no gap)
- **Image strip:** Fixed height `h-40`, `overflow-hidden`, gradient fade `from-card to-transparent` from bottom
- **Index overlay:** `font-mono text-xs text-muted-foreground` bottom-left in image area, zero-padded (`02`–`05`)
- **Content area:** `p-4`, shows status badge, year, title, 2-line clamped description, truncated tags
- **Tag truncation:** Show max 2 tags + `+N` overflow badge
- **Actions:** Tiny `font-mono text-[9px]` links (`DEMO`, `CODE`) separated by `border-t border-border`

### Skills Section
- **Background:** `bg-secondary/10` tinted surface band
- **Layout:** 12-column grid — 8 cols for skill groups with bars, 4 cols for attribute tiles + tools
- **Category headers:** `font-display text-sm tracking-widest uppercase` with category icon (`Code2`, `Database`, `Terminal`) and `border-b border-primary/30` underline
- **Skill bars (`SkillBar` component):**
  - Three-column row: skill name (`w-24 font-mono text-xs`) | animated fill bar (`flex-1 h-[2px]`) | percentage label (`w-8 font-mono text-[10px] text-right`)
  - Bar track: `bg-border`, fill: `bg-primary`
  - Animation: `transition-all duration-1000 ease-out`, triggered on scroll via `IntersectionObserver`, stagger delay by group + index
- **Core Attribute tiles:** `aspect-auto p-4 border border-border bg-background` — icon + `font-mono text-[10px] font-bold` label + `font-mono text-[9px] text-muted-foreground` description
  - **Corner accent on hover:** absolute `w-4 h-[2px]` and `w-[2px] h-4` at top-left — primary color, fades in with `group-hover`
- **Tools tag row:** Flat inline tags — `font-mono text-[9px] px-2 py-1 border border-border hover:border-primary hover:text-primary` — no background, just border outline

### Blog / Transmissions Section
- **Container:** Single `border border-border` wrapper — the entire list lives inside one bordered box
- **Terminal bar header:**
  - Three colored dots: `w-2.5 h-2.5 rounded-full` in `bg-red-400/60`, `bg-yellow-400/60`, `bg-green-400/60`
  - Path label: `font-mono text-xs text-muted-foreground` — `~/logs/transmissions`
  - Background: `bg-card`, separated by `border-b border-border`
- **Post row layout:** `grid md:grid-cols-[60px_1fr_auto]` — line number column | content | metadata column
- **Line number column:** `font-mono text-xs text-muted-foreground/40`, `border-r border-border`, `flex items-center justify-center`
- **Content area:** `p-6` — topic tags (outlined, `border border-primary/30 text-primary font-mono text-[9px]`), title `text-xl md:text-2xl font-display`, excerpt `text-sm text-muted-foreground`
- **Metadata column:** `border-l border-border min-w-[120px]` — date, read time with `Clock` icon, `ArrowUpRight` arrow that micro-translates on `group-hover`
- **Row hover:** `hover:bg-card transition-colors duration-200`
- **Section CTA:** `VIEW ALL` ghost button — top-right alignment on desktop, centered below on mobile

### Contact Section
- **Layout:** Two-column grid (`md:grid-cols-2 gap-16`) — info/labels left, form right
- **Left column:**
  - Section label (`▸ SECTION 04`), large heading, primary accent bar
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

> Forms use `rounded-none` inputs/buttons for a sharper, terminal-appropriate feel — overriding the default radius.

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
- **Section rhythm:** Consistent `py-24` (96px top/bottom padding) per section — massive breathing room
- **Featured project:** Full-width `border border-border`, no outer margins
- **Project grid:** Zero-gap internal grid with CSS border dividers — cards share borders to form a unified panel
- **Skill grid gaps:** 48px between major sections (`gap-8`), 20px between sub-items (`space-y-5`)
- **Contact grid gap:** `gap-16` between the two columns

### Background System
Three visual layers composited (back to front):
1. **PixelBlast canvas** — Fullscreen triangle-variant particle field in `#c0c0c0`, pattern scale 10, density 0.2, moving at 0.5 speed. Creates a living, geometric texture.
2. **Section backgrounds** — Some sections add `bg-secondary/10` or `bg-card/50` tinted bands to create depth
3. **Content** — Uses `relative z-10` to float above the background particles

### Alignment
- Section headers: **Left-aligned** with text flowing from container left edge
- Section subtitles: **Right-aligned** (desktop only, `hidden md:block`) — creates typographic tension
- Contact section: **Two-column split** (exception — info left, form right)
- Footer: `flex-row justify-between` with brand + copyright left, social links right
- Body text: Left-aligned with `max-w-xs` or `max-w-sm` natural line length constraints

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
- Featured project: Additional `bg-primary/10 opacity-0 group-hover:opacity-100` tint overlay

### Corner Bracket Hover (Attribute Tiles)
- On hover: two 1px lines appear at top-left corner (`w-4 h-[2px]` + `w-[2px] h-4`) in `bg-primary`
- `opacity-0 group-hover:opacity-100 transition-opacity`

### Link Arrow Micro-animation
- `ArrowUpRight` icon: `group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform`
- Creates a subtle diagonal "exit" motion — reinforces external link semantics

### Row Highlights
- Blog post rows: `hover:bg-card transition-colors duration-200`
- Project grid cells: `hover:bg-card transition-colors duration-300`

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
  - Cards (grid): Zero-gap flush grid with CSS border dividers, image strip + compact content
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
  - Project layout: 1 featured full-width + N-column flush grid below
- EFFECTS:
  - DecryptedText animation (terminal decode) on hero heading
  - SplashCursor fluid effect following mouse
  - Animated metric bars (CPU/GPU/RAM) with random fluctuation in status panel
  - Animated skill bars (width 0→target%, eased, stagger by group+index, scroll-triggered)
  - Frosted glass nav bar (backdrop-blur-md, bg-background/80)
  - Image zoom on hover (scale-105, 700ms)
  - Corner accent micro-lines on attribute tile hover
  - Arrow icon micro-translate on link hover (diagonal exit motion)
- STYLE KEYWORDS: Engineering Terminal, Brutalist-Tech, System Dashboard, Monospace, Blueprint, Achromatic (light), Electrified (dark), Clinical, Precise
```
