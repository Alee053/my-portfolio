## ADDED Requirements

### Requirement: Modal backdrop does not cover navbar
The modal backdrop SHALL use a z-index lower than the navbar to prevent obscuring it.

#### Scenario: Modal opens with navbar visible
- **WHEN** a modal opens
- **THEN** the backdrop appears behind the navbar (z-30)
- **AND** the navbar remains fully visible and unblurred

### Requirement: Z-index hierarchy preserves layering
The system SHALL maintain a consistent z-index hierarchy across all fixed/absolute elements.

#### Scenario: Layering order verification
- **WHEN** all elements are rendered
- **THEN** the backdrop has z-30
- **AND** the navbar has z-40
- **AND** the modal panel has z-50
- **AND** no elements overlap incorrectly