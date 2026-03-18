## Context

The portfolio has a consistent brutalist design system with `brutalist-accent` (#13ecaf - cyan/teal) as the primary accent color. However, several components diverge from this:

1. **ContactModal** - Hover effects use generic `text-white` instead of accent, making links feel bland
2. **Article links** - Use `#FF5500` (orange), creating visual inconsistency with site's cyan accent
3. **Blog TOC** - Duplicated for mobile/desktop with potential collisions at certain breakpoints, breaks on small screens, and TOC navigation scrolls headings behind the fixed navbar (approx 140px combined offset from navbar + sticky blog nav)
4. **Page metadata** - No `<title>` tags or favicon defined, hurting SEO and brand recognition

## Goals / Non-Goals

**Goals:**
- Unify hover effects across ContactModal using brutalist-accent
- Make links more visible while maintaining the minimal brutalist aesthetic
- Align article link color with site's accent palette
- Add proper page titles and favicon to all pages
- Fix TOC duplication/collision issues and mobile responsiveness
- Fix TOC scroll so headings appear below navbar, not behind it

**Non-Goals:**
- Changing page layouts or structure beyond TOC fixes
- Modifying other modal components (About, base modal)
- Adding new features beyond visual polish

## Decisions

### ContactModal Hover Effects
**Decision**: Use `brutalist-accent` for hover states with accent-colored dashed borders
**Rationale**: White hover doesn't distinguish brand. Accent color creates stronger visual feedback and matches the rest of the site.
**Implementation**: Change `hover:text-white` to `hover:text-brutalist-accent`, animate border color from `brutalist-line` to `brutalist-accent` on hover.

### Article Link Color
**Decision**: Change from `#FF5500` (orange) to `#13ecaf` (brutalist-accent)
**Rationale**: Orange was an old palette choice. Unifying with site accent creates cohesive identity.
**Implementation**: Update `article-typography.css` link color and hover state.

### Blog TOC Display
**Decision**: Consolidate TOC to single responsive component, add scroll-margin to headings
**Rationale**: 
- Current implementation has duplicate TOC markup (mobile vs desktop) with `md:hidden` and `hidden md:block` - potential for collision at breakpoint boundaries
- Small phones break due to tight width constraints on the TOC container
- TOC links scroll headings behind fixed navbar (~140px offset: navbar 80px + sticky blog nav ~60px)
**Implementation**:
- Add `scroll-margin-top: 160px` (or similar) to article headings h2/h3 via CSS
- Restructure TOC to use single responsive layout or ensure clean breakpoint separation
- Consider collapsible TOC on mobile or simplified layout

### Page Titles & Favicon
**Decision**: Add `<title>` prop to BaseLayout and favicon link in `<head>`
**Rationale**: Essential for SEO, browser tabs, and brand recognition.
**Implementation**:
- BaseLayout accepts `title` prop, renders `<title>{title} | ALE CASTRO</title>`
- Add `<link rel="icon" href="/logo.png" />` to head
- Each page passes appropriate title

## Risks / Trade-offs

- **TOC restructure**: Changing TOC layout may affect desktop experience; test across breakpoints
- **Link visibility**: Accent color is brighter than the current orange; may draw more attention which is desired. No downside.
- **Backwards compatibility**: All changes are CSS-only or minor template additions, no breaking changes to component APIs.