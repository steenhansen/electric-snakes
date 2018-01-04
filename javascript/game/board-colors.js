"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const available_colors = [
    ["rgb(255, 255, 255)" // 0 is background is white
        ,
        "rgb(255, 0, 0)" // 1 player red
        ,
        "rgb(0, 255,0)" // 2 player lime
        ,
        "rgb(0, 0, 255)" // 3 player blue
        ,
        "rgb(0, 255, 255)" // 4 player cyan
        ,
        "rgb(255, 0, 255)" // 5 player magenta
        ,
        "rgb(255, 255, 0)" // 6 player yellow
        ,
        "rgb(128, 128, 128)" // 7 player gray
        ,
        "rgb(128, 128, 0)" // 8 player olive
        ,
        "rgb(0, 0, 0)" // 9 are walls are black
    ], [
        "rgb(0, 0, 0)" // 0 is background is black
        ,
        "rgb(0,0,128)" // 1 player is navy
        ,
        "rgb(0,128,128)" // 2 player teal
        ,
        "rgb(128,0,128)" // 3 player purple
        ,
        "rgb(0,128,0)" // 4 player green
        ,
        "rgb(128,128,0)" // 5 player olive
        ,
        "rgb(128,0,0)" // 6 player maroon
        ,
        "rgb(128,128,128)" // 7 player gray
        ,
        "rgb(192,192,192)" // 8 player silver
        ,
        "rgb(255, 255, 255)" // 9 are walls are white
    ]
];
const BoardColors = {
    randomColors: () => {
        if (typeof global.CONFIG_TESTING_VARS === "undefined") {
            const random_color = Math.floor(Math.random() * available_colors.length);
            return random_color;
        }
        else {
            const test_color = global.CONFIG_TESTING_VARS.TESTING_BOARD_COLOR;
            return test_color;
        }
    },
    colorSet: (color_index) => {
        return available_colors[color_index];
    }
};
exports.BoardColors = BoardColors;
