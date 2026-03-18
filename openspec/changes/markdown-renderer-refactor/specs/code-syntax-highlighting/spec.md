## ADDED Requirements

### Requirement: Code blocks use dark theme syntax highlighting
The system SHALL render fenced code blocks with syntax highlighting using Shiki's `github-dark` theme.

#### Scenario: Highlight code block
- **WHEN** markdown contains a fenced code block with language specifier
- **THEN** the code is syntax highlighted with the github-dark theme
- **AND** colors provide high contrast against `#111111` background
- **AND** no border-radius is applied (sharp edges)

### Requirement: Inline code is visually distinct
The system SHALL style inline code elements with monospace font and subtle background.

#### Scenario: Style inline code
- **WHEN** markdown contains inline code with backticks
- **THEN** the code is rendered in monospace font
- **AND** has a subtle background color
- **AND** maintains sharp edges (no border-radius)

### Requirement: Code blocks have proper container styling
The system SHALL wrap code blocks in containers that match the brutalist aesthetic.

#### Scenario: Code block container
- **WHEN** a code block is rendered
- **THEN** the container has a `1px solid #333333` border
- **AND** rounded-none style (no border-radius)
- **AND** appropriate padding for readability