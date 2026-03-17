## ADDED Requirements

### Requirement: Blogs browser displays all blog posts in a list
The system SHALL render a complete list of all blog posts from the blog collection with consistent v2 brutalist styling.

#### Scenario: Display blogs list
- **WHEN** user navigates to the blogs page
- **THEN** all blog posts are displayed in a bordered list layout
- **AND** each post shows publication date, title, description excerpt, and tags
- **AND** posts are sorted by publication date (newest first)

### Requirement: Blogs browser provides real-time search functionality
The system SHALL provide a search input that filters blog posts instantly as the user types.

#### Scenario: Search by blog title
- **WHEN** user types in the search input
- **THEN** the blog list updates in real-time to show only posts matching the search term
- **AND** matching is case-insensitive
- **AND** search matches against post titles

#### Scenario: Search by blog description
- **WHEN** user types in the search input
- **THEN** posts with matching descriptions are included in results
- **AND** matching is case-insensitive

#### Scenario: Search by blog tags
- **WHEN** user types in the search input
- **THEN** posts with matching tags are included in results
- **AND** matching is case-insensitive

### Requirement: Blogs browser provides tag filter buttons
The system SHALL display filter buttons for each unique tag across all blog posts.

#### Scenario: Display available tags
- **WHEN** blogs browser loads
- **THEN** all unique tags are displayed as filter buttons
- **AND** tags are displayed in uppercase monospace format within brackets
- **AND** tags are sorted alphabetically

#### Scenario: Toggle single tag filter
- **WHEN** user clicks a tag filter button
- **THEN** the button visually changes to active state (inverted colors)
- **AND** the blog list filters to show only posts with that tag
- **AND** clicking the same tag again deactivates it and removes the filter

#### Scenario: Combine multiple tag filters
- **WHEN** user selects multiple tag filters
- **THEN** the blog list shows posts that match ALL selected tags (AND logic)
- **AND** all active tag buttons remain visually distinct

### Requirement: Blogs browser maintains v2 brutalist aesthetic
The system SHALL render the browser interface matching v2's terminal/brutalist design language.

#### Scenario: Apply v2 styling
- **WHEN** blogs browser is displayed
- **THEN** the interface uses monospace fonts for labels
- **AND** section labels follow "[SEC // BLOGS BROWSER]" format
- **AND** borders use dashed lines with brutalist colors
- **AND** hover states provide visual feedback with color inversion

### Requirement: Blogs browser allows navigation to blog post
The system SHALL allow users to click on a blog post to view its full content.

#### Scenario: Navigate to blog post
- **WHEN** user clicks on a blog post row
- **THEN** the browser navigates to the blog post viewer page
- **AND** the URL follows the pattern /blog/[slug]
- **AND** the row provides visual feedback on hover

### Requirement: Blogs browser displays read time estimate
The system SHALL show an estimated read time for each blog post.

#### Scenario: Display read time
- **WHEN** blog post is rendered in the list
- **THEN** an estimated read time is displayed
- **AND** the format follows "Read Time: Xmin"
- **AND** read time is calculated based on content length or provided metadata

### Requirement: Blogs browser shows publication date
The system SHALL display the publication date for each blog post.

#### Scenario: Display publication date
- **WHEN** blog post is rendered in the list
- **THEN** the publication date is shown in ISO format (YYYY-MM-DD)
- **AND** the date is displayed in monospace font

### Requirement: Blogs browser component is modular and reusable
The system SHALL provide a Svelte component that can be used in different pages.

#### Scenario: Component integration
- **WHEN** the BlogsBrowser component is imported and instantiated
- **THEN** it accepts a blogs data prop containing blog information
- **AND** the component renders independently without page-specific dependencies
- **AND** the component can be styled consistently with parent layout

### Requirement: Blogs browser view all link has clear affordance
The "[VIEW ALL]" link in the blogs section SHALL use clear interactive styling that distinguishes it from decorative elements.

#### Scenario: View all link is clearly interactive
- **WHEN** the blogs section renders
- **THEN** the "[VIEW ALL]" link uses `--color-brutalist-accent`
- **AND** it has `cursor: pointer`
- **AND** on hover, it transitions to bright white text
- **AND** it uses distinct underline or color change on hover