
import {BoardColors} from "../game/board-colors"
import SNAKE_TEST_CONFIG from "../global_test_config"
import project_constants from "../project-constants"
import {colorTextSpan, never_needTwoToTango, never_nineMakesACrowd, propertyValueSet,
        styleValueSet, upDownLeftRight} from "../project-routines"
import {IColorArray, IDrawBoard, IGameBoard, IGameInfo} from "../types/browser-interfaces"
import {EActions, EMoveTypes} from "../types/project-enums"
import {IWindow} from "../types/system-interfaces"
import browser_variables from "./browser-variables"
import {DrawBoard} from "./draw-board"

declare let window: IWindow
const {SECONDS_COUNT_DOWN, ONE_SECOND, LEFT_HAND_UDLR_KEYS, RIGHT_HAND_UDLR_KEYS} = project_constants
const {CONTINUE_MOVE} = EMoveTypes

const {TO_BROWSER_startPeople, TO_BROWSER_all_moves, TO_SERVER_moveSnake, TO_BROWSER_announceWinner,
       TO_BROWSER_announceTie, TO_BROWSER_your_color, TO_BROWSER_crashTurn, TO_BROWSER_announceNames,
       TO_BROWSER_9_players, TO_BROWSER_gameList, TO_BROWSER_2_to_tango, TO_BROWSER_timeout,
       TO_BROWSER_missedStart, TO_BROWSER_startMachine} = EActions

