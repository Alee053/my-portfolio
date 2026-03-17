## Context

Current portfolio is Astro-based with Tailwind, using Decap CMS (via astro-decap-cms-oauth) for content management. v1 pages exist (e.g., blog/project logic to discover). New v2/ in src/pages/ must be isolated. Reference UI: v2-ideas/landing-main/code.html (Tailwind brutalist theme, Space Grotesk font, grid bg, mono labels).

## Goals / Non-Goals

**Goals:**
- Brutalist landing with hero, projects teaser, nav matching reference.
- Projects page: CMS-fetched list, search/filter by tags, external links.
- Blogs page: CMS-fetched list, search/filter by tags, internal links to renderer.
- Blog renderer: [slug].astro rendering CMS post.
- Minimal JS (vanilla for filters/search), no GSAP/3D/Matter.js/colors.

**Non-Goals:**
- Update v1 pages/styles.
- New CMS collections or backend changes.
- Complex animations/transitions.
- Responsive beyond Tailwind defaults (focus desktop brutalist).

## Decisions

- **Framework/Structure**: Astro pages (`src/pages/index.astro`, `projects.astro`, `blogs.astro`, `blog/[slug].astro`). Reuse v1 CMS fetch logic (likely getStaticPaths/getCollection).
- **Styling**: Scoped Tailwind config from reference (brutalist colors, Space Grotesk). Grid bg, dashed borders, mono labels via CSS classes.
- **Data Fetch**: getCollection('projects'/'blogs') from Decap CMS. Assume fields: title, description, tags[], slug, github (projects), body (blogs).
- **Filtering/Search**: Client-side JS (Array.filter/includes) on JSON data. Search: title/desc, filter: tags.
- **Navigation**: Header links to #projects/#blogs or separate pages. Modal for about if needed.
- **Alternatives**: Server-side filter? No, minimal/static. Alpine.js? No, pure JS for minimalism.

## Risks / Trade-offs

- [CMS data mismatch] → Verify collections via `astro dev` or admin UI; adjust fields if needed.
- [JS bundle size] → Minimal vanilla JS (<1kb); no libs.
- [Static vs Dynamic] → Static generation for perf; republish on CMS changes.

## Migration Plan

1. Implement v2 pages.
2. Lint/test.
3. Deploy preview v2.

No rollback needed (additive).