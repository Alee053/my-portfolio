<script>
    export let project;
    export let index;

    $: name = project.data?.name || project.name;
    $: subtitle = project.data?.subtitle || project.subtitle || '';
    $: tags = project.data?.tags || project.tags || [];
    $: repo_url = project.data?.repo_url || project.repo_url || '';
    $: blog_slug = project.data?.blog_slug || project.blog_slug || '';
    $: demo_url = project.data?.demo_url || project.demo_url || '';
    $: primary_url = repo_url || demo_url || (blog_slug ? `/blog/${blog_slug}` : null);

    $: hasLinks = repo_url || blog_slug || demo_url;
    $: isExternal = (url) => url?.startsWith('http');
</script>

<div
    class="row group relative grid grid-cols-1 md:grid-cols-12 py-4 md:py-6 border-b border-dashed border-brutalist-line hover:bg-[rgba(19,236,175,0.04)] hover:border-brutalist-accent transition-colors gap-3 md:gap-0"
>
    <div class="font-mono text-xs text-brutalist-line md:col-span-1 mb-1 md:mb-0">{String(index + 1).padStart(2, '0')}.</div>
    <div class="md:col-span-7">
        <h3 class="text-lg md:text-xl font-bold uppercase group-hover:text-brutalist-accent transition-colors">
            {name}
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
            <div class="flex flex-wrap md:justify-end gap-2 font-mono text-[10px] relative z-[1]">
                {#if repo_url}
                    <a
                        href={repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-2 py-1 transition-colors min-h-[44px] md:min-h-0 flex items-center bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
                    >
                        GITHUB ↗
                    </a>
                {/if}
                {#if blog_slug}
                    <a
                        href="/blog/{blog_slug}"
                        class="px-2 py-1 transition-colors min-h-[44px] md:min-h-0 flex items-center bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
                    >
                        ARTICLE
                    </a>
                {/if}
                {#if demo_url}
                    <a
                        href={demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-2 py-1 transition-colors min-h-[44px] md:min-h-0 flex items-center bg-brutalist-line/20 text-brutalist-accent hover:bg-brutalist-accent hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2"
                    >
                        LIVE_DEMO ↗
                    </a>
                {/if}
            </div>
        {/if}
    </div>

    {#if primary_url}
        <a
            href={primary_url}
            target={isExternal(primary_url) ? '_blank' : undefined}
            rel={isExternal(primary_url) ? 'noopener noreferrer' : undefined}
            class="absolute inset-0 z-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-[-2px]"
            aria-label={`Open ${name}`}
        >
            <span class="sr-only">Open {name}</span>
        </a>
    {/if}
</div>

<style>
    .row :global(a:not([class*='absolute'])) {
        position: relative;
        z-index: 1;
    }
</style>
