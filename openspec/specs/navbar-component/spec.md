## ADDED Requirements

### Requirement: Navbar displays navigation links
The navbar SHALL display navigation links for HOME, ABOUT ME, PROJECTS, BLOGS, and CONTACT on desktop viewports (768px and wider). On mobile viewports (below 768px), the navbar SHALL display a hamburger menu icon instead of horizontal navigation links.

#### Scenario: User views navbar on desktop
- **WHEN** the page loads on a viewport 768px or wider
- **THEN** the navbar displays all navigation links in the horizontal layout with bracket notation (e.g., [HOME])
- **AND** the hamburger menu icon is hidden

#### Scenario: User views navbar on mobile
- **WHEN** the page loads on a viewport smaller than 768px
- **THEN** the navbar displays the hamburger menu icon
- **AND** the horizontal navigation links are hidden
- **AND** the technical metadata and LiveTimestamp remain visible in the navbar header

### Requirement: Navbar displays hamburger menu on mobile
The navbar SHALL display a hamburger menu icon on viewports smaller than 768px instead of horizontal navigation links.

#### Scenario: User views navbar on mobile
- **WHEN** the navbar renders on a viewport smaller than 768px
- **THEN** the hamburger menu icon is visible
- **AND** the horizontal navigation links are hidden
- **AND** the technical metadata annotation and LiveTimestamp remain visible in the navbar

#### Scenario: User views navbar on desktop
- **WHEN** the navbar renders on a viewport 768px or wider
- **THEN** the horizontal navigation links are visible
- **AND** the hamburger menu icon is hidden
- **AND** the navbar displays as specified in ADDED Requirements from the original spec

### Requirement: Hamburger menu icon is accessible
The hamburger menu icon SHALL have proper accessibility attributes and minimum touch target size.

#### Scenario: Hamburger icon accessibility
- **WHEN** the hamburger menu icon renders
- **THEN** it has aria-label="Open navigation menu"
- **AND** it has aria-expanded="false" when sidebar is closed
- **AND** it has aria-expanded="true" when sidebar is open
- **AND** it has minimum touch target dimensions of 44x44px

### Requirement: Hamburger menu icon toggles sidebar
The hamburger menu icon SHALL open the mobile sidebar when tapped.

#### Scenario: User taps hamburger to open
- **WHEN** user taps the hamburger menu icon
- **THEN** the mobile sidebar opens with GSAP animation
- **AND** the hamburger icon transitions to an X or close icon
- **AND** the aria-expanded attribute updates to "true"

#### Scenario: User taps hamburger to close
- **WHEN** user taps the hamburger menu icon while sidebar is open
- **THEN** the mobile sidebar closes with animation
- **AND** the icon returns to hamburger state
- **AND** the aria-expanded attribute updates to "false"

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

### Requirement: Navbar z-index above modal backdrop
The navbar SHALL have a z-index higher than the modal backdrop to remain visible and interactive when modals are open.

#### Scenario: Navbar visible during modal
- **WHEN** a modal is open
- **THEN** the navbar remains fully visible (z-40)
- **AND** the navbar is not blurred by the backdrop
- **AND** navbar links remain clickable

### Requirement: Navbar styling matches design system
The navbar SHALL maintain the existing brutalist aesthetic with proper colors, fonts, and positioning.

#### Scenario: Navbar renders
- **WHEN** the navbar is displayed
- **THEN** it uses the brutalist color palette (bg-brutalist-bg, text-brutalist-text, border-brutalist-line)
- **AND** it has sticky positioning at the top
- **AND** it uses Space Grotesk and Liberation Mono fonts
- **AND** it has z-40 to stay above modal backdrops