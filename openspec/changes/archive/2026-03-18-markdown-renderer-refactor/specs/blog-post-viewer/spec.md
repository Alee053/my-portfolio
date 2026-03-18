## MODIFIED Requirements

### Requirement: Blog post viewer renders markdown content
The system SHALL render blog post content written in markdown with proper HTML conversion.

#### Scenario: Render markdown
- **WHEN** user views a blog post
- **THEN** the markdown content is converted to properly formatted HTML
- **AND** headings, paragraphs, lists, and other markdown elements display correctly
- **AND** code blocks are syntax highlighted using Shiki github-dark theme
- **AND** LaTeX equations are rendered using KaTeX

### Requirement: Blog post viewer displays post metadata
The system SHALL show blog post metadata including title, publication date, status, and tags.

#### Scenario: Display metadata
- **WHEN** user views a blog post
- **THEN** the post title is displayed prominently in v2 heading style
- **AND** the publication date is shown in a readable format
- **AND** the status badge (default `[STATUS: ARCHIVED]`) is displayed
- **AND** tags are displayed as bordered elements in uppercase monospace

### Requirement: Blog post viewer provides navigation back to blogs list
The system SHALL include a back button to return to the blogs browser.

#### Scenario: Navigate back to blogs
- **WHEN** user clicks the "BACK TO BROWSER" button
- **THEN** the browser navigates to /blogs
- **AND** the button is styled consistently with v2 aesthetic

### Requirement: Blog post viewer maintains v2 brutalist aesthetic
The system SHALL render the blog post interface matching v2's terminal/brutalist design language.

#### Scenario: Apply v2 styling
- **WHEN** blog post is displayed
- **THEN** the page uses v2 layout structure with proper spacing
- **AND** article headers use JetBrains Mono (UPPERCASE, normal weight)
- **AND** article body text uses Serif font (IBM Plex Serif or similar)
- **AND** body text color is #E2E8F0 with line-height 1.8
- **AND** h2/h3 headers have 1px dashed #333333 bottom border
- **AND** borders and decorative elements match v2 styling

### Requirement: Blog post viewer displays section label
The system SHALL show a section label identifying the page context.

#### Scenario: Display section label
- **WHEN** blog post viewer loads
- **THEN** a label showing "[SEC // BLOG VIEWER]" is displayed
- **AND** the label uses small monospace font
- **AND** the label is positioned at the top of the content area

### Requirement: Blog post viewer handles images properly
The system SHALL render featured images (fig_01) and inline images from blog posts.

#### Scenario: Display featured image
- **WHEN** blog post has a fig_01 defined
- **THEN** the featured image is displayed at the top of the post
- **AND** the image has 1px solid #333333 border
- **AND** the image has no border-radius (sharp edges)
- **AND** the image maintains aspect ratio and responsiveness

#### Scenario: Display inline images
- **WHEN** blog post contains inline images in markdown
- **THEN** images are rendered with rounded-none style
- **AND** images have 1px solid #333333 border
- **AND** width is 100% of container

### Requirement: Blog post viewer handles missing blog posts gracefully
The system SHALL display an appropriate message when a blog post is not found.

#### Scenario: Blog post not found
- **WHEN** user navigates to a non-existent blog post slug
- **THEN** the system displays a 404 message or redirects appropriately
- **AND** the error maintains v2 styling

### Requirement: Blog post viewer applies proper prose styling
The system SHALL use custom typography for readable blog content with split font hierarchy.

#### Scenario: Apply prose styling
- **WHEN** blog post content is rendered
- **THEN** content is constrained to max-w-3xl
- **AND** body paragraphs use Serif font family
- **AND** headers use Monospace font family (UPPERCASE)
- **AND** code blocks have github-dark theme with sharp edges
- **AND** blockquotes have #888888 italic text with #FF5500 left border
- **AND** links are styled distinctly from regular text

## ADDED Requirements

### Requirement: Blog post viewer renders LaTeX equations
The system SHALL display inline and block LaTeX equations using KaTeX.

#### Scenario: Render inline LaTeX
- **WHEN** blog post contains inline LaTeX like `$E = mc^2$`
- **THEN** the equation is rendered as properly formatted inline math

#### Scenario: Render block LaTeX
- **WHEN** blog post contains block LaTeX like `$$\sum_{i=1}^{n} x_i$$`
- **THEN** the equation is rendered as centered block with proper typesetting

### Requirement: Blog post viewer uses auto-generated slugs
The system SHALL retrieve blog posts using auto-generated slugs from filenames.

#### Scenario: Navigate to blog post
- **WHEN** user navigates to `/blog/ai2048`
- **THEN** the system loads the blog post from `ai2048.md`
- **AND** no manual slug field is required in frontmatter