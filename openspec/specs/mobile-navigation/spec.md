## MODIFIED Requirements

### Requirement: Tapping hamburger opens sidebar
The system SHALL open a mobile sidebar navigation when the user taps the hamburger menu icon, unless a modal is already open in which case it SHALL close the modal first.

#### Scenario: User taps hamburger on mobile
- **WHEN** user taps the hamburger menu icon on a mobile viewport
- **AND** no modal is open
- **THEN** a sidebar slides in from the right side of the screen
- **AND** the sidebar fills the viewport width
- **AND** the sidebar displays all navigation links (HOME, ABOUT ME, PROJECTS, BLOGS, CONTACT)

#### Scenario: Modal open, user taps hamburger
- **WHEN** user taps the hamburger menu icon on a mobile viewport
- **AND** a modal is open
- **THEN** the open modal closes first
- **AND** the sidebar remains closed

## ADDED Requirements

### Requirement: Hamburger menu icon displays on mobile
The system SHALL display a hamburger menu icon in the navbar on viewports smaller than768px (md breakpoint).

#### Scenario: User views site on mobile
- **WHEN** the site is loaded on a viewport smaller than 768px
- **THEN** a hamburger menu icon is visible in the navbar header
- **AND** the horizontal desktop navigation links are hidden

#### Scenario: User views site on desktop
- **WHEN** the site is loaded on a viewport 768px or wider
- **THEN** the hamburger menu icon is hidden
- **AND** the horizontal desktop navigation links are visible

### Requirement: Mobile sidebar contains full navigation
The mobile sidebar SHALL contain all navigation elements from the desktop navbar including metadata annotation and LiveTimestamp.

#### Scenario: Sidebar displays navigation links
- **WHEN** the mobile sidebar is open
- **THEN** the sidebar displays [HOME], [ABOUT ME], [PROJECTS], [BLOGS], and [CONTACT] links
- **AND** the sidebar displays the reference code "[REF: AC-2026-MINIMAL]"
- **AND** the sidebar displays the LiveTimestamp component

### Requirement: Sidebar slides in with animation
The mobile sidebar SHALL animate into view using GSAP translateX animation from right to left.

#### Scenario: Sidebar opening animation
- **WHEN** user taps the hamburger menu icon
- **THEN** the sidebar animates from translateX(100%) to translateX(0)over 0.3 seconds
- **AND** a backdrop overlay fades in behind the sidebar

#### Scenario: Sidebar closing animation
- **WHEN** user closes the sidebar (by tapping backdrop, close button, or navigation link)
- **THEN** the sidebar animates from translateX(0) to translateX(100%) over 0.3 seconds
- **AND** the backdrop overlay fadesout

### Requirement: Backdrop overlay covers content
The system SHALL display a semi-transparent backdrop overlay when the mobile sidebar is open.

#### Scenario: Backdrop displays when sidebar opens
- **WHEN** the mobile sidebar opens
- **THEN** a semi-transparent backdrop overlays the page content behind the sidebar
- **AND** the backdrop has a z-index below the sidebar but above other content

#### Scenario: Backdrop allows click-outside-to-close
- **WHEN** user taps the backdrop area outside the sidebar
- **THEN** the sidebar closes withanimation
- **AND** the backdrop fades out

### Requirement: Navigation links function in mobile sidebar
All navigation links in the mobile sidebar SHALL function identically to the desktop navbar links.

#### Scenario: User taps HOME link in sidebar
- **WHEN** user taps the [HOME] link in the mobile sidebar
- **THEN** the sidebar closes
- **AND** the browser navigates to `/`

#### Scenario: User taps ABOUT ME link in sidebar
- **WHEN** user taps the [ABOUT ME] link in the mobile sidebar
- **THEN** the sidebar closes
- **AND** the About modal opens

#### Scenario: User taps PROJECTS link in sidebar
- **WHEN** user taps the [PROJECTS] link in the mobile sidebar
- **THEN** the sidebar closes
- **AND** the browser navigates to `/projects`

#### Scenario: User taps BLOGS link in sidebar
- **WHEN** user taps the [BLOGS] link in the mobile sidebar
- **THEN** the sidebar closes
- **AND** the browser navigates to `/blogs`

#### Scenario: User taps CONTACT link in sidebar
- **WHEN** user taps the [CONTACT] link in the mobile sidebar
- **THEN** the sidebar closes
- **AND** the Contact modal opens

### Requirement: Mobile sidebar touch targets meet accessibility standards
All interactive elements in the mobile sidebar SHALL have minimum touch target size of 44x44 pixels.

#### Scenario: Touch targets sized appropriately
- **WHEN** the mobile sidebar renders
- **THEN** all navigation links have minimum touch target dimensions of 44x44px
- **AND** the hamburger menu icon has minimum touch target dimensions of 44x44px

### Requirement: Hamburger icon maintains brutalist aesthetic
The hamburger menu icon SHALL match the brutalist design language of the portfolio.

#### Scenario: Hamburger icon styling
- **WHEN** the hamburger menu icon displays
- **THEN** it uses the brutalist color palette (text-brutalist-text)
- **AND** it uses font-mono typography
- **AND** it has hover state that changes to text-brutalist-accent

### Requirement: Sidebar preserves brutalist design
The mobile sidebar SHALL maintain the brutalist aesthetic with consistent colors, fonts, and styling.

#### Scenario: Sidebar visual design
- **WHEN** the mobile sidebar renders
- **THEN** it uses bg-brutalist-bg, text-brutalist-text, and border-brutalist-line colors
- **AND** it uses Liberation Mono font for navigation links
- **AND** it includes border separators between navigation items