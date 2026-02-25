---
description: Run one iteration of the stitch-loop to generate and integrate a new page into the site
---

// turbo-all

1. Read the skill file at `.agents/skills/stitch-loop/SKILL.md`
2. Read `DESIGN.md` to get the Stitch Project ID and design system (Section 6)
3. Read `next-prompt.md` to get the current baton (page name + prompt) — if it doesn't exist, ask the user what to build
4. If `DESIGN.md` does not exist, run the `/design-extract` workflow first to create it
5. Enhance the prompt using the `enhance-prompt` skill — inject DESIGN.md Section 6
6. Call `mcp_stitch_generate_screen_from_text` with the enhanced prompt, projectId from DESIGN.md, and `deviceType: DESKTOP`
7. Call `mcp_stitch_get_screen` to retrieve the generated screen's HTML and screenshot URLs
8. Download HTML with `read_url_content` and save to `queue/{page}.html`
9. Convert the HTML to a React component in `components/{page}.tsx` following `react:components` skill conventions
10. Update `app/page.tsx` to import and render the new component
11. Run `npx tsc --noEmit` to verify types
12. Write the next baton to `next-prompt.md` for the next iteration
13. Report what was built and what comes next
