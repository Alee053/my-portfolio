<script>
    export let blog;
    export let index;
    
    $: title = blog.data?.title || blog.title;
    $: description = blog.data?.description || blog.description;
    $: date = blog.data?.date || blog.date;
    $: slug = blog.slug;
</script>

<div class="grid grid-cols-1 md:grid-cols-12 py-4 md:py-6 border-b border-dashed border-brutalist-line group hover:bg-zinc-900/50 transition-colors cursor-pointer gap-2 md:gap-0" onclick={() => window.location.href = `/blog/${slug}`}>
    <div class="font-mono text-[10px] md:text-[11px] text-zinc-500 md:col-span-1">{new Date(date).toISOString().slice(0,10)}</div>
    <div class="md:col-span-11">
        <h3 class="text-base md:text-lg font-bold uppercase group-hover:text-brutalist-accent transition-colors">{title}</h3>
        <p class="text-xs font-mono text-zinc-400 mt-1 max-w-2xl">{description?.slice(0, 100)}...</p>
    </div>
</div>