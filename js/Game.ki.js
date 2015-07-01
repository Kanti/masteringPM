var Game = Game || {};
Game.ki = {
	var enabled = "false";
	var difficulty = "none";
	
	var botColorId = "-1";
    var botEasyProb = "25%";
	var botModerateProb = "50%";
	var botHardProb = "75%";
	
	
	if (Game.config.colors[color]){
		alert("KI Gegner " + difficulty + " wurde Hinzugefügt." + Game.player.getName(botColorId); + " !! :)");
	}
        	
		
/*
        var numPlayers = parseInt($("#numberOfPlayers").val());
        for (var i = 1; i <= numPlayers; i++) {
            var thiscolorid = "color-" + i; 		//Evtl name des Spielers oder Bots
            var thiscolor = Game.player.getName(thiscolorid); // this.getName
			var count = 0;
		
        }

		*/
		
		
		SelectField: function (){
			// dort soll das nächste Feld ausgewählt werden, das angegriffen wird.
		}
		SelectAnswer: function (){
			//dort soll die passende Antwort ausgewählt werden.
		}
};
