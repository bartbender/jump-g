class Ground {
    constructor(x, y, type, image) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.image = image;
        this.width = 64; // Ancho de cada tile (774px / 9 columnas)
        this.height = 64; // Alto de cada tile (332px / 4 filas)
        this.tileMap = {
            '1,1': { sx: 0, sy: 0 },
            '2,1': { sx: 84, sy: 0 },
            '3,1': { sx: 168, sy: 0 },
            '4,1': { sx: 252, sy: 0 },
            '5,1': { sx: 336, sy: 0 },
            '1,2': { sx: 0, sy: 84 },
            '2,2': { sx: 84, sy: 84 },
            '3,2': { sx: 168, sy: 84 },
            '4,2': { sx: 252, sy: 84 },
            '5,2': { sx: 336, sy: 84 },
            '1,3': { sx: 0, sy: 168 },
            '2,3': { sx: 84, sy: 168 },
            '3,3': { sx: 168, sy: 168 },
            '4,3': { sx: 252, sy: 168 },
            '5,3': { sx: 336, sy: 168 },
            '1,4': { sx: 0, sy: 252 },
            '2,4': { sx: 84, sy: 252 },
            '3,4': { sx: 168, sy: 252 },
            '4,4': { sx: 252, sy: 252 },
            '5,4': { sx: 336, sy: 252 }
        };
    }

    draw(ctx) {
        const { sx, sy } = this.tileMap[this.type];
        ctx.drawImage(this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}
