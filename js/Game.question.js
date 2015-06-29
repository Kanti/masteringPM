var Game = Game || {};
Game.question = {
    ask: function ($attackedElement) {
        var attackedColor = Game.static.getColor($attackedElement);
        var $active = Game.static.getActiveElement($attackedElement);
        var activeColor = Game.static.getColor($active);

        var deferredObject = $.Deferred();
        var conquer = confirm("player " + Game.config.colors[attackedColor] + " you are under Attack by player " + Game.config.colors[activeColor]);
        if (conquer) {
            $attackedElement.removeClass(attackedColor);
            $attackedElement.addClass(activeColor);

            if (Game.static.isWinner.test($attackedElement, activeColor)) {
                alert("you are the Winner " + Game.config.colors[activeColor]);
            }
        }
        deferredObject.resolve({conquer: conquer});
        /*deferredObject.notify(1);
        deferredObject.reject(randomValue, "errorCode");*/
        return deferredObject;
    }
};
