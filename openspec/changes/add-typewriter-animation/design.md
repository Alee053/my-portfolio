## Context

The Hero section in `src/sections/Hero.svelte` currently displays the name "ALEJANDRO CASTRO" and subtitle with a simple fade-in animation. The user wants to add typewriter-style animation using GSAP SplitText plugin for a more engaging entrance.

## Goals / Non-Goals

**Goals:**
- Add typewriter animation that types each character sequentially
- Add blinking cursor after the name and description
- Use GSAP SplitText plugin for character-level animation control
- Maintain existing styling and layout

**Non-Goals:**
- Modify other sections (Projects, Blogs)
- Add sound effects
- Make the cursor interactive (click to pause/resume)

## Decisions

1. **GSAP SplitText for character animation**
   - SplitText provides granular control over individual characters
   - Supports staggering for typewriter effect
   - Built-in accessibility (aria labels)
   
2. **Custom cursor implementation**
   - CSS-only blinking cursor using `@keyframes`
   - Positioned after the text element
   - Visible indefinitely after typing completes

3. **Animation sequence**
   - Name types first (faster)
   - Brief pause
   - Description types second (slower)
   - Cursor visible throughout and stays after

4. **Fallback consideration**
   - If SplitText is not available (not a Club GSAP member), use manual character wrapping
   - Check for SplitText availability before using

## Risks / Trade-offs

- **SplitText is a paid Club GSAP plugin** → User must have Club GSAP membership or we implement manual fallback
- **Performance with long text** → Only animate visible characters, cleanup after animation
- **Responsive behavior** → Text may reflow on different screen sizes; consider reverting split on resize
