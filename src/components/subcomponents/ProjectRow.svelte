<script>
    export let project;
    export let index;
    
    $: name = project.data?.name || project.title;
    $: subtitle = project.data?.subtitle || project.subtitle || '';
    $: tags = project.data?.tags || project.tags || [];
    $: link = project.link;
    $: slug = project.slug;
    
    function handleClick() {
        if (link) {
            window.open(link, '_blank');
        } else if (slug) {
            window.location.href = `/projects/${slug}`;
        }
    }
    
    function handleKeypress(e) {
        if (e.key === 'Enter') {
            handleClick();
        }
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
    <div class="col-span-4 text-right font-mono text-[10px]">
        {#if tags}
            {#each tags as tag}
                <span class="px-2 py-0.5 border border-brutalist-line group-hover:border-brutalist-accent ml-2">[ {tag.toUpperCase()} ]</span>
            {/each}
        {/if}
    </div>
</div>