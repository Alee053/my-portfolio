<script>
    import ProjectBlock from '../components/subcomponents/ProjectBlock.svelte';
    import BackButton from "../components/subcomponents/BackButton.svelte";

    export let projectsData = [];

    let activeTag = 'All';
    let activeYear = 'All';

    $: filteredProjects = projectsData.filter(p => {
        const tagMatch = activeTag === 'All' || p.tags.includes(activeTag);
        const yearMatch = activeYear === 'All' || p.year === activeYear;
        return tagMatch && yearMatch;
    });

    $: uniqueTags = ['All', ...new Set(projectsData.flatMap(p => p.tags))];
    $: uniqueYears = ['All', ...new Set(projectsData.map(p => p.year))].sort((a, b) => (b === 'All' ? -1 : a === 'All' ? 1 : b - a));
</script>

<section class="w-full min-h-screen bg-radial from-black/0 from-65% to-black p-4 pt-24 overflow-y-auto">
    <BackButton/>

    <div class="sticky top-0 z-20 mb-8 p-2 rounded-2xl border-2 border-white/10 bg-black/50 backdrop-blur-lg flex flex-col md:flex-row gap-4 justify-center items-center">
        <div class="flex flex-wrap justify-center items-center gap-2">
            {#each uniqueTags as tag}
                <button class="filter-btn" class:active={activeTag === tag} on:click={() => activeTag = tag}>{tag}</button>
            {/each}
        </div>
        <div class="flex flex-wrap justify-center items-center gap-2">
            {#each uniqueYears as year}
                <button class="filter-btn" class:active={activeYear === year} on:click={() => activeYear = year}>{year}</button>
            {/each}
        </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {#each filteredProjects as project (project.id)}
            <div on:click={() => window.open(project.link, '_blank')}>
                <ProjectBlock {project} />
            </div>
        {/each}
    </div>
</section>