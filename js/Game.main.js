var Game = Game || {};
Game.main = function ($gameArea) {
    var vm = this;
    vm.$lastActiveElement = null;

    vm.newActive = function ($element) {
        //console.log("newActive", Game.static.currentColor($element), Game.static.getColor($element));
        var arrayOfNearbyElements = Game.static.getNearbyElements($element);
        //console.log(arrayOfNearbyElements);
        $.each(arrayOfNearbyElements, function (index, $element) {
            $element.addClass('attacked');
        });
    };

    vm.clickEvent = function ($element) {
        if ($element.hasClass('attacked')) {
            var result = Game.question.ask($element);
            result.done(function (result) {
                if (vm.$lastActiveElement !== null) {
                    vm.$lastActiveElement.removeClass('active');
                    vm.$lastActiveElement = null;
                }
                $element.parent().find('.attacked').removeClass('attacked');
                if (!result.conquer) {
                    Game.static.nextPlayer($element);
                }
            });


            return;
        }
        if (vm.$lastActiveElement !== null) {
            vm.$lastActiveElement.removeClass('active');
            $element.parent().find('.attacked').removeClass('attacked');
        }
        if (vm.$lastActiveElement && vm.$lastActiveElement.get(0) === $element.get(0)) {
            vm.$lastActiveElement = null;
        } else {
            if (Game.static.haveATurn($element)) {
                vm.$lastActiveElement = $element;
                $element.addClass('active');
                vm.newActive($element);
            } else {
                console.log("wrong player");
            }
        }
    };

    //init:
    $gameArea.find('.game-field').on('click', function () {
        vm.clickEvent($(this));
    });
};
