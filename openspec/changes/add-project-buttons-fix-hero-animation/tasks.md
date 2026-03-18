## 1. Schema Updates

- [x] 1.1 Add `blog_slug` optional string field to projects collection in src/content/config.ts
- [x] 1.2 Add `demo_url` optional URL field to projects collection in src/content/config.ts

## 2. Hero Animation Fix

- [x] 2.1 Import SplitText from 'gsap/SplitText' in Hero.svelte
- [x] 2.2 Replace splitToChars function with SplitText.create() using type: "words, chars"
- [x] 2.3 Update animation to target split.chars while preserving word wrapper structure
- [x] 2.4 Verify text wrapping respects word boundaries at various viewport widths

## 3. ProjectRow Action Buttons

- [x] 3.1 Add blog_slug and demo_url props to ProjectRow.svelte
- [x] 3.2 Create conditional GitHub button that shows when link exists
- [x] 3.3 Create conditional blog button that shows when blog_slug exists
- [x] 3.4 Create conditional demo button that shows when demo_url exists
- [x] 3.5 Style buttons to match existing brutalist tag aesthetic
- [x] 3.6 Update Projects.svelte to pass new props to ProjectRow

## 4. Project Data Updates

- [x] 4.1 Add blog_slug field to ai-2048.yaml project file
- [x] 4.2 Review other projects for applicable blog_slug or demo_url values (added blog_slug to personal-portfolio.yaml)