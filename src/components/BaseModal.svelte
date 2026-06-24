<script>
    import { onMount, onDestroy, createEventDispatcher, tick } from 'svelte';
    import { gsap } from 'gsap';
    import { prefersReducedMotion, createFocusTrap } from '../lib/motion-utils';

    export let title = '[MODAL]';
    export let eventName = 'toggle-modal';

    let modal;
    let backdrop;
    let isOpen = false;
    let trap = null;

    const dispatch = createEventDispatcher();

    function handleToggleEvent() { toggle(); }
    function handleCloseEvent() { if (isOpen) close(); }
    function handleBackdropClick() { if (isOpen) close(); }
    function handleBackdropKey(e) {
        if ((e.key === 'Enter' || e.key === ' ') && isOpen) {
            e.preventDefault();
            close();
        }
    }
    function handleKeydown(e) {
        if (e.key === 'Escape' && isOpen) close();
    }

    export async function open() {
        if (!modal || !backdrop) return;

        document.body.style.overflow = 'hidden';
        const main = document.querySelector('main');
        if (main) main.setAttribute('inert', '');

        backdrop.style.pointerEvents = 'auto';

        const reduced = prefersReducedMotion();
        if (reduced) {
            gsap.set(backdrop, { opacity: 1 });
            gsap.set(modal, { x: '0%' });
        } else {
            gsap.to(backdrop, { opacity: 1, duration: 0.15, ease: 'none' });
            gsap.to(modal, { x: '0%', duration: 0.2, ease: 'power3.out' });
        }
        isOpen = true;
        dispatch('open');

        await tick();
        trap = createFocusTrap(modal, close);
        trap.activate();
    }

    export function close() {
        if (!modal || !backdrop) return;

        document.body.style.overflow = '';
        const main = document.querySelector('main');
        if (main) main.removeAttribute('inert');

        if (trap) {
            trap.deactivate();
            trap = null;
        }

        const reduced = prefersReducedMotion();
        if (reduced) {
            gsap.set(backdrop, { opacity: 0 });
            gsap.set(modal, { x: '100%' });
        } else {
            gsap.to(backdrop, {
                opacity: 0,
                duration: 0.15,
                ease: 'none',
                onComplete: () => { backdrop.style.pointerEvents = 'none'; },
            });
            gsap.to(modal, { x: '100%', duration: 0.2, ease: 'power3.in' });
        }
        isOpen = false;
        dispatch('close');
    }

    export function toggle() { isOpen ? close() : open(); }

    onMount(() => {
        if (modal) gsap.set(modal, { x: '100%' });
        if (backdrop) gsap.set(backdrop, { opacity: 0 });
        document.addEventListener(eventName, handleToggleEvent);
        document.addEventListener(`close-${eventName}`, handleCloseEvent);
        document.addEventListener('keydown', handleKeydown);
    });

    onDestroy(() => {
        document.removeEventListener(eventName, handleToggleEvent);
        document.removeEventListener(`close-${eventName}`, handleCloseEvent);
        document.removeEventListener('keydown', handleKeydown);
        document.body.style.overflow = '';
        const main = document.querySelector('main');
        if (main) main.removeAttribute('inert');
    });
</script>

<div
    bind:this={backdrop}
    class="fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
    on:click={handleBackdropClick}
    on:keydown={handleBackdropKey}
    role="button"
    tabindex="-1"
    aria-label="Close modal"
    style="opacity: 0; pointer-events: none;"
></div>

<aside
    bind:this={modal}
    class="fixed top-20 right-0 w-full h-[calc(100vh-5rem)] md:w-1/3 bg-brutalist-bg border-l border-brutalist-line z-50 p-10 flex flex-col shadow-2xl"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    tabindex="-1"
>
    <div class="flex justify-between items-center mb-10">
        <div id="modal-title" class="text-[10px] font-mono">{title}</div>
        <button
            class="text-sm text-brutalist-line hover:text-brutalist-accent cursor-pointer font-mono transition-colors duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
            on:click={close}
            aria-label="Close dialog"
        >[X]</button>
    </div>

    <div class="flex-grow font-mono text-sm leading-relaxed overflow-y-auto pr-4">
        <slot />
    </div>
</aside>
