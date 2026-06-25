<script>
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import BlogRow from '../components/subcomponents/BlogRow.svelte';
    import { reveal } from '../lib/reveal';

    export let blogs = [];
</script>

{#if blogs.length > 0}
<section id="blogs-section" class="pb-20">
    <div use:reveal={{ variant: 'rise' }}>
        <a href="/blogs" class="flex justify-between items-end mb-12 group cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-brutalist-accent focus-visible:outline-offset-2">
            <div>
                <SectionLabel number="03" label="RECENT_BLOGS" />
                <h2 class="text-4xl font-light uppercase tracking-widest group-hover:text-brutalist-accent transition-colors">Blogs</h2>
            </div>
            <span class="text-xs font-mono group-hover:text-brutalist-accent text-white transition-colors">[VIEW ALL]</span>
        </a>
    </div>
    <div use:reveal={{ variant: 'stagger' }} class="border-t border-brutalist-line">
        {#each blogs as blog, index}
            <BlogRow {blog} {index} />
        {/each}
    </div>
</section>
{/if}
