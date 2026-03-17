## Why

The hero section currently uses a simple fade-in animation. Adding a typewriter effect will make the introduction more engaging and create a distinctive visual identity that captures visitors' attention immediately.

## What Changes

- Add GSAP SplitText plugin for character-level animation
- Implement typewriter effect for the name "ALEJANDRO CASTRO" - typed letter by letter
- Implement typewriter effect for the description subtitle
- Add blinking cursor that appears after text completes typing
- Cursor stays visible indefinitely as a terminal-style indicator

## Capabilities

### New Capabilities

- `typewriter-animation`: Typewriter text animation with GSAP SplitText, including cursor effect

### Modified Capabilities

- None

## Impact

- `src/sections/Hero.svelte`: Add typewriter animation logic
- `package.json`: Add GSAP SplitText plugin dependency (if not already present)
