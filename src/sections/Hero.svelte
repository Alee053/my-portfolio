<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { SplitText } from 'gsap/SplitText';
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';

    gsap.registerPlugin(SplitText);

    onMount(() => {
        const heroName = document.querySelector('[data-hero="name"]');
        const heroSubtitle = document.querySelector('[data-hero="subtitle"]');

        if (heroName && heroSubtitle) {
            const nameFirst = heroName.querySelector('.name-first');
            const nameLast = heroName.querySelector('.name-last');

            if (nameFirst && nameLast) {
                const firstNameSplit = SplitText.create(nameFirst, { type: 'words, chars' });
                const lastNameSplit = SplitText.create(nameLast, { type: 'words, chars' });
                const subtitleSplit = SplitText.create(heroSubtitle, { type: 'words, chars' });

                const tl = gsap.timeline();

                tl.set(firstNameSplit.chars, { opacity: 0 })
                    .set(lastNameSplit.chars, { opacity: 0 })
                    .set(subtitleSplit.chars, { opacity: 0 })

                    .to(firstNameSplit.chars, {
                        opacity: 1,
                        duration: 0.08,
                        stagger: 0.08,
                        ease: 'none'
                    })
                    .to(lastNameSplit.chars, {
                        opacity: 1,
                        duration: 0.08,
                        stagger: 0.08,
                        ease: 'none'
                    }, '>')
                    .to(subtitleSplit.chars, {
                        opacity: 1,
                        duration: 0.02,
                        stagger: 0.02,
                        ease: 'none'
                    }, '<');
            }
        }
    });
</script>

<style>
    .description {
        word-break: keep-all;
    }
</style>

<section id="hero-section">
    <SectionLabel number="01" label="HERO" />
    <div class="border-l-4 border-brutalist-line pl-4 md:pl-8">
        <h1 class="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter leading-none mb-4 uppercase font-sans" data-hero="name">
            <span class="name-first">ALEJANDRO</span><br>
            <span class="name-last">CASTRO</span>
        </h1>
        <p class="description max-w-lg font-mono text-xs md:text-sm leading-relaxed text-left text-zinc-500" data-hero="subtitle">
            AI RESEARCHER & SYSTEMS ENGINEERING STUDENT. FOCUSING ON REINFORCEMENT LEARNING, ALGORITHMS, AND SEARCH-BASED PLANNING.
        </p>
    </div>
</section>