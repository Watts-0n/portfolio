---
description: Enhance a vague UI prompt into a polished, Stitch-optimized prompt using the enhance-prompt skill
---

// turbo-all

1. Read the skill file at `.agents/skills/enhance-prompt/SKILL.md`
2. Read `DESIGN.md` if it exists — extract Section 6 (design system block)
3. Take the prompt provided by the user (or ask them for one if not provided)
4. Apply all enhancement steps from the skill: add UI/UX keywords, amplify the vibe, structure the page, format colors
5. If DESIGN.md exists, inject the design system as a "DESIGN SYSTEM (REQUIRED)" section
6. Return the enhanced prompt clearly formatted and ready to use
7. Immediately send the enhanced prompt to Stitch via `mcp_stitch_generate_screen_from_text` unless the user explicitly asked to just see the prompt
