## Context

The V2 portfolio was recently restyled with a brutalist aesthetic. The implementation is functional but has several UX issues that need addressing:

1. **Background Grid**: Currently uses `fixed` positioning which causes the grid to stay stationary while content scrolls, creating a disconnect from the content and potentially interfering with readability.

2. **About Me Modal**: Uses a simple `hidden` class toggle with no animation. The brutalist design would benefit from a smooth slide-in animation using GSAP.

3. **Homepage Blogs Section**: The V2 homepage (`v2/index.astro`) only shows a Projects section. There's a standalone blogs page (`v2/blogs.astro`) but it's not integrated into the homepage.

4. **Current Projects Data**: The projects data fetching may have inconsistencies - need to verify the data binding matches the original portfolio pattern.

## Goals / Non-Goals

**Goals:**
- Make background grid scroll with content using relative/absolute positioning
- Add GSAP-powered slide-in animation to About Me modal
- Add a Blogs teaser section to the V2 homepage (similar structure to Projects section)
- Fix any data loading issues in the Current Projects section

**Non-Goals:**
- No new pages or routes
- No changes to the visual design language (brutalist theme stays)
- No backend or API changes
- No database or content schema changes

## Decisions

### 1. Background Grid Scrolling
**Decision**: Change grid from `fixed` to `absolute` positioning within a relative container, or use a sticky positioning approach.

**Rationale**: 
- `fixed` causes the grid to stay viewport-locked
- `absolute` with the main content container allows grid to scroll naturally
- Alternative considered: CSS `background-attachment: scroll` but this doesn't work well with complex grid patterns

### 2. About Me Modal Animation
**Decision**: Use GSAP for slide-in animation (already installed in project).

**Implementation**:
- Replace simple `hidden` class toggle with GSAP `from()` / `to()` animations
- Slide in from right: `x: "100%"` → `x: "0%"`
- Use same easing as other animations: `power3.out`
- Animate both the panel and the overlay (if any)

### 3. Blogs Section on Homepage
**Decision**: Add a "Recent Blogs" teaser section to `v2/index.astro` using the same pattern as the Projects section.

**Rationale**:
- Mirrors existing Projects section structure for consistency
- Uses Astro's `getCollection('blog')` to fetch data (same as `v2/blogs.astro`)
- Shows 2-3 most recent blogs with title, date, and description
- Links to full blogs page

### 4. Projects Data Fix
**Decision**: Investigate and align data fetching pattern.

**Investigation needed**:
- Check the original portfolio for the correct data structure
- Ensure `v2/index.astro` uses the same field names as the schema (`title` vs `name`)
- The LSP errors show `title` and `description` don't exist on the project type - need to use correct field names from schema

## Risks / Trade-offs

- **Risk**: Background grid may lose its visual impact if not positioned correctly → **Mitigation**: Test on multiple viewport sizes, ensure grid lines align with content grid
- **Risk**: Modal animation may conflict with existing page transitions → **Mitigation**: Use GSAP with proper cleanup, ensure animations are reversible
- **Risk**: Blog content may not exist yet → **Mitigation**: Handle empty blog list gracefully (show "Coming soon" or hide section)
- **Risk**: TypeScript errors in existing code → **Mitigation**: Fix field names to match the actual schema (`name` not `title`, etc.)

## Open Questions

1. Should the About Me modal have a backdrop/overlay that also animates?
2. How many blogs should display on the homepage teaser? (2 or 3?)
3. Is there existing blog content, or do we need to create sample content?
