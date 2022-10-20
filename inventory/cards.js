let dc = document.getElementById('result');

function show(img) {
    let item = "<div id='res_show' class='item class_red_item' style='background-image:" + img.style.backgroundImage + "'></div>";
    dc.innerHTML = ".";
    document.getElementById('result').style.removeProperty('display');
    $(item).appendTo('#result');

    let im = "<div id='exit' onclick='hide()'>x</div>";
    $(im).appendTo('#res_show');
}

function hide() {
    $('#result').css({
        display: "none"
    });
}