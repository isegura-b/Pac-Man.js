const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

const pacmanFrames = document.getElementById("animation");
const ghostFrames = document.getElementById("ghost");

let blockSize = 20;
let wallColor = "#342DCA";
let wallSpace = blockSize / 1.5;
let wallSpaceWidth = blockSize / 1.4;
let wallOffset = (blockSize - wallSpaceWidth) / 2;
let wallInnerColor = "#000000";

function createRectangle(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

let pacman;
let score = 0;

const DIRECTIONS = {
    "UP": 3,
    "DOWN": 1,
    "LEFT": 2,
    "RIGHT": 0
};

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 5, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 5, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 5, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];


/*(every function can be written as an arrow function)
const gameloop = () => {
    update();
    draw();
}
*/

function gameloop() {
    update();
    draw();
}

function update() {
    pacman.moveProcess();
    pacman.eat();
}

function drawfood() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == 2) {
                createRectangle(
                    j * blockSize + blockSize / 3,
                    i * blockSize + blockSize / 3,
                    blockSize / 3,
                    blockSize / 3,
                    "#FFFF00"
                );
            }
            else if (map[i][j] == 5) {
                createRectangle(
                    j * blockSize + blockSize / 3,
                    i * blockSize + blockSize / 3,
                    blockSize / 2,
                    blockSize / 2,
                    "#ff7300ff")
            }
        }
    }
}

let drawScore = () => {
    canvasContext.font = "50px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Score: " + score, blockSize * (map.length/4), blockSize * (map.length + 1) + 30);
}

function draw() {
    createRectangle(0, 0, canvas.width, canvas.height, "#000000");
    drawWalls();
    drawfood();
    pacman.draw();
    drawScore();
}

let gameInterval = setInterval(gameloop, 1000 / 30);

function drawWalls() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] == 1) {
                createRectangle(
                    j * blockSize,
                    i * blockSize,
                    blockSize,
                    blockSize,
                    wallColor);
            }
            if (j > 0 && map[i][j - 1] == 1) {
                createRectangle(
                    j * blockSize,
                    i * blockSize + wallOffset,
                    wallSpaceWidth + wallOffset,
                    wallSpaceWidth,
                    wallInnerColor);
            }

            if (j < map[0].length - 1 && map[i][j + 1] == 1) {
                createRectangle(
                    j * blockSize + wallOffset,
                    i * blockSize + wallOffset,
                    wallSpaceWidth + wallOffset,
                    wallSpaceWidth,
                    wallInnerColor);
            }

            if (i < map.length - 1 && map[i + 1][j] == 1) {
                createRectangle(
                    j * blockSize + wallOffset,
                    i * blockSize + wallOffset,
                    wallSpaceWidth,
                    wallSpaceWidth + wallOffset,
                    wallInnerColor);
            }

            if (i > 0 && map[i - 1][j] == 1) {
                createRectangle(
                    j * blockSize + wallOffset,
                    i * blockSize,
                    wallSpaceWidth,
                    wallSpaceWidth + wallOffset,
                    wallInnerColor);
            }
        }
    }
}

function createPacman() {
    pacman = new Pacman(
        blockSize,
        blockSize,
        blockSize,
        blockSize,
        blockSize / 5);
}


createPacman();
gameloop();

window.addEventListener("keydown", (event) => {
    let key = event.keyCode;

    setTimeout(() => {      //input buffering
        if (key == 38) {
            pacman.nextDirection = DIRECTIONS.UP;
        } else if (key == 40) {
            pacman.nextDirection = DIRECTIONS.DOWN;
        } else if (key == 37) {
            pacman.nextDirection = DIRECTIONS.LEFT;
        } else if (key == 39) {
            pacman.nextDirection = DIRECTIONS.RIGHT;
        }
    }, 100);
});