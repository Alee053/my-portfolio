<script>
    import { onMount, onDestroy } from 'svelte';
    import { createPhysicsSimulation } from '../lib/matter-physics.js';
    import ProjectBlock from '../components/subcomponents/ProjectBlock.svelte';
    import { ProjectData } from '../lib/utility.js';
    import Matter from 'matter-js';
    import BackButton from "../components/subcomponents/BackButton.svelte";

    let physicsContainer;
    let physicsInstance;
    let hoveredProjectId = null;

    let projectsData = [];
    let projectPositions = [];

    function handleProjectClick(project) {
        window.open(project.link, '_blank');
    }

    onMount(() => {
        const getNonCollidingPositions = (count, width, height, blockW, blockH, padding = 20) => {
            const positions = [];
            let attempts = 0;
            while (positions.length < count && attempts < 1000) {
                const x = Math.random() * (width - blockW - padding * 2) + blockW / 2 + padding;
                const y = Math.random() * (height - blockH - padding * 2) + blockH / 2 + padding;

                let placed = false;
                for (let i = 0; i <= positions.length; i++) {
                    if (i === positions.length) {
                        // No collision, place at (x, y)
                        positions.push({ x, y });
                        placed = true;
                        break;
                    }
                    const pos = positions[i];
                    if (
                        Math.abs(pos.x - x) < blockW + padding &&
                        Math.abs(pos.y - y) < blockH + padding
                    ) {
                        // Try to place side by side
                        const sideX = pos.x + blockW + padding;
                        if (sideX + blockW / 2 + padding < width) {
                            positions.push({ x: sideX, y: pos.y });
                            placed = true;
                            break;
                        }
                        // Try to place below
                        const belowY = pos.y + blockH + padding;
                        if (belowY + blockH / 2 + padding < height) {
                            positions.push({ x: pos.x, y: belowY });
                            placed = true;
                            break;
                        }
                        // If not enough space, try to nest inside (overlap)
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
        const blockW = 220, blockH = 220;
        const randomPositions = getNonCollidingPositions(5, screenW, screenH, blockW, blockH);

        projectsData = [
            new ProjectData({id: 'proj1', name: 'Solar System Simulation', subtitle: '2D p5.js Physics Simulation', year:2023, image: '/images/projects/solar-system.gif',link:"https://github.com/Alee053/SolarSystem-Sim", width: blockW, height: blockH, x: randomPositions[0].x, y: randomPositions[0].y }),
            new ProjectData({id: 'proj2', name: 'TicTacToe MiniMax', subtitle: 'MiniMax implementation for TicTacToe', year:2023, image: '/images/projects/tictactoe.gif',link:"https://github.com/Alee053/TicTacToe-MiniMax", width: blockW, height: blockH, x: randomPositions[1].x, y: randomPositions[1].y }),
            new ProjectData({id: 'proj3', name: 'Inverse Kinematics Visualization', subtitle: 'FABRIX implementation for IK in 2D', year:2023, image: '/images/projects/fabrik.gif',link:"https://github.com/Alee053/TicTacToe-MiniMax", width: blockW, height: blockH, x: randomPositions[2].x, y: randomPositions[2].y }),
            new ProjectData({id: 'proj4', name: 'Hanoi Towers Solver', subtitle: 'Hanoi Towers Solver and Visualization', year:2024, image: '/images/projects/hanoi.gif',link:"https://github.com/Alee053/HanoiTowers", width: blockW, height: blockH, x: randomPositions[3].x, y: randomPositions[3].y }),
            new ProjectData({id: 'proj5', name: 'Grid Maze Solver', subtitle: 'Visualizing BFS Algorithm', year:2024, image: '/images/projects/maze.gif',link:"https://github.com/Alee053/MazeSolver", width: blockW, height: blockH, x: randomPositions[4].x, y: randomPositions[4].y }),
        ];
        projectPositions = projectsData.map((proj) => ({ id: proj.id, x: proj.x, y: proj.y, angle: 0 }));

        // --- Physics Initialization ---
        physicsInstance = createPhysicsSimulation(physicsContainer, projectsData, handleProjectClick);

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
</script>

<section bind:this={physicsContainer} class="relative w-screen h-screen overflow-hidden z-0 bg-transparent">
    <BackButton/>
    {#each projectPositions as pos (pos.id)}
        {@const project = projectsData.find((p) => p.id === pos.id)}
        {#if project}
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
</section>