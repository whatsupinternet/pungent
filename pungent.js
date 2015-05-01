!function ($) {

var dict = {};
$.get( "dict.txt", function( txt ) {
    var words = txt.split( "\n" );
    for ( var i = 0; i < words.length; i++ ) {
        dict[ words[i] ] = true;
    }
});
function inserter(o, n, p){
	return o.slice(0,p) + n + o.slice(p); }
function replacer(o, n, p){
	return o.slice(0,p) + n + o.slice(p+1); }
function deleter(o, p){
	return o.slice(0,p) + o.slice(p+1); }
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

window.onload = document.getElementById('button').onclick = function () {
	var name = document.getElementById('in').value.toLowerCase()
	var namearray = name.split(" ");
	var words = [];
	for (var i=0; i<namearray.length; i++){
		if (namearray[i] != "the" && namearray[i] != "and" && namearray[i].length > 2){
			words.push(namearray[i]);
		}	
  	}
  	var poss = [];
  	valid = shuffle(words)[0];
  	for (var i=0; i<letters.length; i++){
	  	for (var j=0; j<valid.length-1; j++){
		  	var a = inserter(valid, letters[i], j);
		  	if (dict[a] && a != valid){ poss.push(a); }
		  	var b = replacer(valid, letters[i], j);
		  	if (dict[b] && b != valid){ poss.push(b); }
		  	var c = deleter(valid, j);
		  	if (dict[c] && c != valid){ poss.push(c); }
	  	}
  	}
  	for (var i=0; i<poss.length; i++){
	  	if (poss[i]==='undefined'){
		  	poss.splice(i,i+1);
	  	}
  	}
	shuffle(poss);
	
/* 	if (dict[a]){ */
		var n = name.replace(valid,poss[0]);

		$('#out').html(n);

/* 	} */
}
}