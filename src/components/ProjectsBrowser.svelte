<script>
    import ProjectRow from './subcomponents/ProjectRow.svelte';
    
    export let projects = [];
    
    let searchQuery = '';
    let activeTags = [];
    let sortMode = 'featured';
    
    $: uniqueTags = [...new Set(projects.flatMap(p => p.tags || []))].sort();
    
    $: filteredProjects = projects
        .filter(project => {
            const matchesSearch = !searchQuery || 
                project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (project.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesTags = activeTags.length === 0 || 
                activeTags.every(tag => (project.tags || []).includes(tag));
            
            return matchesSearch && matchesTags;
        })
        .sort((a, b) => {
            if (sortMode === 'featured') {
                return (a.order ?? 999) - (b.order ?? 999);
            } else if (sortMode === 'az') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    
    $: activeFilterCount = activeTags.length + (searchQuery ? 1 : 0);
    
    function toggleTag(tag) {
        const index = activeTags.indexOf(tag);
        if (index > -1) {
            activeTags = activeTags.filter(t => t !== tag);
        } else {
            activeTags = [...activeTags, tag];
        }
    }
    
    function clearFilters() {
        searchQuery = '';
        activeTags = [];
    }
    
    function cycleSort() {
        if (sortMode === 'featured') {
            sortMode = 'az';
        } else if (sortMode === 'az') {
            sortMode = 'za';
        } else {
            sortMode = 'featured';
        }
    }
    
    const sortLabels = {
        featured: 'FEATURED',
        az: 'A-Z',
        za: 'Z-A'
    };
</script>

<section class="browser pb-40" data-reveal>
    <header class="browser-header">
        <div>
            <p class="browser-header__eyebrow">Projects browser</p>
            <h2 class="browser-header__title text-4xl font-light uppercase tracking-widest">Projects</h2>
        </div>
    </header>

    <div class="browser-tools">
        <label class="search-control" for="projects-browser-search">
            <span class="search-control__label">Search</span>
            <input
                id="projects-browser-search"
                name="project-search"
                type="text"
                bind:value={searchQuery}
                placeholder="Search by name or tag"
                aria-label="Search projects by name or tag"
                autocomplete="off"
            />
        </label>

        <button
            type="button"
            on:click={cycleSort}
            class="sort-control {sortMode === 'featured' ? 'is-active' : ''}"
            aria-label="Sort projects: {sortLabels[sortMode]}"
        >
            <span>Sort:</span>
            <strong>{sortLabels[sortMode]}</strong>
        </button>

        {#if activeFilterCount > 0}
            <span class="filter-count" aria-live="polite">{activeFilterCount} active {activeFilterCount === 1 ? 'filter' : 'filters'}</span>
            <button
                type="button"
                on:click={clearFilters}
                class="clear-control"
                aria-label="Clear project filters"
            >
                Clear filters
            </button>
        {/if}
    </div>

    {#if uniqueTags.length > 0}
        <details class="browser-filters">
            <summary class="browser-filters__summary">
                <span class="browser-filters__label">Filter by tag</span>
                <span class="browser-filters__value">{activeTags.length > 0 ? `${activeTags.length} selected` : 'All tags'}</span>
            </summary>
            <div class="browser-filters__chips">
                {#each uniqueTags as tag}
                    <button
                        type="button"
                        on:click={() => toggleTag(tag)}
                        class="filter-chip {activeTags.includes(tag) ? 'is-active' : ''}"
                        aria-pressed={activeTags.includes(tag)}
                    >
                        {tag}
                    </button>
                {/each}
            </div>
        </details>
    {/if}

    <div class="browser-card-list">
        {#if filteredProjects.length === 0}
            <div class="browser-empty">
                {#if searchQuery || activeTags.length > 0}
                    NO_PROJECTS_MATCH_FILTERS
                {:else}
                    NO_PROJECTS_FOUND
                {/if}
            </div>
        {:else}
            {#each filteredProjects as project, index (project.name)}
                <ProjectRow {project} {index} />
            {/each}
        {/if}
    </div>
</section>

<style>
    .browser {
        min-width: 0;
    }

    .browser-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: 2.25rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--ink-line);
    }

    .browser-header__eyebrow {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
        color: var(--ink-cyan);
        font-family: var(--font-mono);
        font-size: 0.625rem;
        letter-spacing: 0.12em;
        line-height: 1.4;
        text-transform: uppercase;
    }

    .browser-header__eyebrow::before {
        width: 2.25rem;
        height: 1px;
        flex: none;
        background: linear-gradient(90deg, var(--ink-accent), transparent);
        content: "";
    }

    .browser-header__title {
        max-width: 100%;
        overflow-wrap: anywhere;
    }

    .browser-tools {
        display: flex;
        align-items: stretch;
        flex-wrap: wrap;
        gap: 0.75rem;
        min-width: 0;
        margin-bottom: 1rem;
    }

    .search-control {
        display: flex;
        min-width: 0;
        max-width: 100%;
        min-height: 2.75rem;
        flex: 1 1 20rem;
        align-items: center;
        gap: 0.75rem;
        border: 1px solid var(--ink-line);
        border-radius: 0.875rem;
        background: var(--ink-900);
        padding: 0.5rem 0.875rem;
        color: var(--ink-text);
        transition: border-color 180ms ease, box-shadow 180ms ease;
    }

    .search-control__label {
        flex: none;
        color: var(--ink-muted);
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .search-control input {
        min-width: 0;
        width: 100%;
        min-height: 1.75rem;
        border: 0;
        outline: 0;
        background: transparent;
        color: var(--ink-text);
        font-family: var(--font-mono);
        font-size: 0.8125rem;
    }

    .search-control input::placeholder {
        color: var(--ink-muted);
        opacity: 0.75;
    }

    .search-control:focus-within {
        border-color: var(--ink-accent);
        box-shadow: 0 0 0 3px rgba(101, 231, 189, 0.16);
    }

    .search-control input:focus-visible,
    .browser-filters__summary:focus-visible,
    .filter-chip:focus-visible,
    .sort-control:focus-visible,
    .clear-control:focus-visible {
        outline: 2px solid var(--ink-accent);
        outline-offset: 3px;
    }

    .sort-control,
    .clear-control {
        display: inline-flex;
        min-width: 0;
        max-width: 100%;
        min-height: 2.75rem;
        flex: 0 1 auto;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border: 1px solid var(--ink-line);
        border-radius: 0.75rem;
        background: var(--ink-900);
        padding: 0.5rem 0.875rem;
        color: var(--ink-muted);
        corner-shape: squircle;
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        letter-spacing: 0.07em;
        line-height: 1.3;
        text-align: center;
        text-transform: uppercase;
        overflow-wrap: anywhere;
        cursor: pointer;
        transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease;
    }

    .sort-control span {
        color: var(--ink-muted);
    }

    .sort-control strong {
        color: var(--ink-text);
        font-weight: 600;
    }

    .sort-control.is-active {
        border-color: var(--ink-accent);
        background: rgba(101, 231, 189, 0.1);
        color: var(--ink-accent);
    }

    .sort-control:hover,
    .sort-control:hover strong,
    .sort-control.is-active span,
    .sort-control.is-active strong {
        color: var(--ink-accent);
    }

    .sort-control:hover,
    .clear-control:hover {
        border-color: var(--ink-accent);
    }

    .clear-control {
        border-color: var(--ink-accent);
        color: var(--ink-accent);
    }

    .clear-control:hover {
        background: var(--ink-accent);
        color: var(--ink-950);
    }

    .filter-count {
        display: inline-flex;
        min-width: 0;
        max-width: 100%;
        min-height: 2.75rem;
        align-items: center;
        padding: 0.5rem 0.25rem;
        color: var(--ink-accent);
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        letter-spacing: 0.06em;
        line-height: 1.3;
        text-transform: uppercase;
        overflow-wrap: anywhere;
    }

    .browser-filters {
        min-width: 0;
        margin-bottom: 2rem;
    }

    .browser-filters__summary {
        display: flex;
        min-width: 0;
        min-height: 2.75rem;
        width: min(100%, 18rem);
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        border: 1px solid var(--ink-line);
        border-radius: 0.75rem;
        background: var(--ink-900);
        color: var(--ink-muted);
        corner-shape: squircle;
        cursor: pointer;
        list-style: none;
        padding: 0.5rem 0.875rem;
        transition: border-color 180ms ease, background-color 180ms ease;
    }

    .browser-filters__summary::-webkit-details-marker {
        display: none;
    }

    .browser-filters__summary::after {
        color: var(--ink-accent);
        content: "+";
        font-family: var(--font-mono);
        font-size: 1rem;
        line-height: 1;
    }

    .browser-filters[open] .browser-filters__summary::after {
        content: "−";
    }

    .browser-filters__summary:hover {
        border-color: var(--ink-accent);
        background: rgba(101, 231, 189, 0.08);
    }

    .browser-filters__label {
        color: var(--ink-muted);
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    }

    .browser-filters__value {
        margin-left: auto;
        color: var(--ink-text);
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .browser-filters__chips {
        display: grid;
        min-width: 0;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 8rem), 1fr));
        gap: 0.5rem;
        margin-top: 0.5rem;
        border: 1px solid var(--ink-line);
        border-radius: 1rem;
        background: var(--ink-surface-strong);
        padding: 0.75rem;
    }

    .filter-chip {
        display: inline-flex;
        min-width: 0;
        max-width: 100%;
        min-height: 2.75rem;
        width: 100%;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--ink-line);
        border-radius: 0.75rem;
        background: transparent;
        padding: 0.5rem 0.75rem;
        color: var(--ink-muted);
        corner-shape: squircle;
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        letter-spacing: 0.06em;
        line-height: 1.3;
        text-align: center;
        text-transform: uppercase;
        overflow-wrap: anywhere;
        cursor: pointer;
        transition: border-color 180ms ease, background-color 180ms ease, color 180ms ease;
    }

    .filter-chip:hover {
        border-color: var(--ink-accent);
        background: rgba(101, 231, 189, 0.08);
        color: var(--ink-text);
    }

    .filter-chip.is-active {
        border-color: var(--ink-accent);
        background: var(--ink-accent);
        color: var(--ink-950);
    }

    .filter-chip.is-active:hover {
        opacity: 0.9;
    }

    .browser-card-list {
        display: grid;
        gap: 1rem;
        min-width: 0;
    }

    .browser-empty {
        display: grid;
        min-width: 0;
        min-height: 10rem;
        place-items: center;
        border: 1px dashed var(--ink-line);
        border-radius: 1rem;
        background: var(--ink-900);
        padding: 2rem 1rem;
        color: var(--ink-muted);
        font-family: var(--font-mono);
        font-size: 0.8125rem;
        text-align: center;
        overflow-wrap: anywhere;
    }

    @supports (backdrop-filter: blur(1px)) {
        .search-control,
        .sort-control,
        .clear-control,
        .browser-filters__summary,
        .browser-filters__chips,
        .browser-empty {
            background: var(--ink-surface);
            backdrop-filter: blur(14px);
        }
    }

    @media (max-width: 40rem) {
        .browser-header {
            align-items: flex-start;
            margin-bottom: 1.75rem;
        }

        .search-control {
            flex-basis: 100%;
        }

        .sort-control,
        .clear-control {
            flex: 1 1 auto;
        }

        .browser-filters__chips {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .browser-filters__summary {
            width: 100%;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .search-control,
        .browser-filters__summary,
        .sort-control,
        .clear-control,
        .filter-chip {
            transition: none;
        }
    }
</style>
