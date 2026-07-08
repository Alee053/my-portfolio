<script>
    export let project;
    export let index;

    $: ({ name } = project);
    $: subtitle = project.subtitle || '';
    $: tags = project.tags || [];
    $: repo_url = project.repo_url || '';
    $: blog_slug = project.blog_slug || '';
    $: demo_url = project.demo_url || '';

    $: hasLinks = repo_url || blog_slug || demo_url;
    $: primaryAction = repo_url ? 'github' : (demo_url ? 'demo' : null);
    $: primaryUrl = repo_url || demo_url || '';

    let hoveredBtn = null;
    let rowHovered = false;

    $: primaryHighlighted = rowHovered && !hoveredBtn && primaryAction;
    $: githubHighlighted = primaryAction === 'github' && primaryHighlighted;
    $: demoHighlighted = primaryAction === 'demo' && primaryHighlighted;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="relative grid grid-cols-1 md:grid-cols-12 py-4 md:py-6 border-b border-dashed border-brutalist-line group hover:bg-zinc-900/50 transition-colors gap-3 md:gap-0"
    onmouseenter={() => rowHovered = true}
    onmouseleave={() => { rowHovered = false; hoveredBtn = null; }}
>
    <div class="font-mono text-xs text-brutalist-line md:col-span-1 mb-1 md:mb-0">{String(index + 1).padStart(2, '0')}.</div>
    <div class="md:col-span-7">
        <h3 class="text-lg md:text-xl font-bold uppercase group-hover:text-brutalist-accent transition-colors">
            {#if primaryUrl}
                <a href={primaryUrl} target="_blank" rel="noopener noreferrer" class="stretched-link">{name}</a>
            {:else}
                {name}
            {/if}
        </h3>
        <p class="text-xs font-mono text-zinc-500 mt-1">{subtitle}</p>
    </div>
    <div class="md:col-span-4 md:text-right">
        <div class="flex flex-wrap md:justify-end gap-1 mb-2 font-mono text-[10px]">
            {#if tags}
                {#each tags as tag}
                    <span class="px-2 py-0.5 border border-brutalist-line group-hover:border-brutalist-accent">[ {tag.toUpperCase()} ]</span>
                {/each}
            {/if}
        </div>
        {#if hasLinks}
            <div class="relative z-10 flex flex-wrap md:justify-end gap-2 font-mono text-[10px]">
                {#if repo_url}
                    <a
                        href={repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onmouseenter={() => hoveredBtn = 'github'}
                        onmouseleave={() => hoveredBtn = null}
                        class="px-2 py-1 transition-colors min-h-[44px] md:min-h-0 flex items-center {githubHighlighted ? 'bg-brutalist-accent text-black' : 'bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black'}"
                    >
                        GITHUB ↗
                    </a>
                {/if}
                {#if blog_slug}
                    <a
                        href="/blog/{blog_slug}"
                        onmouseenter={() => hoveredBtn = 'blog'}
                        onmouseleave={() => hoveredBtn = null}
                        class="px-2 py-1 transition-colors min-h-[44px] md:min-h-0 flex items-center {hoveredBtn === 'blog' ? 'bg-brutalist-accent text-black' : 'bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black'}"
                    >
                        ARTICLE
                    </a>
                {/if}
                {#if demo_url}
                    <a
                        href={demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onmouseenter={() => hoveredBtn = 'demo'}
                        onmouseleave={() => hoveredBtn = null}
                        class="px-2 py-1 transition-colors min-h-[44px] md:min-h-0 flex items-center {demoHighlighted ? 'bg-brutalist-accent text-black' : 'bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black'}"
                    >
                        LIVE_DEMO ↗
                    </a>
                {/if}
            </div>
        {/if}
    </div>
</div>
