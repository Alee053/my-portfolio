## Context

The ContactModal component currently displays contact links (GitHub, LinkedIn, Email) as inline flex items with minimal padding. The clickable area is limited to just the text and a thin dashed line. Users must precisely target small text to click, creating friction. The current design lacks visual affordance that signals "clickability".

## Goals / Non-Goals

**Goals:**
- Expand clickable hit areas to minimum 44x48px per WCAG guidelines
- Add visual affordance (background, border, hover states) that invites clicks
- Improve touch target accessibility
- Maintain brutalist aesthetic (monospace fonts, bracket notation, accent color on hover)

**Non-Goals:**
- Changing contact URLs or email addresses
- Changing modal structure or animation
- Adding new contact methods

## Decisions

### Decision: Add explicithit areas with background styling
**Choice:** Add padding and background-color on link containers to create explicit clickable regions
**Rationale:** 
- Alternatives considered:
  - Invisible padding only → doesn't communicate clickability
  - Button elements → breaks semantic meaning of links
  - Larger font only → doesn't solve touch target issue
- Background creates clear "clickable region" affordance
- Maintains brutalist aesthetic with appropriate colors (bg-brutalist-bg or slight variation)

### Decision: Add subtle border around link containers
**Choice:** Add border-brutalist-line with hover transition to border-brutalist-accent
**Rationale:**
- Creates visual "button-like" affordance without using buttons
- Hover state reinforces clickability
- Maintains consistency with modal's existing brutalist styling

### Decision: Increase link vertical spacing
**Choice:** Increase spacing between links (space-y-4→ space-y-3)
**Rationale:**
- Reduces accidental mis-clicks between adjacent links
- Better visual hierarchy
- Improves perceived separate action areas

## Risks / Trade-offs

- **Risk**: Background/border makes modal feel less "minimal"→ Mitigation: Use subtle colors that blend with brutalist palette (bg-opacity transitions)
- **Risk**: Increased padding breaks visual balance → Mitigation: Test with modal content to ensure proper spacing relative to other elements