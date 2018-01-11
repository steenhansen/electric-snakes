
import {ECreateStates, EJoinStates, EMoveTypes} from "./project-enums"
import {IWebSocket} from "./system-interfaces"

export interface IGameCreate {
    visibleHtmlJoin: (new_create_state: ECreateStates) => void
    areNamesEmpty: () => boolean
    fixEndCreateHtml: () => void
    fixStartCreateHtml: () => void
    enableStartButton: () => void
    showHumanGame: () => void
    focusOnAName: () => void
    sendCreateGame: () => void
    sendStartGame: () => void
    sendVersusComputer: (event: Event) => void
    autoFillCreate: () => void
    notEmptyNames: () => void
    showMachineGame: () => void
}

export interface IGameJoin {
    refresh_func_id: number
    selected_game: string
    have_joined: boolean
    missedStart: (missed_game_name: string) => void
    visibleHtmlJoin: (new_join_state: EJoinStates) => void
    areNamesEmpty: () => boolean
    fixStartJoinHtml: () => void
    fixEndJoinHtml: () => void
    sendJoinGame: () => void
    sendRefreshedGames: () => void
    showJoinGames: (the_data: string[]) => void
    autoFillGame: () => void
    notEmptyNames: () => void
}

export interface IGameInfo {
    board_json: number[][]
    test_moves: EMoveTypes[]
    board_width: number
    board_height: number
    color_index: number
    config_testing_vars: boolean
}

export interface IBoardColors {
    randomColors: () => number
    colorSet: (color_index: number) => IColorArray
}

export interface IDrawBoard {
    tile_size: number
    live_colors: IColorArray
    initializeDraw: (tile_size: number, board_colors: IColorArray) => void
    drawSquares: (start_x: number, start_y: number, end_x: number, end_y: number) => void
    drawTile: (column: number, row: number, color_index: number) => void
    drawCanvas: (the_data: IGameInfo) => void
    drawGrid: (json_obj: number[][]) => void
    drawMoves: (test_moves: string []) => void
    drawCrashes: (crash_list: string[]) => void
}

export interface IGameBoard {
    draw_board: IDrawBoard
    live_colors: IColorArray
    show_players_data: string[]
    count_down_vertical: number
    initializeGame: (player_game_info: IGameInfo) => void
    enableKeys: () => void
    countDownStart: () => void
    sendMessage: (message_json: object) => void
    playerColorElement: (element_id: string) => void
    fixStartHtml: () => void
    fixEndHtml: () => void
    showAllMoves: (test_moves: string []) => void
    showWinner: (winner_data: string[]) => void
    readyForGame: () => void
    showTie: () => void
    setPlayerNumber: (player_number: number) => void
    showPlayers: (all_players: string[]) => void
    showCountDown: () => void
    moveToServer: (move_direction: string) => void
    startGame: () => void
    sendMoveToServer: () => void
}

export interface IGameVariables {
    the_game_board: IGameBoard
    ws_random_key: string
    the_websocket: IWebSocket
    host_name: string
    send_move_interval: number
    tile_size: number
    your_player_number: number
    game_started: boolean
    game_over: boolean
    browser_turn: number
    machine_game_count: number
    count_down: number
    seconds_count_down: number
    count_down_func_id: number
    sample_keys_func_id: number
    test_moves: string[]
    next_key_move: string
}

export interface IColorArray {
    readonly [index: number]: string
}
