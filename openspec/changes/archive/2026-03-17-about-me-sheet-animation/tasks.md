## 1. Fix About Me Sheet Toggle

- [x] 1.1 Edit src/layouts/V2Layout.astro to expose toggleAboutModal globally by adding `window.toggleAboutModal = toggleAboutModal;` after the function definition

## 2. Add Hero Text Animation

- [x] 2.1 Add a `<script>` block in src/pages/v2/index.astro that imports gsap
- [x] 2.2 Add data attributes to hero elements (h1 and subtitle p) for targeting
- [x] 2.3 Implement gsap.from animation with staggered delay, y: 20, opacity: 0, duration: 0.8, ease: power3.out

## 3. Verify

- [x] 3.1 Test that clicking "[ABOUT ME]" opens the sheet
- [x] 3.2 Test that the sheet closes when clicking again or clicking [X]
- [x] 3.3 Test that hero text animates on page load
- [x] 3.4 Run lint/typecheck if available
