---
description: Convert a Stitch screen into clean, modular React/Next.js components using the react:components skill
---

// turbo-all

1. Read the skill file at `.agents/skills/react-components/SKILL.md`
2. Read `DESIGN.md` to get the Stitch Project ID and design system context
3. Identify the target Stitch screen — if not specified, call `mcp_stitch_list_screens` and pick the most recent
4. Call `mcp_stitch_get_screen` to retrieve the screen's HTML code and screenshot
5. Download the HTML from `htmlCode.downloadUrl` using `read_url_content`
6. Extract the Tailwind config from the HTML `<head>` and map to project's `globals.css` variables
7. Create modular component files in `components/` with TypeScript interfaces
8. Move static data into constants at the top of component files
9. Update `app/page.tsx` to import and render the new components
10. Run `npx tsc --noEmit` to verify types
11. Run `npm run build` to verify the full build
12. Report which files were created and any issues found
