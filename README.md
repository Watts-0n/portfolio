# Dāvids Locāns - Full Stack Developer Portfolio

This is the repository for my personal developer portfolio, showcasing my projects, skills, and experience. It is designed to be a high-performance, interactive, one-page terminal-inspired portal showcasing modern web development capabilities.

## Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Library:** [React 19](https://react.dev/)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **UI Components:** [shadcn/ui](https://ui.shadcn.com) and custom interactive elements
*   **Animations:** [Motion](https://motion.dev/) & Custom CSS Grid/Subgrid Magic
*   **3D Graphics:** [Three.js](https://threejs.org/) (for interactive canvas effects like the `PixelBlast` background)
*   **Icons:** [Lucide React](https://lucide.dev/)

## Features

*   **Single-Page Interactive Experience:** Fluid scrolling, sticky headers, and smart intersection observers for element animation based on viewport presence.
*   **PixelBlast Three.js Background:** An optimized, interactive 3D particle simulation running in the background, pausing when outside the viewport to maximize performance.
*   **Glassmorphism & Terminal Aesthetics:** Heavily utilizes background blurs (`backdrop-blur`), translucent cards, and decrypted-text typewriter effects.
*   **Client-Side Scam Protection:** Uses hydration to assemble email links dynamically, shielding contact info from elementary HTML scrapers without impacting actual human users.

## Getting Started

### Prerequisites

Node.js installed (LTS recommended) and `pnpm`.

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Start the development server (runs on port 3002 as configured):

```bash
pnpm dev
```

4. Open [http://localhost:3002](http://localhost:3002) in your browser to view the application.

## Building for Production

Compile a highly optimized production build:

```bash
pnpm build
```

Then start the application:

```bash
pnpm start
```

## Structure

*   `app/`: Core App Router definition, layout, page structure, and global CSS.
*   `components/ui/`: Core generic and unstyled building blocks (buttons, textareas, inputs).
*   `components/home/`: Specific, distinct sections of the portfolio site (e.g., `hero-section.tsx`, `projects-section.tsx`, `contact-section.tsx`).
*   `components/zippystarter/`: Pre-defined boilerplate layout wrappers such as the core `Container`.
*   `lib/`: Lightweight utilities containing logic separated from UI (e.g., `cn` for classname merging, raw project `data.tsx`).

## License

© 2026 Dāvids Locāns. All Rights Reserved.
