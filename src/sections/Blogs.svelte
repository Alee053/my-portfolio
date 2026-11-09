<script lang="ts">
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import BlogRow from '../components/subcomponents/BlogRow.svelte';
    import type { BlogSummary } from '../lib/content';

    export let blogs: BlogSummary[] = [];
</script>

{#if blogs.length > 0}
    <section
        id="blogs-section"
        class="writing-section"
        aria-labelledby="writing-title"
    >
        <div class="section-heading">
            <div>
                <SectionLabel command="ls ~/writing" label="Writing" />
                <h2 id="writing-title" class="section-heading__title">
                    Writing
                </h2>
            </div>
            <a href="/blogs" class="section-link"
                >All writing <span aria-hidden="true">↗</span></a
            >
        </div>
        <div>
            {#each blogs as blog}<BlogRow {blog} />{/each}
        </div>
    </section>
{/if}

<style>
    .writing-section {
        margin-top: 4.5rem;
    }
</style>