const game_board: IGameBoard = {

    live_colors: [] as IColorArray,
    draw_board: {} as IDrawBoard,
    show_players_data: [],
    count_down_vertical: 0,

    showPlayers:  (all_players: string[]): void => {
        if ( ! browser_variables.game_started ) {
            if (typeof window.GLOBAL_WEBPACK.create_game_entry === "object") {
                window.GLOBAL_WEBPACK.create_game_entry.create_game.enableStartButton()
            }
            let players_html = ""
            let user_name
            for (let index = 1; index < all_players.length; index++) {
                if (typeof game_board.live_colors[0] === "undefined") {
                    user_name = all_players[index]
                } else {
                    const rgb_color = game_board.live_colors[index]
                    const plain_name = all_players[index]
                    user_name = colorTextSpan(rgb_color, plain_name)
                }
                players_html = players_html + "<div> Player # " + index + " - " + user_name + "</div>"
            }
            propertyValueSet("game-names", "innerHTML", players_html)
        }
    },

    initializeGame:  (player_game_info: IGameInfo): void => {
        const board_colors: IColorArray = BoardColors.colorSet(player_game_info.color_index)
        const tile_size: number = browser_variables.tile_size
        DrawBoard.initializeDraw(tile_size, board_colors)
        game_board.draw_board = DrawBoard
        game_board.live_colors = board_colors
        game_board.showPlayers(game_board.show_players_data)   // NB, must be redone with correct colors
        game_board.fixStartHtml()
        browser_variables.game_started = false
        browser_variables.game_over = false
        browser_variables.browser_turn = 0
        if (player_game_info.config_testing_vars) {
           browser_variables.seconds_count_down = SNAKE_TEST_CONFIG.TESTING_SECONDS_COUNT_DOWN
        } else {
            browser_variables.seconds_count_down = SECONDS_COUNT_DOWN
        }
        browser_variables.count_down = browser_variables.seconds_count_down
        if (Array.isArray(player_game_info.test_moves)) {
            browser_variables.test_moves = player_game_info.test_moves
        }
        game_board.enableKeys()
        browser_variables.next_key_move = CONTINUE_MOVE
        game_board.draw_board.drawCanvas(player_game_info)
        styleValueSet("board-container", "display", "")
        propertyValueSet("game-results", "innerHTML", "")
        game_board.count_down_vertical = player_game_info.board_height * tile_size / 2
        game_board.countDownStart()

    },

    enableKeys: (): void  => {
        document.addEventListener("keydown", (event) => {
            const key_code = event.keyCode
            const key_move_direction = upDownLeftRight(key_code, LEFT_HAND_UDLR_KEYS, RIGHT_HAND_UDLR_KEYS)
            browser_variables.next_key_move = key_move_direction
        })
    },

    countDownStart:  (): void  => {
        const player_color = game_board.live_colors[browser_variables.your_player_number]
        const container_border_style = browser_variables.tile_size / 2 + "px solid " + player_color
        styleValueSet("board-container", "border", container_border_style)
        browser_variables.count_down_func_id = window.setInterval(game_board.showCountDown, ONE_SECOND)
        const count_down_milliseconds = ONE_SECOND * (browser_variables.seconds_count_down + 1)
        setTimeout(game_board.startGame, count_down_milliseconds)
    },

    showCountDown:  (): void  => {
        const element: HTMLElement = document.getElementById("count-downer") as HTMLElement
        element.style.top = String(game_board.count_down_vertical)
        if (browser_variables.count_down === browser_variables.seconds_count_down) {
            element.classList.add("my-count")
            game_board.playerColorElement("count-downer")
        }
        if ( browser_variables.count_down < 1 ) {
            element.innerHTML =  ""
            element.classList.remove("my-count")
            window.clearTimeout(browser_variables.count_down_func_id)
        } else {
            element.innerHTML = browser_variables.count_down.toString()
        }
        browser_variables.count_down = browser_variables.count_down - 1
    },

    startGame: (): void  => {
        browser_variables.game_started = true
        browser_variables.sample_keys_func_id = window.setInterval(game_board.sendMoveToServer,
                                                                   browser_variables.send_move_interval)
    },

    showAllMoves: (all_moves: string []): void  => {
        browser_variables.browser_turn = browser_variables.browser_turn + 1
        if (typeof browser_variables.the_game_board.draw_board.drawMoves === "function" ) {
            browser_variables.the_game_board.draw_board.drawMoves(all_moves)
        }
    },

    showWinner:  (winner_data: string[]): void  => {
        game_board.readyForGame()
        const winner_number_str: string = winner_data[0]
        const winner_number = Number(winner_number_str)
        const winner_name: string = winner_data[1]
        let win_message: string
        if (winner_number === browser_variables.your_player_number) {
            const your_color = game_board.live_colors[browser_variables.your_player_number]
            win_message = colorTextSpan(your_color, "You are the Winner!")
        } else {
            const enemy_color = game_board.live_colors[winner_number]
            const colored_number = colorTextSpan(enemy_color, winner_number_str)
            const colored_name = colorTextSpan(enemy_color, winner_name)
            win_message = "You lose. " + colored_name + "player # " + colored_number + "is the winner."
        }
        propertyValueSet("game-results", "innerHTML", win_message)
        game_board.fixEndHtml()
    },

    fixStartHtml: (): void  => {
        if (typeof window.GLOBAL_WEBPACK.create_game_entry === "object") {
            window.GLOBAL_WEBPACK.create_game_entry.create_game.fixStartCreateHtml()
            game_board.playerColorElement("create-color")
        } else if (typeof window.GLOBAL_WEBPACK.join_game_entry === "object") {
            window.GLOBAL_WEBPACK.join_game_entry.join_game.fixStartJoinHtml()
            game_board.playerColorElement("join-color")
        }
    },

    fixEndHtml:  (): void  => {
        if (typeof window.GLOBAL_WEBPACK.create_game_entry === "object") {
            window.GLOBAL_WEBPACK.create_game_entry.create_game.fixEndCreateHtml()
        } else if (typeof window.GLOBAL_WEBPACK.join_game_entry === "object") {
            window.GLOBAL_WEBPACK.join_game_entry.join_game.fixEndJoinHtml()
        }
    },

    readyForGame:  (): void => {
        window.clearInterval(browser_variables.sample_keys_func_id)
        browser_variables.game_over = true
        browser_variables.game_started = false
        browser_variables.browser_turn = 0
    },

    showTie: (): void => {
        game_board.readyForGame()
        propertyValueSet("game-results", "innerHTML", "we have a tie !")
        game_board.fixEndHtml()
    },

    playerColorElement: (element_id: string): void  => {
        const player_color: string = game_board.live_colors[browser_variables.your_player_number]
        styleValueSet(element_id, "color", player_color)
    },

    setPlayerNumber: (player_number: number): void => {
        browser_variables.your_player_number = player_number
    },

    moveToServer: (move_direction: string): void => {
        if (!browser_variables.game_over) {
            try {
                const message_object = {
                    browser_turn: browser_variables.browser_turn,
                    message_type: TO_SERVER_moveSnake,
                    move_direction,
                    uuid_key: browser_variables.ws_random_key
                }
                game_board.sendMessage(message_object)
            } catch (e) {
                console.error("err", e)
            }
        }
    },

    sendMoveToServer: (): void => {
        let next_move = browser_variables.next_key_move
        if (browser_variables.test_moves.length > 0) {
            if (browser_variables.test_moves.length === browser_variables.browser_turn) {
                browser_variables.test_moves = browser_variables.test_moves.concat(browser_variables.test_moves)
            }
            const next_canned_move = browser_variables.test_moves[browser_variables.browser_turn]
            if (browser_variables.next_key_move === CONTINUE_MOVE) {
                next_move = next_canned_move
            } else {
                next_move = browser_variables.next_key_move
                browser_variables.next_key_move = CONTINUE_MOVE
            }
        }
        game_board.moveToServer(next_move)
    },

    sendMessage: (message_object: object ): void => {
        const message =  JSON.stringify(message_object)
        if (typeof browser_variables.the_websocket.send === "function" ) {
                 browser_variables.the_websocket.send(message)
        }
    }
}

