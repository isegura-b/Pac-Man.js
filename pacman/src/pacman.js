
class Pacman {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTIONS.RIGHT;
        this.nextDirection = this.direction;    //input buffering
        //animation
        this.frame = 7;
        this.currentFrame = 1;
        setInterval(() => {
            this.changeAnimation();
        }, 100);
    }

    moveProcess() {
        this.changeDirection();
        this.moveForward();
        if (this.checkCollision()) {
            this.stopMoving();
        }
    }

    moveForward() {
        if (this.direction == DIRECTIONS.UP)
            this.y -= this.speed;
        else if (this.direction == DIRECTIONS.DOWN)
            this.y += this.speed;
        else if (this.direction == DIRECTIONS.LEFT)
            this.x -= this.speed;
        else if (this.direction == DIRECTIONS.RIGHT)
            this.x += this.speed;
    }

    stopMoving() {
        if (this.direction == DIRECTIONS.UP)
            this.y += this.speed;
        else if (this.direction == DIRECTIONS.DOWN)
            this.y -= this.speed;
        else if (this.direction == DIRECTIONS.LEFT)
            this.x += this.speed;
        else if (this.direction == DIRECTIONS.RIGHT)
            this.x -= this.speed;
    }


    eat() 
    {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == 2 && i == this.getMapY() && j == this.getMapX()) {
                    map[i][j] = 3;
                    score += 10;
                }
                else if (map[i][j] == 5 && i == this.getMapY() && j == this.getMapX()) {
                    map[i][j] = 3;
                    score += 50;
                }
            }
        }
    }

    checkCollision() {
        let collision = false;
        if (map[this.getMapY()][this.getMapX()] == 1 ||
            map[this.getMapYRightSide()][this.getMapX()] == 1 ||
            map[this.getMapY()][this.getMapXRightSide()] == 1 ||
            map[this.getMapYRightSide()][this.getMapXRightSide()] == 1) {
            collision = true;
        }
        return collision;
    }

    checkGhostCollision() { }

    changeDirection() {
        if (this.nextDirection == this.direction) 
            return;

        let tmp = this.direction;
        this.direction = this.nextDirection;
        this.moveForward();
        if (this.checkCollision())
        {
            this.stopMoving();
            this.direction = tmp;
        }else
            this.stopMoving();
    }

    changeAnimation() {
        if (this.currentFrame == this.frame) {
            this.currentFrame = 1;
        } else {
            this.currentFrame += 1;
        }
    }

    draw() {

        canvasContext.save();
        canvasContext.translate(this.x  + blockSize / 2, this.y + blockSize / 2);
        canvasContext.rotate((this.direction * 90 * Math.PI) / 180);
        canvasContext.translate(-this.x - blockSize / 2, -this.y - blockSize / 2);
        canvasContext.drawImage( pacmanFrames, (this.currentFrame - 1) * blockSize, 0, blockSize, blockSize, this.x, this.y, this.width, this.height);
        canvasContext.restore();
    }

    getMapX() {
        let mapX = parseInt(this.x / blockSize);
        return mapX;
    }

    getMapY() {
        let mapY = parseInt(this.y / blockSize);
        return mapY;
    }

    //were is the next border (correcting border collision detection)
    getMapXRightSide() {
        let mapX = parseInt((this.x * 0.99 + blockSize) / blockSize);
        return mapX;
    }

    getMapYRightSide() {
        let mapY = parseInt((this.y * 0.99 + blockSize) / blockSize);
        return mapY;
    }

}