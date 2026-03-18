## ADDED Requirements

### Requirement: Blogs browser displays all blog posts in a list
The system SHALL render a complete list of all blog posts from the blog collection with consistent brutalist styling using the BlogRow subcomponent.

#### Scenario: Display blogs list
- **WHEN** user navigates to the blogs page
- **THEN** all blog posts are displayed using the BlogRow component
- **AND** each post shows publication date, title, description excerpt
- **AND** posts are rendered in a bordered list layout matching index.astro style

### Requirement: Blogs browser provides real-time search functionality
The system SHALL provide a search input that filters blog posts instantly as the user types.

#### Scenario: Search input styling
- **WHEN** search input is displayed
- **THEN** the input has no focus ring or outline
- **AND** the input maintains border styling consistent with brutalist design
- **AND** placeholder uses underscore character

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

### Requirement: Blogs browser provides tag filter buttons in sidebar
The system SHALL display filter buttons for each unique tag in a horizontal sidebar layout.

#### Scenario: Display available tags in sidebar
- **WHEN** blogs browser loads
- **THEN** all unique tags are displayed in a horizontal row above the content list
- **AND** tags are displayed in uppercase monospace format within brackets
- **AND** tags are sorted alphabetically
- **AND** the sidebar shows active filter count when filters are applied

#### Scenario: Toggle single tag filter
- **WHEN** user clicks a tag filter button
- **THEN** the button visually changes to active state (inverted colors)
- **AND** the blog list filters to show only posts with that tag
- **AND** clicking the same tag again deactivates it and removes the filter

#### Scenario: Combine multiple tag filters
- **WHEN** user selects multiple tag filters
- **THEN** the blog list shows posts that match ALL selected tags (AND logic)
- **AND** all active tag buttons remain visually distinct

#### Scenario: Clear all filters
- **WHEN** user clicks clear filters button
- **THEN** all active tags are deselected
- **AND** search query is cleared
- **AND** the blog list shows all posts

### Requirement: Blogs browser provides date sorting
The system SHALL allow users to sort blog posts by publication date in ascending or descending order.

#### Scenario: Sort by date descending (default)
- **WHEN** blogs browser loads
- **THEN** blog posts are sorted by date descending (newest first)
- **AND** sort control shows "Date ↓" as active

#### Scenario: Toggle sort order
- **WHEN** user clicks the sort control
- **THEN** sort order toggles between ascending and descending
- **AND** the active sort button reflects current order

### Requirement: Blogs browser maintains brutalist aesthetic
The system SHALL render the browser interface matching the brutalist design language consistent with index.astro.

#### Scenario: Apply brutalist styling
- **WHEN** blogs browser is displayed
- **THEN** the interface uses monospace fonts for labels
- **AND** section labels follow "[SEC // BLOGS BROWSER]" format
- **AND** borders use dashed/solid lines with brutalist colors
- **AND** hover states provide visual feedback with color inversion
- **AND** BlogRow component styling matches home page section

### Requirement: Blogs browser allows navigation to blog post
The system SHALL allow users to click on a blog post to view its full content.

#### Scenario: Navigate to blog post
- **WHEN** user clicks on a blog post row
- **THEN** the browser navigates to the blog post viewer page
- **AND** the URL follows the pattern /blog/[slug]

### Requirement: Blogs browser displays empty state
The system SHALL display a message when no blogs match the current filters.

#### Scenario: No matching blogs
- **WHEN** applied filters or search result in no matching blogs
- **THEN** a message is displayed in monospace format
- **AND** message indicates "NO_BLOGS_MATCH_FILTERS"
- **AND** message styling matches brutalist aesthetic

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