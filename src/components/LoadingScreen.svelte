<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let isLoading = true;

    const hideLoader = () => {
        isLoading = false;
    };

    onMount(() => {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            hideLoader();
        } else {
            document.addEventListener('DOMContentLoaded', hideLoader, { once: true });
        }
        return () => {
            document.removeEventListener('DOMContentLoaded', hideLoader);
        };
    });
</script>

{#if isLoading}
    <section transition:fade id="loading-screen" class="z-50 fixed h-[100vh] w-[100vw] top-0 left-0 flex justify-center items-center overflow-hidden bg-surface ">
        <svg class="stroke-primary animate-spin" width="10vw" viewBox="0 0 24 24" fill="none">
            <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
    </section>
{/if}

