## ADDED Requirements

### Requirement: Decoration layer visual separation
The system SHALL display decorative elements (labels, grid annotations, section markers) with distinct visual styling that differentiates them from interactive content.

#### Scenario: Decorative elements use muted styling
- **WHEN** decorative elements are rendered (SectionLabel, grid annotations)
- **THEN** they use lower opacity (0.5) than interactive content
- **AND** they use muted color (brutalist-decoration variable)
- **AND** they have `cursor: default` (not pointer)
- **AND** they have no hover state changes

#### Scenario: Interactive elements use accent styling
- **WHEN** interactive elements are rendered (links, buttons)
- **THEN** they use the accent color (--color-brutalist-accent)
- **AND** they have `cursor: pointer`
- **AND** they have visible hover state transitions

### Requirement: CSS custom properties for layer system
The system SHALL define CSS custom properties in globals.css for the decoration/interactive layer system.

#### Scenario: Color variables defined
- **WHEN** the stylesheets load
- **THEN** the following variables are defined:
  - `--color-brutalist-decoration`: muted color for decorative text (opacity-based)
  - Interactive links use `--color-brutalist-accent` directly

#### Scenario: Z-index layer constants
- **WHEN** the stylesheets load
- **THEN** z-index values separate visual layers:
  - Background patterns: lowest layer
  - Decorative labels: middle layer
  - Interactive content: top layer

### Requirement: SectionLabel component uses decoration styling
The SectionLabel component SHALL use decoration layer styling that does not compete with interactive links.

#### Scenario: SectionLabel is clearly decorative
- **WHEN** SectionLabel renders (e.g., "SEC 01 // HERO")
- **THEN** it uses muted color with 0.5 opacity
- **AND** it has no hover interaction
- **AND** its brackets do not visually match link styling

### Requirement: Interactive links have clear affordance
The system SHALL display all interactive links with visual cues indicating clickability.

#### Scenario: Links show hover state
- **WHEN** user hovers over an interactive link (e.g., "[VIEW ALL]")
- **THEN** the link transitions to a brighter color (white or accent)
- **AND** the cursor changes to pointer
- **AND** the transition is immediate (no delay confusion)