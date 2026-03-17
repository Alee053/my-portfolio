<script>
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import BlogRow from '../components/subcomponents/BlogRow.svelte';

    export let blogs = [];
</script>

{#if blogs.length > 0}
<section id="blogs-section" class="pb-20">
    <a href="/blogs" class="flex justify-between items-end mb-12 group cursor-pointer">
        <div>
            <SectionLabel number="03" label="RECENT_BLOGS" />
            <h2 class="text-4xl font-light uppercase tracking-widest group-hover:text-brutalist-accent transition-colors">Blogs</h2>
        </div>
        <span class="text-xs font-mono text-brutalist-accent group-hover:text-white transition-colors">[VIEW ALL]</span>
    </a>
    <div class="border-t border-brutalist-line">
        {#each blogs as blog, index}
            <BlogRow {blog} {index} />
        {/each}
    </div>
</section>
{/if}