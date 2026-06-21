# Portfolio Polished Pass — Design

**Date**: 2026-06-21
**Status**: Approved (brainstorming complete)
**Author**: brainstorming session with user
**Scope**: One focused session of work. Keep architecture, page structure, and content; improve polish, animation, accessibility, SEO; clean dead code.

---

## Context

The portfolio at `alecastro.dev` is a personal site for Alejandro Castro (AI researcher, systems engineering student at UCB San Pablo). It is built on **Astro 5 + Svelte 5 + Tailwind v4 + GSAP**, deployed to Vercel. The visual language is a **dark brutalist** palette (`#111111` background, `#CCCCCC` text, `#5e5e5e` lines, `#13ecaf` mint accent) with zero border-radius, square brackets on every UI marker, mono fonts for metadata, and a blueprint grid backdrop.

A thorough audit identified:

- **Dead code and unused dependencies** (`matter-js`, `Background.svelte`, `LoadingScreen.svelte`, `cloudinary.js`, `ProjectData.js`, `@vercel/analytics`, `@vercel/speed-insights`, `unplugin-icons`, `@iconify/json`, plus both `pnpm-lock.yaml` and `package-lock.json` committed)
- **Half-built features** the README claims but does not implement (scroll-driven hero, physics-based project gallery)
- **Accessibility gaps** (no focus trap on modals, `prefers-reduced-motion` ignored, `ProjectRow`/`BlogRow` use `<div role="button">` with broken keyboard semantics, focus rings suppressed on search inputs)
- **Missing SEO** (no meta description, no OG, no sitemap, no 404, no JSON-LD)
- **Visual polish opportunities** (hard-coded copyright year, barely-visible blueprint grid at 20% opacity, decorative gray squares that do nothing, hero flash bug from GSAP-after-hydration)

This design is a single focused pass that addresses the above without restructuring the site, adding new pages, or changing the visual identity.

## Decisions summary

| Decision | Choice | Reason |
|---|---|---|
| Scope | Polished pass | User picked the lowest-risk/highest-impact tier in brainstorm |
| Motion philosophy | Scroll-reveal brutalism (B) | Sections reveal with intent as they enter viewport; alive without being heavy |
| Brutalism decoration intensity | Current + polish (B+) | Keep the annotation system, bump label contrast, drop dead decorations |
| Content scope | Improve existing only | No new pages; Skills become a section in the About modal |
| Hero treatment | Cinematic intro (B) | Multi-stage entrance with blinking cursor; respects reduced-motion |
| Motion engine | GSAP only | Already in bundle; add `ScrollTrigger` plugin (+12KB) |
| Signature visual element | Visible blueprint grid | Bump opacity 20% → 40%, add corner crosshairs, add viewport label |

---

## 1. Visual language & signature

### 1.1 Palette (unchanged, with role refinement)

- `--color-brutalist-bg`: `#111111` (page background)
- `--color-brutalist-text`: `#CCCCCC` (default body text)
- `--color-brutalist-line`: `#5e5e5e` (borders, section labels)
- `--color-brutalist-bg-line`: `#323232` → **structural grid color** (no longer "bg line"; promoted role)
- `--color-brutalist-accent`: `#13ecaf` (mint; used more sparingly)
- `--color-brutalist-decoration`: `#4a4a4a` (tertiary, unchanged)

Contrast verification required after changes — body text on background should remain ≥ 7:1 (AAA); structural grid at 40% opacity must remain decorative and never sit under interactive elements.

### 1.2 Typography (intentional weight tuning)

- **Display**: Space Grotesk 600 at 56-72px (hero), 36px (sections). Apply `font-feature-settings: "ss01"` and `line-height: 0.95` to all h1/h2 — gives the headings a "press sheet" feel.
- **Body (articles only)**: IBM Plex Serif 400, unchanged.
- **Mono / labels / metadata**: Liberation Mono 400 for all UI metadata, status lines, section labels, viewport indicator, timestamp.

### 1.3 Signature element — the visible blueprint grid

This is the single aesthetic risk of the pass. The audit found the grid barely visible at 20% opacity. We make it structural and characterful:

