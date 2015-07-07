var Game = Game || {};
Game.ki = {
	botEasyProb : 25,	//--> 25% probability
	botModerateProb : 50,
	botHardProb : 75,
	
	botEnabled : "false",
	botDifficulty : "none",
	botColorId : -1,


		SelectField: function (botName){
			// dort soll das nächste Feld ausgewählt werden, das angegriffen wird.
		},
		SelectAnswer: function (questionDifficulty,botName){
			//dort soll die passende Antwort ausgewählt werden.
			var rand = this.rand();
            var botActiv = 0;
            if(botName==1){
                botActiv = 24;
            }else if(botName==2){
                botActiv = 48;
            }else if(botName==3){
                botActiv = 60;
            }else if(botName==4){
                botActiv = 74;
            }else{
                botActiv = 98;
            }

			if(this.questionDifficulty==1){
                botActiv = botActiv+25; //einfach schafft es zu 49%; mittel zu 73%; schwer zu 85% hart zu 98 und extrem zu über 100%

			}else if(this.questionDifficulty==2){
				//einfach schafft es zu 24%; mittel zu 48%; schwer zu 60%...
			}else if(this.questionDifficulty==3){
                botActiv = botActiv-15;
			}
			if(rand <= botActiv){
				return 1; //Gibt 1 Zurück falls die Antwort richtig ist.
			}else{
				return 0;
			}
		},
		rand: function () {
			//Erzeugt Zufallszahlen von 1 bis Einschlieslich max, mit gleicher Wahrscheinlichkeit!
			var min = 1, max = 100;
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
        getAllFields: function($element) {
            var color = Game.static.getColor($element);
            var size = Game.static.getGameSize($element);
            var Fields =[];

            for (var i = 0; i <= 2*Game.static.getGameSize($element)-1; i++) {
                if (color = Game.static.getColor(Game.static.getElementByIndex($element,i))) {
                    Fields.push(Game.static.getElementByIndex($element,i))
                }
            }

            return Fields;
        },
        GetOneAttackableField: function($array) {
            // To be filled
            }
        }
};