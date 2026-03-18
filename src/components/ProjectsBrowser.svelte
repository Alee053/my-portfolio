<script>
    import ProjectRow from './subcomponents/ProjectRow.svelte';
    
    export let projects = [];
    
    let searchQuery = '';
    let activeTags = [];
    let sortDirection = 'asc';
    
    $: uniqueTags = [...new Set(projects.flatMap(p => p.tags || []))].sort();
    
    $: filteredProjects = projects
        .filter(project => {
            const matchesSearch = !searchQuery || 
                project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesTags = activeTags.length === 0 || 
                activeTags.every(tag => (project.tags || []).includes(tag));
            
            return matchesSearch && matchesTags;
        })
        .sort((a, b) => {
            if (sortDirection === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    
    $: activeFilterCount = activeTags.length + (searchQuery ? 1 : 0);
    
    function toggleTag(tag) {
        const index = activeTags.indexOf(tag);
        if (index > -1) {
            activeTags = activeTags.filter(t => t !== tag);
        } else {
            activeTags = [...activeTags, tag];
        }
    }
    
    function clearFilters() {
        searchQuery = '';
        activeTags = [];
    }
    
    function toggleSort() {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }
</script>

<section class="pb-40">
    <div class="mb-12">
        <div class="text-[10px] font-mono text-brutalist-line mb-2">[SEC // PROJECTS BROWSER]</div>
        <h2 class="text-4xl font-light uppercase tracking-widest">Projects</h2>
    </div>
    
    <div class="mb-8 flex flex-wrap gap-4 items-center">
        <div class="flex items-center border border-brutalist-line px-3 py-1 bg-black">
            <span class="text-[10px] font-mono mr-4">SEARCH:</span>
            <input 
                type="text" 
                bind:value={searchQuery}
                class="bg-transparent border-none focus:ring-0 focus:outline-none text-sm p-0 flex-1 font-mono uppercase min-w-[200px] text-white" 
                placeholder="_"
            />
        </div>
        
        <button
            on:click={toggleSort}
            class="px-3 py-1 border border-brutalist-line text-xs font-mono uppercase tracking-wider hover:text-white hover:border-brutalist-accent transition-colors {sortDirection === 'asc' ? 'text-brutalist-accent border-brutalist-accent' : 'text-brutalist-line'}"
        >
            TITLE {sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
        </button>
        
        {#if activeFilterCount > 0}
            <span class="text-[10px] font-mono text-brutalist-accent">[{activeFilterCount}_ACTIVE]</span>
            <button 
                on:click={clearFilters}
                class="px-3 py-1 border border-brutalist-accent text-brutalist-accent text-xs font-mono uppercase tracking-wider hover:bg-brutalist-accent hover:text-black transition-colors"
            >
                [CLEAR]
            </button>
        {/if}
    </div>
    
    {#if uniqueTags.length > 0}
        <div class="mb-8 flex flex-wrap gap-2 items-center">
            <span class="text-[10px] font-mono text-brutalist-line mr-2">FILTER:</span>
            {#each uniqueTags as tag}
                <button
                    on:click={() => toggleTag(tag)}
                    class="px-2 py-1 text-xs font-mono uppercase tracking-wider transition-colors {activeTags.includes(tag) 
                        ? 'bg-brutalist-accent text-black hover:opacity-90' 
                        : 'border border-brutalist-line text-brutalist-line hover:text-white hover:border-brutalist-accent'}"
                >
                    [{tag}]
                </button>
            {/each}
        </div>
    {/if}
    
    <div class="border-t border-brutalist-line">
        {#if filteredProjects.length === 0}
            <div class="py-8 text-center text-zinc-500 font-mono text-sm">
                {#if searchQuery || activeTags.length > 0}
                    NO_PROJECTS_MATCH_FILTERS
                {:else}
                    NO_PROJECTS_FOUND
                {/if}
            </div>
        {:else}
            {#each filteredProjects as project, index (project.name)}
                <ProjectRow {project} {index} />
            {/each}
        {/if}
    </div>
</section>