## Why

The current ContactModal uses inconsistent styling and doesn't leverage the new brutalist design system variables from globals.css. Additionally, there's no reusable modal base component, leading to potential inconsistency when creating new modals like an AboutModal. This change establishes a consistent modal pattern using the design system.

## What Changes

- Create a reusable `BaseModal.svelte` component with consistent styling
- Update `ContactModal.svelte` to use the new design system variables and BaseModal
- Create new `AboutModal.svelte` component for "About Me" content
- Apply `brutalist-accent` color for interactive elements (close button hover)
- Improve visual hierarchy and spacing in modals
- Use consistent typography and spacing from the design system

## Capabilities

### New Capabilities

- `base-modal-component`: Reusable modal component with design system integration
- `about-modal`: About me modal component with personal information

### Modified Capabilities

- None

## Impact

- `src/components/BaseModal.svelte`: New file - reusable modal wrapper
- `src/components/ContactModal.svelte`: Refactored to use BaseModal and new design tokens
- `src/components/AboutModal.svelte`: New file - about me modal
- `src/styles/globals.css`: Existing variables will be used throughout modals