var Game = Game || {};
Game.ki = {
	var botEasyProb = 25; 	//--> 25% probability
	var botModerateProb = 50;
	var botHardProb = 75;
	var botProbActiv = -1;
	
	var botEnabled = "false";
	var botDifficulty = "none";
	var botColorId = -1;
	
	activ: {
        'enabled': 'false',
        'difficulty': 'none',
		'probActiv' : '-1',
		'colorId':'-1'
		}
		SelectField: function (){
			// dort soll das nächste Feld ausgewählt werden, das angegriffen wird.
		},
		SelectAnswer: function (){
			//dort soll die passende Antwort ausgewählt werden.

			var rand = rand();
			if(rand <= botProbActiv){
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
