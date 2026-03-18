## ADDED Requirements

### Requirement: Blog collection uses Zod schema with required fields
The system SHALL define a blog content collection with Zod schema including title, date, description, and tags fields.

#### Scenario: Required fields validated
- **WHEN** a markdown file is added to the blog collection
- **THEN** Astro validates that `title`, `date`, `description`, and `tags` are present
- **AND** TypeScript types are inferred for type-safe access

### Requirement: Status field with default value
The system SHALL include an optional `status` field with default value `[STATUS: ARCHIVED]`.

#### Scenario: Default status applied
- **WHEN** a blog post has no status field in frontmatter
- **THEN** the status defaults to `[STATUS: ARCHIVED]`

#### Scenario: Custom status preserved
- **WHEN** a blog post specifies a status value
- **THEN** the specified status is used instead of default

### Requirement: Optional figure field for images
The system SHALL include an optional `fig_01` field for featured images.

#### Scenario: Figure URL stored
- **WHEN** a blog post specifies `fig_01` in frontmatter
- **THEN** the URL is accessible via the collection entry
- **AND** field is optional with no default

### Requirement: Optional repository URL field
The system SHALL include an optional `repo_url` field for source code links.

#### Scenario: Repository URL stored
- **WHEN** a blog post specifies `repo_url` in frontmatter
- **THEN** the URL is accessible via the collection entry
- **AND** field is optional with no default

### Requirement: Slugs auto-generated from filenames
The system SHALL generate blog post slugs from markdown filenames without manual slug fields.

#### Scenario: Slug generation
- **WHEN** a blog post file is named `ai2048.md`
- **THEN** the slug is automatically `ai2048`
- **AND** no manual `slug` field is present in frontmatter

### Requirement: Date field normalizes to Date type
The system SHALL coerce the `date` field to a Date type for consistent handling.

#### Scenario: Date coercion
- **WHEN** frontmatter contains `date: 2025-12-23`
- **THEN** the value is accessible as a Date object
- **AND** ISO string format is also supported