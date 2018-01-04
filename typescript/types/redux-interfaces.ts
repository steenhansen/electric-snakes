
import {Action, Dispatch, MiddlewareAPI} from "redux/index"
import SnakeGame from "../game/SnakeGame"
import {EMoveTypes} from "./project-enums"
import {IStateStore} from "./state-interfaces"
import {IWebSocket} from "./system-interfaces"

export interface IDispatch extends Dispatch<IStateStore> {}

export interface IAction extends Action {
    uuid_key: string
    web_socket: IWebSocket
    user_name: string
    game_name: string
    register_date: number
    player_number: number
    snake_game?: SnakeGame
    user_move?: EMoveTypes
    num_computers?: number
    browser_turn?: number
    winner_number?: number
    size_of_snake?: number
    snake_walls?: boolean
    turns_in_milli?: number
}

export interface IMiddlewareAPI extends MiddlewareAPI<IStateStore> {}
