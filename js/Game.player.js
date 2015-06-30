var Game = Game || {};
Game.player = {
	start: function (started) {
		if (!started){
			$("#welcome").show();
		}
	},
	setPlayerNumber: function() {
		$(".playerinput").empty();
		var num = parseInt($("#numberOfPlayers").val());
		for (var i = 1; i <= num; i++) {
			var thiscolorid = "color-"+i;
			var thiscolor = this.getName(thiscolorid);
			var nameInput = "<input type='text' class="+thiscolorid+" name="+thiscolorid+" onchange='Game.player.setPlayerName(this.name, this.value)' value="+thiscolor+">";
			$(".playerinput").append("<br>"+nameInput);
		};
		$(".playerinput").append("<br><button onclick='Game.player.generatePlayerSize("+num+")'>Start</button>");
	},
	generatePlayerSize: function(numberOfPlayers) {
		$("#welcome").remove();
		Game.start = true;
		var arr = [];
		for(var i = 0; i < numberOfPlayers;i++) {
			arr.push("color-"+(i+1));
		};
		Game.creator.replaceWithGameFiled($('#here'), arr);
	},
	getName: function(colorId) {
		return Game.config.colors[colorId];
	},
	setPlayerName: function(color, name) {
		Game.config.colors[color] = name;
	}
};