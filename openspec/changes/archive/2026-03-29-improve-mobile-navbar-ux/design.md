## Context

The mobile navbar has two issues:

1. **Inconsistent close icon**: The sidebar's close button uses `×` (multiplication sign) while BaseModal uses `[X]` — breaking the brutalist bracket-style aesthetic
2. **Modal collision**: When a modal (About/Contact) is open and user taps hamburger, the sidebar opens *behind* the modal since both use z-50 and sidebar is rendered earlier in DOM

Current architecture:
- `Navbar.svelte` manages sidebar open/close state via `sidebarOpen` boolean
- `BaseModal.svelte` exports `open()`/`close()` methods and listens for custom events
- `toggleAboutModal()` and `toggleContactModal()` are exposed via `window` and dispatch CustomEvents
- Each modal listens for `close-{eventName}` to close itself when other modals open

## Goals / Non-Goals

**Goals:**
- Replace `×` with `[X]` in Navbar sidebar close button to match brutalist design
- When a modal is open and hamburger is tapped, close the modal instead of opening sidebar
- Maintain sidebar as primary mobile nav when no modal is open

**Non-Goals:**
- Not changing z-index layering (sidebar should still sit below modal when modal is open)
- Not adding a global modal state store — use existing event-based mechanism
- Not modifying BaseModal component

## Decisions

### Decision 1: Detect modal open state via existing CustomEvents

**Approach**: When hamburger is tapped, dispatch `close-toggle-about-modal` and `close-toggle-contact-modal` events before deciding to open sidebar.

**Rationale**: The existing event system already supports closing modals via `close-{eventName}` events. We don't need new state management — just leverage what's already there.

**Alternatives considered**:
- *Global modal state store*: Overkill — would require Svelte store and component integration
- *Exported modal refs*: Would require passing component references up through layouts

**Implementation**:
```javascript
function toggleSidebar() {
    if (sidebarOpen) {
        closeSidebar();
    } else {
        // Close any open modals before opening sidebar
        document.dispatchEvent(new CustomEvent('close-toggle-about-modal'));
        document.dispatchEvent(new CustomEvent('close-toggle-contact-modal'));
        openSidebar();
    }
}
```

### Decision 2: Close button style `[X]` matches BaseModal

**Approach**: Change `×` to `[X]` in the sidebar close button.

**Rationale**: BaseModal close button uses `[X]` (line 119 of BaseModal.svelte). Consistency in brutalist bracket notation across all close buttons.

## Risks / Trade-offs

**[Risk]**: Race condition between modal close events and sidebar open
- **Mitigation**: Dispatch modal close events *before* calling `openSidebar()`, allowing modal to animate closed before sidebar begins opening

**[Risk]**: Sidebar close button `×` vs hamburger `☰` inconsistency
- **Mitigation**: The hamburger transforms to `×` during open state (per existing spec), so consistency isn't critical there. The sidebar's internal close button is the concern.
