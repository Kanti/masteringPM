var Game = Game || {};

$(function () {
    Game.creator.replaceWithGameFiled($('#here'), ['color-1', 'color-2', 'color-3', 'color-4']);
});

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

var setGameAreaSize = function (size) {
    $('#css').html('.game-area-container.game-area-container{' +
    '  height: ' + size + 'px;' +
    '  width: ' + size + 'px;' +
    '}');
};

var setGameAreaContainerSize = function () {

    var x = 0.3;

    var win = $(this);
    var height = win.height();
    var width = win.width();
    var ratio = height / width;
    if (height > width) {
        height = width;
    }
/* Möglichkeit 1
    if (ratio < 0) {
        ratio *= -1;
    }
    console.log(".", height, width, ratio);
    if (ratio > (1-x) && ratio < (1+x)) {
        ratio -= 1;
        if (ratio < 0) {
            ratio *= -1;
        }
        ratio = 100 - (x - ratio) * (100 / x);
        ratio = ratio/3 + 66.66666;
        console.log("dawa", ratio);
        height *= ratio/100;
    }
//*/

    //Möglichkeit 2
    //height *= 0.9;

    setGameAreaSize(height);

    $('html, body').animate({
        scrollTop: $(".game-area-container").offset().top
    }, 1);
};
$(function () {
    setGameAreaContainerSize();
});
$(window).on('resize', function () {
    waitForFinalEvent(setGameAreaContainerSize);
});
