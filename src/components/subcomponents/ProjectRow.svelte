<script lang="ts">
    import type { CollectionEntry } from 'astro:content';

    export let project: CollectionEntry<'projects'>['data'];
    $: primaryUrl =
        project.demo_url ||
        project.repo_url ||
        (project.blog_slug ? `/blog/${project.blog_slug}` : '');
</script>

<article class="project-row" class:project-row--visual={Boolean(project.image)}>
    <div class="project-copy">
        <div class="project-context">
            {#if project.year}<time datetime={String(project.year)}
                    >{project.year}</time
                >{/if}
            {#if project.category}<span>{project.category}</span>{/if}
            {#if project.status}<span
                    class="project-status"
                    class:is-live={project.status === 'In production'}
                    >{project.status}</span
                >{/if}
        </div>
        <h3>
            {#if primaryUrl}<a
                    href={primaryUrl}
                    target={primaryUrl.startsWith('https://')
                        ? '_blank'
                        : undefined}
                    rel={primaryUrl.startsWith('https://')
                        ? 'noopener noreferrer'
                        : undefined}
                    >{project.name}<span aria-hidden="true"> ↗</span></a
                >{:else}{project.name}{/if}
        </h3>
        <p class="project-description">{project.subtitle}</p>
        {#if project.tags?.length}<ul
                class="project-tags"
                aria-label="Technologies"
            >
                {#each project.tags as tag}<li>{tag}</li>{/each}
            </ul>{/if}
        <div class="project-actions">
            {#if project.demo_url}<a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    >Visit site <span aria-hidden="true">↗</span></a
                >{/if}
            {#if project.repo_url}<a
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    >Source code <span aria-hidden="true">↗</span></a
                >{/if}
            {#if project.blog_slug}<a href={`/blog/${project.blog_slug}`}
                    >Read article <span aria-hidden="true">→</span></a
                >{/if}
            {#each project.links || [] as link}<a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    >{link.label} <span aria-hidden="true">↗</span></a
                >{/each}
        </div>
    </div>
    {#if project.image}
        <a
            class="project-preview"
            href={primaryUrl || project.image.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Preview ${project.name}${primaryUrl ? ' website' : ' image'}`}
        >
            <img
                src={project.image.src}
                alt={project.image.alt}
                width="1440"
                height="1200"
                loading="lazy"
                decoding="async"
            />
            <span class="project-preview__caption" aria-hidden="true"
                >{project.company || project.name}<span>↗</span></span
            >
        </a>
    {/if}
</article>

<style>
    .project-row {
        display: grid;
        min-width: 0;
        border-top: 1px solid var(--ink-line);
        padding-block: 1.75rem;
    }
    .project-row:last-child {
        border-bottom: 1px solid var(--ink-line);
    }
    .project-row--visual {
        grid-template-columns: minmax(0, 1fr) minmax(10rem, 31%);
        align-items: center;
        gap: 2rem;
    }
    .project-copy {
        min-width: 0;
    }
    .project-context {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem 1rem;
        margin-bottom: 0.75rem;
        color: var(--ink-muted);
        font-size: 0.625rem;
    }
    .project-status {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
    }
    .project-status.is-live {
        color: var(--ink-accent);
    }
    .project-status.is-live::before {
        width: 0.3125rem;
        height: 0.3125rem;
        background: currentColor;
        content: '';
    }
    h3 {
        margin: 0 0 0.75rem;
        font-family: var(--font-display);
        font-size: clamp(1rem, 1.7vw, 1.25rem);
        font-weight: 500;
        letter-spacing: -0.045em;
        line-height: 1.5;
        overflow-wrap: anywhere;
    }
    h3 a {
        text-decoration: none;
    }
    h3 a span {
        color: var(--ink-muted);
        font-family: var(--font-mono);
        font-size: 0.875rem;
    }
    h3 a:hover,
    h3 a:hover span {
        color: var(--ink-accent);
    }
    .project-description {
        max-width: 68ch;
        margin: 0;
        color: var(--ink-muted);
        font-size: 0.8125rem;
        line-height: 1.9;
        overflow-wrap: anywhere;
    }
    .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 0.75rem;
        margin: 1rem 0 0;
        padding: 0;
        color: var(--ink-muted);
        font-size: 0.625rem;
        list-style: none;
    }
    .project-tags li + li::before {
        margin-right: 0.75rem;
        color: #697563;
        content: '/';
    }
    .project-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0 1.25rem;
        margin-top: 0.625rem;
    }
    .project-actions a {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        gap: 0.5rem;
        color: var(--ink-accent);
        font-size: 0.6875rem;
        text-decoration: none;
    }
    .project-actions a:hover {
        color: var(--ink-text);
        text-decoration: underline;
        text-underline-offset: 4px;
    }
    .project-preview {
        display: block;
        min-width: 0;
        align-self: center;
        border: 1px solid var(--ink-line);
        background: var(--ink-900);
        text-decoration: none;
    }
    .project-preview img {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 7 / 5;
        object-fit: cover;
        object-position: top;
        filter: grayscale(1) brightness(0.7);
    }
    .project-preview:hover img,
    .project-preview:focus-visible img {
        filter: none;
    }
    .project-preview__caption {
        display: flex;
        justify-content: space-between;
        gap: 0.5rem;
        border-top: 1px solid var(--ink-line);
        padding: 0.625rem 0.75rem;
        color: var(--ink-muted);
        font-size: 0.5625rem;
    }
    @media (max-width: 68rem) {
        .project-row--visual {
            gap: 1.25rem;
            grid-template-columns: minmax(0, 1fr) minmax(8rem, 30%);
        }
    }
    @media (max-width: 52rem) {
        .project-row--visual {
            grid-template-columns: minmax(0, 1fr);
        }
        .project-preview {
            max-width: 24rem;
            width: 100%;
        }
        .project-preview img {
            aspect-ratio: 2 / 1;
        }
    }
    @media (hover: none) {
        .project-preview img {
            filter: grayscale(0.5) brightness(0.85);
        }
    }
</style>
