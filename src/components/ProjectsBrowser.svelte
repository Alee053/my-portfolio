<script lang="ts">
    import ProjectRow from './subcomponents/ProjectRow.svelte';

    import SectionLabel from './subcomponents/SectionLabel.svelte';
    import '../styles/browser.css';
    import type { CollectionEntry } from 'astro:content';

    export let projects: CollectionEntry<'projects'>['data'][] = [];

    let searchQuery = '';
    let activeTags: string[] = [];
    let sortMode: 'featured' | 'az' | 'za' = 'featured';

    $: uniqueTags = [...new Set(projects.flatMap((p) => p.tags || []))].sort();

    $: filteredProjects = projects
        .filter((project) => {
            const matchesSearch =
                !searchQuery ||
                project.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (project.subtitle || '')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (project.company || '')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (project.category || '')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (project.tags || []).some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                );

            const matchesTags =
                activeTags.length === 0 ||
                activeTags.every((tag) => (project.tags || []).includes(tag));

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

    function toggleTag(tag: string) {
        const index = activeTags.indexOf(tag);
        if (index > -1) {
            activeTags = activeTags.filter((t) => t !== tag);
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
        featured: 'Featured',
        az: 'A-Z',
        za: 'Z-A',
    };
</script>

<section class="browser">
    <header class="browser-header">
        <SectionLabel command="ls ~/projects" label="Projects" />
        <h1 class="browser-header__title">Projects</h1>
        <p class="browser-header__description">
            SaaS and custom software built with Devs Haus. Personal experiments
            in AI, algorithms and simulation.
        </p>
    </header>

    <div class="browser-tools">
        <label class="search-control" for="projects-browser-search">
            <span class="search-control__label">Search</span>
            <input
                id="projects-browser-search"
                name="project-search"
                type="search"
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
            <span class="filter-count" aria-live="polite"
                >{activeFilterCount} active {activeFilterCount === 1
                    ? 'filter'
                    : 'filters'}</span
            >
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
                <span class="browser-filters__value"
                    >{activeTags.length > 0
                        ? `${activeTags.length} selected`
                        : 'All tags'}</span
                >
            </summary>
            <div class="browser-filters__chips">
                {#each uniqueTags as tag}
                    <button
                        type="button"
                        on:click={() => toggleTag(tag)}
                        class="filter-chip {activeTags.includes(tag)
                            ? 'is-active'
                            : ''}"
                        aria-pressed={activeTags.includes(tag)}
                    >
                        {tag}
                    </button>
                {/each}
            </div>
        </details>
    {/if}

    <p class="browser-result-count" role="status">
        {filteredProjects.length} of {projects.length} projects
    </p>
    <div class="browser-card-list">
        {#if filteredProjects.length === 0}
            <div class="browser-empty">
                {#if searchQuery || activeTags.length > 0}
                    <p>No projects match these filters.</p>
                {:else}
                    <p>No projects yet.</p>
                {/if}
                {#if activeFilterCount > 0}<button
                        type="button"
                        on:click={clearFilters}
                        class="clear-control">Clear filters</button
                    >{/if}
            </div>
        {:else}
            {#each filteredProjects as project (project.name)}
                <ProjectRow {project} />
            {/each}
        {/if}
    </div>
</section>
