<script>
    import { onMount, onDestroy } from 'svelte';
    import { gsap } from 'gsap';
    import { prefersReducedMotion } from '../lib/motion-utils';
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';

    // Build timestamp — inlined (Astro components can't be rendered inside Svelte)
    const buildDate = new Date();
    const buildYyyy = buildDate.getFullYear();
    const buildMm = String(buildDate.getMonth() + 1).padStart(2, '0');
    const buildDd = String(buildDate.getDate()).padStart(2, '0');
    const buildHash = (Math.floor(buildDate.getTime() / 60000) % 0xffff)
        .toString(16)
        .toUpperCase()
        .padStart(4, '0');
    const buildTimestamp = `TS: ${buildHash}·BUILD·${buildYyyy}.${buildMm}.${buildDd}`;

    let statusBar;
    let line1Wrapper;
    let line1;
    let line2Wrapper;
    let line2;
    let cursor;
    let subtitle;
    let chips;
    let scrollCue;
    let cursorTween;

    onMount(() => {
        if (prefersReducedMotion()) {
            gsap.set([line1, line2, subtitle, statusBar, scrollCue, chips], { clearProps: 'all' });
            gsap.set([line1Wrapper, line2Wrapper], { clearProps: 'all' });
            return;
        }

        gsap.set(statusBar, { opacity: 0 });
        gsap.set([line1Wrapper, line2Wrapper], { overflow: 'hidden' });
        gsap.set([line1, line2], { yPercent: 100 });
        gsap.set(subtitle, { opacity: 0, y: 8 });
        gsap.set(chips, { opacity: 0, y: 4 });
        gsap.set(scrollCue, { opacity: 0 });
        gsap.set(cursor, { opacity: 1 });

        const tl = gsap.timeline();

        tl.to(statusBar, { opacity: 1, duration: 0.25, ease: 'power2.out' }, 0);
        tl.to(line1, { yPercent: 0, duration: 0.6, ease: 'power3.out' }, 0.15);
        tl.to(line2, { yPercent: 0, duration: 0.6, ease: 'power3.out' }, 0.3);

        cursorTween = gsap.to(cursor, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'none',
            delay: 0.9,
        });

        tl.to(subtitle, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.7);
        tl.to(chips, { opacity: 1, y: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out' }, 1.0);
        tl.to(scrollCue, { opacity: 0.7, duration: 0.4, ease: 'power2.out' }, 1.5);
        tl.to(scrollCue, {
            opacity: 0.3,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        }, 1.9);
    });

    onDestroy(() => {
        if (cursorTween) cursorTween.kill();
    });
</script>

<section id="hero-section" class="relative">
    <div bind:this={statusBar} class="flex justify-between items-center font-mono text-[10px] tracking-widest uppercase text-brutalist-line mb-6">
        <SectionLabel number="01" label="HERO" />
        <span class="text-brutalist-line/80">{buildTimestamp}</span>
    </div>

    <div class="border-l-4 border-brutalist-line pl-4 md:pl-8">
        <h1 class="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.95] mb-6 uppercase font-sans">
            <span bind:this={line1Wrapper} class="block overflow-hidden">
                <span bind:this={line1} class="block will-change-transform">ALEJANDRO</span>
            </span>
            <span bind:this={line2Wrapper} class="block overflow-hidden">
                <span bind:this={line2} class="block will-change-transform">
                    CASTRO<span bind:this={cursor} class="text-brutalist-accent">_</span>
                </span>
            </span>
        </h1>

        <p bind:this={subtitle} class="description max-w-lg font-mono text-xs md:text-sm leading-relaxed text-left text-brutalist-line/80 mb-8">
            [REF: AC-2026-MINIMAL] AI RESEARCHER &amp; SYSTEMS ENGINEERING STUDENT. FOCUSING ON REINFORCEMENT LEARNING, ALGORITHMS, AND SEARCH-BASED PLANNING.
        </p>

        <div bind:this={chips} class="flex flex-wrap gap-3 mb-12 font-mono text-xs">
            <a href="https://github.com/Alee053" target="_blank" rel="noopener noreferrer" class="px-3 py-2 border border-brutalist-line text-brutalist-text hover:border-brutalist-accent hover:text-brutalist-accent transition-colors">
                [GITHUB ↗]
            </a>
            <a href="https://www.linkedin.com/in/alejandrocastroalvarez/" target="_blank" rel="noopener noreferrer" class="px-3 py-2 border border-brutalist-line text-brutalist-text hover:border-brutalist-accent hover:text-brutalist-accent transition-colors">
                [LINKEDIN ↗]
            </a>
            <a href="mailto:alejandro@alecastro.dev" class="px-3 py-2 border border-brutalist-accent text-brutalist-accent hover:bg-brutalist-accent hover:text-black transition-colors">
                [EMAIL ↗]
            </a>
        </div>

        <div bind:this={scrollCue} class="font-mono text-[10px] tracking-widest uppercase text-brutalist-line/60">
            SCROLL ↓
        </div>
    </div>
</section>

<style>
    .description {
        word-break: keep-all;
    }
</style>
