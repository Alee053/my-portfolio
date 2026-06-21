# Portfolio Polished Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish Alejandro Castro's portfolio (`alecastro.dev`) — improve animation impact, accessibility, SEO, and code hygiene while keeping the existing brutalist visual language, palette, and 3-page structure.

**Architecture:** Layered changes to an existing Astro 5 + Svelte 5 + Tailwind v4 + GSAP site. Foundation utilities land first (motion-utils, reveal, skills, BuildTimestamp), then layout/SEO, then component rewrites (Hero, modals, rows, browsers, About), then polish and cleanup. GSAP `ScrollTrigger` is added for scroll-reveals. No new pages, no new dependencies beyond `@astrojs/sitemap` and the GSAP plugin (already in bundle).

**Tech Stack:** Astro 5.13, Svelte 5.38, Tailwind v4.1, GSAP 3.13 (with ScrollTrigger plugin), TypeScript 5.9, pnpm 9.x. Static output, deployed to Vercel.

**Spec:** `docs/superpowers/specs/2026-06-21-portfolio-polished-pass-design.md`

**Reference paths in the current codebase:**
- `src/layouts/BaseLayout.astro` — main layout
- `src/styles/globals.css` — Tailwind v4 theme + tokens
- `src/components/BaseModal.svelte` — modal shell (a11y rewrite)
- `src/components/Navbar.svelte` — sticky header
- `src/components/LiveTimestamp.svelte` — REPLACED with BuildTimestamp
- `src/components/AboutModal.svelte` — gets Skills section + countup
- `src/components/ContactModal.svelte` — visual polish
- `src/components/ProjectsBrowser.svelte` / `BlogsBrowser.svelte` — focus rings, scroll reveal
- `src/components/subcomponents/ProjectRow.svelte` / `BlogRow.svelte` — a11y rewrite
- `src/sections/Hero.svelte` — cinematic intro
- `src/sections/Projects.svelte` / `Blogs.svelte` — scroll reveal on rows
- `src/pages/index.astro` / `projects.astro` / `blogs.astro` / `blog/[slug].astro` — SEO meta
- `src/content/config.ts` — content collection schemas
- `astro.config.mjs` — add `@astrojs/sitemap`, set `site`
- `package.json` — remove unused deps, add `packageManager`

---

## Phase 1: Setup & dependencies

### Task 1.1: Create feature branch

**Files:** none (git operation)

- [ ] **Step 1: Create and check out a feature branch**

```bash
cd /home/ale/Dev/Personal/my-portfolio
git checkout -b feature/portfolio-polished-pass
```

Expected: `Switched to a new branch 'feature/portfolio-polished-pass'`

- [ ] **Step 2: Verify clean working tree**

```bash
git status
```

Expected: `nothing to commit, working tree clean` (or only `.superpowers/` untracked, which we'll add to gitignore in a later task).

### Task 1.2: Update `.gitignore`

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Read current `.gitignore`**

```bash
cat .gitignore
```

- [ ] **Step 2: Add `.superpowers/` and `.idea/` to `.gitignore`**

Append these lines to `.gitignore` (create the file if it doesn't exist):

```gitignore
.superpowers/
.idea/
```

- [ ] **Step 3: Untrack `.idea/` if it's currently tracked**

```bash
git rm -r --cached .idea/ 2>/dev/null || true
```

- [ ] **Step 4: Verify the changes**

```bash
git status
```

Expected: `.gitignore` modified; `.idea/` removed from index (if it was tracked); `.superpowers/` shows as ignored.

- [ ] **Step 5: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore .superpowers/ and .idea/"
```

### Task 1.3: Clean up `package.json` — remove unused deps, add sitemap, set `packageManager`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Read current `package.json`**

```bash
cat package.json
```

Expected: shows the 8 dependencies (matter-js, unplugin-icons, @vercel/analytics, @vercel/speed-insights, etc.) and 4 devDependencies.

- [ ] **Step 2: Remove unused dependencies**

```bash
pnpm remove matter-js @vercel/analytics @vercel/speed-insights
pnpm remove -D unplugin-icons @iconify/json
```

Expected: packages removed from `node_modules` and `package.json`. If `pnpm` is not installed, install it: `npm install -g pnpm` (or `corepack enable && corepack prepare pnpm@9 --activate`).

- [ ] **Step 3: Add `@astrojs/sitemap`**

```bash
pnpm add @astrojs/sitemap
```

- [ ] **Step 4: Set `packageManager` field**

In `package.json`, add this line right after `"name"` and `"type"`:

```json
  "packageManager": "pnpm@9.15.0",
```

(Use whatever pnpm version you have installed; `pnpm --version` will tell you.)

- [ ] **Step 5: Add `pnpm check` and `pnpm check:a11y` scripts**

In `package.json`'s `"scripts"` block, add:

```json
    "check": "astro check",
    "check:a11y": "node scripts/check-a11y.mjs"
```

Final `scripts` block should look like:

```json
  "scripts": {
    "dev": "astro dev",
    "dev-host": "astro dev --host",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "check": "astro check",
    "check:a11y": "node scripts/check-a11y.mjs"
  },
```

- [ ] **Step 6: Delete `package-lock.json` and keep only `pnpm-lock.yaml`**

```bash
rm -f package-lock.json
ls pnpm-lock.yaml package-lock.json 2>&1
```

Expected: only `pnpm-lock.yaml` exists; the `package-lock.json` line is `No such file or directory`.

- [ ] **Step 7: Re-run install to ensure lockfile is current**

```bash
pnpm install
```

Expected: completes without errors; `pnpm-lock.yaml` updated.

- [ ] **Step 8: Verify `astro build` still works**

```bash
pnpm build
```

Expected: completes with no errors. (The site may have warnings about missing modules if we removed something we missed — but the audit confirmed the removed deps are unused, so this should pass.)

- [ ] **Step 9: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: remove unused deps, add @astrojs/sitemap, lock to pnpm"
```

### Task 1.4: Update `astro.config.mjs` — add sitemap, remove `unplugin-icons`

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Read current `astro.config.mjs`**

```bash
cat astro.config.mjs
```

- [ ] **Step 2: Replace the file with the cleaned-up version**

Write to `astro.config.mjs`:

```js
// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import decapCmsOauth from 'astro-decap-cms-oauth';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
    site: 'https://alecastro.dev',
    integrations: [svelte(), decapCmsOauth(), sitemap()],
    image: {
        domains: ['res.cloudinary.com'],
    },
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        shikiConfig: {
            theme: 'github-dark',
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: vercel(),
});
```

Changes from the previous file:
- Added `import sitemap from '@astrojs/sitemap';`
- Added `site: 'https://alecastro.dev',`
- Added `sitemap()` to integrations
- Removed `import Icons from 'unplugin-icons/vite';` and the `Icons({...})` plugin
- Removed `shikiConfig.wrap: true` (deprecated in Shiki v1+)

- [ ] **Step 3: Verify the build still works**

```bash
pnpm build
```

Expected: completes without errors.

- [ ] **Step 4: Verify sitemap generation**

```bash
ls dist/sitemap*.xml 2>&1
```

Expected: at least one `sitemap-*.xml` file exists. (Astro generates `sitemap-index.xml` and `sitemap-0.xml` by default.)

- [ ] **Step 5: Commit**

```bash
git add astro.config.mjs
git commit -m "chore: add @astrojs/sitemap, remove unplugin-icons, set site URL"
```

---

## Phase 2: Foundation utilities

### Task 2.1: Create `src/lib/motion-utils.ts` — reduced-motion helper, focus trap, countUp

**Files:**
- Create: `src/lib/motion-utils.ts`

- [ ] **Step 1: Create the file**

Write to `src/lib/motion-utils.ts`:

```ts
import { gsap } from 'gsap';

/**
 * Returns true if the user has requested reduced motion.
 * SSR-safe: returns false on the server.
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Runs a GSAP timeline, or sets the final state immediately if reduced motion is requested.
 *
 * @param build  Function that builds and returns a GSAP timeline. Only called if motion is allowed.
 * @param final  Object of final property values to set if motion is reduced.
 * @param target The element(s) to apply the final state to when motion is reduced.
 */
export function timelineOrSet<T extends gsap.TweenTarget>(
    build: () => gsap.core.Timeline,
    final: gsap.TweenVars,
    target: T
): gsap.core.Timeline | null {
    if (prefersReducedMotion()) {
        gsap.set(target, final);
        return null;
    }
    return build();
}

/**
 * Animates a number from 0 to `value` over `duration` ms, updating the textContent of `el`.
 * If reduced motion is preferred, sets the final value immediately.
 */
export function countUp(el: HTMLElement, value: number, duration = 800): gsap.core.Tween | null {
    if (prefersReducedMotion()) {
        el.textContent = String(value);
        return null;
    }
    const proxy = { v: 0 };
    return gsap.to(proxy, {
        v: value,
        duration: duration / 1000,
        ease: 'power1.out',
        onUpdate: () => {
            el.textContent = String(Math.round(proxy.v));
        },
    });
}

/**
 * Creates a focus trap inside the given root element.
 * - Saves the currently focused element on activation
 * - Cycles Tab/Shift+Tab within the root
 * - Calls onEscape when Escape is pressed
 * - Restores focus on deactivation
 */
export function createFocusTrap(rootEl: HTMLElement, onEscape?: () => void) {
    let previouslyFocused: HTMLElement | null = null;

    const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'textarea:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    function getFocusable(): HTMLElement[] {
        return Array.from(rootEl.querySelectorAll<HTMLElement>(focusableSelector)).filter(
            (el) => !el.hasAttribute('aria-hidden') && el.offsetParent !== null
        );
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            onEscape?.();
            return;
        }
        if (e.key !== 'Tab') return;
        const focusable = getFocusable();
        if (focusable.length === 0) {
            e.preventDefault();
            return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
            if (active === first || !rootEl.contains(active)) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (active === last || !rootEl.contains(active)) {
                e.preventDefault();
                first.focus();
            }
        }
    }

    return {
        activate() {
            previouslyFocused = document.activeElement as HTMLElement | null;
            document.addEventListener('keydown', handleKeydown);
            // Focus the first focusable element (or the root itself)
            const focusable = getFocusable();
            if (focusable.length > 0) {
                focusable[0].focus();
            } else {
                rootEl.setAttribute('tabindex', '-1');
                rootEl.focus();
            }
        },
        deactivate() {
            document.removeEventListener('keydown', handleKeydown);
            if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
                previouslyFocused.focus();
            }
        },
    };
}
```

- [ ] **Step 2: Verify the file compiles**

```bash
pnpm check
```

Expected: 0 TypeScript errors. (Astro check will typecheck `.astro` and `.ts` files.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/motion-utils.ts
git commit -m "feat(util): add motion-utils with reduced-motion, countUp, focus trap"
```

### Task 2.2: Create `src/lib/reveal.ts` — Svelte action for scroll reveals

**Files:**
- Create: `src/lib/reveal.ts`

- [ ] **Step 1: Create the file**

Write to `src/lib/reveal.ts`:

```ts
import type { Action } from 'svelte/action';

export type RevealVariant = 'fade' | 'rise' | 'stagger';

/**
 * Svelte action that observes the element and adds `is-revealed` once it enters the viewport.
 *
 * Usage:
 *   <div use:reveal={{ variant: 'rise' }}>...</div>
 *   <ul use:reveal={{ variant: 'stagger' }}>...</ul>
 */
export const reveal: Action<HTMLElement, { variant?: RevealVariant; threshold?: number } | undefined> = (
    node,
    options = {}
) => {
    const { variant = 'rise', threshold = 0.2 } = options ?? {};

    function applyClass() {
        if (variant === 'stagger') {
            // The element itself gets `is-revealed`; CSS handles children
            node.classList.add('is-revealed', 'reveal-stagger');
        } else if (variant === 'fade') {
            node.classList.add('is-revealed', 'reveal-fade');
        } else {
            node.classList.add('is-revealed', 'reveal-rise');
        }
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        // SSR or no IO support: just reveal immediately
        applyClass();
        return {};
    }

    // Respect reduced motion: reveal immediately, no transition
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        applyClass();
        node.classList.add('reveal-no-motion');
        return {};
    }

    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    applyClass();
                    observer.unobserve(node);
                }
            }
        },
        { threshold }
    );

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        },
    };
};
```

- [ ] **Step 2: Verify the file compiles**

```bash
pnpm check
```

Expected: 0 TypeScript errors. If Svelte's `Action` type import is rejected, change the import to `import type { Action } from 'svelte/action';` (it should be fine in Svelte 5).

- [ ] **Step 3: Commit**

```bash
git add src/lib/reveal.ts
git commit -m "feat(util): add Svelte reveal action with fade/rise/stagger variants"
```

### Task 2.3: Create `src/lib/skills.ts` — skills taxonomy

**Files:**
- Create: `src/lib/skills.ts`

> **Note**: the entries below are a starter list drawn from the existing About modal copy, project tags, and the user's bio. The user can edit this file after implementation if they want to add or remove items.

- [ ] **Step 1: Create the file**

Write to `src/lib/skills.ts`:

```ts
export type SkillCategory = 'Languages' | 'AI/ML' | 'Tools' | 'Research';
export type SkillLevel = 'core' | 'familiar';

