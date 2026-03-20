## Context

The portfolio is built using Astro (SSG) with Svelte components and Tailwind CSS. The current implementation uses a desktop-first approach with fixed styling that breaks on mobile viewports (< 768px). The navbar component uses a horizontal layout thatoverflows on small screens, and typography/spacing values are not responsive.

**Current Architecture:**
- Component-based Svelte architecture
- Tailwind CSS v4 with custom theme (brutalist color palette)
- Sticky navbar at z-40
- All sections use fixed spacing (px-8, pt-32)
- Hero text sizes: text-7xl (mobile), text-9xl (desktop) - but mobile size is stilltoo large
- Modals use BaseModal pattern with GSAP animations

**Constraints:**
- Must maintain brutalist aesthetic and design language
- Must preserve existing desktop functionality
- Cannot add new external dependencies
- Must use existing Tailwind responsive utilities

## Goals / Non-Goals

**Goals:**
- Implement mobile-first responsive layout for all pages
- Create hamburger-triggered slide-in sidebar navigation for mobile (<768px)
- Scale typography appropriately for mobile devices
- Adjust padding and spacing for mobile readability
- Ensure touch targets meet accessibility standards (minimum 44x44px)
- Keep navbar sticky and visible on mobile desktop modes

**Non-Goals:**
- Redesigning or rebranding the portfolio
- Adding new features beyond responsiveness
- Tablet-specific layouts (use mobile breakpoint as fallback)
- Progressive Web App (PWA) functionality
- Dark mode or theme switching

## Decisions

### 1. Mobile Breakpoint Strategy
**Decision:** Use Tailwind's `md:` breakpoint (768px) as the threshold between mobile and desktop layouts.

**Rationale:** 
- Aligns with Tailwind's default responsive utilities
- Matches common tablet/mobile device width
- Allows using `hidden md:flex` pattern for showing/hiding elements

**Alternatives Considered:**
- Custom breakpoint (sm: 640px) - Too small for hamburger transition
- Multiple breakpoints (sm, md, lg) - Unnecessary complexity for this use case

### 2. Mobile Navigation Pattern
**Decision:** Implement hamburger menu that opens a fixed-position slide-in sidebar from the right side.

**Rationale:**
- Right-side sidebar consistent with existing modal patterns (About/Contact modals slide from right)
- Fixed positioning keeps sidebar above content without layout reflow
- GSAP animations already used for modals - consistent animation library
- Preserves brutalist aesthetic with animated transitions

**Alternatives Considered:**
- Top dropdown menu - Would cover hero content, poor UX
- Off-canvas sidebar from left - Breaks left-to-right reading flow
- Bottom navigation bar - Doesn't match brutalist design language

### 3. Sidebar Animation Approach
**Decision:** Use GSAP for slide-in animationwith the same pattern as existing modals.

**Rationale:**
- Consistent with AboutModal/ContactModal animations
- Team already familiar with GSAP
- Smooth performant animations
- Can reuse animation patterns

**Alternatives Considered:**
- CSS transitions - Less control over animation timing
- Framer Motion - New dependency, team unfamiliar

### 4. Responsive Typography Scaling
**Decision:** Use Tailwind responsive classes to scale text from mobile to desktop.

**Rationale:**
- Native Tailwind approach, no custom CSS needed
- Easy to maintain and read
- Groups sizes logically (text-5xl md:text-7xl lg:text-9xl)

**Alternatives Considered:**
- Fluid type with clamp() - More complex, harder todebug
- Custom CSS with viewport units - Breaks Tailwind patterns

### 5. Mobile Container Padding
**Decision:** Reduce padding from `px-8` (32px) to `px-4 md:px-8` on mobile.

**Rationale:**
- 32px padding on 375px mobile viewport loses~17% width
-16px padding still provides breathing room while maximizing content space
- Standard mobile padding pattern

**Alternatives Considered:**
- Keep px-8 everywhere - Too much whitespace on mobile
- Remove padding entirely - Text touches edges, poor readability

### 6. Touch Target Sizing
**Decision:** Ensure all interactive elements (links, buttons) are minimum 44x44px on mobile.

**Rationale:**
- WCAG 2.1 accessibility guideline
- Improves usability for all users
- Achieved with padding and min-height/min-width classes

**Alternatives Considered:**
- Smaller targets - Poor mobile UX, difficult to tap
- Custom touch regions - Unnecessary complexity

## Risks / Trade-offs

**[Risk] Hamburger menu icon visibility**
- Some users may not notice hamburger icon
- **Mitigation:** Position hamburger in same location as desktop nav, use clear iconography

**[Risk] Sidebar obscures content on open**
- Users may lose context when sidebar opens
- **Mitigation:** Add backdrop overlay, allow click-outside-to-close, keep hero section visible behind backdrop

**[Risk] Performance on low-end mobile devices**
- GSAP animations may be slow on older devices
- **Mitigation:** Use will-change CSS property, keep animations simple (translateX only), test on various devices

**[Risk] Text readability on very small screens (< 375px)**
- Scaled typography may still be too large on very small viewports
- **Mitigation:** Use Tailwind text utilities with fallback sizes, test on iPhone SE size

**[Trade-off] Mobile design complexity vs. simple desktop**
- Adding mobile complexity increases maintenance burden
- **Trade-off accepted:** Mobile traffic justifies the added complexity

## Migration Plan

**Phase 1: Navbar Mobile Sidebar**
1. Add hamburger menu icon (visible <768px)
2. Implement mobile sidebar component with navigation links
3. Add GSAP slide-in animation
4. Add backdrop overlay and close handlers
5. Test on mobile viewports

**Phase 2: Responsive Typography & Spacing**
1. Update Hero.svelte with responsive text sizes
2. Update Projects.svelte and Blogs.svelte with responsive padding
3. Adjust BaseLayout.astro container padding
4. Test all sections on mobile

**Phase 3: Modal Responsiveness**
1. Update AboutModal.svelte mobile sizing
2. Update ContactModal.svelte mobile sizing
3. Ensure touch targets meet 44x44px minimum
4. Test modal interactions on mobile

**Rollback Strategy:** Each phase commits separately. If issues arise, revert specific commits. Desktop functionality remains unchanged throughout.

## Open Questions

1. Should the mobile sidebar include the LiveTimestamp and reference code from the desktop navbar?
   - **Recommendation:** Yes, preserve all navbar content in sidebar for consistency
   
2. Should the hamburger menu be on the left or right?
   - **Recommendation:** Right side, matching where modals slide in from
   
3. What animation duration feels natural forthe sidebar?
   - **Recommendation:** 0.3s (matching modal animations)