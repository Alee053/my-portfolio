## ADDED Requirements

### Requirement: Hero section component exists
The system SHALL provide a Hero.svelte component in src/sections/ that renders the hero section with brutalist styling.

#### Scenario: Hero renders with correct structure
- **WHEN** the Hero component is mounted
- **THEN** it SHALL display the name "ALEJANDRO CASTRO" in uppercasebold typography
- **AND** it SHALL display the subtitle text for AI RESEARCHER & SYSTEM ARCHITECT
- **AND** it SHALL include the section label "[SEC 01 // HERO]"

#### Scenario: Hero animations work correctly
- **WHEN** the Hero component mounts
- **THEN** the name and subtitle SHALL animate in using GSAP with stagger effect
- **AND** animations SHALL match the original inline implementation timing

### Requirement: Hero section uses modular structure
The Hero component SHALL be imported and used by index.astro instead of inline markup.

#### Scenario: Hero is imported in page
- **WHEN** index.astro renders
- **THEN** it SHALL import Hero from "../../sections/Hero.svelte"
- **AND** the Hero component SHALL render in the correct position within the layout