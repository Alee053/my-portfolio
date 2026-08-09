# Portfolio Glass Lab Redesign - Design

**Date**: 2026-08-08
**Status**: Approved in chat
**Scope**: Visual and interaction redesign of the existing portfolio. Preserve content, routes, data flow, and core UX.

## Context

The portfolio is an Astro 5 + Svelte 5 + Tailwind CSS v4 site for Alejandro Castro, an AI researcher and systems engineering student. It currently uses a dark, terminal-inspired brutalist system with a blueprint grid, square controls, monospace annotations, GSAP entry motion, filterable project/blog browsers, Astro view transitions, and accessible side-panel modals.

The redesign should make the site more distinctive and contemporary without turning the research content into decoration. The existing behavior is already direct: scroll through the homepage, click a project or article, filter the full browsers, and use About/Contact from the navigation. That behavior is part of the product and remains unchanged.

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Visual direction | Glass Lab | Teal/blue atmosphere, restrained glass, and tactile interaction fit a technical research portfolio. |
| Surface intensity | Content first | Glass and gradients are limited to navigation, hero, cards, filters, and modals. Reading surfaces stay stable and opaque. |
| Brutalist identity | Micro-signature | Keep section numbering, selected monospace labels, and sparse technical metadata; remove the repeated terminal vocabulary from every control. |
| Motion | Smooth transition | Use short fades, small translations, and restrained hover states rather than cinematic or continuous motion. |
| Initial load | Refined splash | Keep the boot sequence as a brief “lab initialization” transition, capped at about 1.2 seconds. |
| Content | Unchanged | Do not rewrite names, descriptions, tags, dates, links, articles, or collection schemas. |
| Implementation | Component refresh | Recompose the existing Astro/Svelte components while keeping their interfaces and route contracts. |

## 1. Visual System

### 1.1 Color and surfaces

The page uses an ink-black base with teal and blue light sources. The exact tokens may be tuned during implementation, but their roles are fixed:

- **Ink background**: near-black teal for the page and article chrome.
- **Primary surface**: translucent deep teal for glass panels.
- **Strong surface**: mostly opaque teal-black for dense content and fallbacks.
- **Primary text**: pale green-white with high contrast.
- **Muted text**: desaturated blue-gray for descriptions and metadata.
- **Structural line**: low-opacity cyan/teal for borders and separators.
- **Mint accent**: primary interactive color.
- **Cyan accent**: secondary gradient endpoint and focus highlight.

Ambient gradients are radial and positioned behind content. They provide atmosphere without placing bright color beneath paragraphs. Glass panels use a translucent fill, a thin light border, and limited `backdrop-filter: blur(...)`. Every glass surface has an opaque fallback for browsers without backdrop-filter support.

The global square-corner rule is removed. Rounded corners are reserved for intentional surfaces and controls, generally in the 16-24px range. Text, dividers, and article code blocks remain visually disciplined rather than becoming rounded cards.

### 1.2 Typography and identity

- Space Grotesk remains the display and interface font.
- IBM Plex Serif remains the article body font for long-form technical reading.
- Liberation Mono remains the metadata and annotation font.
- Headings become less uniformly uppercase and use stronger size/weight contrast.
- `[SEC 01]`, compact research metadata, and a small number of system labels remain as the brutalist signature.
- Buttons and navigation use plain readable labels instead of wrapping every action in brackets.

### 1.3 Responsive behavior

Desktop may use split hero composition and multi-column project cards. Mobile collapses to one readable column, keeps the same reading order, preserves direct hit areas, and never requires horizontal scrolling. Buttons and filters retain at least 44px touch targets.

## 2. Page and Component Design

### 2.1 Shared layout and navigation

`BaseLayout.astro` owns the ink background, ambient gradient layer, skip link, page shell, footer, modals, and view-transition lifecycle. The background decoration stays pointer-events-free and does not sit above content.

`Navbar.svelte` becomes a sticky translucent bar with the existing identity/timestamp content and simple links. The mobile drawer remains a right-side panel with a blurred backdrop, keyboard Escape handling, body-scroll restoration, and the existing About/Contact actions.

### 2.2 Homepage

`Hero.svelte` keeps the current name, role description, and GitHub/LinkedIn/email links. Its new composition uses a large display name alongside a restrained research-signal surface built only from existing profile information. The action links become capsule-like controls, and the scroll cue becomes a small ambient guide.

`Projects.svelte` and `Blogs.svelte` retain their section order, section numbering, view-all links, and props. Their rows are visually reworked into compact glass cards/panels so the page has depth beyond horizontal rules. The primary project action still covers the card while GitHub, article, and demo links remain independent controls above the hit area. Blog cards remain one-click links to the article.

