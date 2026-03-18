## MODIFIED Requirements

### Requirement: Navbar z-index above modal backdrop
The navbar SHALL have a z-index higher than the modal backdrop to remain visible and interactive when modals are open.

#### Scenario: Navbar visible during modal
- **WHEN** a modal is open
- **THEN** the navbar remains fully visible (z-40)
- **AND** the navbar is not blurred by the backdrop
- **AND** navbar links remain clickable

### Requirement: Navbar styling matches design system
The navbar SHALL maintain the existing brutalist aesthetic with proper colors, fonts, and positioning.

#### Scenario: Navbar renders
- **WHEN** the navbar is displayed
- **THEN** it uses the brutalist color palette (bg-brutalist-bg, text-brutalist-text, border-brutalist-line)
- **AND** it has sticky positioning at the top
- **AND** it uses Space Grotesk and Liberation Mono fonts
- **AND** it has z-40 to stay above modal backdrops