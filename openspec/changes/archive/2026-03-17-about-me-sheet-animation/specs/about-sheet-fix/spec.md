## ADDED Requirements

### Requirement: About Me sheet toggle works
The About Me sheet in BaseLayout.astro SHALL toggle open/closed when the user clicks the "[ABOUT ME]" nav link.

#### Scenario: Clicking About Me opens the sheet
- **WHEN** the user clicks the "[ABOUT ME]" link in the navigation
- **THEN** the sheet SHALL slide in from the right side of the screen
- **AND** the animation SHALL use GSAP to translate from x: 100% to x: 0%

#### Scenario: Clicking close button or About Me again closes the sheet
- **WHEN** the sheet is open and the user clicks "[ABOUT ME]" again or clicks "[X]"
- **THEN** the sheet SHALL slide out to the right (x: 100%)
- **AND** the isModalOpen state SHALL toggle correctly

### Requirement: toggleAboutModal function is globally accessible
The toggleAboutModal function SHALL be accessible from inline onclick handlers in the HTML.

#### Scenario: Function is exposed on window object
- **WHEN** the page loads
- **THEN** the toggleAboutModal function SHALL be available as window.toggleAboutModal
- **AND** calling window.toggleAboutModal() SHALL work from any inline onclick handler

#### Scenario: GSAP animation executes correctly
- **WHEN** toggleAboutModal is called to open
- **THEN** gsap.to SHALL animate the modal element with:
  - x: '0%' (slide in)
  - duration: 0.5 seconds
  - ease: 'power3.out'

- **AND** when called to close:
- **THEN** gsap.to SHALL animate with:
  - x: '100%' (slide out)
  - duration: 0.4 seconds
  - ease: 'power3.in'
