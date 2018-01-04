"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_enums_1 = require("../types/project-enums");
const { TO_SERVER_createGame, TO_SERVER_startPeople, TO_SERVER_startMachine, TO_SERVER_joinGame, TO_SERVER_moveSnake, TO_SERVER_moveMachine, TO_SERVER_disconnectBrowser, TO_BROWSER_gameList, TO_BROWSER_advanceBoard, TO_BROWSER_crashTurn, TO_BROWSER_announceWinner, TO_BROWSER_announceTie, TO_BROWSER_announceNames } = project_enums_1.EActions;
function createGame_ac(uuid_key, web_socket, user_name, game_name, register_date) {
    const register_action = {
        game_name,
        register_date,
        type: TO_SERVER_createGame,
        user_name,
        uuid_key,
        web_socket
    };
    return register_action;
}
function startMachine_ac(game_name, register_date, num_computers, size_of_snake, snake_walls, turns_in_milli) {
    const start_action = {
        game_name,
        num_computers,
        register_date,
        size_of_snake,
        snake_walls,
        turns_in_milli,
        type: TO_SERVER_startMachine
    };
    return start_action;
}
function startPeople_ac(web_socket, game_name, create_name, register_date, size_of_snake, snake_walls, turns_in_milli) {
    const start_action = {
        game_name,
        register_date,
        size_of_snake,
        snake_walls,
        turns_in_milli,
        type: TO_SERVER_startPeople,
        user_name: create_name,
        web_socket
    };
    return start_action;
}
function gameList_ac(uuid_key, web_socket) {
    const game_names_action = {
        type: TO_BROWSER_gameList,
        uuid_key,
        web_socket
    };
    return game_names_action;
}
function moveMachine_ac(game_name) {
    const move_machine_action = {
        game_name,
        type: TO_SERVER_moveMachine
    };
    return move_machine_action;
}
function disconnectBrowser_ac(uuid_key) {
    const disconnect_action = {
        type: TO_SERVER_disconnectBrowser,
        uuid_key
    };
    return disconnect_action;
}
function advanceBoard_ac(game_name) {
    const advance_action = {
        game_name,
        type: TO_BROWSER_advanceBoard
    };
    return advance_action;
}
function crashTurn_ac(game_name) {
    const advance_action = {
        game_name,
        type: TO_BROWSER_crashTurn
    };
    return advance_action;
}
function joinGame_ac(uuid_key, web_socket, user_name, game_name) {
    const join_action = {
        game_name,
        type: TO_SERVER_joinGame,
        user_name,
        uuid_key,
        web_socket
    };
    return join_action;
}
function moveSnake_ac(uuid_key, user_move, browser_turn) {
    const move_action = {
        browser_turn,
        type: TO_SERVER_moveSnake,
        user_move,
        uuid_key
    };
    return move_action;
}
function announceWinner_ac(game_name, winner_number) {
    const winner_action = {
        game_name,
        type: TO_BROWSER_announceWinner,
        winner_number
    };
    return winner_action;
}
function announceTie_ac(game_name) {
    const tie_action = {
        game_name,
        type: TO_BROWSER_announceTie
    };
    return tie_action;
}
function announceNames_ac(game_name) {
    const name_action = {
        game_name,
        type: TO_BROWSER_announceNames
    };
    return name_action;
}
const action_types = {
    advanceBoard_ac,
    announceNames_ac,
    announceTie_ac,
    announceWinner_ac,
    crashTurn_ac,
    createGame_ac,
    disconnectBrowser_ac,
    gameList_ac,
    joinGame_ac,
    moveMachine_ac,
    moveSnake_ac,
    startMachine_ac,
    startPeople_ac
};
exports.default = action_types;