- **Opacity bump**: 20% → 40% (`globals.css` `.blueprint-grid`)
- **Corner crosshairs**: a fixed-position layer rendering 1px `+` marks at the four corners of the viewport, opacity oscillating between 0.2 and 0.4 over a 6s `sine.inOut` cycle. Implemented as a single CSS `@keyframes` rule — no JS, no hydration cost.
- **Viewport indicator**: a fixed `[VIEWPORT: WIDTH×HEIGHT]` label in the top-right corner, mono font, 0.4 opacity. Implemented as a small inline `<script>` in `BaseLayout.astro` (not a Svelte island) that listens to `window.resize` (debounced 200ms) and updates the label text. Falls back to a static value if JS is disabled.
- **Section label framing**: section labels get subtle dashed corner brackets, e.g. `⌐ [SEC 01 // HERO] ⌐` rendered as a styled box with 1px dashed corner marks

These are decorative and marked `aria-hidden="true"`.

### 1.4 Decoration cuts

- **Three gray squares in footer**: removed.
- **Live `TS:` clock on hero**: replaced with a **static build timestamp** computed at build time (e.g., `TS: 4A8F·BUILD·2026.06.21`). Hash derived from `import.meta.env.BUILD_ID || Date.now().toString(36).slice(-4).toUpperCase()` at build. Lives in the new `BuildTimestamp` component, which renders to pure Astro markup (no hydration).
- **Footer copyright**: `© {new Date().getFullYear()} ALEJANDRO CASTRO` (no more hard-coded year).
- **Section labels**: opacity 0.5 → 0.8, font-weight 400 → 500, color from `--brutalist-line` to `--brutalist-text`. Still muted, but readable.

### 1.5 What stays (intentional)

- `[SEC NN // LABEL]` numbering — encodes real reading order; appropriate per the frontend-design skill's "structure is information" rule
- `[REF: AC-2026-MINIMAL]` — author brand serial; part of the spec-sheet vocabulary
- Square brackets on every UI marker — signature
- `* { border-radius: 0 !important }` — non-negotiable

---

## 2. Hero & motion system

### 2.1 Hero cinematic intro (B treatment)

`src/sections/Hero.svelte` is rewritten. Total intro duration: 2.2s. Each element animates once; cursor continues to blink at 1s steps after intro completes.

| # | Element | From | To | Duration | Delay | Easing |
|---|---|---|---|---|---|---|
| 1 | Top status bar (`[SEC 01 // HERO]` + `TS:`) | opacity 0 | opacity 1 | 250ms | 0ms | ease-out |
| 2 | "ALEJANDRO" line | `y: 100%`, inside a wrapper with `overflow: hidden` (sliding clipped mask pattern) | `y: 0%` | 600ms | 150ms | power3.out |
| 3 | "CASTRO_" line + blinking cursor | `y: 100%`, inside a wrapper with `overflow: hidden` | `y: 0%` | 600ms | 300ms | power3.out |
| 4 | Cursor blink | (loop) | — | 1s steps(2) | after 3 | — |
| 5 | Subtitle `[REF:...] AI RESEARCHER...` | opacity 0, `y: 8px` | visible | 400ms | 700ms | ease-out |
| 6 | Action chips `[GITHUB ↗] [LINKEDIN ↗] [EMAIL ↗]` | opacity 0, `y: 4px`, stagger 60ms | visible | 300ms each | 1000ms | ease-out |
| 7 | Scroll cue `SCROLL ↓` | opacity 0 | visible, then 1.6s pulse loop | 400ms, then loop | 1500ms | ease-out / sine.inOut |

**Implementation note**: the existing flash bug is fixed by rendering the final state in SSR markup; the GSAP "from" state is applied only in `onMount` (no visual jump on hydration). The hero's `<h1>` text is the LCP candidate.

**Char-by-char reveal removed**: the current `SplitText` char-stagger is replaced with **line-by-line slide** (better with display type, less gimmicky, smaller GSAP plugin surface).

### 2.2 Scroll reveal system

New utility: `src/lib/reveal.ts` — a Svelte action + a plain `data-reveal` attribute system.

