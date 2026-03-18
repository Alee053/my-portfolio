## Why

The current markdown rendering pipeline lacks LaTeX math support, proper code block styling, and follows an inconsistent typography hierarchy. The portfolio's "Technical Brutalist" aesthetic requires monospace fonts for UI/headers while body text demands a readable Serif font—a critical split that's currently missing. Additionally, manual slug management in frontmatter is redundant when Astro can auto-generate slugs from filenames.

## What Changes

- **BREAKING**: Remove manual `slug` field from blog frontmatter—rely on Astro's filename-based slug generation
- Add `remark-math` and `rehype-katex` plugins for LaTeX equation rendering
- Configure Shiki with `github-dark` theme for high-contrast code blocks
- Inject KaTeX CSS stylesheet into base layout `<head>`
- Update content collection schema: add `status`, `fig_01`, `repo_url` fields; rename `heroImage` to `fig_01`; change `pubDate` to `date`
- Create custom typography stylesheet for `<article>` markdown renderer with split font hierarchy (Serif body, Mono headers)
- Migrate existing blog posts to new frontmatter schema

## Capabilities

### New Capabilities

- `latex-rendering`: KaTeX-powered LaTeX math equation support in markdown content
- `code-syntax-highlighting`: Shiki-based syntax highlighting with dark theme
- `blog-typography`: Split typography system—JetBrains Mono for headers/UI, Serif for body text in article rendering
- `content-schema`: Updated Zod schema with status, fig_01, repo_url fields and auto-generated slugs

### Modified Capabilities

- `blog-post-viewer`: Update to use new typography styling and auto-generated slugs

## Impact

- **Files Modified**: `astro.config.mjs`, `src/content/config.ts`, base layout `<head>`, existing `.md` blog posts
- **Dependencies Added**: `remark-math`, `rehype-katex`
- **Breaking Change**: Existing frontmatter with `slug` field must be migrated; any code referencing `slug` will need updates