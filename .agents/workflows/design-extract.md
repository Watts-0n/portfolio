---
description: Analyze an existing Stitch project screen and generate a DESIGN.md design system file
---

1. Read the skill file at `.agents/skills/design-md/SKILL.md`
2. Check if `stitch.json` exists — if it does, use the projectId from it. Otherwise call `mcp_stitch_list_projects` to find the project
3. Call `mcp_stitch_list_screens` to list all screens in the project
4. Ask the user which screen to use as the design reference (or use the first/main screen by default)
5. Call `mcp_stitch_get_screen` to retrieve the screen metadata and HTML code
6. Call `mcp_stitch_get_project` to retrieve project-level design theme data
7. Download and analyze the HTML code from `htmlCode.downloadUrl`
8. Synthesize the design system following the DESIGN.md structure from the skill
9. Write the result to `DESIGN.md` in the project root
10. Confirm the file was created and show a summary of the extracted design tokens
