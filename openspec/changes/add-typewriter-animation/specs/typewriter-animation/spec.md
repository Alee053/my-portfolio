## ADDED Requirements

### Requirement: Typewriter name animation
The hero section SHALL display the name "ALEJANDRO CASTRO" with a typewriter effect where each character appears sequentially from left to right.

#### Scenario: Name typing animation plays on page load
- **WHEN** the page loads and the hero section is visible
- **THEN** each character of "ALEJANDRO CASTRO" appears one by one with a consistent delay between characters
- **AND** the animation completes within 2 seconds total

#### Scenario: Name typing uses GSAP SplitText
- **WHEN** the typewriter animation is triggered
- **THEN** GSAP SplitText plugin splits the name into individual character elements
- **AND** each character is revealed using GSAP stagger animation

### Requirement: Typewriter description animation
The hero section SHALL display the subtitle description with a typewriter effect after the name animation completes.

#### Scenario: Description typing follows name animation
- **WHEN** the name animation completes
- **THEN** the subtitle "AI RESEARCHER & SYSTEM ARCHITECT..." begins typing character by character
- **AND** the animation uses a slightly slower pace than the name for visual hierarchy

#### Scenario: Description typing uses GSAP SplitText
- **WHEN** the description typing animation is triggered
- **THEN** GSAP SplitText splits the description into characters
- **AND** characters are revealed sequentially with stagger

### Requirement: Blinking cursor effect
A blinking cursor SHALL appear after the name and description text to create a terminal-like aesthetic.

#### Scenario: Cursor appears after name
- **WHEN** the name typing animation completes
- **THEN** a cursor element appears immediately after the name
- **AND** the cursor blinks continuously at a rate of ~1Hz

#### Scenario: Cursor remains visible indefinitely
- **WHEN** all typing animations complete
- **THEN** the cursor continues to blink
- **AND** the cursor does not interfere with page content or interactions

### Requirement: Animation timing configuration
The typewriter animation SHALL be configurable with adjustable timing parameters.

#### Scenario: Default timing values
- **WHEN** no custom timing is provided
- **THEN** character stagger is 0.05 seconds for name, 0.03 seconds for description
- **AND** name animation duration is ~1.5 seconds, description is ~2 seconds
