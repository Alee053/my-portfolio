## ADDED Requirements

### Requirement: TOC headings scroll below navbar
The system SHALL ensure TOC navigation scrolls headings to a position below the fixed navbar, not behind it.

#### Scenario: User clicks TOC link
- **WHEN** user clicks a TOC link to a heading
- **THEN** the page scrolls to that heading
- **AND** the heading is visible below the navbar (not hidden behind it)
- **AND** scroll-margin-top accounts for navbar (80px) and sticky blog nav (~60px) totaling approximately 160px

### Requirement: TOC displays correctly across all breakpoints
The system SHALL render the TOC without duplication or collision between mobile and desktop views.

#### Scenario: Mobile TOC renders without desktop TOC
- **WHEN** viewing on mobile breakpoint (< md)
- **THEN** only the mobile TOC is visible
- **AND** the desktop TOC is completely hidden

#### Scenario: Desktop TOC renders without mobile TOC
- **WHEN** viewing on desktop breakpoint (>= md)
- **THEN** only the desktop TOC is visible
- **AND** the mobile TOC is completely hidden

### Requirement: TOC does not break mobile layout
The system SHALL render the TOC without causing horizontal overflow or layout breaks on mobile devices.

#### Scenario: Mobile device views blog post
- **WHEN** user views a blog post on a small phone (< 375px width)
- **THEN** the TOC container fits within the viewport
- **AND** text does not overflow horizontally
- **AND** the TOC remains readable and functional