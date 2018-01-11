"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_colors_1 = require("../game/board-colors");
const global_test_config_1 = require("../global_test_config");
const project_constants_1 = require("../project-constants");
const project_routines_1 = require("../project-routines");
const project_enums_1 = require("../types/project-enums");
const browser_variables_1 = require("./browser-variables");
const draw_board_1 = require("./draw-board");
const { SECONDS_COUNT_DOWN, ONE_SECOND, LEFT_HAND_UDLR_KEYS, RIGHT_HAND_UDLR_KEYS } = project_constants_1.default;
const { CONTINUE_MOVE } = project_enums_1.EMoveTypes;
const { TO_BROWSER_startPeople, TO_BROWSER_all_moves, TO_SERVER_moveSnake, TO_BROWSER_announceWinner, TO_BROWSER_announceTie, TO_BROWSER_your_color, TO_BROWSER_crashTurn, TO_BROWSER_announceNames, TO_BROWSER_9_players, TO_BROWSER_gameList, TO_BROWSER_2_to_tango, TO_BROWSER_timeout, TO_BROWSER_missedStart, TO_BROWSER_startMachine } = project_enums_1.EActions;
const game_board = {
    live_colors: [],
    draw_board: {},
    show_players_data: [],
    count_down_vertical: 0,
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
        game_board.showPlayers(game_board.show_players_data); // NB, must be redone with correct colors
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
        game_board.count_down_vertical = player_game_info.board_height * tile_size / 2;
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
        element.style.top = String(game_board.count_down_vertical);
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
    if (the_message === TO_BROWSER_startMachine) {
        game_board.show_players_data = [];
        game_board.showPlayers([]);
        game_board.initializeGame(player_game_info);
    }
    else if (the_message === TO_BROWSER_startPeople) {
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
