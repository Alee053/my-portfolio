<script>
    import { onMount, onDestroy } from 'svelte';
    // No need for 'browser' import here, onMount only runs client-side

    export let options = {}; // Allow passing custom options from Astro

    let vantaContainer;
    let vantaEffect;

    onMount(() => {
        // Now, THREE and VANTA are expected to be globally available
        if (window.VANTA && window.VANTA.NET) {
            vantaEffect = window.VANTA.NET({
                el: vantaContainer,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x54ab95, // Your primary color
                backgroundColor: 0x171717, // Your surface color
                points: 9.00,
                spacing: 18.00,
                ...options // Merge with any passed options
            });
        } else {
            console.warn("Vanta.js or Three.js not loaded globally. Check BaseLayout.astro.");
        }
    });

    onDestroy(() => {
        if (vantaEffect) {
            vantaEffect.destroy();
        }
    });
</script>

<div bind:this={vantaContainer} class="fixed top-0 left-0 w-full h-full -z-10"></div>