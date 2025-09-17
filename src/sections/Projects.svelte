<script>
    import { onMount } from 'svelte';
    import ProjectsDesktop from '../sections/ProjectsDesktop.svelte';
    import ProjectsMobile from '../sections/ProjectsMobile.svelte';

    let isDesktop = true;
    let loaded = false;
    onMount(() => {
        isDesktop = window.innerWidth >= 1024;
        loaded = true;
    });
</script>

{#if loaded}
    {#if isDesktop}
        <ProjectsDesktop />
    {:else}
        <ProjectsMobile />
    {/if}
{/if}
