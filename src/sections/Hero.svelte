<script>
    import { onMount, onDestroy } from 'svelte';
    import { gsap } from 'gsap';
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import { prefersReducedMotion } from '../lib/motion';
    import { SITE } from '../lib/site';

    const SUBTITLE = 'AI RESEARCHER & SYSTEMS ENGINEERING STUDENT. FOCUSING ON REINFORCEMENT LEARNING, ALGORITHMS, AND SEARCH-BASED PLANNING.';

    let sectionEl;
    let subtitleEl;
    let actionsEl;
    let profileEl;
    let cueEl;
    let tl = null;
    let startIntro = null;

    onMount(() => {
        // SSR markup is the final state; only animate on the first visit of the
        // session (decided by the splash inline script) and with motion allowed.
        if (!window.__bootRan || prefersReducedMotion()) return;
        // Consume the flag so view-transition re-mounts don't replay the intro
        window.__bootRan = false;

        const lineInners = sectionEl.querySelectorAll('.line-inner');
        const actions = actionsEl.querySelectorAll('a');

        gsap.set(lineInners, { yPercent: 110 });
        gsap.set(subtitleEl, { opacity: 0, y: 12 });
        gsap.set(actions, { autoAlpha: 0, y: 8 });
        gsap.set(profileEl, { opacity: 0, y: 16 });
        gsap.set(cueEl, { opacity: 0 });

        tl = gsap.timeline({ paused: true });
        tl.to(lineInners, { yPercent: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out' })
            .to(subtitleEl, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.32')
            .to(actions, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' }, '-=0.2')
            .to(profileEl, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3')
            .to(cueEl, { opacity: 1, duration: 0.35 }, '<');

        if (window.__bootDone) {
            tl.play();
        } else {
            startIntro = () => tl.play();
            document.addEventListener('boot:done', startIntro, { once: true });
        }
    });

    onDestroy(() => {
        if (startIntro) document.removeEventListener('boot:done', startIntro);
        tl?.kill();
    });
</script>

<style>
    .hero-copy {
        min-width: 0;
        container-type: inline-size;
    }

    .hero-name {
        max-width: 100%;
        font-size: clamp(2rem, 13.5vw, 9.5rem);
    }

    @media (min-width: 1024px) {
        .hero-name {
            font-size: clamp(2rem, 8vw, 7rem);
        }
    }

    @supports (font-size: 1cqw) {
        .hero-name {
            font-size: clamp(2rem, 14cqw, 9.5rem);
        }
    }

    .line-mask {
        display: block;
        overflow: hidden;
    }

    .line-inner {
        display: block;
        white-space: nowrap;
    }

    .hero-cursor {
        color: var(--ink-accent);
    }

    .hero-cue {
        display: inline-block;
    }

    .hero-action {
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        border: 1px solid var(--ink-line);
        border-radius: 0.75rem;
        background: var(--ink-900);
        color: var(--ink-text);
        corner-shape: squircle;
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        letter-spacing: 0.04em;
        text-decoration: none;
    }

    .hero-action:hover {
        border-color: var(--ink-accent);
        color: var(--ink-accent);
    }

    .hero-action:focus-visible {
        outline: 2px solid var(--ink-accent);
        outline-offset: 4px;
        box-shadow: 0 0 0 4px rgba(101, 231, 189, 0.16);
    }

    .hero-profile {
        min-height: 20rem;
    }

    .hero-profile__dot {
        display: inline-block;
        width: 0.45rem;
        height: 0.45rem;
        flex: none;
        border-radius: 999px;
        background: var(--ink-accent);
        box-shadow: 0 0 0 0.25rem rgba(101, 231, 189, 0.1);
    }

    .hero-profile__rule {
        height: 1px;
        background: linear-gradient(90deg, var(--ink-accent), var(--ink-cyan), transparent);
        opacity: 0.6;
    }

    .hero-profile__signal {
        display: inline-block;
        width: 1.5rem;
        height: 1px;
        flex: none;
        background: var(--ink-line);
    }

    @media (prefers-reduced-motion: no-preference) {
        .hero-cursor {
            animation: hero-blink 1s steps(1) infinite;
        }

        .hero-cue {
            animation: cue-pulse 2s ease-in-out infinite;
        }
    }

    @keyframes hero-blink {
        50% { opacity: 0; }
    }

    @keyframes cue-pulse {
        0%, 100% { opacity: 0.35; }
        50% { opacity: 0.9; }
    }

    .description {
        word-break: keep-all;
    }
</style>

<section id="hero-section" bind:this={sectionEl}>
    <div class="grid grid-cols-1 items-end gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)] lg:gap-16">
        <div class="hero-copy">
            <SectionLabel number="01" label="HERO" />
            <h1 class="hero-name mb-6 font-bold uppercase leading-[0.86] tracking-tighter font-sans">
                <span class="line-mask"><span class="line-inner">ALEJANDRO</span></span>
                <span class="line-mask"><span class="line-inner">CASTRO<span class="hero-cursor" aria-hidden="true">_</span></span></span>
            </h1>
            <p class="description max-w-xl font-mono text-xs leading-relaxed text-[var(--ink-muted)] md:text-sm" bind:this={subtitleEl}>{SUBTITLE}</p>
            <nav class="mt-8 flex flex-wrap gap-3" bind:this={actionsEl} aria-label="Profile links">
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" class="hero-action">
                    GitHub <span aria-hidden="true">↗</span>
                </a>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" class="hero-action">
                    LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a href="mailto:{SITE.email}" class="hero-action">
                    Email <span aria-hidden="true">↗</span>
                </a>
            </nav>
            <div class="mt-16" bind:this={cueEl} aria-hidden="true">
                <span class="hero-cue font-mono text-[10px] tracking-[0.2em] text-[var(--ink-muted)]">SCROLL ↓</span>
            </div>
        </div>

        <aside class="glass-panel hero-profile flex flex-col justify-between p-6 sm:p-8" bind:this={profileEl} aria-labelledby="hero-profile-title">
            <div>
                <div class="flex items-center gap-3">
                    <span class="hero-profile__dot" aria-hidden="true"></span>
                    <h2 id="hero-profile-title" class="font-mono text-xs tracking-[0.14em] text-[var(--ink-text)]">AI RESEARCHER</h2>
                </div>
                <p class="mt-5 max-w-xs text-2xl font-medium leading-tight tracking-tight text-[var(--ink-text)]">SYSTEMS ENGINEERING STUDENT</p>
            </div>

            <div class="mt-8">
                <span class="hero-profile__rule block" aria-hidden="true"></span>
                <ul class="mt-5 space-y-3 font-mono text-[11px] tracking-[0.08em] text-[var(--ink-muted)]">
                    <li class="flex items-center gap-3">
                        <span class="hero-profile__signal" aria-hidden="true"></span>
                        <span>REINFORCEMENT LEARNING</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="hero-profile__signal" aria-hidden="true"></span>
                        <span>ALGORITHMS</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <span class="hero-profile__signal" aria-hidden="true"></span>
                        <span>SEARCH-BASED PLANNING</span>
                    </li>
                </ul>
            </div>
        </aside>
    </div>
</section>
