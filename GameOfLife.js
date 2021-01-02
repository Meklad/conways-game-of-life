console.log("Owllog || Welcome To Conway\'s Game Of Life");
console.log("Owllog || Script Started at: " + Date(Date.now()).toString());

// Configurations:
const canavas = document.querySelector('canvas');
const ctx = canavas.getContext('2d');
const resolution = 9;
canavas.width = 963;
canavas.height = 963;
const COLS = canavas.width / resolution;
const ROWS = canavas.height / resolution;

// initialize Grid of the map;
function buildWorldMap() {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}

// Rander The Grid
function randerCells(gridMap) {
    for (let col = 0; col < gridMap.length; col++) {
        for (let row = 0; row < gridMap[col].length; row++) {
            // Assign cell
            const cell = gridMap[col][row];
            // Start to draw on the canavac
            ctx.beginPath();
            // Draw Rectangle
            // Args:
            // X position: col * resolution
            // Y position: row * resolution
            // Width of rectangle: resolution
            // Height of rectangle: resolution
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? "black" : "white";
            ctx.fill();
            ctx.stroke();
        }
        
    }
}

// Calculate Next Generation:
function calculateNextGeneration(grid) {
    const nextGeneration = grid.map(arr => [...arr]);

    for (let col = 0; col < gridMap.length; col++) {
        for (let row = 0; row < gridMap[col].length; row++) {
            // Find Cell
            const cell = gridMap[col][row];

            let countOfNeighbours = 0;

            // Find neighbour
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if(i === 0 && j === 0) {
                        continue;
                    }
                    const x_cell = col + i;
                    const y_cell = row + j;

                    if(x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                        const currentNeighbour = gridMap[col + i][row + j];
                        countOfNeighbours += currentNeighbour;
                    }
                }        
            }

            // Apply the rules of the game of life
            // Rule #1: Any live cell with fewer than two live neighbours dies, as if by underpopulation.
            // Rule #2: Any live cell with two or three live neighbours lives on to the next generation.
            // Rule #3: Any live cell with more than three live neighbours dies, as if by overpopulation.
            // Rule #4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
            if(cell === 1 && countOfNeighbours < 2) {
                nextGeneration[col][row] = 0;
            } else if(cell === 1 && countOfNeighbours > 3) {
                nextGeneration[col][row] = 0;
            } else if(cell === 0 && countOfNeighbours === 3 ) {
                nextGeneration[col][row] = 1;
            }
        }
        
    }
    return nextGeneration;
}

// Update grid map and check game rules.
function updateGridMap() {
    gridMap = calculateNextGeneration(gridMap);
    randerCells(gridMap);
    requestAnimationFrame(updateGridMap);
}

// Boot the game...
let gridMap = buildWorldMap();
requestAnimationFrame(updateGridMap);
