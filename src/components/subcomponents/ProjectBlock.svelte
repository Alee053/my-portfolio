
<script>
    import { fade } from 'svelte/transition';
    export let project;
    export let x;
    export let y;
    export let angle;
    export let isHovered = false; // New prop to control hover state
</script>

<div
        transition:fade
        class="
        absolute flex flex-col justify-center items-center text-center
        bg-surface-10/20 backdrop-blur-md
        border-2 rounded-xl p-2
        transition-all duration-150 ease-out
        shadow-md select-none gap-1
        border-primary
    "
        class:border-4={isHovered}
        class:backdrop-blur-xs={isHovered}
        class:bg-surface-20-={isHovered}
        style="
        transform: translate(calc(-50% + {x}px), calc(-50% + {y}px)) rotateZ({angle}rad);
        width: {project.width}px;
        height: {project.height}px;
    "
>
    <h3 class="text-white font-bold leading-tight" style="font-size: calc({project.height}px * 0.07);">
        {project.name}
    </h3>
    <p class="text-gray-400" style="font-size: calc({project.height}px * 0.05);">
        {project.year}
    </p>
    {#if project.image}
        <img
                src={project.image}
                alt={project.name}
                class="object-contain rounded-lg"
                style="max-width: calc({project.width}px * 0.8);"
        />
    {/if}
    {#if project.subtitle}
        <p class="text-gray-400 m-0" style="font-size: calc({project.height}px * 0.06);">
            {project.subtitle}
        </p>
    {/if}
</div>