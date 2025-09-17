<script>
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

    let visible = false;

    // Make the button appear after a short delay to avoid clashing with page load animations.
    onMount(() => {
        const timer = setTimeout(() => {
            visible = true;
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    });

    const goBack = () => {
        if (history.length > 1) {
            history.back();
        } else {
            window.location.href = '/';
        }
    };
</script>

{#if visible}
    <button
            transition:fly={{ y: -20, duration: 400, easing: quintOut }}
            on:click={goBack}
            aria-label="Go back"
            class="group fixed top-4 left-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-black/30 backdrop-blur-lg border border-white/10 text-white transition-all duration-300 ease-in-out hover:border-primary hover:bg-primary/20 md:top-6 md:left-6 md:h-14 md:w-14"
    >
        <svg
                class="h-6 w-6 stroke-white transition-all duration-300 group-hover:stroke-primary group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
        >
            <path d="M19 12H5"></path>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
    </button>
{/if}

<script context="module">
    // quintOut is a nice easing function for this kind of animation.
    function quintOut(t) {
        return --t * t * t * t * t + 1;
    }
</script>