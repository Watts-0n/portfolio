---
name: remotion
description: Generate walkthrough videos from Stitch projects using Remotion with smooth transitions, zooming, and text overlays
---

# Stitch to Remotion Walkthrough Videos

You are a video production specialist focused on creating engaging walkthrough videos from app designs. You combine Stitch's screen retrieval capabilities with Remotion's programmatic video generation to produce smooth, professional presentations.

## Overview

This skill enables you to create walkthrough videos that showcase app screens with professional transitions, zoom effects, and contextual text overlays. The workflow retrieves screens from Stitch projects and orchestrates them into a Remotion video composition.

## Prerequisites

**Required:**
- Access to the Stitch MCP Server (tools prefixed with `mcp_stitch_*`)
- Node.js and npm installed
- A Stitch project with designed screens

**Recommended:**
- Familiarity with Remotion's video capabilities
- Understanding of React components (Remotion uses React)

## Retrieval and Networking

### Step 1: Retrieve Stitch Project Information

1. **Project lookup**:
   - Check `DESIGN.md` for the Stitch Project ID in the header
   - If not found, call `mcp_stitch_list_projects` with `filter: "view=owned"`
   - Identify target project by title
   - Extract Project ID from `name` field (e.g., `projects/14179918346701536450`)

2. **Screen retrieval**:
   - Call `mcp_stitch_list_screens` with the project ID (numeric only)
   - Review screen titles to identify all screens for the walkthrough
   - Extract Screen IDs from each screen's `name` field

3. **Screen metadata fetch**:
   For each screen:
   - Call `mcp_stitch_get_screen` with `projectId`, `screenId`, and full `name` path
   - Retrieve:
     - `screenshot.downloadUrl` — Visual asset for the video
     - `htmlCode.downloadUrl` — Optional: for extracting text/content
     - `width`, `height` — Screen dimensions for proper scaling
     - Screen title and description for text overlays

4. **Asset download**:
   - Use `read_url_content` or `run_command` with `Invoke-WebRequest -Uri "URL" -OutFile "path"` (PowerShell) to download screenshots
   - Save to a staging directory: `video/public/assets/screens/{screen-name}.png`
   - Organize assets in order of the intended walkthrough flow

### Step 2: Set Up Remotion Project

1. **Check for existing Remotion project**:
   - Use `view_file` to look for `remotion.config.ts` or check `package.json` for Remotion dependencies
   - If exists, use the existing project structure

2. **Create new Remotion project** (if needed):
   ```bash
   npx -y create-video@latest -- --blank
   ```
   - Choose TypeScript template
   - Set up in a dedicated `video/` directory

3. **Install dependencies** (via `run_command`):
   ```
   npm install @remotion/transitions @remotion/animated-emoji
   ```

## Video Composition Strategy

### Architecture

Create a modular Remotion composition with these components:

1. **`ScreenSlide.tsx`** — Individual screen display component
   - Props: `imageSrc`, `title`, `description`, `width`, `height`
   - Features: Zoom-in animation, fade transitions
   - Duration: Configurable (default 3-5 seconds per screen)

2. **`WalkthroughComposition.tsx`** — Main video composition
   - Sequences multiple `ScreenSlide` components
   - Handles transitions between screens
   - Adds text overlays and annotations

3. **`config.ts`** — Video configuration
   - Frame rate (default: 30 fps)
   - Video dimensions (match Stitch screen dimensions or scale appropriately)
   - Total duration calculation

### Transition Effects

Use Remotion's `@remotion/transitions` for professional effects:

- **Fade**: Smooth cross-fade between screens
  ```tsx
  import {fade} from '@remotion/transitions/fade';
  ```

- **Slide**: Directional slide transitions
  ```tsx
  import {slide} from '@remotion/transitions/slide';
  ```

- **Zoom**: Zoom in/out effects for emphasis
  - Use `spring()` animation for smooth zoom
  - Apply to important UI elements

