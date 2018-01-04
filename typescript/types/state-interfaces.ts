
import {Map} from "immutable"
import SnakeGame from "../game/SnakeGame"
import {EGameStates, EPlayerStates} from "./project-enums"
import {IWebSocket} from "./system-interfaces"

export interface IHumanPlayer {
    user_name: string
    game_name: string
    player_number: number
    user_turn: number
    web_socket: IWebSocket
}

export interface IMachinePlayer {
    machine_turn: number
}

export interface IHostedGame {
    game_date: number
    game_against: EPlayerStates
    user_name: string
    game_status: EGameStates
}

export interface IHumanPlayerMap extends Map<string, IHumanPlayer> {}
export interface IMachinePlayerMap extends Map<string, IMachinePlayer> {}
export interface IHostedGameMap extends Map<string, IHostedGame> {}
export interface ICurrentBoardMap extends Map<string, SnakeGame> {}

export interface IStateStore {
    human_players: IHumanPlayerMap
    machine_players: IMachinePlayerMap
    hosted_games: IHostedGameMap
    current_boards: ICurrentBoardMap
}

/*
store = {

    hosted_games:{
         game_name_1:{ game_date: 1234567890
                      ,game_against: PLAYER_PERSON
                      ,user_name: 'steen hansen'
                      ,game_status: GAME_JOINING_1  }
        ,game_name_2:{ game_date: 1234567890
                      ,game_against: PLAYER_PERSON
                      ,user_name: 'steen hansen'
                      ,game_status: GAME_JOINING_1  }
    }

    ,human_players:{
         uuid_key_1:{ user_name: 'steen hansen'
                     ,game_name : 'game_name'
                     ,player_number : 1
                     ,user_turn: 0
                     ,web_socket: web_socket  }
        ,uuid_key_2:{ user_name: 'steen hansen'
                     ,game_name : 'game_name'
                     ,player_number : 1
                     ,user_turn: 0
                     ,web_socket: web_socket  }
    }

    ,machine_players:{
         game_name_1:{ machine_turn: 0 }
        ,game_name_2:{ machine_turn: 7 }
    }

    ,current_boards:{
         game_name_1:{ snakeGame_1 }  }
        ,game_name_2:{ snakeGame_2 }  }
    }

    */
