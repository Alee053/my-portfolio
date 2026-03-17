## Why

The current portfolio uses bracket notation (`[TEXT]`) for both decorative labels and interactive links, creating visual confusion. Users cannot distinguish between decorative elements (like `[LAYOUT GRID X-72]`, `[SEC 01 // HERO]`) and actual clickable content (`[VIEW ALL]`). This violates UX clarity principles and creates cognitive friction.

## What Changes

- Establish clear visual hierarchy between decorative elements and interactive content
- Introduce CSS custom properties for decoration layer styling (lighter opacity, muted colors)
- Update SectionLabel component to use distinct styling that doesn't compete with links
- Update Hero decorative label `[LAYOUT GRID X-72]` to be clearly decorative
- Ensure all interactive links use accent color with hover states
- Add z-index layering to separate content from decoration layers
- Preserve the brutalist aesthetic while improving affordance clarity

## Capabilities

### New Capabilities

- `decoration-layer-system`: Visual layer system separating decorative elements from interactive content using distinct styling (opacity, color, cursor)

### Modified Capabilities

- `hero-animation`: Update decorative labels to use new decoration layer system
- `projects-browser`: Ensure `[VIEW ALL]` link clearly interactive vs decorative elements
- `blogs-browser`: Ensure `[VIEW ALL]` link clearly interactive vs decorative elements

## Impact

- `src/styles/globals.css` - New CSS custom properties for decoration layer
- `src/components/subcomponents/SectionLabel.svelte` - Updated styling
- `src/sections/Hero.svelte` - Decorative label refinement
- `src/sections/Projects.svelte` - Link styling clarity
- `src/sections/Blogs.svelte` - Link styling clarity