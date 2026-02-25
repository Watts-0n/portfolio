# 🤖 Agent Standing Orders — Portfolio Project

These instructions are **mandatory** and apply to **every conversation**, no exceptions.

---

## 📌 Project Context

| Key | Value |
|-----|-------|
| **Framework** | Next.js (App Router) with TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Components** | `components/ui/` (shadcn) · `components/` (custom) |
| **Pages** | `app/page.tsx` (single-page portfolio with sections) |
| **Stitch Project ID** | `14179918346701536450` |
| **Design System** | `DESIGN.md` (root) — **always include Section 6 in Stitch prompts** |
| **MCP Prefix** | All Stitch tools use `mcp_stitch_*` (e.g. `mcp_stitch_generate_screen_from_text`) |
| **OS** | Windows — use `run_command` with PowerShell, never bash scripts |

---

## 🎯 Skill Dispatch — No Questions, Just Do It

When the user's request matches a trigger below, **read the skill file first**, then execute it immediately. Do not ask for confirmation.

| If the user wants to... | Skill to read & execute | File |
|-------------------------|------------------------|------|
| Generate or improve a UI design | `enhance-prompt` → enhance, then send to Stitch | `.agents/skills/enhance-prompt/SKILL.md` |
| Create/update the design system | `design-md` → analyze Stitch screens, write `DESIGN.md` | `.agents/skills/design-md/SKILL.md` |
| Build a new page or section | `stitch-loop` → generate with Stitch, integrate as component | `.agents/skills/stitch-loop/SKILL.md` |
| Convert a Stitch design to React | `react:components` → modular Next.js components | `.agents/skills/react-components/SKILL.md` |
| Create a walkthrough video | `remotion` → Remotion video from Stitch screenshots | `.agents/skills/remotion/SKILL.md` |
| Add interactive UI (forms, dialogs) | `shadcn-ui` → install and customize shadcn components | `.agents/skills/shadcn-ui/SKILL.md` |

**Chain skills automatically:** When generating a new UI section, always: enhance-prompt → Stitch generate → react:components convert → integrate into `app/page.tsx`.

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

1. **`DESIGN.md` exists?** → YES: extract Section 6 and inject into every Stitch prompt. NO: run `design-md` skill first.
2. **Stitch Project ID known?** → Use `14179918346701536450`. If starting a new design project, create one and update `DESIGN.md` header.
3. **Prompt ready?** → Always run `enhance-prompt` before any `mcp_stitch_generate_screen_from_text` call.

---

## 🚫 Never Do These

- ❌ Never call Stitch without injecting `DESIGN.md` Section 6 into the prompt
- ❌ Never ask "which screen to use" — auto-pick the most relevant or first one
- ❌ Never reference `Bash`, `web_fetch`, `Read`, `Write`, or `list_tools` — use the correct tool names above
- ❌ Never assume Vite or static HTML — this is a **Next.js App Router** project
- ❌ Never use bash scripts on Windows — use `run_command` with PowerShell
- ❌ Never create `stitch.json` or `SITE.md` — `DESIGN.md` is the single source of truth
