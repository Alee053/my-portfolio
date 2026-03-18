<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';

    function splitToChars(text) {
        return text.split('').map(char => char === ' ' ? '\u00A0' : char);
    }

    onMount(() => {
        const heroName = document.querySelector('[data-hero="name"]');
        const heroSubtitle = document.querySelector('[data-hero="subtitle"]');

        if (heroName && heroSubtitle) {
            const nameFirst = heroName.querySelector('.name-first');
            const nameLast = heroName.querySelector('.name-last');

            if (nameFirst && nameLast) {
                const tl = gsap.timeline();

                const firstNameChars = nameFirst.querySelectorAll('.char');
                const lastNameChars = nameLast.querySelectorAll('.char');
                const subtitleChars = heroSubtitle.querySelectorAll('.char');

                tl.set(firstNameChars, { opacity: 0 })
                    .set(lastNameChars, { opacity: 0 })
                    .set(subtitleChars, { opacity: 0 })

                    .to(firstNameChars, {
                        opacity: 1,
                        duration: 0.08,
                        stagger: 0.08,
                        ease: 'none'
                    })
                    .to(lastNameChars, {
                        opacity: 1,
                        duration: 0.08,
                        stagger: 0.08,
                        ease: 'none'
                    }, '>')
                    .to(subtitleChars, {
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
    .char {
        display: inline-block;
    }
    .description {
        word-break: keep-all;
    }
</style>

<section id="hero-section">
    <SectionLabel number="01" label="HERO" />
    <div class="border-l-4 border-brutalist-line pl-8">
        <h1 class="text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-4 uppercase font-sans" data-hero="name">
            <span class="name-first">
                {#each splitToChars('ALEJANDRO') as char}
                    <span class="char">{char}</span>
                {/each}
            </span><br>
            <span class="name-last">
                {#each splitToChars('CASTRO') as char}
                    <span class="char">{char}</span>
                {/each}
            </span>
        </h1>
        <p class="description max-w-lg font-mono text-sm leading-relaxed text-justify text-zinc-500" data-hero="subtitle">
            {#each splitToChars('AI RESEARCHER & SYSTEMS ENGINEERING STUDENT. FOCUSING ON REINFORCEMENT LEARNING, ALGORITHMS, AND SEARCH-BASED PLANNING.') as char}
                <span class="char">{char}</span>
            {/each}
        </p>
    </div>
</section>

<div class="mt-20 w-full h-px dashed-line relative">
    <span class="absolute -top-3 right-0 text-[10px] font-mono text-brutalist-line opacity-50 select-none">[LAYOUT GRID X-72]</span>
</div>