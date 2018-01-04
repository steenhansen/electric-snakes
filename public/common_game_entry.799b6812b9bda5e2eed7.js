/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonpGLOBAL_WEBPACK__name_"];
/******/ 	window["webpackJsonpGLOBAL_WEBPACK__name_"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + {"0":"ecddbd5e33b236e64ca2","1":"0e8abeed7d88f5510862"}[chunkId] + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const project_constants = {
    AVERAGE_SNAKE_SPEED: 100,
    CTX_WALL_COLOR: "black",
    DEFAULT_PORT: 3000,
    EMPTY_INDEX_COLOR: 0,
    FAST_SNAKE_SPEED: 25,
    HUMAN_PLAYER_NUMBER: 1,
    INIT_REDUX_ACTION: "@@redux/INIT",
    LARGE_SNAKE_SIZE: 30,
    LEFT_HAND_UDLR_KEYS: [87, 83, 65, 68] // 'wsad'
    ,
    MAX_PLAYERS: 8,
    MEDIUM_SNAKE_SIZE: 20,
    MOVE_SEND_INTERVAL: 50,
    NON_EXISTANT_XY: -1,
    ONE_SECOND: 1001,
    PLAYER_0_SENTINEL: "_no_player_0_",
    RIGHT_HAND_UDLR_KEYS: [38, 40, 37, 39] // arrows: up, down,left,right
    ,
    SECONDS_COUNT_DOWN: 3 // TESTING_SECONDS_COUNT_DOWN
    ,
    SLOW_SNAKE_SPEED: 150,
    TEST_PLAYER_POSTFIX: "_",
    TILE_PIXEL_SIZE: 10,
    TIME_OUT_SECONDS: 3600 // TESTING_TIME_OUT_SECONDS
    ,
    TINY_SNAKE_SIZE: 5,
    WALL_INDEX_COLOR: 9,
    WS_MESSAGE_DELIM: ","
};
exports.default = project_constants;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
const global_test_config_1 = __webpack_require__(3);
const project_constants_1 = __webpack_require__(0);
const project_enums_1 = __webpack_require__(1);
const { TINY_SNAKE_SIZE, MEDIUM_SNAKE_SIZE, LARGE_SNAKE_SIZE, SLOW_SNAKE_SPEED, AVERAGE_SNAKE_SPEED, FAST_SNAKE_SPEED } = project_constants_1.default;
const { DOWN_MOVE, UP_MOVE, LEFT_MOVE, RIGHT_MOVE, CONTINUE_MOVE } = project_enums_1.EMoveTypes;
exports.sendSocket = (user_websocket, message_type, message_data) => {
    const socket_data = {
        data: message_data,
        message_type
    };
    const json_data = JSON.stringify(socket_data);
    try {
        user_websocket.send(json_data);
    }
    catch (e) {
        console.error("sendSocket error", e.message, socket_data, user_websocket);
    }
};
function dateInSeconds() {
    const date_seconds = Number(new Date());
    return Math.floor(date_seconds / 1000);
}
exports.dateInSeconds = dateInSeconds;
function mouseListenerAdd(id_name, event_type, event_function) {
    const event_element = document.getElementById(id_name);
    event_element.addEventListener(event_type, event_function, false);
}
exports.mouseListenerAdd = mouseListenerAdd;
function eventListenerAdd(id_name, event_type, event_function) {
    const event_element = document.getElementById(id_name);
    event_element.addEventListener(event_type, event_function, false);
}
exports.eventListenerAdd = eventListenerAdd;
function hiddenById(element_ids) {
    for (const element_id of element_ids) {
        document.getElementById(element_id).style.visibility = "hidden";
    }
}
exports.hiddenById = hiddenById;
function visibleById(element_ids) {
    for (const element_id of element_ids) {
        document.getElementById(element_id).style.visibility = "visible";
    }
}
exports.visibleById = visibleById;
function displayInlineById(element_ids) {
    for (const element_id of element_ids) {
        document.getElementById(element_id).style.display = "inline";
    }
}
exports.displayInlineById = displayInlineById;
function displayBlockById(element_ids) {
    for (const element_id of element_ids) {
        document.getElementById(element_id).style.display = "block";
    }
}
exports.displayBlockById = displayBlockById;
function displayNoneById(element_ids) {
    for (const element_id of element_ids) {
        document.getElementById(element_id).style.display = "none";
    }
}
exports.displayNoneById = displayNoneById;
function focusById(element_id) {
    document.getElementById(element_id).focus();
}
exports.focusById = focusById;
function getUrlParamByName(get_name) {
    const get_match = RegExp("[?&]" + get_name + "=([^&]*)").exec(window.location.search);
    if (get_match) {
        const get_value = decodeURIComponent(get_match[1].replace(/\+/g, " "));
        if (get_value !== "") {
            return get_value;
        }
    }
    return "";
}
exports.getUrlParamByName = getUrlParamByName;
function never_needTwoToTango(name) {
    console.error("IMPOSSIBLE TESTING ONLY, we need two people to have a human game", name);
}
exports.never_needTwoToTango = never_needTwoToTango;
function never_nineMakesACrowd(name) {
    console.error("IMPOSSIBLE TESTING ONLY, we somehow have a nine-player game", name);
}
exports.never_nineMakesACrowd = never_nineMakesACrowd;
function colorTextSpan(rgb_color, text) {
    const colored_text = " <span style='color: " + rgb_color + "'>" + text + "</span> ";
    return colored_text;
}
exports.colorTextSpan = colorTextSpan;
function upDownLeftRight(key_code, left_udlr_keys, right_udlr_keys) {
    let direction = CONTINUE_MOVE;
    if ((key_code === left_udlr_keys[0]) || (key_code === right_udlr_keys[0])) {
        direction = UP_MOVE;
    }
    else if ((key_code === left_udlr_keys[1]) || (key_code === right_udlr_keys[1])) {
        direction = DOWN_MOVE;
    }
    else if ((key_code === left_udlr_keys[2]) || (key_code === right_udlr_keys[2])) {
        direction = LEFT_MOVE;
    }
    else if ((key_code === left_udlr_keys[3]) || (key_code === right_udlr_keys[3])) {
        direction = RIGHT_MOVE;
    }
    return direction;
}
exports.upDownLeftRight = upDownLeftRight;
// No semi-colon typescript error is fixed with two steps
// https: //stackoverflow.com/questions/43032004/queryselector-in-typescript
function inputValueSet(element_id, element_value) {
    const input_element = document.getElementById(element_id);
    input_element.value = element_value;
}
exports.inputValueSet = inputValueSet;
// Stop Object is possibly "null" typescript error
function propertyValueSet(element_id, attribute_name, attribute_value) {
    const input_element = document.getElementById(element_id);
    input_element[attribute_name] = attribute_value;
}
exports.propertyValueSet = propertyValueSet;
// Stop Object is possibly "null" typescript error on setting styles
function styleValueSet(element_id, style_name, style_value) {
    const input_element = document.getElementById(element_id);
    input_element.style[style_name] = style_value;
}
exports.styleValueSet = styleValueSet;
function getArgByIndex(arg_index) {
    if (process.argv[arg_index]) {
        const the_args = process.argv[arg_index].split("=");
        return the_args;
    }
    else {
        return ["", ""];
    }
}
exports.getArgByIndex = getArgByIndex;
function setUpTesting() {
    const [arg_type, arg_value] = getArgByIndex(2);
    if (arg_type === "testing") {
        if (arg_value === "true") {
            return global_test_config_1.default;
        }
    }
    return undefined;
}
exports.setUpTesting = setUpTesting;
function decodeSnakeSize(create_snake_size) {
    let game_snake_size = LARGE_SNAKE_SIZE;
    if (create_snake_size === "tiny") {
        game_snake_size = TINY_SNAKE_SIZE;
    }
    else if (create_snake_size === "medium") {
        game_snake_size = MEDIUM_SNAKE_SIZE;
    }
    return game_snake_size;
}
exports.decodeSnakeSize = decodeSnakeSize;
function decodeSnakeSpeed(create_snake_speed) {
    let game_snake_speed = FAST_SNAKE_SPEED;
    if (create_snake_speed === "slow") {
        game_snake_speed = SLOW_SNAKE_SPEED;
    }
    else if (create_snake_speed === "average") {
        game_snake_speed = AVERAGE_SNAKE_SPEED;
    }
    return game_snake_speed;
}
exports.decodeSnakeSpeed = decodeSnakeSpeed;
function decodeSnakeWalls(create_snake_walls) {
    let game_snake_walls = false;
    if (create_snake_walls === "random") {
        game_snake_walls = true;
    }
    return game_snake_walls;
}
exports.decodeSnakeWalls = decodeSnakeWalls;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const SNAKE_TEST_CONFIG = {
    TESTING_BOARD_COLOR: 0,
    TESTING_BOARD_INDEX: 2,
    TESTING_SECONDS_COUNT_DOWN: 1,
    TESTING_TIME_OUT_SECONDS: 30 // constant TIME_OUT_SECONDS = 3600
};
exports.default = SNAKE_TEST_CONFIG;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const board_colors_1 = __webpack_require__(7);
const global_test_config_1 = __webpack_require__(3);
const project_constants_1 = __webpack_require__(0);
const project_routines_1 = __webpack_require__(2);
const project_enums_1 = __webpack_require__(1);
const browser_variables_1 = __webpack_require__(9);
const draw_board_1 = __webpack_require__(10);
const { SECONDS_COUNT_DOWN, ONE_SECOND, WS_MESSAGE_DELIM, LEFT_HAND_UDLR_KEYS, RIGHT_HAND_UDLR_KEYS } = project_constants_1.default;
const { CONTINUE_MOVE } = project_enums_1.EMoveTypes;
const { TO_BROWSER_startPeople, TO_BROWSER_all_moves, TO_SERVER_moveSnake, TO_BROWSER_announceWinner, TO_BROWSER_announceTie, TO_BROWSER_your_color, TO_BROWSER_crashTurn, TO_BROWSER_announceNames, TO_BROWSER_9_players, TO_BROWSER_gameList, TO_BROWSER_2_to_tango, TO_BROWSER_timeout, TO_BROWSER_missedStart } = project_enums_1.EActions;
const game_board = {
    live_colors: [],
    draw_board: {},
    show_players_data: [],
    showPlayers: (all_players) => {
        if (!browser_variables_1.default.game_started) {
            if (typeof window.GLOBAL_WEBPACK.create_game_entry === "object") {
                window.GLOBAL_WEBPACK.create_game_entry.create_game.enableStartButton();
            }
            let players_html = "";
            let user_name;
            for (let index = 1; index < all_players.length; index++) {
                if (typeof game_board.live_colors[0] === "undefined") {
                    user_name = all_players[index];
                }
                else {
                    const rgb_color = game_board.live_colors[index];
                    const plain_name = all_players[index];
                    user_name = project_routines_1.colorTextSpan(rgb_color, plain_name);
                }
                players_html = players_html + "<div> Player # " + index + " - " + user_name + "</div>";
            }
            project_routines_1.propertyValueSet("game-names", "innerHTML", players_html);
        }
    },
    initializeGame: (player_game_info) => {
        const board_colors = board_colors_1.BoardColors.colorSet(player_game_info.color_index);
        const tile_size = browser_variables_1.default.tile_size;
        draw_board_1.DrawBoard.initializeDraw(tile_size, board_colors);
        game_board.draw_board = draw_board_1.DrawBoard;
        game_board.live_colors = board_colors;
        game_board.showPlayers(game_board.show_players_data);
        game_board.fixStartHtml();
        browser_variables_1.default.game_started = false;
        browser_variables_1.default.game_over = false;
        browser_variables_1.default.browser_turn = 0;
        if (player_game_info.config_testing_vars) {
            browser_variables_1.default.seconds_count_down = global_test_config_1.default.TESTING_SECONDS_COUNT_DOWN;
        }
        else {
            browser_variables_1.default.seconds_count_down = SECONDS_COUNT_DOWN;
        }
        browser_variables_1.default.count_down = browser_variables_1.default.seconds_count_down;
        if (Array.isArray(player_game_info.test_moves)) {
            browser_variables_1.default.test_moves = player_game_info.test_moves;
        }
        game_board.enableKeys();
        browser_variables_1.default.next_key_move = CONTINUE_MOVE;
        game_board.draw_board.drawCanvas(player_game_info);
        project_routines_1.styleValueSet("board-container", "display", "");
        project_routines_1.propertyValueSet("game-results", "innerHTML", "");
        game_board.countDownStart();
    },
    enableKeys: () => {
        document.addEventListener("keydown", (event) => {
            const key_code = event.keyCode;
            const key_move_direction = project_routines_1.upDownLeftRight(key_code, LEFT_HAND_UDLR_KEYS, RIGHT_HAND_UDLR_KEYS);
            browser_variables_1.default.next_key_move = key_move_direction;
        });
    },
    countDownStart: () => {
        const player_color = game_board.live_colors[browser_variables_1.default.your_player_number];
        const container_border_style = browser_variables_1.default.tile_size / 2 + "px solid " + player_color;
        project_routines_1.styleValueSet("board-container", "border", container_border_style);
        browser_variables_1.default.count_down_func_id = window.setInterval(game_board.showCountDown, ONE_SECOND);
        const count_down_milliseconds = ONE_SECOND * (browser_variables_1.default.seconds_count_down + 1);
        setTimeout(game_board.startGame, count_down_milliseconds);
    },
    showCountDown: () => {
        const element = document.getElementById("count-downer");
        if (browser_variables_1.default.count_down === browser_variables_1.default.seconds_count_down) {
            element.classList.add("my-count");
            game_board.playerColorElement("count-downer");
        }
        if (browser_variables_1.default.count_down < 1) {
            element.innerHTML = "";
            element.classList.remove("my-count");
            window.clearTimeout(browser_variables_1.default.count_down_func_id);
        }
        else {
            element.innerHTML = browser_variables_1.default.count_down.toString();
        }
        browser_variables_1.default.count_down = browser_variables_1.default.count_down - 1;
    },
    startGame: () => {
        browser_variables_1.default.game_started = true;
        browser_variables_1.default.sample_keys_func_id = window.setInterval(game_board.sendMoveToServer, browser_variables_1.default.send_move_interval);
    },
    showAllMoves: (all_moves) => {
        browser_variables_1.default.browser_turn = browser_variables_1.default.browser_turn + 1;
        if (typeof browser_variables_1.default.the_game_board.draw_board.drawMoves === "function") {
            browser_variables_1.default.the_game_board.draw_board.drawMoves(all_moves);
        }
    },
    showWinner: (winner_data) => {
        game_board.readyForGame();
        const winner_number_str = winner_data[0];
        const winner_number = Number(winner_number_str);
        const winner_name = winner_data[1];
        let win_message;
        if (winner_number === browser_variables_1.default.your_player_number) {
            const your_color = game_board.live_colors[browser_variables_1.default.your_player_number];
            win_message = project_routines_1.colorTextSpan(your_color, "You are the Winner!");
        }
        else {
            const enemy_color = game_board.live_colors[winner_number];
            const colored_number = project_routines_1.colorTextSpan(enemy_color, winner_number_str);
            const colored_name = project_routines_1.colorTextSpan(enemy_color, winner_name);
            win_message = "You lose. " + colored_name + "player # " + colored_number + "is the winner.";
        }
        project_routines_1.propertyValueSet("game-results", "innerHTML", win_message);
        game_board.fixEndHtml();
    },
    fixStartHtml: () => {
        if (typeof window.GLOBAL_WEBPACK.create_game_entry === "object") {
            window.GLOBAL_WEBPACK.create_game_entry.create_game.fixStartCreateHtml();
            game_board.playerColorElement("create-color");
        }
        else if (typeof window.GLOBAL_WEBPACK.join_game_entry === "object") {
            window.GLOBAL_WEBPACK.join_game_entry.join_game.fixStartJoinHtml();
            game_board.playerColorElement("join-color");
        }
    },
    fixEndHtml: () => {
        if (typeof window.GLOBAL_WEBPACK.create_game_entry === "object") {
            window.GLOBAL_WEBPACK.create_game_entry.create_game.fixEndCreateHtml();
        }
        else if (typeof window.GLOBAL_WEBPACK.join_game_entry === "object") {
            window.GLOBAL_WEBPACK.join_game_entry.join_game.fixEndJoinHtml();
        }
    },
    readyForGame: () => {
        window.clearInterval(browser_variables_1.default.sample_keys_func_id);
        browser_variables_1.default.game_over = true;
        browser_variables_1.default.game_started = false;
        browser_variables_1.default.browser_turn = 0;
    },
    showTie: () => {
        game_board.readyForGame();
        project_routines_1.propertyValueSet("game-results", "innerHTML", "we have a tie !");
        game_board.fixEndHtml();
    },
    playerColorElement: (element_id) => {
        const player_color = game_board.live_colors[browser_variables_1.default.your_player_number];
        project_routines_1.styleValueSet(element_id, "color", player_color);
    },
    setPlayerNumber: (player_number) => {
        browser_variables_1.default.your_player_number = player_number;
    },
    moveToServer: (move_direction) => {
        if (!browser_variables_1.default.game_over) {
            try {
                const message_object = {
                    browser_turn: browser_variables_1.default.browser_turn,
                    message_type: TO_SERVER_moveSnake,
                    move_direction,
                    uuid_key: browser_variables_1.default.ws_random_key
                };
                game_board.sendMessage(message_object);
            }
            catch (e) {
                console.error("err", e);
            }
        }
    },
    sendMoveToServer: () => {
        let next_move = browser_variables_1.default.next_key_move;
        if (browser_variables_1.default.test_moves.length > 0) {
            if (browser_variables_1.default.test_moves.length === browser_variables_1.default.browser_turn) {
                browser_variables_1.default.test_moves = browser_variables_1.default.test_moves.concat(browser_variables_1.default.test_moves);
            }
            const next_canned_move = browser_variables_1.default.test_moves[browser_variables_1.default.browser_turn];
            if (browser_variables_1.default.next_key_move === CONTINUE_MOVE) {
                next_move = next_canned_move;
            }
            else {
                next_move = browser_variables_1.default.next_key_move;
                browser_variables_1.default.next_key_move = CONTINUE_MOVE;
            }
        }
        game_board.moveToServer(next_move);
    },
    sendMessage: (message_object) => {
        const message = JSON.stringify(message_object);
        if (typeof browser_variables_1.default.the_websocket.send === "function") {
            browser_variables_1.default.the_websocket.send(message);
        }
    }
};
browser_variables_1.default.the_websocket.onclose = () => {
    browser_variables_1.default.the_websocket.send = null;
};
browser_variables_1.default.the_websocket.onmessage = (event) => {
    const json_obj = JSON.parse(event.data);
    const the_message = json_obj.message_type;
    const player_game_info = json_obj.data;
    if (the_message === TO_BROWSER_startPeople) {
        game_board.initializeGame(player_game_info);
    }
    else if (the_message === TO_BROWSER_all_moves) {
        game_board.showAllMoves(player_game_info);
    }
    else if (the_message === TO_BROWSER_announceWinner) {
        game_board.showWinner(player_game_info);
    }
    else if (the_message === TO_BROWSER_announceTie) {
        game_board.showTie();
    }
    else if (the_message === TO_BROWSER_your_color) {
        game_board.setPlayerNumber(player_game_info);
    }
    else if (the_message === TO_BROWSER_crashTurn) {
        game_board.draw_board.drawCrashes(player_game_info);
    }
    else if (the_message === TO_BROWSER_announceNames) {
        game_board.show_players_data = player_game_info;
        game_board.showPlayers(player_game_info);
    }
    else if (the_message === TO_BROWSER_2_to_tango) {
        project_routines_1.never_needTwoToTango(player_game_info);
    }
    else if (the_message === TO_BROWSER_9_players) {
        project_routines_1.never_nineMakesACrowd(player_game_info);
    }
    else if (the_message === TO_BROWSER_timeout) {
        project_routines_1.styleValueSet("timed-out", "display", "block");
    }
    else if (the_message === TO_BROWSER_gameList) {
        if (typeof window.GLOBAL_WEBPACK.join_game_entry === "object") {
            window.GLOBAL_WEBPACK.join_game_entry.join_game.showJoinGames(player_game_info);
        }
    }
    else if (the_message === TO_BROWSER_missedStart) {
        if (typeof window.GLOBAL_WEBPACK.join_game_entry === "object") {
            window.GLOBAL_WEBPACK.join_game_entry.join_game.missedStart(player_game_info);
        }
    }
    else {
        console.error("ERROR game-objects :  unknown message = ", the_message);
    }
};
browser_variables_1.default.the_game_board = game_board;
exports.default = browser_variables_1.default;


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const project_constants_1 = __webpack_require__(0);
const project_enums_1 = __webpack_require__(1);
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const project_constants_1 = __webpack_require__(0);
const { WS_MESSAGE_DELIM, CTX_WALL_COLOR } = project_constants_1.default;
const board_canvas = document.getElementById("board-container");
const ctx = board_canvas.getContext("2d");
const DrawBoard = {
    tile_size: 123,
    live_colors: [],
    initializeDraw: (tile_size, board_colors) => {
        DrawBoard.tile_size = tile_size;
        DrawBoard.live_colors = board_colors;
    },
    drawCanvas: (the_data) => {
        board_canvas.width = the_data.board_width * DrawBoard.tile_size;
        board_canvas.height = the_data.board_height * DrawBoard.tile_size;
        if (typeof DrawBoard.drawGrid === "function") {
            DrawBoard.drawGrid(the_data.board_json);
        }
    },
    drawSquares: (start_x, start_y, end_x, end_y) => {
        const middle_square = DrawBoard.tile_size / 2;
        let spacer = 1;
        do {
            ctx.beginPath();
            ctx.moveTo(start_x + spacer, start_y + spacer);
            ctx.lineTo(end_x - spacer, start_y + spacer);
            ctx.lineTo(end_x - spacer, end_y - spacer);
            ctx.lineTo(start_x + spacer, end_y - spacer);
            ctx.lineTo(start_x + spacer, start_y + spacer);
            ctx.stroke();
            spacer += 2;
        } while (spacer < middle_square);
    },
    drawCrashes: (crash_list) => {
        DrawBoard.drawMoves(crash_list);
        ctx.strokeStyle = CTX_WALL_COLOR;
        for (let index = crash_list.length - 1; index >= 0; index--) {
            const player_move = crash_list[index];
            const move_arr = player_move.split(WS_MESSAGE_DELIM);
            const x = parseInt(move_arr[0], 10);
            const y = parseInt(move_arr[1], 10);
            const start_x = x * DrawBoard.tile_size + 1;
            const start_y = y * DrawBoard.tile_size + 1;
            const end_x = ((x + 1) * DrawBoard.tile_size) - 1;
            const end_y = ((y + 1) * DrawBoard.tile_size) - 1;
            DrawBoard.drawSquares(start_x, start_y, end_x, end_y);
        }
    },
    drawGrid: (json_obj) => {
        for (let row = json_obj.length - 1; row >= 0; row--) {
            for (let column = json_obj[row].length - 1; column >= 0; column--) {
                const color_index = json_obj[row][column];
                DrawBoard.drawTile(column, row, color_index);
            }
        }
    },
    drawTile: (column, row, color_index) => {
        ctx.fillStyle = DrawBoard.live_colors[color_index];
        const start_x = column * DrawBoard.tile_size;
        const start_y = row * DrawBoard.tile_size;
        ctx.fillRect(start_x, start_y, DrawBoard.tile_size, DrawBoard.tile_size);
    },
    drawMoves: (test_moves) => {
        for (let index = test_moves.length - 1; index >= 0; index--) {
            const player_move = test_moves[index];
            const move_arr = player_move.split(WS_MESSAGE_DELIM);
            const x = parseInt(move_arr[0], 10);
            const y = parseInt(move_arr[1], 10);
            const color_index = parseInt(move_arr[2], 10);
            DrawBoard.drawTile(x, y, color_index);
        }
    }
};
exports.DrawBoard = DrawBoard;


/***/ })
/******/ ]);