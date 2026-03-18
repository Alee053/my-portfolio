## Why

The blogs and projects browser pages have inconsistent styling compared to the home page (index.astro), with tags displayed inline at the top rather than in a professional sidebar layout, and search inputs showing unwanted focus outlines. The browsers lack sorting capabilities and professional organization, making them feel disconnected from the cohesive brutalist design system.

## What Changes

- Refactor BlogsBrowser and ProjectsBrowser components to use existing BlogRow and ProjectRow subcomponents for list items
- Implement sidebar-based tag filtering with horizontal layout and visual hierarchy
- Add sorting capabilities (by date for blogs, by title/tags for projects)
- Remove focus ring/outline from search inputs for cleaner brutalist aesthetic
- Apply consistent global color variables from globals.css throughout
- Improve empty state messaging with brutalist styling
- Add filter count indicator showing active filters

## Capabilities

### New Capabilities

- `browser-sidebar-filters`: Sidebar/horizontal tag filter layout with visual hierarchy and organization
- `browser-sorting`: Sorting controls for blog and project lists

### Modified Capabilities

- `blogs-browser`: Layout changed from inline tags to sidebar, styling aligned with index.astro, blog rows use BlogRow component, search input styling improved
- `projects-browser`: Layout changed from inline tags to sidebar, styling aligned with index.astro, project rows use ProjectRow component, search input styling improved

## Impact

- `src/components/BlogsBrowser.svelte` - major refactor
- `src/components/ProjectsBrowser.svelte` - major refactor
- `src/components/subcomponents/BlogRow.svelte` - potential usage updates
- `src/components/subcomponents/ProjectRow.svelte` - potential usage updates
- `src/pages/blogs.astro` - integration updates
- `src/pages/projects.astro` - integration updates