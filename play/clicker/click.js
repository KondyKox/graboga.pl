$(document).ready(function () {
    $("#update").off().click(function () {
        //Odpala dwik
        let audio = new Audio("../../sfx/click.wav");
        audio.play();

        // Losuje kartę z array.js
        let card = Math.round(Math.random() * tab.length);

        // Sprawdzam czy może nie wylosowała si karta "zbanowana".
        while (card == 4 || card == 24) {
            card = Math.round(Math.random() * tab.length);
        }

        // Zmienia kartę.
        $('#click').attr("src", "../" + tab[card].photo);

        // Uruchamia funkcję php aktualizującą monety i w razie powodzenia zwiększa wyświetlaną liczbę monet o 1
        $.ajax({
            method: "POST",
            url: "update.php",
            success: function () {
                $("#monety").text(parseFloat($("#monety").text()) + 1);
            }
        });
    });
});

