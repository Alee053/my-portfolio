# Portfolio Glass Lab Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the portfolio from terminal brutalism to a restrained teal/blue Glass Lab system while preserving all existing content, routes, data flow, and direct navigation behavior.

**Architecture:** Keep Astro's static-first pages, Svelte interactive islands, Tailwind v4 tokens, GSAP motion, Astro ClientRouter, and existing content collections. Replace the visual shell and component markup in focused layers: foundation, shared chrome, hero, homepage cards, browsers, and article surfaces. No new runtime dependencies or schema changes.

**Tech Stack:** Astro 5, Svelte 5, Tailwind CSS v4, GSAP 3, TypeScript, pnpm.

---

## File Map

- `src/styles/globals.css`: Glass Lab color tokens, ambient background, surfaces, cards, controls, focus states, responsive utilities, and reduced-motion rules.
- `src/layouts/BaseLayout.astro`: Shared shell, ambient decoration, content width, skip link, footer, and existing modal mounting.
- `src/components/Navbar.svelte`: Sticky glass navigation and mobile glass drawer; preserve existing events and links.
- `src/components/Splash.astro`: Brief teal “lab initialization” treatment; preserve first-visit and skip behavior.
- `src/components/BaseModal.svelte`: Glass dialog panel/backdrop classes without changing focus or lifecycle logic.
- `src/components/AboutModal.svelte`, `src/components/ContactModal.svelte`: Replace terminal-heavy presentation with readable labels and glass-compatible content classes.
- `src/sections/Hero.svelte`: Split hero composition, profile signal panel, and restrained GSAP entry.
- `src/sections/Projects.svelte`, `src/sections/Blogs.svelte`: Glass section headers and card-list containers.
- `src/components/subcomponents/SectionLabel.svelte`: Keep the numbered micro-signature with updated styling.
- `src/components/subcomponents/ProjectRow.svelte`, `src/components/subcomponents/BlogRow.svelte`: Glass cards while preserving stretched-link and secondary-link behavior.
- `src/components/ProjectsBrowser.svelte`, `src/components/BlogsBrowser.svelte`: Glass search/filter controls and browser headings; preserve reactive filtering.
- `src/pages/blog/[slug].astro`: Glass article header/TOC shell while retaining rendered content and copy buttons.
- `src/styles/article-typography.css`: Readable article colors, type hierarchy, links, code, tables, and math surfaces.
- `src/pages/404.astro`: Modernized not-found presentation with the same route and return action.

No new files or dependencies are required by the redesign.

## Task 1: Establish The Visual Foundation

**Files:**
- Modify: `src/styles/globals.css`
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Capture the baseline build and typecheck**

Run:

```bash
pnpm build
pnpm astro check
```

Expected: both commands complete successfully. Record any pre-existing warning; do not fix unrelated behavior in this task.

- [ ] **Step 2: Replace brutalist color values with semantic Glass Lab roles**

Keep the existing `brutalist-*` token names temporarily so untouched components remain buildable, but assign them the new roles and add semantic CSS variables for custom surfaces:

```css
@theme {
  --color-brutalist-bg: #061114;
  --color-brutalist-line: #47727a;
  --color-brutalist-bg-line: #163338;
  --color-brutalist-text: #e8fffa;
  --color-brutalist-accent: #65e7bd;
  --color-brutalist-decoration: #31606a;
  --font-sans: "Space Grotesk", sans-serif;
  --font-mono: "Liberation Mono", "Courier New", monospace;
}

:root {
  color-scheme: dark;
  --ink-950: #061114;
  --ink-900: #0a1c20;
  --ink-surface: rgba(14, 47, 52, 0.64);
  --ink-surface-strong: rgba(8, 27, 31, 0.92);
  --ink-text: #e8fffa;
  --ink-muted: #9bb9ba;
  --ink-line: rgba(148, 231, 220, 0.24);
  --ink-accent: #65e7bd;
  --ink-cyan: #71c9f5;
  --ink-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
}
```

