## Why

The modal backdrop currently overlays the entire viewport including the navbar, causing the navbar to blur and be partially obscured. Additionally, the Hero section's description splits text at the character level, causing words to break mid-character during line wrapping, which disrupts readability.

## What Changes

- **Modal z-index**: Restructure z-index layering so the navbar remains unblurred and fully visible when modals are open
- **Content blurring**: Ensure only the main content area (not navbar) receives the backdrop blur effect
- **Hero text wrapping**: Fix character-based splitting to preserve word boundaries, preventing mid-word line breaks

## Capabilities

### New Capabilities

- `modal-layering`: Defines z-index hierarchy ensuring navbar stays above modal backdrop while content blurs appropriately
- `hero-text-preservation`: Ensures description text maintains word boundaries during character-animation splitting

### Modified Capabilities

- `base-modal-component`: Requirement change - backdrop should not cover navbar (z-index scoping)
- `navbar-component`: Requirement change - must remain interactive and unblurred when modals are open

## Impact

- `src/layouts/BaseLayout.astro`: Restructure z-index layering and element ordering
- `src/components/BaseModal.svelte`: Adjust backdrop positioning/scoping
- `src/sections/Hero.svelte`: Update character animation to use `word-break: keep-all` CSS property