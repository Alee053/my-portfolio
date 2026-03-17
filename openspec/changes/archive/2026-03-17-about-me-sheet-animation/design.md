## Context

The v2 portfolio has:
1. Hero section in `src/pages/index.astro` with name/title text that loads statically without animation
2. About Me sheet in `src/layouts/BaseLayout.astro` with GSAP animation code that doesn't work

The About Me sheet issue: The `toggleAboutModal` function is defined inside a `<script>` tag that uses ES module syntax (`import { gsap } from 'gsap'`). This scopes the function to the module's local scope, making it inaccessible from inline `onclick` handlers in the HTML. When users click "[ABOUT ME]" in the nav, the function isn't found.

## Goals / Non-Goals

**Goals:**
- Add GSAP staggered entrance animation to hero text (name, subtitle) on v2 index page
- Fix About Me sheet toggle by exposing `toggleAboutModal` to the global window object
- Ensure animations are smooth (0.5-0.8s duration, ease: power3.out)

**Non-Goals:**
- Redesign the About Me sheet content (it already has bio, education, system logs)
- Add new animations beyond hero entrance
- Change the brutalist aesthetic

## Decisions

1. **Expose toggleAboutModal globally via window** - The simplest fix is to assign the function to `window.toggleAboutModal = toggleAboutModal` after defining it. This makes it accessible from inline onclick handlers without changing the HTML markup.

2. **Use GSAP for hero animation** - The project already uses GSAP (imported in BaseLayout). We'll use it for hero text entrance with:
   - `gsap.from()` targeting hero elements
   - Staggered delay (0.1s between elements)
   - y: 20 → 0, opacity: 0 → 1
   - Duration: 0.8s, ease: power3.out

3. **Run hero animation on page load** - Add a `<script>` block in index.astro that runs the animation when the DOM is ready.

## Risks / Trade-offs

- [Risk] GSAP not loaded on client → [Mitigation] Use client-side script that runs after page load
- [Risk] Animation causes layout shift → [Mitigation] Hero section has fixed height, animation transforms only
