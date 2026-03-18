## ADDED Requirements

### Requirement: Hero description preserves word boundaries
The Hero section's description text SHALL not break words mid-character during line wrapping.

#### Scenario: Long description wraps correctly
- **WHEN** the description text exceeds the container width
- **THEN** line breaks occur only at word boundaries
- **AND** no words are hyphenated or split mid-character

#### Scenario: Character animation still functions
- **WHEN** the page loads with the splitToChars animation
- **THEN** each character displays correctly as an individual span
- **AND** word-break: keep-all preserves word integrity during wrapping