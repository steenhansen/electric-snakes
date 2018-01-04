
export enum EWallTypes {
    WALL_HORIZONTAL = "wall_horizontal",
    WALL_VERTICAL = "wall_vertical",
    WALL_DIAGONAL = "wall_diagonal"
}

export enum EGameStates {
    GAME_JOINING_1,
    GAME_PLAYING_2
    // GAME_FINISHED_3
}

export enum EPlayerStates {
    PLAYER_PERSON,
    PLAYER_MACHINE
}

export enum EJoinStates {
    WAIT_JOIN_NAME_GAME_1,
    WAIT_JOIN_GAME_2,
    WAIT_JOIN_START_3,
    WAIT_JOIN_PLAYING_4
}

export enum ECreateStates {
    WAIT_COMPUTER_OPPONENTS_A,
    WAIT_COMPUTER_START_B,
    WAIT_COMPUTER_START_C,

    WAIT_FOR_CHOICE,
    WAIT_HUMAN_NAMING_1,
    WAIT_HUMAN_CREATION_2,
    WAIT_HUMAN_START_3,
    WAIT_HUMAN_END_4
}

export enum EMoveTypes { DOWN_MOVE = "down"
, UP_MOVE = "up"
, LEFT_MOVE = "left"
, RIGHT_MOVE = "right"
, CONTINUE_MOVE = "continue"
}

export enum EActions {
    TO_SERVER_createGame = "TO_SERVER_createGame"
    , TO_SERVER_startPeople = "TO_SERVER_startPeople"
    , TO_SERVER_startMachine = "TO_SERVER_startMachine"
    , TO_SERVER_joinGame = "TO_SERVER_joinGame"
    , TO_SERVER_moveSnake = "TO_SERVER_moveSnake"
    , TO_SERVER_moveMachine = "TO_SERVER_moveMachine"
    , TO_SERVER_disconnectBrowser = "TO_SERVER_disconnectBrowser"
    , TO_SERVER_gameList = "TO_SERVER_gameList"

    , TO_BROWSER_missedStart = "TO_BROWSER_missedStart"
    , TO_BROWSER_gameList = "TO_BROWSER_gameList"
    , TO_BROWSER_timeout = "TO_BROWSER_timeout"
    , TO_BROWSER_startPeople = "TO_BROWSER_startPeople"
    , TO_BROWSER_2_to_tango = "TO_BROWSER_2_to_tango"
    , TO_BROWSER_9_players = "TO_BROWSER_9_players"
    , TO_BROWSER_advanceBoard = "TO_BROWSER_advanceBoard"
    , TO_BROWSER_crashTurn = "TO_BROWSER_crashTurn"
    , TO_BROWSER_announceWinner = "TO_BROWSER_announceWinner"
    , TO_BROWSER_announceTie = "TO_BROWSER_announceTie"
    , TO_BROWSER_announceNames = "TO_BROWSER_announceNames"
    , TO_BROWSER_your_color = "TO_BROWSER_your_color"
    , TO_BROWSER_all_moves = "TO_BROWSER_all_moves"
}
