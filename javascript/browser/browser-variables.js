"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_constants_1 = require("../project-constants");
const project_enums_1 = require("../types/project-enums");
const { SECONDS_COUNT_DOWN, MOVE_SEND_INTERVAL, TILE_PIXEL_SIZE } = project_constants_1.default;
const { CONTINUE_MOVE } = project_enums_1.EMoveTypes;
const browser_random_key = window.SNAKE_WS_RANDOM_KEY;
const ws_name = location.origin.replace(/^http/, "ws") + "/?" + browser_random_key;
const browser_variables = {
    browser_turn: 0,
    count_down: SECONDS_COUNT_DOWN,
    count_down_func_id: 0,
    game_over: false,
    game_started: false,
    host_name: ws_name,
    machine_game_count: 1,
    next_key_move: CONTINUE_MOVE,
    sample_keys_func_id: 0,
    seconds_count_down: 0,
    send_move_interval: MOVE_SEND_INTERVAL,
    test_moves: [],
    the_game_board: {},
    the_websocket: {},
    tile_size: TILE_PIXEL_SIZE,
    ws_random_key: browser_random_key,
    your_player_number: 0
};
browser_variables.the_websocket = new WebSocket(browser_variables.host_name);
exports.default = browser_variables;
