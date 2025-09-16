<script>
    import { onMount, onDestroy } from 'svelte';
    import { gsap } from 'gsap';
    import ArrowIcon from '../components/subcomponents/ArrowIcon.svelte';
   import Contact from "../components/subcomponents/Contact.svelte";
    import { fade } from 'svelte/transition';
    import { writable } from 'svelte/store';

    export const blBtnHovered = writable(false);

    // State
    let backButtonDisabled = true;

    // Constants
    const SCROLL_ANIMATION_DISTANCE = 2500;

    // Declare module variables here; they will be assigned in onMount
    let SplitText, ScrollTrigger;
    let splitInstance;

    // --- Lifecycle & Animations ---

    onMount(async () => {
        // Dynamically import GSAP plugins for browser-only execution
        const modSplit = await import('gsap/SplitText');
        const modScroll = await import('gsap/ScrollTrigger');
        SplitText = modSplit.SplitText;
        ScrollTrigger = modScroll.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger, SplitText);

        splitInstance = new SplitText('#name', { type: 'chars' });
        lockScroll();
        runIntroAnimation();
    });

    onDestroy(() => {
        // Clean up GSAP instances to prevent memory leaks
        if (splitInstance) splitInstance.revert();
        ScrollTrigger?.killAll(); // Use optional chaining for safety
        unlockScroll();
    });

    function runIntroAnimation() {
        const intro = gsap.timeline({
            onComplete: setupScrollAnimation
        });

        // We also make the parent <h1> visible right away
        gsap.set('#name', { visibility: 'visible' });
        gsap.set('#down-arrow', { visibility: 'visible' });

        intro.from(splitInstance.chars, {
            delay: 0.2,
            opacity: 0,
            x: 20,
            duration: 1,
            ease: 'power2.out',
            stagger: { each: 0.1, from: 'left' },
        })
            .from('#down-arrow', { y: 100, opacity: 0, duration: 1, ease: 'power2.out' }, '-=1');
    }

    function setupScrollAnimation() {
        unlockScroll();

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.hero', start: 'top top', end: `+=${SCROLL_ANIMATION_DISTANCE}`, scrub: 0.6, pin: true, anticipatePin: 1
            }
        });

        tl.to(splitInstance.chars, {
            x: (i) => (i % 2 === 0 ? '-100vw' : '100vw'),
            y: (i) => (i % 4 < 2 ? '-100vh' : '100vh'),
            rotation: (i) => (i % 2 === 0 ? -360 : 360),
            opacity: 0, scale: 0.7, ease: 'power3.in', duration: 1, stagger: { each: 0.02, from: 'center' }
        }, 0);

        tl.to('#down-arrow', { y: 50, opacity: 0, duration: 0.5, ease: 'power1.out' }, '<')
            .to('#tl-btn', { left: '0', duration: 1 }, '-=0.5')
            .to('#tr-btn', { top: '0', duration: 1 }, '-=0.5')
            .to('#br-btn', { right: '0', duration: 1 }, '-=0.5')
            .to('#bl-btn', { bottom: '0', duration: 1 }, '-=0.5');

        tl.to('#center-btn', {
            opacity: 1, duration: 0.5, onStart: () => (backButtonDisabled = false), onReverseComplete: () => (backButtonDisabled = true)
        });
    }

    // --- Helpers & Event Handlers ---

    const lockScroll = () => { if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'; };
    const unlockScroll = () => { if (typeof document !== 'undefined') document.body.style.overflow = 'auto'; };

    const handleScrollDown = () => window.scrollTo({ top: SCROLL_ANIMATION_DISTANCE, behavior: 'smooth' });
    const handleScrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });
</script>

<section transition:fade class="hero h-screen flex justify-center items-center shadow-inner bg-radial from-black/0 from-65% to-black relative overflow-hidden">
    <h1 id="name" class="text-[7vw] font-bold text-white backface-hidden invisible">Alejandro Castro</h1>

    <button id="down-arrow" on:click={handleScrollDown} class="invisible w-full fixed bottom-0 grid place-items-center h-[10vw] lg:h-[5vw] group">
        <ArrowIcon className="stroke-white fill-white w-[5vw] transition duration-300 ease-in-out group-hover:scale-110 group-hover:fill-primary group-hover:stroke-primary" />
    </button>

    <a id="tl-btn" href="/projects" class="corner-btn w-[60vw] h-[40vh] top-0 left-[-100%]">
        <p>Projects</p>
    </a>
    <a id="tr-btn" href="/about-me" class="corner-btn w-[40vw] h-[60vh] top-[-100%] right-0">
        <p>About Me</p>
    </a>
    <a id="br-btn" href="/blog" class="corner-btn w-[60vw] h-[40vh] bottom-0 right-[-100%]">
        <p>Blog</p>
    </a>
    <button id="bl-btn" class="corner-btn w-[40vw] h-[60vh] bottom-[-100%] left-0" on:mouseenter={() => blBtnHovered.set(true)}
            on:mouseleave={() => blBtnHovered.set(false)}
            on:focus={() => blBtnHovered.set(true)}
            on:blur={() => blBtnHovered.set(false)}>
        {#if $blBtnHovered}
            <Contact/>
        {:else}
            <p transition:fade >Contact</p>
        {/if}
    </button>

    <button id="center-btn" on:click={handleScrollUp} disabled={backButtonDisabled} class="corner-btn group top-[40vh] left-[40vw] w-[20vw] h-[20vh] opacity-0 disabled:cursor-default">
        <ArrowIcon className="stroke-white fill-white w-[5vw] rotate-180 transition duration-300 ease-in-out group-hover:scale-120 group-hover:fill-primary group-hover:stroke-primary" />
    </button>
</section>
