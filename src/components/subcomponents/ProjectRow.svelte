<script>
    export let project;
    export let index;
    
    $: name = project.data?.name || project.name || project.title;
    $: subtitle = project.data?.subtitle || project.subtitle || '';
    $: tags = project.data?.tags || project.tags || [];
    $: github_url = project.data?.link || project.github_url || project.link || '';
    $: slug = project.slug;
    $: blog_slug = project.data?.blog_slug || project.blog_slug || '';
    $: demo_url = project.data?.demo_url || project.demo_url || '';
    
    $: hasLinks = github_url || blog_slug || demo_url;
    
    function handleClick() {
        if (github_url) {
            window.open(github_url, '_blank');
        } else if (slug) {
            window.location.href = `/projects/${slug}`;
        }
    }
    
    function handleKeypress(e) {
        if (e.key === 'Enter') {
            handleClick();
        }
    }
    
    function stopPropagation(e) {
        e.stopPropagation();
    }
</script>

<div 
    class="grid grid-cols-12 py-6 border-b border-dashed border-brutalist-line group hover:bg-zinc-900/50 transition-colors cursor-pointer"
    onclick={handleClick}
    onkeydown={handleKeypress}
    role="button"
    tabindex="0"
>
    <div class="col-span-1 font-mono text-xs text-brutalist-line">{String(index + 1).padStart(2, '0')}.</div>
    <div class="col-span-7">
        <h3 class="text-xl font-bold uppercase group-hover:text-brutalist-accent transition-colors">{name}</h3>
        <p class="text-xs font-mono text-zinc-500 mt-1">{subtitle}</p>
    </div>
    <div class="col-span-4 text-right">
        <div class="flex flex-wrap justify-end gap-1 mb-2 font-mono text-[10px]">
            {#if tags}
                {#each tags as tag}
                    <span class="px-2 py-0.5 border border-brutalist-line group-hover:border-brutalist-accent">[ {tag.toUpperCase()} ]</span>
                {/each}
            {/if}
        </div>
        {#if hasLinks}
            <div class="flex flex-wrap justify-end gap-2 font-mono text-[10px]">
                {#if github_url}
                    <a 
                        href={github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onclick={stopPropagation}
                        class="px-2 py-1 bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black transition-colors"
                    >
                        GITHUB ↗
                    </a>
                {/if}
                {#if blog_slug}
                    <a 
                        href="/blog/{blog_slug}" 
                        onclick={stopPropagation}
                        class="px-2 py-1 bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black transition-colors"
                    >
                        ARTICLE
                    </a>
                {/if}
                {#if demo_url}
                    <a 
                        href={demo_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onclick={stopPropagation}
                        class="px-2 py-1 bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black transition-colors"
                    >
                        LIVE_DEMO ↗
                    </a>
                {/if}
            </div>
        {/if}
    </div>
</div>