var Game = Game || {};
Game.player = {
    start: function (started) {
        if (!started) {
            $("#welcome").show();
            $('.game-area-container').hide();
            Game.player.setPlayerNumber();
        }
    },
    setPlayerNumber: function () {
        var $playerinput = $(".playerinput");
        $playerinput.empty();
        var num = parseInt($("#numberOfPlayers").val());
        for (var i = 1; i <= num; i++) {
            var thiscolorid = "color-" + i;
            var thiscolor = this.getName(thiscolorid);
            var nameInput = "<input type='text' class=" + thiscolorid + " name=" + thiscolorid + " onchange='Game.player.setPlayerName(this.name, this.value)' value=" + thiscolor + ">";
            $playerinput.append("<br>" + nameInput);
        }
        $playerinput.append("<br><button onclick='Game.player.generatePlayerSize(" + num + ")'>Start</button>");
    },
    generatePlayerSize: function (numberOfPlayers) {
        $("#welcome").hide();
        $('.game-area-container').show();
        Game.start = true;
        var arr = [];
        for (var i = 0; i < numberOfPlayers; i++) {
            arr.push("color-" + (i + 1));
        }
        ;
        Game.creator.replaceWithGameFiled($('#here'), arr);
    },
    getName: function (colorId) {
        return Game.config.colors[colorId];
    },
    setPlayerName: function (color, name) {
        Game.config.colors[color] = name;
		
		if(Game.ki.enabled == "false"){
				if(name=="Bot-Easy"){
				Game.ki.difficulty = "easy";
				Game.ki.enabled = "true";
				}
				if(name=="Bot-Moderate)"){
				Game.ki.difficulty = "moderate";
				Game.ki.enabled = "true";
				}
				if(name=="Bot-Hard"){
				Game.ki.difficulty = "hard";
				Game.ki.enabled = "true";
				}
			}else if(Game.ki.enabled == "true"){
				 alert("Fehler: Es wurde mehr als ein Bot Hinzugefügt!!!");
				 Game.ki.enabled = "blocked";
			}
			Game.ki.botColorId = color;
    }
};