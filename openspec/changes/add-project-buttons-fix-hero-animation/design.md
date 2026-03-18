## Context

The portfolio uses GSAP for animations in Hero.svelte. Currently, the description text is split character-by-character manually, causing words to break mid-character during line wrapping. The CSS `word-break: keep-all` doesn't help because each character is in its own span. The fix requires GSAP's SplitText plugin which preserves word boundaries by wrapping words before splitting characters.

For projects, the ProjectRow component currently only supports navigation via row click to either an external link or internal slug. There's no explicit call-to-action buttons for GitHub, blog posts, or live demos.

## Goals / Non-Goals

**Goals:**
- Fix Hero description animation to respect word boundaries
- Add conditional action buttons to project rows for GitHub, blog, and demo links
- Make button visibility data-driven based on project configuration

**Non-Goals:**
- Changing the overall Hero animation timing or visual style
- Adding new project fields to all existing projects
- Styling changes beyond the new buttons

## Decisions

**GSAP SplitText for Hero Animation**
- Use `SplitText.create()` with `type: "words, chars"` instead of manual character splitting
- Splits words first, then characters within word wrappers
- Preserves word boundaries during line wrapping
- Alternative considered: CSS `white-space: nowrap` - rejected as it prevents natural text wrapping

**Project Button Architecture**
- Three conditional buttons: `[GITHUB ↗]`, `[READ_LOG]`/`[ARTICLE]`, `[LIVE_DEMO ↗]`
- Each button shows only when corresponding data field exists
- Use existing `link` field for GitHub, add `blog_slug` for blog posts, add `demo_url` for live demos
- Styling matches existing brutalist tag buttons

**Schema Extension**
- Add optional `blog_slug?: z.string()` to projects schema
- Add optional `demo_url?: z.string().url()` to projects schema
- Both fields optional to support backward compatibility

## Risks / Trade-offs

- [SplitText is GSAP plugin] → Already using GSAP, minimal bundle impact
- [New fields require manual update to existing projects] → Optional fields, backward compatible
- [Blog slug vs direct URL] → blog_slug for internal blog posts, maintains content collection pattern