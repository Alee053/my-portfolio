## MODIFIED Requirements

### Requirement: Hamburger menu icon toggles sidebar
The hamburger menu icon SHALL open the mobile sidebar when tapped, unless a modal is already open in which case it SHALL close the modal first.

#### Scenario: User taps hamburger to open
- **WHEN** user taps the hamburger menu icon
- **AND** no modal is open
- **THEN** the mobile sidebar opens with GSAP animation
- **AND** the hamburger icon transitions to a close indicator
- **AND** the aria-expanded attribute updates to "true"

#### Scenario: User taps hamburger to close
- **WHEN** user taps the hamburger menu icon while sidebar is open
- **THEN** the mobile sidebar closes with animation
- **AND** the icon returns to hamburger state
- **AND** the aria-expanded attribute updates to "false"

#### Scenario: Modal open, user taps hamburger
- **WHEN** user taps the hamburger menu icon
- **AND** a modal is open
- **THEN** the open modal closes first
- **AND** the sidebar remains closed
