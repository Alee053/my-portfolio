<script>
    export let blog;
    export let index;

    $: title = blog.data?.title || blog.title;
    $: description = blog.data?.description || blog.description;
    $: date = blog.data?.date || blog.date;
    $: slug = blog.slug;
</script>

<a
    href="/blog/{slug}"
    class="row group grid grid-cols-1 md:grid-cols-12 py-4 md:py-6 border-b border-dashed border-brutalist-line hover:bg-[rgba(19,236,175,0.04)] hover:border-brutalist-accent transition-colors gap-2 md:gap-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-[-2px]"
>
    <div class="font-mono text-[10px] md:text-[11px] text-zinc-500 md:col-span-1">{new Date(date).toISOString().slice(0, 10)}</div>
    <div class="md:col-span-11">
        <h3 class="text-base md:text-lg font-bold uppercase group-hover:text-brutalist-accent transition-colors group-focus-visible:text-brutalist-accent">
            {title}
        </h3>
        <p class="text-xs font-mono text-zinc-400 mt-1 max-w-2xl">
            {description?.slice(0, 100)}{description?.length > 100 ? '…' : ''}
        </p>
    </div>
</a>
