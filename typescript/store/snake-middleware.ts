
import {Seq} from "immutable"
import {BoardColors} from "../game/board-colors"
import SnakeFactory from "../game/game-factory"
import project_constants from "../project-constants"
import {sendSocket} from "../project-routines"
import {IGameInfo} from "../types/browser-interfaces"
import {EActions, EGameStates, EPlayerStates} from "../types/project-enums"
import {IAction, IDispatch, IMiddlewareAPI} from "../types/redux-interfaces"
import {IHumanPlayer, IStateStore} from "../types/state-interfaces"
import {IProcess} from "../types/system-interfaces"

const {HUMAN_PLAYER_NUMBER, TEST_PLAYER_POSTFIX, WS_MESSAGE_DELIM, PLAYER_0_SENTINEL, MAX_PLAYERS} = project_constants
const {PLAYER_PERSON} = EPlayerStates
const {GAME_JOINING_1} = EGameStates
const { TO_SERVER_createGame, TO_SERVER_startPeople, TO_SERVER_startMachine, TO_SERVER_joinGame
    , TO_SERVER_moveSnake, TO_SERVER_moveMachine, TO_SERVER_disconnectBrowser, TO_BROWSER_gameList
    , TO_BROWSER_startPeople, TO_BROWSER_2_to_tango, TO_BROWSER_advanceBoard, TO_BROWSER_crashTurn
    , TO_BROWSER_announceWinner, TO_BROWSER_announceTie, TO_BROWSER_announceNames, TO_BROWSER_your_color
    , TO_BROWSER_all_moves, TO_BROWSER_timeout, TO_BROWSER_missedStart, TO_BROWSER_9_players
} = EActions

function gameList_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        const game_names: string[] = []
        state.hosted_games.forEach( (hosted_game, game_name): void => {
            if (typeof hosted_game !== "undefined") {
                if ( hosted_game.game_against === PLAYER_PERSON && hosted_game.game_status === GAME_JOINING_1) {
                    if (typeof game_name !== "undefined") {
                        const players_in_game = playersInGame(state, game_name)
                        if (players_in_game.count() < MAX_PLAYERS) {
                            const user_name = hosted_game.user_name
                            const game_info = game_name + WS_MESSAGE_DELIM + user_name
                            game_names.push(game_info)
                        }
                    }
                }
            }
        })
        sendSocket(action.web_socket, TO_BROWSER_gameList, game_names)
    } catch (e) {
        e.name = "gameList_mw"
        throw e
    }
}

function joinGame_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        const  hosted_game = state.hosted_games.get(action.game_name)
        if (hosted_game.game_status === GAME_JOINING_1) {
            if (state.human_players.has(action.uuid_key)) {
                const rejoining_player = state.human_players.get(action.uuid_key)
                action.player_number = rejoining_player.player_number
                next(action)
            } else {
                const players_in_game = playersInGame(state, action.game_name)
                const new_player_number =  players_in_game.count() + 1
                if (new_player_number <= MAX_PLAYERS) {
                    action.player_number = new_player_number
                    sendSocket(action.web_socket, TO_BROWSER_your_color, action.player_number)
                    next(action)
                } else {
                    sendSocket(action.web_socket, TO_BROWSER_9_players, action.game_name)
                }
            }
        } else {
            sendSocket(action.web_socket, TO_BROWSER_missedStart, action.game_name)
        }
    } catch (e) {
        e.name = "joinGame_mw"
        throw e
    }
}

function createGame_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        if (state.human_players.has(action.uuid_key)) {
            const the_player = state.human_players.get(action.uuid_key)
            const abandoned_game_name = the_player.game_name
            state.hosted_games = state.hosted_games.delete(abandoned_game_name)
        }
        sendSocket(action.web_socket, TO_BROWSER_your_color, 1)
        next(action)
    } catch (e) {
        e.name = "createGame_mw"
        throw e
    }
}

function loadTestPlayerMoves(players_in_game: any): boolean[] {
    const canned_moves: boolean[] = []
    players_in_game.forEach( (human_player: (IHumanPlayer|void)): void => {
        if (typeof human_player !== "undefined") {
            const player_index: number = human_player.player_number - 1
            if (human_player.user_name.endsWith(TEST_PLAYER_POSTFIX)) {
                canned_moves[player_index] = true
            } else {
                canned_moves[player_index] = false
            }
        }
    })
    return canned_moves
}

function testingVars(): boolean {
    let config_testing_vars: boolean
    if (typeof global.CONFIG_TESTING_VARS === "undefined") {
        config_testing_vars = false
    } else {
        config_testing_vars = true
    }
    return config_testing_vars
}

