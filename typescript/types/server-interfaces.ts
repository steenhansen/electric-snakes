
import SnakeGame from "../game/SnakeGame"
import {IXyPointRecord} from "../types/immutable-interfaces"
import {EMoveTypes} from "./project-enums"
import {IRequest, IResponse, IWebSocket} from "./system-interfaces"

export interface ISnakeOptions {
    player_number: number
    max_size: number
    snake_direction: EMoveTypes
    xy: IXyPointRecord
    test_moves: EMoveTypes[]
}

export interface IPositions {
    board_width: number
    board_height: number
    wall_init_lines: IWallLine[]
    wall_lines_current: IWallLine[]
    player_positions_current: IStartPosition[]
    player_init_positions: IStartPosition[]
}

export interface IStartPosition {
    x: number
    y: number
    start_direction: EMoveTypes
    test_moves: EMoveTypes[]
}

export type IWallLine = [number, number, number, string]

export interface IConnection {
    connection_seconds: number
    web_socket: IWebSocket
}

export interface IConnectionArray {
    [index: string]: IConnection
}

export interface IReadOnlyConsts {
    readonly [index: string]: any
}

export interface ISocketEvents {
    moveGame_ws: (uuid_key: string, user_move: EMoveTypes, browser_turn: number) => void
    createGame_ws: (uuid_key: string, game_name: string, user_name: string) => void
    machineMove_check: (snake_game: SnakeGame, game_name: string) => void
    gameList_ws: (uuid_key: string) => void
    finishTurn_check: (snake_game: SnakeGame, game_name: string) => void
    joinGame_ws: (uuid_key: string, game_name: string, user_name: string) => void
    startPeople_ws: (uuid_key: string, game_name: string, create_name: string, snake_size: string,
                     snake_walls_text: string, milli_turns: string) => void
    startMachine_ws: (uuid_key: string, game_name: string, user_name: string, num_computers: string,
                      snake_size: string, snake_walls_text: string, milli_turns: string) => void
    incomingMessage: (message: string) => void
    deleteTimedOutGames: (seconds_time_out: number) => void
    deleteTimedOutHumans: (seconds_time_out: number) => void
}

export interface IMoveSnake  {
    type: string
    , uuid_key: string
    , user_move: EMoveTypes
    , browser_turn: number
}

export interface IJoinGame  {
    type: string
    , uuid_key: string
    , web_socket: IWebSocket
    , game_name: string
    , user_name: string
}

export interface ICreateGame {
    type: string
    , uuid_key: string
    , web_socket: IWebSocket
    , game_name: string
    , user_name: string
    , register_date: number
}

export interface IStartPeople {
    type: string
    , web_socket: IWebSocket
    , game_name: string
    , user_name: string
    , register_date: number
    , size_of_snake: number
    , snake_walls: boolean
    , turns_in_milli: number
}

export interface IStartMachine {
    type: string
    , game_name: string
    , register_date: number
    , num_computers: number
    , size_of_snake: number
    , snake_walls: boolean
    , turns_in_milli: number
}

export interface IGamesList {
    type: string
    , uuid_key: string
    , web_socket: IWebSocket
}

export interface IGameName {
    type: string
    , game_name: string
}

export interface IDisconnectBrowser {
    type: string
    , uuid_key: string
}

export interface IAnnounceWinner {
    type: string
    , game_name: string
    , winner_number: number
}

export interface ISnakePages {
    serveCreate: (req: IRequest, res: IResponse, hashed_js: string, file_name: string) => void
    , serverJoin: (req: IRequest, res: IResponse, hashed_js: string, file_name: string) => void
    , getPage: (req: IRequest, res: IResponse) => void
}
