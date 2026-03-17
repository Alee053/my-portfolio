## ADDED Requirements

### Requirement: Hero decorative labels use decoration styling
The hero section SHALL display decorative labels (like "[LAYOUT GRID X-72]") with muted decoration layer styling that does not compete with interactive content.

#### Scenario: Grid annotation is clearly decorative
- **WHEN** the hero section renders
- **THEN** the "[LAYOUT GRID X-72]" label uses `--color-brutalist-decoration` styling
- **AND** it has `opacity: 0.5`
- **AND** it has `cursor: default`
- **AND** it visually reads as annotation, not interactive link