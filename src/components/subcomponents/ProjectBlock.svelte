<script>
    import { fade } from 'svelte/transition';
    import { optimizeCloudinaryImage } from '../../lib/cloudinary.js';
    import { gsap } from 'gsap';

    export let project;
    export let x = null;
    export let y = null;
    export let angle = null;
    export let isHovered = false;

    let subtitleContainer;
    let scrollTween;

    $: if (subtitleContainer) {
        if (isHovered) {
            scrollTween = gsap.to(subtitleContainer, {
                scrollTop: subtitleContainer.scrollHeight - subtitleContainer.clientHeight,
                duration: 2,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                repeatDelay: 1
            });
        } else {
            scrollTween?.kill();
            gsap.to(subtitleContainer, {
                scrollTop: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    }

    $: transformStyle = (x !== null && y !== null)
        ? `transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotateZ(${angle}rad); width: ${project.width}px; height: ${project.height}px;`
        : '';
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
    {#if project.image}
        <div class="w-full h-2/5 flex-shrink-0">
            <img
                    src={optimizeCloudinaryImage(project.image)}
                    alt={project.name}
                    class="w-full h-full object-cover rounded-lg"
            />
        </div>
    {/if}

    <div class="flex flex-col text-center flex-grow min-h-0 h-3/5 py-2 gap-[2px]">
        <h3 class="text-white font-bold text-lg leading-tight">
            {project.name}
        </h3>
        <div
                bind:this={subtitleContainer}
                class="subtitle-container relative overflow-y-auto h-full py-1 grid place-items-center"
        >
            <p class="text-gray-400 text-sm text-center">
                {project.subtitle}
            </p>
        </div>
    </div>

    <div class="w-full flex-shrink-0 marquee-container">
        <div class="marquee-content flex gap-2">
            {#if project.tags}
                {#each project.tags as tag}
                    <span class="flex-shrink-0 text-xs bg-white/10 text-primary font-semibold px-2 py-1 rounded-full">{tag}</span>
                {/each}
                {#each project.tags as tag}
                    <span class="flex-shrink-0 text-xs bg-white/10 text-primary font-semibold px-2 py-1 rounded-full">{tag}</span>
                {/each}
            {/if}
        </div>
    </div>
</div>

