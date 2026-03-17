## ADDED Requirements

### Requirement: Projects browser displays all projects in a list
The system SHALL render a complete list of all projects from the projects collection with consistent v2 brutalist styling.

#### Scenario: Display projects list
- **WHEN** user navigates to the projects page
- **THEN** all projects are displayed in a bordered list layout
- **AND** each project shows title, subtitle, and technology tags
- **AND** projects are sorted by their defined order field

### Requirement: Projects browser provides real-time search functionality
The system SHALL provide a search input that filters projects instantly as the user types.

#### Scenario: Search by project title
- **WHEN** user types in the search input
- **THEN** the project list updates in real-time to show only projects matching the search term
- **AND** matching is case-insensitive
- **AND** search matches against project titles

#### Scenario: Search by project subtitle
- **WHEN** user types in the search input
- **THEN** projects with matching subtitles are included in results
- **AND** matching is case-insensitive

#### Scenario: Search by technology tags
- **WHEN** user types in the search input
- **THEN** projects with matching technology tags are included in results
- **AND** matching is case-insensitive

### Requirement: Projects browser provides tag filter buttons
The system SHALL display filter buttons for each unique technology tag across all projects.

#### Scenario: Display available tags
- **WHEN** projects browser loads
- **THEN** all unique technology tags are displayed as filter buttons
- **AND** tags are displayed in uppercase monospace format within brackets
- **AND** tags are sorted alphabetically

#### Scenario: Toggle single tag filter
- **WHEN** user clicks a tag filter button
- **THEN** the button visually changes to active state (inverted colors)
- **AND** the project list filters to show only projects with that tag
- **AND** clicking the same tag again deactivates it and removes the filter

#### Scenario: Combine multiple tag filters
- **WHEN** user selects multiple tag filters
- **THEN** the project list shows projects that match ALL selected tags (AND logic)
- **AND** all active tag buttons remain visually distinct

### Requirement: Projects browser maintains v2 brutalist aesthetic
The system SHALL render the browser interface matching v2's terminal/brutalist design language.

#### Scenario: Apply v2 styling
- **WHEN** projects browser is displayed
- **THEN** the interface uses monospace fonts for labels
- **AND** section labels follow "[SEC // PROJECTS BROWSER]" format
- **AND** borders use dashed lines with brutalist colors
- **AND** hover states provide visual feedback with color inversion

### Requirement: Projects browser allows navigation to project links
The system SHALL allow users to click on a project to open its external link.

#### Scenario: Navigate to project
- **WHEN** user clicks on a project row
- **THEN** the project's external link opens in a new browser tab
- **AND** the row provides visual feedback on hover (cursor changes, background color)

### Requirement: Projects browser component is modular and reusable
The system SHALL provide a Svelte component that can be used in different pages.

#### Scenario: Component integration
- **WHEN** the ProjectsBrowser component is imported and instantiated
- **THEN** it accepts a projects data prop containing project information
- **AND** the component renders independently without page-specific dependencies
- **AND** the component can be styled consistently with parent layout

### Requirement: Projects browser view all link has clear affordance
The "[VIEW ALL]" link in the projects section SHALL use clear interactive styling that distinguishes it from decorative elements.

#### Scenario: View all link is clearly interactive
- **WHEN** the projects section renders
- **THEN** the "[VIEW ALL]" link uses `--color-brutalist-accent`
- **AND** it has `cursor: pointer`
- **AND** on hover, it transitions to bright white text
- **AND** it uses distinct underline or color change on hover