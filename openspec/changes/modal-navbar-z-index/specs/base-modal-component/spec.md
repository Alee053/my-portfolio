## MODIFIED Requirements

### Requirement: BaseModal backdrop positioning
The BaseModal backdrop SHALL be positioned to not cover the navbar, using a z-index lower than the navbar.

#### Scenario: Backdrop behind navbar
- **WHEN** a modal opens
- **THEN** the backdrop uses z-30 (below navbar's z-40)
- **AND** the navbar remains clickable and unblurred
- **AND** the main content area appears behind the backdrop

## ADDED Requirements

### Requirement: BaseModal panel above all elements
The BaseModal panel SHALL render above both the backdrop and navbar.

#### Scenario: Modal panel z-index
- **WHEN** a modal renders
- **THEN** the modal panel uses z-50
- **AND** the panel is fully visible above the navbar