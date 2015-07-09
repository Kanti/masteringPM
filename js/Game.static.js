var Game = Game || {};
Game.static = {
    log: function() {
        if(Game.debug) {
            console.log(arguments); //hier muss des noch reformatiert werden..
        }
    },
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
               Game.static.log(colorID, Game.static.isColorInGameArea($element, 'color-' + colorID));
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
        Game.static.log("resize setGameAreaContainerSize");
        var win = $(window);
        var height = win.height();
        var width = win.width();
        var max = height;
        var ratio = height / width;
        if (height > width) {
            max = width;
        }

        Game.static.setGameAreaSize(max);

        $('html, body').animate({
            scrollTop: $(".game-area-container").offset().top
        }, 1);
    },
	random: function (min,max) {
		//Erzeugt Zufallszahlen von min bis Einschlieslich max, mit gleicher Wahrscheinlichkeit!
		max = max || 100;
		min = min || 1;

		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
    getNearbyElements : function ($element) {
        var color = Game.static.getColor($element);
        var result = [];
        var test = [];
        var $tmp;
        if (Game.static.hasLeft($element)) {
            test.push($element.prev());
        }
        if (Game.static.hasRight($element)) {
            test.push($element.next());
        }
        if ($tmp = Game.static.getTop($element)) {
            test.push($tmp);
        }
        if ($tmp = Game.static.getBottom($element)) {
            test.push($tmp);
        }

        $.each(test, function (index) {
            if (!test[index].hasClass(color)) {
                result.push(test[index]);
            }
        });
        return result;
    }
};
