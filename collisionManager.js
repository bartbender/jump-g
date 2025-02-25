class CollisionManager {
    constructor(player, obstacles, groundTiles, assets) {
        this.player = player;
        this.obstacles = obstacles;
        this.groundTiles = groundTiles;
        this.assets = assets;
        this.lives = 3;
        this.score = 0;
    }

    detectCollisions() {
        const playerBox = this.getBoundingBox(this.player);
        
        // Check collisions with obstacles
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacleBox = this.getBoundingBox(this.obstacles[i]);
            if (this.checkBoundingBoxCollision(playerBox, obstacleBox)) {
                this.handlePlayerCollision(i);
            } else if (this.obstacles[i].x + this.obstacles[i].width < this.player.x && !this.obstacles[i].scored) {
                this.handleObstaclePassed(i);
            }
        }

        // Check collisions with ground tiles
        for (let i = 0; i < this.groundTiles.length; i++) {
            const groundBox = this.getBoundingBox(this.groundTiles[i]);
            if (this.checkBoundingBoxCollision(playerBox, groundBox)) {
                this.handleGroundCollision();
            }
        }
    }

    handlePlayerCollision(index) {
        this.lives--;
        this.obstacles.splice(index, 1);
        this.assets.sounds.hitHurt.play();
        if (this.lives <= 0) {
            this.assets.sounds.explosion.play();
            alert('Game Over');
            this.resetGame();
        }
    }

    handleObstaclePassed(index) {
        this.score++;
        this.obstacles[index].scored = true;
    }

    handleGroundCollision() {
        // Handle collision with ground tiles if necessary
    }

    resetGame() {
        this.lives = 3;
        this.score = 0;
        this.player.reset();
        this.obstacles.length = 0;
    }

    getBoundingBox(object) {
        return {
            x: object.x,
            y: object.y,
            width: object.width,
            height: object.height
        };
    }

    checkBoundingBoxCollision(box1, box2) {
        return !(box1.x > box2.x + box2.width ||
                 box1.x + box1.width < box2.x ||
                 box1.y > box2.y + box2.height ||
                 box1.y + box1.height < box2.y);
    }
}
