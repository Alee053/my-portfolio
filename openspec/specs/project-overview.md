# Alec Castro Portfolio Specs

## Overview
Personal portfolio site (www.alecastro.dev). Astro + Svelte for static generation with interactive islands. Features GSAP animations, Matter.js physics (desktop projects), responsive design, content collections (blog/projects), Decap CMS.

## Tech Stack
- Framework: Astro 5.x + Svelte 5.x islands
- Styling: Tailwind CSS 4.x (configless)
- Content: Astro Content Collections (Zod schemas), Markdown/YAML
- Anim/Physics: GSAP 3.x, Matter.js 0.20.x, Three.js/Vanta.js (CDN)
- CMS: Decap CMS (git commits)
- Images: Cloudinary
- Build: TypeScript, Vercel deploy/analytics
- Configs: astro.config.mjs, svelte.config.js, tsconfig.json

## Directory Structure
```
src/
├── content/config.ts (blog/projects collections)
├── content/blog/*.md (posts)
├── content/projects/*.yaml (7 projects)
├── layouts/BaseLayout.astro
├── lib/ProjectData.js, matter-physics.js, cloudinary.js
├── pages/index.astro (/home), projects/, about-me/, blog/ ([slug], tags/)
├── sections/*.svelte (Hero, AboutMe, Projects(Desktop/Mobile))
├── components/Background.svelte, LoadingScreen.svelte + subcomponents/
└── styles/global.css
```
Root: package.json (pnpm), public/admin/config.yml (CMS).

## Key Features
- Home: Scroll-driven physics/animations
- Projects: Dynamic list (desktop physics sim, mobile grid), tags/year filter
- Blog: Posts with tags/TOC
- Responsive: Viewport-based component swap
- Performant: Partial hydration, static-first

## Conventions
- Svelte islands: client:load for interactivity
- Content-driven pages
- No TODOs/issues found

For changes: Follow Astro/Svelte/Tailwind patterns, add to content/ for data.