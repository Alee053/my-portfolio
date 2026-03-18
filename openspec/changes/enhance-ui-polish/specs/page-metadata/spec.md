## ADDED Requirements

### Requirement: All pages have descriptive titles
The system SHALL render a `<title>` tag in the document head for every page.

#### Scenario: Home page loads
- **WHEN** user navigates to the home page
- **THEN** the browser tab displays "HOME | ALE CASTRO"

#### Scenario: Projects page loads
- **WHEN** user navigates to the projects page
- **THEN** the browser tab displays "PROJECTS | ALE CASTRO"

#### Scenario: Blogs page loads
- **WHEN** user navigates to the blogs page
- **THEN** the browser tab displays "BLOGS | ALE CASTRO"

#### Scenario: Blog post page loads
- **WHEN** user navigates to individual blog post
- **THEN** the browser tab displays the post title followed by " | ALE CASTRO"

### Requirement: Favicon is defined site-wide
The system SHALL include a favicon reference in the document head.

#### Scenario: Browser loads any page
- **WHEN** user navigates to any page on the site
- **THEN** the browser tab displays the favicon from `/logo.png`
- **AND** the favicon is declared in the `<head>` element

### Requirement: BaseLayout accepts title prop
The BaseLayout component SHALL accept a title prop for customizing page titles.

#### Scenario: Page passes custom title
- **WHEN** a page uses `<Layout title="Custom Title">`
- **THEN** the rendered HTML includes `<title>Custom Title | ALE CASTRO</title>`

#### Scenario: Page omits title prop
- **WHEN** a page uses `<Layout>` without title prop
- **THEN** the rendered HTML includes a default title