## ADDED Requirements

### Requirement: Projects browser view all link has clear affordance
The "[VIEW ALL]" link in the projects section SHALL use clear interactive styling that distinguishes it from decorative elements.

#### Scenario: View all link is clearly interactive
- **WHEN** the projects section renders
- **THEN** the "[VIEW ALL]" link uses `--color-brutalist-accent`
- **AND** it has `cursor: pointer`
- **AND** on hover, it transitions to bright white text
- **AND** it uses distinct underline or color change on hover