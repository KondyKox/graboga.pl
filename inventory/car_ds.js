

function show(img) {
    let dc = document.getElementById('droppedCard1');
    let item = "<div id='res_show' class='item class_red_item' style='background-image:" + img.style.backgroundImage + "'></div>";
    document.getElementById('droppedCard1').innerHTML = "";
    dc.style.display = "";
    $(item).appendTo('#droppedCard1');

    let im = "<div id='exit' onclick='hide()'>x</div>";
    $(im).appendTo('#res_show');
}

function hide() {
    $('#droppedCard1').css({
        display: "none"
    });
}