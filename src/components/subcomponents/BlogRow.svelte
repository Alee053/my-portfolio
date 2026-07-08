<script>
    import { formatDate } from '../../lib/formatDate';

    export let blog;
    export let index;

    $: ({ title, description, date, slug } = blog);
</script>

<div class="relative grid grid-cols-1 md:grid-cols-12 py-4 md:py-6 border-b border-dashed border-brutalist-line group hover:bg-zinc-900/50 transition-colors gap-2 md:gap-0">
    <div class="font-mono text-[10px] md:text-[11px] text-zinc-500 md:col-span-1">{formatDate(date)}</div>
    <div class="md:col-span-11">
        <h3 class="text-base md:text-lg font-bold uppercase group-hover:text-brutalist-accent transition-colors">
            <a href={`/blog/${slug}`} class="stretched-link">{title}</a>
        </h3>
        <p class="text-xs font-mono text-zinc-400 mt-1 max-w-2xl">{description.length > 100 ? `${description.slice(0, 100)}...` : description}</p>
    </div>
</div>
