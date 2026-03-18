## ADDED Requirements

### Requirement: Blog browser provides date sorting
The system SHALL allow users to sort blog posts by publication date in ascending or descending order.

#### Scenario: Sort by date descending
- **WHEN** user selects "Date ↓" sort option
- **THEN** blog posts are displayed with newest first
- **AND** sort button shows active state for descending option

#### Scenario: Sort by date ascending
- **WHEN** user selects "Date ↑" sort option
- **THEN** blog posts are displayed with oldest first
- **AND** sort button shows active state for ascending option

#### Scenario: Default sort order
- **WHEN** browser loads initially
- **THEN** blog posts are sorted by date descending (newest first)

### Requirement: Project browser provides title sorting
The system SHALL allow users to sort projects alphabetically by title.

#### Scenario: Sort by title ascending
- **WHEN** user selects "Title A-Z" sort option
- **THEN** projects are displayed in alphabetical order by title
- **AND** sort button shows active state for ascending option

#### Scenario: Sort by title descending
- **WHEN** user selects "Title Z-A" sort option
- **THEN** projects are displayed in reverse alphabetical order by title
- **AND** sort button shows active state for descending option

#### Scenario: Default sort order for projects
- **WHEN** browser loads initially
- **THEN** projects are displayed in their original order from the collection

### Requirement: Sort controls integrate with filtering
The system SHALL maintain sort order when filters are applied or cleared.

#### Scenario: Sorting persists with filters
- **WHEN** user has selected a sort order
- **AND** user applies a tag filter
- **THEN** filtered results maintain the selected sort order
- **AND** sort control continues to show active state

#### Scenario: Clearing filters preserves sort
- **WHEN** user clears all filters
- **THEN** the selected sort order is preserved
- **AND** results continue to display in the selected order

### Requirement: Sort controls have brutalist styling
The system SHALL render sort controls matching the brutalist design language.

#### Scenario: Sort button styling
- **WHEN** sort controls are displayed
- **THEN** buttons use monospace font
- **AND** active sort shows inverted colors (brutalist-accent background)
- **AND** inactive sorts show border styling
- **AND** hover states provide visual feedback