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
        Game.creator.replaceWithGameFiled($('#here'), arr);
    },
    getName: function (colorId) {
        return Game.config.colors[colorId];
    },
    setPlayerName: function (color, name) {
        Game.config.colors[color] = name;
		
		//Ausgeklammert zum Testen notwendig
/*
				if(name=="bot-1"||name=="bot-2"||name=="bot-3"||name=="bot-4"||name=="bot-5"){
                    Game.ki.botEnabled = "true";
				}

				if(Game.ki.botEnabled == "true"){
                    Game.ki.botEnabled == "false";

                    console.log("KI Gegner " + Game.ki.botDifficulty + " wurde Hinzugefügt. " + Game.player.getName(color) + " !! :)");
                    console.log("Difficulty wurde ausgewählt: " + Game.ki.selectDifficulty(name));
                    console.log(Game.ki.selectAnswer(name,2));
				}
*/
    }
};