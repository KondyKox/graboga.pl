// Generuje tło z samych kart lokacji
function background() {
    let backgroundCards = [];
    let background;

    for (let i = 0; i < tab.length; i++) {
        if (tab[i].rarity === "place")
            backgroundCards.push(tab[i].photo);
    }

    background = Math.round(Math.random() * backgroundCards.length);

    document.body.style.backgroundImage = 'url("../' + backgroundCards[background] + '")';
    //$('#menu').css('backgroundImage', '"../' + backgroundCards[background] + '"');
}

// ** --------------------------------------------------------------------------------------------------

// Pole walki
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

// Klasa do player i enemy
const gravity = 0.7;

class Sprite {
    constructor({ position, velocity, color, offset }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 120;
        this.height = 200;
        this.lastKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: offset,

            width: 100,
            height: 50,
        }
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
    }

    // Postacie
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // attack box
        if (this.isAttacking) {
            c.fillStyle = 'green';
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    // ** Update
    update() {
        this.draw();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y >= canvas.height)
            this.velocity.y = 0;

        else 
            this.velocity.y += gravity;
    }

    // Atakowanie
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}

//Obiekt player
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },

    velocity: {
        x: 0,
        y: 0
    },

    color: 'red',

    offset: {
        x: 0,
        y: 0
    },
});

player.draw();

//Obiekt enemy
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    
    velocity: {
        x: 0,
        y: 0
    },

    color: 'blue',

    offset: {
        x: -50,
        y: 0
    },
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

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x 
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.isAttacking
    );
}

function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId);
    document.querySelector("#displayText").style.display = "flex";
    // Remis
    if (player.health === enemy.health)
        document.querySelector("#displayText").innerHTML = "REMIS";
    // Player wygrywa
    else if (player.health > enemy.health)
        document.querySelector("#displayText").innerHTML = "PLAYER 1 WINS";
    // Enemy wygrywa
    else if (player.health < enemy.health)
        document.querySelector("#displayText").innerHTML = "PLAYER 2 WINS";
}

// Timer
let timer = 60;
let timerId;
function decreaseTimer() {
    // Liczenie czasu
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        document.querySelector("#timer").innerHTML = timer;
        timer--;
    }

    if (timer === 0)
        determineWinner({player, enemy, timerId});
}

decreaseTimer();

// Poruszanie się
function animate() {
    window.requestAnimationFrame(animate);

    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKey === "a")
        player.velocity.x = -5;
    else if (keys.d.pressed && player.lastKey === "d")
        player.velocity.x = 5;

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft")
        enemy.velocity.x = -5;
    else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight")
        enemy.velocity.x = 5;

    // * Wykrywanie kolizji
    // - enemy
    if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
        player.isAttacking) {
            player.isAttacking = false;
            enemy.health -= 20;
            document.querySelector("#enemy-hp").style.width = enemy.health + '%';
    }

    // - player
    if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
        enemy.isAttacking) {
            enemy.isAttacking = false;
            player.health -= 20;
            document.querySelector("#player-hp").style.width = player.health + '%';
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