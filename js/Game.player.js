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
        $playerinput.append("Spieler: " + num);
        for (var i = 1; i <= num; i++) {
            var thiscolorid = "color-" + i;
            var thiscolor = this.getName(thiscolorid);
            var nameInput = "<input type='text' class=" + thiscolorid + " name=" + thiscolorid + " onchange='Game.player.setPlayerName(this.name, this.value)' value=" + thiscolor + ">";
            $playerinput.append(nameInput);
        }
        $playerinput.append("<br><button class='button' onclick='Game.player.generatePlayerSize(" + num + ")'>Start</button>");
    },
    generatePlayerSize: function (numberOfPlayers) {
        $("#welcome").hide();
        $('#restart').text('Neustart');
        $('#restart').bind('click', function() {Game.question.restart();});
        $('.game-area-container').show();
        Game.start = true;
        var arr = [];
        for (var i = 0; i < numberOfPlayers; i++) {
            arr.push("color-" + (i + 1));
        }
        Game.creator.replaceWithGameFiled($('#here'), arr);
    },
    getName: function (colorId) {
        return Game.config.colors[colorId];
    },
    setPlayerName: function (color, name) {
        Game.config.colors[color] = name;
		
		//Ausgeklammert zum Testen notwendig
		/*
				if(name=="bot-1"){
					Game.ki.botDifficulty = "easy";
					Game.ki.botEnabled = "true";
					Game.ki.botProbActiv = Game.ki.botEasyProb;
				}
				if(name=="bot-2)"){
					Game.ki.botDifficulty = "moderate";
					Game.ki.botEnabled = "true";
					Game.ki.botProbActiv = Game.ki.botModProb;
				}
				if(name=="bot-3"){
					Game.ki.botDifficulty = "hard";
					Game.ki.botEnabled = "true";
					Game.ki.botProbActiv = Game.ki.botHardProb;
				}
				if(Game.ki.botEnabled == "true"){
						Game.ki.botColorId = color;
						alert("KI Gegner " + Game.ki.botDifficulty + " wurde Hinzugefügt." + Game.player.getName(color) + " !! :)");
						Game.ki.selectDifficulty(name);
						Game.ki.botEnabled == "false"
				}
			*/
    }
};