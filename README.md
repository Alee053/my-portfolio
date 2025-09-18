# Interactive Personal Portfolio

This repository contains the source code for my personal portfolio, accessible at [www.alecastro.dev](https://www.alecastro.dev). This project was a deep dive into modern web technologies.

## ✨ Features

* **Complex Animations:** The homepage features a scroll-driven animation powered by GSAP that deconstructs the header text, and page elements animate into view.
* **Physics-Based Project Gallery:** On desktop, the projects section is a dynamic sandbox built with Matter.js, allowing users to interact with project blocks in a physics simulated environment.
* **Optimized Mobile Experience:** The projects section serves a completely different, lightweight list-based component for mobile users to ensure a fast and intuitive experience on all devices.
* **Headless Content Management:** All content, including blog posts and project details, is managed through Decap CMS, which commits changes directly to the GitHub repository.
* **Type-Safe Content:** Blog posts and projects are structured using Astro's Content Collections, providing type safety and validation for all data.
* **Dynamic Filtering:** Both the blog and projects sections feature client-side filtering by tags and years.

## 🚀 Tech Stack & Architecture

This project is built on the principle of using the right tool for the job, combining a static site generator with highly interactive client-side islands.

| Category                  | Technology                                                                                                  | Purpose                                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Core Framework** | [**Astro**](https://astro.build/)                                                                           | Provides a static-first architecture for maximum performance. Renders UI to HTML at build time, minimizing client-side JavaScript. |
| **Interactivity** | [**Svelte**](https://svelte.dev/)                                                                           | Used to create highly efficient "islands" of interactivity for components like the physics gallery and dynamic filters.             |
| **Styling** | [**Tailwind CSS**](https://tailwindcss.com/)                                                                | A utility-first CSS framework for rapid, responsive UI development without custom CSS.                                              |
| **Animation & Physics** | [**GSAP**](https://gsap.com/), [**Matter.js**](https://brm.io/matter-js/)                                     | GSAP handles all timeline-based and scroll-triggered animations. Matter.js provides the 2D physics engine for the project gallery. |
| **Content & Data** | [**Astro Content Collections**](https://docs.astro.build/en/guides/content-collections/)                    | Manages structured content (blog posts as `.md`, projects as `.yml`) with type safety via Zod schemas.                            |
| **Content Management** | [**Decap CMS**](https://decapcms.org/)                                                                      | A Git-based headless CMS that provides a UI for content editing and commits changes directly to the repository.                   |
| **Image Optimization** | [**Cloudinary**](https://cloudinary.com/)                                                                   | Serves as a headless DAM for media, with on-the-fly optimization and a global CDN.                                                  |
| **Deployment & Analytics**| [**Vercel**](https://vercel.com/)                                                                           | Provides hosting, CI/CD, and serverless functions for the CMS authentication.                                                       |
|                           | [**Vercel Analytics & Speed Insights**](https://vercel.com/analytics)                                     | Integrated for privacy-friendly audience and performance metrics.                                                                   |

## Technical Highlights & Challenges

### Responsive Architecture: The Physics Engine Problem

Matter.js is resource-intensive and not well-suited for mobile touch interfaces. Instead of trying to force it to work, I implemented a responsive "switcher" component. This component detects the user's screen size and renders one of two completely different children:
* **`ProjectsDesktop.svelte`**: The full physics simulation.
* **`ProjectsMobile.svelte`**: A lightweight, performant grid view.

This ensures that no unnecessary JavaScript is loaded on mobile devices, leading to a much better user experience.

### Headless Workflow with Decap CMS

The entire content of the site is managed headlessly.
1.  I log in at `/admin`.
2.  I create or edit a blog post or project using the Decap CMS interface.
3.  Upon publishing, the CMS commits the new/updated `.md` or `.yml` file to the GitHub repository.
4.  This commit triggers an automatic rebuild and deployment on Vercel.

This workflow provides the benefits of a user-friendly CMS without the cost or maintenance of a traditional database and backend.