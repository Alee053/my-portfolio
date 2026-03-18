## Why

The Contact modal links are currently difficult to click due to small clickable areas. Links feel "bland" and lack visual affordance that encourages user interaction. This creates friction for users trying to reach out, defeating the purpose of the contact modal.

## What Changes

- Expand clickable hit areas for all contact links (GitHub, LinkedIn, Email)
- Add visual affordance to make links more "calling" and inviting to click
- Improve touch target sizing for accessibility (minimum 44x48px recommended)
- Maintain brutalist aesthetic while improving usability

## Capabilities

### New Capabilities

None - this is an enhancement to an existing capability.

### Modified Capabilities

- `contact-modal`: Enhanced link clickability requirements - adding minimum hit area dimensions, visual affordance for interactive elements, and improved touch targets

## Impact

- **Files**: `src/components/ContactModal.svelte`
- **Specs**: `openspec/specs/contact-modal/spec.md` (delta spec needed)
- **UX**: Significantly improved clickability and accessibility without changing visual identity