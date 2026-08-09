<script>
    import { formatDate } from '../../lib/formatDate';

    export let blog;
    export let index;

    $: ({ title, description, date, slug } = blog);
</script>

<article class="glass-card blog-card group">
    <div class="blog-card__content">
        <time class="blog-card__date font-mono text-[10px] text-[var(--ink-muted)] md:text-[11px]">{formatDate(date)}</time>
        <div class="min-w-0">
            <h3 class="blog-card__title text-base font-bold uppercase transition-colors md:text-lg group-hover:text-[var(--ink-accent)]">
                <a href={`/blog/${slug}`} class="stretched-link focus-ring">{title}</a>
            </h3>
            <p class="blog-card__description mt-1 max-w-2xl text-xs font-mono text-[var(--ink-muted)]">{description.length > 100 ? `${description.slice(0, 100)}...` : description}</p>
        </div>
    </div>
</article>

<style>
    .blog-card {
        min-width: 0;
        min-height: 10rem;
    }

    .blog-card__content {
        min-width: 0;
    }

    .blog-card__date {
        display: block;
        padding-bottom: 1rem;
        letter-spacing: 0.04em;
    }

    .blog-card__title {
        overflow-wrap: anywhere;
    }

    .blog-card__description {
        overflow-wrap: anywhere;
    }

    @media (min-width: 40rem) {
        .blog-card__content {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            align-items: start;
            gap: 1rem;
        }

        .blog-card__date {
            padding-top: 0.25rem;
            padding-bottom: 0;
        }
    }
</style>
