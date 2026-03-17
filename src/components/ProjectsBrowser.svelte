<script>
    export let projects = [];
    
    let searchQuery = '';
    let activeTags = [];
    
    $: uniqueTags = [...new Set(projects.flatMap(p => p.tags || []))].sort();
    
    $: filteredProjects = projects.filter(project => {
        const matchesSearch = !searchQuery || 
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesTags = activeTags.length === 0 || 
            activeTags.every(tag => (project.tags || []).includes(tag));
        
        return matchesSearch && matchesTags;
    });
    
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
</script>

<section class="mt-32 pb-40">
    <div class="mb-12">
        <div class="text-[10px] font-mono text-brutalist-line mb-2">[SEC // PROJECTS BROWSER]</div>
        <h2 class="text-4xl font-light uppercase tracking-widest">Projects</h2>
    </div>
    
    <div class="mb-8 flex flex-wrap gap-4 items-start">
        <div class="flex items-center border border-brutalist-line px-3 py-1 bg-black">
            <span class="text-[10px] font-mono mr-4">SEARCH:</span>
            <input 
                type="text" 
                bind:value={searchQuery}
                class="bg-transparent border-none focus:ring-0 text-sm p-0 flex-1 font-mono uppercase min-w-[200px]" 
                placeholder="_"
            />
        </div>
        
        {#if activeTags.length > 0 || searchQuery}
            <button 
                on:click={clearFilters}
                class="px-3 py-1 border border-brutalist-accent text-brutalist-accent text-xs font-mono uppercase tracking-wider hover:bg-brutalist-accent hover:text-black transition-colors"
            >
                [CLEAR_FILTERS]
            </button>
        {/if}
    </div>
    
    {#if uniqueTags.length > 0}
        <div class="mb-12 flex flex-wrap gap-2">
            {#each uniqueTags as tag}
                <button
                    on:click={() => toggleTag(tag)}
                    class="px-2 py-1 text-xs font-mono uppercase tracking-wider transition-colors {activeTags.includes(tag) 
                        ? 'bg-brutalist-accent text-black border-0 hover:opacity-90' 
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
            {#each filteredProjects as project, index}
                <div 
                    class="grid grid-cols-12 py-6 border-b border-dashed border-brutalist-line group hover:bg-zinc-900/50 transition-colors cursor-crosshair"
                    on:click={() => window.open(project.link, '_blank')}
                    on:keypress={(e) => e.key === 'Enter' && window.open(project.link, '_blank')}
                    role="button"
                    tabindex="0"
                >
                    <div class="col-span-1 font-mono text-xs text-brutalist-line">
                        {(index + 1).toString().padStart(2, '0')}.
                    </div>
                    <div class="col-span-7">
                        <h3 class="text-xl font-bold uppercase">{project.title}</h3>
                        <p class="text-xs font-mono text-zinc-500 mt-1">{project.subtitle || ''}</p>
                    </div>
                    <div class="col-span-4 text-right font-mono text-[10px]">
                        {#each (project.tags || []) as tag}
                            <span class="px-2 py-0.5 border border-brutalist-line ml-1">[{tag.toUpperCase()}]</span>
                        {/each}
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</section>