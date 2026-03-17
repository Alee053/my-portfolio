## Why

The current portfolio features complex animations (GSAP), vibrant colors, 3D elements, and physics simulations (Matter.js), which conflict with a desired brutalist, minimalistic aesthetic. This redesign introduces a straight-to-the-point v2 portfolio in `src/pages/` using the exact UI from `v2-ideas/landing-main/`, adding functional browsers for projects and blogs, while reusing existing Decap CMS setup without breaking v1.

## What Changes

- Copy and adapt the brutalist landing UI from `v2-ideas/landing-main/code.html` to `src/pages/index.astro`, including grid backgrounds, technical annotations, mono fonts, and dashed borders.
- Add navigable sections for Projects and Blogs with matching "browser" views featuring search input and tag filters.
- Projects browser: List projects fetched from CMS, filterable/searchable by tags, clickable to external redirects (e.g., GitHub).
- Blogs browser: List blogs from CMS, filterable/searchable by tags, clickable to internal blog renderer.
- Implement blog renderer page for individual posts using CMS data.
- Remove all GSAP, colors, 3D, Matter.js; use black/gray/blue brutalist palette, Tailwind, Space Grotesk font.

**BREAKING**: None (v2 isolated from v1).

## Capabilities

### New Capabilities
- `v2-brutalist-landing`: Main page with hero, recent projects teaser, header nav, footer in brutalist style.
- `v2-projects-browser`: Dedicated page listing projects with search/filter by tags, external links on click.
- `v2-blogs-browser`: Dedicated page listing blogs with search/filter by tags, links to individual renderers.
- `v2-blog-renderer`: Page to render single blog post from CMS data.

### Modified Capabilities
<!-- None; new v2 features reuse existing CMS without changing requirements -->

## Impact

- Primary: `src/pages/` directory (landing, projects-browser, blogs-browser, blog/[slug].astro).
- Styles: Global or scoped Tailwind brutalist theme (bg #111, lines #444, text #CCC, accent #135bec).
- Data: Reuse Decap CMS collections for projects/blogs (check v1 logic in `src/pages/blog/` and `src/pages/projects/`).
- No changes to v1 pages or core site functionality.