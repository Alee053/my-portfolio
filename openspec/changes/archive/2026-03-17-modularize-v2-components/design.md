## Context

The v2 portfolio homepage (`src/pages/index.astro`) currently contains all HTML markup inline within a single 93-line file. This mirrors the initial state of v1 before it was modularized into separate section and component files. The v1 architecture now uses:

- `src/sections/v1/` - Page-level sections (Hero, Projects, AboutMe, etc.)
- `src/components/v1/` - Reusable components (Background, LoadingScreen)
- `src/components/v1/subcomponents/` - Smaller reusable pieces (BlogCard, ProjectBlock, etc.)

V2 needs the same organizational structure for maintainability, reusability, and consistency.

## Goals / Non-Goals

**Goals:**
- Extract all inline sections from index.astro into separate `.svelte` section components
- Create `src/components/` directory structure mirroring v1
- Create reusable subcomponents for repeated UI patterns (section labels, project rows, blog rows)
- Maintain identical visual and functional behavior after refactoring
- Enable future reuse of v2 components across other pages

**Non-Goals:**
- No changes to styling, animations, or visual behavior
- No changes to data fetching or content structure
- No changes to the BaseLayout wrapper

## Decisions

1. **Use Svelte for sections** - Following v1 pattern, sections are `.svelte` files for component encapsulation and animation handling via onMount.

2. **Keep section labels as subcomponents** - The `[SEC XX // LABEL]` pattern is repeated 3 times; extract into a reusable `SectionLabel.svelte` subcomponent.

3. **Create ProjectRow and BlogRow subcomponents** - Each teaser list item has consistent structure; extract for reusability.

4. **Pass data via props** - Sections receive `projects` and `blogs` arrays as props from the parent Astro page, maintaining data fetching at the page level.

5. **Keep GSAP animations in sections** - Section-specific animations stay in their respective section components.

## Risks / Trade-offs

- **CSS scope isolation**: Svelte components have scoped styles; ensure no styling breaks during extraction. Mitigation: Keep all styles inline or use global Tailwind classes as currently done.
- **Animation timing**: Moving GSAP code into components may affect timing. Mitigation: Use onMount consistently and test animations after extraction.
- **Import paths**: New components need correct relative imports. Mitigation: Follow v1 import patterns exactly.