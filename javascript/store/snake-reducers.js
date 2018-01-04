"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const canned_moves_1 = require("../game/canned-moves");
const project_constants_1 = require("../types/project-constants");
const project_enums_1 = require("../types/project-enums");
const { HUMAN_PLAYER_NUMBER, INIT_REDUX_ACTION } = project_constants_1.default;
const { GAME_JOINING_1, GAME_PLAYING_2 } = project_enums_1.EGameStates;
const { PLAYER_PERSON, PLAYER_MACHINE } = project_enums_1.EPlayerStates;
const { TO_SERVER_createGame, TO_SERVER_startPeople, TO_SERVER_moveMachine, TO_SERVER_joinGame, TO_SERVER_disconnectBrowser, TO_BROWSER_advanceBoard, TO_SERVER_moveSnake, TO_BROWSER_announceWinner, TO_BROWSER_announceTie, TO_SERVER_startMachine, TO_BROWSER_crashTurn, TO_BROWSER_announceNames } = project_enums_1.EActions;
function createGame_rd(state, action) {
    const { uuid_key, web_socket, user_name, game_name, register_date } = action;
    const register_player = {
        game_name,
        player_number: 1,
        user_name,
        user_turn: 0,
        web_socket
    };
    state.human_players = state.human_players.set(uuid_key, register_player);
    const register_game = {
        user_name,
        game_date: register_date,
        game_against: PLAYER_PERSON,
        game_status: GAME_JOINING_1
    };
    state.hosted_games = state.hosted_games.set(game_name, register_game);
    return state;
}
function startMachine_rd(state, action) {
    const machine_game = {
        game_date: action.register_date,
        game_status: GAME_PLAYING_2,
        user_name: "A-Machine-Game",
        game_against: PLAYER_MACHINE
    };
    state.hosted_games = state.hosted_games.set(action.game_name, machine_game);
    if (typeof action.snake_game !== "undefined") {
        state.current_boards = state.current_boards.set(action.game_name, action.snake_game);
    }
    const machine_player = {
        machine_turn: 0
    };
    state.machine_players = state.machine_players.set(action.game_name, machine_player);
    return state;
}
function startPeople_rd(state, action) {
    const hosted_game = {
        game_date: action.register_date,
        game_against: PLAYER_PERSON,
        user_name: action.user_name,
        game_status: GAME_PLAYING_2
    };
    state.hosted_games = state.hosted_games.set(action.game_name, hosted_game);
    if (typeof action.snake_game !== "undefined") {
        state.current_boards = state.current_boards.set(action.game_name, action.snake_game);
    }
    return state;
}
function moveSnake_rd(state, action) {
    const uuid_key = action.uuid_key;
    if (action.user_move) {
        const user_move = action.user_move;
        const the_player = state.human_players.get(uuid_key);
        the_player.user_turn = the_player.user_turn + 1;
        state.human_players = state.human_players.set(uuid_key, the_player);
        const game_name = the_player.game_name;
        const player_number = the_player.player_number;
        const snake_game = state.current_boards.get(game_name);
        snake_game.snakeMove(player_number, user_move);
        state.current_boards = state.current_boards.set(game_name, snake_game);
    }
    return state;
}
function moveMachine_rd(state, action) {
    const game_name = action.game_name;
    const the_machine = state.machine_players.get(game_name);
    the_machine.machine_turn = the_machine.machine_turn + 1;
    state.machine_players = state.machine_players.set(game_name, the_machine);
    const snake_game = state.current_boards.get(game_name);
    snake_game.player_snakes.forEach((machine_board_player, player_number) => {
        if (typeof player_number === "number") {
            if (player_number !== HUMAN_PLAYER_NUMBER) {
                if (typeof machine_board_player !== "undefined") {
                    if (machine_board_player.test_moves.length === machine_board_player.turn_number) {
                        const canned_test_moves = canned_moves_1.default();
                        machine_board_player.test_moves = machine_board_player.test_moves.concat(canned_test_moves);
                    }
                    const the_machine_move = machine_board_player.test_moves[machine_board_player.turn_number];
                    snake_game.snakeMove(player_number, the_machine_move);
                }
            }
        }
    });
    state.current_boards = state.current_boards.set(game_name, snake_game);
    return state;
}
function removeGame(state, game_name) {
    const isHumanPlayer = (human_player) => {
        if (typeof human_player === "undefined") {
            return false;
        }
        else {
            return (human_player.game_name === game_name);
        }
    };
    if (typeof state.human_players !== "undefined") {
        const players_in_game = immutable_1.Seq.Keyed(state.human_players).filter(isHumanPlayer);
        players_in_game.forEach((human_player, uuid_key) => {
            if (typeof uuid_key === "string") {
                state.human_players = state.human_players.delete(uuid_key);
            }
        });
    }
    state.hosted_games = state.hosted_games.delete(game_name);
    state.current_boards = state.current_boards.delete(game_name);
    state.machine_players = state.machine_players.delete(game_name);
    return state;
}
function disconnectBrowser_rd(state, action) {
    state.human_players = state.human_players.delete(action.uuid_key);
    return state;
}
function joinGame_rd(state, action) {
    const { uuid_key, web_socket, user_name, game_name, player_number } = action;
    const join_player = {
        user_name,
        game_name,
        player_number,
        web_socket,
        user_turn: 0
    };
    state.human_players = state.human_players.set(uuid_key, join_player);
    return state;
}
function advanceBoard_rd(state, action) {
    const snake_game = state.current_boards.get(action.game_name);
    snake_game.advanceBoardTurn();
    state.current_boards = state.current_boards.set(action.game_name, snake_game);
    return state;
}
function crashTurn_rd(state, action) {
    return state;
}
function announceNames_rd(state, action) {
    return state;
}
function announceWinner_rd(state, action) {
    return removeGame(state, action.game_name);
}
function announceTie_rd(state, action) {
    return removeGame(state, action.game_name);
}
function reducer(state, action) {
    switch (action.type) {
        case INIT_REDUX_ACTION:
            return state;
        case TO_SERVER_createGame:
            return createGame_rd(state, action);
        case TO_SERVER_joinGame:
            return joinGame_rd(state, action);
        case TO_SERVER_startMachine:
            return startMachine_rd(state, action);
        case TO_SERVER_startPeople:
            return startPeople_rd(state, action);
        case TO_SERVER_moveSnake:
            return moveSnake_rd(state, action);
        case TO_SERVER_moveMachine:
            return moveMachine_rd(state, action);
        case TO_SERVER_disconnectBrowser:
            return disconnectBrowser_rd(state, action);
        case TO_BROWSER_advanceBoard:
            return advanceBoard_rd(state, action);
        case TO_BROWSER_announceWinner:
            return announceWinner_rd(state, action);
        case TO_BROWSER_announceTie:
            return announceTie_rd(state, action);
        case TO_BROWSER_announceNames:
            return announceNames_rd(state, action);
        case TO_BROWSER_crashTurn:
            return crashTurn_rd(state, action);
        default:
            console.error("ERROR snake-reducer : unknown action = ", action);
            return state;
    }
}
exports.default = reducer;
