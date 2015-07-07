var Game = Game || {};
Game.ki = {
	botEasyProb : 25,	//--> 25% probability
	botModerateProb : 50,
	botHardProb : 75,
	
	botEnabled : "false",
	botDifficulty : "none",
	botColorId : -1,
	
	
		selectDifficulty: function (botName){
			var difficulty;
			if(botName=="Bot-1"){
                difficulty = 1;
            }else if(botName=="Bot-2"){
                difficulty = Game.static.rand(1,3);
            }else if(botName=="Bot-3"){
                difficulty = Game.static.rand(2,3);
            }else if(botName=="Bot-4"){
                difficulty = 3;
            }else{
                difficulty = 3;
            }
			//alert("F: selectDifficulty, " + difficulty);
			return difficulty;
		},
		SelectField: function (botName){
			// dort soll das nächste Feld ausgewählt werden, das angegriffen wird.
		},
		SelectAnswer: function (questionDifficulty,botName){
			//dort soll die passende Antwort ausgewählt werden.
			var rand = Game.static.rand(100);
            var botActiv = 0;
            if(botName=="Bot-1"){
                botActiv = 24;
            }else if(botName=="Bot-2"){
                botActiv = 48;
            }else if(botName=="Bot-3"){
                botActiv = 60;
            }else if(botName=="Bot-4"){
                botActiv = 74;
            }else{
                botActiv = 98;
            }
			if(this.questionDifficulty==1){
                botActiv = botActiv+25; //Bot-1 schafft es zu 49%; Bot-2 zu 73%; Bot-3 zu 85%, Bot-4 zu 98 und Bot-5 zu über 100%
			}else if(this.questionDifficulty==2){
				//Standart Einstellungen
			}else if(this.questionDifficulty==3){
                botActiv = botActiv-15;
			}
			if(Game.static.rand() <= botActiv){
				return 1; //Gibt 1 Zurück falls die Antwort richtig ist.
			}else{
				return 0;
			}
		}
};
