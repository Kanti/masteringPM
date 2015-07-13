var Game = Game || {};
Game.animation = {
	speed : 5,
	acceleration: 0.5,
	winning: function() {
		var position = $("#center").position();
		var width = $("#center").width();
		position.top += width/2;
		position.left += width/2;
		Game.animation.changeColorOfElement($('#center'), 10);
		//$elem = Game.animation.createParticles(Game.animation.getRandomInt(1,5),position);
		//Game.static.log($elem);
	},
	createParticles: function(size, pos) {
		Game.static.log(pos.top, pos.left);
	    var lastId = 0;
	    if($('.kugel').length > 0)
	    {
	        lastId = $('.kugel').last().attr('id');
	        lastId = parseInt(lastId.replace("kugel-", ""));
	    }
	    var elem = document.createElement("div");
	    elem.className = 'kugel';
	    elem.id = 'kugel-' + (lastId + 1);
	    elem.style.width = size+'px';
	    elem.style.height = size+'px';
	    elem.style.top = pos.top;
	    elem.style.left = pos.left;
	    elem.style.zIndex = size*3;
	    elem.speed = 0;
	    return elem;
	},
	getRandomInt: function (min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	randColr: function (area, color) {
	    var max = 256;
	    var min = 0;
	    switch(area)
	    {
	        case "dark":
	            max /= 2;
	            break;
	        case "darker":
	            max /= 8;
	            break;
	        case "normal":
	        	break;
	        case "light":
	            min = max/2;
	            break;
	        case "lighter":
	            min = max/2+max/4;
	            break;
	    }
	    var r = Game.animation.getRandomInt(min, max).toString(16);
	    var g = Game.animation.getRandomInt(min, max).toString(16);
	    var b = Game.animation.getRandomInt(min, max).toString(16);
	    var hex;
	    switch(color)
	    {
	        case "red":
	            hex = "#"+r+"0000";
	            break;
	        case "green":
	            hex = "#00"+g+"00";
	            break;
	        case "blue":
	            hex = "#0000"+b;
	            break;
	        case "lYellow":
	            hex = "#FFFF"+b;
	            break;
	        case "dYellow":
	            hex = "#"+r+g+"00";
	            break;
	        case "gray":
	            hex = "#"+r+r+r;
	            break;
	        default:
	            hex = "#"+r+g+b;
	            break;
	    }
	    return hex;
	},
	changeColorOfElement: function ($element, duration) {
		var timer = setInterval(function(){
		 $element.css("background-color", Game.animation.randColr());
		 duration--;
		}, 500);
		if(duration == 0) {
			clearInterval(timer);
		}
	}
};