## Context

The portfolio uses a brutalist design language with monospace fonts, grid patterns, and bracket notation for labels. Currently, both decorative elements (`[SEC 01 // HERO]`, `[LAYOUT GRID X-72]`) and interactive links (`[VIEW ALL]`) use identical visual treatment, making it unclear what's clickable.

## Goals / Non-Goals

**Goals:**
- Establish clear visual distinction between decorative and interactive elements
- Create a layered CSS system where decorations sit "below" content
- Maintain the brutalist aesthetic while improving UX clarity
- Ensure interactive elements have obvious hover/click affordances

**Non-Goals:**
- Complete redesign of the portfolio aesthetic
- Adding new interactive features beyond clarity improvements
- Changing the underlying color palette

## Decisions

**1. CSS Custom Properties for Decoration Layer**
Add `--color-brutalist-decoration` (muted, lower contrast) and `--color-brutalist-interactive` (accent color) to clearly separate visual hierarchy. Decorative text uses opacity: 0.5 and no pointer events, while interactive elements use full accent color with hover transitions.

**2. Z-Index Layer System**
- Layer 0: Background grid patterns
- Layer 1: Decorative labels and annotations
- Layer 2: Actual content and interactive elements

**3. Cursor Convention**
- Decorative elements: `cursor: default` (no pointer)
- Interactive elements: `cursor: pointer` with hover state changes

**4. SectionLabel Component Refactor**
Change from bracket notation to a simpler, muted label format. The `[SEC 01 // LABEL]` pattern visually competes with links. Alternative: `01//LABEL` in lowercase with muted styling.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Changing visual patterns may feel different to returning visitors | Keep the core brutalist aesthetic intact, only clarify affordances |
| Over-simplification loses character | Preserve grid patterns and geometric borders as the visual identity |
| Too much contrast could look harsh | Use opacity and color hierarchy instead of adding new colors |