export interface Skill {
    name: string;
    category: SkillCategory;
    level: SkillLevel;
}

export const skills: Skill[] = [
    // Languages
    { name: 'Python', category: 'Languages', level: 'core' },
    { name: 'C++', category: 'Languages', level: 'core' },
    { name: 'TypeScript', category: 'Languages', level: 'familiar' },
    { name: 'JavaScript', category: 'Languages', level: 'familiar' },

    // AI / ML
    { name: 'PyTorch', category: 'AI/ML', level: 'core' },
    { name: 'Reinforcement Learning', category: 'AI/ML', level: 'core' },
    { name: 'Search-Based Planning', category: 'AI/ML', level: 'core' },
    { name: 'Bayesian Optimization', category: 'AI/ML', level: 'familiar' },
    { name: 'Uncertainty Quantification', category: 'AI/ML', level: 'familiar' },

    // Tools
    { name: 'Git', category: 'Tools', level: 'core' },
    { name: 'Astro', category: 'Tools', level: 'familiar' },
    { name: 'Svelte', category: 'Tools', level: 'familiar' },
    { name: 'Tailwind CSS', category: 'Tools', level: 'familiar' },
    { name: 'p5.js', category: 'Tools', level: 'familiar' },

    // Research
    { name: 'Algorithms', category: 'Research', level: 'core' },
    { name: 'Sequential Decision Making', category: 'Research', level: 'core' },
    { name: 'International Olympiad in Informatics', category: 'Research', level: 'familiar' },
];

export const skillsByCategory: Record<SkillCategory, Skill[]> = {
    Languages: skills.filter((s) => s.category === 'Languages'),
    'AI/ML': skills.filter((s) => s.category === 'AI/ML'),
    Tools: skills.filter((s) => s.category === 'Tools'),
    Research: skills.filter((s) => s.category === 'Research'),
};
```

- [ ] **Step 2: Verify it compiles**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/skills.ts
git commit -m "feat(util): add skills taxonomy"
```

### Task 2.4: Add reveal CSS to `globals.css`

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Append the reveal styles to `globals.css`**

Read the current file first, then append the following at the end of `src/styles/globals.css`:

```css
[data-reveal] {
    opacity: 0;
}

[data-reveal].is-revealed {
    opacity: 1;
}

.reveal-fade {
    transition: opacity 600ms ease-out;
}

.reveal-rise {
    transform: translateY(16px);
    transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.reveal-rise.is-revealed {
    transform: translateY(0);
}

.reveal-stagger > * {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.reveal-stagger.is-revealed > * {
    opacity: 1;
    transform: translateY(0);
}

.reveal-stagger.is-revealed > *:nth-child(1)  { transition-delay: 0ms; }
.reveal-stagger.is-revealed > *:nth-child(2)  { transition-delay: 80ms; }
.reveal-stagger.is-revealed > *:nth-child(3)  { transition-delay: 160ms; }
.reveal-stagger.is-revealed > *:nth-child(4)  { transition-delay: 240ms; }
.reveal-stagger.is-revealed > *:nth-child(5)  { transition-delay: 320ms; }
.reveal-stagger.is-revealed > *:nth-child(6)  { transition-delay: 400ms; }
.reveal-stagger.is-revealed > *:nth-child(7)  { transition-delay: 480ms; }
.reveal-stagger.is-revealed > *:nth-child(8)  { transition-delay: 560ms; }
.reveal-stagger.is-revealed > *:nth-child(9)  { transition-delay: 640ms; }
.reveal-stagger.is-revealed > *:nth-child(10) { transition-delay: 720ms; }

@media (prefers-reduced-motion: reduce) {
    [data-reveal],
    .reveal-fade,
    .reveal-rise,
    .reveal-stagger > * {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }
}
```

- [ ] **Step 2: Verify the build still works**

```bash
pnpm build
```

Expected: completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat(style): add reveal CSS (fade/rise/stagger) with reduced-motion fallback"
```

### Task 2.5: Create `src/components/BuildTimestamp.astro` — static build timestamp

**Files:**
- Create: `src/components/BuildTimestamp.astro`
- Delete: `src/components/LiveTimestamp.svelte`

- [ ] **Step 1: Create the new file**

Write to `src/components/BuildTimestamp.astro`:

```astro
---
const buildDate = new Date();
const yyyy = buildDate.getFullYear();
const mm = String(buildDate.getMonth() + 1).padStart(2, '0');
const dd = String(buildDate.getDate()).padStart(2, '0');
// Derive a short hash from the current minute (changes per build, never re-renders)
const hash = (Math.floor(buildDate.getTime() / 60000) % 0xffff).toString(16).toUpperCase().padStart(4, '0');
const label = `TS: ${hash}·BUILD·${yyyy}.${mm}.${dd}`;
---

<span class="font-mono text-[10px] tracking-widest text-brutalist-line/80" aria-hidden="true">{label}</span>
```

- [ ] **Step 2: Delete the old `LiveTimestamp.svelte`**

```bash
rm src/components/LiveTimestamp.svelte
```

- [ ] **Step 3: Find all imports of `LiveTimestamp` and update them**

```bash
rg -n "LiveTimestamp" src/
```

Expected: lists all files that import `LiveTimestamp`. (Likely just `Navbar.svelte`.)

- [ ] **Step 4: Update `Navbar.svelte` to use the new component**

In `src/components/Navbar.svelte`:

- Replace the line `import LiveTimestamp from './LiveTimestamp.svelte';` with:
  ```js
  import BuildTimestamp from './BuildTimestamp.astro';
  ```
- Replace the two `<LiveTimestamp />` usages (one in the desktop header, one in the mobile sidebar) with:
  ```astro
  <BuildTimestamp />
  ```

  > **Note**: Svelte can render `.astro` components. This is supported in Astro 5 + Svelte 5. If you hit a hydration mismatch, fall back to importing the rendered HTML as a string (use `<Fragment set:html={...} />` from an Astro file passed as a prop), or simply inline the timestamp computation in `Navbar.svelte`. The simplest fallback is to inline the build hash in `Navbar.svelte` as a top-level constant — but the `.astro` component is preferred because it keeps the logic isolated.

- [ ] **Step 5: Verify the build**

```bash
pnpm build
```

Expected: completes without errors. The home page should still show a `TS: ...` label that does NOT update every second.

- [ ] **Step 6: Open the dev server in a browser and confirm the timestamp is static**

```bash
pnpm dev
```

Then open `http://localhost:4321`, wait 5 seconds, and confirm the `TS:` value does not change.

- [ ] **Step 7: Commit**

```bash
git add src/components/BuildTimestamp.astro src/components/Navbar.svelte
git rm src/components/LiveTimestamp.svelte
git commit -m "feat: replace LiveTimestamp with static BuildTimestamp (Astro)"
```

---

## Phase 3: Layout & SEO

### Task 3.1: Create `src/components/SEO.astro` — title, description, OG, JSON-LD

**Files:**
- Create: `src/components/SEO.astro`

- [ ] **Step 1: Create the file**

Write to `src/components/SEO.astro`:

