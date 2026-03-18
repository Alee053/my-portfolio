## ADDED Requirements

### Requirement: AboutModal displays personal information
The AboutModal SHALL display personal information about the portfolio owner in a structured format.

#### Scenario: Modal shows about content
- **WHEN** the AboutModal is opened
- **THEN** a title "[MODAL: ABOUT]" is displayed
- **AND** personal information is presented in a readable format
- **AND** the close button is visible in the header

### Requirement: AboutModal uses BaseModal component
The AboutModal SHALL use the BaseModal component for consistent behavior.

#### Scenario: AboutModal inherits BaseModal behavior
- **WHEN** AboutModal is rendered
- **THEN** it extends BaseModal's styling and animations
- **AND** close button uses accent hover color

### Requirement: AboutModal listens to toggle event
The AboutModal SHALL respond to a custom event for toggling visibility.

#### Scenario: Toggle event opens/closes modal
- **WHEN** a `toggle-about-modal` event is dispatched
- **THEN** the modal toggles its visibility
- **AND** GSAP animations play for open/close transitions