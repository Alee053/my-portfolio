## Why

The v2 portfolio page has an About Me sheet in BaseLayout.astro with GSAP animations, but neither the hero text animation nor the About Me sheet functionality works. The hero section lacks entrance animation, and the "About Me" button doesn't trigger the sheet because the toggleAboutModal function is scoped inside an ES module script block and isn't accessible from inline onclick handlers.

## What Changes

- Add hero text entrance animation using GSAP (staggered reveal on page load)
- Fix the About Me sheet by exposing toggleAboutModal globally so it can be called from inline onclick handlers
- Ensure the sheet slides in/out smoothly with GSAP

## Capabilities

### New Capabilities
- `hero-animation`: Animated entrance for hero text on the v2 index page
- `about-sheet-fix`: Fix the broken About Me sheet toggle functionality

### Modified Capabilities
- (none - fixing existing broken implementations)

## Impact

- File: `src/pages/index.astro` - Add hero animation
- File: `src/layouts/BaseLayout.astro` - Fix global function exposure for modal toggle
