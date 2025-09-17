<script>
    import { fade } from 'svelte/transition';
    import { optimizeCloudinaryImage } from '../../lib/cloudinary.js';
    export let project;
    export let x = null;
    export let y = null;
    export let angle = null;
    export let isHovered = false;

    $: transformStyle = (x !== null && y !== null)
        ? `transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotateZ(${angle}rad); width: ${project.width}px; height: ${project.height}px;`
        : '';
</script>

<div
        transition:fade
        class:absolute={x !== null}
        class="flex flex-col items-center p-4 gap-2 bg-black/40 backdrop-blur-md border-2 rounded-xl transition-all duration-200 ease-out shadow-lg select-none"
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
        <div class="w-full h-3/5 flex-shrink-0">
            <img
                    src={optimizeCloudinaryImage(project.image)}
                    alt={project.name}
                    class="w-full h-full object-cover rounded-lg"
            />
        </div>
    {/if}

    <div class="flex flex-col justify-center items-center text-center flex-grow w-full">
        <h3 class="text-white font-bold text-lg leading-tight">
            {project.name}
        </h3>
        <p class="text-gray-400 text-sm">
            {project.subtitle}
        </p>
    </div>

    <div class="flex flex-wrap justify-center gap-2 flex-shrink-0">
        {#if project.tags}
            {#each project.tags as tag}
                <span class="text-xs bg-white/10 text-primary font-semibold px-2 py-1 rounded-full">{tag}</span>
            {/each}
        {/if}
    </div>
</div>