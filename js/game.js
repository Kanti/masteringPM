var Game = Game || {};

$(function () {
	Game.start = false;
    //Game.creator.replaceWithGameFiled($('#here'), ['color-1', 'color-2', 'color-3', 'color-4']);
    Game.player.start(Game.start);
    Game.static.setGameAreaContainerSize();

    $(window).on('resize', function () {
        Game.static.waitForFinalEvent(Game.static.setGameAreaContainerSize);
    });
});

