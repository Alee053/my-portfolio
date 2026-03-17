## 1. Shared Brutalist Styling

- [x] 1.1 Extend Tailwind config in astro.config.mjs or layout with brutalist colors (#111111 bg, #444444 line/text-zinc-500, #CCCCCC text, #135bec accent), Space Grotesk font
- [x] 1.2 Create src/styles/brutalist.css with grid blueprint, dashed/solid lines, scrollbar hide, import in v2 layouts
- [x] 1.3 Create src/layouts/BaseLayout.astro with fixed header/nav, footer, body classes for brutalist

## 2. Landing Page (v2-brutalist-landing)

- [x] 2.1 Update src/pages/index.astro: hero section with h1 name/subtitle, left border, section label [SEC 01 // HERO]
- [x] 2.2 Implement recent projects teaser: import {getCollection} from 'astro:content'; const projects = await getCollection('projects').slice(0,3); render grid list matching reference
- [x] 2.3 Add arbitrary grid dashed line with label [LAYOUT GRID X-72]
- [x] 2.4 Use BaseLayout, ensure grid bg/lines

## 3. Projects Browser (v2-projects-browser)

- [x] 3.1 Create src/pages/projects.astro using BaseLayout; section label [SEC // PROJECTS BROWSER], h2 Projects, search input in border box
- [x] 3.2 Fetch allProjects = await getCollection('projects'); pass to client JSON
- [x] 3.3 Client JS: search input oninput filter by name/subtitle/tags; render list with number, name/subtitle, tags from projects.tags
- [x] 3.4 Derive unique tags from projects, render filter chips (multi-select toggle)
- [x] 3.5 Item click: window.open(project.data.link, '_blank')

## 4. Blogs Browser (v2-blogs-browser)

- [x] 4.1 Create src/pages/blogs.astro using BaseLayout; [SEC // BLOGS BROWSER], h2 Blogs, search/filter
- [x] 4.2 Fetch allBlogs = await getCollection('blog'); JSON to client
- [x] 4.3 Client JS search/filter same as projects (title/description/tags)
- [x] 4.4 Derive tags, chips
- [x] 4.5 Item click: router.navigate(`/blog/${blog.slug}`) or <a href={`/blog/${blog.slug}`}

## 5. Blog Renderer (v2-blog-renderer)

- [x] 5.1 Create src/pages/blog/[slug].astro
- [x] 5.2 export async function getStaticPaths() { const blogs = await getCollection('blog'); return blogs.map(b => ({params: {slug: b.slug}, props: {post: b}})); }
- [x] 5.3 In page: use props.post, render title, pubDate formatted, tags badges, <post.body /> (Astro content)
- [x] 5.4 Add back link to /blogs
- [x] 5.5 Style matching brutalist, section label

## 6. Polish and Verify

- [x] 6.1 Add about modal from reference if needed (onclick toggle)
- [ ] 6.2 Ensure no GSAP/3D/Matter/colors; minimal JS only for filters
- [ ] 6.3 Run `npm run dev`, test search/filter/clicks/links
- [ ] 6.4 Lint: npm run lint; typecheck
- [ ] 6.5 Update nav links to /projects etc.