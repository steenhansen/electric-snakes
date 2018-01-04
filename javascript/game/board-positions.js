"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_enums_1 = require("../types/project-enums");
const canned_moves_1 = require("./canned-moves");
const { DOWN_MOVE, UP_MOVE, LEFT_MOVE, RIGHT_MOVE } = project_enums_1.EMoveTypes;
const { WALL_HORIZONTAL, WALL_VERTICAL } = project_enums_1.EWallTypes;
const available_boards = [
    { board_height: 40,
        board_width: 40,
        player_init_positions: [{ x: 1, y: 1, start_direction: RIGHT_MOVE, test_moves: [] },
            { x: 38, y: 38, start_direction: LEFT_MOVE, test_moves: [] },
            { x: 1, y: 38, start_direction: UP_MOVE, test_moves: [] },
            { x: 38, y: 1, start_direction: UP_MOVE, test_moves: [] },
            { x: 20, y: 1, start_direction: DOWN_MOVE, test_moves: [] },
            { x: 38, y: 20, start_direction: LEFT_MOVE, test_moves: [] },
            { x: 20, y: 38, start_direction: UP_MOVE, test_moves: [] },
            { x: 1, y: 20, start_direction: LEFT_MOVE, test_moves: [] }],
        player_positions_current: [],
        wall_init_lines: [[1, 12, 3, WALL_VERTICAL],
            [2, 25, 3, WALL_VERTICAL],
            [3, 20, 3, WALL_HORIZONTAL],
            [4, 20, 3, WALL_HORIZONTAL]],
        wall_lines_current: []
    }, { board_height: 40,
        board_width: 30,
        player_init_positions: [{ x: 2, y: 20, start_direction: RIGHT_MOVE, test_moves: [] },
            { x: 27, y: 20, start_direction: LEFT_MOVE, test_moves: [] },
            { x: 15, y: 2, start_direction: DOWN_MOVE, test_moves: [] },
            { x: 15, y: 37, start_direction: UP_MOVE, test_moves: [] },
            { x: 2, y: 2, start_direction: RIGHT_MOVE, test_moves: [] },
            { x: 27, y: 2, start_direction: LEFT_MOVE, test_moves: [] },
            { x: 2, y: 37, start_direction: RIGHT_MOVE, test_moves: [] },
            { x: 27, y: 37, start_direction: LEFT_MOVE, test_moves: [] }],
        player_positions_current: [],
        wall_init_lines: [[0, 0, 30, WALL_HORIZONTAL],
            [0, 39, 30, WALL_HORIZONTAL],
            [0, 0, 40, WALL_VERTICAL],
            [29, 0, 40, WALL_VERTICAL]],
        wall_lines_current: []
    }, { board_height: 30,
        board_width: 40,
        player_init_positions: [{ x: 17, y: 14, start_direction: UP_MOVE, test_moves: [] },
            { x: 21, y: 18, start_direction: DOWN_MOVE, test_moves: [] },
            { x: 17, y: 18, start_direction: DOWN_MOVE, test_moves: [] },
            { x: 21, y: 14, start_direction: UP_MOVE, test_moves: [] },
            { x: 19, y: 18, start_direction: DOWN_MOVE, test_moves: [] },
            { x: 19, y: 14, start_direction: UP_MOVE, test_moves: [] },
            { x: 21, y: 16, start_direction: RIGHT_MOVE, test_moves: [] },
            { x: 17, y: 16, start_direction: LEFT_MOVE, test_moves: [] }],
        player_positions_current: [],
        wall_init_lines: [[0, 0, 3, WALL_HORIZONTAL],
            [0, 0, 3, WALL_VERTICAL],
            [37, 0, 3, WALL_HORIZONTAL],
            [39, 0, 3, WALL_VERTICAL],
            [37, 29, 3, WALL_HORIZONTAL],
            [39, 27, 3, WALL_VERTICAL],
            [0, 29, 3, WALL_HORIZONTAL],
            [0, 27, 3, WALL_VERTICAL]],
        wall_lines_current: []
    }
];
function randomBoard() {
    if (typeof global.CONFIG_TESTING_VARS === "undefined") {
        const random_board = Math.floor(Math.random() * available_boards.length);
        return random_board;
    }
    else {
        const test_board = global.CONFIG_TESTING_VARS.TESTING_BOARD_INDEX;
        return test_board;
    }
}
const boardPositions = (number_players, test_players) => {
    const board_index = randomBoard();
    const chosen_board = available_boards[board_index];
    chosen_board.player_positions_current = [];
    for (let player_index = 0; player_index < number_players; player_index++) {
        chosen_board.player_positions_current[player_index] = Object.assign({}, chosen_board.player_init_positions[player_index]);
    }
    chosen_board.wall_lines_current = chosen_board.wall_init_lines.slice(0);
    for (let player_index = 0; player_index < number_players; player_index++) {
        if (test_players[player_index]) {
            const canned_moves = canned_moves_1.default();
            chosen_board.player_positions_current[player_index].test_moves = canned_moves;
            chosen_board.player_positions_current[player_index].start_direction = canned_moves[0];
        }
    }
    return chosen_board;
};
exports.default = boardPositions;
