<script lang="ts">
    import BlogRow from './subcomponents/BlogRow.svelte';

    import SectionLabel from './subcomponents/SectionLabel.svelte';
    import '../styles/browser.css';
    import type { BlogSummary } from '../lib/content';

    export let blogs: BlogSummary[] = [];

    let searchQuery = '';
    let activeTags: string[] = [];
    let sortDirection = 'desc';

    $: uniqueTags = [...new Set(blogs.flatMap((b) => b.tags || []))].sort();

    $: filteredBlogs = blogs
        .filter((blog) => {
            const matchesSearch =
                !searchQuery ||
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (blog.description || '')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (blog.tags || []).some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                );

            const matchesTags =
                activeTags.length === 0 ||
                activeTags.every((tag) => (blog.tags || []).includes(tag));

            return matchesSearch && matchesTags;
        })
        .sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
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

    function toggleSort() {
        sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
    }
</script>

<section class="browser">
    <header class="browser-header">
        <SectionLabel command="ls ~/writing" label="Writing" />
        <h1 class="browser-header__title">Writing</h1>
        <p class="browser-header__description">
            Technical notes on algorithms, applied AI and the things I learn
            while building.
        </p>
    </header>

    <div class="browser-tools">
        <label class="search-control" for="blogs-browser-search">
            <span class="search-control__label">Search</span>
            <input
                id="blogs-browser-search"
                name="blog-search"
                type="search"
                bind:value={searchQuery}
                placeholder="Search by title or tag"
                aria-label="Search blogs by title or tag"
                autocomplete="off"
            />
        </label>

        <button
            type="button"
            on:click={toggleSort}
            class="sort-control {sortDirection === 'desc' ? 'is-active' : ''}"
            aria-label="Sort blog posts by date: {sortDirection === 'desc'
                ? 'newest first'
                : 'oldest first'}"
        >
            <span>Sort by date:</span>
            <strong
                >{sortDirection === 'desc'
                    ? 'Newest first'
                    : 'Oldest first'}</strong
            >
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
                aria-label="Clear blog filters"
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
        {filteredBlogs.length} of {blogs.length} articles
    </p>
    <div class="browser-card-list">
        {#if filteredBlogs.length === 0}
            <div class="browser-empty">
                {#if searchQuery || activeTags.length > 0}
                    <p>No articles match these filters.</p>
                {:else}
                    <p>No articles yet.</p>
                {/if}
                {#if activeFilterCount > 0}<button
                        type="button"
                        on:click={clearFilters}
                        class="clear-control">Clear filters</button
                    >{/if}
            </div>
        {:else}
            {#each filteredBlogs as blog (blog.slug)}
                <BlogRow {blog} />
            {/each}
        {/if}
    </div>
</section>
