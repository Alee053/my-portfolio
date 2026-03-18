## 1. Page Metadata & Favicon

- [x] 1.1 Add favicon link to BaseLayout head referencing `/logo.png`
- [x] 1.2 Add `<title>` element to BaseLayout head with template `{title} | ALE CASTRO`
- [x] 1.3 Add `title` prop to BaseLayout Props interface
- [x] 1.4 Update `src/pages/index.astro` to pass `title="HOME"`
- [x] 1.5 Update `src/pages/projects.astro` to pass `title="PROJECTS"`
- [x] 1.6 Update `src/pages/blogs.astro` to pass `title="BLOGS"`
- [x] 1.7 Blog [slug].astro already passes dynamic title (DONE)

## 2. ContactModal Hover Effects

- [x] 2.1 Update ContactModal link hover from `hover:text-white` to `hover:text-brutalist-accent`
- [x] 2.2 Update dashed border hover from `group-hover:border-white` to `group-hover:border-brutalist-accent`
- [x] 2.3 Add `transition-colors` to ensure smooth border color transition (already present)

## 3. Article Typography Link Colors

- [x] 3.1 Update `.article-content a` color from `#FF5500` to `#13ecaf`
- [x] 3.2 Update `.article-content a:hover` color from `#FF7A33` to `#34f7c3`
- [x] 3.3 Update `.article-content blockquote` border-left from `#FF5500` to `#13ecaf`

## 4. Blog TOC Fixes

- [x] 4.1 Add `scroll-margin-top: 160px` to `.article-content h2` and `.article-content h3` in article-typography.css
- [x] 4.2 Restructure mobile TOC to prevent horizontal overflow (changed to `flex-col` layout with `break-words`)
- [x] 4.3 Verify breakpoint separation between mobile and desktop TOC (fixed `w-75` → `w-64` and standardized fonts)
- [x] 4.4 Move "View Source Code" button from `justify-center` to `justify-start` for left alignment