# 🤖 Agent Standing Orders — Portfolio Project

These instructions are **mandatory** and apply to **every conversation**, no exceptions.

---

## 📌 Project Context

| Key | Value |
|-----|-------|
| **Framework** | Next.js (App Router) with TypeScript |
| **Styling** | Tailwind CSS |
| **Components** | `components/ui/` (ui components) · `components/` (components) |
| **Pages** | `app/page.tsx` (single-page portfolio with sections) |
| **Stitch Project ID** | `14179918346701536450` |
| **Design System** | `DESIGN.md` (root) — **always include Section 6 in Stitch prompts** |
| **MCP Prefix** | All Stitch tools use `mcp_stitch_*` (e.g. `mcp_stitch_generate_screen_from_text`) |
| **OS** | Windows — use `run_command` with PowerShell, never bash scripts |

---

## ⚡ Stitch Keyword — Instant Activation

Whenever the user's message contains the word **"stitch"** (any case — Stitch, stitch, STITCH), **immediately activate the full Stitch stack** without asking for confirmation:

1. **Read the relevant skill file(s)** from `.agents/skills/` (see Skill Dispatch table below).
2. **Confirm the active Stitch Project ID** → always use `14179918346701536450` unless the user specifies another.
3. **Load `DESIGN.md`** from the project root and extract Section 6 (design tokens / component rules).
4. **Make all `mcp_stitch_*` MCP tools available and ready** — list them mentally so they can be called immediately:
   - `mcp_stitch_list_projects`
   - `mcp_stitch_get_project`
   - `mcp_stitch_list_screens`
   - `mcp_stitch_get_screen`
   - `mcp_stitch_generate_screen_from_text`
   - `mcp_stitch_edit_screens`
   - `mcp_stitch_generate_variants`
   - `mcp_stitch_create_project`
5. **Run `enhance-prompt` skill** before any screen generation call to upgrade the prompt quality.
6. **Proceed directly** — no clarifying questions about which project/screen unless truly ambiguous.

> 💡 Think of "stitch" as a magic word that hands you a fully loaded Stitch toolkit. The moment you see it, everything above is already done.

---

## 🎯 Skill Dispatch — No Questions, Just Do It

When the user's request matches a trigger below, **read the skill file first**, then execute it immediately. Do not ask for confirmation. **Always announce the skill** before running it (see 📢 Skill Announcements below).

| If the user wants to... | Skill to read & execute | File |
|-------------------------|------------------------|------|
| Generate or improve a UI design | `enhance-prompt` → enhance, then send to Stitch | `.agents/skills/enhance-prompt/SKILL.md` |
| Build a new page or section | `stitch-loop` → generate with Stitch, integrate as component | `.agents/skills/stitch-loop/SKILL.md` |
| Convert a Stitch design to React | `react:components` → modular Next.js components | `.agents/skills/react-components/SKILL.md` |
| Create a walkthrough video | `remotion` → Remotion video from Stitch screenshots | `.agents/skills/remotion/SKILL.md` |
| Add interactive UI (forms, dialogs) | `shadcn-ui` → install and customize shadcn components | `.agents/skills/shadcn-ui/SKILL.md` |

**Chain skills automatically:** When generating a new UI section, always: enhance-prompt → Stitch generate → react:components convert → integrate into `app/page.tsx`.

---

## 📢 Skill Announcements — Always Tell the User

Before executing **any** skill, output a short announcement to the user in this exact format:

```
🔧 Using skill: [skill-name]
📌 Why: [one sentence explaining what this skill does for the current task]
```

Examples:

| Skill activated | Announcement to show |
|----------------|----------------------|
| `enhance-prompt` | `🔧 Using skill: enhance-prompt` · `📌 Why: Upgrading your prompt with design tokens and UI/UX keywords before sending to Stitch.` |
| `stitch-loop` | `🔧 Using skill: stitch-loop` · `📌 Why: Running the generate → review → integrate loop to build this page section with Stitch.` |
| `react:components` | `🔧 Using skill: react:components` · `📌 Why: Converting the Stitch screen into modular, typed Next.js React components.` |
| `remotion` | `🔧 Using skill: remotion` · `📌 Why: Generating a walkthrough video of Stitch screens using Remotion.` |
| `shadcn-ui` | `🔧 Using skill: shadcn-ui` · `📌 Why: Installing and wiring up the correct shadcn/ui component for this interaction.` |

