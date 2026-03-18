## ADDED Requirements

### Requirement: Contact modal displays social links
The Contact modal SHALL display links to GitHub, LinkedIn, and email.

#### Scenario: User views Contact modal
- **WHEN** the Contact modal is open
- **THEN** it displays three contact options:
  - GitHub link with username/URL
  - LinkedIn link with profile URL
  - Email link with email address

### Requirement: Contact modal uses brutalist aesthetic
The Contact modal SHALL match the existing brutalist design system.

#### Scenario: Modal renders
- **WHEN** the Contact modal displays
- **THEN** it uses the same styling as the About modal:
  - Fixed position sliding from right
  - Brutalist background color (bg-brutalist-bg)
  - Left border (border-l border-brutalist-line)
  - Monospace font for labels
  - Bracket notation for identifiers (e.g., [MODAL: CONTACT])

### Requirement: Contact modal has close button
The Contact modal SHALL have a close button in the top right.

#### Scenario: User clicks close button
- **WHEN** user clicks the [X] button
- **THEN** the modal slides out to the right

### Requirement: Contact modal has smooth animation
The Contact modal SHALL use GSAP for entry and exit animations.

#### Scenario: Modal opens
- **WHEN** the Contact modal is triggered
- **THEN** it animates in from right to left over 0.5 seconds with power3.out easing

#### Scenario: Modal closes
- **WHEN** the Contact modal is closed
- **THEN** it animates out from left to right over 0.4 seconds with power3.in easing

### Requirement: Contact links open in new tab
External contact links (GitHub, LinkedIn) SHALL open in a new tab.

#### Scenario: User clicks GitHub link
- **WHEN** user clicks the GitHub link
- **THEN** the GitHub profile opens in a new tab

#### Scenario: User clicks LinkedIn link
- **WHEN** user clicks the LinkedIn link
- **THEN** the LinkedIn profile opens in a new tab

#### Scenario: User clicks email link
- **WHEN** user clicks the email link
- **THEN** the default email client opens with a new message

### Requirement: Contact modal displays section header
The Contact modal SHALL display a header with modal identifier.

#### Scenario: Modal renders
- **WHEN** the Contact modal is displayed
- **THEN** it shows "[MODAL: CONTACT]" in the top left
- **AND** the close button [X] in the top right

### Requirement: Contact information is configurable
The contact details (GitHub URL, LinkedIn URL, email) SHALL be passed as props or defined in a configurable location.

#### Scenario: Contact details change
- **WHEN** contact information needs updating
- **THEN** it can be modified in a single location without changing component code

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

### Requirement: Contact links have minimum touch target size
Each contact link SHALL have a minimum clickable area of 44px height and full width of the modal content area.

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
