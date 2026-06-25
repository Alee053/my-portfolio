# Interactive Personal Portfolio

This repository contains the source code for my personal portfolio, accessible at [www.alecastro.dev](https://www.alecastro.dev). This project was a deep dive into modern web technologies.

## ✨ Features

* **Cinematic Hero Intro:** A multi-stage GSAP animation reveals the name line by line with a blinking mint cursor, status bar fade, action chip stagger, and pulsing scroll cue.
* **Scroll-Reveal Sections:** Homepage sections and browser result lists animate into view as they enter the viewport, with stagger support and full `prefers-reduced-motion` respect.
* **Accessible Modals:** About and Contact modals with focus trap, focus restore, `role="dialog"`, `aria-modal`, `inert` on the rest of the page, and count-up award numbers.
* **Headless Content Management:** All content, including blog posts and project details, is managed through Decap CMS, which commits changes directly to the GitHub repository.
* **Type-Safe Content:** Blog posts and projects are structured using Astro's Content Collections, providing type safety and validation for all data.
* **Dynamic Filtering:** Both the blog and projects sections feature client-side filtering by tags and years.
* **SEO + Open Graph + JSON-LD:** Every page has a unique title, meta description, OG/Twitter card, and JSON-LD (Person on root, BlogPosting on posts). Sitemap and robots.txt generated.

## 🚀 Tech Stack & Architecture

This project is built on the principle of using the right tool for the job, combining a static site generator with highly interactive client-side islands.

| Category                  | Technology                                                                                                  | Purpose                                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Core Framework** | [**Astro**](https://astro.build/)                                                                           | Provides a static-first architecture for maximum performance. Renders UI to HTML at build time, minimizing client-side JavaScript. |
| **Interactivity** | [**Svelte**](https://svelte.dev/)                                                                           | Used to create highly efficient "islands" of interactivity for components like the modal system, hero animation, and dynamic filters. |
| **Styling** | [**Tailwind CSS**](https://tailwindcss.com/)                                                                | A utility-first CSS framework for rapid, responsive UI development without custom CSS.                                              |
| **Animation** | [**GSAP**](https://gsap.com/)                                                                                | GSAP handles all timeline-based animations, including the cinematic hero, modal transitions, and scroll-triggered reveals. |
| **Content & Data** | [**Astro Content Collections**](https://docs.astro.build/en/guides/content-collections/)                    | Manages structured content (blog posts as `.md`, projects as `.yml`) with type safety via Zod schemas.                            |
| **Content Management** | [**Decap CMS**](https://decapcms.org/)                                                                      | A Git-based headless CMS that provides a UI for content editing and commits changes directly to the repository.                   |
| **Image Optimization** | [**Cloudinary**](https://cloudinary.com/)                                                                   | Serves as a headless DAM for media via the Decap CMS media library, with on-the-fly optimization and a global CDN.                                                  |
| **Deployment**| [**Vercel**](https://vercel.com/)                                                                           | Provides hosting, CI/CD, and serverless functions for the CMS authentication.                                                       |

## Technical Highlights

### Brutalist Visual Language

The site leans into a "technical brutalist" identity: near-black background, mint accent, square brackets around every UI marker, monospace font for labels and metadata, and a visible blueprint grid backdrop. The hero, modals, and section labels are all anchored to this vocabulary.

### Accessibility

The site targets WCAG 2.1 AA: real `<a>` elements for navigation (no `role="button"` workarounds), focus-trapped modals with `role="dialog"` and `inert` on the rest of the page, focus-visible outlines throughout, and full `prefers-reduced-motion` respect on every GSAP timeline.

### Headless Workflow with Decap CMS

The entire content of the site is managed headlessly.
1.  I log in at `/admin`.
2.  I create or edit a blog post or project using the Decap CMS interface.
3.  Upon publishing, the CMS commits the new/updated `.md` or `.yml` file to the GitHub repository.
4.  This commit triggers an automatic rebuild and deployment on Vercel.

This workflow provides the benefits of a user-friendly CMS without the cost or maintenance of a traditional database and backend.

## Design

This implementation is governed by [the polished-pass design spec](docs/superpowers/specs/2026-06-21-portfolio-polished-pass-design.md). See that document for the rationale behind visual, motion, accessibility, and SEO decisions.