- Watches elements with `[data-reveal]` via `IntersectionObserver` with `threshold: 0.2`
- On first reveal, adds `is-revealed` class
- CSS in `globals.css`:
  - `[data-reveal="fade"]` — opacity 0 → 1, 600ms ease-out
  - `[data-reveal="rise"]` — opacity 0 → 1, translateY(16px) → 0, 600ms ease-out
  - `[data-reveal="stagger"]` — applies `rise` to the element, and to its direct children with 80ms stagger
- **Once-only**: revealed elements stay revealed (no replay on scroll back)
- **Re-trigger on filter change**: `ProjectsBrowser` and `BlogsBrowser` re-key the row list (Astro's `transition:name` or Svelte `{#key}`) so filtered rows re-enter with reveal animation

### 2.3 Where reveals apply

- Each homepage section (Projects, Blogs): row list `data-reveal="stagger"`, section header `data-reveal="rise"`
- Blog detail page (`/blog/[slug]`): article header `data-reveal="rise"`, first content block `data-reveal="fade"`
- Project rows in browser (initial render and filter change): re-trigger via `{#key filter}`

### 2.4 Count-up animations

In the About modal: 3 award numbers count from 0 to their value over 800ms when the modal opens. Implemented as a small `countUp(value, duration)` GSAP tween utility in `motion-utils.ts`. Respects reduced-motion (skips to final value).

### 2.5 Micro-interactions

- All link hovers: color `#cccccc` → `#13ecaf` over 150ms (existing pattern, kept)
- All buttons + nav links: 1px mint border on `:focus-visible`, 100ms transition
- Project/blog row hover: background `transparent` → `rgba(19, 236, 175, 0.04)`, border-color `#5e5e5e` → `#13ecaf`, 200ms
- Tag chips in About modal: hover lifts 1px `translateY(-1px)`, 150ms ease-out
- Modal open: existing 200ms slide + 150ms backdrop fade, unchanged
- Mobile sidebar: existing 300ms slide, unchanged

### 2.6 `prefers-reduced-motion` handling

Single helper module `src/lib/motion-utils.ts`:

```ts
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

- All GSAP timelines check `prefersReducedMotion()` and short-circuit: `tl.set(target, { ...finalState })` instead of tweening
- The hero renders the final state immediately when reduced-motion is requested
- Cursor blink is suppressed
- The CSS `[data-reveal]` transitions become instant (`@media (prefers-reduced-motion: reduce) { [data-reveal] { transition: none !important; } }`)
- The check is honored at the animation site, not via CSS, because GSAP runs imperatively

### 2.7 Bundle impact

- `ScrollTrigger` plugin: +12KB gzipped
- New `motion-utils.ts` and `reveal.ts`: <1KB each
- Net motion cost: ~13KB added to the existing 72KB GSAP chunk

---

## 3. Components & sections

### 3.1 `src/layouts/BaseLayout.astro`

- Add `<SEO>` slot for per-page title/description/og:image
- New `description` prop (required)
- `<html data-theme="dark">` (explicit theming)
- Footer year: `{new Date().getFullYear()}`
- Decorative three gray squares: **removed**
- New skip link: `<a href="#main" class="sr-only focus:not-sr-only">Skip to content</a>` as first focusable element
- Blueprint grid: opacity `0.2` → `0.4`, plus the corner crosshairs layer, plus the `[VIEWPORT: ...]` label
- Default `og:image` falls back to `/logo.png` until a real OG card is built

### 3.2 `src/components/SEO.astro` (new)

Props: `title`, `description` (required), `image?`, `type?` (`website` | `article`), `publishedTime?`, `tags?[]`.

Renders:
- `<title>{title} | ALEJANDRO CASTRO</title>` (suffix is layout default; pages can override by passing full title)
- `<meta name="description">` (required, errors in dev if missing)
- Full Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Full Twitter card: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`
- `<link rel="canonical">`
- JSON-LD `<script type="application/ld+json">`:
  - Root pages: `Person` schema with name, url, sameAs (github, linkedin), jobTitle, knowsAbout
  - Blog posts: `BlogPosting` with `headline`, `datePublished`, `author` (Person), `keywords` (from tags)

### 3.3 `src/pages/404.astro` (new)

Minimal page in the same brutalist vocabulary:
- `[ERR 404 // NOT_FOUND]` section label
- Mono message: `THE REQUESTED RESOURCE DOES NOT EXIST ON THIS DOMAIN.`
- Link back to `/` styled as a brutalist chip: `[← RETURN TO INDEX]`
- No animation, no scroll reveal
- Returns proper HTTP 404 status (Astro default)

### 3.4 `astro.config.mjs`

- Add `@astrojs/sitemap` integration
- Set `site: 'https://alecastro.dev'` (confirmed)

### 3.5 `public/robots.txt` (new)

```
User-agent: *
Allow: /

Sitemap: https://alecastro.dev/sitemap-index.xml
```

### 3.6 `public/og-default.png` (new)

1200×630 brutalist OG card. A simple template version is created in this pass (name, role, mint accent rule, blueprint grid background) — enough to make link previews stop showing a broken/missing image. A fully-designed OG card with proper typography, kerning, and brand polish is a future spec. The template is hand-built as a single PNG (no `sharp` script in this pass).

### 3.7 Page-level SEO descriptions

| Page | Description |
|---|---|
| `index.astro` | `"AI researcher and systems engineering student at UCB San Pablo. Reinforcement learning, algorithms, search-based planning."` |
| `projects.astro` | `"Selected projects in AI/ML, algorithms, and interactive systems."` |
| `blogs.astro` | `"Writing on reinforcement learning, algorithms, and engineering craft."` |
| `blog/[slug].astro` | From frontmatter `excerpt`; falls back to first 155 chars of body |

### 3.8 `src/sections/Hero.svelte`

Rewritten per §2.1. Replaces `SplitText` char-stagger with line-by-line slide. Renders final state in SSR; applies "from" state only in `onMount`. The cursor is a `<span class="cursor">_</span>` element with a GSAP-driven opacity loop at 1s `steps(2)`.

### 3.9 `src/components/AboutModal.svelte`

- Current static content stays
- **New Skills section** below the Focus paragraph: grid of monospace tag chips sourced from `src/lib/skills.ts`
- 3 awards list: each numeric value gets a countup animation on modal open (800ms each, staggered 100ms)
- Inherits all `BaseModal` a11y upgrades (see §3.11)

### 3.10 `src/lib/skills.ts` (new)

```ts
export type SkillCategory = 'Languages' | 'AI/ML' | 'Tools' | 'Research';
export type SkillLevel = 'core' | 'familiar';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
}

export const skills: Skill[] = [
  // ~15-20 entries, grouped by category
  // Example:
  { name: 'Python',     category: 'Languages', level: 'core' },
  { name: 'C++',        category: 'Languages', level: 'core' },
  { name: 'TypeScript', category: 'Languages', level: 'familiar' },
  // …
];

export const skillsByCategory: Record<SkillCategory, Skill[]> = {
  Languages: skills.filter(s => s.category === 'Languages'),
  'AI/ML':   skills.filter(s => s.category === 'AI/ML'),
  Tools:     skills.filter(s => s.category === 'Tools'),
  Research:  skills.filter(s => s.category === 'Research'),
};
```

The same taxonomy is also used to normalize the blog/project tag vocabulary (existing YAML tag arrays are mapped through this list; nothing is removed, just classified).

> **Note on the actual list**: the implementation plan will propose a concrete `~15-20` skill list (drawn from the existing project tags, the About-modal copy, and the user's own bio) for the user to review and edit before the file is finalized. The shape and category structure shown above is final; the entries are TBD.

### 3.11 `src/components/BaseModal.svelte` — major a11y rewrite

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`
- Title element gets `id="modal-title"`
- **Focus trap**: on open, save `document.activeElement`; focus the close button; `Tab`/`Shift+Tab` cycle within modal; on close, restore focus to saved element. Implemented as a small `createFocusTrap(rootEl)` helper in `src/lib/motion-utils.ts` (no external `focus-trap` library — keep dependencies tight).
- `Escape` closes (existing)
- Backdrop click closes (existing), but the backdrop is now `tabindex="-1"` and handles `Enter`/`Space` for keyboard reach
- `inert` attribute applied to `<main>` while modal is open; `aria-hidden="true"` fallback for older browsers
- GSAP slide animation unchanged

### 3.12 `src/components/ContactModal.svelte`

- Existing 3-link layout stays
- Hover upgraded: link background `transparent` → mint, text inverts
- Card pattern unchanged

### 3.13 `src/components/Navbar.svelte`

- `[REF: AC-2026-MINIMAL]` label opacity 0.5 → 0.6
- Mobile sidebar pattern unchanged
- Focus-visible styles on all nav links
- No structural changes

### 3.14 `src/components/ProjectRow.svelte` and `src/components/BlogRow.svelte` — a11y fix

- **Replace `<div role="button">` with the stretched-link pattern** (not nested anchors — `<a>` cannot legally contain another `<a>`):
  - For `ProjectRow`: the card root is a `<div class="row" style="position: relative;">`. Inside it: a primary `<a class="stretched" href={project.url or `/projects/{slug}`}>` whose `::before` pseudo-element covers the whole row (`position: absolute; inset: 0;`), making the entire card clickable. The trailing GitHub/demo anchors are siblings of the primary link with `position: relative; z-index: 1;` so they sit above the stretched hit area.
  - For `BlogRow`: a single `<a href="/blog/{slug}">` wraps the whole row (no secondary links to worry about).
- The trailing `↗` arrow becomes a decorative `<span aria-hidden="true">`.
- `onkeydown` handlers deleted — native `<a>` handles Enter activation.
- Hover state scoped to the `<a class="stretched">` element via `.row:has(a.stretched:hover)` or a CSS variable trick if `:has()` is not supported (fallback to `.row.is-hovered` toggled by mouseenter/mouseleave on the link).

### 3.15 `src/components/ProjectsBrowser.svelte` and `src/components/BlogsBrowser.svelte`

- Remove `focus:ring-0 focus:outline-none` from search inputs — restore native focus styles (with a custom mint outline that respects the brutalist palette)
- Sort/filter buttons get focus-visible outlines
- Results list gets `data-reveal="stagger"`; `{#key filter}` re-triggers the reveal on filter change
- The two components stay separate — extracting a shared `FilterableList` is out of scope

### 3.16 `src/sections/Projects.svelte` and `src/sections/Blogs.svelte` (homepage)

- Row list: `data-reveal="stagger"`
- Section header: `data-reveal="rise"`
- "VIEW ALL" link: new hover state (mint underline)

### 3.17 `src/components/LiveTimestamp.svelte` → `src/components/BuildTimestamp.svelte`

- Renamed; semantics changed from "live" to "static build"
- Renders `TS: 4A8F·BUILD·2026.06.21` where the hash is derived at build time
- Converted to pure Astro markup (no hydration) — moves out of `src/components/` to a `.astro` file (e.g., `src/components/BuildTimestamp.astro`) or inlined into `BaseLayout.astro`

### 3.18 Removed (dead code)

- `src/components/Background.svelte` — delete
- `src/components/LoadingScreen.svelte` — delete
- `src/lib/ProjectData.js` — delete
- `src/lib/cloudinary.js` — delete (no callers)
- `matter-js` dep — remove from `package.json`
- `unplugin-icons` + `@iconify/json` — remove from `package.json` and `astro.config.mjs`
- `@vercel/analytics` + `@vercel/speed-insights` — remove from `package.json`

### 3.19 Kept (with confirmation needed)

- `astro-decap-cms-oauth` + `public/admin/` — keep. Flag for user confirmation.
- `Cloudinary` config in `astro.config.mjs` and `public/admin/config.yml` — keep, in case CMS is actively used.

### 3.20 Lockfile & DX hygiene

- Pick `pnpm` (already has `pnpm-lock.yaml`)
- Delete `package-lock.json`
- Add `"packageManager": "pnpm@9.x.x"` to `package.json`
- Add `.superpowers/` to `.gitignore`
- `git rm -r --cached .idea` (the directory is already in .gitignore but currently tracked)

### 3.21 Hydration strategy

| Component | Hydration | Reason |
|---|---|---|
| `Navbar.svelte` | `client:load` | Above-fold |
| `Hero.svelte` | `client:load` | Above-fold; LCP candidate |
| `BaseModal.svelte` / `AboutModal.svelte` / `ContactModal.svelte` | `client:only` | Don't need SSR; ship less JS |
| `ProjectsBrowser.svelte` / `BlogsBrowser.svelte` | `client:visible` | Below fold; defer hydration |
| `Projects.svelte` / `Blogs.svelte` (homepage sections) | `client:visible` | Below fold |
| `BuildTimestamp` | inline Astro markup | No hydration |

### 3.22 README updates

Remove claims that the implementation does not (yet) support:
- "Scroll-driven animation powered by GSAP that deconstructs the header text" — **not implemented**; remove claim
- "Physics-based project gallery" using Matter.js — **not implemented**; remove claim
- "ProjectsDesktop vs ProjectsMobile switcher" — **not implemented**; remove claim

Add to the README a one-line note that this design is governed by `docs/superpowers/specs/2026-06-21-portfolio-polished-pass-design.md`.

---

## 4. Accessibility, SEO, and performance commitments

### 4.1 Accessibility (WCAG 2.1)

- **AA** color contrast on body text (already passing; re-verify after the blueprint grid opacity bump)
- **AA** keyboard access to all interactive elements
- **AA** focus visible (mint 1px outline, 2px offset)
- **AAA** `prefers-reduced-motion` (no animation runs)
- `role="dialog"` + `aria-modal="true"` + focus trap on all modals
- `lang="en"` on `<html>` (already correct)
- Skip link to main content
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`

### 4.2 SEO

- Unique `<title>` and `<meta name="description">` on every page
- Full Open Graph + Twitter card on every page
- JSON-LD `Person` on root pages, `BlogPosting` on blog posts
- `sitemap.xml` via `@astrojs/sitemap`
- `robots.txt` allowing all + pointing at sitemap
- Canonical URL on every page
- 404 page returning proper HTTP 404 status

### 4.3 Performance budget

- **LCP** < 2.5s on simulated 4G (hero text is the LCP candidate)
- **CLS** < 0.05 (animations use `transform` and `opacity` only — no layout shift)
- **TBT** < 200ms
- **Total JS** shipped on homepage: ~95KB gzipped (current 72KB GSAP + ~13KB ScrollTrigger + ~10KB Svelte islands)
- **Total CSS** < 50KB gzipped (Tailwind v4 purges aggressively)

### 4.4 Testing approach

**Manual verification checklist** (run through after implementation):

- A11y: `Tab` through the entire homepage; every interactive element has a visible focus ring; skip link works; `Esc` closes modal; focus returns to trigger after modal close
- axe DevTools on `/`, `/projects`, `/blogs`, `/blog/ai2048`, and the 404 — 0 critical/serious issues
- Toggle `prefers-reduced-motion` in DevTools — hero appears instantly with no animation, no blink, no scroll reveals
- Keyboard-only nav: navigate the whole site without a mouse
- Screen reader smoke test: VoiceOver/NVDA on About modal — should announce as dialog, title read first, focus trapped
- Visual regression: screenshot homepage at 1440×900, 768×1024, 375×812 (iPhone) — blueprint grid visible at all three sizes, hero doesn't overflow on mobile, action chips wrap cleanly
- Animation timing: hero intro completes within 2.5s; scroll reveals feel intentional, not jumpy; cursor blinks at exactly 1s steps
- Build: `pnpm build` succeeds; bundle delta is +~13KB

**Automated checks** (lightweight):

- `scripts/check-a11y.mjs` — uses `@axe-core/cli` against the built `dist/`, fails the build on serious/critical violations
- `pnpm check` script — runs `astro check` (TypeScript) + the axe script

---

## 5. Out of scope (explicit non-goals)

- New pages (no `/now`, no `/resume`, no standalone `/skills`); Skills live in the About modal
- Image-heavy design — current text-only project rows are intentional
- SSR migration — static + Vercel is the deployment
- Blog search beyond the existing `BlogsBrowser` filter
- A new detailed OG card design beyond the brutalist template
- Cloudinary integration — removed (no images to optimize)
- Replacing Decap CMS — keep as-is
- A changelog or test page
- A contact form — your email link works
- i18n / multi-language
- Building the README's "physics-based project gallery" using Matter.js
- Test framework setup beyond the axe-core script
- Husky / pre-commit hook setup
- Service worker / PWA features

---

## 6. Open questions and risks

1. **Canonical URL**: `https://alecastro.dev` (confirmed).
2. **GSAP SplitText is a Club GreenSock plugin**: free for non-commercial use; commercial requires a license. The current usage already triggers this. New motion work uses CSS/IO + GSAP core to avoid expanding the paid surface.
3. **Decap CMS / Cloudinary**: preserved as-is. If the CMS is no longer in use, the Decap + Cloudinary dependencies could be removed in a future spec.
4. **`.idea/` cleanup**: directory is in `.gitignore` but already tracked. `git rm -r --cached .idea` is required.
5. **Lockfile migration**: deleting `package-lock.json` and standardizing on pnpm will cause churn in any CI configured for npm. If CI uses npm, it needs to be updated.
6. **Hero flash bug fix** changes the SSR behavior of the hero: the visible text is in the initial HTML; GSAP "from" state is applied only client-side. Worth knowing when reading the implementation.
7. **Cloudflare/Vercel edge cache invalidation**: SEO/OG additions mean the homepage will get cached aggressively. First deploy may need a cache purge.

---

## 7. Acceptance criteria

This design is "done" when all of the following are true:

- [ ] Hero runs the cinematic intro per §2.1 within 2.5s on first load
- [ ] Cursor continues to blink at 1s steps after intro completes
- [ ] All scroll reveals respect `prefers-reduced-motion`
- [ ] Every page has a unique title, meta description, OG card, and JSON-LD
- [ ] `/sitemap-index.xml` exists and lists all routes
- [ ] `/robots.txt` exists and references the sitemap
- [ ] A custom 404 page exists and returns HTTP 404
- [ ] Modals have `role="dialog"`, `aria-modal="true"`, focus trap, focus restore
- [ ] `ProjectRow` and `BlogRow` are real `<a>` elements with no `role="button"` workaround
- [ ] `Skip to content` link works
- [ ] Search inputs have visible focus styles
- [ ] Skills section visible in About modal, sourced from `src/lib/skills.ts`
- [ ] Three award numbers count up on About modal open
- [ ] Blueprint grid visible at 40% opacity; corner crosshairs pulse; viewport label updates on resize
- [ ] Footer year uses `new Date().getFullYear()`
- [ ] Dead code removed per §3.18
- [ ] `pnpm-lock.yaml` is the only lockfile; `package.json` has `packageManager` field
- [ ] `.superpowers/` and `.idea/` properly gitignored
- [ ] `astro build` succeeds
- [ ] axe DevTools reports 0 critical/serious issues on all pages
- [ ] No new bundle exceeds the budget in §4.3
- [ ] README updated per §3.22

---

## 8. Implementation order (rough)

1. **Setup**: clean up `package.json` (remove unused deps), add `@astrojs/sitemap` and `gsap/ScrollTrigger`, delete `package-lock.json`, set `packageManager`, gitignore fixes
2. **Foundation utilities**: `motion-utils.ts`, `reveal.ts`, `skills.ts`, `BuildTimestamp.astro`
3. **Layout**: `SEO.astro`, `BaseLayout.astro` updates (skip link, blueprint grid bump, corner crosshairs, viewport label, footer year)
4. **SEO plumbing**: 404 page, `robots.txt`, OG image, page-level meta descriptions
5. **Hero**: rewrite `Hero.svelte` per §2.1
6. **Modal a11y**: rewrite `BaseModal.svelte`, update `AboutModal` and `ContactModal` to inherit
7. **Row a11y**: rewrite `ProjectRow.svelte` and `BlogRow.svelte`
8. **Browsers**: focus rings restored; scroll reveal; `{#key filter}` for re-trigger
9. **About skills section**: add Skills grid + countup
10. **Polish pass**: navbar opacity bump, decoration cuts (gray squares, etc.), micro-interactions
11. **README updates**
12. **Verification**: run the full manual checklist; `pnpm build`; `pnpm check`
