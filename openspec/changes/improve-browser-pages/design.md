## Context

The blogs and projects browser pages (BlogsBrowser.svelte, ProjectsBrowser.svelte) currently display tags inline at the top of the content area, separate from the main content list. The search inputs show default browser focus outlines. These inconsistencies break the visual harmony with the home page which uses row-based components (BlogRow.svelte, ProjectRow.svelte). The browsers also lack sorting capabilities for better content organization.

## Goals / Non-Goals

**Goals:**
- Implement sidebar-style tag filtering with horizontal layout and visualcount indicators
- Add sorting controls for blogs (by date) and projects (by title/tags)
- Remove focus ring/outline from search inputs for cleaner brutalist aesthetic
- Unify browser page styling with index.astro using row-based components
- Improve filter UX with active filter count and clear controls

**Non-Goals:**
- Changing the underlying data structures or Astro content collections
- Modifying the individual blog or project detail pages
- Adding pagination (may be future work)

## Decisions

### 1. Sidebar Layout Approach
**Decision**: Use a horizontal sidebar layout above the content list with tags on the left and controls on the right.
**Rationale**: Keeps content visible while providing powerful filtering. Matches brutalist aesthetic where horizontal dividers organize content.
**Alternatives considered**:
- Vertical sidebar (left column): Takes too much horizontal space, reduces content area
- Floating filter panel: More complex implementation, doesn't fit brutalist aesthetic

### 2. Search Input Styling
**Decision**: Remove all focus ring/outline using `focus:ring-0 focus:outline-none` classes.
**Rationale**: Brutalist design emphasizes function over decoration. The border box already provides visual containment.
**Alternatives considered**:
- Custom focus ring color: Adds unnecessary visual noise
- Keep default outline: Breaks design consistency

### 3. Row Component Reuse
**Decision**: Refactor browsers to use existing BlogRow.svelte and ProjectRow.svelte components.
**Rationale**: DRY principle, ensures consistent styling between home page sections and full browser pages.
**Alternatives considered**:
- Inline row markup: Duplicates code, harder to maintain

### 4. Sorting Implementation
**Decision**: Add reactive sort state with sort control buttons (Date ↓/↑ for blogs, Title A-Z/Z-A for projects).
**Rationale**: Simple implementation, provides useful functionality for users to find content faster.

## Risks / Trade-offs

- **Sidebar adds vertical space before content** → Keep sidebar compact with small tags and condensed sorting controls
- **Multiple filter states could confuse users** → Show active filter count prominently, add clear all button
- **Component refactor could break existing behavior** → Maintain same data flow and event handling patterns