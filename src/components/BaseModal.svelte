<script>
    import { onMount, createEventDispatcher } from 'svelte';
    import { gsap } from 'gsap';
    import { prefersReducedMotion } from '../lib/motion';

    export let title = '[MODAL]';
    export let eventName = 'toggle-modal';

    let modal;
    let backdrop;
    let closeButton;
    let isOpen = false;
    let previouslyFocused = null;

    const dispatch = createEventDispatcher();

    function syncAccessibility(open) {
        if (modal) {
            modal.inert = !open;
            modal.setAttribute('aria-hidden', String(!open));
        }
        if (backdrop) {
            backdrop.inert = !open;
        }
    }

    function handleToggleEvent() {
        toggle();
    }

    function handleCloseEvent() {
        if (isOpen) {
            close();
        }
    }

    function handleBackdropClick() {
        if (isOpen) {
            close();
        }
    }

    function trapFocus(e) {
        const focusables = modal.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (!modal.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
        } else if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    function handleKeydown(e) {
        if (!isOpen) return;
        if (e.key === 'Escape') {
            close();
        } else if (e.key === 'Tab') {
            trapFocus(e);
        }
    }

    export function toggle() {
        if (!isOpen) {
            open();
        } else {
            close();
        }
    }

    export function open() {
        if (!modal || !backdrop || isOpen) return;

        previouslyFocused = document.activeElement;
        isOpen = true;
        syncAccessibility(true);
        document.body.style.overflow = 'hidden';
        gsap.killTweensOf(modal);
        gsap.killTweensOf(backdrop);

        if (prefersReducedMotion()) {
            gsap.set(backdrop, { opacity: 1 });
            backdrop.style.pointerEvents = 'auto';
            gsap.set(modal, { x: '0%' });
        } else {
            gsap.to(backdrop, {
                opacity: 1,
                duration: 0.15,
                ease: 'none'
            });
            gsap.to(modal, {
                x: '0%',
                duration: 0.2,
                ease: 'none'
            });
        }
        backdrop.style.pointerEvents = 'auto';
        closeButton?.focus();
        dispatch('open');
    }

    export function close() {
        if (!modal || !backdrop || !isOpen) return;

        isOpen = false;
        syncAccessibility(false);
        document.body.style.overflow = '';
        backdrop.style.pointerEvents = 'none';
        gsap.killTweensOf(modal);
        gsap.killTweensOf(backdrop);

        if (prefersReducedMotion()) {
            gsap.set(backdrop, { opacity: 0 });
            backdrop.style.pointerEvents = 'none';
            gsap.set(modal, { x: '100%' });
        } else {
            gsap.to(backdrop, {
                opacity: 0,
                duration: 0.15,
                ease: 'none'
            });
            gsap.to(modal, {
                x: '100%',
                duration: 0.2,
                ease: 'none'
            });
        }
        if (previouslyFocused instanceof HTMLElement) {
            previouslyFocused.focus();
            previouslyFocused = null;
        }
        dispatch('close');
    }

    onMount(() => {
        if (modal) {
            gsap.set(modal, { x: '100%' });
        }
        if (backdrop) {
            gsap.set(backdrop, { opacity: 0 });
        }
        syncAccessibility(false);
        document.addEventListener(eventName, handleToggleEvent);
        document.addEventListener(`close-${eventName}`, handleCloseEvent);
        document.addEventListener('keydown', handleKeydown);
        // Close before view transitions so body overflow is restored
        document.addEventListener('astro:before-swap', handleCloseEvent);

        // Cleanup here (not onDestroy) so it never runs during SSR
        return () => {
            document.removeEventListener(eventName, handleToggleEvent);
            document.removeEventListener(`close-${eventName}`, handleCloseEvent);
            document.removeEventListener('keydown', handleKeydown);
            document.removeEventListener('astro:before-swap', handleCloseEvent);
            gsap.killTweensOf(modal);
            gsap.killTweensOf(backdrop);
            document.body.style.overflow = '';
            syncAccessibility(false);
        };
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={backdrop}
    class="modal-backdrop"
    on:click={handleBackdropClick}
    aria-hidden="true"
    inert={!isOpen}
    style="opacity: 0; pointer-events: none;">
</div>

<aside bind:this={modal} role="dialog" aria-modal="true" aria-label={title} aria-labelledby={`modal-title-${eventName}`} aria-hidden={!isOpen} inert={!isOpen} class="modal-panel glass-panel-strong" style="transform: translateX(100%);">
    <div class="modal-header">
        <h2 id={`modal-title-${eventName}`} class="modal-title">{title}</h2>
        <button bind:this={closeButton} aria-label="Close {title}" class="modal-close focus-ring" on:click={close} type="button">Close</button>
    </div>

    <div class="modal-content">
        <slot />
    </div>
</aside>

<style>
    .modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 60;
        background: #030d10;
    }

    @supports (backdrop-filter: blur(1px)) {
        .modal-backdrop {
            background: rgba(3, 13, 16, 0.72);
            backdrop-filter: blur(10px);
        }
    }

    .modal-panel {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 70;
        display: flex;
        width: min(100%, 36rem);
        flex-direction: column;
        border-radius: 1.5rem 0 0 1.5rem;
        padding: clamp(1.25rem, 4vw, 2.75rem);
        overflow: hidden;
    }

    .modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .modal-title {
        margin: 0;
        color: var(--ink-text);
        font-family: var(--font-sans);
        font-size: clamp(1.25rem, 3vw, 1.75rem);
        font-weight: 500;
        letter-spacing: -0.02em;
    }

    .modal-close {
        display: inline-flex;
        min-width: 5rem;
        min-height: 2.75rem;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 1px solid var(--ink-line);
        border-radius: 0.625rem;
        background: transparent;
        color: var(--ink-muted);
        cursor: pointer;
        font-family: var(--font-mono);
        font-size: 0.75rem;
        transition: border-color 180ms ease, color 180ms ease, background 180ms ease;
    }

    .modal-close:hover {
        border-color: var(--ink-accent);
        background: #102d31;
        color: var(--ink-text);
    }

    .modal-content {
        min-height: 0;
        flex: 1 1 auto;
        overflow-y: auto;
        padding-right: 0.25rem;
        color: var(--ink-text);
        font-family: var(--font-mono);
        font-size: 0.875rem;
        line-height: 1.7;
    }

    @media (max-width: 767px) {
        .modal-panel {
            width: 100%;
            border-radius: 0;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .modal-close {
            transition: none;
        }
    }

    @supports (backdrop-filter: blur(1px)) {
        .modal-close:hover {
            background: rgba(101, 231, 189, 0.08);
        }
    }
</style>
