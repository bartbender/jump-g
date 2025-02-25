# Jump-G

Jump-G es un pequeño juego desarrollado en JavaScript utilizando un canvas HTML5. El objetivo del juego es que el personaje salte sobre los obstáculos que aparecen a su paso. El juego incluye animaciones, gestión de colisiones, y efectos de sonido.

## Descripción del Juego

En Jump-G, el jugador controla un personaje que debe saltar sobre obstáculos para evitar colisiones. El personaje se mueve automáticamente hacia la derecha y el jugador debe presionar la tecla de espacio o tocar la pantalla para hacer que el personaje salte. Cada obstáculo evitado incrementa la puntuación del jugador. Si el personaje colisiona con un obstáculo, pierde una vida. El juego termina cuando el jugador pierde todas sus vidas.

## Características

- Animaciones de personaje y obstáculos.
- Gestión de colisiones.
- Efectos de sonido para saltos, colisiones y game over.
- Generación aleatoria de obstáculos con diferentes sprites.
- Puntuación y gestión de vidas.

## Propósito

El propósito de este juego es servir como un pequeño curso de programación con IA para chicos de colegio e instituto. A través del desarrollo de este juego, los estudiantes pueden aprender conceptos básicos de programación, manejo de eventos, animaciones, y gestión de colisiones.

## Gestión de colisiones

La gestión de colisiones en Jump-G se realiza mediante la clase `CollisionManager`. Esta clase se encarga de detectar colisiones entre el jugador y los obstáculos, así como de manejar las consecuencias de dichas colisiones.

### Métodos principales

- `detectCollisions()`: Detecta colisiones entre el jugador y los obstáculos.
- `handlePlayerCollision(index)`: Maneja la colisión del jugador con un obstáculo.
- `handleObstaclePassed(index)`: Maneja el caso en que el jugador pasa un obstáculo sin colisionar.
- `resetGame()`: Reinicia el juego, restableciendo las vidas y la puntuación.
- `initialize()`: Inicializa el estado del jugador y los obstáculos.

### Ejemplo de uso

```javascript
const collisionManager = new CollisionManager(player, obstacles, assets);
collisionManager.detectCollisions();
```

## Licencia

Este proyecto está licenciado bajo la Licencia Pública General de GNU, versión 3. Puedes encontrar el texto completo de la licencia en los archivos [LICENSE](./LICENSE) (en inglés) y [LICENSE_ES](./LICENSE_ES) (en español).

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu_usuario/jump-g.git
    ```

2. Abre el archivo `index.html` en tu navegador web.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Contacto

Para cualquier pregunta o sugerencia, por favor contacta a [tu_email@example.com](mailto:tu_email@example.com).