Do not use bright gradients directly behind article paragraphs. Add an opaque fallback color wherever a translucent surface is used.

- [ ] **Step 3: Add reusable surface, layout, and interaction classes**

Add `.site-shell`, `.page-container`, `.ambient-background`, `.ambient-orb`, `.glass-panel`, `.glass-panel-strong`, `.glass-card`, `.section-heading`, `.section-link`, `.tag-chip`, `.row-action`, `.focus-ring`, and `.stretched-link` styles. The ambient layer must be `pointer-events: none`, sit behind `main`, and use only pseudo-elements or absolutely positioned orbs. The `stretched-link` pseudo-element must continue to cover only its nearest card, while `.row-action` stays above it with a higher stacking context.

Remove the global `* { border-radius: 0 !important; }` rule. Add `box-sizing: border-box`, `overflow-x: clip` on the page shell, a visible mint `:focus-visible` outline, and a readable selection color. Keep the existing `html.js [data-reveal]` fallback behavior, but use a 12-16px rise and make the reduced-motion media query reveal everything immediately.

- [ ] **Step 4: Replace the blueprint/crosshair shell in `BaseLayout.astro`**

Make the body use `site-shell`. Replace the full-page blueprint grid and viewport crosshair markup with:

```astro
<div class="ambient-background" aria-hidden="true">
  <span class="ambient-orb ambient-orb-a"></span>
  <span class="ambient-orb ambient-orb-b"></span>
</div>

<main id="main" class="site-main">
  <div class="page-container">
    <slot />
  </div>
</main>
```

Keep the skip link, `Navbar`, `AboutModal`, `ContactModal`, `SEO`, `ClientRouter`, and existing `initReveal` lifecycle. Make the footer a low-contrast glass-compatible footer with the dynamic year and no decorative gray squares. Remove the viewport resize script because its readout is no longer part of the micro-signature.

- [ ] **Step 5: Verify the foundation before continuing**

Run:

```bash
pnpm build
pnpm astro check
git diff --check
```

Expected: build and check pass; no whitespace errors; the site still renders all existing routes.

- [ ] **Step 6: Commit the foundation**

```bash
git add src/styles/globals.css src/layouts/BaseLayout.astro
git commit -m "style: establish glass lab visual foundation"
```

## Task 2: Refresh Navigation, Splash, and Dialog Surfaces

**Files:**
- Modify: `src/components/Navbar.svelte`
- Modify: `src/components/Splash.astro`
- Modify: `src/components/BaseModal.svelte`
- Modify: `src/components/AboutModal.svelte`
- Modify: `src/components/ContactModal.svelte`

- [ ] **Step 1: Preserve the navigation event contract before changing classes**

Keep `handleAboutClick`, `handleContactClick`, `toggleSidebar`, `openSidebar`, `closeSidebar`, `handleBeforeSwap`, and Escape handling unchanged. The desktop links must remain `/`, About, `/projects`, `/blogs`, and Contact. The mobile menu must continue restoring `document.body.style.overflow` on close and before view swaps.

- [ ] **Step 2: Recompose the desktop header as a glass navigation bar**

Use a semantic home link containing the existing reference/timestamp block, then a normal link/button group. Replace terminal-only labels such as `[HOME]` with readable labels (`Home`, `About`, `Projects`, `Blogs`, `Contact`) while retaining the reference/timestamp as the technical micro-signature. Apply `.site-nav`, `.nav-identity`, `.nav-links`, and `.nav-link` classes. Keep all interactive controls at visible focus targets.

- [ ] **Step 3: Restyle the mobile drawer and backdrop**

Use `.nav-backdrop` and `.nav-drawer glass-panel-strong` classes. Keep the drawer full-height, right-aligned, scrollable, and mobile-only. Preserve the 44px close/menu target and the same navigation destinations. The backdrop must remain click-to-close and must not receive pointer events while hidden.

- [ ] **Step 4: Update `BaseModal.svelte` classes without changing behavior**

