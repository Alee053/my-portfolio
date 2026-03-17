## ADDED Requirements

### Requirement: Projects List Display
The projects browser SHALL fetch all entries from 'projects' content collection and display them in a paginated or scrollable list matching landing teaser style but full list.

#### Scenario: Full List on Load
- **WHEN** user visits `/projects`
- **THEN** renders all projects in grid layout: number, title, desc, tags badges.

### Requirement: Tag-based Filtering
The page SHALL derive unique tags from projects and allow multi-select filtering, showing only matching projects (any selected tag).

#### Scenario: Apply Tag Filter
- **WHEN** user selects tags e.g. [ML] [PYTHON]
- **THEN** list filters to projects with at least one matching tag; update UI badges.

### Requirement: Search Functionality
Search input SHALL filter projects client-side by matching title, description, or tags (case-insensitive substring).

#### Scenario: Search Query
- **WHEN** user types \"latent\" in search
- **THEN** list shows only matching projects; clear input resets.

### Requirement: External Redirect on Click
Each project item SHALL link to external URL (e.g., GitHub) from CMS 'github' or equivalent field on click.

#### Scenario: Project Selection
- **WHEN** user clicks project item
- **THEN** opens external link in new tab (_blank).

### Requirement: Browser Header
Page SHALL have section label [SEC // PROJECTS BROWSER], title \"Projects\", search input in bordered box.

#### Scenario: Header Display
- **WHEN** loads
- **THEN** matches reference UI with search placeholder \"_\", mono labels.