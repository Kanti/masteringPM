var Game = Game || {};
Game.main = function ($gameArea) {
    var vm = this;
    Game.gameObject = vm;
    vm.$lastActiveElement = null;

    vm.newActive = function ($element) {
        $element.addClass('active');
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
        if (Game.static.haveATurn($element) && Game.static.isBot(Game.config.colors[Game.static.getColor($element)])) {
            if (!Game.isRunning) {
                Game.isRunning = true;
                var x = Game.ki.selectField($element, Game.config.colors[Game.static.getColor($element)]);
                console.log("$attackedElement", x[0], x[1]);
                setTimeout(function () {

                    vm.newActive(x[0]);
                    setTimeout(function () {
                        var result = Game.question.ask(x[1]);
                        result.done(function (result) {
                            Game.isRunning = false;

                            x[0].removeClass('active');
                            vm.$lastActiveElement = null;
                            x[1].parent().find('.attacked').removeClass('attacked');
                            if (!result.conquer) {
                                Game.static.nextPlayer(x[1]);
                            }else{
                                Game.gameObject.clickEvent($element);
                            }
                        });
                    }, Game.static.random(400, 600));
                }, Game.static.random(900, 1100));
            }
            return;
            //Game.ki.selectField($element, Game.config.colors[Game.static.getColor($element)]);
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
    Game.static.nextPlayer($($gameArea.find('.game-field').get(0)));
};
