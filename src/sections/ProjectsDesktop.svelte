<script>
    import { onMount, onDestroy } from 'svelte';
    import { createPhysicsSimulation } from '../lib/matter-physics.js';
    import ProjectBlock from '../components/subcomponents/ProjectBlock.svelte';
    import Matter from 'matter-js';
    import BackButton from "../components/subcomponents/BackButton.svelte";

    export let projectsData = [];

    let physicsContainer;
    let physicsInstance;
    let hoveredProjectId = null;

    let projectPositions = [];

    let activeTag = 'All';
    let activeYear = 'All';

    let filteredProjects = [];
    function selectionChanged() {
        physicsInstance.destroy();
        filterProjects()
        initPhysics(filteredProjects);
    }

    function filterProjects() {
        filteredProjects = projectsData.filter(p => {
            const tagMatch = activeTag === 'All' || p.tags.includes(activeTag);
            const yearMatch = activeYear === 'All' || p.year === activeYear;
            return tagMatch && yearMatch;
        });
    }

    function handleProjectClick(project) {
        window.open(project.link, '_blank');
    }

    function initPhysics(projectsToSimulate) {
        const getNonCollidingPositions = (count, width, height, blockW, blockH, padding = 20) => {
            const positions = [];
            let attempts = 0;
            while (positions.length < count && attempts < 1000) {
                const x = Math.random() * (width - blockW - padding * 2) + blockW / 2 + padding;
                const y = Math.random() * (height - blockH - padding * 2) + blockH / 2 + padding;

                let placed = false;
                for (let i = 0; i <= positions.length; i++) {
                    if (i === positions.length) {
                        positions.push({ x, y });
                        placed = true;
                        break;
                    }
                    const pos = positions[i];
                    if (
                        Math.abs(pos.x - x) < blockW + padding &&
                        Math.abs(pos.y - y) < blockH + padding
                    ) {
                        const sideX = pos.x + blockW + padding;
                        if (sideX + blockW / 2 + padding < width) {
                            positions.push({ x: sideX, y: pos.y });
                            placed = true;
                            break;
                        }
                        const belowY = pos.y + blockH + padding;
                        if (belowY + blockH / 2 + padding < height) {
                            positions.push({ x: pos.x, y: belowY });
                            placed = true;
                            break;
                        }
                        positions.push({ x: pos.x, y: pos.y });
                        placed = true;
                        break;
                    }
                }
                attempts++;
            }
            return positions;
        };
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const blockW = 250, blockH = 250;
        const randomPositions = getNonCollidingPositions(projectsToSimulate.length, screenW, screenH, blockW, blockH);
        projectsToSimulate.forEach((proj, i) => {
            proj.x = randomPositions[i].x;
            proj.y = randomPositions[i].y;
            proj.width = blockW;
            proj.height = blockH;
        });

        physicsInstance = createPhysicsSimulation(physicsContainer, projectsToSimulate, handleProjectClick);
        const { engine, matterBodies, mouse } = physicsInstance;
        Matter.Events.on(engine, 'afterUpdate', () => {
            // Update Svelte component positions
            projectPositions = matterBodies.map((body) => ({
                id: body.projectData.id,
                x: body.position.x,
                y: body.position.y,
                angle: body.angle
            }));

            // --- HOVER EFFECT LOGIC ---
            const bodyUnderMouse = Matter.Query.point(matterBodies, mouse.position)[0];
            hoveredProjectId = bodyUnderMouse ? bodyUnderMouse.projectData.id : null;
        });
    }

    onMount(() => {

        initPhysics(projectsData);
        filterProjects()


        if (typeof window !== 'undefined') {
            window.addEventListener('resize', physicsInstance.handleResize);
        }
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', physicsInstance.handleResize);
        }
        if (physicsInstance) {
            physicsInstance.destroy();
        }
    });

    $: uniqueTags = ['All', ...new Set(projectsData.flatMap(p => p.tags))];
    $: uniqueYears = ['All', ...new Set(projectsData.map(p => p.year))].sort((a, b) => (b === 'All' ? -1 : a === 'All' ? 1 : b - a));
</script>

<section bind:this={physicsContainer} class="relative w-screen h-screen overflow-hidden ...">
    <BackButton/>
    {#each filteredProjects as project (project.id)}
        {@const pos = projectPositions.find(p => p.id === project.id)}
        {#if pos}
            <div class="absolute top-0 left-0 z-1 pointer-events-none">
                <ProjectBlock
                        {project}
                        x={pos.x}
                        y={pos.y}
                        angle={pos.angle}
                        isHovered={hoveredProjectId === project.id}
                />
            </div>
        {/if}
    {/each}

    <div class="fixed top-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl z-20 p-2 rounded-2xl border-2 border-white/10 bg-black/30 backdrop-blur-lg flex flex-col md:flex-row gap-4 justify-center items-center">
        <div class="flex flex-wrap justify-center items-center gap-2">
            {#each uniqueTags as tag}
                <button
                        class="filter-btn"
                        class:active={activeTag === tag}
                        on:click={() => {activeTag = tag; selectionChanged()}}
                >{tag}</button>
            {/each}
        </div>
        <div class="flex flex-wrap justify-center items-center gap-2">
            {#each uniqueYears as year}
                <button
                        class="filter-btn"
                        class:active={activeYear === year}
                        on:click={() => {activeYear = year; selectionChanged()}}
                >{year}</button>
            {/each}
        </div>
    </div>
</section>