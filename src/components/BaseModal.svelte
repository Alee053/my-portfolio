<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { gsap } from 'gsap';

    export let title = '[MODAL]';
    export let eventName = 'toggle-modal';

    let modal;
    let backdrop;
    let closeButton;
    let isOpen = false;
    let previouslyFocused = null;

    const dispatch = createEventDispatcher();

    const prefersReducedMotion = () =>
        typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        if (!modal || !backdrop) return;

        document.body.style.overflow = 'hidden';
        previouslyFocused = document.activeElement;

        if (prefersReducedMotion()) {
            gsap.set(backdrop, { opacity: 1 });
            backdrop.style.pointerEvents = 'auto';
            gsap.set(modal, { x: '0%' });
        } else {
            gsap.to(backdrop, {
                opacity: 1,
                duration: 0.15,
                ease: 'none',
                onStart: () => {
                    backdrop.style.pointerEvents = 'auto';
                }
            });
            gsap.to(modal, {
                x: '0%',
                duration: 0.2,
                ease: 'none'
            });
        }
        isOpen = true;
        closeButton?.focus();
        dispatch('open');
    }

    export function close() {
        if (!modal || !backdrop) return;

        document.body.style.overflow = '';

        if (prefersReducedMotion()) {
            gsap.set(backdrop, { opacity: 0 });
            backdrop.style.pointerEvents = 'none';
            gsap.set(modal, { x: '100%' });
        } else {
            gsap.to(backdrop, {
                opacity: 0,
                duration: 0.15,
                ease: 'none',
                onComplete: () => {
                    backdrop.style.pointerEvents = 'none';
                }
            });
            gsap.to(modal, {
                x: '100%',
                duration: 0.2,
                ease: 'none'
            });
        }
        isOpen = false;
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
        document.addEventListener(eventName, handleToggleEvent);
        document.addEventListener(`close-${eventName}`, handleCloseEvent);
        document.addEventListener('keydown', handleKeydown);
    });

    onDestroy(() => {
        document.removeEventListener(eventName, handleToggleEvent);
        document.removeEventListener(`close-${eventName}`, handleCloseEvent);
        document.removeEventListener('keydown', handleKeydown);
        document.body.style.overflow = '';
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={backdrop}
    class="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
    on:click={handleBackdropClick}
    style="opacity: 0; pointer-events: none;">
</div>

<aside bind:this={modal} role="dialog" aria-modal="true" aria-label={title} class="fixed top-20 right-0 w-full h-[calc(100vh-5rem)] md:w-1/3 bg-brutalist-bg border-l border-brutalist-line  z-50 p-10 flex flex-col shadow-2xl">
    <div class="flex justify-between items-center mb-10">
        <div class="text-[10px] font-mono">{title}</div>
        <button bind:this={closeButton} aria-label="Close {title}" class="text-sm text-brutalist-line hover:text-brutalist-accent cursor-pointer font-mono transition-colors duration-150" on:click={close}>[X]</button>
    </div>

    <div class="flex-grow font-mono text-sm leading-relaxed overflow-y-auto pr-4">
        <slot />
    </div>
</aside>
