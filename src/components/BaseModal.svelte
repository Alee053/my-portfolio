<script>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { gsap } from 'gsap';

    export let title = '[MODAL]';
    export let eventName = 'toggle-modal';

    let modal;
    let isOpen = false;

    const dispatch = createEventDispatcher();

    function handleToggleEvent() {
        toggle();
    }

    export function toggle() {
        if (!isOpen) {
            open();
        } else {
            close();
        }
    }

    export function open() {
        if (!modal) return;

        gsap.to(modal, {
            x: '0%',
            duration: 0.5,
            ease: 'power3.out'
        });
        isOpen = true;
        dispatch('open');
    }

    export function close() {
        if (!modal) return;

        gsap.to(modal, {
            x: '100%',
            duration: 0.4,
            ease: 'power3.in'
        });
        isOpen = false;
        dispatch('close');
    }

    onMount(() => {
        if (modal) {
            gsap.set(modal, { x: '100%' });
        }
        document.addEventListener(eventName, handleToggleEvent);
    });

    onDestroy(() => {
        document.removeEventListener(eventName, handleToggleEvent);
    });
</script>

<aside bind:this={modal} class="fixed top-0 right-0 w-full md:w-1/3 h-full bg-brutalist-bg border-l border-brutalist-line z-50 p-10 flex flex-col shadow-2xl">
    <div class="flex justify-between items-center mb-10">
        <div class="text-[10px] font-mono">{title}</div>
        <button class="text-sm text-brutalist-line hover:text-brutalist-accent cursor-pointer font-mono transition-colors duration-150" on:click={close}>[X]</button>
    </div>

    <div class="flex-grow font-mono text-sm leading-relaxed overflow-y-auto pr-4">
        <slot />
    </div>
</aside>