class Player {
    constructor(x, y, image, canvas) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.width = 16; // Ancho de cada sprite (128px / 8 columnas)
        this.height = 16; // Alto de cada sprite (112px / 7 filas)
        this.frameX = 1; // Columna inicial (2,2) -> índice 1
        this.frameY = 1; // Fila inicial (2,2) -> índice 1
        this.speedY = 0;
        this.gravity = 0.5;
        this.onGround = true;
        this.animationFrame = 0;
        this.canvas = canvas;
    }

    jump() {
        if (this.onGround) {
            this.speedY = -10;
            this.onGround = false;
            this.frameX = 5; // Columna de salto (2,6) -> índice 5
        }
    }

    update() {
        this.y += this.speedY;
        this.speedY += this.gravity;
        if (this.y > this.canvas.height - 50 - this.height - 64) { // Ajustar la posición para estar justo encima del suelo
            this.y = this.canvas.height - 50 - this.height - 64;
            this.speedY = 0;
            this.onGround = true;
            this.frameX = 1; // Volver a la columna inicial de reposo (2,2) -> índice 1
        }
    }

    updateAnimation() {
        if (this.onGround) {
            this.animationFrame++;
            if (this.animationFrame >= 20) { // Cambiar cada 20 frames
                this.frameX = this.frameX === 1 ? 2 : 1; // Alternar entre (2,2) y (2,3)
                this.animationFrame = 0;
            }
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    collidesWith(obstacle) {
        return !(this.x > obstacle.x + obstacle.width ||
                 this.x + this.width < obstacle.x ||
                 this.y > obstacle.y + obstacle.height ||
                 this.y + this.height < obstacle.y);
    }

    reset() {
        this.x = this.canvas.width * 0.15;
        this.y = this.canvas.height - 50 - this.height - 64;
        this.speedY = 0;
        this.onGround = true;
        this.frameX = 1;
        this.frameY = 1;
    }
}
