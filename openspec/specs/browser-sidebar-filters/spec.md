## ADDED Requirements

### Requirement: Browser displays tags in horizontal sidebar layout
The system SHALL display tag filter buttons in a horizontal sidebar layout positioned above the content list.

#### Scenario: Display tags in sidebar
- **WHEN** browser loads with content
- **THEN** tag filter buttons are displayed in a horizontal row above the content list
- **AND** tags are sorted alphabetically
- **AND** each tag is displayed in uppercase monospace format within brackets

#### Scenario: Active filter visual feedback
- **WHEN** user clicks a tag to activate it
- **THEN** the active tag displays with inverted colors (brutalist-accent background, black text)
- **AND** non-active tags display with border styling
- **AND** active tags are visually distinct from inactive tags

### Requirement: Browser shows active filter count
The system SHALL display the number of currently active filters.

#### Scenario: Display filter count
- **WHEN** one or more tags are selected
- **THEN** a filter count indicator shows the number of active filters
- **AND** the count is displayed in monospace format (e.g., "[3_ACTIVE]")

#### Scenario: No filter count when empty
- **WHEN** no filters are active
- **THEN** no filter count indicator is displayed

### Requirement: Browser provides clear all filters control
The system SHALL provide a control to clear all active filters at once.

#### Scenario: Clear all filters
- **WHEN** user clicks the clear filters button
- **THEN** all active tags are deselected
- **AND** search query is cleared
- **AND** the content list shows all items

#### Scenario: Clear button visibility
- **WHEN** no filters are active and no search query exists
- **THEN** the clear filters button is not displayed
- **AND** when filters or search query are active, the button is displayed

### Requirement: Search input has no focus ring or outline
The system SHALL render search inputs without visible focus ring or outline.

#### Scenario: Search input styling
- **WHEN** search input receives focus
- **THEN** no ring or outline is visible around the input
- **AND** the input maintains its border styling
- **AND** the cursor is visible for text entry

### Requirement: Sidebar layout is responsive
The system SHALL maintain usability of the sidebar layout on different screen sizes.

#### Scenario: Mobile responsive sidebar
- **WHEN** viewport width is small
- **THEN** tags wrap to multiple lines if needed
- **AND** all controls remain accessible
- **AND** sorting controls remain visible