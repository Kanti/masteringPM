var Game = Game || {};

Game.question = {
    conquer: function ($attackedElement) {
        var attackedColor = Game.static.getColor($attackedElement);
        var $active = Game.static.getActiveElement($attackedElement);
        var activeColor = Game.static.getColor($active);
        $attackedElement.removeClass(attackedColor).addClass(activeColor);
        if (Game.static.isWinner.test($attackedElement, activeColor)) {
            alert("Du hast Gewonnen " + Game.config.colors[activeColor] + " !! :)");
        }
    },
    ask: function ($attackedElement) {
        var attackedColor = Game.static.getColor($attackedElement);
        var $active = Game.static.getActiveElement($attackedElement);
        var activeColor = Game.static.getColor($active);

        var deferredObject = $.Deferred();

        Game.question.createQuestionCardForPlayer($attackedElement, activeColor, attackedColor, deferredObject);
        /*
         var conquer = confirm("player " + Game.config.colors[attackedColor] + " you are under Attack by player " + Game.config.colors[activeColor]);
         if (conquer) {
         $attackedElement.removeClass(attackedColor).addClass(activeColor);

         if (Game.static.isWinner.test($attackedElement, activeColor)) {
         alert("you are the Winner " + Game.config.colors[activeColor]);
         }
         }
         deferredObject.resolve({conquer: conquer});*/
        /*deferredObject.notify(1);
         deferredObject.reject(randomValue, "errorCode");*/
        return deferredObject;
    },
    createQuestionCardForPlayer: function ($attackedElement, activeColor, attackedColor, deferredObject) {
        if (activeColor == "color-0") {
            Game.question.conquer($attackedElement);
            Game.question.removeCard();
            deferredObject.resolve({conquer: true});
            return;
        }
        //console.log("createQuestionCardForPlayer", $attackedElement, activeColor, attackedColor, deferredObject);
        var vm = this;
        vm.$modal = $('#modal');
        vm.$body = $('#body');
        vm.$p = vm.$modal.find('p');
        vm.$h3 = vm.$modal.find('h3');
        vm.$answers = vm.$modal.find('a');
        vm.$answer1 = vm.$answers.eq(0);
        vm.$answer2 = vm.$answers.eq(1);
        vm.$answer3 = vm.$answers.eq(2);
        vm.$answer4 = vm.$answers.eq(3);
        vm.question = Game.question.getRandomQuestionObject();
        vm.question.done(function (data) {
            console.log("Question: ", data["Frage"]);
            vm.question = data;

            vm.$p.text("Spieler " + Game.config.colors[activeColor]);
            vm.$p.removeClass().addClass(activeColor);
            vm.$modal.removeClass().addClass("show");
            vm.$body.addClass("overlay");
            vm.$h3.text(vm.question["Frage"]);
            vm.$answer1.text(vm.question["Antwort A"]).off();
            vm.$answer2.text(vm.question["Antwort B"]).off();
            vm.$answer3.text(vm.question["Antwort C"]).off();
            vm.$answer4.text(vm.question["Antwort D"]).off();

            vm.$answers.on('click', function (event) {
                //console.log("click Event", event);
                event.preventDefault();
                if (attackedColor == 'NONE') {
                    if ($(this).index() == vm.question["Schwierigkeit"]) { //TODO
                        Game.question.removeCard();
                        deferredObject.resolve({conquer: false});
                    } else {
                        Game.question.conquer($attackedElement);
                        Game.question.removeCard();
                        deferredObject.resolve({conquer: true});
                    }
                } else {
                    if ($(this).index() == vm.question["Schwierigkeit"]) { //TODO
                        Game.question.removeCard();
                        //console.log("between removeCard and createQuestionCardForPlayer");
                        setTimeout(function () {
                            Game.question.createQuestionCardForPlayer($attackedElement, attackedColor, 'NONE', deferredObject);
                        }, 300);
                    } else {
                        Game.question.removeCard();
                        deferredObject.resolve({conquer: false});
                    }
                }
            });
        });
    },
    removeCard: function () {
        var $modal = $('#modal').addClass("hide");
        setTimeout(function () {
            if ($modal.hasClass("hide") && $modal.hasClass("show")) {
                $modal.removeClass();
            }
        }, 250);
        $('#body').removeClass("overlay");
    },
    getQuestions: function () {
        if (Game.question.getQuestions["cache"]) {
            return Game.question.getQuestions["cache"];
        }
        var deferredObject = $.Deferred();
        $.getJSON("questions.json", function (data) {
            data = $.map(data, function (val, i) {
                switch (val['Kategorie']) {
                    case 'Multiple Choice':
                    case 'Ja/Nein':
                        return val;
                }
            });
            console.log("fragen Anzahl: ", data.length);
            deferredObject.resolve(data);
        });
        Game.question.getQuestions["cache"] = deferredObject;
        return deferredObject;
    },
    getRandomQuestionObject: function () {
        var deferredObject = $.Deferred();
        if (Game.question.getRandomQuestionObject["cache"]) {
            if (Game.question.getRandomQuestionObject["cache"].length > 0) {
                deferredObject.resolve(Game.question.getRandomQuestionObject["cache"].pop());
                return deferredObject;
            }
        }
        var QuestionDeferredObject = Game.question.getQuestions();
        QuestionDeferredObject.done(function (data) {
            Game.question.getRandomQuestionObject["cache"] = Game.static.shuffle($.extend(true, [], data));
            deferredObject.resolve(Game.question.getRandomQuestionObject["cache"].pop());
        });
        return deferredObject;
    }
};
