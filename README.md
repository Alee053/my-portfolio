# Personal Portfolio

Source code for my personal portfolio, live at [www.alecastro.dev](https://www.alecastro.dev). A brutalist, terminal-inspired site built to be fast, readable, and two clicks away from anything that matters.

## ✨ Features

* **Brutalist design system:** dark blueprint grid, monospace labels (`[SEC 01 // HERO]`), a single neon accent, and zero border radius — defined entirely with Tailwind v4 `@theme` tokens.
* **GSAP-animated entry:** the hero animates in with timeline-based motion, respecting `prefers-reduced-motion`.
* **Headless content management:** blog posts and project details are managed through Decap CMS, which commits changes directly to the GitHub repository.
* **Type-safe content:** blog posts (`.md`) and projects (`.yaml`) are structured with Astro Content Collections and validated with Zod schemas.
* **Math & code-friendly blog:** KaTeX for equations (remark-math + rehype-katex) and Shiki for syntax highlighting, with a generated table of contents per post.
* **Dynamic filtering:** both the blog and projects sections feature client-side filtering by tags and years.

## 🚀 Tech Stack & Architecture

Static-first architecture with interactive client-side islands.

| Category | Technology | Purpose |
| --- | --- | --- |
| **Core Framework** | [**Astro 5**](https://astro.build/) | Static-first rendering; UI compiled to HTML at build time, minimal client-side JavaScript. |
| **Interactivity** | [**Svelte 5**](https://svelte.dev/) | Islands of interactivity: modals, navbar, and the blog/project browsers with filtering. |
| **Styling** | [**Tailwind CSS v4**](https://tailwindcss.com/) | Utility-first styling; design tokens live in `src/styles/globals.css` via `@theme`. |
| **Animation** | [**GSAP**](https://gsap.com/) | Timeline-based entry animations and modal transitions. |
| **Content & Data** | [**Astro Content Collections**](https://docs.astro.build/en/guides/content-collections/) | Structured content (blog posts as `.md`, projects as `.yaml`) with type safety via Zod schemas. |
| **Content Management** | [**Decap CMS**](https://decapcms.org/) | Git-based headless CMS; edits commit directly to the repository. |
| **Image Optimization** | [**Cloudinary**](https://cloudinary.com/) | Headless DAM for media with on-the-fly optimization and a global CDN. |
| **Deployment** | [**Vercel**](https://vercel.com/) | Hosting, CI/CD, and the serverless OAuth endpoint for CMS authentication. |

## Headless Workflow with Decap CMS

The entire content of the site is managed headlessly:

1. Log in at `/admin`.
2. Create or edit a blog post or project through the Decap CMS interface.
3. On publish, the CMS commits the new/updated `.md` or `.yaml` file to the GitHub repository.
4. The commit triggers an automatic rebuild and deployment on Vercel.

This provides a user-friendly CMS without the cost or maintenance of a database and backend.

## Development

```sh
pnpm install
pnpm dev      # local dev server
pnpm build    # production build
pnpm preview  # preview the build
```
