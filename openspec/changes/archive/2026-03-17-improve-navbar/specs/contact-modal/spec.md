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
