# Personal portfolio

Source for [alecastro.dev](https://www.alecastro.dev), Alejandro Castro's portfolio. A black AMOLED shell with a directory sidebar, monospace typography, selected projects, and technical writing.

## Design

The interface uses a pure `#000000` background, thin separators, and a muted phosphor-green accent. Geist Mono handles body and utility text; IBM Plex Mono handles display text. Both fonts are served locally as WOFF2 files with their OFL licenses in `public/fonts/`.

The home page is static HTML. Search, tag filters, sorting, and profile/contact dialogs use Svelte islands. Navigation stays visible on mobile, and content appears immediately. The only decorative animation is a short cursor blink, disabled by `prefers-reduced-motion`.

References and design decisions are in [the AMOLED research note](docs/design/amoled-terminal-research.md).

## Stack

| Tool | Use |
| --- | --- |
| Astro 5 | Pages, static rendering, content collections, and view transitions |
| Svelte 5 | Search, filters, navigation state, and native dialogs |
| Tailwind CSS v4 | Design tokens and utilities |
| Markdown, KaTeX, Shiki | Articles, math, and code highlighting |
| Decap CMS | Git-based project and article editing |
| Cloudinary | Article media |
| Vercel | Hosting and the CMS OAuth endpoint |

## Development

```sh
pnpm install
pnpm dev
pnpm astro check
pnpm build
```

Production builds require `OAUTH_GITHUB_CLIENT_ID` and `OAUTH_GITHUB_CLIENT_SECRET` for the existing Decap OAuth integration. Set them through your local environment or hosting provider. Local visual validation can use nonfunctional placeholder values; it does not test CMS login.

## Content

Project YAML files in `src/content/projects/` and articles in `src/content/blog/` use Astro content collections. Projects can include a company, category, status, preview image with descriptive alt text, and additional HTTPS links. The schema is in `src/content/config.ts`.

Edit content at `/admin`. Publishing through Decap commits the content to GitHub and triggers the existing Vercel build. Keep private source repositories out of public project links.

The Webby and JM Repuestos screenshots were captured from their public homepages on November 9, 2026. Local WebP files in `public/images/projects/` keep preview images independent of an external screenshot service.

`public/og-default.svg` is the source for the social preview. Regenerate its PNG after edits:

```sh
node --input-type=module -e "import sharp from 'sharp'; await sharp('public/og-default.svg').png().toFile('public/og-default.png')"
```
