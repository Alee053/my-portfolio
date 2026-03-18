## ADDED Requirements

### Requirement: KaTeX renders inline LaTeX equations
The system SHALL render inline LaTeX equations delimited by single dollar signs (`$...$`) using KaTeX.

#### Scenario: Render inline math
- **WHEN** markdown content contains inline LaTeX like `$E = mc^2$`
- **THEN** the equation is rendered as properly formatted inline math
- **AND** KaTeX CSS is applied for correct typography

### Requirement: KaTeX renders block LaTeX equations
The system SHALL render block-level LaTeX equations delimited by double dollar signs (`$$...$$`) using KaTeX.

#### Scenario: Render block math
- **WHEN** markdown content contains block LaTeX like `$$\sum_{i=1}^{n} x_i$$`
- **THEN** the equation is rendered as a centered block element
- **AND** the equation is properly typeset with correct spacing and sizing

### Requirement: KaTeX stylesheet is available
The system SHALL include the KaTeX CSS stylesheet in the page head for proper math rendering.

#### Scenario: Include KaTeX CSS
- **WHEN** a page renders markdown content with LaTeX
- **THEN** KaTeX CSS is loaded from CDN or bundled assets
- **AND** math elements have correct font families and spacing

### Requirement: LaTeX rendering works server-side
The system SHALL process LaTeX equations at build/render time without requiring client-side JavaScript.

#### Scenario: Server-side rendering
- **WHEN** Astro builds the page with markdown containing LaTeX
- **THEN** equations are rendered to HTML during build
- **AND** no client-side JavaScript is required for math display