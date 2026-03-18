## 1. Dependencies & Astro Config

- [x] 1.1 Install remark-math and rehype-katex packages
- [x] 1.2 Update astro.config.mjs to add remark-math and rehype-katex plugins to markdown config
- [x] 1.3 Configure Shiki with github-dark theme for code syntax highlighting
- [x] 1.4 Add KaTeX CSS stylesheet link to base layout <head>

## 2. Content Collections Schema

- [x] 2.1 Update src/content/config.ts with new Zod schema fields
- [x] 2.2 Add status field with default value [STATUS: ARCHIVED]
- [x] 2.3 Add optional fig_01 field for featured images
- [x] 2.4 Add optional repo_url field for source code links
- [x] 2.5 Rename pubDate to date with proper coercion
- [x] 2.6 Remove slug field from schema (rely on auto-generation)

## 3. Blog Typography Stylesheet

- [x] 3.1 Create article typography stylesheet (src/styles/article-typography.css or similar)
- [x] 3.2 Configure Serif font (IBM Plex Serif) for article body text
- [x] 3.3 Set body text color to #E2E8F0 with line-height 1.8
- [x] 3.4 Style article headers (h1, h2, h3) with JetBrains Mono, UPPERCASE, normal weight, #FFFFFF
- [x] 3.5 Add 1px dashed #333333 border below h2 and h3 headers
- [x] 3.6 Style images with rounded-none, width 100%, 1px solid #333333 border
- [x] 3.7 Style blockquotes with #888888 italic text, 2px solid #FF5500 left border, rounded-none
- [x] 3.8 Style code blocks with sharp edges and github-dark compatible colors
- [x] 3.9 Constrain article content to max-w-3xl centered container
- [x] 3.10 Import/apply stylesheet in blog post viewer component

## 4. Frontmatter Migration

- [x] 4.1 Migrate ai2048.md frontmatter to new schema (remove slug, rename heroImage to fig_01, add status if missing)
- [x] 4.2 Migrate portfolio.md frontmatter to new schema
- [x] 4.3 Verify LaTeX formulas use proper KaTeX delimiters ($ for inline, $$ for block)
- [x] 4.4 Audit codebase for any references to slug field and update to use astro-generated slug

## 5. Integration & Verification

- [x] 5.1 Verify KaTeX renders inline equations correctly
- [x] 5.2 Verify KaTeX renders block equations correctly
- [x] 5.3 Verify code blocks have syntax highlighting with sharp edges
- [x] 5.4 Verify typography split (Serif body, Mono headers) is applied
- [x] 5.5 Verify auto-generated slugs work for blog navigation