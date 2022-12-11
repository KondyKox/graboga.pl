// Nie pamiętam po co ale musi być
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x 
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.isAttacking
    );
}

// Określa zwycięzce
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
let timer = 61; // Tyle ile chcesz czasu + 1, żeby dobrze pokazywało
let timerId;
function decreaseTimer() {
    // Liczenie czasu
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        document.querySelector("#timer").innerHTML = --timer;
    }

    if (timer === 0)
        determineWinner({player, enemy, timerId});
}