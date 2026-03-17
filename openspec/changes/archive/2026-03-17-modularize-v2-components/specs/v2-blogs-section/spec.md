## ADDED Requirements

### Requirement: Blogs section component exists
The system SHALL provide a Blogs.svelte component in src/sections/ that renders the blogs teaser with brutalist styling.

#### Scenario: Blogs renders with correct structure
- **WHEN** the Blogs component is mounted with blogs data
- **THEN** it SHALL display up to 3 blogs in a grid layout
- **AND** each blog SHALL show date, title, and description preview
- **AND** it SHALL include the section label "[SEC 03 // RECENT_BLOGS]"
- **AND** it SHALL include a "[VIEW ALL]" link to /blogs

#### Scenario: Blogs section handles empty data
- **WHEN** the Blogs component receives an empty blogs array
- **THEN** the section SHALL not render (conditional rendering)

#### Scenario: Blogs item is clickable
- **WHEN** a user clicks on a blog row
- **THEN** it SHALL navigate to /blog/{slug}

### Requirement: Blogs section accepts data props
The Blogs component SHALL accept a `blogs` prop containing the array of blog data.

#### Scenario: Blogs receives correct prop type
- **WHEN** the Blogs component is used in index.astro
- **THEN** it SHALL receive the blog collection sorted by pubDate descending
- **AND** each blog SHALL have access to blog.data.title, blog.data.description, blog.data.pubDate, and blog.slug