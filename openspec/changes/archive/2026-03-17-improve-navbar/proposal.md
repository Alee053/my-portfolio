## Why

The current navbar is embedded directly in `BaseLayout.astro` with hardcoded metadata and a mix of concerns. It lacks dynamic timestamp display, doesn't provide proper section navigation on the homepage, and is missing contact/connection information. Refactoring into a dedicated component will improve maintainability, while adding live timestamp updates and contact modal will enhance user experience.

## What Changes

- **Extract Navbar Component**: Move navbar markup from `BaseLayout.astro` into a reusable Svelte component (`Navbar.svelte`)
- **Dynamic Timestamp**: Replace static `TS: 2026.03.17_04:30` with live-updating date/time display
- **Section Navigation**: Update navbar links to scroll/navigate to specific sections on the index page (Projects, Blogs, Hero)
- **Contact Modal**: Add `[CONTACT]` link that opens a modal with GitHub, LinkedIn, and email links in the same brutalist aesthetic
- **Component Architecture**: Create isolated, testable navbar component with props for customization

## Capabilities

### New Capabilities
- `navbar-component`: Self-contained navigation component with dynamic metadata and modal triggers
- `contact-modal`: Reusable modal component for displaying social/contact links with brutalist styling
- `live-timestamp`: Real-time timestamp display component for technical annotation aesthetic

### Modified Capabilities
- None - this is a refactor with new features, not a behavioral change to existing capabilities

## Impact

**Files Modified:**
- `src/layouts/BaseLayout.astro` - Remove inline navbar, import new component

**Files Created:**
- `src/components/Navbar.svelte` - Main navbar component
- `src/components/ContactModal.svelte` - Contact links modal
- `src/components/LiveTimestamp.svelte` - Dynamic timestamp display

**Dependencies:**
- Uses existing `gsap` for modal animations (already in project)
- Leverages existing CSS custom properties and brutalist design system

**No Breaking Changes:** All existing functionality preserved, only enhanced.
