---
description: Analyze an existing Stitch project screen and generate a DESIGN.md design system file
---

// turbo-all

1. Check if `DESIGN.md` already exists — if it does, read it to get the Stitch Project ID
2. If no Project ID is known, call `mcp_stitch_list_projects` with `filter: "view=owned"` and pick the project
3. Call `mcp_stitch_list_screens` to list all screens in the project
4. Auto-select the first/main screen — do NOT ask the user which screen to use
5. Call `mcp_stitch_get_screen` to retrieve the screen metadata and HTML code
6. Call `mcp_stitch_get_project` to retrieve project-level design theme data
7. Download and analyze the HTML code from `htmlCode.downloadUrl` using `read_url_content`
8. Synthesize the design system following the DESIGN.md structure from the skill (include Section 6)
9. Write the result to `DESIGN.md` in the project root using `write_to_file`
10. Confirm the file was created and show a summary of the extracted design tokens