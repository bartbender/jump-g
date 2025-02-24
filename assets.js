const assets = {
    images: {},
    sounds: {},
    loadImages(sources, callback) {
        let loadedImages = 0;
        let numImages = 0;
        for (let src in sources) {
            numImages++;
        }
        for (let src in sources) {
            assets.images[src] = new Image();
            assets.images[src].onload = function() {
                if (++loadedImages >= numImages) {
                    callback();
                }
            };
            assets.images[src].src = sources[src];
        }
    },
    loadSounds(sources, callback) {
        let loadedSounds = 0;
        let numSounds = 0;
        for (let src in sources) {
            numSounds++;
        }
        for (let src in sources) {
            assets.sounds[src] = new Audio();
            assets.sounds[src].onloadeddata = function() {
                if (++loadedSounds >= numSounds) {
                    callback();
                }
            };
            assets.sounds[src].src = sources[src];
        }
    }
};

// Uso de assets.loadImages y assets.loadSounds para cargar imágenes y sonidos
assets.loadImages({
    player: 'player.png',
    obstacle: 'assets.png'
}, function() {
    console.log('Todas las imágenes han sido cargadas');
});

assets.loadSounds({
    explosion: 'explosion.wav',
    explosion2: 'explosion2.wav',
    hitHurt: 'hitHurt.wav',
    laserShoot: 'laserShoot.wav',
    laserShoot2: 'laserShoot2.wav',
    powerUp: 'powerUp.wav'
}, function() {
    console.log('Todos los sonidos han sido cargados');
});
