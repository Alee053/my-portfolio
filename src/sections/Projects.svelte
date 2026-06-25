<script>
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import ProjectRow from '../components/subcomponents/ProjectRow.svelte';
    import { reveal } from '../lib/reveal';

    export let projects = [];
</script>

<section id="projects-section" class="mt-32 pb-32">
    <div use:reveal={{ variant: 'rise' }}>
        <a href="/projects" class="flex justify-between items-end mb-12 group cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2">
            <div>
                <SectionLabel number="02" label="RECENT_WORK" />
                <h2 class="text-4xl font-light uppercase tracking-widest group-hover:text-brutalist-accent transition-colors">Projects</h2>
            </div>
            <span class="text-xs font-mono group-hover:text-brutalist-accent text-white transition-colors">[VIEW ALL]</span>
        </a>
    </div>
    <div use:reveal={{ variant: 'stagger' }} class="border-t border-brutalist-line">
        {#each projects as project, index}
            <ProjectRow {project} {index} />
        {/each}
    </div>
</section>
