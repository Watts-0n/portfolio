---
name: stitch-loop
description: Teaches agents to iteratively build websites using Stitch with an autonomous baton-passing loop pattern
---

# Stitch Build Loop

You are an **autonomous frontend builder** participating in an iterative site-building loop. Your goal is to generate a page/section using Stitch, convert it to a React component, integrate it into the Next.js site, and prepare instructions for the next iteration.

## Overview

The Build Loop pattern enables continuous, autonomous website development through a "baton" system. Each iteration:
1. Reads the current task from a baton file (`next-prompt.md`)
2. Enhances the prompt and generates a screen using Stitch MCP tools
3. Converts the Stitch output to a React component
4. Integrates the component into `app/page.tsx`
5. Writes the next task to the baton file for the next iteration

## Prerequisites

**Required:**
- Access to the Stitch MCP Server (tools prefixed with `mcp_stitch_*`)
- A `DESIGN.md` file
- The Stitch Project ID (found in the `DESIGN.md` header)

**Optional:**
- A `next-prompt.md` baton file (will be created if it doesn't exist)

## The Baton System

The `next-prompt.md` file acts as a relay baton between iterations:

```markdown
---
page: about
---
A page describing the about section.

**DESIGN SYSTEM (REQUIRED):**
[Copy from DESIGN.md Section 6]

**Page Structure:**
1. Header with navigation
2. About content with bio
3. Footer with links
```

**Critical rules:**
- The `page` field in YAML frontmatter determines the component name
- The prompt content must include the design system block from `DESIGN.md` Section 6
- You MUST update this file before completing your work to continue the loop

## Execution Protocol

### Step 1: Read the Baton

Use `view_file` to parse `next-prompt.md` and extract:
- **Page/section name** from the `page` frontmatter field
- **Prompt content** from the markdown body

If `next-prompt.md` doesn't exist, ask the user what to build and create it.

### Step 2: Consult Context Files

Before generating, use `view_file` to read:

| File | Purpose |
|------|---------|
| `DESIGN.md` | Design system — Section 6 MUST be injected into every Stitch prompt |

**Important:** Check the Stitch Project ID from the `DESIGN.md` header. Use this ID for all `mcp_stitch_*` calls.

### Step 3: Generate with Stitch

Use the Stitch MCP tools to generate the page:

1. **Get or verify project**: 
   - Use the Project ID from `DESIGN.md` header
   - If no project exists, call `mcp_stitch_create_project` and update `DESIGN.md` with the new ID
2. **Generate screen**: Call `mcp_stitch_generate_screen_from_text` with:
   - `projectId`: The project ID from `DESIGN.md`
   - `prompt`: The full prompt from the baton (including design system block from Section 6)
   - `deviceType`: `DESKTOP` (or as specified)
3. **Retrieve assets**: Call `mcp_stitch_get_screen` to get:
   - `htmlCode.downloadUrl` — Download with `read_url_content` and save to `queue/{page}.html`
   - `screenshot.downloadUrl` — Download and save to `queue/{page}.png`

### Step 4: Convert to React Component

Follow the `react:components` skill pattern:

1. Use `read_url_content` to fetch the Stitch HTML from `htmlCode.downloadUrl`
2. Extract the relevant sections from the HTML
3. Create a new component file at `components/{page-name}.tsx`
4. Use TypeScript with proper `Props` interfaces
5. Use `@/` import aliases and follow existing project conventions
6. Map Tailwind classes from the Stitch output to the component

### Step 5: Integrate into Site

1. Use `view_file` to read `app/page.tsx`
2. Import the new component at the top of the file
3. Add the component in the correct position within the page layout
4. Ensure consistent spacing and section structure

### Step 6: Verify

1. Run `run_command` with `npx tsc --noEmit` to type-check
2. Run `run_command` with `npm run build` to verify the build
3. Optionally run `run_command` with `npm run dev` to preview

### Step 7: Prepare the Next Baton (Critical)

**You MUST update `next-prompt.md` before completing.** This keeps the loop alive.

1. **Decide the next section/page**: Pick the next logical section or ask the user
2. **Write the baton** with proper YAML frontmatter and include `DESIGN.md` Section 6

```markdown
---
page: achievements
---
A competitive achievements page showing developer badges and milestones.

**DESIGN SYSTEM (REQUIRED):**
[Copy the entire design system block from DESIGN.md Section 6]

**Page Structure:**
1. Header with title and navigation
2. Badge grid showing unlocked/locked states
3. Progress bars for milestone tracking
```

## File Structure Reference

```
portfolio/
├── next-prompt.md          # The baton — current task
├── DESIGN.md               # Design system
├── queue/                   # Staging area for Stitch output
│   ├── {page}.html
│   └── {page}.png
├── app/
│   ├── page.tsx             # Main page — sections composed here
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
└── components/
    ├── ui/                  # shadcn/ui components (don't edit)
    └── {section-name}.tsx   # Generated section components
```

## Design System Integration

This skill works best with the `DESIGN.md` file:

1. **First time setup**: Generate `DESIGN.md` using the `DESIGN.md` from an existing Stitch screen
2. **Every iteration**: Copy Section 6 ("Design System Notes for Stitch Generation") into your baton prompt
3. **Consistency**: All generated pages will share the same visual language

## Common Pitfalls

- ❌ Forgetting to update `next-prompt.md` (breaks the loop)
- ❌ Not including the design system block (Section 6) in the prompt
- ❌ Using wrong tool names (always use `mcp_stitch_*`, `view_file`, `write_to_file`, `run_command`)
- ❌ Placing components in `src/` instead of `components/`
- ❌ Creating a new Stitch project when one already exists (check `DESIGN.md` for Project ID)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Stitch generation fails | Verify the prompt includes the DESIGN.md Section 6 block |
| Inconsistent styles | Re-read DESIGN.md and ensure full Section 6 is copied |
| Loop stalls | Verify `next-prompt.md` was updated with valid frontmatter |
| Component doesn't render | Check imports in `app/page.tsx` and verify `"use client"` directive if needed |
| Build fails | Run `npx tsc --noEmit` to find type errors |
