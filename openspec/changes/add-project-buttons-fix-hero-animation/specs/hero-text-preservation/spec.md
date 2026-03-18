## MODIFIED Requirements

### Requirement: Hero description preserves word boundaries during animation
The Hero section's description text SHALL use GSAP SplitText with word-aware character splitting to prevent mid-word breaks during line wrapping.

#### Scenario: Words wrap correctly during animation
- **WHEN** the description text exceeds the container width
- **THEN** line breaks occur only at word boundaries
- **AND** each word is wrapped in its own container before character splitting
- **AND** characters within words animate individually while word containers maintain integrity

#### Scenario: SplitText creates proper structure
- **WHEN** the page loads with SplitText animation
- **THEN** SplitText creates word wrappers with `type: "words, chars"`
- **AND** each word wrapper contains individual character spans
- **AND** text wrapping respects word boundaries via the word wrapper elements

#### Scenario: Animation timing preserved
- **WHEN** the SplitText animation triggers
- **THEN** character stagger timing matches the original implementation (0.02s stagger, 0.02s duration)
- **AND** total animation duration remains unchanged