## Context

The v2 portfolio has successfully modularized the index page using Svelte components (`Hero.svelte`, `Projects.svelte`, `Blogs.svelte`). However, the secondary pages (`projects.astro`, `blogs.astro`) still use inline JavaScript for rendering lists, search, and tag filtering. This creates a maintainability gap and architectural inconsistency.

Current state:
- V2 index page: fully modular with reusable Svelte components
- V2 projects/blogs pages: inline scripts embedded in Astro files
- V1 pages: reference implementation with modular approach
- Aesthetic: Brutalist/terminal design with monospace fonts, minimal borders, specific color palette

## Goals / Non-Goals

**Goals:**
- Create reusable Svelte browser components for Projects and Blogs pages
- Implement client-side search with real-time filtering
- Add tag/technology multi-select filter functionality
- Ensure blog post viewer renders correctly with v2 aesthetic
- Maintain existing v2 design language (brutalist, terminal-like, monospace)
- Keep pages performant with client-side filtering (no server roundtrips)

**Non-Goals:**
- Changing the v2 visual design system
- Adding new metadata fields to projects or blog posts
- Implementing server-side filtering or pagination
- Modifying the v1 pages (those remain as-is)
- Adding authentication or authorization features

## Decisions

### 1. Component Architecture
**Decision:** Create standalone browser components (`ProjectsBrowser.svelte`, `BlogsBrowser.svelte`) instead of extending the existing `Projects.svelte` and `Blogs.svelte` sections.

**Rationale:** 
- Existing sections are designed for the index page (showing limited items)
- Browser components need different functionality (search, filters, full list)
- Separation of concerns: index sections vs. full browser pages
- Reusability for potential future expansion

**Alternatives considered:**
- Adding props to existing components: Would make components too complex with conditional logic
- Using a single combined component: Would reduce reusability and mix responsibilities

### 2. State Management Approach
**Decision:** Use Svelte reactive declarations (`$:`) and local component state for search/filter logic.

**Rationale:**
- Simple enough that no external state management is needed
- Reactive declarations provide automatic updates
- Consistent with v1 reference implementation
- No need for centralized state store

**Alternatives considered:**
- Svelte stores: Overkill for component-scoped state
- URL parameters: Could add but increases complexity for initial implementation

### 3. Search Implementation
**Decision:** Client-side real-time search using reactive filtering.

**Rationale:**
- Instant feedback without server requests
- Matches v1 behavior pattern
- Better UX for portfolio browsing
- Small data size (projects/blog posts) makes client-side efficient

**Implementation:**
- Search input with debounce not needed (small datasets)
- Filter by title, description, and tags
- Case-insensitive matching

### 4. Tag Filtering
**Decision:** Multi-select tag buttons with toggle behavior.

**Rationale:**
- AND logic for multiple tags (show items that match ALL selected tags)
- Visual feedback with inverted colors when active
- Match existing v2 button styling

**Alternatives considered:**
- Single-select: Too restrictive for filtering
- OR logic: Less precise filtering, could return too many results

### 5. Blog Post Viewer
**Decision:** Update existing `blog/[slug].astro` page to use proper v2 patterns and ensure blog content renders correctly.

**Rationale:**
- File already exists with basic implementation
- Need to verify it renders markdown properly
- May need styling adjustments for code blocks, images, etc.

## Risks / Trade-offs

### Risk 1: Performance with Large Datasets
**Risk:** Client-side filtering might become slow with large number of projects/blogs.

**Mitigation:** 
- Projects and blog posts are limited datasets (typically < 100)
- Svelte's reactive updates are efficient
- Can add virtualization later if needed

### Risk 2: SEO and Initial Load Time
**Risk:** Client-side rendered content may impact SEO and initial perceived load time.

**Mitigation:**
- Filtered content still renders quickly for small datasets
- Consider adding initial server-side render for SEO later
- Bots can still see the full list initially

### Risk 3: Maintaining Design Consistency
**Risk:** New components might not match existing v2 aesthetic exactly.

**Mitigation:**
- Reference existing v2 components for styling patterns
- Use same Tailwind classes and color variables
- Test visually against main page

### Risk 4: Blog Content Rendering
**Risk:** Blog markdown might not render correctly or match v2 styling.

**Mitigation:**
- Test with existing blog posts
- Apply necessary prose classes for typography
- Ensure code blocks, images, and links work properly

## Migration Plan

1. Create new browser components with search/filter functionality
2. Update Astro pages to use new components
3. Test search and filter functionality
4. Verify blog post rendering
5. Deploy alongside existing pages (no breaking changes)

**Rollback:** Since we're replacing inline scripts with components, rollback is straightforward - revert to previous Astro file versions.

## Open Questions

1. Should we add a "clear all filters" button? (Recommendation: Yes, for UX)
2. Should search also filter by content/body text or just metadata? (Recommendation: Just metadata for now, faster)
3. Should we preserve filter state in URL for bookmarkability? (Recommendation: Nice to have, but out of scope for initial implementation)