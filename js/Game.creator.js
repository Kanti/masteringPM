var Game = Game || {};
Game.creator = {
    newGame: function (colors) {
        var userCount = colors.length;
        if (userCount < 2 || userCount > 6) {
            Game.static.log("ERROR");
            userCount = 2;
            colors = ['color-1', 'color-2'];
        }
        var fieldsCount = (userCount + 1) * (userCount + 1);
        var randomArray = ['color-0'];

        $.each(colors, function (index, value) {
            for (var i = 0; i < Math.floor(fieldsCount / userCount); i++) {
                randomArray.push(value);
            }
        });
        Game.static.shuffle(randomArray);
        Game.static.shuffle(colors);

        var htmlString = '<div id="here" class="game-area game-area-' + (userCount + 1) + ' ' + colors[0] + '">';
        for (var i = 0; i < fieldsCount; i++) {
            htmlString += '<a href="javascript:void(0);" class="game-field ' + randomArray.pop() + '"></a>';
        }
        htmlString += '</div>';
        return $.parseHTML(htmlString);
    },
    replaceWithGameFiled: function ($element, colors) {
        Game.start = true;
        Game.static.setGameAreaContainerSize();
        var tmp = Game.creator.newGame(colors);
        $element.replaceWith(tmp);
        Game.main($(tmp));
    }
};