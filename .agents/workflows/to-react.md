---
description: Convert a Stitch screen into clean, modular React/Vite components using the react:components skill
---

1. Read the skill file at `.agents/skills/react-components/SKILL.md`
2. Identify the target Stitch screen — ask the user which screen/page to convert if not specified
3. Call `mcp_stitch_get_screen` to retrieve the screen's HTML code and screenshot
4. Download the HTML from `htmlCode.downloadUrl` using the fetch script or curl
5. Extract the Tailwind config from the HTML `<head>` and sync with `resources/style-guide.json`
6. Create `src/data/mockData.ts` with all static content extracted from the design
7. Create modular component files in `src/components/` using the component template
8. Move event handlers and logic into custom hooks in `src/hooks/`
9. Update `App.tsx` to render the new components
10. Run `npm run validate` for each component to check for TypeScript errors
11. Run `npm run dev` to verify the live result
12. Report which files were created and any issues found