function startPeople_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        const players_in_game = playersInGame(state, action.game_name)
        if (players_in_game.count() > 1) {
            const canned_moves: boolean[] = loadTestPlayerMoves(players_in_game)
            if ( (typeof action.size_of_snake === "number") && (typeof action.turns_in_milli === "number")
                && (typeof action.snake_walls === "boolean") ) {
                action.snake_game = SnakeFactory(players_in_game.count(), canned_moves,
                                                 action.size_of_snake, action.snake_walls, action.turns_in_milli)
                const board_json = action.snake_game.jsonBoard()
                const color_index = BoardColors.randomColors()
                players_in_game.forEach( (human_player: (IHumanPlayer|void)): void => {
                    if (typeof human_player !== "undefined") {
                        const player_number: number = human_player.player_number
                        if (typeof action.snake_game !== "undefined") {
                            const snake = action.snake_game.player_snakes.get(player_number)
                            const board_width = action.snake_game.boardWidth()
                            const board_height = action.snake_game.boardHeight()
                            const player_game_info: IGameInfo = {
                                board_json,
                                test_moves: snake.test_moves,
                                board_width,
                                board_height,
                                color_index,
                                config_testing_vars: testingVars()
                            }
                            sendSocket(human_player.web_socket, TO_BROWSER_startPeople, player_game_info)
                        }
                    }
                })
                action.snake_game.firstMoveTime()
            }
            next(action)
        } else {
            sendSocket(action.web_socket, TO_BROWSER_2_to_tango, action.game_name)
        }
    } catch (e) {
        e.name = "startPeople_mw"
        throw e
    }
}

function startMachine_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        const players_in_game = playersInGame(state, action.game_name)
        const human_player: IHumanPlayer = players_in_game.first()
        const num_computers = Number(action.num_computers)
        const number_players = HUMAN_PLAYER_NUMBER + num_computers
        const canned_moves: boolean[] = new Array(number_players)
        canned_moves.fill(true)
        const color_index = BoardColors.randomColors()
        if (!human_player.user_name.endsWith(TEST_PLAYER_POSTFIX)) {
            canned_moves[HUMAN_PLAYER_NUMBER - 1] = false
        }
        if ( (typeof action.size_of_snake === "number") && (typeof action.turns_in_milli === "number")
          && (typeof action.snake_walls === "boolean") ) {
            action.snake_game = SnakeFactory(number_players, canned_moves, action.size_of_snake,
                                              action.snake_walls, action.turns_in_milli)
            const board_json = action.snake_game.jsonBoard()
            const snake = action.snake_game.player_snakes.get(human_player.player_number)
            const board_width = action.snake_game.boardWidth()
            const board_height = action.snake_game.boardHeight()
            const player_game_info: IGameInfo = {
                board_height,
                board_json,
                board_width,
                color_index,
                config_testing_vars: testingVars(),
                test_moves: snake.test_moves
            }
            sendSocket(human_player.web_socket, TO_BROWSER_startPeople, player_game_info)
            action.snake_game.firstMoveTime()
        }
        next(action)
    } catch (e) {
        e.name = "startMachine_mw"
        throw e
    }
}

function moveSnake_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        const the_player = state.human_players.get(action.uuid_key)
        const game_name = the_player.game_name
        const snake_game = state.current_boards.get(game_name)
        if ((snake_game.board_turn === the_player.user_turn) && (snake_game.board_turn === action.browser_turn)) {
            next(action)
        }
    } catch (e) {
        e.name = "moveSnake_mw"
        throw e
    }
}

function advanceBoard_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        const game_name = action.game_name
        const snake_game = state.current_boards.get(game_name)
        const players_in_game = playersInGame(state, action.game_name)
        const last_board_moves = snake_game.lastBoardMoves()
        players_in_game.forEach( (human_player: (IHumanPlayer|undefined)): void => {
            if (typeof human_player !== "undefined") {
                sendSocket(human_player.web_socket, TO_BROWSER_all_moves, last_board_moves)
            }
        })
        next(action)
    } catch (e) {
        e.name = "advanceBoard_mw"
        throw e
    }
}

