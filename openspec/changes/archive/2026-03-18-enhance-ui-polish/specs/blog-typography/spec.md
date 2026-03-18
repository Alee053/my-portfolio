## MODIFIED Requirements

### Requirement: Article links use site accent color
Article links SHALL use `brutalist-accent` (#13ecaf) instead of orange (#FF5500).

#### Scenario: Link renders in article
- **WHEN** a link appears within article content
- **THEN** the link color is `#13ecaf` (brutalist-accent)
- **AND** the link has an underline with 2px offset

#### Scenario: User hovers over article link
- **WHEN** user hovers over a link in article content
- **THEN** the link color lightens to `#34f7c3` or similar brighter accent variant
- **AND** the underline remains visible

## REMOVED Requirements

### Requirement: (Superseded) Blockquotes with orange border
**Reason**: The orange border color (#FF5500) is replaced with accent color for consistency.
**Migration**: Blockquote left border should use `brutalist-accent` instead of hard-coded orange.

## ADDED Requirements

### Requirement: Blockquotes use site accent color
The system SHALL style blockquotes with accent color border matching site palette.

#### Scenario: Blockquote styling with accent
- **WHEN** blockquotes appear in article content
- **THEN** text color is `#888888`
- **AND** text is styled italic
- **AND** left border is `2px solid` using `brutalist-accent` color (#13ecaf)
- **AND** no border-radius (sharp edges)