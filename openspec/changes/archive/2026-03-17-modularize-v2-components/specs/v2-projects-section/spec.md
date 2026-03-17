## ADDED Requirements

### Requirement: Projects section component exists
The system SHALL provide a Projects.svelte component in src/sections/ that renders the projects teaser with brutalist styling.

#### Scenario: Projects renders with correct structure
- **WHEN** the Projects component is mounted with projects data
- **THEN** it SHALL display up to 3 projects in a grid layout
- **AND** each project SHALL show index number, name, subtitle, and tags
- **AND** it SHALL include the section label "[SEC 02 // RECENT_WORK]"
- **AND** it SHALL include a "[VIEW ALL]" link to /projects

#### Scenario: Projects section handles empty data
- **WHEN** the Projects component receives an empty projects array
- **THEN** it SHALL render gracefully without errors

### Requirement: Projects section accepts data props
The Projects component SHALL accept a `projects` prop containing the array of project data.

#### Scenario: Projects receives correct prop type
- **WHEN** the Projects component is used in index.astro
- **THEN** it SHALL receive the projects collection from getCollection
- **AND** each project SHALL have access to project.data.name, project.data.subtitle, and project.data.tags