## Context

The current navbar implementation in `BaseLayout.astro` (lines 24-35) embeds navigation markup directly in the layout. This creates several issues:
- Mixed concerns: layout responsibility mixed with navigation logic
- Hardcoded timestamp that never updates
- No way to navigate to specific sections on the homepage
- No contact information/links available
- Difficult to test or reuse

The codebase uses:
- Astro for static site generation with Svelte components for interactivity
- GSAP for animations (already used for the About modal)
- Tailwind CSS with custom brutalist design tokens
- `client:load` directive for hydrating Svelte components

## Goals / Non-Goals

**Goals:**
- Extract navbar into a reusable, testable Svelte component
- Implement live timestamp updates every second
- Enable smooth scrolling to homepage sections
- Add contact modal with social links (GitHub, LinkedIn, email)
- Maintain existing brutalist aesthetic and styling
- Preserve all existing functionality (About modal, navigation links)

**Non-Goals:**
- Redesign the visual appearance (keep current brutalist style)
- Add authentication or user state
- Change routing structure
- Implement search functionality
- Mobile hamburger menu (not requested)

## Decisions

### Decision: Use Svelte for Navbar Component
**Rationale**: Consistent with existing component architecture (Hero, Projects, Blogs sections are all Svelte). Provides reactivity for timestamp updates without page refresh.

**Alternatives considered:**
- Keep inline Astro: Loses reactivity for timestamp
- React: Adds unnecessary dependency when Svelte already in use

### Decision: Use `setInterval` for Timestamp Updates
**Rationale**: Simple, built-in JavaScript approach. Updates every 1000ms to show live time.

**Implementation details:**
- Format: `YYYY.MM.DD_HH:MM:SS` (24-hour format)
- Update interval: 1000ms
- Cleanup: Clear interval in `onDestroy` to prevent memory leaks

### Decision: Smooth Scroll for Section Navigation
**Rationale**: Better UX than jumping. Uses `scroll-behavior: smooth` already defined in globals.css, plus programmatic `scrollIntoView` for cross-browser support.

**Implementation:**
- Add `id` attributes to section elements
- Use `element.scrollIntoView({ behavior: 'smooth' })`
- Handle both current page and external page navigation

### Decision: Reuse Existing Modal Pattern
**Rationale**: The About modal already uses a proven pattern with GSAP animations. Contact modal should follow same approach for consistency.

**Pattern to replicate:**
- Fixed position sidebar sliding in from right
- GSAP animation for smooth entry/exit
- Click outside or X button to close
- Backdrop blur when modal open (optional enhancement)

### Decision: Component Composition Structure
```
Navbar.svelte (container)
├── LiveTimestamp.svelte (timestamp display)
└── triggers → ContactModal.svelte (modal overlay)
```

**Rationale**: Separates concerns - timestamp is independent, modal is triggered by navbar but rendered at layout level for proper z-index stacking.

## Risks / Trade-offs

**[Risk] Timestamp updates may cause unnecessary re-renders**
→ **Mitigation**: Use Svelte's reactive statements efficiently. The timestamp is a small isolated component, minimal impact.

**[Risk] Modal state management complexity**
→ **Mitigation**: Keep modal state simple (boolean isOpen). Use event dispatching from Navbar to BaseLayout for modal control, or pass toggle function as prop.

**[Trade-off] Two modals (About + Contact) increase complexity**
→ **Acceptance**: Both serve different purposes. Consider extracting shared modal shell component in future refactor.

**[Risk] Section IDs may conflict with future features**
→ **Mitigation**: Use descriptive IDs: `hero-section`, `projects-section`, `blogs-section`

## Migration Plan

1. **Create components** (no impact)
   - Create `LiveTimestamp.svelte`
   - Create `ContactModal.svelte`
   - Create `Navbar.svelte`

2. **Update BaseLayout.astro**
   - Import Navbar component
   - Add ContactModal markup
   - Remove inline navbar markup
   - Pass toggle function to Navbar

3. **Add section IDs**
   - Add `id` attributes to Hero, Projects, Blogs sections

4. **Test**
   - Verify timestamp updates
   - Test all navigation links
   - Test modals (About and Contact)
   - Test smooth scrolling

**Rollback**: Revert to previous commit if issues found. All changes are additive.

## Open Questions

None - all technical decisions clarified.
