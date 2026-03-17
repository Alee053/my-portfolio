<script>
    import SectionLabel from '../../components/v2/subcomponents/SectionLabel.svelte';
    import BlogRow from '../../components/v2/subcomponents/BlogRow.svelte';

    export let blogs = [];
</script>

{#if blogs.length > 0}
<section class="mt-20 pb-20">
    <div class="flex justify-between items-end mb-12">
        <div>
            <SectionLabel number="03" label="RECENT_BLOGS" />
            <h2 class="text-4xl font-light uppercase tracking-widest">Blogs</h2>
        </div>
        <a href="/v2/blogs" class="text-xs font-mono text-brutalist-line hover:text-white transition-colors">[VIEW ALL]</a>
    </div>
    <div class="border-t border-brutalist-line">
        {#each blogs as blog, index}
            <BlogRow {blog} {index} />
        {/each}
    </div>
</section>
{/if}