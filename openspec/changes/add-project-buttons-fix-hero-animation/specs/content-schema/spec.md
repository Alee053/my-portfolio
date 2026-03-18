## MODIFIED Requirements

### Requirement: Projects collection schema supports blog and demo links
The projects content collection SHALL include optional fields for blog post references and live demo URLs.

#### Scenario: blog_slug field stores internal blog reference
- **WHEN** a project has an associated blog post
- **THEN** the `blog_slug` field stores the blog post slug for internal routing
- **AND** the field is optional with no default value

#### Scenario: demo_url field stores live demo link
- **WHEN** a project has a hosted live demo
- **THEN** the `demo_url` field stores the full URL
- **AND** the field validates as a URL format
- **AND** the field is optional with no default value

#### Scenario: Backward compatibility maintained
- **WHEN** existing projects lack the new fields
- **THEN** projects still render correctly
- **AND** missing fields do not cause validation errors