When chaining skills, announce **each one** in sequence as you reach it — not all upfront.

---

## 🔧 Tool Name Reference

Skills reference tools by these exact names — never use aliases:

| Action | Correct Tool |
|--------|-------------|
| Read a file | `view_file` |
| Write/create a file | `write_to_file` |
| Edit a file | `replace_file_content` or `multi_replace_file_content` |
| Run a shell command | `run_command` (PowerShell on Windows) |
| Fetch a URL | `read_url_content` |
| Stitch: list projects | `mcp_stitch_list_projects` |
| Stitch: get project | `mcp_stitch_get_project` |
| Stitch: list screens | `mcp_stitch_list_screens` |
| Stitch: get screen | `mcp_stitch_get_screen` |
| Stitch: generate screen | `mcp_stitch_generate_screen_from_text` |
| Stitch: edit screen | `mcp_stitch_edit_screens` |
| Stitch: create project | `mcp_stitch_create_project` |

---

## 📋 Pre-Task Checklist (Silent — Don't Ask, Just Check)

Before any UI/design task, silently verify:

1. **`DESIGN.md` loaded?** → Call `view_file` on `DESIGN.md` (project root). Extract **Section 6** ("Design System Notes for Stitch Generation") and inject it verbatim into every Stitch prompt. This is non-negotiable.
2. **Stitch Project ID known?** → Use `14179918346701536450`. If starting a new design project, create one and update `DESIGN.md` header.
3. **Prompt ready?** → Always run `enhance-prompt` before any `mcp_stitch_generate_screen_from_text` call.

---

## 📐 DESIGN.md — How to Use It

`DESIGN.md` (project root) is the **single source of truth** for all visual decisions. It contains:

| Section | What's in it | When to use |
|---------|-------------|-------------|
| **1. Visual Theme** | Mood, tone, aesthetic philosophy | Reference when writing Stitch prompts |
| **2. Color Palette** | `oklch()` tokens + hex equivalents for light & dark mode | Use exact values in prompts and code |
| **3. Typography** | Font families, utility classes, conventions | Copy font names verbatim into prompts |
| **4. Component Stylings** | Nav, hero, cards, buttons, inputs, status panel | Reference when building components |
| **5. Layout Principles** | Grid, spacing, background layers, whitespace | Reference for layout decisions |
| **6. Stitch Generation Notes** | ⭐ Copy-paste block for Stitch prompts | **Inject into EVERY Stitch prompt, no exceptions** |

### Rules
- **Always `view_file` `DESIGN.md` before any Stitch call** — don't rely on memory
- **Section 6 is mandatory** in every `mcp_stitch_generate_screen_from_text` and `mcp_stitch_edit_screens` prompt
- **Update `DESIGN.md`** if the user makes a significant visual change to the project
- The file lives at: `c:\Users\BLUD\Documents\portfolio\DESIGN.md`

---

## 🚫 Never Do These

- ❌ Never call Stitch without injecting `DESIGN.md` Section 6 into the prompt
- ❌ Never ask "which screen to use" — auto-pick the most relevant or first one
- ❌ Never reference `Bash`, `web_fetch`, `Read`, `Write`, or `list_tools` — use the correct tool names above
- ❌ Never assume Vite or static HTML — this is a **Next.js App Router** project
- ❌ Never use bash scripts on Windows — use `run_command` with PowerShell
- ❌ Never create `stitch.json` or `SITE.md` — `DESIGN.md` is the single source of truth
- ❌ Never ignore the "Stitch Keyword" trigger — if the user writes "stitch" anywhere, activate the full Stitch stack immediately
- ❌ Never silently run a skill — always announce it with the `🔧 Using skill:` + `📌 Why:` format before executing
