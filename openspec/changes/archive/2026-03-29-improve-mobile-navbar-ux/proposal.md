## Why

The mobile navigation sidebar has two UX issues: (1) the close button uses a plain `×` character instead of the consistent brutalist bracket-style font art used elsewhere in the UI, and (2) when a modal (About/Contact) is open, tapping the hamburger opens the sidebar *behind* the modal instead of closing the modal first, creating a confusing layered state where the user sees the sidebar sliding behind an open modal.

## What Changes

1. **Replace `×` icon with bracket-style font art** in the mobile sidebar close button (e.g., `[CLOSE]` or `[×]`)
2. **Add modal-awareness to hamburger menu**: When a modal is open, tapping the hamburger closes the modal instead of opening the sidebar
3. **Add visual feedback**: Hamburger icon toggles to a close indicator when a modal is open on mobile

## Capabilities

### New Capabilities
- `modal-awareness-hamburger`: Mobile hamburger menu detects when a modal is open and responds by closing the modal instead of opening the sidebar

### Modified Capabilities
- `mobile-navigation`: The hamburger menu behavior changes — it now closes any open modal before attempting to open the sidebar on mobile

## Impact

- **Files modified**: `src/components/Navbar.svelte`
- **Pattern change**: Hamburger menu click handler must check and close active modals
- **No API changes**: Internal component logic only
