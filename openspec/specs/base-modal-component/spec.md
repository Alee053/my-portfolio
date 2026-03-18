## ADDED Requirements

### Requirement: BaseModal renders with design system styling
The BaseModal component SHALL use the brutalist design system variables for consistent appearance.

#### Scenario: Modal uses design tokens for colors
- **WHEN** a modal is rendered
- **THEN** the background uses `bg-brutalist-bg`
- **AND** borders use `border-brutalist-line`
- **AND** text uses appropriate font classes

### Requirement: BaseModal provides close button with accent hover
The BaseModal SHALL provide a close button that uses the accent color on hover.

#### Scenario: Close button hover state
- **WHEN** user hovers over the close button
- **THEN** the button text changes to `brutalist-accent` color
- **AND** the transition is smooth (0.15s ease)

### Requirement: BaseModal exposes slot for content
The BaseModal SHALL accept content via slots for flexibility.

#### Scenario: Custom content in modal
- **WHEN** a parent component uses BaseModal
- **THEN** custom content can be passed via the default slot
- **AND** the content is rendered inside the modal body

### Requirement: BaseModal dispatches close event
The BaseModal SHALL emit a close event when the close button is clicked.

#### Scenario: Close button triggers event
- **WHEN** user clicks the close button
- **THEN** a `close` event is dispatched to the parent
- **AND** the modal initiates its close animation

### Requirement: BaseModal backdrop positioning
The BaseModal backdrop SHALL be positioned to not cover the navbar, using a z-index lower than the navbar.

#### Scenario: Backdrop behind navbar
- **WHEN** a modal opens
- **THEN** the backdrop uses z-30 (below navbar's z-40)
- **AND** the navbar remains clickable and unblurred
- **AND** the main content area appears behind the backdrop

### Requirement: BaseModal panel above all elements
The BaseModal panel SHALL render above both the backdrop and navbar.

#### Scenario: Modal panel z-index
- **WHEN** a modal renders
- **THEN** the modal panel uses z-50
- **AND** the panel is fully visible above the navbar