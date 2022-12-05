// Pokazuje kartę na ekranie po kliknięciu
function show(img) {
    let dc = document.getElementById('cards');
    let item = "<div id='res_show' class='item class_red_item' style='background-image:" + img.style.backgroundImage + ";'></div>";
    document.getElementById('cards').innerHTML = "";
    dc.style.display = "";
    $(item).appendTo('#cards');

    let exit = "<div id='exit' onclick='hide()'>X</div>";
    $(exit).appendTo('#res_show');
    //$('#res_show').append("<input type='submit' class='button buttonInv lead' value='Sprzedaj' onclick='sell(this)'>");
}

// Chowa kartę
function hide() {
    $('#cards').css({
        display: "none"
    });
}

// Sprzedaje kartę / Usuwa z ekwipunku
function sell(card) {
    let cardValue = tab[this].value;
    let cardName = tab[this].name;

    if (confirm("Czy sprzedać" + card + " za <b>" + cardValue + " monet</b>?")) {
        $.ajax({
            method: "POST",
            url: "cards.php",
            data: {
                drop_id: cardName,
            }
        });

        alert("Sprzedano " + card + " za <b>" + cardValue + " monet</b>!");
    }
}