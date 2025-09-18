<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { optimizeCloudinaryImage } from '../../lib/cloudinary.js';
    import { gsap } from 'gsap';

    export let project;
    export let x = null;
    export let y = null;
    export let angle = null;
    export let isHovered = false;

    // --- Element Bindings ---
    let subtitleContainer;
    let marqueeContainer;
    let marqueeContent;
    let firstTagSet;

    // --- State ---
    let isTagOverflowing = false;
    let isSubtitleOverflowing = false;

    // --- Animations ---
    let scrollTween;
    let marqueeTween;

    // --- Logic ---
    const checkOverflows = () => {
        if (marqueeContent && marqueeContainer) {
            isTagOverflowing = marqueeContent.scrollWidth > marqueeContainer.clientWidth;
        }
        if (subtitleContainer) {
            isSubtitleOverflowing = subtitleContainer.scrollHeight > subtitleContainer.clientHeight;
        }
    };

    onMount(() => {
        // Delay helps ensure fonts are rendered before taking measurements
        const timer = setTimeout(checkOverflows, 150);
        window.addEventListener('resize', checkOverflows);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkOverflows);
        };
    });

    // --- Reactive Animations ---
    $: {
        // Subtitle scroll animation, now only runs if it's actually overflowing
        if (subtitleContainer) {
            if (isHovered && isSubtitleOverflowing) {
                scrollTween = gsap.to(subtitleContainer, {
                    scrollTop: subtitleContainer.scrollHeight - subtitleContainer.clientHeight,
                    duration: 2, ease: "power1.inOut", yoyo: true, repeat: -1, repeatDelay: 1
                });
            } else {
                scrollTween?.kill();
                gsap.to(subtitleContainer, { scrollTop: 0, duration: 0.3, ease: "power2.out" });
            }
        }

        // Tag marquee animation
        if (isTagOverflowing && firstTagSet) {
            const firstTagSetWidth = firstTagSet.clientWidth;
            if (firstTagSetWidth > 0) {
                marqueeTween = gsap.to(marqueeContent, {
                    x: -(firstTagSetWidth + 8), // +8 for the gap
                    duration: 10,
                    ease: 'none',
                    repeat: -1,
                });
            }
        } else {
            marqueeTween?.kill();
            gsap.set(marqueeContent, { x: 0 });
        }
    }

    $: transformStyle = (x !== null && y !== null) ? `transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotateZ(${angle}rad); width: ${project.width}px; height: ${project.height}px;` : '';
</script>

<div
        transition:fade
        class:absolute={x !== null}
        class="flex flex-col overflow-hidden p-4 bg-black/30 backdrop-blur-md border-2 rounded-xl transition-all duration-200 ease-out shadow-lg select-none"
        class:cursor-grab={x !== null}
        class:cursor-pointer={x === null}
        class:border-primary={!isHovered}
        class:border-white={isHovered}
        class:shadow-[0_0_20px_theme(colors.primary)]={isHovered}
        class:backdrop-brightness-110={isHovered}
        class:hover:scale-105={x === null}
        style={transformStyle}
>
    <div class="w-full flex-grow min-h-0 mb-2">
        {#if project.image}
            <img
                    src={optimizeCloudinaryImage(project.image)}
                    alt={project.name}
                    class="w-full h-full object-cover rounded-lg"
            />
        {/if}
    </div>

    <div class="flex flex-col text-center flex-shrink-0 gap-1">
        <h3 class="text-white font-bold text-lg leading-tight truncate">
            {project.name}
        </h3>
        <div bind:this={subtitleContainer} class="relative max-h-[4rem] overflow-y-auto">
            <p class="text-gray-400 text-sm text-center p-1">
                {project.subtitle}
            </p>
        </div>
    </div>

    <div bind:this={marqueeContainer} class="w-full h-min flex-shrink-0 mt-auto pt-2 marquee-container">
        <div
                bind:this={marqueeContent}
                class="marquee-content flex gap-2"
                class:justify-center={!isTagOverflowing}
        >
            {#if project.tags}
                <span bind:this={firstTagSet} class="flex gap-2 flex-shrink-0">
                    {#each project.tags as tag}
                        <span class="flex-shrink-0 text-xs bg-white/10 text-primary font-semibold px-2 py-1 rounded-full">{tag}</span>
                    {/each}
                </span>

                {#if isTagOverflowing}
                    <span class="flex gap-2 flex-shrink-0">
                         {#each project.tags as tag}
                            <span class="flex-shrink-0 text-xs bg-white/10 text-primary font-semibold px-2 py-1 rounded-full">{tag}</span>
                        {/each}
                    </span>
                {/if}
            {/if}
        </div>
    </div>
</div>