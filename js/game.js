var Game = Game || {};

$(function () {
    Game.start = false;
    Game.debug = true;
    Game.fastwin = false;
    //Game.creator.replaceWithGameFiled($('#here'), ['color-1', 'color-2', 'color-3', 'color-4']);
    Game.player.start(Game.start);
    Game.question.getQuestions();

    $(window).on('resize', function () {
        Game.static.waitForFinalEvent(Game.static.setGameAreaContainerSize);
    });
	//console.log(Game.ki.SelectAnswer(2,"Bot-mittel"));
});

