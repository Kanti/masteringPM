var Game = Game || {};
Game.static = {
    shuffle: function (o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },
    nextPlayer: function ($element) {
        var $currentColor = Game.static.currentColorElement($element);
        var colorID = Game.static.getColor($currentColor).match('color-(.*)')[1];
        var oldColorID = colorID;
        do {
            colorID++;
            if (Game.config.colors['color-' + colorID]) {
                console.log(colorID, Game.static.isColorInGameArea($element, 'color-' + colorID));
            } else {
                colorID = 1;
            }
        } while (!Game.static.isColorInGameArea($element, 'color-' + colorID));
        $currentColor.removeClass('color-' + oldColorID);
        $currentColor.addClass('color-' + colorID);
    },
    currentColorElement: function ($element) {
        return $element.parent();
    },
    currentColor: function ($element) {
        return Game.static.getColor(Game.static.currentColorElement($element));
    },
    isColorInGameArea: function ($element, color) {
        return $element.parent().find('.' + color).length >= 1;
    },
    haveATurn: function ($element) {
        return Game.static.currentColor($element) == Game.static.getColor($element);
    },
    isEdgeElement: function ($element) {
        var size = Game.static.getGameSize($element);
        var index = Game.static.getIndex($element);
        if (index <= size) {
            return true;
        }
        if (index % size == 0 || index % size == size - 1) {
            return true;
        }
        var elementsCount = size * size;
        return index >= elementsCount - size;
    },
    getColor: function ($element) {
        return $element.attr('class').match("(color-[0-9]+)")[0];
    },
    getGameSize: function ($element) {
        return Math.sqrt($element.parent().children().length);
    },
    getActiveElement: function ($element) {
        return $($element.parent().find('.active').get(0));
    },
    getIndex: function ($element) {
        return $element.parent().children().index($element);
    },
    getElementByIndex: function ($element, index) {
        return $($element.parent().children().get(index));
    },
    hasLeft: function ($element) {
        var size = Game.static.getGameSize($element);
        var id = Game.static.getIndex($element);
        return (id % size) != 0;
    },
    hasRight: function ($element) {
        var size = Game.static.getGameSize($element);
        var id = Game.static.getIndex($element);
        return (id % size) != size - 1;
    },
    getTop: function ($element) {
        var size = Game.static.getGameSize($element);
        var id = Game.static.getIndex($element);
        if ((id - size ) >= 0) {
            return Game.static.getElementByIndex($element, id - size);
        }
        return null;
    },
    getBottom: function ($element) {
        var size = Game.static.getGameSize($element);
        var id = Game.static.getIndex($element);
        if (size * size - id > size) {
            return Game.static.getElementByIndex($element, id + size);
        }
        return null;
    },
    waitForFinalEvent: (function () {
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
    })(),
    setGameAreaSize: function (size) {
        $('#css').html('.game-area-container.game-area-container{' +
        '  height: ' + size + 'px;' +
        '  width: ' + size + 'px;' +
        '}');
    },
    setGameAreaContainerSize: function () {
        var win = $(window);
        var height = win.height();
        var width = win.width();
        var max = height;
        var ratio = height / width;
        if (height > width) {
            max = width;
        }
    /* Möglichkeit 1
        var x = 0.3;
        if (ratio < 0) {
            ratio *= -1;
        }
        console.log(".", max, width, ratio);
        if (ratio > (1 - x) && ratio < (1 + x)) {
            ratio -= 1;
            if (ratio < 0) {
                ratio *= -1;
            }
            ratio = 100 - (x - ratio) * (100 / x);
            ratio = ratio / 3 + 66.66666;
            console.log("dawa", ratio);
            max *= ratio / 100;
        }
    //*/

        //Möglichkeit 2
        //max *= 0.9;

        Game.static.setGameAreaSize(max);

        $('html, body').animate({
            scrollTop: $(".game-area-container").offset().top
        }, 1);
    }
};
