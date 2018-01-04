var GLOBAL_WEBPACK = GLOBAL_WEBPACK || {}; GLOBAL_WEBPACK["join_game_entry"] =
webpackJsonpGLOBAL_WEBPACK__name_([0],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const project_constants_1 = __webpack_require__(0);
const project_routines_1 = __webpack_require__(2);
const project_enums_1 = __webpack_require__(1);
const game_object_1 = __webpack_require__(4);
const { WAIT_JOIN_NAME_GAME_1, WAIT_JOIN_GAME_2, WAIT_JOIN_START_3, WAIT_JOIN_PLAYING_4 } = project_enums_1.EJoinStates;
const { TO_SERVER_joinGame, TO_SERVER_gameList } = project_enums_1.EActions;
const { ONE_SECOND, WS_MESSAGE_DELIM } = project_constants_1.default;
const game_board = game_object_1.default.the_game_board;
const join_game = {
    refresh_func_id: 0,
    selected_game: "",
    missedStart: (missed_game_name) => {
        join_game.visibleHtmlJoin(WAIT_JOIN_NAME_GAME_1);
    },
    areNamesEmpty: () => {
        const join_name = document.getElementById("join-name").value;
        const join_trimmed = join_name.trim();
        const game_name = document.getElementById("game-name").value;
        const game_trimmed = game_name.trim();
        if (game_trimmed.length === 0 || join_trimmed.length === 0) {
            return true;
        }
        else {
            join_game.selected_game = game_trimmed;
            return false;
        }
    },
    notEmptyNames: () => {
        if (join_game.areNamesEmpty()) {
            join_game.visibleHtmlJoin(WAIT_JOIN_NAME_GAME_1);
        }
        else {
            join_game.visibleHtmlJoin(WAIT_JOIN_GAME_2);
        }
    },
    visibleHtmlJoin: (new_join_state) => {
        project_routines_1.displayNoneById(["join-game", "waiting-for-start", "join-color"]);
        project_routines_1.hiddenById(["name-of-join", "choose-game"]);
        switch (new_join_state) {
            case (WAIT_JOIN_NAME_GAME_1):
                project_routines_1.visibleById(["name-of-join", "choose-game"]);
                break;
            case (WAIT_JOIN_GAME_2):
                project_routines_1.visibleById(["name-of-join", "choose-game", "join-game"]);
                project_routines_1.displayInlineById(["join-game"]);
                break;
            case (WAIT_JOIN_START_3):
                project_routines_1.displayInlineById(["waiting-for-start"]);
                break;
            case (WAIT_JOIN_PLAYING_4):
                project_routines_1.displayInlineById(["join-color"]);
                break;
            default:
                break;
        }
    },
    fixStartJoinHtml: () => {
        join_game.visibleHtmlJoin(WAIT_JOIN_PLAYING_4);
    },
    fixEndJoinHtml: () => {
        join_game.visibleHtmlJoin(WAIT_JOIN_NAME_GAME_1);
    },
    showJoinGames: (the_data) => {
        let select_html = "";
        let is_selected;
        for (const game_user_names of the_data) {
            const [game_name, user_name] = game_user_names.split(WS_MESSAGE_DELIM);
            if (game_name === join_game.selected_game) {
                is_selected = " selected ";
            }
            else {
                is_selected = "";
            }
            const option = `<option value="${game_name}" ${is_selected}>${game_name} - ${user_name}</option>`;
            select_html += option;
        }
        project_routines_1.propertyValueSet("game-name", "innerHTML", select_html);
    },
    // localhost: 3000/join-game?game_name=TEST_GAME&join_name=TEST_PLAYER_2_
    autoFillGame: () => {
        if (typeof project_routines_1.getUrlParamByName === "function") {
            const game_name = project_routines_1.getUrlParamByName("game_name");
            const join_name = project_routines_1.getUrlParamByName("join_name");
            if (game_name && join_name) {
                if (typeof join_game.showJoinGames === "function") {
                    join_game.showJoinGames(new Array(game_name));
                }
                project_routines_1.inputValueSet("game-name", game_name);
                project_routines_1.inputValueSet("join-name", join_name);
                join_game.sendJoinGame();
            }
        }
    },
    sendJoinGame: () => {
        try {
            const join_name = document.getElementById("join-name").value;
            const game_name = document.getElementById("game-name").value;
            if (typeof game_board.sendMessage === "function") {
                const message_object = {
                    game_name,
                    message_type: TO_SERVER_joinGame,
                    user_name: join_name,
                    uuid_key: game_object_1.default.ws_random_key
                };
                game_board.sendMessage(message_object);
                join_game.visibleHtmlJoin(WAIT_JOIN_START_3);
            }
        }
        catch (e) {
            console.error("err", e);
        }
    },
    sendRefreshedGames: () => {
        try {
            if (typeof game_board.sendMessage === "function") {
                const message_object = {
                    message_type: TO_SERVER_gameList,
                    uuid_key: game_object_1.default.ws_random_key
                };
                game_board.sendMessage(message_object);
            }
        }
        catch (e) {
            console.error("err", e);
        }
    }
};
exports.join_game = join_game;
join_game.visibleHtmlJoin(WAIT_JOIN_NAME_GAME_1);
join_game.refresh_func_id = window.setInterval(join_game.sendRefreshedGames, ONE_SECOND);
project_routines_1.eventListenerAdd("join-name", "input", join_game.notEmptyNames);
project_routines_1.eventListenerAdd("game-name", "change", join_game.notEmptyNames);
project_routines_1.eventListenerAdd("game-name", "click", join_game.notEmptyNames);
project_routines_1.eventListenerAdd("join-game", "click", join_game.sendJoinGame);
game_object_1.default.the_websocket.onopen = () => {
    join_game.autoFillGame();
};


/***/ })

},[11]);