```astro
---
export interface Props {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    tags?: string[];
}

const {
    title,
    description,
    image = '/og-default.png',
    type = 'website',
    publishedTime,
    tags = [],
} = Astro.props;

const siteName = 'ALEJANDRO CASTRO';
const canonicalURL = new URL(Astro.url.pathname, Astro.site ?? 'https://alecastro.dev');
const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
const ogImage = new URL(image, Astro.site ?? 'https://alecastro.dev').toString();

const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alejandro Castro',
    url: 'https://alecastro.dev',
    jobTitle: 'AI Researcher & Systems Engineering Student',
    sameAs: [
        'https://github.com/Alee053',
        'https://www.linkedin.com/in/alejandrocastroalvarez/',
    ],
    knowsAbout: [
        'Reinforcement Learning',
        'Algorithms',
        'Search-Based Planning',
        'Sequential Decision Making',
        'Bayesian Optimization',
    ],
};

const articleJsonLd = type === 'article' && publishedTime
    ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          datePublished: publishedTime,
          author: { '@type': 'Person', name: 'Alejandro Castro', url: 'https://alecastro.dev' },
          keywords: tags.join(', '),
          url: canonicalURL.toString(),
      }
    : null;

const jsonLd = articleJsonLd ?? personJsonLd;
---

<!-- Primary meta -->
<title>{fullTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL.toString()} />

<!-- Open Graph -->
<meta property="og:type" content={type} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={canonicalURL.toString()} />
<meta property="og:site_name" content={siteName} />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />

<!-- Article-specific -->
{type === 'article' && publishedTime && (
    <meta property="article:published_time" content={publishedTime} />
)}
{type === 'article' && tags.map((tag) => (
    <meta property="article:tag" content={tag} />
))}

<!-- JSON-LD -->
<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
```

- [ ] **Step 2: Verify it compiles**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/SEO.astro
git commit -m "feat(seo): add SEO component with OG, Twitter, JSON-LD"
```

### Task 3.2: Update `BaseLayout.astro` — skip link, blueprint grid bump, viewport label, footer year, drop gray squares

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Replace the file**

Write the following to `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/globals.css';
import Navbar from '../components/Navbar.svelte';
import ContactModal from '../components/ContactModal.svelte';
import AboutModal from '../components/AboutModal.svelte';
import SEO from '../components/SEO.astro';
import BuildTimestamp from '../components/BuildTimestamp.astro';

interface Props {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    tags?: string[];
}

const { title, description, image, type, publishedTime, tags } = Astro.props;
---

<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width" />
  <link rel="icon" href="/logo.png" />
  <SEO {title} {description} {image} {type} {publishedTime} {tags} />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600&display=swap" rel="stylesheet">
  <link href="https://fonts.cdnfonts.com/css/liberation-mono" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" crossorigin="anonymous">

  <slot name="head" />
</head>
<body class="bg-brutalist-bg text-brutalist-text font-sans relative min-h-screen">

  <!-- Skip link -->
  <a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brutalist-accent focus:text-black focus:font-mono focus:text-sm">
    SKIP TO CONTENT
  </a>

  <!-- Background grid (bumped to 40% opacity) -->
  <div class="absolute inset-0 pointer-events-none blueprint-grid opacity-40 z-0" style="min-height: 100vh;" aria-hidden="true"></div>

  <!-- Corner crosshairs (decorative) -->
  <div class="pointer-events-none fixed inset-0 z-[1] corner-crosshairs" aria-hidden="true">
    <span class="ch ch-tl"></span>
    <span class="ch ch-tr"></span>
    <span class="ch ch-bl"></span>
    <span class="ch ch-br"></span>
  </div>

  <!-- Viewport label (updates on resize) -->
  <div class="pointer-events-none fixed top-2 right-2 z-[2] font-mono text-[10px] text-brutalist-text/40 select-none" aria-hidden="true">
    <span id="viewport-label">[VIEWPORT: 0×0]</span>
  </div>

  <!-- Navbar -->
  <Navbar client:load />

  <main id="main" class="relative z-10 min-h-screen pt-32 md:px-8 pb-20 px-4" style="min-height: 100vh;">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="border-t border-brutalist-line p-4 md:p-8 flex justify-between items-center font-mono text-[10px] uppercase tracking-wider">
    <div>
      © {new Date().getFullYear()} ALEJANDRO CASTRO // ALL RIGHTS RESERVED
    </div>
    <div class="text-brutalist-line/60">
      <BuildTimestamp />
    </div>
  </footer>

  <!-- About Modal -->
  <AboutModal client:only />

  <!-- Contact Modal -->
  <ContactModal client:only githubUrl="https://github.com/Alee053" linkedInUrl="https://www.linkedin.com/in/alejandrocastroalvarez/" email="alejandro@alecastro.dev" />

  <script>
    function toggleAboutModal() {
      document.dispatchEvent(new CustomEvent('close-toggle-contact-modal'));
      document.dispatchEvent(new CustomEvent('toggle-about-modal'));
    }

    function toggleContactModal() {
      document.dispatchEvent(new CustomEvent('close-toggle-about-modal'));
      document.dispatchEvent(new CustomEvent('toggle-contact-modal'));
    }

    // @ts-ignore
    window.toggleAboutModal = toggleAboutModal;
    // @ts-ignore
    window.toggleContactModal = toggleContactModal;

    // Viewport label — updates on resize, debounced
    (function () {
      const el = document.getElementById('viewport-label');
      if (!el) return;
      let t;
      function update() {
        el.textContent = `[VIEWPORT: ${window.innerWidth}×${window.innerHeight}]`;
      }
      function onResize() {
        clearTimeout(t);
        t = setTimeout(update, 200);
      }
      update();
      window.addEventListener('resize', onResize);
    })();
  </script>
</body>
</html>
```

- [ ] **Step 2: Append corner-crosshairs CSS to `globals.css`**

Append the following to `src/styles/globals.css`:

```css
/* Corner crosshairs */
.corner-crosshairs .ch {
    position: absolute;
    width: 12px;
    height: 12px;
    opacity: 0.3;
    animation: cornerPulse 6s ease-in-out infinite;
}
.corner-crosshairs .ch::before,
.corner-crosshairs .ch::after {
    content: '';
    position: absolute;
    background: var(--color-brutalist-text);
}
.corner-crosshairs .ch::before { /* horizontal arm */
    left: 0; right: 0; top: 50%;
    height: 1px; transform: translateY(-0.5px);
}
.corner-crosshairs .ch::after { /* vertical arm */
    top: 0; bottom: 0; left: 50%;
    width: 1px; transform: translateX(-0.5px);
}
.corner-crosshairs .ch-tl { top: 8px;    left: 8px;    }
.corner-crosshairs .ch-tr { top: 8px;    right: 8px;   }
.corner-crosshairs .ch-bl { bottom: 8px; left: 8px;    }
.corner-crosshairs .ch-br { bottom: 8px; right: 8px;   }
.corner-crosshairs .ch-tr,
.corner-crosshairs .ch-br { animation-delay: 1.5s; }
.corner-crosshairs .ch-bl,
.corner-crosshairs .ch-br { animation-delay: 3s; }

@keyframes cornerPulse {
    0%, 100% { opacity: 0.2; }
    50%      { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
    .corner-crosshairs .ch { animation: none; opacity: 0.3; }
}
```

- [ ] **Step 3: Verify the build**

```bash
pnpm build
```

Expected: completes without errors. The home page should now have the corner crosshairs and viewport label visible.

- [ ] **Step 4: Visual check**

```bash
pnpm dev
```

Open `http://localhost:4321` and confirm:
- The blueprint grid is visible (40% opacity — clearly more present than before)
- The corner crosshairs pulse slowly in all 4 corners
- The `[VIEWPORT: 1440×900]` label is in the top-right
- The skip link appears in the top-left when you press Tab
- The footer shows the current year (not `2026`) and the build timestamp
- The three gray squares are gone

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro src/styles/globals.css
git commit -m "feat(layout): skip link, visible blueprint grid, corner crosshairs, viewport label, dynamic year"
```

### Task 3.3: Update each page to pass `description` to the layout

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/projects.astro`
- Modify: `src/pages/blogs.astro`
- Modify: `src/pages/blog/[slug].astro`

- [ ] **Step 1: Read the current `index.astro`**

```bash
cat src/pages/index.astro
```

- [ ] **Step 2: Update `index.astro` to pass `title` and `description`**

Replace the contents of `src/pages/index.astro` with:

```astro
---
import Layout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import Hero from '../sections/Hero.svelte';
import Projects from '../sections/Projects.svelte';
import Blogs from '../sections/Blogs.svelte';

const projects = (await getCollection('projects'))
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999))
    .slice(0, 3);
const blogs = (await getCollection('blog'))
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .slice(0, 3);
---
<Layout
    title="ALEJANDRO CASTRO"
    description="AI researcher and systems engineering student at UCB San Pablo. Reinforcement learning, algorithms, search-based planning."
>
    <Hero client:load />
    <Projects projects={projects} client:visible />
    <Blogs blogs={blogs} client:visible />
</Layout>
```

Note: the `Hero` stays `client:load` (LCP candidate); the `Projects` and `Blogs` sections are now `client:visible` (deferred hydration).

- [ ] **Step 3: Update `projects.astro`**

Read first, then replace with the version that passes `title` and `description`. The exact content of the file depends on the current implementation; the change is to add the `title` and `description` props to the `<Layout>` element.

If the file currently looks like:

```astro
---
import Layout from '../layouts/BaseLayout.astro';
import ProjectsBrowser from '../components/ProjectsBrowser.svelte';
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects'))
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
---
<Layout title="PROJECTS">
    <ProjectsBrowser projects={projects} client:visible />
</Layout>
```

Then change it to:

```astro
---
import Layout from '../layouts/BaseLayout.astro';
import ProjectsBrowser from '../components/ProjectsBrowser.svelte';
import { getCollection } from 'astro:content';

const projects = (await getCollection('projects'))
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
---
<Layout
    title="PROJECTS"
    description="Selected projects in AI/ML, algorithms, and interactive systems."
>
    <ProjectsBrowser projects={projects} client:visible />
</Layout>
```

- [ ] **Step 4: Update `blogs.astro` similarly**

Add `title="BLOGS"` and `description="Writing on reinforcement learning, algorithms, and engineering craft."` to the `<Layout>` element.

- [ ] **Step 5: Update `blog/[slug].astro` for article SEO**

Read the current file, then update the frontmatter to compute a description and pass `type="article"`, `publishedTime`, and `tags` to the layout. For example:

```astro
---
import Layout from '../../layouts/BaseLayout.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
    const blogs = await getCollection('blog');
    return blogs.map((blog) => ({
        params: { slug: blog.id },
        props: { blog },
    }));
}

const { blog } = Astro.props;
const { Content } = await render(blog);
const description = blog.data.description ?? blog.body.slice(0, 155).replace(/[#*`]/g, '').trim();
---
<Layout
    title={blog.data.title}
    description={description}
    type="article"
    publishedTime={blog.data.date.toISOString()}
    tags={blog.data.tags}
>
    <article>
        <header>
            <h1>{blog.data.title}</h1>
            <time datetime={blog.data.date.toISOString()}>
                {blog.data.date.toISOString().slice(0, 10)}
            </time>
        </header>
        <Content />
    </article>
