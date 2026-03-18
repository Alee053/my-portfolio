## Why

The Hero section description text breaks mid-word during line wrapping because the current animation splits all characters individually, ignoring word boundaries. Additionally, project cards lack clear call-to-action buttons, making navigation to GitHub repos, blog posts, or live demos unclear.

## What Changes

- Fix Hero description animation to use GSAP SplitText plugin for word-aware character splitting
- Add three dynamic redirect buttons to ProjectRow component: [GITHUB ↗], [READ_LOG]/[ARTICLE], [LIVE_DEMO ↗]
- Extend project content schema with optional `blog_slug` and `demo_url` fields

## Capabilities

### New Capabilities
- `project-action-buttons`: Dynamic action buttons for projects that show/hide based on available data

### Modified Capabilities
- `hero-text-preservation`: Update to use GSAP SplitText for proper word boundary handling
- `content-schema`: Add optional `blog_slug` and `demo_url` fields to projects collection

## Impact

- `src/sections/Hero.svelte` - Replace manual splitToChars with GSAP SplitText
- `src/components/subcomponents/ProjectRow.svelte` - Add three conditional action buttons
- `src/content/config.ts` - Extend projects schema with new optional fields
- Project YAML files may need new fields added