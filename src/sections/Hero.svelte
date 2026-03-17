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
        const cursor = document.querySelector('[data-hero="cursor"]');

        if (heroName && heroSubtitle && cursor) {
            const nameFirst = heroName.querySelector('.name-first');
            const nameLast = heroName.querySelector('.name-last');

            if (nameFirst && nameLast) {
                const tl = gsap.timeline();

                tl.set([nameFirst.querySelectorAll('.char'), nameLast.querySelectorAll('.char'), heroSubtitle.querySelectorAll('.char')], {
                    opacity: 0
                })
                .set(cursor, { opacity: 0 })
                .to(nameFirst.querySelectorAll('.char'), {
                    opacity: 1,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: 'none',
                })
                .to(nameLast.querySelectorAll('.char'), {
                    opacity: 1,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: 'none',
                }, '>')
                .to(cursor, {
                    opacity: 1,
                    duration: 0,
                }, '+=0')
                .to(heroSubtitle.querySelectorAll('.char'), {
                    opacity: 1,
                    duration: 0.01,
                    stagger: 0.0085,
                    ease: 'none',
                });
            }
        }
    });
</script>

<style>
    .char {
        display: inline-block;
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }

    .cursor {
        animation: blink 1s step-end infinite;
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
            <span class="inline-block w-2 h-[0.7em] bg-brutalist-line ml-1 align-middle cursor" data-hero="cursor"></span>
        </h1>
        <p class="max-w-md font-mono text-sm leading-relaxed text-zinc-500" data-hero="subtitle">
            {#each splitToChars('AI RESEARCHER & SYSTEM ARCHITECT. FOCUSING ON NEURAL SYMBOLIC REASONING AND AUTONOMOUS AGENT TOPOLOGIES.') as char}
                <span class="char">{char}</span>
            {/each}
        </p>
    </div>
</section>

<div class="mt-20 w-full h-px dashed-line relative">
    <span class="absolute -top-3 right-0 text-[10px] font-mono text-brutalist-line opacity-50 select-none">[LAYOUT GRID X-72]</span>
</div>