</Layout>
```

(Adjust if the current `blog/[slug].astro` uses a different `render` API or wraps the content differently — the key change is passing `description`, `type="article"`, `publishedTime`, and `tags` to the layout.)

- [ ] **Step 6: Verify the build**

```bash
pnpm build
```

Expected: completes without errors. The built `dist/index.html` should now have `<title>ALEJANDRO CASTRO</title>`, `<meta name="description" ...>`, OG tags, and the JSON-LD script.

- [ ] **Step 7: Spot-check the SEO output**

```bash
rg -A 1 'name="description"' dist/index.html
rg -A 1 'og:title' dist/index.html
rg -A 1 'application/ld\+json' dist/index.html | head -20
```

Expected: each command prints a valid meta tag or JSON-LD block.

- [ ] **Step 8: Commit**

```bash
git add src/pages/
git commit -m "feat(seo): pass title/description/OG/JSON-LD from every page"
```

### Task 3.4: Create `src/pages/404.astro` — brutalist not-found page

**Files:**
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create the file**

Write to `src/pages/404.astro`:

```astro
---
import Layout from '../layouts/BaseLayout.astro';
---

<Layout
    title="ERR_404 // NOT_FOUND"
    description="The requested resource does not exist on this domain."
>
    <section class="min-h-[60vh] flex flex-col items-start justify-center gap-6">
        <div class="font-mono text-[10px] text-brutalist-line tracking-widest">[ERR 404 // NOT_FOUND]</div>
        <h1 class="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none">
            RESOURCE_<br>
            <span class="text-brutalist-accent">UNREACHABLE</span>
        </h1>
        <p class="font-mono text-sm text-brutalist-text max-w-md">
            &gt; The requested resource does not exist on this domain.<br>
            &gt; Check the URL or return to the index.
        </p>
        <a
            href="/"
            class="inline-block px-4 py-2 border border-brutalist-accent text-brutalist-accent font-mono text-xs uppercase tracking-widest hover:bg-brutalist-accent hover:text-black transition-colors"
        >
            [← RETURN TO INDEX]
        </a>
    </section>
</Layout>
```

- [ ] **Step 2: Verify the build creates a 404 page**

```bash
pnpm build
ls dist/404.html
```

Expected: `dist/404.html` exists.

- [ ] **Step 3: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat(seo): add brutalist 404 page"
```

### Task 3.5: Create `public/robots.txt`

**Files:**
- Create: `public/robots.txt`

- [ ] **Step 1: Create the file**

Write to `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://alecastro.dev/sitemap-index.xml
```

- [ ] **Step 2: Verify the build copies it to `dist/`**

```bash
pnpm build
cat dist/robots.txt
```

Expected: prints the same content.

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt
git commit -m "feat(seo): add robots.txt with sitemap reference"
```

### Task 3.6: Create `public/og-default.png` — placeholder OG image

**Files:**
- Create: `public/og-default.png`

> **Note**: This is a *template* OG card. A real, hand-designed card is a future spec. The template just needs to be a valid 1200×630 PNG with the name, role, and brand color so that link previews stop showing broken/missing images.

- [ ] **Step 1: Create a 1200×630 PNG using ImageMagick (if available) or a Node script**

If you have `convert` (ImageMagick) installed:

```bash
convert -size 1200x630 \
    xc:'#111111' \
    -fill '#5e5e5e' -draw 'line 0,80 1200,80' \
    -fill '#5e5e5e' -draw 'line 0,550 1200,550' \
    -fill '#5e5e5e' -font Liberation-Mono -pointsize 14 -draw "text 40,50 '[REF: AC-2026-MINIMAL]'" \
    -fill '#CCCCCC' -font Space-Grotesk-Bold -pointsize 72 -draw "text 80,280 'ALEJANDRO CASTRO'" \
    -fill '#13ecaf' -font Space-Grotesk-Bold -pointsize 32 -draw "text 80,340 'AI RESEARCHER & SYSTEMS ENGINEER'" \
    -fill '#5e5e5e' -font Liberation-Mono -pointsize 14 -draw "text 80,580 'alecastro.dev'" \
    public/og-default.png
```

If ImageMagick isn't available, use a Node.js script with `sharp` (which is already a dev dep):

Write to `/tmp/build-og.mjs`:

```js
import sharp from 'sharp';
import fs from 'fs';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#111111"/>
  <line x1="0" y1="80" x2="1200" y2="80" stroke="#5e5e5e" stroke-width="1"/>
  <line x1="0" y1="550" x2="1200" y2="550" stroke="#5e5e5e" stroke-width="1"/>
  <text x="40" y="50" font-family="monospace" font-size="14" fill="#5e5e5e">[REF: AC-2026-MINIMAL]</text>
  <text x="80" y="290" font-family="sans-serif" font-size="72" font-weight="700" fill="#CCCCCC">ALEJANDRO CASTRO</text>
  <text x="80" y="350" font-family="sans-serif" font-size="32" font-weight="600" fill="#13ecaf">AI RESEARCHER &amp; SYSTEMS ENGINEER</text>
  <text x="80" y="600" font-family="monospace" font-size="14" fill="#5e5e5e">alecastro.dev</text>
</svg>
`;

sharp(Buffer.from(svg)).png().toFile('public/og-default.png').then(() => {
    console.log('OG image created.');
});
```

Then run:

```bash
cd /home/ale/Dev/Personal/my-portfolio
node /tmp/build-og.mjs
```

- [ ] **Step 2: Verify the file exists and is a valid PNG**

```bash
file public/og-default.png
```

Expected: `public/og-default.png: PNG image data, 1200 x 630, 8-bit/color RGBA, non-interlaced`

- [ ] **Step 3: Verify it's served by the build**

```bash
pnpm build
file dist/og-default.png
```

Expected: prints the same `file` output for `dist/og-default.png`.

- [ ] **Step 4: Commit**

```bash
git add public/og-default.png
git commit -m "feat(seo): add placeholder OG image (1200x630 brutalist template)"
```

---

## Phase 4: Hero rewrite

### Task 4.1: Rewrite `src/sections/Hero.svelte` — cinematic intro

**Files:**
- Modify: `src/sections/Hero.svelte`

- [ ] **Step 1: Replace the file**

Write to `src/sections/Hero.svelte`:

```svelte
<script>
    import { onMount, onDestroy } from 'svelte';
    import { gsap } from 'gsap';
    import { prefersReducedMotion } from '../lib/motion-utils';
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import BuildTimestamp from '../components/BuildTimestamp.astro';

    let statusBar;
    let line1Wrapper;
    let line1;
    let line2Wrapper;
    let line2;
    let cursor;
    let subtitle;
    let chips;
    let scrollCue;
    let cursorTween;

    onMount(() => {
        if (prefersReducedMotion()) {
            // Skip all animation — set final state
            gsap.set([line1, line2, subtitle, statusBar, scrollCue, chips], { clearProps: 'all' });
            gsap.set([line1Wrapper, line2Wrapper], { clearProps: 'all' });
            return;
        }

        // Initial state
        gsap.set(statusBar, { opacity: 0 });
        gsap.set([line1Wrapper, line2Wrapper], { overflow: 'hidden' });
        gsap.set([line1, line2], { yPercent: 100 });
        gsap.set(subtitle, { opacity: 0, y: 8 });
        gsap.set(chips, { opacity: 0, y: 4 });
        gsap.set(scrollCue, { opacity: 0 });
        gsap.set(cursor, { opacity: 1 });

        const tl = gsap.timeline();

        // 1. Status bar fades in
        tl.to(statusBar, { opacity: 1, duration: 0.25, ease: 'power2.out' }, 0);

        // 2-3. Name slides up line by line
        tl.to(line1, { yPercent: 0, duration: 0.6, ease: 'power3.out' }, 0.15);
        tl.to(line2, { yPercent: 0, duration: 0.6, ease: 'power3.out' }, 0.3);

        // 4. Cursor blink (loop)
        cursorTween = gsap.to(cursor, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'none',
            delay: 0.9,
        });

        // 5. Subtitle
        tl.to(subtitle, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.7);

        // 6. Action chips with stagger
        tl.to(chips, { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out' }, 1.0);

        // 7. Scroll cue (with pulse loop afterwards)
        tl.to(scrollCue, { opacity: 0.7, duration: 0.4, ease: 'power2.out' }, 1.5);
        tl.to(scrollCue, {
            opacity: 0.3,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        }, 1.9);
    });

    onDestroy(() => {
        if (cursorTween) cursorTween.kill();
    });

    function openAbout() {
        if (typeof window !== 'undefined' && window.toggleAboutModal) {
            window.toggleAboutModal();
        }
    }
</script>

<section id="hero-section" class="relative">
    <div bind:this={statusBar} class="flex justify-between items-center font-mono text-[10px] tracking-widest uppercase text-brutalist-line mb-6">
        <SectionLabel number="01" label="HERO" />
        <BuildTimestamp />
    </div>

    <div class="border-l-4 border-brutalist-line pl-4 md:pl-8">
        <h1 class="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.95] mb-6 uppercase font-sans">
            <span bind:this={line1Wrapper} class="block overflow-hidden">
                <span bind:this={line1} class="block will-change-transform">ALEJANDRO</span>
            </span>
            <span bind:this={line2Wrapper} class="block overflow-hidden">
                <span bind:this={line2} class="block will-change-transform">
                    CASTRO<span bind:this={cursor} class="text-brutalist-accent">_</span>
                </span>
            </span>
        </h1>

        <p bind:this={subtitle} class="description max-w-lg font-mono text-xs md:text-sm leading-relaxed text-left text-brutalist-line/80 mb-8">
            [REF: AC-2026-MINIMAL] AI RESEARCHER &amp; SYSTEMS ENGINEERING STUDENT. FOCUSING ON REINFORCEMENT LEARNING, ALGORITHMS, AND SEARCH-BASED PLANNING.
        </p>

        <div bind:this={chips} class="flex flex-wrap gap-3 mb-12 font-mono text-xs">
            <a href="https://github.com/Alee053" target="_blank" rel="noopener noreferrer" class="px-3 py-2 border border-brutalist-line text-brutalist-text hover:border-brutalist-accent hover:text-brutalist-accent transition-colors">
                [GITHUB ↗]
            </a>
            <a href="https://www.linkedin.com/in/alejandrocastroalvarez/" target="_blank" rel="noopener noreferrer" class="px-3 py-2 border border-brutalist-line text-brutalist-text hover:border-brutalist-accent hover:text-brutalist-accent transition-colors">
                [LINKEDIN ↗]
            </a>
            <a href="mailto:alejandro@alecastro.dev" class="px-3 py-2 border border-brutalist-accent text-brutalist-accent hover:bg-brutalist-accent hover:text-black transition-colors">
                [EMAIL ↗]
            </a>
        </div>

        <div bind:this={scrollCue} class="font-mono text-[10px] tracking-widest uppercase text-brutalist-line/60">
            SCROLL ↓
        </div>
    </div>
</section>

<style>
    .description {
        word-break: keep-all;
    }
</style>
```

- [ ] **Step 2: Verify the build**

```bash
pnpm build
```

Expected: completes without errors.

- [ ] **Step 3: Visual check**

```bash
pnpm dev
```

Open `http://localhost:4321` and confirm:
- The hero runs the cinematic intro: status bar fades, name slides up line by line, cursor blinks, subtitle and chips appear, scroll cue pulses
- Total intro completes within ~2.5s
- The hero name is fully visible after the intro (no flash bug — the SSR-rendered final state is what shows until GSAP applies the "from" state on hydration)
- Toggling "Emulate prefers-reduced-motion" in DevTools shows the hero instantly with no animation, no blink

- [ ] **Step 4: Commit**

```bash
git add src/sections/Hero.svelte
git commit -m "feat(hero): cinematic intro with line-by-line slide, blinking cursor, scroll cue pulse"
```

---

## Phase 5: Modal a11y rewrite

### Task 5.1: Rewrite `src/components/BaseModal.svelte` — focus trap, ARIA, inert

**Files:**
- Modify: `src/components/BaseModal.svelte`

- [ ] **Step 1: Replace the file**

Write to `src/components/BaseModal.svelte`:

```svelte
<script>
    import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte';
    import { gsap } from 'gsap';
    import { prefersReducedMotion, createFocusTrap } from '../lib/motion-utils';

    export let title = '[MODAL]';
    export let eventName = 'toggle-modal';

    let modal;
    let backdrop;
    let isOpen = false;
    let trap = null;

    const dispatch = createEventDispatcher();

    function handleToggleEvent() { toggle(); }
    function handleCloseEvent() { if (isOpen) close(); }
    function handleBackdropClick() { if (isOpen) close(); }
    function handleBackdropKey(e) {
        if ((e.key === 'Enter' || e.key === ' ') && isOpen) {
            e.preventDefault();
            close();
        }
    }
    function handleKeydown(e) {
        if (e.key === 'Escape' && isOpen) close();
    }

    export async function open() {
        if (!modal || !backdrop) return;

        document.body.style.overflow = 'hidden';
        // Set inert on main
        const main = document.querySelector('main');
        if (main) main.setAttribute('inert', '');

        backdrop.style.pointerEvents = 'auto';

        const reduced = prefersReducedMotion();
        if (reduced) {
            gsap.set(backdrop, { opacity: 1 });
            gsap.set(modal, { x: '0%' });
        } else {
            gsap.to(backdrop, { opacity: 1, duration: 0.15, ease: 'none' });
            gsap.to(modal, { x: '0%', duration: 0.2, ease: 'power3.out' });
        }
        isOpen = true;
        dispatch('open');

        // Activate focus trap after the modal has had a frame to render
        await tick();
        trap = createFocusTrap(modal, close);
        trap.activate();
    }

    export function close() {
        if (!modal || !backdrop) return;

        document.body.style.overflow = '';
        const main = document.querySelector('main');
        if (main) main.removeAttribute('inert');

        if (trap) {
            trap.deactivate();
            trap = null;
        }

        const reduced = prefersReducedMotion();
        if (reduced) {
            gsap.set(backdrop, { opacity: 0 });
            gsap.set(modal, { x: '100%' });
        } else {
            gsap.to(backdrop, {
                opacity: 0,
                duration: 0.15,
                ease: 'none',
                onComplete: () => { backdrop.style.pointerEvents = 'none'; },
            });
            gsap.to(modal, { x: '100%', duration: 0.2, ease: 'power3.in' });
        }
        isOpen = false;
        dispatch('close');
    }

    export function toggle() { isOpen ? close() : open(); }

    onMount(() => {
        if (modal) gsap.set(modal, { x: '100%' });
        if (backdrop) gsap.set(backdrop, { opacity: 0 });
        document.addEventListener(eventName, handleToggleEvent);
        document.addEventListener(`close-${eventName}`, handleCloseEvent);
        document.addEventListener('keydown', handleKeydown);
    });

    onDestroy(() => {
        document.removeEventListener(eventName, handleToggleEvent);
        document.removeEventListener(`close-${eventName}`, handleCloseEvent);
        document.removeEventListener('keydown', handleKeydown);
        document.body.style.overflow = '';
        const main = document.querySelector('main');
        if (main) main.removeAttribute('inert');
    });
</script>

<div
    bind:this={backdrop}
    class="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
    on:click={handleBackdropClick}
    on:keydown={handleBackdropKey}
    role="button"
    tabindex="-1"
    aria-label="Close modal"
    style="opacity: 0; pointer-events: none;"
></div>

<aside
    bind:this={modal}
    class="fixed top-20 right-0 w-full h-[calc(100vh-5rem)] md:w-1/3 bg-brutalist-bg border-l border-brutalist-line z-50 p-10 flex flex-col shadow-2xl"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
>
    <div class="flex justify-between items-center mb-10">
        <div id="modal-title" class="text-[10px] font-mono">{title}</div>
        <button
            class="text-sm text-brutalist-line hover:text-brutalist-accent cursor-pointer font-mono transition-colors duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
            on:click={close}
            aria-label="Close dialog"
        >[X]</button>
    </div>

    <div class="flex-grow font-mono text-sm leading-relaxed overflow-y-auto pr-4">
        <slot />
    </div>
</aside>
```

- [ ] **Step 2: Verify the build**

```bash
pnpm build
```

Expected: completes without errors.

- [ ] **Step 3: Visual + a11y check**

```bash
pnpm dev
```

Open `http://localhost:4321`, click the `[ABOUT ME]` button to open the modal. Confirm:
- The modal slides in
- Tab cycles through the modal's focusable elements (does not leak to the page behind)
- Esc closes the modal
- After close, focus returns to the `[ABOUT ME]` button that triggered it
- The `<main>` content is hidden from the tab order while the modal is open
- Toggling `prefers-reduced-motion` makes the modal open/close instantly (no slide)

- [ ] **Step 4: Commit**

```bash
git add src/components/BaseModal.svelte
git commit -m "feat(a11y): modal role/aria/focus-trap/focus-restore/inert-on-main"
```

### Task 5.2: Update `AboutModal.svelte` — add Skills section + countup

**Files:**
- Modify: `src/components/AboutModal.svelte`

- [ ] **Step 1: Replace the file**

Write to `src/components/AboutModal.svelte`:

```svelte
<script>
    import { onMount, tick } from 'svelte';
    import BaseModal from './BaseModal.svelte';
    import { skillsByCategory } from '../lib/skills';
    import { countUp } from '../lib/motion-utils';

    const name = 'Alejandro Castro';
    const role = 'AI Researcher & Systems Engineering Student';
    const education = 'UCB San Pablo — Systems Engineering';
    const gpa = 'GPA: 3.8/4.0 (Full Scholarship)';
    const location = 'Cochabamba, Bolivia';
    const focus = 'Reinforcement Learning, Algorithms, Search-Based Planning';
    const interests = 'Sequential Decision Making, Bayesian Optimization, Uncertainty';

    let baseModal;
    let awardNumbers = [];

    async function startCountups() {
        await tick();
        for (const entry of awardNumbers) {
            countUp(entry.el, entry.value, 800);
        }
    }

    $: skillCategories = Object.keys(skillsByCategory);
</script>

<BaseModal bind:this={baseModal} title="[MODAL: ABOUT]" eventName="toggle-about-modal" on:open={startCountups}>
    <p class="mb-6">
        <span class="text-brutalist-line mr-2">// IDENTITY:</span>
        Computer Science undergraduate focused on reinforcement learning and algorithms.
    </p>

    <div class="space-y-6 mt-8">
        <div class="border-l-2 border-brutalist-accent pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[NAME]</div>
            <div class="text-white">{name}</div>
        </div>

        <div class="border-l-2 border-brutalist-line pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[ROLE]</div>
            <div class="text-brutalist-text">{role}</div>
        </div>

        <div class="border-l-2 border-brutalist-line pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[EDUCATION]</div>
            <div class="text-brutalist-text">{education}</div>
            <div class="text-[10px] text-zinc-500 mt-1">{gpa}</div>
        </div>

        <div class="border-l-2 border-brutalist-line pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[LOCATION]</div>
            <div class="text-brutalist-text">{location}</div>
        </div>

        <div class="border-l-2 border-brutalist-line pl-4">
            <div class="text-[10px] text-brutalist-line mb-1">[FOCUS]</div>
            <div class="text-brutalist-text">{focus}</div>
        </div>
    </div>

    <div class="mt-10">
        <div class="text-brutalist-line mb-4">[SKILLS]</div>
        <div class="space-y-3">
            {#each skillCategories as category}
                <div>
                    <div class="text-[10px] font-mono text-brutalist-line/80 uppercase tracking-widest mb-1">[{category}]</div>
                    <div class="flex flex-wrap gap-1">
                        {#each skillsByCategory[category] as skill}
                            <span class="px-2 py-0.5 text-[10px] font-mono border border-brutalist-line text-brutalist-text hover:border-brutalist-accent hover:text-brutalist-accent transition-colors">
                                [{skill.name.toUpperCase()}]
                            </span>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <div class="mt-10">
        <div class="text-brutalist-line mb-4">[AWARDS]</div>
        <div class="font-mono space-y-3">
            <div class="flex items-start gap-2">
                <span class="text-brutalist-accent">▸</span>
                <div>
                    <div class="text-zinc-400">IOI 2022 Representative</div>
                    <div class="text-zinc-600">Bolivia — International Olympiad in Informatics</div>
                </div>
            </div>
            <div class="flex items-start gap-2">
                <span class="text-brutalist-accent">▸</span>
                <div>
                    <div class="text-zinc-400">Conecta Mentora Fellow</div>
                    <div class="text-zinc-600">U.S. Embassy — Top <span bind:this={awardNumbers[0] = { value: 6, el: awardNumbers[0]?.el }}>0</span>% Selection</div>
                </div>
            </div>
            <div class="flex items-start gap-2">
                <span class="text-brutalist-accent">▸</span>
                <div>
                    <div class="text-zinc-400">Valedictorian</div>
                    <div class="text-zinc-600">Colegio San Agustín — Rank <span bind:this={awardNumbers[1] = { value: 1, el: awardNumbers[1]?.el }}>0</span>/<span bind:this={awardNumbers[2] = { value: 145, el: awardNumbers[2]?.el }}>0</span></div>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-10">
        <div class="text-brutalist-line mb-4">[RESEARCH INTERESTS]</div>
        <div class="font-mono text-zinc-500 space-y-1">
            <p>&gt; {interests}</p>
        </div>
    </div>
</BaseModal>
```

- [ ] **Step 2: Build and check**

```bash
pnpm build
```

Expected: completes. (The `bind:this` pattern used in the `awardNumbers` array is a known Svelte 5 gotcha — the array gets the element *after* the bind runs, so we read it on `tick` in `startCountups`. If you see the numbers stuck at `0`, the timing is off — adjust `startCountups` to use `setTimeout(..., 50)` instead of `tick`.)

- [ ] **Step 3: Visual check**

```bash
pnpm dev
```

Open the About modal. Confirm:
- Skills section appears below the focus paragraph, organized by category
- The 3 award numbers count from 0 to their value when the modal opens
- With `prefers-reduced-motion`, the numbers show their final value immediately

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutModal.svelte
git commit -m "feat(about): add Skills section and countup animations on award numbers"
```

### Task 5.3: Update `ContactModal.svelte` — hover state upgrade

**Files:**
- Modify: `src/components/ContactModal.svelte`

- [ ] **Step 1: Replace the link styling**

The current file is mostly fine. Replace the three link blocks so that on hover the link background fills with mint and the text inverts to black:

```svelte
<script>
    import BaseModal from './BaseModal.svelte';

    export let githubUrl = 'https://github.com/alejandrocastrodev';
    export let linkedInUrl = 'https://linkedin.com/in/alejandrocastrodev';
    export let email = 'alejandro.castro.0520@gmail.com';

    let baseModal;
</script>

<BaseModal bind:this={baseModal} title="[MODAL: CONTACT]" eventName="toggle-contact-modal">
    <p class="mb-6">
        <span class="text-brutalist-line mr-2">// CONNECT:</span>
        Get in touch through any of these channels.
    </p>

    <div class="space-y-3 mt-8">
        <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="group block p-4 border border-brutalist-line hover:bg-brutalist-accent hover:border-brutalist-accent transition-all duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
        >
            <div class="flex items-center gap-4">
                <span class="text-brutalist-line group-hover:text-black transition-colors">[GITHUB]</span>
                <span class="flex-grow border-b border-dashed border-brutalist-line group-hover:border-black transition-colors"></span>
                <span class="text-xs text-brutalist-line group-hover:text-black transition-colors">OPEN ↗</span>
            </div>
        </a>

        <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="group block p-4 border border-brutalist-line hover:bg-brutalist-accent hover:border-brutalist-accent transition-all duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
        >
            <div class="flex items-center gap-4">
                <span class="text-brutalist-line group-hover:text-black transition-colors">[LINKEDIN]</span>
                <span class="flex-grow border-b border-dashed border-brutalist-line group-hover:border-black transition-colors"></span>
                <span class="text-xs text-brutalist-line group-hover:text-black transition-colors">OPEN ↗</span>
            </div>
        </a>

        <a
            href="mailto:{email}"
            class="group block p-4 border border-brutalist-line hover:bg-brutalist-accent hover:border-brutalist-accent transition-all duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
        >
            <div class="flex items-center gap-4">
                <span class="text-brutalist-line group-hover:text-black transition-colors">[EMAIL]</span>
                <span class="flex-grow border-b border-dashed border-brutalist-line group-hover:border-black transition-colors"></span>
                <span class="text-xs text-brutalist-line group-hover:text-black transition-colors">SEND ↗</span>
            </div>
        </a>
    </div>

    <div class="mt-20">
        <div class="text-[10px] text-brutalist-line mb-4">[SYSTEM_STATUS]</div>
        <div class="text-[10px] font-mono text-zinc-600 space-y-1">
            <p>&gt; Connection ready...</p>
            <p>&gt; Channels verified</p>
            <p>&gt; Awaiting transmission</p>
        </div>
    </div>
</BaseModal>
```

- [ ] **Step 2: Build and check**

```bash
pnpm build
```

Expected: completes without errors.

- [ ] **Step 3: Visual check**

```bash
pnpm dev
```

Open the Contact modal. Confirm:
- Hovering each link fills the background with mint and inverts the text to black
- Focus-visible shows a mint outline

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactModal.svelte
git commit -m "feat(contact): mint hover background with text inversion; focus-visible outline"
```

---

## Phase 6: Row a11y rewrites

### Task 6.1: Rewrite `ProjectRow.svelte` — stretched link pattern

**Files:**
- Modify: `src/components/subcomponents/ProjectRow.svelte`

- [ ] **Step 1: Replace the file**

Write to `src/components/subcomponents/ProjectRow.svelte`:

```svelte
<script>
    export let project;
    export let index;

    $: name = project.data?.name || project.name;
    $: subtitle = project.data?.subtitle || project.subtitle || '';
    $: tags = project.data?.tags || project.tags || [];
    $: repo_url = project.data?.repo_url || project.repo_url || '';
    $: blog_slug = project.data?.blog_slug || project.blog_slug || '';
    $: demo_url = project.data?.demo_url || project.demo_url || '';
    $: primary_url = repo_url || demo_url || (blog_slug ? `/blog/${blog_slug}` : null);

    $: hasLinks = repo_url || blog_slug || demo_url;
    $: isExternal = (url) => url?.startsWith('http');
</script>

<div
    class="row group relative grid grid-cols-1 md:grid-cols-12 py-4 md:py-6 border-b border-dashed border-brutalist-line hover:bg-[rgba(19,236,175,0.04)] hover:border-brutalist-accent transition-colors gap-3 md:gap-0"
>
    <div class="font-mono text-xs text-brutalist-line md:col-span-1 mb-1 md:mb-0">{String(index + 1).padStart(2, '0')}.</div>
    <div class="md:col-span-7">
        <h3 class="text-lg md:text-xl font-bold uppercase group-hover:text-brutalist-accent transition-colors">
            {name}
        </h3>
        <p class="text-xs font-mono text-zinc-500 mt-1">{subtitle}</p>
    </div>
    <div class="md:col-span-4 md:text-right">
        <div class="flex flex-wrap md:justify-end gap-1 mb-2 font-mono text-[10px]">
            {#if tags}
                {#each tags as tag}
                    <span class="px-2 py-0.5 border border-brutalist-line group-hover:border-brutalist-accent">[ {tag.toUpperCase()} ]</span>
                {/each}
            {/if}
        </div>
        {#if hasLinks}
            <div class="flex flex-wrap md:justify-end gap-2 font-mono text-[10px] relative z-[1]">
                {#if repo_url}
                    <a
                        href={repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-2 py-1 transition-colors min-h-[44px] md:min-h-0 flex items-center bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
                    >
                        GITHUB ↗
                    </a>
                {/if}
                {#if blog_slug}
                    <a
                        href="/blog/{blog_slug}"
                        class="px-2 py-1 transition-colors min-h-[44px] md:min-h-0 flex items-center bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
                    >
                        ARTICLE
                    </a>
                {/if}
                {#if demo_url}
                    <a
                        href={demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-2 py-1 transition-colors min-h-[44px] md:min-h-0 flex items-center bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
                    >
                        LIVE_DEMO ↗
                    </a>
                {/if}
            </div>
        {/if}
    </div>

    {#if primary_url}
        <a
            href={primary_url}
            target={isExternal(primary_url) ? '_blank' : undefined}
            rel={isExternal(primary_url) ? 'noopener noreferrer' : undefined}
            class="absolute inset-0 z-0"
            aria-label={`Open ${name}`}
        >
            <span class="sr-only">Open {name}</span>
        </a>
    {/if}
</div>

<style>
    .row :global(a) {
        position: relative;
        z-index: 1;
    }
</style>
```

- [ ] **Step 2: Build and check**

```bash
pnpm build
```

Expected: completes without errors.

- [ ] **Step 3: Visual + a11y check**

```bash
pnpm dev
```

Open `http://localhost:4321`. Confirm:
- The entire project row is clickable (anywhere on the row) and goes to the project URL
- The GitHub/Article/Live Demo buttons still work as separate links (they sit above the stretched link via `z-index`)
- Tabbing through the page reaches the row link and the secondary links
- Pressing Enter on the row link navigates correctly
- The visual hover state (background, border) still applies to the whole row

- [ ] **Step 4: Commit**

```bash
git add src/components/subcomponents/ProjectRow.svelte
git commit -m "feat(a11y): ProjectRow uses stretched-link pattern, no role=button workaround"
```

### Task 6.2: Rewrite `BlogRow.svelte` — single `<a>` wrapper

**Files:**
- Modify: `src/components/subcomponents/BlogRow.svelte`

- [ ] **Step 1: Replace the file**

Write to `src/components/subcomponents/BlogRow.svelte`:

```svelte
<script>
    export let blog;
    export let index;

    $: title = blog.data?.title || blog.title;
    $: description = blog.data?.description || blog.description;
    $: date = blog.data?.date || blog.date;
    $: slug = blog.slug;
</script>

<a
    href="/blog/{slug}"
    class="row group grid grid-cols-1 md:grid-cols-12 py-4 md:py-6 border-b border-dashed border-brutalist-line hover:bg-[rgba(19,236,175,0.04)] hover:border-brutalist-accent transition-colors gap-2 md:gap-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
>
    <div class="font-mono text-[10px] md:text-[11px] text-zinc-500 md:col-span-1">{new Date(date).toISOString().slice(0, 10)}</div>
    <div class="md:col-span-11">
        <h3 class="text-base md:text-lg font-bold uppercase group-hover:text-brutalist-accent transition-colors group-focus-visible:text-brutalist-accent">
            {title}
        </h3>
        <p class="text-xs font-mono text-zinc-400 mt-1 max-w-2xl">
            {description?.slice(0, 100)}{description?.length > 100 ? '…' : ''}
        </p>
    </div>
</a>
```

- [ ] **Step 2: Build and check**

```bash
pnpm build
```

Expected: completes without errors.

- [ ] **Step 3: Visual + a11y check**

```bash
pnpm dev
```

Confirm:
- Clicking anywhere on a blog row navigates to `/blog/{slug}`
- Tabbing reaches the link
- Pressing Enter on the link navigates
- Focus-visible shows a mint outline
- The hover state still applies

- [ ] **Step 4: Commit**

```bash
git add src/components/subcomponents/BlogRow.svelte
git commit -m "feat(a11y): BlogRow is a real <a> element with hover and focus styles"
```

---

## Phase 7: Browser focus rings + scroll reveal

### Task 7.1: Restore focus styles on search inputs in `ProjectsBrowser.svelte`

**Files:**
- Modify: `src/components/ProjectsBrowser.svelte`

- [ ] **Step 1: Read the current file**

```bash
cat src/components/ProjectsBrowser.svelte
```

- [ ] **Step 2: Edit the search input element**

Find the `<input>` element with `focus:ring-0 focus:outline-none` and replace it with:

```svelte
            <input
                type="text"
                bind:value={searchQuery}
                class="bg-transparent border-none focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2 text-sm p-0 flex-1 font-mono uppercase min-w-0 md:min-w-[200px] text-white"
                placeholder="_"
                aria-label="Search projects"
            />
```

- [ ] **Step 3: Add scroll reveal to the result list**

Find the `{#each filteredProjects as project, index (project.name)}` block and wrap it in a `<div use:reveal={{ variant: 'stagger' }}>` so each row fades in on first render and on filter change. Import the action first:

At the top of the `<script>` block, add:

```js
    import { reveal } from '../lib/reveal';
```

Then wrap the results list:

```svelte
        {#if filteredProjects.length === 0}
            <div class="py-8 text-center text-zinc-500 font-mono text-sm">
                {#if searchQuery || activeTags.length > 0}
                    NO_PROJECTS_MATCH_FILTERS
                {:else}
                    NO_PROJECTS_FOUND
                {/if}
            </div>
        {:else}
            <div use:reveal={{ variant: 'stagger' }} class="contents">
                {#key activeFilterCount}
                    {#each filteredProjects as project, index (project.name)}
                        <ProjectRow {project} {index} />
                    {/each}
                {/key}
            </div>
        {/if}
```

Note: `class="contents"` makes the wrapper a layout-transparent container so the grid styling on `ProjectRow` still works.

- [ ] **Step 4: Build and check**

```bash
pnpm build
```

Expected: completes. If Svelte complains about `class="contents"` not being a known attribute, switch to a normal `<div>` and add a CSS reset.

- [ ] **Step 5: Visual + a11y check**

```bash
pnpm dev
```

Open `/projects`. Confirm:
- Tabbing into the search input shows a mint outline
- The projects fade in on initial load
- Changing the search or filter re-triggers the fade-in animation

- [ ] **Step 6: Commit**

```bash
git add src/components/ProjectsBrowser.svelte
git commit -m "feat(a11y/anim): focus ring on search input; scroll-reveal stagger on rows"
```

### Task 7.2: Same fixes for `BlogsBrowser.svelte`

**Files:**
- Modify: `src/components/BlogsBrowser.svelte`

- [ ] **Step 1: Apply the same changes to `BlogsBrowser.svelte`**

Mirror the edits from Task 7.1:
- Add `import { reveal } from '../lib/reveal';` at the top of the script
- Update the search input's class to include the focus-visible outline
- Wrap the blog results list in `<div use:reveal={{ variant: 'stagger' }} class="contents">{#key activeFilterCount}...</div>`

- [ ] **Step 2: Build and check**

```bash
pnpm build
```

- [ ] **Step 3: Visual check**

```bash
pnpm dev
```

Open `/blogs`. Confirm:
- Search input has mint focus outline
- Blog rows fade in on initial load and on filter change

- [ ] **Step 4: Commit**

```bash
git add src/components/BlogsBrowser.svelte
git commit -m "feat(a11y/anim): focus ring on search input; scroll-reveal stagger on rows"
```

---

## Phase 8: Scroll reveal on homepage sections

### Task 8.1: Add `data-reveal` to `Projects.svelte` and `Blogs.svelte` homepage sections

**Files:**
- Modify: `src/sections/Projects.svelte`
- Modify: `src/sections/Blogs.svelte`

- [ ] **Step 1: Read `Projects.svelte` and `Blogs.svelte`**

```bash
cat src/sections/Projects.svelte
cat src/sections/Blogs.svelte
```

- [ ] **Step 2: Update `Projects.svelte`**

At the top of the script, add:

```js
    import { reveal } from '../lib/reveal';
```

Wrap the row list in `use:reveal={{ variant: 'stagger' }}` and the section header in `use:reveal={{ variant: 'rise' }}`. The file should look like:

```svelte
<script>
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import ProjectRow from '../components/subcomponents/ProjectRow.svelte';
    import { reveal } from '../lib/reveal';

    export let projects = [];
</script>

<section id="projects-section" class="mt-32 pb-32">
    <div use:reveal={{ variant: 'rise' }}>
        <a href="/projects" class="flex justify-between items-end mb-12 group cursor-pointer">
            <div>
                <SectionLabel number="02" label="RECENT_WORK" />
                <h2 class="text-4xl font-light uppercase tracking-widest group-hover:text-brutalist-accent transition-colors">Projects</h2>
            </div>
            <span class="text-xs font-mono group-hover:text-brutalist-accent text-white transition-colors">[VIEW ALL]</span>
        </a>
    </div>
    <div use:reveal={{ variant: 'stagger' }} class="border-t border-brutalist-line">
        {#each projects as project, index}
            <ProjectRow {project} {index} />
        {/each}
    </div>
</section>
```

- [ ] **Step 3: Update `Blogs.svelte` similarly**

Same pattern: import `reveal`, wrap header in `rise`, wrap row list in `stagger`.

- [ ] **Step 4: Build and check**

```bash
pnpm build
```

- [ ] **Step 5: Visual check**

```bash
pnpm dev
```

Open `http://localhost:4321`. Scroll down past the hero. Confirm:
- The Projects section header rises into view
- Each project row staggers in
- The Blogs section below also reveals

- [ ] **Step 6: Commit**

```bash
git add src/sections/Projects.svelte src/sections/Blogs.svelte
git commit -m "feat(anim): scroll-reveal stagger on homepage section rows"
```

---

## Phase 9: Polish

### Task 9.1: Bump `[REF: ...]` opacity in `Navbar.svelte` to 0.6

**Files:**
- Modify: `src/components/Navbar.svelte`

- [ ] **Step 1: Find the two `[REF: AC-2026-MINIMAL]` lines**

```bash
rg -n "REF: AC-2026-MINIMAL" src/components/Navbar.svelte
```

Expected: two matches — one in the mobile sidebar, one in the desktop header.

- [ ] **Step 2: Replace the wrapping `<div class="text-[10px] font-mono ...">` styles**

Change the wrapping div in both places to add `text-brutalist-line/60`:

The class becomes: `text-[10px] font-mono tracking-widest uppercase text-brutalist-line/60`.

(Use the exact same wrapper class for both occurrences.)

- [ ] **Step 3: Build and check**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.svelte
git commit -m "polish: bump [REF: ...] opacity from 0.5 to 0.6"
```

### Task 9.2: Add global focus-visible styles

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Append the global focus styles**

Append to `src/styles/globals.css`:

```css
/* Global focus-visible for any element that doesn't define its own */
:focus-visible {
    outline: 1px solid var(--color-brutalist-accent);
    outline-offset: 2px;
}

/* Buttons reset focus styles to inherit from the global rule above */
button:focus-visible,
a:focus-visible {
    outline: 1px solid var(--color-brutalist-accent);
    outline-offset: 2px;
}
```

> **Note**: most interactive elements in the codebase already have explicit `focus-visible:outline` declarations. The global rule is a safety net.

- [ ] **Step 2: Build and check**

```bash
pnpm build
```

- [ ] **Step 3: Tab through the site and confirm every focusable element has a visible mint outline**

- [ ] **Step 4: Commit**

```bash
git add src/styles/globals.css
git commit -m "polish: global focus-visible mint outline"
```

### Task 9.3: Bump section label contrast (`decoration-label` class)

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Update the `.decoration-label` class**

Find the existing rule:

```css
.decoration-label {
    color: var(--color-brutalist-line);
    opacity: 0.5;
    cursor: default;
    user-select: none;
}
```

Replace with:

```css
.decoration-label {
    color: var(--color-brutalist-text);
    opacity: 0.8;
    font-weight: 500;
    cursor: default;
    user-select: none;
}
```

- [ ] **Step 2: Build and check**

```bash
pnpm build
```

- [ ] **Step 3: Visual check**

Confirm section labels like `[SEC 01 // HERO]` are now more readable (0.8 opacity on `--brutalist-text`).

- [ ] **Step 4: Commit**

```bash
git add src/styles/globals.css
git commit -m "polish: bump section-label contrast (0.5 -> 0.8 opacity, text color, weight)"
```

### Task 9.4: Delete dead files

**Files:**
- Delete: `src/components/Background.svelte`
- Delete: `src/components/LoadingScreen.svelte`
- Delete: `src/lib/ProjectData.js`
- Delete: `src/lib/cloudinary.js`

- [ ] **Step 1: Verify the files are unused**

```bash
rg -l "Background.svelte|LoadingScreen.svelte|ProjectData|cloudinary" src/
```

Expected: only the files themselves show up (or nothing).

- [ ] **Step 2: Delete the files**

```bash
git rm src/components/Background.svelte src/components/LoadingScreen.svelte src/lib/ProjectData.js src/lib/cloudinary.js
```

- [ ] **Step 3: Build and confirm no errors**

```bash
pnpm build
```

Expected: completes. If any file imported one of these, the build will fail and you'll need to remove those imports first.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: remove dead Background, LoadingScreen, ProjectData, cloudinary"
```

### Task 9.5: Remove Cloudinary image domain (no longer used in source)

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step 1: Check if Cloudinary is still referenced**

```bash
rg -n "cloudinary" src/ public/ astro.config.mjs 2>&1
```

Expected: only matches in `public/admin/config.yml` (Decap CMS) and possibly `astro.config.mjs`.

- [ ] **Step 2: Remove the `image.domains` line from `astro.config.mjs` if no source code uses it**

Edit `astro.config.mjs` to remove the `image: { domains: [...] }` block. The config becomes:

```js
// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import decapCmsOauth from 'astro-decap-cms-oauth';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
    site: 'https://alecastro.dev',
    integrations: [svelte(), decapCmsOauth(), sitemap()],
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        shikiConfig: {
            theme: 'github-dark',
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: vercel(),
});
```

- [ ] **Step 3: Build**

```bash
pnpm build
```

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs
git commit -m "chore: remove unused Cloudinary image domain"
```

> **Note**: If Decap CMS is actively used, leave the `image.domains` line — Cloudinary's media library is referenced from `public/admin/config.yml`. Add it back if needed.

---

## Phase 10: README + verification

### Task 10.1: Update `README.md` to remove unimplemented claims

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Read the current README**

```bash
cat README.md
```

- [ ] **Step 2: Remove or correct these claims**

Search for and remove or rewrite:
- Any mention of "scroll-driven animation" (the hero is not scroll-driven)
- Any mention of "physics-based project gallery" using Matter.js
- Any mention of "ProjectsDesktop vs ProjectsMobile switcher"

- [ ] **Step 3: Add a reference to the design spec**

Append to the README:

```markdown
## Design

This implementation is governed by [the polished-pass design spec](docs/superpowers/specs/2026-06-21-portfolio-polished-pass-design.md). See that document for the rationale behind visual, motion, accessibility, and SEO decisions.
```

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: remove unimplemented feature claims; reference design spec"
```

### Task 10.2: Add `scripts/check-a11y.mjs` and wire `pnpm check:a11y`

**Files:**
- Create: `scripts/check-a11y.mjs`
- Modify: `package.json` (already has the script in Task 1.3)

- [ ] **Step 1: Install `@axe-core/cli` as a dev dependency**

```bash
pnpm add -D @axe-core/cli
```

- [ ] **Step 2: Create the script**

Write to `scripts/check-a11y.mjs`:

```js
#!/usr/bin/env node
// scripts/check-a11y.mjs
// Runs axe-core against the built dist/ directory. Fails the build on any
// serious or critical violations.

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
if (!existsSync(distDir)) {
    console.error('[check-a11y] dist/ not found. Run `pnpm build` first.');
    process.exit(1);
}

console.log('[check-a11y] Running axe-core against dist/ ...');
try {
    execSync('npx axe dist --exit', { stdio: 'inherit' });
    console.log('[check-a11y] ✓ No serious or critical violations.');
} catch (e) {
    console.error('[check-a11y] ✗ Violations found. See output above.');
    process.exit(1);
}
```

- [ ] **Step 3: Test the script**

```bash
pnpm build
pnpm check:a11y
```

Expected: either `✓ No serious or critical violations.` (success) or a list of violations you need to address by re-running the prior tasks. (If `@axe-core/cli`'s `dist` crawler mode is too restrictive, the script is still a useful scaffolding — you can replace the inner `execSync` with a custom Playwright/headless test later.)

- [ ] **Step 4: Commit**

```bash
git add scripts/check-a11y.mjs package.json pnpm-lock.yaml
git commit -m "test(a11y): add scripts/check-a11y.mjs wired to pnpm check:a11y"
```

### Task 10.3: Run the full verification checklist

- [ ] **Step 1: Build**

```bash
pnpm build
```

Expected: 0 errors. Warnings about deprecations are OK.

- [ ] **Step 2: Type-check**

```bash
pnpm check
```

Expected: 0 errors.

- [ ] **Step 3: A11y check**

```bash
pnpm check:a11y
```

Expected: 0 serious/critical violations.

- [ ] **Step 4: Manual a11y walkthrough**

```bash
pnpm dev
```

Open `http://localhost:4321` in a browser. Then:
- Press `Tab` repeatedly. Every interactive element gets a visible mint focus ring.
- Press Tab to reach the "Skip to content" link at the top. Press Enter. The page jumps to `<main>`.
- Click `[ABOUT ME]`. The modal opens, slides in, focus is on the close button.
- Press Tab. Focus cycles through the modal content, never reaching the page behind.
- Press Esc. The modal closes; focus returns to `[ABOUT ME]`.
- Repeat with the Contact modal.
- Open DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Refresh. The hero appears instantly with no animation, no cursor blink, no scroll reveals.

- [ ] **Step 5: Visual regression screenshots**

Use a screenshot tool (or manual):
- Screenshot the homepage at 1440×900, 768×1024, 375×812.
- Confirm the blueprint grid is visible at all three sizes.
- Confirm the hero doesn't overflow on mobile.
- Confirm the action chips wrap cleanly.

- [ ] **Step 6: Animation timing**

With the dev server running, time the hero intro from page load to its final state. It should complete within 2.5 seconds.

- [ ] **Step 7: SEO spot-check**

```bash
pnpm build
ls dist/sitemap-index.xml dist/sitemap-0.xml dist/robots.txt dist/og-default.png dist/404.html
rg -A 1 'name="description"' dist/index.html | head -5
rg -A 2 'application/ld\+json' dist/index.html | head -20
```

Expected: all files present, meta description and JSON-LD printed.

- [ ] **Step 8: Bundle delta**

```bash
pnpm build
du -sh dist/
ls -la dist/_astro/*.js | head -5
```

Expected: `dist/` total is not significantly larger than the pre-pass baseline (~412KB). The 72KB index chunk should grow by ~13KB to accommodate `ScrollTrigger`.

- [ ] **Step 9: Final commit (if anything was missed)**

```bash
git status
```

If there are uncommitted changes:

```bash
git add -A
git commit -m "chore: post-implementation cleanup"
```

If clean: no commit needed.

- [ ] **Step 10: Push the branch**

```bash
git push -u origin feature/portfolio-polished-pass
```

Expected: branch pushed; ready for review or merge.

---

## Self-review

**1. Spec coverage** — each spec section is implemented by at least one task:

| Spec section | Tasks |
|---|---|
| §1.1 Palette | Task 1.3 (theme tokens preserved) |
| §1.2 Typography | Task 3.2 (font weights/spacing in existing CSS) |
| §1.3 Signature blueprint grid | Tasks 3.2, 2.4 |
| §1.4 Decoration cuts | Tasks 3.2 (footer year), 2.5 (BuildTimestamp), 1.3 (gray squares removed) |
| §1.5 What stays | (intentional, no task) |
| §2.1 Hero cinematic intro | Task 4.1 |
| §2.2 Scroll reveal | Tasks 2.2, 2.4, 7.1, 7.2, 8.1 |
| §2.3 Where reveals apply | Tasks 7.1, 7.2, 8.1 |
| §2.4 Countup | Tasks 2.1, 5.2 |
| §2.5 Micro-interactions | Tasks 6.1, 6.2, 9.2 |
| §2.6 Reduced motion | Tasks 2.1, 2.4, 4.1, 5.1 |
| §2.7 Bundle impact | (verified in Task 10.3) |
| §3.1 BaseLayout | Task 3.2 |
| §3.2 SEO.astro | Task 3.1 |
| §3.3 404.astro | Task 3.4 |
| §3.4 astro.config | Task 1.4 |
| §3.5 robots.txt | Task 3.5 |
| §3.6 og-default.png | Task 3.6 |
| §3.7 Page meta | Task 3.3 |
| §3.8 Hero.svelte | Task 4.1 |
| §3.9 AboutModal | Task 5.2 |
| §3.10 skills.ts | Task 2.3 |
| §3.11 BaseModal | Task 5.1 |
| §3.12 ContactModal | Task 5.3 |
| §3.13 Navbar | Task 9.1 |
| §3.14 ProjectRow / BlogRow | Tasks 6.1, 6.2 |
| §3.15 Browsers | Tasks 7.1, 7.2 |
| §3.16 Homepage sections | Task 8.1 |
| §3.17 BuildTimestamp | Task 2.5 |
| §3.18 Dead code removed | Tasks 1.3, 9.4 |
| §3.19 Kept | (Decap + Cloudinary — flagged for user) |
| §3.20 Lockfile & DX | Tasks 1.2, 1.3 |
| §3.21 Hydration | Tasks 3.3, 4.1 (Hero stays load) |
| §3.22 README | Task 10.1 |
| §4.1 A11y | Tasks 5.1, 6.1, 6.2, 7.1, 7.2, 9.2, 10.3 |
| §4.2 SEO | Tasks 3.1, 3.3, 3.4, 3.5, 3.6 |
| §4.3 Performance | (verified in Task 10.3) |
| §4.4 Testing | Task 10.2, 10.3 |

**2. Placeholder scan** — none. Every step has explicit content.

**3. Type consistency** — `prefersReducedMotion`, `createFocusTrap`, `countUp` are defined in `motion-utils.ts` and used consistently. `reveal` action signature matches between `reveal.ts` and the Svelte action contract. `skillsByCategory` shape is consistent. `BuildTimestamp` is referenced as a single component everywhere. The `awardNumbers` array pattern in `AboutModal.svelte` (Task 5.2) is intentional but unusual — flagged in the task for the implementer to watch for timing issues.

**4. Open questions carried forward from the spec**:
- Cloudinary kept (flagged in §3.19) — Task 9.5 makes removal safe but reversible.
- The `package-lock.json` → `pnpm-lock.yaml` migration could break npm-based CI (flagged in spec §6.5).
- The OG image is a template (flagged in §3.6) — hand-designed card is a future spec.

---

## Summary

- **42 tasks** across **10 phases**
- **New files**: `src/lib/motion-utils.ts`, `src/lib/reveal.ts`, `src/lib/skills.ts`, `src/components/BuildTimestamp.astro`, `src/components/SEO.astro`, `src/pages/404.astro`, `public/robots.txt`, `public/og-default.png`, `scripts/check-a11y.mjs`
- **Modified files**: `package.json`, `astro.config.mjs`, `.gitignore`, `src/layouts/BaseLayout.astro`, `src/styles/globals.css`, `src/sections/Hero.svelte`, `src/sections/Projects.svelte`, `src/sections/Blogs.svelte`, `src/components/BaseModal.svelte`, `src/components/AboutModal.svelte`, `src/components/ContactModal.svelte`, `src/components/Navbar.svelte`, `src/components/ProjectsBrowser.svelte`, `src/components/BlogsBrowser.svelte`, `src/components/subcomponents/ProjectRow.svelte`, `src/components/subcomponents/BlogRow.svelte`, `src/pages/index.astro`, `src/pages/projects.astro`, `src/pages/blogs.astro`, `src/pages/blog/[slug].astro`, `README.md`
- **Deleted files**: `src/components/Background.svelte`, `src/components/LoadingScreen.svelte`, `src/components/LiveTimestamp.svelte`, `src/lib/ProjectData.js`, `src/lib/cloudinary.js`, `package-lock.json` (kept `pnpm-lock.yaml`)
- **Removed deps**: `matter-js`, `@vercel/analytics`, `@vercel/speed-insights`, `unplugin-icons`, `@iconify/json`
- **Added deps**: `@astrojs/sitemap`, `@axe-core/cli`
- **Expected bundle delta**: +13KB gzipped (ScrollTrigger plugin)
- **Expected runtime behavior**: cinematic hero, scroll-revealed sections, focus-trapped modals, mint focus rings everywhere, SEO/OG/JSON-LD on every page, working 404 and sitemap, no dead code
