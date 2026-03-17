<script>
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import ProjectRow from '../components/subcomponents/ProjectRow.svelte';

    export let projects = [];
</script>

<section id="projects-section" class="mt-32 pb-32">
    <div class="flex justify-between items-end mb-12">
        <div>
            <SectionLabel number="02" label="RECENT_WORK" />
            <h2 class="text-4xl font-light uppercase tracking-widest">Projects</h2>
        </div>
        <a href="/projects" class="text-xs font-mono text-brutalist-accent hover:text-white transition-colors cursor-pointer">[VIEW ALL]</a>
    </div>
    <div class="border-t border-brutalist-line">
        {#each projects as project, index}
            <ProjectRow {project} {index} />
        {/each}
    </div>
</section>