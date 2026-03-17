<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import SectionLabel from '../components/subcomponents/SectionLabel.svelte';

    onMount(() => {
        const heroName = document.querySelector('[data-hero="name"]');
        const heroSubtitle = document.querySelector('[data-hero="subtitle"]');
        
        if (heroName && heroSubtitle) {
            gsap.from([heroName, heroSubtitle], {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.1
            });
        }
    });
</script>

<section>
    <SectionLabel number="01" label="HERO" />
    <div class="border-l-4 border-brutalist-line pl-8">
        <h1 class="text-7xl md:text-9xl font-bold tracking-tighter leading-none mb-4 uppercase font-sans" data-hero="name">
            ALEJANDRO<br>
            CASTRO
        </h1>
        <p class="max-w-md font-mono text-sm leading-relaxed text-zinc-500" data-hero="subtitle">
            AI RESEARCHER & SYSTEM ARCHITECT. FOCUSING ON NEURAL SYMBOLIC REASONING AND AUTONOMOUS AGENT TOPOLOGIES.
        </p>
    </div>
</section>

<div class="mt-20 w-full h-px dashed-line relative">
    <span class="absolute -top-3 right-0 text-[10px] font-mono text-brutalist-line">[LAYOUT GRID X-72]</span>
</div>