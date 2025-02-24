class Obstacle {
    constructor(x, y, type, image) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.image = image;
        this.width = 64; // Ancho de cada tile (774px / 9 columnas)
        this.height = 64; // Alto de cada tile (332px / 4 filas)
        this.speedX = -5;
        this.scored = false;
        this.tileMap = {
            '5,1': { sx: 420, sy: 0 },
            '6,1': { sx: 504, sy: 0 },
            '7,1': { sx: 588, sy: 0 },
            '8,1': { sx: 672, sy: 0 },
            '9,1': { sx: 756, sy: 0 },
            '6,2': { sx: 504, sy: 84 },
            '7,2': { sx: 588, sy: 84 },
            '8,2': { sx: 672, sy: 84 },
            '9,2': { sx: 756, sy: 84 },
            '6,3': { sx: 504, sy: 168 },
            '7,3': { sx: 588, sy: 168 },
            '8,3': { sx: 672, sy: 168 },
            '9,3': { sx: 756, sy: 168 },
            '5,4': { sx: 420, sy: 252 },
            '6,4': { sx: 504, sy: 252 },
            '7,4': { sx: 588, sy: 252 },
            '8,4': { sx: 672, sy: 252 },
            '9,4': { sx: 756, sy: 252 }
        };
    }

    update() {
        this.x += this.speedX;
    }

    updateAnimation() {
        // Implementar lógica de animación si es necesario
    }

    draw(ctx) {
        const { sx, sy } = this.tileMap[this.type];
        ctx.drawImage(this.image, sx, sy, this.width, this.height, this.x, this.y - 64, this.width, this.height); // Ajustar la posición para estar justo encima del suelo
    }
}
