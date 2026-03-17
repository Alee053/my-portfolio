<script>
    export let project;
    export let index;
</script>

<div class="grid grid-cols-12 py-6 border-b border-dashed border-brutalist-line group hover:bg-zinc-900/50 transition-colors cursor-pointer" onclick={() => window.location.href = `/projects/${project.slug}`}>
    <div class="col-span-1 font-mono text-xs text-brutalist-line">{String(index + 1).padStart(2, '0')}.</div>
    <div class="col-span-7">
        <h3 class="text-xl font-bold uppercase group-hover:text-brutalist-accent transition-colors">{project.data.name}</h3>
        <p class="text-xs font-mono text-zinc-500 mt-1">{project.data.subtitle || ''}</p>
    </div>
    <div class="col-span-4 text-right font-mono text-[10px]">
        {#if project.data.tags}
            {#each project.data.tags as tag}
                <span class="px-2 py-0.5 border border-brutalist-line ml-2">[ {tag.toUpperCase()} ]</span>
            {/each}
        {/if}
    </div>
</div>