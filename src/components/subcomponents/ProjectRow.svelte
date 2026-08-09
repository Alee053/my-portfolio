<script>
    export let project;
    export let index;

    $: ({ name } = project);
    $: subtitle = project.subtitle || '';
    $: year = project.year;
    $: tags = project.tags || [];
    $: repo_url = project.repo_url || '';
    $: blog_slug = project.blog_slug || '';
    $: demo_url = project.demo_url || '';

    $: hasLinks = repo_url || blog_slug || demo_url;
    $: primaryAction = repo_url ? 'github' : (demo_url ? 'demo' : null);
    $: primaryUrl = repo_url || demo_url || '';

    let hoveredBtn = null;
    let rowHovered = false;

    $: primaryHighlighted = rowHovered && !hoveredBtn && primaryAction;
    $: githubHighlighted = primaryAction === 'github' && primaryHighlighted;
    $: demoHighlighted = primaryAction === 'demo' && primaryHighlighted;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<article
    class="glass-card project-card group"
    onmouseenter={() => rowHovered = true}
    onmouseleave={() => { rowHovered = false; hoveredBtn = null; }}
>
    <div class="project-card__content">
        <div class="project-card__main">
            <div class="project-card__index font-mono">{String(index + 1).padStart(2, '0')}.</div>
            <div class="project-card__details min-w-0">
                <h3 class="project-card__title text-lg font-bold uppercase transition-colors md:text-xl group-hover:text-[var(--ink-accent)]">
                    {#if primaryUrl}
                        <a href={primaryUrl} target="_blank" rel="noopener noreferrer" class="stretched-link focus-ring">{name}</a>
                    {:else}
                        {name}
                    {/if}
                </h3>
                <p class="project-card__subtitle mt-1 text-xs font-mono text-[var(--ink-muted)]">{subtitle}</p>
            </div>
        </div>
        <div class="project-card__meta">
            {#if year}
                <time datetime={String(year)} class="project-card__year font-mono text-[10px]">{year}</time>
            {/if}
            <div class="project-card__tags flex flex-wrap gap-1.5 font-mono text-[10px]">
                {#if tags.length > 0}
                    {#each tags as tag}
                        <span class="tag-chip project-card__tag">{tag.toUpperCase()}</span>
                    {/each}
                {/if}
            </div>
            {#if hasLinks}
                <div class="project-card__actions row-action flex flex-wrap gap-1.5 font-mono text-[10px]">
                    {#if repo_url}
                        <a
                            href={repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onmouseenter={() => hoveredBtn = 'github'}
                            onmouseleave={() => hoveredBtn = null}
                            class="project-card__action focus-ring {githubHighlighted ? 'is-highlighted' : ''}"
                        >
                            GITHUB ↗
                        </a>
                    {/if}
                    {#if blog_slug}
                        <a
                            href="/blog/{blog_slug}"
                            onmouseenter={() => hoveredBtn = 'blog'}
                            onmouseleave={() => hoveredBtn = null}
                            class="project-card__action focus-ring {hoveredBtn === 'blog' ? 'is-highlighted' : ''}"
                        >
                            ARTICLE
                        </a>
                    {/if}
                    {#if demo_url}
                        <a
                            href={demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onmouseenter={() => hoveredBtn = 'demo'}
                            onmouseleave={() => hoveredBtn = null}
                            class="project-card__action focus-ring {demoHighlighted ? 'is-highlighted' : ''}"
                        >
                            LIVE_DEMO ↗
                        </a>
                    {/if}
                </div>
            {/if}
        </div>
    </div>
</article>

<style>
    .project-card {
        min-width: 0;
        min-height: 11rem;
    }

    .project-card__content {
        display: grid;
        min-width: 0;
        height: 100%;
        gap: 1.25rem;
    }

    .project-card__main {
        display: flex;
        min-width: 0;
        align-items: flex-start;
        gap: 1rem;
    }

    .project-card__details,
    .project-card__meta,
    .project-card__tags,
    .project-card__actions {
        min-width: 0;
    }

    .project-card__meta {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .project-card__index {
        flex: none;
        padding-top: 0.25rem;
        color: var(--ink-muted);
        font-size: 0.6875rem;
        letter-spacing: 0.08em;
    }

    .project-card__title {
        overflow-wrap: anywhere;
    }

    .project-card__subtitle {
        max-width: 52ch;
        min-width: 0;
        line-height: 1.5;
        overflow-wrap: anywhere;
    }

    .project-card__tags {
        gap: 0.375rem;
    }

    .project-card__year {
        color: var(--ink-muted);
        letter-spacing: 0.08em;
    }

    .project-card__tag {
        min-width: 0;
        max-width: 100%;
        border-radius: 0.5rem;
        corner-shape: squircle;
        font-size: 0.625rem;
        line-height: 1.2;
        padding: 0.25rem 0.5rem;
        white-space: normal;
        overflow-wrap: anywhere;
    }

    .project-card__action {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--ink-line);
        border-radius: 0.625rem;
        background: rgba(14, 47, 52, 0.54);
        color: var(--ink-accent);
        corner-shape: squircle;
        padding: 0.375rem 0.625rem;
        text-decoration: none;
        transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease;
    }

    .project-card__action:hover,
    .project-card__action.is-highlighted {
        border-color: var(--ink-accent);
        background: var(--ink-accent);
        color: var(--ink-950);
    }

    .project-card__actions {
        border-top: 1px solid var(--ink-line);
        padding-top: 0.75rem;
    }

    @media (min-width: 64rem) {
        .project-card__content {
            grid-template-columns: minmax(0, 1fr) minmax(10rem, 18rem);
            align-items: start;
        }

        .project-card__meta,
        .project-card__tags,
        .project-card__actions {
            text-align: right;
        }

        .project-card__meta {
            width: 100%;
            max-width: 18rem;
            justify-self: end;
        }

        .project-card__tags,
        .project-card__actions {
            justify-content: flex-end;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .project-card,
        .project-card__title,
        .project-card__action {
            transition: none;
        }
    }
</style>
