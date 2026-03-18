<script>
    import BlogRow from './subcomponents/BlogRow.svelte';
    
    export let blogs = [];
    
    let searchQuery = '';
    let activeTags = [];
    let sortDirection = 'desc';
    
    $: uniqueTags = [...new Set(blogs.flatMap(b => b.tags || []))].sort();
    
    $: filteredBlogs = blogs
        .filter(blog => {
            const matchesSearch = !searchQuery || 
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (blog.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (blog.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesTags = activeTags.length === 0 || 
                activeTags.every(tag => (blog.tags || []).includes(tag));
            
            return matchesSearch && matchesTags;
        })
        .sort((a, b) => {
            const dateA = new Date(a.pubDate).getTime();
            const dateB = new Date(b.pubDate).getTime();
            return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
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
        sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
    }
</script>

<section class="pb-40">
    <div class="mb-12">
        <div class="text-[10px] font-mono text-brutalist-line mb-2">[SEC // BLOGS BROWSER]</div>
        <h2 class="text-4xl font-light uppercase tracking-widest">Blogs</h2>
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
            class="px-3 py-1 border border-brutalist-line text-xs font-mono uppercase tracking-wider hover:text-white hover:border-brutalist-accent transition-colors {sortDirection === 'desc' ? 'text-brutalist-accent border-brutalist-accent' : 'text-brutalist-line'}"
        >
            DATE {sortDirection === 'desc' ? '↓' : '↑'}
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
        {#if filteredBlogs.length === 0}
            <div class="py-8 text-center text-zinc-500 font-mono text-sm">
                {#if searchQuery || activeTags.length > 0}
                    NO_BLOGS_MATCH_FILTERS
                {:else}
                    NO_BLOGS_FOUND
                {/if}
            </div>
        {:else}
            {#each filteredBlogs as blog, index (blog.slug)}
                <BlogRow {blog} {index} />
            {/each}
        {/if}
    </div>
</section>