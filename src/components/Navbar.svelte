<script lang="ts">
    import { onMount } from 'svelte';
    import { SITE } from '../lib/site';

    export let initialPath = '/';
    let pathname = initialPath;
    const links = [
        { href: '/', label: 'Home', file: 'readme.md' },
        { href: '/projects', label: 'Projects', file: 'projects/' },
        { href: '/blogs', label: 'Writing', file: 'writing/' },
    ];

    function isCurrent(href: string, path: string) {
        return href === '/'
            ? path === '/'
            : href === '/blogs'
              ? /^\/blogs?(\/|$)/.test(path)
              : path.replace(/\/$/, '') === href;
    }

    function openPanel(panel: 'about' | 'contact') {
        const other = panel === 'about' ? 'contact' : 'about';
        document.dispatchEvent(new CustomEvent(`close-toggle-${other}-modal`));
        document.dispatchEvent(new CustomEvent(`toggle-${panel}-modal`));
    }

    onMount(() => {
        const updatePath = () => (pathname = window.location.pathname);
        updatePath();
        document.addEventListener('astro:page-load', updatePath);
        return () =>
            document.removeEventListener('astro:page-load', updatePath);
    });
</script>

<aside class="site-nav">
    <div class="nav-inner">
        <a class="nav-identity" href="/" aria-label="Alejandro Castro, home"
            >a<span>[</span>c<span>]</span></a
        >
        <p class="nav-caption">Personal directory</p>
        <nav aria-label="Main navigation">
            <ul class="nav-list">
                {#each links as link}
                    <li>
                        <a
                            href={link.href}
                            class:current={isCurrent(link.href, pathname)}
                            aria-current={isCurrent(link.href, pathname)
                                ? 'page'
                                : undefined}
                        >
                            <span class="nav-pointer" aria-hidden="true"
                                >{isCurrent(link.href, pathname)
                                    ? '›'
                                    : '·'}</span
                            >
                            <span
                                >{link.label}<span
                                    class="nav-file"
                                    aria-hidden="true">{link.file}</span
                                ></span
                            >
                        </a>
                    </li>
                {/each}
                <li>
                    <button
                        type="button"
                        onclick={() => openPanel('about')}
                        aria-haspopup="dialog"
                        ><span class="nav-pointer" aria-hidden="true">·</span
                        >About</button
                    >
                </li>
                <li>
                    <button
                        type="button"
                        onclick={() => openPanel('contact')}
                        aria-haspopup="dialog"
                        ><span class="nav-pointer" aria-hidden="true">·</span
                        >Contact
                        <span class="nav-arrow" aria-hidden="true">↗</span
                        ></button
                    >
                </li>
            </ul>
        </nav>
        <div class="nav-elsewhere">
            <p class="nav-caption">Elsewhere</p>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer"
                >GitHub <span aria-hidden="true">↗</span></a
            >
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer"
                >LinkedIn <span aria-hidden="true">↗</span></a
            >
        </div>
    </div>
</aside>

<style>
    .site-nav {
        min-width: 0;
        border-right: 1px solid var(--ink-line);
    }
    .nav-inner {
        position: sticky;
        top: 2rem;
        padding: 2rem 1rem;
    }
    .nav-identity {
        display: inline-flex;
        min-height: 2.75rem;
        margin: 0 0 2.5rem 0.5rem;
        font-family: var(--font-display);
        font-size: 2.25rem;
        letter-spacing: -0.12em;
        text-decoration: none;
    }
    .nav-identity span {
        color: var(--ink-accent);
    }
    .nav-caption {
        margin: 0 0 0.75rem 0.625rem;
        color: var(--ink-muted);
        font-size: 0.625rem;
    }
    .nav-list {
        display: grid;
        gap: 0.375rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .nav-list a,
    .nav-list button {
        display: flex;
        width: 100%;
        min-height: 2.75rem;
        align-items: center;
        gap: 0.625rem;
        border: 0;
        background: transparent;
        padding: 0.5rem 0.625rem;
        color: var(--ink-muted);
        font-size: 0.75rem;
        text-align: left;
        text-decoration: none;
    }
    .nav-list a:hover,
    .nav-list button:hover {
        background: var(--ink-900);
        color: var(--ink-text);
    }
    .nav-list a.current {
        background: #10170d;
        color: var(--ink-accent);
    }
    .nav-pointer {
        width: 0.625rem;
        flex: none;
        color: var(--ink-accent);
    }
    .nav-file {
        display: block;
        margin-top: 0.2rem;
        color: var(--ink-muted);
        font-size: 0.625rem;
    }
    .nav-arrow {
        margin-left: auto;
    }
    .nav-elsewhere {
        display: grid;
        margin-top: 3.5rem;
    }
    .nav-elsewhere a {
        display: flex;
        min-height: 2.75rem;
        align-items: center;
        justify-content: space-between;
        padding-inline: 0.625rem;
        color: var(--ink-muted);
        font-size: 0.6875rem;
        text-decoration: none;
    }
    .nav-elsewhere a:hover {
        color: var(--ink-accent);
    }
    @media (max-width: 60rem) {
        .nav-inner {
            padding-inline: 0.5rem;
        }
        .nav-caption {
            font-size: 0.5625rem;
        }
    }
    @media (max-width: 44rem) {
        .site-nav {
            border-right: 0;
            border-bottom: 1px solid var(--ink-line);
        }
        .nav-inner {
            position: static;
            padding: 0.5rem 0.75rem;
        }
        .nav-identity,
        .nav-caption,
        .nav-elsewhere,
        .nav-file,
        .nav-pointer,
        .nav-arrow {
            display: none;
        }
        .nav-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0;
        }
        .nav-list li {
            flex: 1;
        }
        .nav-list a,
        .nav-list button {
            justify-content: center;
            padding-inline: 0.375rem;
            font-size: 0.6875rem;
        }
    }
</style>
