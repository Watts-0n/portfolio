# Design System: Dāvids Locāns Portfolio
**Stitch Project ID:** `14179918346701536450`
**Stitch Project Title:** Dāvids Locāns Portfolio — Engineering Terminal
**Device Type:** Desktop-first (1280px canvas, responsive down to mobile)
**Framework:** Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript

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
- **Display headings** (`FULL Stack Dev_`, `SELECTED WORKS`, `TECH_STACK`, `INITIATE_CONTACT`): `font-display` class — JetBrains Mono Bold, **ALL CAPS** or mixed case, with underscores replacing spaces for the terminal metaphor. Sizes: `text-6xl md:text-8xl` for hero, `text-4xl md:text-6xl` for sections.
- **Navigation links** (`PROJECTS`, `SKILLS`, `LOGS`, `CONTACT`): `text-sm font-medium`, muted foreground, uppercase, wide tracking.
- **Brand wordmark** (`Dāvids_Locāns`): `font-mono text-xl font-bold tracking-tighter` — underscore separator, primary-colored blinking cursor.
- **Resume button** (`resume_v4.pdf`): `font-mono text-xs` — lowercase underscore notation, styled as a file reference.
- **Tech badges** (`React`, `WebSocket`): `font-mono text-xs` in `<Badge>` components.
- **Body text**: `text-base` or `md:text-xl`, Space Grotesk Regular, `text-muted-foreground`, `max-w-md`, relaxed line-height.
- **System metrics labels** (`CPU_LOAD`, `GPU_LOAD`, `RAM`, `MEMORY`): `font-mono text-xs text-muted-foreground`, tabular numbers for value alignment.

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

### Project Cards
- **Container:** `rounded-none` (sharp squared-off corners), `bg-card border-border`, hover → `border-primary/50`
- **Structure:** Two-zone — top image zone + bottom content zone (using `grid-rows-subgrid row-span-3`)
- **Grid:** `grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))]` — responsive auto-fit with 250px minimum
- **Image:** `<ProjectImage>` component (separate)
- **Title:** `text-2xl font-display`, primary color on group hover
- **Tech tags:** `<Badge variant="secondary">` with `font-mono text-xs`
- **Footer links:** `LIVE DEMO` / `CODE` with external-link/github icons, `text-sm font-display`

### Skills Section
- **Background:** `bg-secondary/20` tinted surface band
- **Layout:** 12-column grid — 4 cols for title/icons, 8 cols for skill lists
- **Skill icons:** Perfect square boxes (`aspect-square`), thin 1px border, center icon + monospace label below (`CLEAN_CODE`, `SCALABLE_DB`, etc.)
- **Skill lists:** Three-column grid with category headers (`border-b border-primary/30`), items as `font-mono text-sm` with hover-to-primary accent bars

### Blog / Transmissions Section
- **Layout:** Simple vertical stack with horizontal dividers
- **Title rows:** `grid md:grid-cols-[1fr_auto]` — title left, date/readtime right
- **Blog title:** `text-2xl font-display`, primary on group hover
- **Date format:** `font-mono text-xs text-muted-foreground`, double-slash separated (`Oct 12, 2024 // 5 min read`)
- **Dividers:** `h-[1px] bg-border group-hover:bg-primary/50 transition-colors`
- **Bottom CTA:** Centered ghost button `VIEW ALL POSTS`

### Contact Form
- **Container:** `bg-card border-t border-border` full-width band
- **Form width:** `max-w-2xl` centered
- **Headers:** Center-aligned `text-4xl font-display` title + muted description
- **Labels:** `text-xs font-mono text-muted-foreground` — ALL CAPS above fields
- **Inputs:** `<Input>` and `<Textarea>` shadcn components — 1px border, sharp corners, clean focus state
- **Submit:** Full-width primary button `SEND TRANSMISSION`, `size="lg"`

### Buttons (Design Tokens via `button.tsx`)
| Variant | Fill | Text | Border | Shape |
|---|---|---|---|---|
| **Default (Primary)** | `bg-primary` | `text-primary-foreground` | None | `rounded-md` (from `--radius`) |
| **Outline / Ghost** | Transparent / `bg-accent` on hover | `text-foreground` | `border-input` | Same radius |
| **Secondary** | `bg-secondary` | `text-secondary-foreground` | None | Same radius |

### Section Dividers
- Single 1px `border-border` — purely structural, full-width
- Used between all major sections: hero → works → skills → blog → contact → footer

---

## 5. Layout Principles

### Grid & Spacing
- **Container:** Centered `max-w-7xl` (1280px) with safe-area padding (`--safe-area-left/right`, defaults to `1rem`, `2rem` at 1024px+)
- **Section rhythm:** Consistent `py-24` (96px top/bottom padding) per section — massive breathing room
- **Project grid gaps:** 24px (`gap-6`)
- **Skill grid gaps:** 48px between major sections (`gap-12`), 32px between sub-columns (`gap-8`)

### Background System
Three visual layers composited (back to front):
1. **PixelBlast canvas** — Fullscreen triangle-variant particle field in `#c0c0c0`, pattern scale 10, density 0.2, moving at 0.5 speed. Creates a living, geometric texture.
2. **Section backgrounds** — Some sections add `bg-secondary/20` or `bg-card` tinted bands to create depth
3. **Content** — Uses `relative z-10` to float above the background particles

### Alignment
- Section headers: **Left-aligned** with text flowing from container left edge
- Contact section: **Center-aligned** (exception — anchors the form)
- Footer: `flex-row justify-between` with copyright left, social links right
- Body text: Left-aligned with `max-w-md` or `max-w-sm` natural line length constraints

### Whitespace Philosophy
Whitespace **is** the design. The triangle particle background transforms empty space from "blank" to "alive" — it becomes structural, intentional, and dynamic. Sections breathe with 96px padding; grids use disciplined 24px gaps. The result feels engineered, not sparse.

---

## 6. Design System Notes for Stitch Generation

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
- TYPOGRAPHY:
  - Display/Headings: JetBrains Mono Bold — ALL CAPS, tight tracking, underscore-separated labels
  - UI/Labels: JetBrains Mono Regular — ALL CAPS monospace, for navigation, buttons, badges
  - Body: Space Grotesk Regular — sentence case, relaxed line height
- COMPONENTS:
  - Buttons: Rounded-md (~0.5rem radius), primary fill or ghost/outline variants
  - Cards: sharp squared-off corners (rounded-none), two-zone (image top / content bottom), 1px border
  - Inputs: Sharp corners, 1px border, no shadow, mono labels above
  - Status panels: CSS corner-bracket decoration (L-shaped borders at corners), backdrop-blur
  - Progress bars: 1px thin tracks with animated fill, monospace labels
- LAYOUT:
  - max-w-7xl container, py-24 section spacing, gap-6 card grids
  - Particle background (triangles, silver, low density) as persistent ambient texture
- EFFECTS:
  - DecryptedText animation (terminal decode) on hero heading
  - SplashCursor fluid effect following mouse
  - Animated metric bars (CPU/GPU/RAM) with random fluctuation
  - Frosted glass nav bar (backdrop-blur-md, bg-background/80)
- STYLE KEYWORDS: Engineering Terminal, Brutalist-Tech, System Dashboard, Monospace, Blueprint, Achromatic (light), Electrified (dark), Clinical, Precise
```
