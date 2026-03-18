## ADDED Requirements

### Requirement: ProjectRow displays conditional action buttons
The ProjectRow component SHALL display up to three action buttons based on available project data: GitHub link, blog post, and live demo.

#### Scenario: GitHub button shows for external link
- **WHEN** a project has a `link` field with an external URL
- **THEN** a `[GITHUB ↗]` button is displayed
- **AND** clicking it opens the URL in a new tab
- **AND** the button uses brutalist bracket styling

#### Scenario: Blog button shows for internal blog post
- **WHEN** a project has a `blog_slug` field
- **THEN** a `[READ_LOG]` or `[ARTICLE]` button is displayed
- **AND** clicking it navigates to `/blog/{blog_slug}`
- **AND** the button uses brutalist bracket styling

#### Scenario: Demo button shows for live demo
- **WHEN** a project has a `demo_url` field
- **THEN** a `[LIVE_DEMO ↗]` button is displayed
- **AND** clicking it opens the URL in a new tab
- **AND** the button uses brutalist bracket styling

#### Scenario: Multiple buttons display when data available
- **WHEN** a project has both GitHub, blog, and demo links
- **THEN** all three buttons are displayed inline
- **AND** buttons are separated by consistent spacing

#### Scenario: Buttons hidden when data unavailable
- **WHEN** a project lacks a particular link field
- **THEN** the corresponding button is not rendered
- **AND** no empty placeholder is shown