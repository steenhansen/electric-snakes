"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const board_positions_1 = require("./board-positions");
const SnakeGame_1 = require("./SnakeGame");
const SnakeFactory = (number_players, test_players, size_of_snake, snake_walls, turns_in_milli) => {
    const random_board = board_positions_1.default(number_players, test_players);
    if (!snake_walls) {
        random_board.wall_lines_current = [];
    }
    const board_obj = {
        board_height: random_board.board_height,
        board_turn: 0,
        board_width: random_board.board_width,
        max_size: size_of_snake,
        milli_between_turns: turns_in_milli,
        player_positions_current: random_board.player_positions_current,
        snake_walls,
        wall_lines_current: random_board.wall_lines_current
    };
    const board_options = immutable_1.Map(board_obj);
    const snake_game = new SnakeGame_1.default(board_options);
    return snake_game;
};
exports.default = SnakeFactory;
