## ADDED Requirements

### Requirement: Hero Section Display
The v2 landing page SHALL display a prominent hero section featuring the owner's name in oversized bold typography and a professional subtitle, accented with a left border line.

#### Scenario: Hero on Page Load
- **WHEN** user navigates to `/`
- **THEN** hero renders with \"ALEJANDRO CASTRO\" in 7xl-9xl font, subtitle \"AI RESEARCHER & SYSTEM ARCHITECT...\", left #444 border.

### Requirement: Recent Projects Teaser
The landing SHALL fetch and display the first 3 entries from the 'projects' content collection as a teaser list with sequential numbering, title, description, and inline tags.

#### Scenario: Teaser List Rendering
- **WHEN** `/` loads
- **THEN** displays projects in 12-column grid (col1: number, col7: title/desc, col4: tags); hover: bg-zinc-900/50.

### Requirement: Header Navigation
Header SHALL include technical annotation, timestamp, and navigation links styled in mono font with hover states.

#### Scenario: Header Rendering
- **WHEN** page loads
- **THEN** fixed header with [REF: AC-2024-STABLE], nav [CONTACT] [ABOUT ME] [PROJECTS] [BLOGS], border bottom dashed.

### Requirement: Brutalist Visual System
The page SHALL implement the full brutalist visual system including grid background, arbitrary divider lines, font stack (Space Grotesk mono), color palette (#111 bg, #444 lines, #CCC text, #135bec accent).

#### Scenario: Visual Styling
- **WHEN** page renders
- **THEN** matches aesthetic of v2-ideas/landing-main/code.html: grid opacity-20, vertical left-1/4 line, horizontal top-1/3 line.

### Requirement: Footer Section
Footer SHALL show copyright notice and status indicators in mono typography.

#### Scenario: Footer Load
- **WHEN** page loads
- **THEN** border top solid, \"© 2024 CASTRO_A // ALL RIGHTS RESERVED\", 3 dots (line/zinc).