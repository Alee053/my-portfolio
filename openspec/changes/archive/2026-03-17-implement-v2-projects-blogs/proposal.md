## Why

The v2 portfolio currently has a fully modularized index page with Svelte components, but the secondary pages (projects and blogs browsers) still use inline JavaScript instead of modular Svelte components. This creates inconsistency in the codebase and makes it harder to maintain. The pages need search functionality, tag filtering, and a unified aesthetic matching v2's brutalist/terminal design.

## What Changes

- Create modular Svelte browser components for Projects and Blogs pages (replacing inline scripts)
- Implement search bars with real-time filtering for both projects and blogs
- Add tag/technology filter buttons with multi-select capability
- Ensure blog post renderer works correctly with proper layout
- Maintain v2's brutalist/terminal aesthetic across all pages
- Preserve existing functionality while improving code organization

## Capabilities

### New Capabilities

- `projects-browser`: Modular Projects page with search, tag filtering, and project list rendering
- `blogs-browser`: Modular Blogs page with search, tag filtering, and blog list rendering
- `blog-post-viewer`: Blog post rendering with proper styling and navigation

### Modified Capabilities

None - This is adding new functionality without changing existing spec requirements.

## Impact

- New files: `src/components/ProjectsBrowser.svelte`, `src/components/BlogsBrowser.svelte`, `src/components/BlogPostViewer.svelte` (or similar)
- Modified files: `src/pages/projects.astro`, `src/pages/blogs.astro`, potentially `src/pages/blog/[slug].astro`
- Dependencies: Existing v2 components (SectionLabel, BlogRow, ProjectRow)
- Affected systems: V2 page routing, component structure