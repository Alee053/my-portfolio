## 1. CSS Layer System Setup

- [x] 1.1 Add `--color-brutalist-decoration` CSS custom property to globals.css (muted, lower contrast than text)
- [x] 1.2 Add `.decoration-label` utility class in globals.css (opacity: 0.5, cursor: default, no hover)
- [x] 1.3 Add `.interactive-link` utility class in globals.css (accent color, cursor: pointer, hover transition to white)
- [x] 1.4 Document z-index layer values as CSS custom properties (--z-layer-decoration, --z-layer-content)

## 2. SectionLabel Component Update

- [x] 2.1 Update SectionLabel.svelte to use `text-brutalist-line` with opacity styling
- [x] 2.2 Ensure SectionLabel has no hover states and cursor: default
- [x] 2.3 Verify SectionLabel visually reads as annotation, not clickable

## 3. Hero Section Decoration Update

- [x] 3.1 Update `[LAYOUT GRID X-72]` label in Hero.svelte to use decoration styling
- [x] 3.2 Ensure the label has muted opacity and no hover interaction
- [x] 3.3 Verify visual hierarchy: decoration below content visually

## 4. Projects Section Link Update

- [x] 4.1 Update `[VIEW ALL]` link in Projects.svelte to use interactive styling
- [x] 4.2 Add hover state transition to bright white text
- [x] 4.3 Ensure cursor changes to pointer on hover

## 5. Blogs Section Link Update

- [x] 5.1 Update `[VIEW ALL]` link in Blogs.svelte to use interactive styling
- [x] 5.2 Add hover state transition to bright white text
- [x] 5.3 Ensure cursor changes to pointer on hover

## 6. Verification

- [x] 6.1 Verify all decorative elements use muted styling with no hover
- [x] 6.2 Verify all interactive links use accent color with clear hover states
- [x] 6.3 Test visual distinction between decoration and interactive elements
- [x] 6.4 Verify brutalist aesthetic is preserved