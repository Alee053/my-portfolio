<script>
    export let blogs = [];
    
    let searchQuery = '';
    let activeTags = [];
    
    $: uniqueTags = [...new Set(blogs.flatMap(b => b.tags || []))].sort();
    
    $: filteredBlogs = blogs.filter(blog => {
        const matchesSearch = !searchQuery || 
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (blog.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (blog.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesTags = activeTags.length === 0 || 
            activeTags.every(tag => (blog.tags || []).includes(tag));
        
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
    
    function formatDate(date) {
        return new Date(date).toISOString().slice(0, 10);
    }
    
    function calculateReadTime(description) {
        if (!description) return 5;
        const wordsPerMinute = 200;
        const wordCount = description.split(/\s+/).length;
        return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    }
</script>

<section class="mt-32 pb-40">
    <div class="mb-12">
        <div class="text-[10px] font-mono text-brutalist-line mb-2">[SEC // BLOGS BROWSER]</div>
        <h2 class="text-4xl font-light uppercase tracking-widest">Blogs</h2>
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
        {#if filteredBlogs.length === 0}
            <div class="py-8 text-center text-zinc-500 font-mono text-sm">
                {#if searchQuery || activeTags.length > 0}
                    NO_BLOGS_MATCH_FILTERS
                {:else}
                    NO_BLOGS_FOUND
                {/if}
            </div>
        {:else}
            {#each filteredBlogs as blog, index}
                <a 
                    href="/v2/blog/{blog.slug}"
                    class="grid grid-cols-12 py-8 border-b border-dashed border-brutalist-line hover:bg-zinc-900/30 transition-colors cursor-pointer block"
                >
                    <div class="col-span-2 font-mono text-[10px] text-zinc-500">
                        {formatDate(blog.pubDate)}
                    </div>
                    <div class="col-span-10">
                        <h3 class="text-lg font-bold uppercase hover:underline">{blog.title}</h3>
                        <p class="text-xs font-mono text-zinc-400 mt-2 max-w-3xl leading-relaxed italic">
                            {blog.description ? blog.description.slice(0, 150) : ''}...
                        </p>
                        <div class="mt-4 flex gap-4 text-[10px] font-mono text-brutalist-line uppercase">
                            <span>Read Time: {calculateReadTime(blog.description)}min</span>
                            <span>//</span>
                            <span class="text-white hover:text-brutalist-accent">[OPEN_FILE]</span>
                        </div>
                    </div>
                </a>
            {/each}
        {/if}
    </div>
</section>