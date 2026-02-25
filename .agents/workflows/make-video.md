---
description: Generate a professional walkthrough video of your Stitch project screens using Remotion
---

// turbo-all

1. Read the skill file at `.agents/skills/remotion/SKILL.md`
2. Read `DESIGN.md` to get the Stitch Project ID
3. Call `mcp_stitch_list_screens` with the project ID to retrieve all screens
4. Call `mcp_stitch_get_screen` for each screen to get screenshots and metadata
5. Download all screenshots to `video/public/assets/screens/` using `read_url_content` or `run_command` with `Invoke-WebRequest`
6. Create `screens.json` manifest with screen titles, descriptions, paths, and durations
7. Check if a Remotion project exists in `video/` — if not, scaffold one with `run_command`: `npx -y create-video@latest -- --blank`
8. Create `ScreenSlide.tsx` with zoom and fade animations using `useCurrentFrame()` and `spring()`
9. Create `WalkthroughComposition.tsx` that sequences all slides with transitions
10. Update `remotion.config.ts` with correct dimensions and frame rate
11. Start Remotion Studio with `run_command`: `npm run dev`
12. Render final video with `run_command`: `npx remotion render WalkthroughComposition output.mp4`
13. Report the output file location and video duration