browser_variables.the_websocket.onclose = (): void => {
    browser_variables.the_websocket.send = null!
}

browser_variables.the_websocket.onmessage = (event: MessageEvent): void => {
    const json_obj = JSON.parse(event.data)
    const the_message = json_obj.message_type
    const player_game_info = json_obj.data

    if (the_message === TO_BROWSER_startMachine) {
        game_board.show_players_data = []
        game_board.showPlayers([])
        game_board.initializeGame(player_game_info)
    } else if (the_message === TO_BROWSER_startPeople) {
        game_board.initializeGame(player_game_info)
    } else if (the_message === TO_BROWSER_all_moves) {
        game_board.showAllMoves(player_game_info)
    } else if (the_message === TO_BROWSER_announceWinner) {
        game_board.showWinner(player_game_info)
    } else if (the_message === TO_BROWSER_announceTie) {
        game_board.showTie()
    } else if (the_message === TO_BROWSER_your_color) {
        game_board.setPlayerNumber(player_game_info)
    } else if (the_message === TO_BROWSER_crashTurn) {
        game_board.draw_board.drawCrashes(player_game_info)
    } else if (the_message === TO_BROWSER_announceNames) {
        game_board.show_players_data = player_game_info
        game_board.showPlayers(player_game_info)
    } else if (the_message === TO_BROWSER_2_to_tango) {
        never_needTwoToTango(player_game_info)
    } else if (the_message === TO_BROWSER_9_players) {
        never_nineMakesACrowd(player_game_info)
    } else if (the_message === TO_BROWSER_timeout) {
        styleValueSet("timed-out", "display", "block")
    } else if (the_message === TO_BROWSER_gameList) {
        if (typeof window.GLOBAL_WEBPACK.join_game_entry === "object") {
            window.GLOBAL_WEBPACK.join_game_entry.join_game.showJoinGames(player_game_info)
        }
     } else if (the_message === TO_BROWSER_missedStart) {
        if (typeof window.GLOBAL_WEBPACK.join_game_entry === "object") {
            window.GLOBAL_WEBPACK.join_game_entry.join_game.missedStart(player_game_info)
        }
    } else {
        console.error("ERROR game-objects :  unknown message = ", the_message)
    }
}
browser_variables.the_game_board = game_board

export default browser_variables
