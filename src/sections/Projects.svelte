<script>
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import ProjectRow from '../components/subcomponents/ProjectRow.svelte';

    export let projects = [];
</script>

<section id="projects-section" class="content-section mt-32 pb-32" data-reveal>
    <div class="section-heading">
        <div>
            <SectionLabel number="02" label="RECENT_WORK" />
            <h2 class="section-heading__title text-4xl font-light uppercase tracking-widest">Projects</h2>
        </div>
        <a href="/projects" class="section-link focus-ring">VIEW ALL</a>
    </div>
    <div class="content-grid">
        {#each projects as project, index}
            <ProjectRow {project} {index} />
        {/each}
    </div>
</section>

<style>
    .content-section .section-heading {
        align-items: flex-start;
        flex-direction: column;
    }

    .content-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 1rem;
    }

    @media (min-width: 40rem) {
        .content-section .section-heading {
            align-items: flex-end;
            flex-direction: row;
        }
    }

    @media (min-width: 48rem) {
        .content-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