function crashTurn_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        const game_name = action.game_name
        const snake_game = state.current_boards.get(game_name)
        const players_in_game = playersInGame(state, action.game_name)
        const crashed_snakes = snake_game.justCrashedSnakes()
        if (crashed_snakes.length > 0) {
            players_in_game.forEach( (human_player: (IHumanPlayer|undefined)): void => {
                if (typeof human_player !== "undefined") {
                    sendSocket(human_player.web_socket, TO_BROWSER_crashTurn, crashed_snakes)
                }
            })
        }
        next(action)
    } catch (e) {
        e.name = "crashTurn_mw"
        throw e
    }
}

function playersInGame(state: IStateStore, action_game_name: string) {
    try {
        const players_in_game = Seq.Keyed(state.human_players).filter(
            (human_player: (IHumanPlayer|undefined)): boolean => {
                if (typeof human_player !== "undefined") {
                    return human_player.game_name === action_game_name
                }
                return false
            }
            )
        return players_in_game
    } catch (e) {
        e.name = "playersInGame"
        throw e
    }
}

function announceWinner_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        const winner_number = action.winner_number
        const players_in_game = playersInGame(state, action.game_name)
        let winner_name = ""
        players_in_game.forEach( (human_player: (IHumanPlayer|undefined)): void => {
            if (typeof human_player !== "undefined") {
                if (human_player.player_number === winner_number) {
                    winner_name = human_player.user_name
                }
            }
        })
        players_in_game.forEach( (human_player: (IHumanPlayer|undefined)): void => {
            const winner_number_str = String(winner_number)
            if (typeof human_player !== "undefined") {
                sendSocket(human_player.web_socket, TO_BROWSER_announceWinner, [winner_number_str, winner_name])
            }
        })
        next(action)
    } catch (e) {
        e.name = "announceWinner_mw"
        throw e
    }
}

function announceTie_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        const players_in_game = playersInGame(state, action.game_name)
        players_in_game.forEach( (human_player: (IHumanPlayer|undefined)): void => {
            if (typeof human_player !== "undefined") {
                sendSocket(human_player.web_socket, TO_BROWSER_announceTie, "")
            }
        })
        next(action)
    } catch (e) {
        e.name = "announceTie_mw"
        throw e
    }
}

function announceNames_mw(action: IAction, next: IDispatch, state: IStateStore): void {
    try {
        const players_in_game = playersInGame(state, action.game_name)
        const player_names: string[] = [PLAYER_0_SENTINEL]
        players_in_game.forEach( (human_player: (IHumanPlayer|undefined)): void => {
            if (typeof human_player !== "undefined") {
                const user_name: string = human_player.user_name
                const player_number: number = human_player.player_number
                player_names[player_number] = user_name
            }
        })
        players_in_game.forEach( (human_player: (IHumanPlayer|undefined)): void => {
            if (typeof human_player !== "undefined") {
                sendSocket(human_player.web_socket, TO_BROWSER_announceNames, player_names)
            }
        })
        next(action)
    } catch (e) {
        e.name = "announceNames_mw"
        throw e
    }
}

const snake_middleware = (store: IMiddlewareAPI) => (next: IDispatch) => (action: IAction) => {
    try {
        const state = store.getState()
        if (action.type === TO_SERVER_createGame) {
            createGame_mw(action, next, state)
        } else if (action.type === TO_SERVER_joinGame) {
            joinGame_mw(action, next, state)
        } else if (action.type === TO_SERVER_startPeople) {
            startPeople_mw(action, next, state)
        } else if (action.type === TO_SERVER_startMachine) {
            startMachine_mw(action, next, state)
        } else if (action.type === TO_SERVER_moveSnake) {
            moveSnake_mw(action, next, state)
        } else if (action.type === TO_SERVER_moveMachine) {
            next(action)
        } else if (action.type === TO_SERVER_disconnectBrowser) {
            next(action)
        } else if (action.type === TO_BROWSER_gameList) {
            gameList_mw(action, next, state)
        } else if (action.type === TO_BROWSER_advanceBoard) {
            advanceBoard_mw(action, next, state)
        } else if (action.type === TO_BROWSER_crashTurn) {
            crashTurn_mw(action, next, state)
        } else if (action.type === TO_BROWSER_announceWinner) {
            announceWinner_mw(action, next, state)
        } else if (action.type === TO_BROWSER_announceTie) {
            announceTie_mw(action, next, state)
        } else if (action.type === TO_BROWSER_announceNames) {
            announceNames_mw(action, next, state)
        } else {
            console.error("ERROR snake-middleware : unknown action.type = ", action.type)
            process.exit(1)
        }
    } catch (e) {
        if (typeof action.web_socket !== "undefined") {
            sendSocket(action.web_socket, TO_BROWSER_timeout, e.name)
        }
    }
}

export default snake_middleware
