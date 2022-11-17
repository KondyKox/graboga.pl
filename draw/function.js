let foo = [];
let foo2 = [];

for (let i = 0; i < tab.length; i++) {
   foo2.push(tab[i].chances);
   foo.push(i);
}

let arrayShuffle = (array) => {
    for ( var i = 0, length = array.length, swap = 0, temp = ''; i < length; i++ ) {
       swap        = Math.floor(Math.random() * (i + 1));
       temp        = array[swap];
       array[swap] = array[i];
       array[i]    = temp;
    }
    return array;
};

let percentageChance = (values, chances) => {
    for (var pc1 = 0, pool = []; pc1 < chances.length; pc1++ ) {
        for (let pc2 = 0; pc2 < chances[pc1]; pc2++ ) {
            pool.push(pc1);
        }
    }
    return values[arrayShuffle(pool)['0']];
};

function GetIndex() {
    return percentageChance(foo,foo2);
}

function Generate() {
	let spin = new Audio("../sfx/spinSound.wav");
	spin.play();

    document.getElementById('Generate').removeAttribute("onclick");
    $('.raffle-roller-container').css({
		transition: "sdf",
		"margin-left": "0px"
	}, 10).html('');
	
    let randed2 = GetIndex();

    for(let i = 0; i < 101; i++) {
		let element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+tab[GetIndex()].photo+');" Loading="lazy"></div>';
		$(element).appendTo('.raffle-roller-container');
	}

    setTimeout(function() {
		goRoll(tab[randed2].name, tab[randed2].photo, tab[randed2].rarity, tab[randed2].id);
	}, 500);
}

var comm = new Audio('../sfx/common.wav');
var rare = new Audio('../sfx/rare.wav');
var epic = new Audio('../sfx/epic.wav');
var curs = new Audio('../sfx/cursed.wav');
var leg = new Audio('../sfx/legendary.wav');
var spec = new Audio('../sfx/special.wav');

function goRoll(rname, rphoto, rrarity, rid) {
	$('.raffle-roller-container').css({
		transition: "all 8s cubic-bezier(.08,.6,0,1)"
	});
	$('#CardNumber78').css({
		"background-image": "url("+rphoto+")"
	});

	setTimeout(function() {
		$('#CardNumber78').addClass('winning-item');
		$('#rolled').html(rname);

		var win_element = "<div class='item class_red_item' style='background-image: url("+rphoto+")'></div>";
        $.ajax({
			method: "POST",
			url: "functions.php",
			data: { 
				drop_id: rid
			}
		});
		$(win_element).appendTo('#inventory');
		

		// Gra dźwięki
		if (rrarity == "common")
			comm.play();
		else if (rrarity == "rare")
			rare.play();
		else if (rrarity == "epic")
			epic.play();
		else if (rrarity == "legendary")
			leg.play();
		else if (rrarity == "cursed")
			curs.play();
		else if (rrarity == "special")
			spec.play();

		showCard(win_element); 

	}, 8500);

	$('.raffle-roller-container').css('margin-left', '-6670px');
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function showCard(card) {
	document.getElementById('result_container').innerHTML = "";
	document.getElementById('result_container').style.removeProperty('display');
	$(card).css({
		width: '80%',
		height: '95%',
		margin: '2%'
	}).appendTo('#result_container');

	setTimeout(timeo,3000);
}
let timeo = () => {
	document.getElementById('Generate').setAttribute("onclick", "Generate()");
	$('#result_container').css({display: "none"});
}