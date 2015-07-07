var Game = Game || {};
Game.ki = {
	botEasyProb : 25,	//--> 25% probability
	botModerateProb : 50,
	botHardProb : 75,
	botProbActiv : -1,
	
	botEnabled : "false",
	botDifficulty : "none",
	botColorId : -1,
	
	activ: {
        enabled : 'false',
        difficulty : 'none',
		probActiv : '-1',
		colorId :'-1'
		},
		SelectField: function (botName){
			// dort soll das nächste Feld ausgewählt werden, das angegriffen wird.
		},
		SelectAnswer: function (questionDifficulty,botName){
			//dort soll die passende Antwort ausgewählt werden.
			var rand = this.rand();
			
			if(this.questionDifficulty==1){
				this.botProbActiv = this.botProbActiv+25; //einfach schafft es zu 50%; mittel zu 75%; schwer zu 100%
				if(this.botDifficulty=="hard"){
					this.botProbActiv = 100;
				}
			}else if(this.questionDifficulty==2){
				//einfach schafft es zu 25%; mittel zu 50%; schwer zu 75%
			}else if(this.questionDifficulty==3){
				this.botProbActiv = this.botProbActiv-15; //einfach schafft es zu 10%; mittel zu 35%; schwer zu 60%	
			}
			if(rand <= this.botProbActiv){
				return 1; //Gibt 1 Zurück falls die Antwort richtig ist.
			}else{
				return 0;
			}
		},
		rand: function () {
			//Erzeugt Zufallszahlen von 1 bis Einschlieslich max, mit gleicher Wahrscheinlichkeit!
			var min = 1, max = 100;
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
};
