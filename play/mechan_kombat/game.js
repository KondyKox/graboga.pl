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

// --------------------------------------------------------------------------------------------------

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
    constructor(position) {
        this.position = position;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 100, 150);
    }
}

const player = new Sprite({
    x: 0,
    y: 0
})

player.draw();