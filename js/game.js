var Game = Game || {};

$(function () {
    Game.creator.replaceWithGameFiled($('#here'), ['color-1', 'color-2', 'color-3', 'color-4']);
    Game.static.setGameAreaContainerSize();
    Game.question.getQuestions();

    $(window).on('resize', function () {
        Game.static.waitForFinalEvent(Game.static.setGameAreaContainerSize);
    });
});