Keep the existing `open`, `close`, `toggle`, `trapFocus`, event names, focus restoration, `role="dialog"`, `aria-modal`, and `astro:before-swap` cleanup. Replace the backdrop and aside classes with `.modal-backdrop` and `.modal-panel glass-panel-strong`. Give the title an explicit heading element and keep the close button keyboard reachable. The panel must cover the viewport on mobile and occupy a readable right-side column on desktop.

- [ ] **Step 5: Simplify About and Contact presentation**

Keep every existing profile fact and destination. Replace bracket-wrapped action labels in Contact with `GitHub`, `LinkedIn`, `Email`, and `Open`/`Send` labels. Use `.info-block`, `.contact-link`, `.modal-kicker`, and `.modal-list` classes so content remains scannable. Do not add new bio claims or fields.

- [ ] **Step 6: Refine the splash timing and visual treatment**

Keep the synchronous sessionStorage guard, reduced-motion check, click/key skip, 4-second failsafe, and `boot:done` event. Change the visual style to ink/teal glass with a soft glow. Adjust the normal sequence so `finish()` fires at approximately 1100-1200ms and the fade is complete by about 1.3s. When reduced motion is requested, do not display the overlay.

- [ ] **Step 7: Verify chrome behavior and commit**

Run `pnpm build` and `pnpm astro check`. Manually verify desktop and mobile navigation, About/Contact open-close, Escape, backdrop click, focus restoration, and splash skip. Commit:

```bash
git add src/components/Navbar.svelte src/components/Splash.astro src/components/BaseModal.svelte src/components/AboutModal.svelte src/components/ContactModal.svelte
git commit -m "style: refresh navigation splash and modal surfaces"
```

## Task 3: Rebuild The Hero Within The Existing Content Contract

**Files:**
- Modify: `src/sections/Hero.svelte`
- Modify: `src/components/subcomponents/SectionLabel.svelte`

- [ ] **Step 1: Keep the current hero data and animation guard**

Retain `SUBTITLE`, `SITE.github`, `SITE.linkedin`, `SITE.email`, `prefersReducedMotion`, the `window.__bootRan`/`window.__bootDone` guard, and GSAP cleanup. The server-rendered markup must remain the final visible state before hydration so there is no flash.

- [ ] **Step 2: Add the Glass Lab hero composition**

Use a responsive two-column wrapper. The first column contains the existing section label, `ALEJANDRO CASTRO_`, subtitle, social links, and scroll cue. The second column is a decorative/profile panel using existing facts only: `AI RESEARCHER`, `SYSTEMS ENGINEERING STUDENT`, `REINFORCEMENT LEARNING`, `ALGORITHMS`, and `SEARCH-BASED PLANNING`. Mark decorative rules and status dots `aria-hidden="true"`.

- [ ] **Step 3: Update hero motion to short opacity/translate transitions**

Keep line masks for the name and stagger the three action links, but remove the typewriter feel from the subtitle: render the full subtitle in SSR and reveal the paragraph with opacity/translate instead of mutating its text. Animate only transform and opacity. Keep the cursor blink only when motion is allowed.

- [ ] **Step 4: Style the section label as the micro-signature**

Keep the rendered `[SEC NN // LABEL]` string and component props. Change only its visual treatment to a small muted mono label with a subtle gradient rule, not a dominant terminal annotation.

- [ ] **Step 5: Verify the hero and commit**

Run `pnpm build` and `pnpm astro check`; inspect the hero at 1440px and 375px widths. Confirm no horizontal overflow, the links retain their destinations, and reduced motion renders the final state immediately. Commit:

```bash
git add src/sections/Hero.svelte src/components/subcomponents/SectionLabel.svelte
git commit -m "style: redesign hero as glass research profile"
```

## Task 4: Convert Homepage Lists Into Glass Cards

**Files:**
- Modify: `src/sections/Projects.svelte`
- Modify: `src/sections/Blogs.svelte`
- Modify: `src/components/subcomponents/ProjectRow.svelte`
- Modify: `src/components/subcomponents/BlogRow.svelte`

