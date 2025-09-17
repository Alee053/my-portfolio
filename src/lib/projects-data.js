export class ProjectData{
    constructor({id, name, subtitle,year, image, link, width, height, x, y,tags}){
        this.id = id;
        this.name = name;
        this.subtitle = subtitle;
        this.year = year;
        this.image = image;
        this.link = link;
        this.tags = tags;
        
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
}

export const projectsData = [
    new ProjectData({id: 'proj1', name: 'Solar System Simulation', subtitle: '2D p5.js Physics Simulation', year:2023, image: '/images/projects/solar-system.gif', link:"https://github.com/Alee053/SolarSystem-Sim", tags: ['p5.js', 'Physics'] }),
    new ProjectData({id: 'proj2', name: 'TicTacToe MiniMax', subtitle: 'AI Opponent with MiniMax', year:2023, image: '/images/projects/tictactoe.gif', link:"https://github.com/Alee053/TicTacToe-MiniMax", tags: ['AI', 'JavaScript'] }),
    new ProjectData({id: 'proj3', name: 'Inverse Kinematics', subtitle: 'FABRIK Algorithm Visualization', year:2023, image: '/images/projects/fabrik.gif', link:"https://github.com/Alee053/InverseKinematics-FABRIK", tags: ['Algorithms', 'p5.js'] }),
    new ProjectData({id: 'proj4', name: 'Hanoi Towers Solver', subtitle: 'Recursive Solver Visualization', year:2024, image: '/images/projects/hanoi.gif', link:"https://github.com/Alee053/HanoiTowers", tags: ['Algorithms', 'Svelte'] }),
    new ProjectData({id: 'proj5', name: 'Grid Maze Solver', subtitle: 'Visualizing BFS Algorithm', year:2024, image: '/images/projects/maze.gif', link:"https://github.com/Alee053/MazeSolver", tags: ['Algorithms', 'JavaScript'] }),
];