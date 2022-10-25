

function show(img) {
let dc = document.getElementById('droppedCard');
    let item = "<div id='res_show' class='item class_red_item' style='background-image:" + img.style.backgroundImage + "'></div>";
    dc.innerHTML = "x";
    document.getElementById('droppedCard').style.removeProperty('display');
    $(item).appendTo('#droppedCard');

    let im = "<div id='exit' onclick='hide()'>x</div>";
    $(im).appendTo('#res_show');
}

function hide() {
    $('#droppedCard').css({
        display: "none"
    });
}