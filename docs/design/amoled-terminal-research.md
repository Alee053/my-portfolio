# AMOLED terminal portfolio research

Date: 2026-11-09

## Brief

Rework Alejandro Castro's existing portfolio into a minimal terminal-inspired website. Use a true black background and monospace type. Visitors should understand his work, browse projects and articles, and contact him through familiar links and controls. Keep the existing Astro and Svelte implementation and content collections.

Research used Exa across two search angles with ten search results requested, then fetched the relevant first-party pages. The two 21st component preview images below were also inspected. This is design research, not a license review or a recommendation to install those components.

## Sources and observations

| Source | Evidence | Application to this brief |
| --- | --- | --- |
| [21st terminal UI guide](https://21st.dev/blog/terminal-ui-components) | Recommends a real monospace stack, tabular numerals, selectable text, reduced-motion fallbacks, and truthful output. Distinguishes decorative terminal components from a real shell. | Use terminal typography and prompts around real portfolio content. Show content immediately. Keep text selectable. |
| [21st Animated Terminal](https://21st.dev/@dev.yadhakim/components/animated-terminal) and its [preview](https://cdn.21st.dev/dev.yadhakim/animated-terminal/default/preview.1772036521822.png) | The inspected preview uses a narrow title bar, a block cursor, aligned columns, muted secondary text, and colored output. | Borrow alignment and restrained semantic color. A portfolio does not need a looping installation transcript. |
| [21st TerminalBentoGrid preview](https://cdn.21st.dev/dhileepkumargm/terminal-bento-grid/default/preview.1758728395464.png), linked from the guide | The inspected preview arranges unequal panels with thin borders. Its green glow and scanline texture dominate the text. | Unequal panel widths can make the layout memorable. Keep the hierarchy while removing the glow and texture to meet the minimal brief. |
| [21st DevTerminalProfile](https://21st.dev/@ruhith369/components/dev-terminal-profile) | Presents identity, role, stack, and interests inside a terminal introduction. Its page describes typing animation and background gradients. | Identity and concrete profile facts belong together. Animation and gradients are optional presentation choices, not requirements. |
| [Charm Lip Gloss](https://github.com/charmbracelet/lipgloss) | Its first-party documentation explains text alignment, spacing, borders, inline formatting, and terminal colors as layout tools. | Use spacing and separators to organize content. Color should distinguish actions or metadata rather than decorate every word. |
| [Ghostty features](https://ghostty.org/docs/features) | Explains native windows, tabs, and splits as familiar navigation around terminal content. | Keep ordinary clickable navigation and recognizable search/filter controls around the shell styling. |
| [Michael Reyes's terminal portfolio case study](https://www.mreysei.dev/en/projects/terminal) | Describes a terminal portfolio built from real site content with a form, keyboard access, reduced motion, and text alternatives for drawings. | Keep one source of portfolio content. If a command-like control exists, it needs a clear accessible name and predictable keyboard behavior. |

## Design direction

The following choices are an inference from the brief and references, not claims made by those sources.

Use the shell as the page's visual structure. A small session bar identifies the portfolio. A large monospace name sits beside a compact profile readout. Project and article sections resemble readable directory listings, with plain descriptions and visible destination links. Conventional navigation remains available without typing commands.

Suggested palette:

| Role | Value |
| --- | --- |
| AMOLED background | `#000000` |
| Recessed control or panel | `#0b0e0f` |
| Structural line | `#262d30` |
| Main text | `#edf1ef` |
| Secondary text | `#9ba6a5` |
| Active prompt or link | `#8ad8c0` |

Use one deliberate monospace family throughout, with size, weight, and spacing creating hierarchy. Keep long article lines shorter than the browser width. Validate the final colors in the implementation rather than assuming the proposal meets every contrast requirement.

```text
session / portfolio                         projects  writing  about  contact
-------------------------------------------------------------------------
whoami                                  | profile
Alejandro                               | role and location
Castro                                  | concrete work and interests
short introduction                      | social links
-------------------------------------------------------------------------
projects / selected
name                       description                      links
name                       description                      links
-------------------------------------------------------------------------
writing / latest
title                      date                             read
```

The signature is an asymmetric shell session built from real profile information. Mobile follows the same content order in one column.

## Implementation checks

- Render all portfolio content as normal semantic HTML. The terminal vocabulary must not require Unix knowledge to find projects, writing, or contact information.
- Preserve routes, content collections, search, filters, sorting, project actions, article reading, and modal keyboard behavior.
- Use honest labels and existing profile facts. Avoid fabricated uptime, build results, visitor telemetry, or productivity numbers.
- Keep focus visible, controls comfortably tappable, text selectable, and reduced-motion behavior complete.
- Verify the home page, project browser, article browser, an article, About, Contact, mobile navigation, and the 404 page with the same visual system.
- Treat the references as inspiration. No external component code, registry install, or new runtime dependency is needed for this direction.

## Implemented direction

The implementation uses `#000000` for the page, `#0a0c0a` for recessed controls, `#262c25` for separators, `#e7eae5` for text, `#9aa398` for secondary text, and `#b5d99c` for actions. A persistent directory sidebar and a large name form the main composition. On mobile the directory becomes a visible navigation row.

IBM Plex Mono Medium sets the name and headings. Geist Mono sets descriptions and controls. The Latin WOFF2 files total approximately 38 KB and load from the repository, with no font-host request. Font sources are [Google Fonts Geist Mono](https://github.com/google/fonts/tree/main/ofl/geistmono) and [IBM Plex Mono](https://github.com/google/fonts/tree/main/ofl/ibmplexmono); both OFL files ship with the assets.

Project rows retain their real descriptions, links, and screenshots. Search and multi-tag filters keep their existing behavior. Empty results now include a plain explanation and a clear-filters action. Articles keep code copy buttons, math, tables, images, and a table of contents. Native dialogs provide the About and Contact panels with browser-managed modal focus and Escape handling.

The splash, ambient effects, scroll reveals, live timestamp, and their unused animation code were removed. Home-page sections render without hydration; only the interactive islands load client code. Copy follows the requested unslop pass, including removal of fabricated connection-status messages from Contact.

## Verification

Validated on November 9, 2026 against the generated Vercel static output in an isolated Chromium session.

| Check | Result |
| --- | --- |
| `pnpm astro check` | Passed, zero errors, warnings, or hints |
| `pnpm build` | Passed with nonfunctional local OAuth placeholders |
| Responsive layout | Home, projects, writing, article, and 404 have no horizontal page overflow at 320, 390, 768, 1024, and 1440 px |
| Accessibility | Eleven axe WCAG A/AA scans passed across desktop pages, mobile pages, About, and Contact |
| Browsers | Project search, company matching, multi-tag AND filters, empty recovery, all project sort modes, article search/tags, and date ordering passed |
| Navigation and reading | Active navigation after client transitions, desktop and mobile table-of-contents links, clipboard success/failure feedback, and keyboard scrolling of wide tables passed |
| Dialogs | Initial focus, background focus containment, Escape, backdrop close, focus/scroll restoration, and rapid Contact close/reopen passed |
| Motion and static content | Reduced motion disables the cursor and smooth scrolling; content and project navigation work without JavaScript |
| Runtime | No browser runtime errors during the checks |

The mobile article index is a native disclosure, so readers can begin the article without scrolling through the full outline. Code uses the installed high-contrast Shiki theme. Table wrappers are named keyboard-focusable regions.

The local build used placeholder `OAUTH_GITHUB_CLIENT_ID` and `OAUTH_GITHUB_CLIENT_SECRET` values. CMS authentication and hosted deployment were not exercised. The existing Vercel adapter warns that local Node 26 differs from its Node 22 serverless runtime; no runtime or deployment configuration was changed.

Current homepage captures:

- [Desktop](amoled-terminal-desktop.png)
- [Touch mobile](amoled-terminal-mobile.png)
