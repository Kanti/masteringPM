var Game = Game || {};
Game.static = Game.static || {};
Game.static.isWinner = {

    has9FieldsAround: function ($element) {
        //console.log("test has9FieldsAround ", $element.get(0));
        var size = Game.static.getGameSize($element);
        var index = Game.static.getIndex($element);
        var color = Game.static.getColor($element);
        var $testElement = Game.static.getElementByIndex($element, index + 1);//rechts
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        $testElement = Game.static.getElementByIndex($element, index + size + 1);//rechts unten
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        $testElement = Game.static.getElementByIndex($element, index + size);//unten
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        $testElement = Game.static.getElementByIndex($element, index + size - 1);//unten links
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        $testElement = Game.static.getElementByIndex($element, index - 1);//links
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        $testElement = Game.static.getElementByIndex($element, index - size - 1);//links oben
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        $testElement = Game.static.getElementByIndex($element, index - size);//oben
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        $testElement = Game.static.getElementByIndex($element, index - size + 1);//rechts oben
        return !(!$testElement || Game.static.getColor($testElement) != color);
    },
    hasThreeInARowVertical: function ($element) {
        //console.log("test has9FieldsAround ", $element.get(0));
        var size = Game.static.getGameSize($element);
        var index = Game.static.getIndex($element);
        var color = Game.static.getColor($element);
        var $testElement = Game.static.getElementByIndex($element, index + 1);//rechts
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        $testElement = Game.static.getElementByIndex($element, index - 1);//links
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        return true;
    },
    hasThreeInARowHorizontal: function ($element) {
        //console.log("test has9FieldsAround ", $element.get(0));
        var size = Game.static.getGameSize($element);
        var index = Game.static.getIndex($element);
        var color = Game.static.getColor($element);
        var $testElement = Game.static.getElementByIndex($element, index + size);//unten
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        $testElement = Game.static.getElementByIndex($element, index - size);//oben
        if (!$testElement || Game.static.getColor($testElement) != color) {
            return false;
        }
        return true;
    },
    test: function ($element, color) {
        var size = Game.static.getGameSize($element);
        if(Game.fastwin) {
            return true;
        }
        for (var i = 0; i < size * size; i++) {
            var $tmpElement = Game.static.getElementByIndex($element, i);
            if (!$tmpElement) {
                continue;
            }
            if (Game.static.isEdgeElement($tmpElement)) {
                continue;
            }
            if (Game.static.getColor($tmpElement) != color) {
                continue;
            }
            if (Game.static.isWinner.has9FieldsAround($tmpElement)) {
                return true;
            }
        }
        return false;
    },
    achievment: function ($element, color) {
        // nochmal ein Redesign des Systems vornehmen!
        var size = Game.static.getGameSize($element);

        for (var i = 0; i < size * size; i++) {
            var $tmpElement = Game.static.getElementByIndex($element, i);
            if (!$tmpElement) {
                continue;
            }
            if (Game.static.isEdgeElement($tmpElement)) {
                continue;
            }
            if (Game.static.getColor($tmpElement) != color) {
                continue;
            }
            if (Game.static.isWinner.hasThreeInARowHorizontal($tmpElement)) {
                return 1;
            }
            if (Game.static.isWinner.hasThreeInARowVertical($tmpElement)) {
                return 1;
            }
        }
        return 0;
    }
};