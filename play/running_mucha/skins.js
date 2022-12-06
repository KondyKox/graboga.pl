function main(skin, id, skinValue, isfalse, color){
    if(isfalse == false){
        $('#select').css({
            display: 'none'
        });
        $('#buy').css({
            display: 'flex'
        });
        document.getElementById('buy').setAttribute('onclick', 'buy("' + skin + '",' + skinValue + ', "'+id+'")');
    }
    else {
        $('#buy').css({
            display: 'none'
        });
        $('#select').css({
            display: 'flex'
        });
        document.getElementById('select').setAttribute('onclick', 'select("' + color + '")');
    }
}

// Kupuje skina
function buy(skin, skinValue, id) {
    if (confirm("Czy kupić skina '" + skin + "' za " + skinValue + " Boskich Dukatów?")) {
        $.ajax({
            method: 'POST',
            url: 'buy.php',
            data: {
                skin_id: id,
                value: skinValue
            },
            success: function () {
                location.reload();
            }
        });
    }

    $('#buy').css({
        display: 'none'
    });
}

//dodaje nazwe skina jako zmienną do sesji
function select(skin) {
    sessionStorage.setItem("skin", skin);
}



let activeSkin = 'white';
let skinId;

// Główna funkcja
function main2(skin) {
    let isOwned = false;
    let skinValue;

    // Znajduje id skina w tablicy
    for (let i = 0; i < skins.length; i++) {
        if (skins[i].name === skin)
            skinId = skins[i].id;
    }

    // Sprawdza czy posiadamy skina (Trzeba to zrobić na wczytaniu strony bo tak nie zadziała)
    $.ajax({
        methods: 'POST',
        url: 'isOwned.php',
        data: {
            skin_id: skinId
        },
        success: isOwned = true
    }); 

    // Szuka w tablicy skina i daje mu wartość
    for (let i = 0; i < skins.length; i++) {
        if (skins[i].name === skin)
            skinValue = skins[i].value;
    }

    if (skinValue == 0) isOwned = true;
    
    // Jeśli posiadamy skina to robi to,
    if (!isOwned) {
        $('#select').css({
            display: 'none'
        });
        $('#buy').css({
            display: 'flex'
        });
        document.getElementById('buy').setAttribute('onclick', 'buy("' + skin + '",' + skinValue + ')');
    }

    // a jak nie to robi to.
    else {
        for (let i = 0; i < skins.length; i++) {
            if (skins[i].name === skin)
                document.getElementById('s' + skins[i].id).innerHTML = "POSIADANE";
        }

        $('#buy').css({
            display: 'none'
        });
        $('#select').css({
            display: 'flex'
        });
        document.getElementById('select').setAttribute('onclick', 'select("' + skin + '")');
    }
}

// Kupuje skina
function buy2(skin, skinValue) {
    if (confirm("Czy kupić skina '" + skin + "' za " + skinValue + " Boskich Dukatów?")) {
        $.ajax({
            method: 'POST',
            url: 'buy.php',
            data: {
                skin_id: skinId,
                value: skinValue
            },
            success: function () {
                for (let i = 0; i < skins.length; i++) {
                    if (skins[i].name === skin)
                        document.getElementById('s' + skins[i].id).innerHTML = "POSIADANE";
                }
            }
        });
    }

    $('#buy').css({
        display: 'none'
    });
}


//Wybiera skina
function select(skin) {
    sessionStorage.setItem("skin", skin);
}

// Tablica ze skinami i ich cenami

let skins = [
    {   name: 'Biały Mucha',        value: 0,           id: 1,  photo: "assets/white/"   },
    {   name: 'Czerwony Mucha',     value: 5000,        id: 2,  photo: "assets/red/"     },
    {   name: 'Niebieski Mucha',    value: 10000,       id: 3,  photo: "assets/blue/"    },
    {   name: 'Zielony Mucha',      value: 15000,       id: 4,  photo: "assets/green/"   },
    {   name: 'Różowy Mucha',       value: 20000,       id: 5,  photo: "assets/pink/"    },
    {   name: 'Fioletowy Mucha',    value: 25000,       id: 6,  photo: "assets/purple/"  },
    {   name: 'Żółty Mucha',        value: 30000,       id: 7,  photo: "assets/yellow/"  },
];