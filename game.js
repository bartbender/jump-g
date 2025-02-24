window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Game assets
    let playerImage = new Image();
    playerImage.src = 'player.png';
    let obstacleImage = new Image();
    obstacleImage.src = 'assets.png';
    let groundImage = new Image();
    groundImage.src = 'assets.png';

    // Game variables
    let player;
    let obstacles = [];
    let groundTiles = [];
    let gameFrame = 0;
    const FRAME_RATE = 60;
    let score = 0;
    let lives = 3;
    let powerUpActive = false;
    let powerUpTimer = 0;
    let obstacleSpawnRate = 100; // Tasa de generación de obstáculos
    const obstacleMinDistance = 64; // Mínima distancia entre obstáculos

    const groundHeight = 50;
    const playerMargin = canvas.width * 0.15;

    // Input handler
    const keys = [];
    window.addEventListener('keydown', function(e){
        keys[e.code] = true;
    });
    window.addEventListener('keyup', function(e){
        keys[e.code] = false;
    });

    // Touch event listeners
    canvas.addEventListener('touchstart', function(e) {
        player.jump();
        assets.sounds.laserShoot.play(); // Reproducir sonido al saltar
    });

    // Game functions
    function init() {
        player = new Player(playerMargin, canvas.height - groundHeight - 50 - 64, playerImage, canvas); // Ajustar la posición inicial del jugador
        obstacles = [];
        groundTiles = [];
        score = 0;
        lives = 3;
        gameFrame = 0;

        // Crear tiles de suelo
        for (let i = 0; i < canvas.width / 64; i++) {
            groundTiles.push(new Ground(i * 64, canvas.height - groundHeight - 64, '3,1', groundImage));
        }
    }

    function handleInput() {
        if (keys['Space'] && player.y >= canvas.height - groundHeight - player.height - 64) {
            player.jump();
            assets.sounds.laserShoot.play(); // Reproducir sonido al saltar
        }
    }

    function handleCollisions() {
        for (let i = 0; i < obstacles.length; i++) {
            if (player.collidesWith(obstacles[i])) {
                lives--;
                obstacles.splice(i, 1);
                assets.sounds.hitHurt.play(); // Reproducir sonido al colisionar
                if (lives <= 0) {
                    assets.sounds.explosion.play(); // Reproducir sonido al morir
                    alert('Game Over');
                    init();
                }
            } else if (obstacles[i].x + obstacles[i].width < player.x && !obstacles[i].scored) {
                score++;
                obstacles[i].scored = true;
            }
        }
    }

    function handleTriggers() {
        // Implementar lógica de triggers si es necesario
    }

    function handleAnimations() {
        player.updateAnimation();
        obstacles.forEach(obstacle => obstacle.updateAnimation());
    }

    function updateItems() {
        player.update();
        obstacles.forEach(obstacle => obstacle.update());

        // Generar obstáculos de forma aleatoria
        if (gameFrame % obstacleSpawnRate === 0) {
            const lastObstacle = obstacles[obstacles.length - 1];
            if (!lastObstacle || (canvas.width - lastObstacle.x) > obstacleMinDistance) {
                const obstacleTypes = ['5,1', '6,1', '7,1', '8,1', '9,1'];
                const randomType = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
                obstacles.push(new Obstacle(canvas.width, canvas.height - groundHeight - 64, randomType, obstacleImage));
                obstacleSpawnRate = Math.floor(Math.random() * 100) + 50; // Espaciar de forma aleatoria
            }
        }

        obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
        if (powerUpActive) {
            powerUpTimer--;
            if (powerUpTimer <= 0) {
                powerUpActive = false;
            }
        }
    }

    function handleAudio() {
        // Implementar lógica de audio si es necesario
    }

    function render() {
        // Fondo negro
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar el suelo
        groundTiles.forEach(tile => tile.draw(ctx));

        // Dibujar el borde del canvas
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Dibujar el jugador y los obstáculos
        player.draw(ctx);
        obstacles.forEach(obstacle => obstacle.draw(ctx));

        // Dibujar la puntuación y las vidas
        ctx.fillStyle = 'white';
        ctx.fillText(`Score: ${score}`, 10, 20);
        ctx.fillText(`Lives: ${lives}`, 10, 40);
    }

    function gameLoop() {
        handleInput();
        handleCollisions();
        handleTriggers();
        handleAnimations();
        updateItems();
        handleAudio();
        render();
        gameFrame++;
        requestAnimationFrame(gameLoop);
    }

    assets.loadImages({
        player: 'player.png',
        obstacle: 'assets.png',
        ground: 'assets.png'
    }, function() {
        assets.loadSounds({
            explosion: 'explosion.wav',
            explosion2: 'explosion2.wav',
            hitHurt: 'hitHurt.wav',
            laserShoot: 'laserShoot.wav',
            laserShoot2: 'laserShoot2.wav',
            powerUp: 'powerUp.wav'
        }, function() {
            init();
            gameLoop();
        });
    });
}
