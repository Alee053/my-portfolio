<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { gsap } from 'gsap';

    export let title = '[MODAL]';
    export let eventName = 'toggle-modal';

    let modal;
    let backdrop;
    let isOpen = false;

    const dispatch = createEventDispatcher();

    function handleToggleEvent() {
        toggle();
    }

    function handleBackdropClick() {
        if (isOpen) {
            close();
        }
    }

    function handleKeydown(e) {
        if (e.key === 'Escape' && isOpen) {
            close();
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
        isOpen = true;
        dispatch('open');
    }

    export function close() {
        if (!modal || !backdrop) return;

        document.body.style.overflow = '';

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
        isOpen = false;
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
        document.addEventListener('keydown', handleKeydown);
    });

    onDestroy(() => {
        document.removeEventListener(eventName, handleToggleEvent);
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

<aside bind:this={modal} class="fixed top-20 right-0 w-full h-full md:w-1/3 bg-brutalist-bg border-l border-brutalist-line  z-50 p-10 flex flex-col shadow-2xl">
    <div class="flex justify-between items-center mb-10">
        <div class="text-[10px] font-mono">{title}</div>
        <button class="text-sm text-brutalist-line hover:text-brutalist-accent cursor-pointer font-mono transition-colors duration-150" on:click={close}>[X]</button>
    </div>

    <div class="flex-grow font-mono text-sm leading-relaxed overflow-y-auto pr-4">
        <slot />
    </div>
</aside>