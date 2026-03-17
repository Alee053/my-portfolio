## 1. Directory Structure

- [x] 1.1 Create `src/components/` directory
- [x] 1.2 Create `src/components/subcomponents/` directory
- [x] 1.3 Create `src/sections/` directory

## 2. Base Components

- [x] 2.1 Create `src/components/Background.svelte` (copy from v1 and adapt)
- [x] 2.2 Create `src/components/LoadingScreen.svelte` (copy from v1 and adapt)
- [x] 2.3 Create `src/components/subcomponents/SectionLabel.svelte` with customizable label/number props

## 3. Row Subcomponents

- [x] 3.1 Create `src/components/subcomponents/ProjectRow.svelte` for project list item display
- [x] 3.2 Create `src/components/subcomponents/BlogRow.svelte` for blog list item display

## 4. Section Components

- [x] 4.1 Create `src/sections/Hero.svelte` extracting hero markup from index.astro
- [x] 4.2 Add GSAP intro animation to Hero.svelte matching original inline implementation
- [x] 4.3 Create `src/sections/Projects.svelte` extracting projects teaser from index.astro
- [x] 4.4 Create `src/sections/Blogs.svelte` extracting blogs teaser from index.astro

## 5. Page Refactor

- [x] 5.1 Update `src/pages/index.astro` to import and use Hero, Projects, Blogs sections
- [x] 5.2 Remove inline markup from index.astro, keep only section imports
- [x] 5.3 Verify page renders identically to before refactoring

## 6. Verification

- [x] 6.1 Test hero animation functionality
- [x] 6.2 Test project links and hover states
- [x] 6.3 Test blog navigation click behavior
- [x] 6.4 Verify responsive behavior matches original