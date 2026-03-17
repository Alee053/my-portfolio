<script>
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import BlogRow from '../components/subcomponents/BlogRow.svelte';

    export let blogs = [];
</script>

{#if blogs.length > 0}
<section class="pb-20">
    <div class="flex justify-between items-end mb-12">
        <div>
            <SectionLabel number="03" label="RECENT_BLOGS" />
            <h2 class="text-4xl font-light uppercase tracking-widest">Blogs</h2>
        </div>
        <a href="/blogs" class="text-xs font-mono text-brutalist-accent hover:text-white transition-colors cursor-pointer">[VIEW ALL]</a>
    </div>
    <div class="border-t border-brutalist-line">
        {#each blogs as blog, index}
            <BlogRow {blog} {index} />
        {/each}
    </div>
</section>
{/if}