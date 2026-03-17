## ADDED Requirements

### Requirement: Blogs List Display
The blogs browser SHALL fetch all entries from 'blog' content collection and display in list format similar to projects.

#### Scenario: Blogs List on Load
- **WHEN** `/blogs` loads
- **THEN** shows all blogs with number, title, excerpt (first para?), tags.

### Requirement: Tag Filtering for Blogs
SHALL filter blogs by selected tags from unique set.

#### Scenario: Blog Tag Filter
- **WHEN** selects [AI]
- **THEN** shows blogs tagged AI.

### Requirement: Search Blogs
Search SHALL filter blogs by title, excerpt/tags.

#### Scenario: Blog Search
- **WHEN** types \"portfolio\"
- **THEN** filters matching blogs.

### Requirement: Internal Navigation on Click
Clicking blog item SHALL navigate to `/blog/[slug]` .

#### Scenario: Blog Click
- **WHEN** clicks item
- **THEN** routes to renderer page.

### Requirement: Browser UI Elements
Header with [SEC // BLOGS BROWSER], title \"Blogs\", search input.

#### Scenario: UI Header
- **WHEN** loads
- **THEN** search/filter UI present, brutalist style.