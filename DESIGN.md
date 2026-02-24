# Design System: Dāvids Locāns Portfolio
**Stitch Project ID:** `14179918346701536450`
**Stitch Project Title:** Dāvids Locāns Portfolio - Sections Redesign
**Device Type:** Desktop-first (1280px canvas)

---

## 1. Visual Theme & Atmosphere

This portfolio breathes the aesthetic of a **high-precision engineering terminal** — cold, calculated, and quietly commanding. The design philosophy is "Blueprint Meets Developer Dashboard": a light, airy canvas covered in dot-grid graph paper texturing, overlaid with razor-sharp monospace type and mechanically precise UI components.

The mood is **Stoic Modernism** — deliberately restrained, making every element feel intentional. There is no decorative excess. The design creates tension through contrast: sketch-style hand-drawn portraiture colliding with pixel-perfect system UI, soft whitespace against bold uppercase type. The result feels like a scientist's lab notebook crossed with a NASA mission dashboard.

**Tone words:** Clinical, Precise, Engineered, Minimal, Technical, Authoritative, Systematic.

---

## 2. Color Palette & Roles

| Descriptive Name | Hex | Functional Role |
|---|---|---|
| **Arctic Blueprint White** | `#f1f5f9` | Primary page background; creates the "engineering graph paper" base |
| **Pure Signal Black** | `#000000` | Hero headings, section titles, all display-weight text |
| **Deep Slate Prose** | `#334155` | Body copy, paragraph text, secondary content |
| **Ghost System Gray** | `#64748b` | Monospace labels, status text, metadata, muted info |
| **Blueprint Grid** | `#cbd5e1` | All borders — card edges, section dividers, input outlines, grid lines |
| **Terminal Charcoal** | `#1a1a1a` | Project card image containers (dark backdrop for 3D renders) — creates dramatic contrast |
| **Command Surface** | `#4b5563` | Primary CTA button fill ("VIEW PROJECTS", "SEND TRANSMISSION") |
| **Active Green Pulse** | `#22c55e` | System status indicator dot — used exclusively for the "SYSTEM ONLINE" live pulse |
| **Acid Lime Accent** | `#a8d600` | Stitch design theme accent — use sparingly for future interactive highlights or hover states |

> **Critical note:** This is a near-achromatic system. Color is used structurally, not decoratively. Resist adding new colors — the power is in the restraint.

---

## 3. Typography Rules

### Font Families
- **Display / Headings:** A condensed, ultra-bold sans-serif — visually matches **Space Grotesk Bold** (confirmed via Stitch theme: `SPACE_GROTESK`). Used for all primary section headers.
- **Monospace / UI:** A crisp monospace — visually consistent with **JetBrains Mono** or **IBM Plex Mono**. Used for navigation links, button labels, tech tags, system stats, section labels, and all "technical" text.
- **Body:** Clean, readable sans-serif (Space Grotesk Regular) for paragraph descriptions.

### Typographic Conventions
- **Display headings** (`FULL Stack Dev_`, `SELECTED WORKS`, `TECH_STACK`, `INITIATE_CONTACT`): Full-weight bold, **ALL CAPS** or title case, with underscores replacing spaces to reinforce the "terminal input" metaphor
- **Navigation links** (`PROJECTS`, `SKILLS`, `LOGS`, `CONTACT`): Monospace, **ALL CAPS**, spaced-out tracking
- **Resume button** (`resume_v4.pdf`): Monospace, lowercase with underscore notation — styled as a file reference
- **Tech stack labels** (`React`, `WebSocket`, `Solidity`): Monospace pill tags rendered in small, regular weight
- **Body text**: Sentence case, Space Grotesk Regular, modest weight (~16px, 1.5 line height)
- **Letter spacing**: Navigation and labels use increased tracking (+0.1em to +0.15em) for precision feel

---

## 4. Component Stylings

### Navigation Bar
- Ultra-minimal top bar fixed to viewport top
- Left: **Brand name** (`DĀVIDS_LOCĀNS`) in bold sans-serif, not monospace — acts as wordmark
- Center: Nav links in monospace ALL CAPS, subtle hover state only (no underlines, no backgrounds)
- Right: `resume_v4.pdf` button — thin 1px border, no fill (ghost button), monospace text, sharp corners
- **Border:** Single 1px `#cbd5e1` hairline below the bar
- Background: Inherits `#f1f5f9` page background (not sticky with shadow)

### Hero Section — System Status Card
The hero's signature element: a **technical diagnostic panel** UI card
- **Corner brackets:** CSS corner-bracket styling (L-shaped borders at each corner), not a full border box
- Contains: hand-drawn sketch portrait, progress bars for CPU/GPU/RAM/Memory (horizontal thin bars), system stats in monospace
- **Background:** White or light surface within the card
- **Text:** All monospace, ALL CAPS labels, numeric values right-aligned
- **Status indicator:** Small circle in Active Green Pulse (`#22c55e`) with a "blinking" or pulsing CSS animation — indicates "SYSTEM ONLINE"
- **Project count:** Large bold number ("05") with small monospace label ("PROJECTS") below

