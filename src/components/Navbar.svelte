<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import LiveTimestamp from './LiveTimestamp.svelte';
    import { prefersReducedMotion } from '../lib/motion';
    
    let sidebarOpen = false;
    let sidebarElement;
    let backdropElement;
    let closeButton;
    let desktopIdentity;
    let siteNavElement;
    let sidebarTrigger;
    let backgroundSurfaceStates = [];
    const drawerFocusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function syncDrawerAccessibility(open) {
        if (sidebarElement) {
            sidebarElement.inert = !open;
            sidebarElement.setAttribute('aria-hidden', String(!open));
        }
        if (backdropElement) {
            backdropElement.inert = !open;
            backdropElement.setAttribute('aria-hidden', String(!open));
        }
    }

    function getBackgroundSurfaces() {
        const surfaces = [
            siteNavElement,
            document.querySelector('main'),
            document.querySelector('footer')
        ];

        return surfaces.filter((surface, index) =>
            surface instanceof HTMLElement && surfaces.indexOf(surface) === index
        );
    }

    function syncBackgroundAccessibility(open) {
        if (open) {
            if (backgroundSurfaceStates.length > 0) return;

            backgroundSurfaceStates = getBackgroundSurfaces().map((element) => ({
                element,
                inert: element.getAttribute('inert'),
                ariaHidden: element.getAttribute('aria-hidden')
            }));

            for (const { element } of backgroundSurfaceStates) {
                element.inert = true;
                element.setAttribute('aria-hidden', 'true');
            }
            return;
        }

        for (const { element, inert, ariaHidden } of backgroundSurfaceStates) {
            if (!element.isConnected) continue;

            if (inert === null) {
                element.removeAttribute('inert');
            } else {
                element.setAttribute('inert', inert);
            }

            if (ariaHidden === null) {
                element.removeAttribute('aria-hidden');
            } else {
                element.setAttribute('aria-hidden', ariaHidden);
            }
        }

        backgroundSurfaceStates = [];
    }

    function hasHiddenAncestor(element) {
        let current = element;
        while (current instanceof HTMLElement) {
            if (current.hidden
                || current.inert
                || current.hasAttribute('inert')
                || current.getAttribute('aria-hidden') === 'true') {
                return true;
            }
            current = current.parentElement;
        }
        return false;
    }

    function canReceiveFocus(element) {
        if (!(element instanceof HTMLElement)
            || !element.isConnected
            || element === document.body
            || element === document.documentElement
            || element.matches(':disabled')
            || element.hasAttribute('disabled')
            || element.getAttribute('aria-disabled') === 'true'
            || element.tabIndex < 0
            || hasHiddenAncestor(element)) {
            return false;
        }

        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none'
            && style.visibility !== 'hidden'
            && style.visibility !== 'collapse'
            && style.opacity !== '0'
            && element.getClientRects().length > 0
            && rect.width > 0
            && rect.height > 0;
    }

    function getDrawerFocusables() {
        if (!sidebarElement) return [];

        return Array.from(sidebarElement.querySelectorAll(drawerFocusableSelector))
            .filter(canReceiveFocus);
    }

    function trapFocus(event) {
        const focusables = getDrawerFocusables();
        if (focusables.length === 0) {
            event.preventDefault();
            closeButton?.focus();
            return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (!sidebarElement.contains(document.activeElement)) {
            event.preventDefault();
            (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function findFocusFallback() {
        const candidates = [
            desktopIdentity,
            ...(siteNavElement
                ? Array.from(siteNavElement.querySelectorAll('a[href], button:not([disabled])'))
                : [])
        ];

        return candidates.find(canReceiveFocus) || null;
    }

    function restoreSidebarFocus() {
        const target = canReceiveFocus(sidebarTrigger) ? sidebarTrigger : findFocusFallback();
        target?.focus();
        sidebarTrigger = null;
    }
    
    function handleBeforeSwap() {
        if (sidebarOpen) {
            closeSidebar();
        }
    }

    onMount(() => {
        if (sidebarElement) {
            gsap.set(sidebarElement, { x: '100%' });
        }
        if (backdropElement) {
            gsap.set(backdropElement, { opacity: 0, pointerEvents: 'none' });
        }
        syncDrawerAccessibility(false);
        syncBackgroundAccessibility(false);
        // Close before view transitions so body overflow is restored
        document.addEventListener('astro:before-swap', handleBeforeSwap);
        window.addEventListener('resize', handleResize);

        // Cleanup here (not onDestroy) so it never runs during SSR
        return () => {
            document.removeEventListener('astro:before-swap', handleBeforeSwap);
            window.removeEventListener('resize', handleResize);
            if (sidebarElement) gsap.killTweensOf(sidebarElement);
            if (backdropElement) gsap.killTweensOf(backdropElement);
            if (sidebarOpen) {
                sidebarOpen = false;
                syncDrawerAccessibility(false);
                document.body.style.overflow = '';
            }
            syncBackgroundAccessibility(false);
        };
    });
    
    function handleAboutClick() {
        closeSidebar();
        if (typeof window !== 'undefined' && window.toggleAboutModal) {
            window.toggleAboutModal();
        }
    }
    
    function handleContactClick() {
        closeSidebar();
        if (typeof window !== 'undefined' && window.toggleContactModal) {
            window.toggleContactModal();
        }
    }
    
    function toggleSidebar() {
        if (sidebarOpen) {
            closeSidebar();
        } else {
            document.dispatchEvent(new CustomEvent('close-toggle-about-modal'));
            document.dispatchEvent(new CustomEvent('close-toggle-contact-modal'));
            openSidebar();
        }
    }
    
    function openSidebar() {
        if (sidebarOpen) return;
        sidebarTrigger = canReceiveFocus(document.activeElement) ? document.activeElement : null;
        sidebarOpen = true;
        syncDrawerAccessibility(true);
        syncBackgroundAccessibility(true);
        document.body.style.overflow = 'hidden';
        const reducedMotion = prefersReducedMotion();

        if (sidebarElement) gsap.killTweensOf(sidebarElement);
        if (backdropElement) gsap.killTweensOf(backdropElement);
        
        if (backdropElement) {
            backdropElement.style.pointerEvents = 'auto';
            if (reducedMotion) {
                gsap.set(backdropElement, { opacity: 1 });
            } else {
                gsap.to(backdropElement, {
                    opacity: 1,
                    duration: 0.3
                });
            }
        }
        
        if (sidebarElement) {
            if (reducedMotion) {
                gsap.set(sidebarElement, { x: '0%' });
            } else {
                gsap.to(sidebarElement, {
                    x: '0%',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        }

        closeButton?.focus();
    }
    
    function closeSidebar() {
        if (!sidebarOpen) return;

        sidebarOpen = false;
        syncDrawerAccessibility(false);
        syncBackgroundAccessibility(false);
        document.body.style.overflow = '';
        const reducedMotion = prefersReducedMotion();

        if (sidebarElement) gsap.killTweensOf(sidebarElement);
        if (backdropElement) gsap.killTweensOf(backdropElement);
        
        if (backdropElement) {
            backdropElement.style.pointerEvents = 'none';
            if (reducedMotion) {
                gsap.set(backdropElement, { opacity: 0 });
            } else {
                gsap.to(backdropElement, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        }
        
        if (sidebarElement) {
            if (reducedMotion) {
                gsap.set(sidebarElement, { x: '100%' });
            } else {
                gsap.to(sidebarElement, {
                    x: '100%',
                    duration: 0.3,
                    ease: 'power2.in'
                });
            }
        }

        restoreSidebarFocus();
    }

    function handleResize() {
        if (sidebarOpen && window.matchMedia('(min-width: 768px)').matches) {
            closeSidebar();
        }
    }
    
    function handleKeydown(event) {
        if (!sidebarOpen) return;

        if (event.key === 'Escape') {
            closeSidebar();
        } else if (event.key === 'Tab') {
            trapFocus(event);
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Backdrop - always in DOM but hidden -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    bind:this={backdropElement}
    class="nav-backdrop"
    on:click={closeSidebar}
    aria-hidden={!sidebarOpen}
    inert={!sidebarOpen}
    style="opacity: 0; pointer-events: none;"
></div>

<!-- Mobile Sidebar - always in DOM but hidden off-screen -->
<aside
    bind:this={sidebarElement}
    id="mobile-navigation"
    class="nav-drawer glass-panel-strong md:hidden"
    aria-hidden={!sidebarOpen}
    inert={!sidebarOpen}
    style="transform: translateX(100%);"
>
    <div class="nav-drawer__inner">
        <div class="nav-drawer__header">
            <a class="nav-identity" href="/" on:click={closeSidebar} aria-label="Alejandro Castro home">
                <span class="nav-technical">
                    [REF: AC-2026-MINIMAL]<br/>
                    <LiveTimestamp />
                </span>
            </a>
            <button bind:this={closeButton} on:click={closeSidebar} class="nav-close focus-ring" aria-label="Close navigation menu" type="button">
                <span>Close</span>
            </button>
        </div>
        
        <nav class="nav-links nav-links--mobile" aria-label="Mobile navigation">
            <a class="nav-link" href="/" on:click={closeSidebar}>Home</a>
            <button class="nav-link" on:click={handleAboutClick} type="button">About</button>
            <a class="nav-link" href="/projects" on:click={closeSidebar}>Projects</a>
            <a class="nav-link" href="/blogs" on:click={closeSidebar}>Blogs</a>
            <button class="nav-link" on:click={handleContactClick} type="button">Contact</button>
        </nav>
    </div>
</aside>

<header bind:this={siteNavElement} class="site-nav">
    <a bind:this={desktopIdentity} class="nav-identity" href="/" aria-label="Alejandro Castro home">
        <span class="nav-technical" data-purpose="technical-annotation">
            [REF: AC-2026-MINIMAL]<br/>
            <LiveTimestamp />
        </span>
    </a>
    
    <button
        class="nav-menu-toggle focus-ring"
        on:click={toggleSidebar}
        aria-label="Open navigation menu"
        aria-expanded={sidebarOpen}
        aria-controls="mobile-navigation"
        type="button"
    >
        <span></span>
        <span></span>
        <span></span>
    </button>
    
    <nav class="nav-links nav-links--desktop" aria-label="Primary navigation">
        <a class="nav-link" href="/">Home</a>
        <button class="nav-link" on:click={handleAboutClick} type="button">About</button>
        <a class="nav-link" href="/projects">Projects</a>
        <a class="nav-link" href="/blogs">Blogs</a>
        <button class="nav-link" on:click={handleContactClick} type="button">Contact</button>
    </nav>
</header>

<style>
    .site-nav {
        position: sticky;
        top: 0;
        z-index: 40;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        min-height: 5rem;
        padding: 0.75rem max(1rem, 4vw);
        border-bottom: 1px solid var(--ink-line);
        background: var(--ink-900);
        box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
    }

    @supports (backdrop-filter: blur(1px)) {
        .site-nav {
            background: rgba(10, 28, 32, 0.72);
            backdrop-filter: blur(18px) saturate(1.1);
        }
    }

    .nav-identity {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        border-radius: 0.75rem;
        color: var(--ink-text);
        text-decoration: none;
    }

    .nav-technical {
        color: var(--ink-muted);
        font-family: var(--font-mono);
        font-size: 0.625rem;
        letter-spacing: 0.12em;
        line-height: 1.6;
        text-transform: uppercase;
        transition: color 180ms ease;
    }

    .nav-identity:hover .nav-technical {
        color: var(--ink-text);
    }

    .nav-links {
        align-items: center;
        gap: 0.25rem;
    }

    .nav-links--desktop {
        display: none;
    }

    .nav-link {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        border-radius: 0.625rem;
        background: transparent;
        color: var(--ink-muted);
        cursor: pointer;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        letter-spacing: 0.04em;
        padding: 0.625rem 0.8rem;
        text-decoration: none;
        transition: border-color 180ms ease, background 180ms ease, color 180ms ease;
    }

    .nav-link:hover {
        border-color: var(--ink-line);
        background: #102d31;
        color: var(--ink-text);
    }

    .nav-menu-toggle {
        display: inline-flex;
        width: 2.75rem;
        height: 2.75rem;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.3rem;
        border: 1px solid var(--ink-line);
        border-radius: 0.625rem;
        background: #102d31;
        color: var(--ink-text);
        cursor: pointer;
    }

    .nav-menu-toggle span {
        display: block;
        width: 1.25rem;
        height: 1px;
        background: currentColor;
    }

    .nav-backdrop {
        position: fixed;
        inset: 0;
        z-index: 45;
        background: #030d10;
    }

    @supports (backdrop-filter: blur(1px)) {
        .nav-backdrop {
            background: rgba(3, 13, 16, 0.68);
            backdrop-filter: blur(8px);
        }

        .nav-link:hover,
        .nav-menu-toggle,
        .nav-close:hover {
            background: rgba(101, 231, 189, 0.08);
        }
    }

    .nav-drawer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 50;
        width: min(100%, 28rem);
        border-radius: 1.5rem 0 0 1.5rem;
        overflow-y: auto;
    }

    .nav-drawer__inner {
        display: flex;
        min-height: 100%;
        flex-direction: column;
    }

    .nav-drawer__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid var(--ink-line);
    }

    .nav-drawer__header .nav-identity {
        min-width: 0;
    }

    .nav-close {
        display: inline-flex;
        min-width: 5rem;
        min-height: 2.75rem;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--ink-line);
        border-radius: 0.625rem;
        background: transparent;
        color: var(--ink-muted);
        cursor: pointer;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
    }

    .nav-close:hover {
        border-color: var(--ink-accent);
        background: #102d31;
        color: var(--ink-text);
    }

    .nav-links--mobile {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
        padding: 1.25rem;
    }

    .nav-links--mobile .nav-link {
        justify-content: flex-start;
        width: 100%;
        min-height: 3rem;
        padding-inline: 1rem;
        text-align: left;
    }

    @media (min-width: 768px) {
        .nav-menu-toggle {
            display: none;
        }

        .nav-links--desktop {
            display: flex;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .nav-technical,
        .nav-link,
        .nav-close {
            transition: none;
        }
    }
</style>
