## Why

The portfolio's UI has several visual inconsistencies that need fixing: ContactModal hover effects use generic white instead of the signature accent color, markdown links in blog posts use orange instead of cyan, and the blog post TOC has critical issues—it's duplicated across breakpoints causing collisions, breaks on mobile devices, and scroll navigation puts headings behind the navbar. These issues hurt usability and visual cohesion.

## What Changes

- **ContactModal**: Hover effects use `brutalist-accent` color instead of white, links made more visible with accent-colored border animations
- **Page Titles & Favicon**: All pages get proper `<title>` tags and favicon declared in BaseLayout
- **Article Typography**: Link color changed from `#FF5500` (orange) to `#13ecaf` (brutalist-accent) for consistency
- **Blog TOC**: Fix duplication/collision issues, improve mobile responsiveness, add scroll-margin so headings don't hide behind navbar when navigating via TOC

## Capabilities

### New Capabilities

- `page-metadata`: Page titles and favicon configuration for all pages

### Modified Capabilities

- `contact-modal`: Add requirement for accent-colored hover effects and visible link styling
- `article-typography`: Change link color from orange to brutalist-accent
- `blog-post-viewer`: Fix TOC display issues (duplication, mobile break, scroll position behind navbar)

## Impact

- `src/components/ContactModal.svelte` - Hover effect changes
- `src/layouts/BaseLayout.astro` - Title prop and favicon
- `src/pages/*.astro` - Page title props
- `src/pages/blog/[slug].astro` - TOC restructure, scroll-margin fix
- `src/styles/article-typography.css` - Link color update