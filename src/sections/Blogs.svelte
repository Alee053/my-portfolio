<script>
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import BlogRow from '../components/subcomponents/BlogRow.svelte';

    export let blogs = [];
</script>

{#if blogs.length > 0}
<section id="blogs-section" class="content-section pb-20" data-reveal>
    <div class="section-heading">
        <div>
            <SectionLabel number="03" label="RECENT_BLOGS" />
            <h2 class="section-heading__title text-4xl font-light uppercase tracking-widest">Blogs</h2>
        </div>
        <a href="/blogs" class="section-link focus-ring">VIEW ALL</a>
    </div>
    <div class="content-grid">
        {#each blogs as blog, index}
            <BlogRow {blog} {index} />
        {/each}
    </div>
</section>
{/if}

<style>
    .content-section .section-heading {
        align-items: flex-start;
        flex-direction: column;
    }

    .content-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 1rem;
    }

    @media (min-width: 40rem) {
        .content-section .section-heading {
            align-items: flex-end;
            flex-direction: row;
        }
    }

    @media (min-width: 48rem) {
        .content-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
