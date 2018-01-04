
import {EActions, EMoveTypes} from "../types/project-enums"
import {IAnnounceWinner, ICreateGame, IDisconnectBrowser, IGameName, IGamesList,
        IJoinGame, IMoveSnake, IStartMachine, IStartPeople} from "../types/server-interfaces"
import {IWebSocket} from "../types/system-interfaces"

const { TO_SERVER_createGame, TO_SERVER_startPeople, TO_SERVER_startMachine
      , TO_SERVER_joinGame, TO_SERVER_moveSnake, TO_SERVER_moveMachine
      , TO_SERVER_disconnectBrowser, TO_BROWSER_gameList, TO_BROWSER_advanceBoard
      , TO_BROWSER_crashTurn, TO_BROWSER_announceWinner, TO_BROWSER_announceTie
      , TO_BROWSER_announceNames} = EActions

function createGame_ac(uuid_key: string, web_socket: IWebSocket, user_name: string, game_name: string,
                       register_date: number): ICreateGame {
    const register_action: ICreateGame = {
         game_name
        , register_date
        , type:  TO_SERVER_createGame
        , user_name
        , uuid_key
        , web_socket
    }
    return register_action
}

function startMachine_ac(game_name: string, register_date: number, num_computers: number, size_of_snake: number,
                         snake_walls: boolean, turns_in_milli: number): IStartMachine {
    const start_action: IStartMachine = {
        game_name
        , num_computers
        , register_date
        , size_of_snake
        , snake_walls
        , turns_in_milli
        , type:  TO_SERVER_startMachine
    }
    return start_action
}

function startPeople_ac(web_socket: IWebSocket, game_name: string, create_name: string, register_date: number,
                        size_of_snake: number, snake_walls: boolean, turns_in_milli: number): IStartPeople {
    const start_action: IStartPeople  = {
         game_name
        , register_date
        , size_of_snake
        , snake_walls
        , turns_in_milli
        , type:  TO_SERVER_startPeople
        , user_name:  create_name
        , web_socket
    }
    return start_action
}

function gameList_ac(uuid_key: string, web_socket: IWebSocket): IGamesList {
    const game_names_action: IGamesList = {
        type:  TO_BROWSER_gameList
        , uuid_key
        , web_socket
    }
    return game_names_action
}

function moveMachine_ac(game_name: string): IGameName {
    const move_machine_action: IGameName = {
         game_name
       , type:  TO_SERVER_moveMachine
    }
    return move_machine_action
}

function disconnectBrowser_ac(uuid_key: string): IDisconnectBrowser {
    const disconnect_action: IDisconnectBrowser = {
        type:  TO_SERVER_disconnectBrowser
        , uuid_key
    }
    return disconnect_action
}

function advanceBoard_ac(game_name: string): IGameName {
    const advance_action: IGameName = {
         game_name
        , type:  TO_BROWSER_advanceBoard
    }
    return advance_action
}

function crashTurn_ac(game_name: string): IGameName {
    const advance_action: IGameName = {
         game_name
        , type:  TO_BROWSER_crashTurn
    }
    return advance_action
}

function joinGame_ac(uuid_key: string, web_socket: IWebSocket, user_name: string, game_name: string): IJoinGame {
    const join_action: IJoinGame = {
         game_name
        , type:  TO_SERVER_joinGame
        , user_name
        , uuid_key
        , web_socket
    }
    return join_action
}

function moveSnake_ac(uuid_key: string, user_move: EMoveTypes, browser_turn: number): IMoveSnake {
    const move_action: IMoveSnake = {
         browser_turn
        , type:  TO_SERVER_moveSnake
        , user_move
        , uuid_key
    }
    return move_action
}

function announceWinner_ac(game_name: string, winner_number: number): IAnnounceWinner {
    const winner_action: IAnnounceWinner = {
         game_name
        , type:  TO_BROWSER_announceWinner
        , winner_number
    }
    return winner_action
}

function announceTie_ac(game_name: string): IGameName {
    const tie_action: IGameName = {
         game_name
        , type:  TO_BROWSER_announceTie
    }
    return tie_action
}

function announceNames_ac(game_name: string): IGameName {
    const name_action: IGameName = {
        game_name
        , type:  TO_BROWSER_announceNames
    }
    return name_action
}

const action_types = {
    advanceBoard_ac
    , announceNames_ac
    , announceTie_ac
    , announceWinner_ac
    , crashTurn_ac
    , createGame_ac
    , disconnectBrowser_ac
    , gameList_ac
    , joinGame_ac
    , moveMachine_ac
    , moveSnake_ac
    , startMachine_ac
    , startPeople_ac
}

export default action_types
