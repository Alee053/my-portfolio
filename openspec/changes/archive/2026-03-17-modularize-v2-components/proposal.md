## Why

The v2 index.astro page contains all section markup inline (93 lines), making it difficult to maintain, test, and reuse components. Following the established v1 architecture with separate components/ and sections/ directories will improve code organization, enable component reusability, and maintain consistency across portfolio versions.

## What Changes

- Extract Hero section from index.astro into `sections/Hero.svelte`
- Extract Projects teaser section into `sections/Projects.svelte`
- Extract Blogs teaser section into `sections/Blogs.svelte`
- Create `components/` directory structure matching v1 pattern (`Background.svelte`, `LoadingScreen.svelte`, `subcomponents/`)
- Extract reusable UI elements (section labels, project/blog cards) into subcomponents
- Refactor index.astro to import and use modular section components

## Capabilities

### New Capabilities

- `v2-hero-section`: Modular Hero section component for v2 portfolio homepage
- `v2-projects-section`: Modular Projects teaser section component
- `v2-blogs-section`: Modular Blogs teaser section component
- `v2-components-structure`: V2 components directory structure with reusable subcomponents

### Modified Capabilities

None - this is a structural reorganization, no behavioral changes.

## Impact

- Files modified: `src/pages/index.astro` (simplified to import sections)
- Files created: `src/sections/{Hero,Projects,Blogs}.svelte`
- Directories created: `src/components/`, `src/components/subcomponents/`
- No breaking changes to public API or page functionality