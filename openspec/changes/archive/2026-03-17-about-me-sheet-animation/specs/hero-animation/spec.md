## ADDED Requirements

### Requirement: Hero text entrance animation
The v2 index page SHALL display a staggered entrance animation for hero text elements (name and subtitle) when the page loads.

#### Scenario: Hero animation plays on page load
- **WHEN** the user navigates to /v2/
- **THEN** the hero text elements (h1 name, subtitle paragraph) SHALL animate in with a staggered fade-in and slide-up effect
- **AND** the animation SHALL complete within 1 second total

#### Scenario: Animation uses GSAP library
- **WHEN** the hero animation triggers
- **THEN** it SHALL use GSAP (gsap.from) with the following properties:
  - y-axis transform from 20px to 0
  - opacity from 0 to 1
  - duration of 0.8 seconds
  - ease: power3.out
  - stagger: 0.1 seconds between elements

### Requirement: Animation targets correct elements
The hero animation SHALL target the following elements in src/pages/v2/index.astro:
- The h1 element containing "ALEJANDRO CASTRO"
- The subtitle p element with the bio text

#### Scenario: Both elements animate
- **WHEN** the page loads
- **THEN** both the name (h1) and subtitle (p) elements SHALL animate in sequence
