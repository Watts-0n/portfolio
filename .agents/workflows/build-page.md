---
description: Run one iteration of the stitch-loop to generate and integrate a new page into the site
---

1. Read the skill file at `.agents/skills/stitch-loop/SKILL.md`
2. Read `next-prompt.md` to get the current baton (page name + prompt)
3. Read `SITE.md` for the site vision, Stitch project ID, existing sitemap, and roadmap
4. Read `DESIGN.md` for the design system block to inject into the prompt
5. Check that DESIGN.md exists — if it does NOT, stop and tell the user to run `/design-extract` first
6. Call `mcp_stitch_generate_screen_from_text` with the full enhanced prompt (including DESIGN.md block)
7. Call `mcp_stitch_get_screen` to retrieve the generated HTML and screenshot download URLs
8. Download and save the HTML to `queue/{page}.html` and screenshot to `queue/{page}.png`
9. Move HTML to `site/public/{page}.html` and fix any asset paths
10. Wire navigation links between pages
11. Update `SITE.md` sitemap to mark the page as complete
12. Write the next baton to `next-prompt.md` for the next iteration
13. Report what was built and what comes next
