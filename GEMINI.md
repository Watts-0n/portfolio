# GEMINI.md - Project Context

## Project Overview
**Devstarter** is a high-performance, interactive one-page developer portfolio template developed by Zippystarter. It features a futuristic, terminal-inspired aesthetic with a focus on visual impact and modern web technologies.

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS 4 (Utility-first, using modern CSS features like Grid and Subgrid)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com) integration
- **Animations:** [Motion](https://motion.dev/) (fka Framer Motion) and custom CSS animations
- **Graphics:** [Three.js](https://threejs.org/) for interactive background effects (`PixelBlast`) and `postprocessing`
- **Icons:** Lucide React
- **Custom Registries:** shadcn/ui components are supplemented by [Zippystarter](https://zippystarter.com) and [React Bits](https://reactbits.dev) registries.

## Project Structure
- `app/`: Next.js App Router files (layout, page, globals.css).
- `components/ui/`: Core UI components, including both standard shadcn/ui components and custom interactive ones (`PixelBlast`, `DecryptedText`, `TiltedCard`, `LogoLoop`).
- `components/zippystarter/`: Template-specific layout components like `Container`.
- `lib/`: Utility functions (e.g., `cn` for Tailwind class merging).
- `public/`: Static assets (images, hero backgrounds).

## Building and Running
The project recommends using `pnpm` but is compatible with `npm`.

### Development
```bash
pnpm install
pnpm dev
```
*Note: The development server defaults to port **3002** (as configured in `package.json`).*

### Production
```bash
pnpm build
pnpm start
```

### Code Quality
```bash
pnpm lint       # Run ESLint
pnpm format     # Format code with Prettier
pnpm format:check # Check formatting without applying changes
```

## Development Conventions
- **Component Pattern:** Extensive use of "use client" for interactive components.
- **Styling:** Strictly use Tailwind CSS 4 utility classes. Avoid custom CSS unless necessary for complex animations or Three.js integration.
- **Layout:** Use the `Container` component (`@/components/zippystarter/container`) to maintain consistent spacing and safe-area padding.
- **Icons:** Use `Lucide React` for all iconography.
- **Interactive UI:** Many components use `IntersectionObserver` for scroll-triggered animations (e.g., `SkillBar`).
- **Performance:** Three.js backgrounds (`PixelBlast`) are optimized for performance with auto-pause functionality when off-screen.
- **Type Safety:** TypeScript is used throughout; ensure all new components and props are properly typed.

## Custom Directives
- **Browser Automation:** Whenever I use the keyword "chrome", ALWAYS use the Chrome DevTools MCP tools (like `navigate_page`, `take_screenshot`, `evaluate_script`, `click`, etc.) to perform the requested actions or gather information directly from the browser instead of just looking at the codebase.
- **Stitch Integration:** Whenever I use the keyword "stitch", ALWAYS use the Stitch MCP tools to perform the requested actions and use all the necessary tools to accomplish the task.
- **Context7 Integration:** Whenever I use the keyword "context", ALWAYS use the Context7 MCP and all the tools that are needed to accomplish the task.
