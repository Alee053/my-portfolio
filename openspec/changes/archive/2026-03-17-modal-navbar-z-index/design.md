## Context

Currently, the modal backdrop (`fixed inset-0 z-40`) covers the entire viewport including the navbar (`z-30` per brutalist styling). When a modal opens, the backdrop blur applies to everything, obscuring the navbar. Additionally, the Hero section's character-by-character animation splits text at every character, causing words to break mid-character during line wrapping.

## Goals / Non-Goals

**Goals:**
- Ensure navbar remains visible and unblurred when modals are open
- Blur only the main content area when modals are open
- Prevent mid-word line breaks in Hero description text

**Non-Goals:**
- Changing modal animation behavior
- Altering modal content or functionality
- Modifying the GSAP animation timing in Hero

## Decisions

### Z-Index Layering Strategy

**Decision**: Use a three-layer z-index hierarchy where navbar sits between the modal and its backdrop.

**Rationale**: 
- Option A (Raise navbar z-index above modal): Would make navbar overlay the modal, blocking content
- Option B (Lower modal backdrop z-index): Would cause content to overlay the backdrop, breaking the blur effect
- **Option C (Split backdrop z-index)**: Raise navbar z-index above backdrop but below modal panel. This keeps navbar visible but unblurred, while content blurs correctly.

**Implementation**:
- Backdrop: `z-30` (below navbar)
- Navbar: `z-40` (above backdrop, below modal panel)
- Modal panel: `z-50` (above all)

### Hero Text Preservation

**Decision**: Add `word-break: keep-all` CSS property to the description text container.

**Rationale**:
- Character-level `<span>` elements with `display: inline-block` allow breaking at any character
- `word-break: keep-all` prevents breaking within CJK and non-CJK words while still wrapping at spaces
- Alternative would require restructuring the animation to split at word boundaries first, which adds complexity

## Risks / Trade-offs

- **Risk**: Z-index changes could affect other fixed/absolute positioned elements
  - **Mitigation**: Audit all other components for z-index usage; current hierarchy uses z-10 for main content and background elements
  
- **Risk**: `word-break: keep-all` may behave differently for very long unbroken strings
  - **Mitigation**: The description text has natural word boundaries; overflow is handled by the container's max-width