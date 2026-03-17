## 1. Create LiveTimestamp Component

- [x] 1.1 Create `src/components/LiveTimestamp.svelte` component
- [x] 1.2 Implement timestamp state with `YYYY.MM.DD_HH:MM:SS` format
- [x] 1.3 Add `setInterval` to update timestamp every 1000ms
- [x] 1.4 Implement `onDestroy` cleanup to clear interval
- [x] 1.5 Apply monospace font styling (font-mono, text-[10px], tracking-widest)
- [x] 1.6 Add "TS: " prefix to timestamp display

## 2. Create ContactModal Component

- [x] 2.1 Create `src/components/ContactModal.svelte` component
- [x] 2.2 Define contact info as props (githubUrl, linkedInUrl, email)
- [x] 2.3 Add modal container with brutalist styling (fixed, right-0, bg-brutalist-bg, border-l)
- [x] 2.4 Create header with "[MODAL: CONTACT]" label and [X] close button
- [x] 2.5 Add GitHub link with external link icon, opens in new tab
- [x] 2.6 Add LinkedIn link with external link icon, opens in new tab
- [x] 2.7 Add email link with mailto: protocol
- [x] 2.8 Apply brutalist styling to all links (hover states, bracket notation)
- [x] 2.9 Implement GSAP slide-in animation (0.5s, power3.out)
- [x] 2.10 Implement GSAP slide-out animation (0.4s, power3.in)

## 3. Create Navbar Component

- [x] 3.1 Create `src/components/Navbar.svelte` component
- [x] 3.2 Add reference code display "[REF: AC-2026-BRUTALIST]"
- [x] 3.3 Import and integrate LiveTimestamp component
- [x] 3.4 Create HOME link that navigates to "/"
- [x] 3.5 Create ABOUT ME link that triggers About modal (via event dispatch)
- [x] 3.6 Create PROJECTS link with smooth scroll on index, /projects on other pages
- [x] 3.7 Create BLOGS link with smooth scroll on index, /blogs on other pages
- [x] 3.8 Create CONTACT link that triggers Contact modal (via event dispatch)
- [x] 3.9 Add brutalist styling (sticky, border-b, bg-brutalist-bg/80, backdrop-blur)
- [x] 3.10 Export event dispatcher for modal triggers

## 4. Update BaseLayout.astro

- [x] 4.1 Import Navbar component at top of file
- [x] 4.2 Import ContactModal component at top of file
- [x] 4.3 Remove inline navbar markup (lines 24-35)
- [x] 4.4 Add Navbar component with client:load directive
- [x] 4.5 Add event listener for About modal toggle from Navbar
- [x] 4.6 Add event listener for Contact modal toggle from Navbar
- [x] 4.7 Add ContactModal markup with client:load directive
- [x] 4.8 Update toggle functions to handle both modals

## 5. Add Section IDs for Navigation

- [x] 5.1 Add `id="hero-section"` to Hero section in `src/sections/Hero.svelte`
- [x] 5.2 Add `id="projects-section"` to Projects section in `src/sections/Projects.svelte`
- [x] 5.3 Add `id="blogs-section"` to Blogs section in `src/sections/Blogs.svelte`

## 6. Test and Verify

- [x] 6.1 Test LiveTimestamp updates every second
- [x] 6.2 Test HOME link navigation
- [x] 6.3 Test PROJECTS link smooth scroll on index page
- [x] 6.4 Test PROJECTS link navigation from blog/project pages
- [x] 6.5 Test BLOGS link smooth scroll on index page
- [x] 6.6 Test BLOGS link navigation from other pages
- [x] 6.7 Test About modal opens from ABOUT ME link
- [x] 6.8 Test Contact modal opens from CONTACT link
- [x] 6.9 Test Contact modal close button works
- [x] 6.10 Test Contact modal GSAP animations
- [x] 6.11 Test all external links open in new tab
- [x] 6.12 Test mobile responsiveness
- [x] 6.13 Verify brutalist styling preserved throughout
