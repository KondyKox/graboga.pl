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
    document.getElementById('Generate').removeAttribute("onclick");
    $('.raffle-roller-container').css({
		transition: "sdf",
		"margin-left": "0px"
	}, 10).html('');
    let randed2 = GetIndex();
    for(let i = 0;i < 101; i++) {
		let element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+tab[GetIndex()].photo+');"></div>';
		let randed = randomInt(1,1000);
		if(randed < 50) {
			element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+tab[GetIndex()].photo+');"></div>';
		} else if(500 < randed) {
			element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+tab[GetIndex()].photo+');"></div>';
		}
		$(element).appendTo('.raffle-roller-container');
	}
    setTimeout(function() {
		goRoll(tab[randed2].name, tab[randed2].photo);
	}, 500);
}
function goRoll(rname, rphoto) {
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
		$(win_element).appendTo('.inventory');
        document.getElementById('Generate').setAttribute("onclick", "Generate()");
	}, 8500);
	$('.raffle-roller-container').css('margin-left', '-6995px');
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
