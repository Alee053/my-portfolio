<script lang="ts">
    import { formatDate } from '../../lib/formatDate';
    import type { BlogSummary } from '../../lib/content';

    export let blog: BlogSummary;
</script>

<article class="blog-row">
    <time datetime={new Date(blog.date).toISOString()}
        >{formatDate(blog.date)}</time
    >
    <div>
        <h3>
            <a href={`/blog/${blog.slug}`}
                >{blog.title}<span aria-hidden="true">↗</span></a
            >
        </h3>
        {#if blog.description}<p>{blog.description}</p>{/if}
        {#if blog.tags?.length}<div class="blog-tags">
                {blog.tags.join(' / ')}
            </div>{/if}
    </div>
</article>

<style>
    .blog-row {
        display: grid;
        grid-template-columns: 7rem minmax(0, 1fr);
        align-items: baseline;
        gap: 1.5rem;
        border-block: 1px solid var(--ink-line);
        padding-block: 1.5rem;
    }
    .blog-row + :global(.blog-row) {
        border-top: 0;
    }
    time {
        color: var(--ink-muted);
        font-size: 0.625rem;
    }
    h3 {
        margin: 0;
        font-family: var(--font-display);
        font-size: 1rem;
        font-weight: 500;
        letter-spacing: -0.035em;
        line-height: 1.7;
    }
    h3 a {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: baseline;
        gap: 1rem;
        text-decoration: none;
    }
    h3 a:hover {
        color: var(--ink-accent);
    }
    h3 span {
        margin-left: auto;
        color: var(--ink-accent);
        font-size: 0.875rem;
    }
    p {
        max-width: 65ch;
        margin: 0.5rem 0 0;
        color: var(--ink-muted);
        font-size: 0.8125rem;
        line-height: 1.9;
        overflow-wrap: anywhere;
    }
    .blog-tags {
        margin-top: 1rem;
        color: var(--ink-muted);
        font-size: 0.625rem;
    }
    @media (max-width: 52rem) {
        .blog-row {
            grid-template-columns: minmax(0, 1fr);
            gap: 0.5rem;
        }
    }
</style>
