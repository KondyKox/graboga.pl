function change() {
    let card = Math.round(Math.random() * tab.length + 1);

    // Sprawdzam czy może nie wylosowała się karta "zbanowana".
    while (card == 4) {
        card = Math.round(Math.random() * tab.length + 1);
    }

    // Zmienia kartę.
    $('#clicker').css({
        backgroundImg: "url(tab.photo[card])"
    });
}