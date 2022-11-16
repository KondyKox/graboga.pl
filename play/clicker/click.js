function click() {
    //Odpala dźwięk
    let audio = new Audio("../../sfx/click.wav");
    audio.play();

    // Losuje kartę z array.js
    let card = Math.round(Math.random() * tab.length + 1);

    // Sprawdzam czy może nie wylosowała się karta "zbanowana".
    while (card == 4 || card == 24) {
        card = Math.round(Math.random() * tab.length + 1);
    }

    // Zmienia kartę.
    $('#click').attr("src", "../" + tab[card].photo);
}