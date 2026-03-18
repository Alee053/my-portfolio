## ADDED Requirements

### Requirement: Contact links have minimum touch target size
Each contact link SHALL have a minimum clickable area of 44px height and fullwidth of the modal content area.

#### Scenario: Link renders with adequate touch target
- **WHEN** a contact link is displayed
- **THEN** the clickable area has a minimum height of 44px
- **AND** the clickable area spans the full width of the modal content
- **AND** the hit area includes padding around visible text

#### Scenario: User clicks anywhere on link container
- **WHEN** user clicks within the link's designated hit area (not just on text)
- **THEN** the link activates (opens URL or mailto)

### Requirement: Contact links have visible container affordance
Contact links SHALL display a visible container with background and border that signals clickability.

#### Scenario: Link renders in default state
- **WHEN** contact links are displayed
- **THEN** each link has a visible container with:
- Background fill using brutalist palette
- Border around the clickable region
- Appropriate padding (minimum py-3, px-4)

#### Scenario: Link transitions on hover
- **WHEN** user hovers over any contact link container
- **THEN** the entire container background subtlely shifts (opacity or color)
- **AND** border color transitions to accent color
- **AND** all transitions are smooth (150ms duration or less)

### Requirement: Contact links have adequate spacing
Contact links SHALL have sufficient vertical spacing to prevent accidental mis-clicks.

#### Scenario: Multiple links are displayed
- **WHEN** the Contact modal shows multiple contact options
- **THEN** there is minimum 12px vertical spacing between adjacent link containers
- **AND** each link container is visually distinct from neighbors