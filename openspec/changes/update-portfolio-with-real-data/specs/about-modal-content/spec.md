## ADDED Requirements

### Requirement: AboutModal displays real personal information
The AboutModal SHALL display authentic biographical information about Alejandro Castro.

#### Scenario: Education section shows real degrees
- **WHEN** the AboutModal is open
- **THEN** education displays "Bachelor of Systems Engineering" at "UCB San Pablo"
- **AND** GPA and scholarship status are shown
- **AND** high school valedictorian status is displayed

#### Scenario: Awards section highlights achievements
- **WHEN** the AboutModal is open
- **THEN** IOI 2022 Representative for Bolivia is displayed
- **AND** Conecta Mentora Fellow status is shown
- **AND** National Olympiad medals are listed

### Requirement: Hero shows AI research focus
The Hero section SHALL display accurate role and focus information.

#### Scenario: Description reflects RL/Algorithms focus
- **WHEN** the page loads
- **THEN** Hero shows "AI Researcher & Systems Engineering Student"
- **AND** focus areas include Reinforcement Learning, Algorithms

### Requirement: ContactModal has real contact info
The ContactModal SHALL display accurate contact information.

#### Scenario: Email and links are correct
- **WHEN** ContactModal is open
- **THEN** email shows alejandro.castro.0520@gmail.com
- **AND** GitHub and LinkedIn links are functional