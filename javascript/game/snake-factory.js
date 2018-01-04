"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const board_positions_1 = require("./board-positions");
const SnakeGame_1 = require("./SnakeGame");
//import project_constants from "../types/project-constants"
//const {MILLI_BETWEEN_TURNS,MAX_SNAKE_SIZE}=project_constants
let SnakeFactory = function (number_players, test_players, size_of_snake, turns_in_milli) {
    var random_board = board_positions_1.default(number_players, test_players);
    //  var random_board= boardPositions(number_players, test_players, 1)
    var board_obj = {
        board_width: random_board.board_width,
        board_height: random_board.board_height,
        wall_lines: random_board.wall_lines,
        player_positions_current: random_board.player_positions_current,
        max_size: size_of_snake //
        ,
        board_turn: 0,
        MILLI_BETWEEN_TURNS: turns_in_milli //MILLI_BETWEEN_TURNS
    };
    var board_options = immutable_1.Map(board_obj);
    var snake_game = new SnakeGame_1.default(board_options);
    return snake_game;
};
exports.default = SnakeFactory;
