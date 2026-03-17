## ADDED Requirements

### Requirement: Single Post Fetch and Render
The renderer SHALL fetch blog post by slug from 'blog' collection and display full content.

#### Scenario: Slug Navigation
- **WHEN** `/blog/ai2048`
- **THEN** renders title, date, tags, full markdown body in brutalist layout.

### Requirement: Post Metadata Display
SHALL show post title, publish date, tags as badges.

#### Scenario: Metadata Render
- **WHEN** post loads
- **THEN** title large bold, tags inline, date mono small.

### Requirement: Content Styling
Body SHALL render markdown with brutalist typography (mono code, etc.).

#### Scenario: Body Display
- **WHEN** post has images/code
- **THEN** styled consistently: monospace blocks, simple images.

### Requirement: Back Navigation
SHALL include link or button to return to /blogs.

#### Scenario: Back Link
- **WHEN** on post page
- **THEN** [BACK TO BROWSER] link functional.

### Requirement: 404 Handling
If slug not found, SHALL show error page or redirect.

#### Scenario: Invalid Slug
- **WHEN** `/blog/nonexistent`
- **THEN** 404 with brutalist style.