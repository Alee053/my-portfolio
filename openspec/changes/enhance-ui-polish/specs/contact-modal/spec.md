## MODIFIED Requirements

### Requirement: Contact modal links use accent color on hover
Contact links SHALL use `brutalist-accent` color for hover effects instead of white.

#### Scenario: User hovers over GitHub link
- **WHEN** user hovers over the GitHub link
- **THEN** the link text changes to `brutalist-accent` color
- **AND** the dashed border line animates to `brutalist-accent` color

#### Scenario: User hovers over LinkedIn link
- **WHEN** user hovers over the LinkedIn link
- **THEN** the link text changes to `brutalist-accent` color
- **AND** the dashed border line animates to `brutalist-accent` color

#### Scenario: User hovers over Email link
- **WHEN** user hovers over the Email link
- **THEN** the link text changes to `brutalist-accent` color
- **AND** the dashed border line animates to `brutalist-accent` color

## ADDED Requirements

### Requirement: Contact modal links have visible styling
Contact links SHALL have enhanced visibility while maintaining brutalist aesthetic.

#### Scenario: Link renders in default state
- **WHEN** contact links are displayed
- **THEN** link labels use `text-brutalist-line` color
- **AND** the dashed border separator is visible
- **AND** the "OPEN/SEND" action text is visible

#### Scenario: Link transitions on hover
- **WHEN** user hovers over any contact link
- **THEN** all text elements transition smoothly to `brutalist-accent`
- **AND** border color transitions to `brutalist-accent`
- **AND** transition duration is 150ms or less