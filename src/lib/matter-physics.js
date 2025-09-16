// src/lib/matter-physics.js
import Matter from 'matter-js';

export function createPhysicsSimulation(container, bodiesData, onProjectClick) {
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Events } = Matter;

    const engine = Engine.create();
    const runner = Runner.create();
    let staticBodies = [];

    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: container.clientWidth,
            height: container.clientHeight,
            wireframes: false, // Set to true to debug physics bodies
            background: 'transparent'
        }
    });

    const matterBodies = bodiesData.map((proj) => {
        const body = Bodies.rectangle(proj.x, proj.y, proj.width, proj.height, {
            restitution: 0.7,
            friction: 0.05,
            density: 0.001,
            render: { visible: false } // Bodies are invisible
        });
        body.projectData = proj;
        return body;
    });

    // --- Mouse and Click/Drag Logic ---
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });

    let startDragPos = null;
    Events.on(mouseConstraint, 'mousedown', (event) => {
        startDragPos = { ...event.mouse.position };
    });

    Events.on(mouseConstraint, 'mouseup', (event) => {
        if (!startDragPos) return;
        const moveDistance = Matter.Vector.magnitude(
            Matter.Vector.sub(event.mouse.position, startDragPos)
        );

        if (moveDistance < 5) { // It's a click
            const clickedBody = Matter.Query.point(matterBodies, event.mouse.position)[0];
            if (clickedBody) {
                onProjectClick(clickedBody.projectData);
            }
        }
        startDragPos = null;
    });

    // Function to build responsive walls
    function buildWalls() {
        const { clientWidth, clientHeight } = container;
        World.remove(engine.world, staticBodies); // Remove old walls

        staticBodies = [
            Bodies.rectangle(clientWidth / 2, clientHeight + 25, clientWidth, 50, { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(-25, clientHeight / 2, 50, clientHeight + 100, { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(clientWidth + 25, clientHeight / 2, 50, clientHeight + 100, { isStatic: true, render: { visible: false } }),
            Bodies.rectangle(clientWidth / 2, -25, clientWidth, 50, { isStatic: true, render: { visible: false } })
        ];
        World.add(engine.world, staticBodies);
    }

    // Initial setup
    buildWalls();
    World.add(engine.world, [...matterBodies, mouseConstraint]);
    Runner.run(runner, engine);
    Render.run(render);

    // Return everything needed for the Svelte component to interact with
    return {
        engine,
        render,
        runner,
        matterBodies,
        mouse,
        destroy: () => {
            Render.stop(render);
            Runner.stop(runner);
            World.clear(engine.world);
            Engine.clear(engine);
            if (render.canvas && render.canvas.parentNode) {
                render.canvas.parentNode.removeChild(render.canvas);
            }
        },
        handleResize: () => {
            render.options.width = container.clientWidth;
            render.options.height = container.clientHeight;
            render.canvas.width = container.clientWidth;
            render.canvas.height = container.clientHeight;
            buildWalls();
        }
    };
}