- [ ] **Step 1: Preserve row link semantics and props**

Do not change `project`, `blog`, `index`, `primaryUrl`, `repo_url`, `blog_slug`, `demo_url`, or `slug` behavior. Keep a single stretched primary link per card and keep secondary anchors in a higher `z-index` wrapper. Do not nest anchors.

- [ ] **Step 2: Restyle the homepage section headers**

Replace the heavy border/header utility combination with `.content-section`, `.section-heading`, `.section-heading__title`, and `.section-link`. Keep the section IDs, `data-reveal`, section numbers, labels, and `/projects` or `/blogs` destinations.

- [ ] **Step 3: Build the project card layout**

Use a card grid that is one column on small screens and a two-column or stacked layout on desktop depending on available width. Each card must show index, name, subtitle, tags, and existing actions. Use `.project-card`, `.project-card__main`, `.project-card__meta`, `.tag-chip`, and `.row-action`. Hover may tint the border and lift the card by 2px; it must not move neighboring layout.

- [ ] **Step 4: Build the blog card layout**

Use `.blog-card` with date as muted mono metadata, title as the primary link, and description constrained to a readable line length. Keep the whole card clickable through the existing stretched-link pattern and preserve the current description truncation.

- [ ] **Step 5: Verify interaction edge cases**

Manually test each project action independently: primary GitHub/demo action, article action when present, and live demo when present. Confirm clicking a card body still activates the primary link, blog cards open the correct slug, and keyboard focus is visible. Run `pnpm build` and `pnpm astro check`.

- [ ] **Step 6: Commit homepage card changes**

```bash
git add src/sections/Projects.svelte src/sections/Blogs.svelte src/components/subcomponents/ProjectRow.svelte src/components/subcomponents/BlogRow.svelte
git commit -m "style: turn homepage project and blog rows into glass cards"
```

## Task 5: Restyle Full Project and Blog Browsers

**Files:**
- Modify: `src/components/ProjectsBrowser.svelte`
- Modify: `src/components/BlogsBrowser.svelte`

- [ ] **Step 1: Leave filter and sort computations unchanged**

Keep `uniqueTags`, `filteredProjects`, `filteredBlogs`, search matching, tag matching, sort modes, active filter counts, clear functions, and empty-state branches. Only change markup classes and visible control labels where the terminal brackets are purely decorative.

- [ ] **Step 2: Add glass browser headers and controls**

Use `.browser-header`, `.browser-tools`, `.search-control`, `.search-control input`, `.filter-chip`, `.filter-chip.is-active`, `.sort-control`, and `.clear-control`. Inputs must retain their bound values, have a meaningful placeholder/label, and show a mint focus ring. Use a wrapping flex layout that stays within the viewport on mobile.

- [ ] **Step 3: Reuse card list styling from the homepage**

Keep the same `ProjectRow` and `BlogRow` components so full browsers receive the same clickable-card semantics. Apply a list wrapper that provides spacing rather than a terminal top border.

- [ ] **Step 4: Verify all browser states and commit**

For both routes, manually test initial state, search-only filtering, multi-tag filtering, sort cycling/toggle, clear controls, and no-match empty states. Test keyboard activation of every chip and button. Run `pnpm build` and `pnpm astro check`, then commit:

```bash
git add src/components/ProjectsBrowser.svelte src/components/BlogsBrowser.svelte
git commit -m "style: modernize project and blog browsers"
```

## Task 6: Rework Article, Typography, and 404 Surfaces

**Files:**
- Modify: `src/pages/blog/[slug].astro`
- Modify: `src/styles/article-typography.css`
- Modify: `src/pages/404.astro`

- [ ] **Step 1: Preserve article rendering and metadata**

Keep `getStaticPaths`, `post.render()`, `headings`, TOC filtering, SEO props, `initCopyButtons`, and the `astro:page-load` listener. Do not modify Markdown, KaTeX, rehype, frontmatter, or copy-to-clipboard behavior.

