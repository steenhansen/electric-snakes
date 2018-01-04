"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EWallTypes;
(function (EWallTypes) {
    EWallTypes["WALL_HORIZONTAL"] = "wall_horizontal";
    EWallTypes["WALL_VERTICAL"] = "wall_vertical";
    EWallTypes["WALL_DIAGONAL"] = "wall_diagonal";
})(EWallTypes = exports.EWallTypes || (exports.EWallTypes = {}));
var EGameStates;
(function (EGameStates) {
    EGameStates[EGameStates["GAME_JOINING_1"] = 0] = "GAME_JOINING_1";
    EGameStates[EGameStates["GAME_PLAYING_2"] = 1] = "GAME_PLAYING_2";
    // GAME_FINISHED_3
})(EGameStates = exports.EGameStates || (exports.EGameStates = {}));
var EPlayerStates;
(function (EPlayerStates) {
    EPlayerStates[EPlayerStates["PLAYER_PERSON"] = 0] = "PLAYER_PERSON";
    EPlayerStates[EPlayerStates["PLAYER_MACHINE"] = 1] = "PLAYER_MACHINE";
})(EPlayerStates = exports.EPlayerStates || (exports.EPlayerStates = {}));
var EJoinStates;
(function (EJoinStates) {
    EJoinStates[EJoinStates["WAIT_JOIN_NAME_GAME_1"] = 0] = "WAIT_JOIN_NAME_GAME_1";
    EJoinStates[EJoinStates["WAIT_JOIN_GAME_2"] = 1] = "WAIT_JOIN_GAME_2";
    EJoinStates[EJoinStates["WAIT_JOIN_START_3"] = 2] = "WAIT_JOIN_START_3";
    EJoinStates[EJoinStates["WAIT_JOIN_PLAYING_4"] = 3] = "WAIT_JOIN_PLAYING_4";
})(EJoinStates = exports.EJoinStates || (exports.EJoinStates = {}));
var ECreateStates;
(function (ECreateStates) {
    ECreateStates[ECreateStates["WAIT_COMPUTER_OPPONENTS_A"] = 0] = "WAIT_COMPUTER_OPPONENTS_A";
    ECreateStates[ECreateStates["WAIT_COMPUTER_START_B"] = 1] = "WAIT_COMPUTER_START_B";
    ECreateStates[ECreateStates["WAIT_COMPUTER_START_C"] = 2] = "WAIT_COMPUTER_START_C";
    ECreateStates[ECreateStates["WAIT_FOR_CHOICE"] = 3] = "WAIT_FOR_CHOICE";
    ECreateStates[ECreateStates["WAIT_HUMAN_NAMING_1"] = 4] = "WAIT_HUMAN_NAMING_1";
    ECreateStates[ECreateStates["WAIT_HUMAN_CREATION_2"] = 5] = "WAIT_HUMAN_CREATION_2";
    ECreateStates[ECreateStates["WAIT_HUMAN_START_3"] = 6] = "WAIT_HUMAN_START_3";
    ECreateStates[ECreateStates["WAIT_HUMAN_END_4"] = 7] = "WAIT_HUMAN_END_4";
})(ECreateStates = exports.ECreateStates || (exports.ECreateStates = {}));
var EMoveTypes;
(function (EMoveTypes) {
    EMoveTypes["DOWN_MOVE"] = "down";
    EMoveTypes["UP_MOVE"] = "up";
    EMoveTypes["LEFT_MOVE"] = "left";
    EMoveTypes["RIGHT_MOVE"] = "right";
    EMoveTypes["CONTINUE_MOVE"] = "continue";
})(EMoveTypes = exports.EMoveTypes || (exports.EMoveTypes = {}));
var EActions;
(function (EActions) {
    EActions["TO_SERVER_createGame"] = "TO_SERVER_createGame";
    EActions["TO_SERVER_startPeople"] = "TO_SERVER_startPeople";
    EActions["TO_SERVER_startMachine"] = "TO_SERVER_startMachine";
    EActions["TO_SERVER_joinGame"] = "TO_SERVER_joinGame";
    EActions["TO_SERVER_moveSnake"] = "TO_SERVER_moveSnake";
    EActions["TO_SERVER_moveMachine"] = "TO_SERVER_moveMachine";
    EActions["TO_SERVER_disconnectBrowser"] = "TO_SERVER_disconnectBrowser";
    EActions["TO_SERVER_gameList"] = "TO_SERVER_gameList";
    EActions["TO_BROWSER_missedStart"] = "TO_BROWSER_missedStart";
    EActions["TO_BROWSER_gameList"] = "TO_BROWSER_gameList";
    EActions["TO_BROWSER_timeout"] = "TO_BROWSER_timeout";
    EActions["TO_BROWSER_startPeople"] = "TO_BROWSER_startPeople";
    EActions["TO_BROWSER_2_to_tango"] = "TO_BROWSER_2_to_tango";
    EActions["TO_BROWSER_9_players"] = "TO_BROWSER_9_players";
    EActions["TO_BROWSER_advanceBoard"] = "TO_BROWSER_advanceBoard";
    EActions["TO_BROWSER_crashTurn"] = "TO_BROWSER_crashTurn";
    EActions["TO_BROWSER_announceWinner"] = "TO_BROWSER_announceWinner";
    EActions["TO_BROWSER_announceTie"] = "TO_BROWSER_announceTie";
    EActions["TO_BROWSER_announceNames"] = "TO_BROWSER_announceNames";
    EActions["TO_BROWSER_your_color"] = "TO_BROWSER_your_color";
    EActions["TO_BROWSER_all_moves"] = "TO_BROWSER_all_moves";
})(EActions = exports.EActions || (exports.EActions = {}));
