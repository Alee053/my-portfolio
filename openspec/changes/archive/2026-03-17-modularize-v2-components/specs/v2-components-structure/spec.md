## ADDED Requirements

### Requirement: V2 components directory structure exists
The system SHALL provide a `src/components/` directory mirroring thev1 structure.

#### Scenario: Directory structure is created
- **WHEN** the v2 components structure is implemented
- **THEN** the following directories SHALL exist:
  - `src/components/`
  - `src/components/subcomponents/`

### Requirement: SectionLabel subcomponent exists
The system SHALL provide a reusable SectionLabel.svelte component for rendering section labels.

#### Scenario: SectionLabel renders correctly
- **WHEN** SectionLabel is used with purpose and label props
- **THEN** it SHALL render a div with text `[SEC XX // LABEL]`
- **AND** the label text SHALL be customizable via props

### Requirement: Background and LoadingScreen components exist
The system SHALL provide Background.svelte and LoadingScreen.svelte in src/components/ matching v1 functionality.

#### Scenario: Components match v1 interface
- **WHEN** Background.svelte and LoadingScreen.svelte are implemented
- **THEN** they SHALL have the same props and behavior as v1 counterparts
- **AND** they SHALL be available for import from src/components/

### Requirement: Reusable row components exist
The system SHALL provide ProjectRow.svelte and BlogRow.svelte subcomponents for rendering individual list items.

#### Scenario: ProjectRow renders correctly
- **WHEN** ProjectRow receives project data and index
- **THEN** it SHALL render the project row with index, name, subtitle, and tags
- **AND** it SHALL accept hover behavior via props

#### Scenario: BlogRow renders correctly
- **WHEN** BlogRow receives blog data
- **THEN** it SHALL render the blog row with date, title, and description preview
- **AND** it SHALL accept click handler via props for navigation