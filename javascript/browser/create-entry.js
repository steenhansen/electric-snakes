"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_game = void 0;
const project_routines_1 = require("../project-routines");
const project_enums_1 = require("../types/project-enums");
const game_object_1 = require("./game-object");
require("@babel/polyfill");
const { WAIT_COMPUTER_OPPONENTS_A, WAIT_COMPUTER_START_B, WAIT_COMPUTER_START_C, WAIT_FOR_CHOICE, WAIT_HUMAN_NAMING_1, WAIT_HUMAN_CREATION_2, WAIT_HUMAN_START_3, WAIT_HUMAN_END_4 } = project_enums_1.ECreateStates;
const { TO_SERVER_createGame, TO_SERVER_startPeople, TO_SERVER_startMachine } = project_enums_1.EActions;
const game_board = game_object_1.default.the_game_board;
const create_game = {
    focusOnAName: () => {
        const active_element = document.activeElement;
        if (active_element !== null) {
            const active_name = active_element.id;
            if (active_name !== "game-name" && active_name !== "create-name") {
                (0, project_routines_1.focusById)("game-name");
            }
        }
    },
    visibleHtmlJoin: (new_create_state) => {
        switch (new_create_state) {
            case (WAIT_COMPUTER_OPPONENTS_A):
                (0, project_routines_1.noneById)(["vs-computer", "vs-humans", "join-page"]);
                (0, project_routines_1.blockById)(["computer-opponents"]);
                break;
            case (WAIT_COMPUTER_START_B):
                (0, project_routines_1.noneById)(["size-of-snakes", "speed-of-snakes", "walls-of-snakes", "computer-opponents"]);
                break;
            case (WAIT_COMPUTER_START_C):
                break;
            case (WAIT_FOR_CHOICE):
                (0, project_routines_1.noneById)(["computer-opponents", "name-of-game", "name-of-creator", "create-game",
                    "start-human", "create-color"]);
                (0, project_routines_1.blockById)(["vs-computer", "vs-humans", "join-page", "size-of-snakes", "speed-of-snakes",
                    "walls-of-snakes"]);
                break;
            case (WAIT_HUMAN_NAMING_1):
                (0, project_routines_1.noneById)(["vs-computer", "vs-humans", "join-page", "create-game"]);
                (0, project_routines_1.blockById)(["name-of-game", "name-of-creator"]);
                create_game.focusOnAName();
                break;
            case (WAIT_HUMAN_CREATION_2):
                (0, project_routines_1.blockById)(["name-of-game", "name-of-creator", "create-game"]);
                (0, project_routines_1.noneById)(["start-human"]);
                break;
            case (WAIT_HUMAN_START_3):
                (0, project_routines_1.noneById)(["name-of-game", "name-of-creator", "create-game"]);
                (0, project_routines_1.blockById)(["start-human"]);
                break;
            case (WAIT_HUMAN_END_4):
                (0, project_routines_1.noneById)(["size-of-snakes", "speed-of-snakes", "walls-of-snakes", "start-human"]);
                (0, project_routines_1.blockById)(["create-color"]);
                break;
            default:
                break;
        }
    },
    fixStartCreateHtml: () => {
        create_game.visibleHtmlJoin(WAIT_HUMAN_END_4);
    },
    fixEndCreateHtml: () => {
        create_game.visibleHtmlJoin(WAIT_FOR_CHOICE);
    },
    enableStartButton: () => {
        create_game.visibleHtmlJoin(WAIT_HUMAN_START_3);
        const game_name = (0, project_routines_1.sanitizeInputValue)("game-name");
        (0, project_routines_1.propertyValueSet)("start-human", "innerHTML", "Start " + game_name);
        (0, project_routines_1.propertyValueSet)("start-human", "disabled", false);
    },
    showHumanGame: () => {
        create_game.notEmptyNames();
    },
    // localhost: 3000/create-game?game_name=TEST_GAME&create_name=TEST_PLAYER_1_
    autoFillCreate: () => {
        if (typeof project_routines_1.getUrlParamByName === "function") {
            const game_name = (0, project_routines_1.sanitizeValue)((0, project_routines_1.getUrlParamByName)("game_name"));
            const create_name = (0, project_routines_1.sanitizeValue)((0, project_routines_1.getUrlParamByName)("create_name"));
            if (game_name && create_name) {
                if (typeof create_game.showHumanGame === "function") {
                    create_game.showHumanGame();
                }
                (0, project_routines_1.inputValueSet)("game-name", game_name);
                (0, project_routines_1.inputValueSet)("create-name", create_name);
                create_game.sendCreateGame();
            }
        }
    },
    areNamesEmpty: () => {
        const create_name = (0, project_routines_1.sanitizeInputValue)("create-name");
        const game_name = (0, project_routines_1.sanitizeInputValue)("game-name");
        if (create_name.length === 0 || game_name.length === 0) {
            return true;
        }
        else {
            return false;
        }
    },
    notEmptyNames: () => {
        if (create_game.areNamesEmpty()) {
            create_game.visibleHtmlJoin(WAIT_HUMAN_NAMING_1);
        }
        else {
            create_game.visibleHtmlJoin(WAIT_HUMAN_NAMING_1); // NB for correct hiding/displaying order
            create_game.visibleHtmlJoin(WAIT_HUMAN_CREATION_2);
        }
    },
    showMachineGame: () => {
        create_game.visibleHtmlJoin(WAIT_COMPUTER_OPPONENTS_A);
    },
    sendCreateGame: () => {
        create_game.visibleHtmlJoin(WAIT_HUMAN_START_3);
        try {
            const game_name = (0, project_routines_1.sanitizeInputValue)("game-name");
            const create_name = (0, project_routines_1.sanitizeInputValue)("create-name");
            if (typeof game_board.sendMessage === "function") {
                const message_object = {
                    message_type: TO_SERVER_createGame,
                    uuid_key: game_object_1.default.ws_random_key,
                    game_name,
                    user_name: create_name
                };
                game_board.sendMessage(message_object);
            }
            (0, project_routines_1.propertyValueSet)("start-human", "innerHTML", "Waiting for other player(s) to join " + game_name);
            (0, project_routines_1.propertyValueSet)("start-human", "disabled", true);
        }
        catch (e) {
            console.error("err", e);
        }
    },
    sendStartGame: () => {
        try {
            const game_name = (0, project_routines_1.sanitizeInputValue)("game-name");
            const create_name = (0, project_routines_1.sanitizeInputValue)("create-name");
            const snake_size = document.querySelector("input[name=snake-size]:checked").value;
            const snake_speed = document.querySelector("input[name=snake-speed]:checked").value;
            const snake_walls = document.querySelector("input[name=snake-walls]:checked").value;
            if (typeof game_board.sendMessage === "function") {
                const message_object = {
                    message_type: TO_SERVER_startPeople,
                    uuid_key: game_object_1.default.ws_random_key,
                    game_name,
                    create_name,
                    snake_size,
                    snake_walls,
                    milli_turns: snake_speed
                };
                game_board.sendMessage(message_object);
            }
        }
        catch (e) {
            console.error("err", e);
        }
    },
    sendVersusComputer: (event) => {
        const target_element = event.target;
        const target_id_arr = target_element.id.split("-");
        const num_computers = target_id_arr[1];
        create_game.visibleHtmlJoin(WAIT_COMPUTER_START_B);
        try {
            const game_name = game_object_1.default.ws_random_key + "_" + game_object_1.default.machine_game_count;
            const create_name = game_object_1.default.ws_random_key + "-" + game_object_1.default.machine_game_count;
            const snake_size = document.querySelector("input[name=snake-size]:checked").value;
            const snake_speed = document.querySelector("input[name=snake-speed]:checked").value;
            const snake_walls = document.querySelector("input[name=snake-walls]:checked").value;
            if (typeof game_board.sendMessage === "function") {
                const message_object = {
                    message_type: TO_SERVER_startMachine,
                    uuid_key: game_object_1.default.ws_random_key,
                    game_name,
                    user_name: create_name,
                    num_computer: num_computers,
                    snake_size,
                    snake_walls,
                    milli_turns: snake_speed
                };
                game_board.sendMessage(message_object);
            }
        }
        catch (e) {
            console.error("err", e);
        }
    }
};
exports.create_game = create_game;
create_game.visibleHtmlJoin(WAIT_FOR_CHOICE);
(0, project_routines_1.eventListenerAdd)("create-game", "click", create_game.sendCreateGame);
(0, project_routines_1.eventListenerAdd)("start-human", "click", create_game.sendStartGame);
(0, project_routines_1.eventListenerAdd)("vs-computer", "click", create_game.showMachineGame);
(0, project_routines_1.eventListenerAdd)("vs-humans", "click", create_game.showHumanGame);
(0, project_routines_1.mouseListenerAdd)("computer-1", "click", create_game.sendVersusComputer);
(0, project_routines_1.mouseListenerAdd)("computer-2", "click", create_game.sendVersusComputer);
(0, project_routines_1.mouseListenerAdd)("computer-3", "click", create_game.sendVersusComputer);
(0, project_routines_1.mouseListenerAdd)("computer-4", "click", create_game.sendVersusComputer);
(0, project_routines_1.mouseListenerAdd)("computer-5", "click", create_game.sendVersusComputer);
(0, project_routines_1.mouseListenerAdd)("computer-6", "click", create_game.sendVersusComputer);
(0, project_routines_1.mouseListenerAdd)("computer-7", "click", create_game.sendVersusComputer);
(0, project_routines_1.eventListenerAdd)("create-name", "input", create_game.notEmptyNames);
(0, project_routines_1.eventListenerAdd)("game-name", "input", create_game.notEmptyNames);
game_object_1.default.the_websocket.onopen = () => {
    create_game.autoFillCreate();
};
