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
		//Ausgeklammert bis KI Fertig ist.
		/*
		if(Game.ki.botEnabled == "false"){
				if(name=="Bot-Easy"){
					Game.ki.botDifficulty = "easy";
					Game.ki.botEnabled = "true";
					Game.ki.botProbActiv = Game.ki.botEasyProb;
				}
				if(name=="Bot-Moderate)"){
					Game.ki.botDifficulty = "moderate";
					Game.ki.botEnabled = "true";
					Game.ki.botProbActiv = Game.ki.botModProb;
				}
				if(name=="Bot-Hard"){
					Game.ki.botDifficulty = "hard";
					Game.ki.botEnabled = "true";
					Game.ki.botProbActiv = Game.ki.botHardProb;
				}
				if(Game.ki.botEnabled == "true"){
						Game.ki.botColorId = color;
						alert("KI Gegner " + Game.ki.botDifficulty + " wurde Hinzugefügt." + getName(color); + " !! :)");
				}
			}else if(Game.ki.botEnabled == "true"){
				 alert("Fehler: Es wurde mehr als ein Bot Hinzugefügt!!!");
				 Game.ki.botEnabled = "blocked";
			}
			*/
    }
};