### Text Overlays

Add contextual information using Remotion's text rendering:

1. **Screen titles**: Display at the top or bottom of each frame
2. **Feature callouts**: Highlight specific UI elements with animated pointers
3. **Descriptions**: Fade in descriptive text for each screen
4. **Progress indicator**: Show current screen position in walkthrough

## Execution Steps

### Step 1: Gather Screen Assets

1. Identify target Stitch project (from `DESIGN.md` or `mcp_stitch_list_projects`)
2. List all screens with `mcp_stitch_list_screens`
3. Download screenshots for each screen with `mcp_stitch_get_screen` + `read_url_content`
4. Organize in order of walkthrough flow
5. Create a manifest file (`screens.json`):

```json
{
  "projectName": "Portfolio",
  "screens": [
    {
      "id": "1",
      "title": "Home Screen",
      "description": "Main portfolio interface",
      "imagePath": "public/assets/screens/home.png",
      "width": 1200,
      "height": 800,
      "duration": 4
    }
  ]
}
```

### Step 2: Generate Remotion Components

Create the video components following Remotion best practices:

1. **Create `ScreenSlide.tsx`**:
   - Use `useCurrentFrame()` and `spring()` for animations
   - Implement zoom and fade effects
   - Add text overlays with proper timing

2. **Create `WalkthroughComposition.tsx`**:
   - Import screen manifest
   - Sequence screens with `<Sequence>` components
   - Apply transitions between screens
   - Calculate proper timing and offsets

3. **Update `remotion.config.ts`**:
   - Set composition ID
   - Configure video dimensions
   - Set frame rate and duration

### Step 3: Preview and Refine

1. **Start Remotion Studio** (via `run_command`):
   ```
   npm run dev
   ```

2. **Adjust timing** and **fine-tune animations** as needed.

### Step 4: Render Video

1. **Render using Remotion CLI** (via `run_command`):
   ```
   npx remotion render WalkthroughComposition output.mp4
   ```

## File Structure

```
portfolio/
├── video/                      # Remotion project directory
│   ├── src/
│   │   ├── WalkthroughComposition.tsx
│   │   ├── ScreenSlide.tsx
│   │   ├── components/
│   │   │   ├── Hotspot.tsx
│   │   │   └── TextOverlay.tsx
│   │   └── Root.tsx
│   ├── public/
│   │   └── assets/
│   │       └── screens/        # Downloaded Stitch screenshots
│   ├── remotion.config.ts
│   └── package.json
├── screens.json                # Screen manifest
└── output.mp4                  # Rendered video
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Blurry screenshots** | Ensure downloaded images are at full resolution; check `screenshot.downloadUrl` quality settings |
| **Misaligned text** | Verify screen dimensions match composition size; adjust text positioning based on actual screen size |
| **Choppy animations** | Increase frame rate to 60fps; use proper spring configurations with appropriate damping |
| **Remotion build fails** | Check Node version compatibility; ensure all dependencies are installed; review Remotion docs |
| **Download fails** | Use `run_command` with `Invoke-WebRequest` (PowerShell) as a fallback for `read_url_content` |

## Best Practices

1. **Maintain aspect ratio**: Use actual Stitch screen dimensions or scale proportionally
2. **Consistent timing**: Keep screen display duration consistent unless emphasizing specific screens
3. **Readable text**: Ensure sufficient contrast; use appropriate font sizes; avoid cluttered overlays
4. **Smooth transitions**: Use spring animations for natural motion; avoid jarring cuts
5. **Preview thoroughly**: Always preview in Remotion Studio before final render

## References

- **Stitch Documentation**: https://stitch.withgoogle.com/docs/
- **Remotion Documentation**: https://www.remotion.dev/docs/
- **Remotion Skills**: https://www.remotion.dev/docs/ai/skills
- **Remotion Transitions**: https://www.remotion.dev/docs/transitions
