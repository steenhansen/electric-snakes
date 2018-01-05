
import SnakeGame from "../game/SnakeGame"
import project_constants from "../project-constants"
import {dateInSeconds, decodeSnakeSize, decodeSnakeSpeed, decodeSnakeWalls, sanitizeValue} from "../project-routines"
import {EActions, EMoveTypes, EPlayerStates} from "../types/project-enums"
import {IMiddlewareAPI} from "../types/redux-interfaces"
import {IConnectionArray, ISocketEvents} from "../types/server-interfaces"
import {IStateStore} from "../types/state-interfaces"
import action_types from "./action-types"

const {PLAYER_MACHINE} = EPlayerStates
const { TO_SERVER_createGame, TO_SERVER_joinGame, TO_SERVER_startPeople, TO_SERVER_startMachine,
        TO_SERVER_moveSnake, TO_SERVER_gameList} = EActions
const {WS_MESSAGE_DELIM} = project_constants

const socketEvents = (user_connections: IConnectionArray, game_store: IMiddlewareAPI): ISocketEvents => {

        const socket_events: ISocketEvents =  {} as ISocketEvents

        socket_events.moveGame_ws = (uuid_key: string, user_move: EMoveTypes, browser_turn: number): void => {
            const game_state: IStateStore = game_store.getState()
            if (game_state.human_players.has(uuid_key)) {
                game_store.dispatch(action_types.moveSnake_ac(uuid_key, user_move, browser_turn))
                const the_player = game_state.human_players.get(uuid_key)
                const game_name = the_player.game_name
                const snake_game = game_state.current_boards.get(game_name)
                if (typeof snake_game !== "undefined") {
                    socket_events.machineMove_check(snake_game, game_name)
                    socket_events.finishTurn_check(snake_game, game_name)
                }
            }
        }

        socket_events.createGame_ws = (uuid_key: string, game_name: string, user_name: string): void => {
            if (typeof user_connections[uuid_key] !== "undefined") {
                const web_socket = user_connections[uuid_key].web_socket
                const register_date = dateInSeconds()
                game_store.dispatch(action_types.createGame_ac(uuid_key, web_socket, user_name,
                                                               game_name, register_date))
            }
        }

        socket_events.machineMove_check = (snake_game: SnakeGame, game_name: string): void => {
            const game_state: IStateStore = game_store.getState()
            const hosted_game = game_state.hosted_games.get(game_name)
            if (typeof hosted_game !== "undefined") {
                if (hosted_game.game_against === PLAYER_MACHINE) {
                    const the_machine = game_state.machine_players.get(game_name)
                    if (snake_game.board_turn === the_machine.machine_turn) {
                        const move_machine_action = action_types.moveMachine_ac(game_name)
                        game_store.dispatch(move_machine_action)
                    }
                }
            }
        }

        socket_events.gameList_ws = (uuid_key: string): void => {
            if (typeof user_connections[uuid_key] !== "undefined") {
                const web_socket = user_connections[uuid_key].web_socket
                game_store.dispatch(action_types.gameList_ac(uuid_key, web_socket))
            }
        }

        socket_events.finishTurn_check = (snake_game: SnakeGame, game_name: string): void => {
            if (snake_game.isFinishedTurn()) {
                const advance_action = action_types.advanceBoard_ac(game_name)
                game_store.dispatch(advance_action)
                const crash_action = action_types.crashTurn_ac(game_name)
                game_store.dispatch(crash_action)
                const alive_players = snake_game.alivePlayers()
                if (alive_players === 0) {
                    const tie_action = action_types.announceTie_ac(game_name)
                    game_store.dispatch(tie_action)
                } else if (alive_players === 1) {
                    const winner_number = snake_game.winnerIs()
                    const winner_action = action_types.announceWinner_ac(game_name, winner_number)
                    game_store.dispatch(winner_action)
                }
            }
        }

        socket_events.joinGame_ws = (uuid_key: string, game_name: string, user_name: string): void => {
            if (typeof user_connections[uuid_key] !== "undefined") {
                const web_socket = user_connections[uuid_key].web_socket
                game_store.dispatch(action_types.joinGame_ac(uuid_key, web_socket, user_name, game_name))
                const announce_names_action = action_types.announceNames_ac(game_name)
                game_store.dispatch(announce_names_action)
            }
        }

        socket_events.startPeople_ws = (uuid_key: string, game_name: string, create_name: string, snake_size: string,
                                        snake_walls_text: string, milli_turns: string): void => {
            if (typeof user_connections[uuid_key] !== "undefined") {
                const size_of_snake = decodeSnakeSize(snake_size)
                const turns_in_milli = decodeSnakeSpeed(milli_turns)
                const web_socket = user_connections[uuid_key].web_socket
                const register_date = dateInSeconds()
                const snake_walls = decodeSnakeWalls(snake_walls_text)
                game_store.dispatch(action_types.startPeople_ac(web_socket, game_name, create_name, register_date,
                    size_of_snake, snake_walls, turns_in_milli))
            }
        }

        socket_events.startMachine_ws = (uuid_key: string, game_name: string, user_name: string, num_computers: string,
                                         snake_size: string, snake_walls_text: string, milli_turns: string): void => {
            if (typeof user_connections[uuid_key] !== "undefined") {

                const number_computers = Number.parseInt(num_computers)
                const size_of_snake = decodeSnakeSize(snake_size)
                const turns_in_milli = decodeSnakeSpeed(milli_turns)

                const web_socket = user_connections[uuid_key].web_socket
                const register_date = dateInSeconds()
                const snake_walls = decodeSnakeWalls(snake_walls_text)
                game_store.dispatch(action_types.createGame_ac(uuid_key, web_socket, user_name, game_name,
                                                               register_date))
                game_store.dispatch(action_types.startMachine_ac(game_name, register_date, number_computers,
                                                                 size_of_snake, snake_walls, turns_in_milli))
            }
        }

        socket_events.incomingMessage = (message: string): void => {
            const message_obj = JSON.parse(message)
            const {message_type, uuid_key, create_name, game_name, user_name, num_computer, snake_size,
                    milli_turns, move_direction, browser_turn, snake_walls} = message_obj
            const create_name_sanitized = sanitizeValue(create_name)
            const game_name_sanitized = sanitizeValue(game_name)
            const user_name_sanitized = sanitizeValue(user_name)
            if (message_type === TO_SERVER_moveSnake) {
                socket_events.moveGame_ws(uuid_key, move_direction, Number.parseInt(browser_turn))
            } else if (message_type === TO_SERVER_joinGame) {
                socket_events.joinGame_ws(uuid_key, game_name_sanitized, user_name_sanitized)
            } else  if (message_type === TO_SERVER_createGame) {
                socket_events.createGame_ws(uuid_key, game_name_sanitized, user_name_sanitized)
            } else if (message_type === TO_SERVER_startMachine) {
                socket_events.startMachine_ws(uuid_key, game_name_sanitized, user_name_sanitized, num_computer,
                                              snake_size, snake_walls, milli_turns)
            } else if (message_type === TO_SERVER_startPeople) {
                socket_events.startPeople_ws(uuid_key, game_name_sanitized, create_name_sanitized,
                                             snake_size, snake_walls, milli_turns)
            } else if (message_type === TO_SERVER_gameList) {
                socket_events.gameList_ws(uuid_key)
            } else {
                console.error("ERROR socket-events.js : unknown message = ", message)
            }
        }

        socket_events.deleteTimedOutGames = (seconds_time_out: number): void => {
            const now_seconds: number = dateInSeconds()
            const game_state: IStateStore = game_store.getState()
            let delete_seconds: number
            if (typeof global.CONFIG_TESTING_VARS === "undefined") {
                delete_seconds = now_seconds - seconds_time_out
            } else {
                delete_seconds = now_seconds - global.CONFIG_TESTING_VARS.TESTING_TIME_OUT_SECONDS
            }
            if (typeof game_state.hosted_games !== "undefined") {
                game_state.hosted_games.forEach((hosted_game, game_name): void => {
                    if (typeof hosted_game !== "undefined") {
                        if (hosted_game.game_date < delete_seconds) {
                            if (typeof game_name !== "undefined") {
                                game_state.hosted_games = game_state.hosted_games.delete(game_name)
                                game_state.current_boards = game_state.current_boards.delete(game_name)
                                game_state.machine_players = game_state.machine_players.delete(game_name)
                            }
                        } else {
                            if (typeof global.CONFIG_TESTING_VARS !== "undefined") {
                                console.error("socket_events.deleteTimedOutHumans game_name==", game_name)
                            }

                        }
                    }
                })
            }
        }

        socket_events.deleteTimedOutHumans = (seconds_time_out: number): void => {
            const now_seconds: number = dateInSeconds()
            let delete_seconds: number
            if (typeof global.CONFIG_TESTING_VARS === "undefined") {
                delete_seconds = now_seconds - seconds_time_out
            } else {
                delete_seconds = now_seconds - global.CONFIG_TESTING_VARS.TESTING_TIME_OUT_SECONDS
            }
            let uuid_key: string
            for (uuid_key in user_connections) {
                const human_player = user_connections[uuid_key]
                if (human_player.connection_seconds < delete_seconds) {
                    delete user_connections[uuid_key]
                } else {
                    if (typeof global.CONFIG_TESTING_VARS !== "undefined") {
                        console.error("deleteTimedOutHumans ==", uuid_key, now_seconds)
                    }
                }
            }
        }

        return socket_events
    }

export default function(user_connections: IConnectionArray, game_store: IMiddlewareAPI) {
  return socketEvents(user_connections, game_store)
}
