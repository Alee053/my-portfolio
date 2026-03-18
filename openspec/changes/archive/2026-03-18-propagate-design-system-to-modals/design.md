## Context

The ContactModal currently uses ad-hoc styling and doesn't follow the new design system established in globals.css. The brutalist design system uses CSS custom properties like `--color-brutalist-accent` (for interactive elements), `--color-brutalist-line` (for borders), and `--font-mono`/`--font-sans`. There's no AboutModal component yet, and modals lack a consistent base pattern.

## Goals / Non-Goals

**Goals:**
- Create a reusable BaseModal component that encapsulates common modal behavior
- Apply design system variables consistently across all modals
- Use `brutalist-accent` for interactive element hover states (close button)
- Improve visual hierarchy with better spacing and typography

**Non-Goals:**
- Change modal animation timings (keep existing GSAP transitions)
- Modify modal trigger/dispatch events
- Add new modal content beyond structural improvements

## Decisions

1. **BaseModal component pattern**
   - Create BaseModal.svelte as a wrapper component
   - Slots for content, props for title and close handler
   - Keeps GSAP animation logic in one place
   - Alternative: Keep modals independent → rejected (leads to duplication)

2. **Design token usage**
   - Use `bg-brutalist-bg` for modal background
   - Use `border-brutalist-line` for borders
   - Use `text-brutalist-accent` for interactive hover states
   - Use `font-mono` for labels, `text-sm` for content

3. **Close button styling**
   - Use `[X]` text → `hover:text-brutalist-accent` on hover
   - Alternative: Icon button → rejected (fits brutalist aesthetic better with text)

## Risks / Trade-offs

- **BaseModal abstraction may limit flexibility** → Use slots and props for customization
- **Breaking existing ContactModal consumers** → Keep same event interface (`toggle-contact-modal`)