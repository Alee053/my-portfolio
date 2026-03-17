## Why

The V2 portfolio restyle is complete but has usability and visual issues: the fixed background grid interferes with reading, the About Me modal lacks animation, the Blogs section isn't integrated into the homepage, and the Current Projects section has a data loading bug. These tweaks improve the user experience and complete the V2 design.

## What Changes

- Change background grid from fixed to relative scrolling positioning
- Add GSAP slide-in animation to the About Me modal
- Add Blogs section to the V2 homepage (v2/index.astro)
- Fix Current Projects section title loading issue (investigate and fix data binding)
- Ensure consistent data fetching pattern across sections

## Capabilities

### New Capabilities

- `homepage-blogs-section`: Add a blogs teaser section to the V2 homepage, similar to the existing Projects section
- `scrollable-background-grid`: Convert the fixed background grid to scroll with content using relative positioning

### Modified Capabilities

- `about-me-modal`: Add GSAP slide-in/slide-out animation to replace the simple show/hide toggle
- `projects-section`: Fix title loading issue in the Current Projects section to match the original portfolio data fetching pattern

## Impact

- **Modified Files**: 
  - `src/layouts/V2Layout.astro` - background grid positioning
  - `src/layouts/V2Layout.astro` - About Me modal animation
  - `src/pages/v2/index.astro` - add blogs section
  - Any files related to Current Projects data loading
- **Dependencies**: GSAP (already installed), no new dependencies needed
- **Affects**: V2 portfolio pages only