- [ ] **Step 2: Add the article header and shell classes**

Replace terminal border utilities with `.article-header glass-panel`, `.article-meta`, `.article-tag`, `.article-shell`, `.article-reading-surface`, `.article-toc`, and `.article-back-link`. Keep the TOC inline below the header on mobile and sticky in the desktop aside. Ensure the article surface has an opaque enough background for stable contrast beneath any ambient glow.

- [ ] **Step 3: Update article typography for modern readability**

Keep IBM Plex Serif for body text and use Space Grotesk for headings, metadata, and controls. Remove forced uppercase from article headings. Use mint links, subdued rules, opaque code blocks, readable table borders, and a teal blockquote accent. Preserve horizontal overflow wrappers for wide code, tables, and KaTeX. Keep code copy buttons visible and keyboard accessible.

- [ ] **Step 4: Modernize the not-found page**

Keep the 404 message and `/` destination, but use the same page container, section label, display heading, and glass return button. Do not add animation or new copy.

- [ ] **Step 5: Verify article behavior and commit**

Open `/blog/ai2048`, test desktop/mobile TOC links, code copy success/error feedback, external repo link, article links, back-to-browser navigation, and no horizontal page overflow. Open `/404` and verify the return link. Run `pnpm build` and `pnpm astro check`, then commit:

```bash
git add "src/pages/blog/[slug].astro" src/styles/article-typography.css src/pages/404.astro
git commit -m "style: give articles and 404 a readable glass shell"
```

## Task 7: Cross-Page Verification and Visual Polish

**Files:**
- Modify: only files with verified defects from Tasks 1-6.

- [ ] **Step 1: Start the local server and inspect target routes**

Run:

```bash
pnpm dev --host
```

Inspect `/`, `/projects`, `/blogs`, `/blog/ai2048`, and `/404` at approximately 1440x900, 768x1024, and 375x812. Check that gradients remain behind content, glass panels are visibly distinct, and article text remains comfortable to read.

- [ ] **Step 2: Run the keyboard and reduced-motion pass**

Using only the keyboard, verify skip link, all nav links, mobile menu controls, hero links, cards, secondary project actions, search, filters, sort/clear, TOC links, copy button, About/Contact dialogs, Escape close, and focus restoration. Enable reduced motion in the browser and confirm the page is immediately usable with no splash/reveal/cursor/transition animation.

- [ ] **Step 3: Check responsive and visual failure modes**

Use the browser console and computed layout to check for horizontal overflow, clipped focus rings, unreadable muted text, missing fallback backgrounds, and any card whose stretched link blocks a secondary action. Verify `backdrop-filter` fallback by disabling it in devtools or inspecting the declared opaque fallback.

- [ ] **Step 4: Run final automated checks**

Run:

```bash
pnpm astro check
pnpm build
git diff --check
git status --short --branch
```

Expected: typecheck and production build pass, diff check is clean, and only intentional source/docs changes remain.

- [ ] **Step 5: Request an independent review of the complete diff**

Review all commits since `7566f42`, not just the last commit. Check link semantics, focus behavior, reduced-motion paths, content preservation, mobile overflow, and unintended old brutalist classes. Fix only verified issues, re-run the final checks, and create a focused fix commit rather than amending prior commits.

## Plan Self-Review

- **Spec coverage:** visual tokens and surfaces are covered by Task 1; shared shell by Tasks 1-2; hero by Task 3; homepage interactions by Task 4; full browsers by Task 5; articles and 404 by Task 6; motion/accessibility/fallbacks by Tasks 1-3 and 7; verification and out-of-scope constraints by every task.
- **Placeholder scan:** no implementation step depends on an unspecified library, schema, route, or content field. Color values are explicit, and every modified behavior has a file and verification command.
- **Type consistency:** existing prop names and event names are retained; `ProjectRow`/`BlogRow` remain the shared components for homepage and full browsers; `data-reveal` remains compatible with `initReveal`.
