# 🤖 Agent Standing Orders — Portfolio Project

These instructions are **mandatory** and must be followed in **every conversation**, no exceptions.

---

## 🎯 Primary Directive: Always Use Stitch Skills

This is a **Stitch-powered portfolio project**. The following skills are installed and **MUST be used** for UI/design work instead of building things from scratch:

| Skill | Trigger Condition |
|-------|------------------|
| `enhance-prompt` | Before EVERY Stitch generation call — always enhance the prompt first |
| `design-md` | Whenever a new Stitch project or screen is created — generate/update DESIGN.md |
| `stitch-loop` | Whenever the user wants to build or add a new page to the site |
| `react:components` | Whenever converting any Stitch design into React/Vite code |
| `remotion` | Whenever the user asks for a demo, preview video, or walkthrough |
| `shadcn-ui` | Whenever adding interactive UI components (forms, dialogs, tables, etc.) |

---

## 📋 Mandatory Pre-Task Checklist

Before starting ANY UI or frontend task, run through this checklist:

1. **Does this involve generating a UI or page?**
   - → YES: Read `enhance-prompt` skill first, enhance the prompt, THEN call Stitch
   - → NO: Continue normally

2. **Does a `DESIGN.md` file exist in the project root?**
   - → NO: Use `design-md` skill immediately before any new screen generation
   - → YES: Include the DESIGN.md content in every Stitch prompt

3. **Is the user adding a new page or section?**
   - → YES: Use `stitch-loop` skill and update `next-prompt.md` and `SITE.md`

4. **Is the user asking for React/component code from a design?**
   - → YES: Use `react:components` skill — never manually convert Stitch HTML to React

5. **Is the user asking for a video, demo, or walkthrough?**
   - → YES: Use `remotion` skill

6. **Is the user adding buttons, dialogs, forms, tables, or complex UI?**
   - → YES: Use `shadcn-ui` skill

---

## 🚫 Never Do These Things

- ❌ **Never skip `enhance-prompt`** before generating a Stitch screen
- ❌ **Never generate a new Stitch screen without checking for DESIGN.md** first
- ❌ **Never manually hand-write React components** from a Stitch design — use `react:components`
- ❌ **Never build a multi-page structure from scratch** — use `stitch-loop`
- ❌ **Never leave `next-prompt.md` stale** if the stitch-loop is active

---

## 🗂️ Key Project Files to Always Check

At the start of any UI/design task, check if these files exist and read them:

| File | Purpose |
|------|---------|
| `DESIGN.md` | Design system — MUST be included in all Stitch prompts |
| `SITE.md` | Site vision, sitemap, and roadmap |  
| `next-prompt.md` | Current stitch-loop baton (next page to build) |
| `stitch.json` | Stitch project ID — never create a new project if this exists |

---

## 🔁 Standard Workflow for This Project

When the user asks to "build a page", "add a section", or "create a UI":

```
Step 1: Read DESIGN.md + SITE.md (if they exist)
Step 2: Use enhance-prompt skill → polish the prompt
Step 3: Use stitch-loop skill → generate with Stitch MCP
Step 4: Save screen to queue/ and integrate into site/public/
Step 5: Update SITE.md sitemap and next-prompt.md baton
Step 6: Offer to convert to React using react:components skill
```

---

## 🏷️ Skill File Locations

All skills are at: `.agents/skills/[skill-name]/SKILL.md`

Always use `view_file` to read the relevant skill BEFORE executing it.

---

## 💬 Communication Style for This Project

- Always **remind the user which skill is being used** and why
- Always **show the enhanced prompt** before sending to Stitch
- Always **ask for confirmation** before starting the stitch-loop if SITE.md doesn't exist
- Proactively suggest the **next logical skill** in the workflow after each step
