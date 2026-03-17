## ADDED Requirements

### Requirement: Blog post viewer renders markdown content
The system SHALL render blog post content written in markdown with proper HTML conversion.

#### Scenario: Render markdown
- **WHEN** user views a blog post
- **THEN** the markdown content is converted to properly formatted HTML
- **AND** headings, paragraphs, lists, and other markdown elements display correctly
- **AND** code blocks are syntax highlighted and styled appropriately

### Requirement: Blog post viewer displays post metadata
The system SHALL show blog post metadata including title, publication date, and tags.

#### Scenario: Display metadata
- **WHEN** user views a blog post
- **THEN** the post title is displayed prominently in v2 heading style
- **AND** the publication date is shown in a readable format
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
- **AND** typography uses appropriate font families and sizes
- **AND** prose content is styled for readability while maintaining brutalist aesthetic
- **AND** borders and decorative elements match v2 styling

### Requirement: Blog post viewer displays section label
The system SHALL show a section label identifying the page context.

#### Scenario: Display section label
- **WHEN** blog post viewer loads
- **THEN** a label showing "[SEC // BLOG VIEWER]" is displayed
- **AND** the label uses small monospace font
- **AND** the label is positioned at the top of the content area

### Requirement: Blog post viewer handles images properly
The system SHALL render hero images and inline images from blog posts.

#### Scenario: Display hero image
- **WHEN** blog post has a hero image defined
- **THEN** the hero image is displayed at the top of the post
- **AND** the image is sized appropriately for the layout
- **AND** the image maintains aspect ratio and responsiveness

#### Scenario: Display inline images
- **WHEN** blog post contains inline images in markdown
- **THEN** images are rendered with proper dimensions
- **AND** images are styled to fit within the content area

### Requirement: Blog post viewer handles missing blog posts gracefully
The system SHALL display an appropriate message when a blog post is not found.

#### Scenario: Blog post not found
- **WHEN** user navigates to a non-existent blog post slug
- **THEN** the system displays a 404 message or redirects appropriately
- **AND** the error maintains v2 styling

### Requirement: Blog post viewer applies proper prose styling
The system SHALL use Tailwind typography plugin classes for readable blog content.

#### Scenario: Apply prose classes
- **WHEN** blog post content is rendered
- **THEN** prose classes are applied for optimal readability
- **AND** headings have proper hierarchy and spacing
- **AND** links are styled distinctly from regular text
- **AND** code blocks have appropriate background and padding
- **AND** blockquotes have distinct styling
- **AND** lists are properly indented and spaced