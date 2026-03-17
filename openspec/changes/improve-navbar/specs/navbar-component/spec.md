## ADDED Requirements

### Requirement: Navbar displays navigation links
The navbar SHALL display navigation links for HOME, ABOUT ME, PROJECTS, BLOGS, and CONTACT.

#### Scenario: User views navbar
- **WHEN** the page loads
- **THEN** the navbar displays all navigation links in the brutalist aesthetic with bracket notation (e.g., [HOME])

### Requirement: HOME link navigates to index
The HOME link SHALL navigate to the index page.

#### Scenario: User clicks HOME
- **WHEN** user clicks the [HOME] link
- **THEN** the browser navigates to `/`

### Requirement: ABOUT ME link opens About modal
The ABOUT ME link SHALL trigger the existing About modal to open.

#### Scenario: User clicks ABOUT ME
- **WHEN** user clicks the [ABOUT ME] link
- **THEN** the About modal slides in from the right using GSAP animation

### Requirement: PROJECTS link navigates to Projects section
The PROJECTS link SHALL navigate to the Projects section on the index page or to the projects page.

#### Scenario: User clicks PROJECTS on index page
- **WHEN** user clicks the [PROJECTS] link on the index page
- **THEN** the page smoothly scrolls to the Projects section

#### Scenario: User clicks PROJECTS on other pages
- **WHEN** user clicks the [PROJECTS] link on any non-index page
- **THEN** the browser navigates to `/projects`

### Requirement: BLOGS link navigates to Blogs section
The BLOGS link SHALL navigate to the Blogs section on the index page or to the blogs page.

#### Scenario: User clicks BLOGS on index page
- **WHEN** user clicks the [BLOGS] link on the index page
- **THEN** the page smoothly scrolls to the Blogs section

#### Scenario: User clicks BLOGS on other pages
- **WHEN** user clicks the [BLOGS] link on any non-index page
- **THEN** the browser navigates to `/blogs`

### Requirement: CONTACT link opens Contact modal
The CONTACT link SHALL trigger the Contact modal to open.

#### Scenario: User clicks CONTACT
- **WHEN** user clicks the [CONTACT] link
- **THEN** the Contact modal slides in from the right using GSAP animation

### Requirement: Navbar displays metadata
The navbar SHALL display technical metadata annotation including a reference code and timestamp.

#### Scenario: User views metadata
- **WHEN** the navbar renders
- **THEN** it displays "[REF: AC-2026-BRUTALIST]" and a live timestamp in the format `YYYY.MM.DD_HH:MM:SS`

### Requirement: Navbar styling matches design system
The navbar SHALL maintain the existing brutalist aesthetic with proper colors, fonts, and positioning.

#### Scenario: Navbar renders
- **WHEN** the navbar is displayed
- **THEN** it uses the brutalist color palette (bg-brutalist-bg, text-brutalist-text, border-brutalist-line)
- **AND** it has sticky positioning at the top
- **AND** it includes the backdrop blur effect
- **AND** it uses Space Grotesk and Liberation Mono fonts
