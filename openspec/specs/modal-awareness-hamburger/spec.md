## ADDED Requirements

### Requirement: Hamburger closes open modals on mobile
When the hamburger menu icon is tapped on mobile viewports and a modal is currently open, the hamburger SHALL close the modal instead of opening the sidebar.

#### Scenario: Modal open, user taps hamburger
- **WHEN** a modal (About or Contact) is open
- **AND** user taps the hamburger menu icon on mobile
- **THEN** the open modal closes
- **AND** the sidebar remains closed

#### Scenario: No modal open, user taps hamburger
- **WHEN** no modal is open
- **AND** user taps the hamburger menu icon on mobile
- **THEN** the sidebar opens normally

### Requirement: Hamburger uses bracket-style close indicator
The hamburger menu icon on mobile SHALL display a bracket-style close indicator `[X]` when toggling states, consistent with BaseModal close button styling.

#### Scenario: Close button displays bracket art
- **WHEN** the sidebar renders on mobile
- **THEN** the close button displays `[X]` instead of `×`
- **AND** the button uses font-mono typography