### CTA Button (Primary)
- Fill: `#4b5563` (Command Surface) — dark charcoal, not black
- Text: White (`#ffffff`), monospace, ALL CAPS, slight letter-spacing
- Shape: **Sharp, squared-off corners** (0px border-radius or near-zero ~2px)
- Padding: Wide horizontal padding (~24px) with comfortable vertical (~12px)
- Hover: Darkens slightly toward true black, no shadow
- Example: `VIEW PROJECTS →`, `SEND TRANSMISSION`

### Ghost Button (Secondary)
- Fill: Transparent
- Border: 1px solid `#cbd5e1` (Blueprint Grid)
- Text: Near-black, monospace, lowercase-underscore style (`resume_v4.pdf`)
- Shape: Sharp corners (0–2px radius)
- Hover: Slight background tint

### Project Cards
- **Structure:** Two-zone card — top dark media zone + bottom white content zone
- **Media zone:** Solid `#1a1a1a` background to neutrally host 3D renders, screenshots, or demos
- **Content zone:** White or near-white surface with padding
- **Border:** 1px `#cbd5e1` around the entire card, sharp corners
- **Tech tags:** Small monospace pills — outlined or lightly filled, gray border, small text, no gap between text and border
- **Links:** `LIVE DEMO ↗` and `CODE ↗` at card bottom, monospace small caps with external-link arrow icon
- **Card title:** Bold monospace (`Nebula Dashboard`, `Void Chain`) — medium weight, no ALL CAPS
- **Body:** Short 2-3 line description in regular sans-serif

### Input Fields / Contact Form
- **Label:** Small monospace ALL CAPS above the field (`NAME`, `EMAIL`, `MESSAGE`)
- **Input:** Clean rectangle, 1px `#cbd5e1` border, near-zero border-radius, white or `#f8fafc` fill
- **Placeholder:** Light gray (`#9ca3af`) monospace text
- **Focus state:** Border darkens to `#94a3b8` with no glow/shadow — stays clean and technical
- **Textarea:** Same treatment as inputs but tall, same border style

### Tech-Stack Skill Icons
- Contained in perfectly square boxes (~130×130px), thin 1px border, light background
- Simple icon (SVG line art) centered, monospace label below under a thin line separator
- **Style:** `CLEAN_CODE`, `SCALABLE_DB`, `PERFORMANCE`, `DEVOPS` — system-descriptor labels

### Section Dividers
- Single 1px `#cbd5e1` horizontal rule at full width
- Used between all major sections (`hero → works → tech → logs → contact`)
- Never decorative — purely structural

---

## 5. Layout Principles

### Grid & Spacing
- **Container:** Centered, max-width ~1200–1280px, with generous horizontal padding (~40–64px)
- **Dot-grid background texture:** Subtle repeating dot pattern (`radial-gradient`) on the `#f1f5f9` base — spacing approximately 24px, dot size ~1.5px, color `#cbd5e1`
- **Section rhythm:** Very large top/bottom padding per section (~80–120px) — breathing room is sacred
- **Project grid:** 4-column on desktop with consistent ~24px gaps between cards; orphan cards left-aligned

### Alignment
- Section headers: **Left-aligned** (not centered), with text flowing down from the left edge of the container
- Contact section headers: **Center-aligned** (exception — establishes gravity for the form below)
- Body text: Left-aligned paragraphs with natural line length (~50–60 chars)

### Whitespace Philosophy
Whitespace **is** the design. Every section has breathing room that rivals the content itself. The dot-grid texture transforms negative space from "empty" to "structural" — making the void feel intentional and deliberate.

---

## 6. Design System Notes for Stitch Generation

> **Copy this entire section into every Stitch prompt to ensure visual consistency.**

```
DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first (1280px canvas)
- Theme: Light mode, "Engineering Terminal" — clinical, precise, minimal
- Background: Arctic Blueprint White (#f1f5f9) with subtle dot-grid texture
- Surface/Card: Pure White (#ffffff) for elevated elements
- Primary Text: Pure Signal Black (#000000) for all display headings
- Body Text: Deep Slate Prose (#334155) for readable paragraph content
- Muted Text: Ghost System Gray (#64748b) for labels and metadata
- Borders: Blueprint Grid (#cbd5e1) — 1px hairlines everywhere, no drop shadows
- Dark Accent: Terminal Charcoal (#1a1a1a) for image/media zone backgrounds
- Button Fill: Command Surface (#4b5563) for primary CTAs
- Status/Pulse: Active Green Pulse (#22c55e) ONLY for live system indicators
- Heading Font: Space Grotesk Bold — ALL CAPS, high tracking
- UI/Label Font: Monospace (JetBrains Mono or IBM Plex Mono) — ALL CAPS, underscore notation
- Body Font: Space Grotesk Regular — sentence case, generous line height
- Buttons: Sharp squared-off corners (0–2px radius), no shadows
- Cards: Sharp corners, two-zone layout (dark media top / white content bottom), 1px border
- Inputs: Sharp corners, 1px border, no shadow, monospace labels above
- Spacing: Massive section padding (~100px), 24px gaps in grids
- Style keywords: Blueprint, Terminal, Systematic, Monospace, Engineering Dashboard, Achromatic
```
