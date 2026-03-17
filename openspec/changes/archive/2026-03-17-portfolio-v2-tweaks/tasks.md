## 1. Background Grid - Make Scrollable

- [x] 1.1 Change grid positioning from `fixed` to `absolute` in BaseLayout.astro
- [x] 1.2 Ensure grid container is relative and matches main content height
- [x] 1.3 Test grid alignment across scroll positions
- [x] 1.4 Verify grid covers full content area

## 2. About Me Modal - Add GSAP Animation

- [x] 2.1 Replace `hidden` class toggle with GSAP animation in BaseLayout.astro
- [x] 2.2 Implement slide-in from right animation (x: "100%" → x: "0%")
- [x] 2.3 Use `power3.out` easing for consistency with other animations
- [x] 2.4 Add reverse animation for closing the modal
- [x] 2.5 Ensure modal is properly hidden/shown on toggle

## 3. Homepage Blogs Section

- [x] 3.1 Add blogs data fetching to v2/index.astro using getCollection('blog')
- [x] 3.2 Create Blogs section with similar structure to Projects section
- [x] 3.3 Display 2-3 most recent blogs with title, date, description
- [x] 3.4 Add click handler to navigate to blog detail page
- [x] 3.5 Handle empty state (no blogs available)

## 4. Projects Data Fix

- [x] 4.1 Investigate current projects data fetching in v2/index.astro
- [x] 4.2 Fix field names to match schema (name vs title, etc.)
- [x] 4.3 Verify projects display correctly with titles and descriptions
- [x] 4.4 Run build to confirm TypeScript errors are resolved

## 5. Testing & Verification

- [x] 5.1 Test all V2 pages load without errors
- [x] 5.2 Verify background grid scrolls correctly
- [x] 5.3 Test About Me modal animation (open/close)
- [x] 5.4 Verify blogs section displays on homepage
- [x] 5.5 Verify projects section shows titles correctly
