<script>
    export let blog;
    export let index;
    
    $: title = blog.data?.title || blog.title;
    $: description = blog.data?.description || blog.description;
    $: pubDate = blog.data?.pubDate || blog.pubDate;
    $: slug = blog.slug;
</script>

<div class="grid grid-cols-12 py-6 border-b border-dashed border-brutalist-line group hover:bg-zinc-900/50 transition-colors cursor-pointer" onclick={() => window.location.href = `/blog/${slug}`}>
    <div class="col-span-1 font-mono text-[11px] text-zinc-500">{new Date(pubDate).toISOString().slice(0,10)}</div>
    <div class="col-span-11">
        <h3 class="text-lg font-bold uppercase group-hover:text-brutalist-accent transition-colors">{title}</h3>
        <p class="text-xs font-mono text-zinc-400 mt-1 max-w-2xl">{description?.slice(0, 100)}...</p>
    </div>
</div>