### 2.3 Full browsers

`ProjectsBrowser.svelte` and `BlogsBrowser.svelte` retain search, tag filters, sorting, active-filter counts, clear controls, empty states, and list ordering. Controls become glass inputs/chips with clear focus states. The visual language is shared, but the components remain separate to avoid an unrelated abstraction.

### 2.4 Blog articles

`src/pages/blog/[slug].astro` gets a glass article header and a stable, opaque reading surface. The article content continues to use IBM Plex Serif, with readable links, headings, images, code blocks, tables, KaTeX, and the existing copy buttons. The table of contents remains inline on small screens and sticky in a separate panel on large screens. The back-to-browser action keeps its current destination and behavior.

### 2.5 Modals and splash

`BaseModal.svelte`, About, and Contact retain their dialog semantics, focus trap, focus restoration, Escape behavior, and backdrop close. The panel becomes a translucent side surface with a stable opaque content layer where needed.

`Splash.astro` keeps the first-visit boot concept but changes its treatment to a short lab-initialization overlay: teal glow, sparse status lines, and a hard upper bound around 1.2 seconds. Reduced-motion users skip the animated overlay and see the page immediately.

## 3. Motion Contract

All movement is optional polish, not a dependency for understanding or activating content.

| Interaction | Motion |
|---|---|
| Initial hero | Short opacity and translate-in sequence with no layout shift. |
| Scroll reveal | One-time opacity and 12-16px rise for sections/cards. |
| Card hover | Small elevation, border tint, and restrained glow; no perpetual floating. |
| Browser/article navigation | Fade plus small translate/scale over roughly 180-300ms through Astro view transitions. |
| Modal open/close | Backdrop fade and short side-panel movement, preserving current focus behavior. |
| Filtering | Update results in place; avoid disruptive page movement. |

`prefers-reduced-motion: reduce` disables the splash animation, scroll reveals, cursor blink, animated glow, and view-transition motion. Final states remain visible. GSAP may continue to power existing interaction code, but transforms and opacity are the only animated layout-safe properties.

## 4. Data Flow and Boundaries

The data path remains:

```text
Astro content collections -> page data mapping -> Svelte props -> rows/cards and controls
```

No collection schema, frontmatter field, route, link destination, or CMS workflow changes. Existing project primary/secondary-link behavior, blog slugs, tag filtering, date sorting, and empty states are acceptance requirements.

The redesign should not add network dependencies. Google font loading remains the only existing external visual dependency. CSS feature fallbacks must provide readable opaque surfaces when blur or advanced color functions are unavailable.

## 5. Accessibility and Performance

- Preserve semantic landmarks, skip-to-content behavior, dialog roles, focus trap, focus restoration, and keyboard Escape behavior.
- Keep visible `:focus-visible` rings with sufficient contrast against every surface.
- Verify text contrast on the ink background and opaque article surfaces; decorative glows never carry meaning.
- Do not hide content behind JavaScript-only reveal states. If JavaScript or IntersectionObserver is unavailable, content is immediately visible.
- Limit backdrop blur to a small number of panels and avoid animating blur itself.
- Use transforms and opacity for motion to avoid layout shift.
- Keep the existing static-first Astro architecture and avoid new runtime libraries.

## 6. Verification Criteria

The design is implemented successfully when:

- The homepage, full project browser, full blog browser, article page, and 404 all share the Glass Lab system.
- The teal/blue gradient atmosphere and selective glass surfaces are visible without reducing text readability.
- Project and blog navigation remains one-click from list items, with secondary project links still independently clickable.
- Search, tag filters, sorting, clear states, empty states, modals, mobile navigation, and article copy buttons still work.
- The splash remains brief and reduced-motion-safe.
- Navigation and modal transitions are subtle and can be disabled by user preference.
- Desktop and mobile layouts have no horizontal overflow or inaccessible controls.
- `pnpm build` and `pnpm astro check` pass.
- Manual checks cover `/`, `/projects`, `/blogs`, `/blog/ai2048`, and `/404` at desktop and mobile widths, including keyboard-only navigation and reduced-motion mode.

## 7. Out of Scope

- Rewriting portfolio content or adding new projects/articles.
- Changing Astro content schemas, CMS configuration, deployment, or URL structure.
- Adding a new animation library, canvas background, or persistent 3D scene.
- Replacing the existing filter/search behavior with a new information architecture.
- Introducing a new contact form or new portfolio pages.
