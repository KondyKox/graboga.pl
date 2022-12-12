// Pole walki
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1512;
canvas.height = 850;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

// Robi tło
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: '../../img/idol_blogoslawi.png',
    scale: 0.8
});

//Obiekt player
const player = new Fighter({
    position: {
        x: 100,
        y: 0
    },

    velocity: {
        x: 0,
        y: 0
    },

    offset: {
        x: 0,
        y: 0
    },

    imageSrc: '../../img/cards/kartaMucha.png',
    scale: 0.3,
});

player.draw();

//Obiekt enemy
const enemy = new Fighter({
    position: {
        x: 1200,
        y: 100
    },
    
    velocity: {
        x: 0,
        y: 0
    },

    offset: {
        x: -50,
        y: 0
    },

    imageSrc: '../../img/cards/kartaMucha2.png',
    scale: 0.3,
});

enemy.draw();

// Klawisze do użytku
const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },

    w: {
        pressed: false
    },

    ArrowRight: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },

    ArrowUp: {
        pressed: false
    },
}

// Wywołuje funkcję odliczania czasu z utils.js
decreaseTimer();

// Poruszanie się
function animate() {
    window.requestAnimationFrame(animate);

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    background.update();

    c.fillStyle = 'rgba(255, 255, 255, 0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKey === "a")
        player.velocity.x = -10;
    else if (keys.d.pressed && player.lastKey === "d")
        player.velocity.x = 10;

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft")
        enemy.velocity.x = -10;
    else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight")
        enemy.velocity.x = 10;

    // * Wykrywanie kolizji
    // - enemy
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
        player.isAttacking) {
            player.isAttacking = false;
            if (enemy.health > 0)
                enemy.health -= 20;
            gsap.to('#enemy-hp', {
                width: enemy.health + '%'
            });
    }

    // - player
    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking) {
            enemy.isAttacking = false;
            if (player.health > 0)
                player.health -= 20;
            gsap.to('#player-hp', {
                width: player.health + '%'
            });
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0)
        determineWinner({player, enemy, timerId});
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        // player keys
        case 'd':
            keys.d.pressed = true;
            player.lastKey = "d";
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = "a";
            break;
        case 'w':
            player.velocity.y = -20;
            break;
        case ' ':
            player.attack();
            break;

        // enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = "ArrowRight";
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = "ArrowLeft";
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
        case 'ArrowDown':
            enemy.isAttacking = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // player keys
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }

    // enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});