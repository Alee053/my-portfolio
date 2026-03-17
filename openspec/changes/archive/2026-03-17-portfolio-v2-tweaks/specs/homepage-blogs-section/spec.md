## ADDED Requirements

### Requirement: Homepage displays recent blogs section
The V2 homepage SHALL display a "Recent Blogs" section that shows the latest blog posts from the blog collection.

#### Scenario: Blogs section displays on homepage
- **WHEN** the user visits the V2 homepage (/v2/)
- **THEN** a "Blogs" section is visible below the Projects section

#### Scenario: Shows most recent blogs
- **WHEN** the blogs section renders
- **THEN** it displays the 2-3 most recent blog posts sorted by pubDate (newest first)

### Requirement: Blog entry displays required information
Each blog entry in the homepage section SHALL display the blog title, publication date, and a short description.

#### Scenario: Blog entry shows title
- **WHEN** a blog entry is rendered
- **THEN** the blog title is displayed in uppercase

#### Scenario: Blog entry shows date
- **WHEN** a blog entry is rendered
- **THEN** the publication date is displayed in a readable format

#### Scenario: Blog entry shows description preview
- **WHEN** a blog entry is rendered
- **THEN** a truncated description (first ~100 characters) is displayed

### Requirement: Blogs section links to full blogs page
The blogs section SHALL include a link or indication that users can view all blogs.

#### Scenario: Clicking blog navigates to blog detail
- **WHEN** the user clicks on a blog entry
- **THEN** they are navigated to the individual blog page

### Requirement: Empty state handling
The blogs section SHALL handle the case when no blogs exist gracefully.

#### Scenario: No blogs available
- **WHEN** there are no blogs in the collection
- **THEN** the section displays "Coming soon" or is hidden
