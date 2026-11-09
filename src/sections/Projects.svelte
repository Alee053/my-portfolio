<script lang="ts">
    import type { CollectionEntry } from 'astro:content';
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import ProjectRow from '../components/subcomponents/ProjectRow.svelte';

    export let projects: CollectionEntry<'projects'>['data'][] = [];
</script>

<section
    id="projects-section"
    class="projects-section"
    aria-labelledby="projects-title"
>
    <div class="section-heading">
        <div>
            <SectionLabel command="ls ~/projects" label="Projects" />
            <h2 id="projects-title" class="section-heading__title">
                Selected projects
            </h2>
        </div>
        <a href="/projects" class="section-link"
            >All projects <span aria-hidden="true">↗</span></a
        >
    </div>
    <div>
        {#each projects as project}<ProjectRow {project} />{/each}
    </div>
</section>

<style>
    .projects-section {
        margin-top: 4.5rem;
        scroll-margin-top: 2rem;
    }
</style>
