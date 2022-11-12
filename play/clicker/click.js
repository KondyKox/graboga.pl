function change() {
    let card = Math.round(Math.random() * tab.length + 1);

    // Sprawdzam czy może nie wylosowała się karta "zbanowana".
    while (card == 4) {
        card = Math.round(Math.random() * tab.length + 1);
    }

    removeHover();

    // Zmienia kartę.
    $('img').css({
        //backgroundImg: "url(" + tab.photo[card] + ")"
    });
}

// Usuwa :hover, żeby fajnie się zmieniało na kliknięcie
function removeHover() {
    $('#clicker').addClass('no-hover');

    setTimeout(restore, 200);
}

let restore = () => {
    $('#clicker').removeClass('no-hover');
}