---
name: react:components
description: Converts Stitch designs into modular Next.js React components with TypeScript.
---

# Stitch to React Components

You are a frontend engineer focused on transforming Stitch designs into clean React code for a **Next.js App Router** project. You follow a modular approach and produce TypeScript components.

## Retrieval and networking

1. **Metadata fetch**: Call `mcp_stitch_get_screen` with the target `projectId` and `screenId` to retrieve the design JSON.
2. **HTML download**: Use `read_url_content` to download the HTML from `htmlCode.downloadUrl`.
3. **Visual audit**: Use `view_file` on the downloaded screenshot or reference `screenshot.downloadUrl` to confirm the design intent and layout details.

## Project conventions (Next.js)

This project uses **Next.js App Router** with the following structure:

```
portfolio/
├── app/
│   ├── page.tsx          # Main page — sections are composed here
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles & Tailwind config
├── components/
│   ├── ui/                # shadcn/ui primitives (do NOT edit directly)
│   └── [section-name].tsx # Custom section components go here
├── lib/
│   └── utils.ts           # cn() utility
├── DESIGN.md              # Design system reference
└── tailwind.config.ts
```

**Important rules:**
- Components go in `components/` (NOT `src/components/`)
- Imports use `@/` alias (e.g., `import { Button } from "@/components/ui/button"`)
- Use `"use client"` directive for components with interactivity
- Follow existing shadcn/ui patterns for styling

## Architectural rules

* **Modular components**: Break the design into independent files. Avoid large, single-file outputs.
* **Logic isolation**: Move event handlers and business logic into custom hooks in `hooks/` if complex.
* **Data decoupling**: Move all static text, image URLs, and lists into a `data` object or constants at the top of the component file.
* **Type safety**: Every component must include a `Readonly` TypeScript interface named `[ComponentName]Props`.
* **Style mapping**:
    * Extract the Tailwind config from the Stitch HTML `<head>`.
    * Map design tokens to Tailwind CSS classes or CSS variables in `globals.css`.
    * Use theme-mapped Tailwind classes instead of arbitrary hex codes where possible.

## Execution steps

1. **Read DESIGN.md**: Use `view_file` to read the project's design system and ensure consistency.
2. **Data layer**: Create constants/data objects with all static content extracted from the design.
3. **Component drafting**: Create modular component files in `components/`. Use existing project conventions (see `components/ui/` for patterns).
4. **Application wiring**: Update `app/page.tsx` to import and render the new components.
5. **Quality check**:
    * Run `run_command` with `npx tsc --noEmit` to type-check all components.
    * Run `run_command` with `npm run build` to verify the build passes.
    * Run `run_command` with `npm run dev` to verify the live result.

## Troubleshooting

* **Fetch errors**: If `read_url_content` fails on a Stitch download URL, try using `run_command` with `Invoke-WebRequest -Uri "URL" -OutFile "path"` (PowerShell).
* **Type errors**: Run `npx tsc --noEmit` and fix any missing interfaces or incorrect prop types.
* **Style mismatches**: Compare against the Stitch screenshot and adjust Tailwind classes accordingly.