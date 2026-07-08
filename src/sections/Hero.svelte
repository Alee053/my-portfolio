<script>
    import { onMount, onDestroy } from 'svelte';
    import { gsap } from 'gsap';
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';
    import { prefersReducedMotion } from '../lib/motion';
    import { SITE } from '../lib/site';

    const SUBTITLE = 'AI RESEARCHER & SYSTEMS ENGINEERING STUDENT. FOCUSING ON REINFORCEMENT LEARNING, ALGORITHMS, AND SEARCH-BASED PLANNING.';

    let sectionEl;
    let subtitleEl;
    let chipsEl;
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
        const chips = chipsEl.querySelectorAll('a');

        gsap.set(lineInners, { yPercent: 110 });
        gsap.set(chips, { opacity: 0, y: 8 });
        gsap.set(cueEl, { opacity: 0 });

        const typeProxy = { chars: 0 };
        subtitleEl.textContent = '';

        tl = gsap.timeline({ paused: true });
        tl.to(lineInners, { yPercent: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out' })
            .to(typeProxy, {
                chars: SUBTITLE.length,
                duration: 0.9,
                ease: 'none',
                onUpdate: () => {
                    subtitleEl.textContent = SUBTITLE.slice(0, Math.round(typeProxy.chars));
                }
            }, '-=0.35')
            .to(chips, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' }, '-=0.25')
            .to(cueEl, { opacity: 1, duration: 0.4 }, '<');

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
    .line-mask {
        display: block;
        overflow: hidden;
    }

    .line-inner {
        display: block;
        will-change: transform;
    }

    .hero-cursor {
        color: var(--color-brutalist-accent);
        animation: hero-blink 1s steps(1) infinite;
    }

    @keyframes hero-blink {
        50% { opacity: 0; }
    }

    .hero-cue {
        display: inline-block;
        animation: cue-pulse 2s ease-in-out infinite;
    }

    @keyframes cue-pulse {
        0%, 100% { opacity: 0.35; }
        50% { opacity: 0.9; }
    }

    @media (prefers-reduced-motion: reduce) {
        .hero-cursor,
        .hero-cue {
            animation: none;
        }
    }

    .description {
        word-break: keep-all;
        min-height: 3em; /* reserve space so the typewriter doesn't shift layout */
    }
</style>

<section id="hero-section" bind:this={sectionEl}>
    <SectionLabel number="01" label="HERO" />
    <div class="border-l-4 border-brutalist-line pl-4 md:pl-8">
        <h1 class="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none mb-4 uppercase font-sans">
            <span class="line-mask"><span class="line-inner">ALEJANDRO</span></span>
            <span class="line-mask"><span class="line-inner">CASTRO<span class="hero-cursor" aria-hidden="true">_</span></span></span>
        </h1>
        <p class="description max-w-lg font-mono text-xs md:text-sm leading-relaxed text-left text-zinc-500" bind:this={subtitleEl}>{SUBTITLE}</p>
        <div class="flex flex-wrap gap-3 mt-8 font-mono text-xs" bind:this={chipsEl}>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" class="px-3 py-2 border border-brutalist-line text-brutalist-text hover:border-brutalist-accent hover:text-brutalist-accent transition-colors">[GITHUB ↗]</a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" class="px-3 py-2 border border-brutalist-line text-brutalist-text hover:border-brutalist-accent hover:text-brutalist-accent transition-colors">[LINKEDIN ↗]</a>
            <a href="mailto:{SITE.email}" class="px-3 py-2 border border-brutalist-line text-brutalist-text hover:border-brutalist-accent hover:text-brutalist-accent transition-colors">[EMAIL ↗]</a>
        </div>
        <div class="mt-16" bind:this={cueEl} aria-hidden="true">
            <span class="hero-cue font-mono text-[10px] text-brutalist-line tracking-widest">SCROLL ↓</span>
        </div>
    </div>
</section>
