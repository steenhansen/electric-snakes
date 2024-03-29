"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const board_colors_1 = require("../game/board-colors");
const game_factory_1 = require("../game/game-factory");
const project_constants_1 = require("../project-constants");
const project_routines_1 = require("../project-routines");
const project_enums_1 = require("../types/project-enums");
const { HUMAN_PLAYER_NUMBER, TEST_PLAYER_POSTFIX, WS_MESSAGE_DELIM, PLAYER_0_SENTINEL, MAX_PLAYERS } = project_constants_1.default;
const { PLAYER_PERSON } = project_enums_1.EPlayerStates;
const { GAME_JOINING_1 } = project_enums_1.EGameStates;
const { TO_SERVER_createGame, TO_SERVER_startPeople, TO_SERVER_startMachine, TO_SERVER_joinGame, TO_SERVER_moveSnake, TO_SERVER_moveMachine, TO_SERVER_disconnectBrowser, TO_BROWSER_gameList, TO_BROWSER_startPeople, TO_BROWSER_2_to_tango, TO_BROWSER_advanceBoard, TO_BROWSER_crashTurn, TO_BROWSER_announceWinner, TO_BROWSER_announceTie, TO_BROWSER_announceNames, TO_BROWSER_your_color, TO_BROWSER_all_moves, TO_BROWSER_timeout, TO_BROWSER_missedStart, TO_BROWSER_9_players, TO_BROWSER_startMachine } = project_enums_1.EActions;
function gameList_mw(action, next, state) {
    try {
        const game_names = [];
        state.hosted_games.forEach((hosted_game, game_name) => {
            if (typeof hosted_game !== "undefined") {
                if (hosted_game.game_against === PLAYER_PERSON && hosted_game.game_status === GAME_JOINING_1) {
                    if (typeof game_name !== "undefined") {
                        const players_in_game = playersInGame(state, game_name);
                        if (players_in_game.count() < MAX_PLAYERS) {
                            const user_name = hosted_game.user_name;
                            const game_info = game_name + WS_MESSAGE_DELIM + user_name;
                            game_names.push(game_info);
                        }
                    }
                }
            }
        });
        (0, project_routines_1.sendSocket)(action.web_socket, TO_BROWSER_gameList, game_names);
    }
    catch (e) {
        e.name = "gameList_mw";
        throw e;
    }
}
function joinGame_mw(action, next, state) {
    try {
        const hosted_game = state.hosted_games.get(action.game_name);
        if (hosted_game.game_status === GAME_JOINING_1) {
            if (state.human_players.has(action.uuid_key)) {
                const rejoining_player = state.human_players.get(action.uuid_key);
                action.player_number = rejoining_player.player_number;
                next(action);
            }
            else {
                const players_in_game = playersInGame(state, action.game_name);
                const new_player_number = players_in_game.count() + 1;
                if (new_player_number <= MAX_PLAYERS) {
                    action.player_number = new_player_number;
                    (0, project_routines_1.sendSocket)(action.web_socket, TO_BROWSER_your_color, action.player_number);
                    next(action);
                }
                else {
                    (0, project_routines_1.sendSocket)(action.web_socket, TO_BROWSER_9_players, action.game_name);
                }
            }
        }
        else {
            (0, project_routines_1.sendSocket)(action.web_socket, TO_BROWSER_missedStart, action.game_name);
        }
    }
    catch (e) {
        e.name = "joinGame_mw";
        throw e;
    }
}
function createGame_mw(action, next, state) {
    try {
        if (state.human_players.has(action.uuid_key)) {
            const the_player = state.human_players.get(action.uuid_key);
            const abandoned_game_name = the_player.game_name;
            state.hosted_games = state.hosted_games.delete(abandoned_game_name);
        }
        (0, project_routines_1.sendSocket)(action.web_socket, TO_BROWSER_your_color, 1);
        next(action);
    }
    catch (e) {
        e.name = "createGame_mw";
        throw e;
    }
}
function loadTestPlayerMoves(players_in_game) {
    const canned_moves = [];
    players_in_game.forEach((human_player) => {
        if (typeof human_player !== "undefined") {
            const player_index = human_player.player_number - 1;
            if (human_player.user_name.endsWith(TEST_PLAYER_POSTFIX)) {
                canned_moves[player_index] = true;
            }
            else {
                canned_moves[player_index] = false;
            }
        }
    });
    return canned_moves;
}
function testingVars() {
    let config_testing_vars;
    if (typeof global.CONFIG_TESTING_VARS === "undefined") {
        config_testing_vars = false;
    }
    else {
        config_testing_vars = true;
    }
    return config_testing_vars;
}
function startPeople_mw(action, next, state) {
    try {
        const players_in_game = playersInGame(state, action.game_name);
        if (players_in_game.count() > 1) {
            const canned_moves = loadTestPlayerMoves(players_in_game);
            if ((typeof action.size_of_snake === "number") && (typeof action.turns_in_milli === "number")
                && (typeof action.snake_walls === "boolean")) {
                action.snake_game = (0, game_factory_1.default)(players_in_game.count(), canned_moves, action.size_of_snake, action.snake_walls, action.turns_in_milli);
                const board_json = action.snake_game.jsonBoard();
                const color_index = board_colors_1.BoardColors.randomColors();
                players_in_game.forEach((human_player) => {
                    if (typeof human_player !== "undefined") {
                        const player_number = human_player.player_number;
                        if (typeof action.snake_game !== "undefined") {
                            const snake = action.snake_game.player_snakes.get(player_number);
                            const board_width = action.snake_game.boardWidth();
                            const board_height = action.snake_game.boardHeight();
                            const player_game_info = {
                                board_json,
                                test_moves: snake.test_moves,
                                board_width,
                                board_height,
                                color_index,
                                config_testing_vars: testingVars()
                            };
                            (0, project_routines_1.sendSocket)(human_player.web_socket, TO_BROWSER_startPeople, player_game_info);
                        }
                    }
                });
                action.snake_game.firstMoveTime();
            }
            next(action);
        }
        else {
            (0, project_routines_1.sendSocket)(action.web_socket, TO_BROWSER_2_to_tango, action.game_name);
        }
    }
    catch (e) {
        e.name = "startPeople_mw";
        throw e;
    }
}
function startMachine_mw(action, next, state) {
    try {
        const players_in_game = playersInGame(state, action.game_name);
        const human_player = players_in_game.first();
        const num_computers = Number(action.num_computers);
        const number_players = HUMAN_PLAYER_NUMBER + num_computers;
        const canned_moves = new Array(number_players);
        canned_moves.fill(true);
        const color_index = board_colors_1.BoardColors.randomColors();
        if (!human_player.user_name.endsWith(TEST_PLAYER_POSTFIX)) {
            canned_moves[HUMAN_PLAYER_NUMBER - 1] = false;
        }
        if ((typeof action.size_of_snake === "number") && (typeof action.turns_in_milli === "number")
            && (typeof action.snake_walls === "boolean")) {
            action.snake_game = (0, game_factory_1.default)(number_players, canned_moves, action.size_of_snake, action.snake_walls, action.turns_in_milli);
            const board_json = action.snake_game.jsonBoard();
            const snake = action.snake_game.player_snakes.get(human_player.player_number);
            const board_width = action.snake_game.boardWidth();
            const board_height = action.snake_game.boardHeight();
            const player_game_info = {
                board_height,
                board_json,
                board_width,
                color_index,
                config_testing_vars: testingVars(),
                test_moves: snake.test_moves
            };
            (0, project_routines_1.sendSocket)(human_player.web_socket, TO_BROWSER_startMachine, player_game_info);
            action.snake_game.firstMoveTime();
        }
        next(action);
    }
    catch (e) {
        e.name = "startMachine_mw";
        throw e;
    }
}
function moveSnake_mw(action, next, state) {
    try {
        const the_player = state.human_players.get(action.uuid_key);
        const game_name = the_player.game_name;
        const snake_game = state.current_boards.get(game_name);
        if ((snake_game.board_turn === the_player.user_turn) && (snake_game.board_turn === action.browser_turn)) {
            next(action);
        }
    }
    catch (e) {
        e.name = "moveSnake_mw";
        throw e;
    }
}
function advanceBoard_mw(action, next, state) {
    try {
        const game_name = action.game_name;
        const snake_game = state.current_boards.get(game_name);
        const players_in_game = playersInGame(state, action.game_name);
        const last_board_moves = snake_game.lastBoardMoves();
        players_in_game.forEach((human_player) => {
            if (typeof human_player !== "undefined") {
                (0, project_routines_1.sendSocket)(human_player.web_socket, TO_BROWSER_all_moves, last_board_moves);
            }
        });
        next(action);
    }
    catch (e) {
        e.name = "advanceBoard_mw";
        throw e;
    }
}
function crashTurn_mw(action, next, state) {
    try {
        const game_name = action.game_name;
        const snake_game = state.current_boards.get(game_name);
        const players_in_game = playersInGame(state, action.game_name);
        const crashed_snakes = snake_game.justCrashedSnakes();
        if (crashed_snakes.length > 0) {
            players_in_game.forEach((human_player) => {
                if (typeof human_player !== "undefined") {
                    (0, project_routines_1.sendSocket)(human_player.web_socket, TO_BROWSER_crashTurn, crashed_snakes);
                }
            });
        }
        next(action);
    }
    catch (e) {
        e.name = "crashTurn_mw";
        throw e;
    }
}
function playersInGame(state, action_game_name) {
    try {
        const players_in_game = immutable_1.Seq.Keyed(state.human_players).filter((human_player) => {
            if (typeof human_player !== "undefined") {
                return human_player.game_name === action_game_name;
            }
            return false;
        });
        return players_in_game;
    }
    catch (e) {
        e.name = "playersInGame";
        throw e;
    }
}
function announceWinner_mw(action, next, state) {
    try {
        const winner_number = action.winner_number;
        const players_in_game = playersInGame(state, action.game_name);
        let winner_name = "";
        players_in_game.forEach((human_player) => {
            if (typeof human_player !== "undefined") {
                if (human_player.player_number === winner_number) {
                    winner_name = human_player.user_name;
                }
            }
        });
        players_in_game.forEach((human_player) => {
            const winner_number_str = String(winner_number);
            if (typeof human_player !== "undefined") {
                (0, project_routines_1.sendSocket)(human_player.web_socket, TO_BROWSER_announceWinner, [winner_number_str, winner_name]);
            }
        });
        next(action);
    }
    catch (e) {
        e.name = "announceWinner_mw";
        throw e;
    }
}
function announceTie_mw(action, next, state) {
    try {
        const players_in_game = playersInGame(state, action.game_name);
        players_in_game.forEach((human_player) => {
            if (typeof human_player !== "undefined") {
                (0, project_routines_1.sendSocket)(human_player.web_socket, TO_BROWSER_announceTie, "");
            }
        });
        next(action);
    }
    catch (e) {
        e.name = "announceTie_mw";
        throw e;
    }
}
function announceNames_mw(action, next, state) {
    try {
        const players_in_game = playersInGame(state, action.game_name);
        const player_names = [PLAYER_0_SENTINEL];
        players_in_game.forEach((human_player) => {
            if (typeof human_player !== "undefined") {
                const user_name = human_player.user_name;
                const player_number = human_player.player_number;
                player_names[player_number] = user_name;
            }
        });
        players_in_game.forEach((human_player) => {
            if (typeof human_player !== "undefined") {
                (0, project_routines_1.sendSocket)(human_player.web_socket, TO_BROWSER_announceNames, player_names);
            }
        });
        next(action);
    }
    catch (e) {
        e.name = "announceNames_mw";
        throw e;
    }
}
const snake_middleware = (store) => (next) => (action) => {
    try {
        const state = store.getState();
        if (action.type === TO_SERVER_createGame) {
            createGame_mw(action, next, state);
        }
        else if (action.type === TO_SERVER_joinGame) {
            joinGame_mw(action, next, state);
        }
        else if (action.type === TO_SERVER_startPeople) {
            startPeople_mw(action, next, state);
        }
        else if (action.type === TO_SERVER_startMachine) {
            startMachine_mw(action, next, state);
        }
        else if (action.type === TO_SERVER_moveSnake) {
            moveSnake_mw(action, next, state);
        }
        else if (action.type === TO_SERVER_moveMachine) {
            next(action);
        }
        else if (action.type === TO_SERVER_disconnectBrowser) {
            next(action);
        }
        else if (action.type === TO_BROWSER_gameList) {
            gameList_mw(action, next, state);
        }
        else if (action.type === TO_BROWSER_advanceBoard) {
            advanceBoard_mw(action, next, state);
        }
        else if (action.type === TO_BROWSER_crashTurn) {
            crashTurn_mw(action, next, state);
        }
        else if (action.type === TO_BROWSER_announceWinner) {
            announceWinner_mw(action, next, state);
        }
        else if (action.type === TO_BROWSER_announceTie) {
            announceTie_mw(action, next, state);
        }
        else if (action.type === TO_BROWSER_announceNames) {
            announceNames_mw(action, next, state);
        }
        else {
            console.error("ERROR snake-middleware : unknown action.type = ", action.type);
            process.exit(1);
        }
    }
    catch (e) {
        if (typeof action.web_socket !== "undefined") {
            (0, project_routines_1.sendSocket)(action.web_socket, TO_BROWSER_timeout, e.name);
        }
    }
};
exports.default = snake_middleware;
