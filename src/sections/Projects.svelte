<script>
    import { onMount } from 'svelte';
    import ProjectsDesktop from '../sections/ProjectsDesktop.svelte';
    import ProjectsMobile from '../sections/ProjectsMobile.svelte';

    export let projectsData=[];

    let isDesktop = true;
    let loaded = false;
    onMount(() => {
        isDesktop = window.innerWidth >= 1024;
        loaded = true;
    });
</script>

{#if loaded}
    {#if isDesktop}
        <ProjectsDesktop projectsData={projectsData} />
    {:else}
        <ProjectsMobile projectsData={projectsData} />
    {/if}
{/if}
