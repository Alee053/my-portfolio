## Context

The portfolio uses Astro with a "Technical Brutalist" / "Terminal Schematic" aesthetic. The markdown rendering pipeline currently lacks LaTeX support, proper code highlighting configuration, and follows an inconsistent typography approach. The base layout uses JetBrains Mono throughout, but blog article body text requires a Serif font for optimal readability while maintaining monospace for headers and UI elements.

**Current State:**
- Astro config has no remark/rehype plugins for math rendering
- Shiki is available but not explicitly configured with a dark theme
- Content collection schema uses `pubDate`, `heroImage`, and manual `slug` fields
- No split typography system exists for the `<article>` markdown renderer

## Goals / Non-Goals

**Goals:**
- Enable LaTeX math rendering with KaTeX
- Configure Shiki with a high-contrast dark theme
- Establish split typography: Serif for body, Mono for headers
- Automate slug generation from filenames
- Standardize frontmatter schema with new fields

**Non-Goals:**
- Refactoring the overall site layout or v2 aesthetic
- Changing how blog posts are queried or rendered outside typography
- Adding new blog content or features beyond rendering

## Decisions

### 1. Math Rendering: KaTeX over MathJax

**Decision:** Use `remark-math` + `rehype-katex` for server-side LaTeX rendering.

**Rationale:** KaTeX is significantly faster (server-side rendering vs client-side) and integrates well with Astro's build process. MathJax requires client-side JS execution, contradicting the brutalist/minimal aesthetic.

**Alternatives Considered:**
- MathJax: Slower, client-side, adds JS payload
- Manual HTML: Unmaintainable for complex equations

### 2. Code Highlighting: Shiki with `github-dark`

**Decision:** Configure Shiki with `github-dark` theme.

**Rationale:** Native to Astro, no runtime overhead, high contrast against `#111111` background. The `github-dark` theme provides excellent readability for code examples while matching the terminal aesthetic.

### 3. Typography Split: CSS Custom Properties + Tailwind

**Decision:** Create a dedicated stylesheet for `<article>` elements that overrides base styles, using CSS custom properties for the Serif font family.

**Rationale:** Tailwind's typography plugin (`@tailwindcss/typography`) adds significant opinionated styles. A custom stylesheet allows precise control over the split typography without fighting defaults.

**Alternatives Considered:**
- `@tailwindcss/typography`: Too many defaults to override
- CSS-in-JS: Unnecessary complexity for static content

### 4. Font Choice: IBM Plex Serif

**Decision:** Use IBM Plex Serif for body text in articles.

**Rationale:** IBM Plex family is open-source, professionally designed, pairs well with JetBrains Mono (both are monospace-friendly designs), and has excellent readability at article text sizes.

### 5. Slug Strategy: Auto-generated from Filename

**Decision:** Remove `slug` field entirely, rely on Astro's default `id`-based slug generation.

**Rationale:** Manual slugs are redundant—Astro generates slugs from file paths automatically (`ai2048.md` → `ai2048`). This reduces maintenance burden and potential for mismatch errors.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| KaTeX CSS adds ~2KB to page | Acceptable trade-off for math support; loaded only on blog pages |
| Breaking change for existing `slug` references | Audit codebase for `slug` usage; update to use Astro's `id` or `slug` from collection entry |
| Font loading performance for IBM Plex Serif | Use `font-display: swap` for progressive enhancement |
| Shiki bundle size minimal | Already included in Astro; negligible impact |

## Migration Plan

1. **Phase 1: Dependencies** — Install `remark-math`, `rehype-katex`; configure in `astro.config.mjs`
2. **Phase 2: Schema Update** — Modify `src/content/config.ts` with new fields
3. **Phase 3: Typography** — Create article stylesheet with Serif override
4. **Phase 4: Frontmatter Migration** — Update existing `.md` files to new schema
5. **Phase 5: Layout Integration** — Inject KaTeX CSS into base layout `<head>`

**Rollback:** Remove plugins from Astro config, revert schema changes, remove KaTeX CSS link.