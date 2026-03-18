## ADDED Requirements

### Requirement: Article body uses Serif font
The system SHALL render article body text using a Serif font family (IBM Plex Serif or equivalent).

#### Scenario: Body text typography
- **WHEN** markdown content is rendered within an `<article>` element
- **THEN** paragraph text uses IBM Plex Serif or similar Serif font
- **AND** font color is `#E2E8F0`
- **AND** line-height is `1.8` for optimal readability

### Requirement: Article headers use Monospace font
The system SHALL render article headers (h1, h2, h3) using JetBrains Mono monospace font.

#### Scenario: Header typography
- **WHEN** headers appear within an `<article>` element
- **THEN** headers use JetBrains Mono font family
- **AND** headers are styled in UPPERCASE
- **AND** font-weight is normal (not bold)
- **AND** color is `#FFFFFF`

### Requirement: h2 and h3 have dashed border separators
The system SHALL display a 1px dashed `#333333` border below h2 and h3 headers within articles.

#### Scenario: Header separators
- **WHEN** h2 or h3 headers are rendered in an article
- **THEN** a 1px dashed border in `#333333` appears below the header
- **AND** the border extends to the container edge or text width

### Requirement: Article constrained to maximum width
The system SHALL constrain article content to `max-w-3xl` for optimal line length.

#### Scenario: Content width constraint
- **WHEN** article content is rendered
- **THEN** the content container has max-width of 48rem (max-w-3xl)
- **AND** content is centered horizontally
- **AND** responsive padding is applied on mobile

### Requirement: Images have brutalist styling
The system SHALL style images within articles with sharp edges and subtle borders.

#### Scenario: Image styling
- **WHEN** images appear in article content
- **THEN** images have `rounded-none` (no border-radius)
- **AND** width is 100% of container
- **AND** a `1px solid #333333` border is applied

### Requirement: Blockquotes styled as terminal output
The system SHALL style blockquotes with a terminal/system aesthetic.

#### Scenario: Blockquote styling
- **WHEN** blockquotes appear in article content
- **THEN** text color is `#888888`
- **AND** text is styled italic
- **AND** left border is `2px solid #FF5500`
- **AND** no border-radius (sharp edges)