
import project_constants from "../project-constants"
import {IGameBoard, IGameVariables } from "../types/browser-interfaces"
import {EMoveTypes} from "../types/project-enums"
import {IWebSocket, IWindow} from "../types/system-interfaces"

declare let window: IWindow

const {SECONDS_COUNT_DOWN, MOVE_SEND_INTERVAL, TILE_PIXEL_SIZE} = project_constants
const {CONTINUE_MOVE} = EMoveTypes
const browser_random_key: string = window.SNAKE_WS_RANDOM_KEY
const ws_name: string = location.origin.replace(/^http/, "ws") + "/?" + browser_random_key

const browser_variables: IGameVariables = {
     browser_turn: 0
    , count_down: SECONDS_COUNT_DOWN
    , count_down_func_id: 0
    , game_over: false
    , game_started: false
    , host_name: ws_name
    , machine_game_count: 1
    , next_key_move: CONTINUE_MOVE
    , sample_keys_func_id: 0
    , seconds_count_down: 0
    , send_move_interval: MOVE_SEND_INTERVAL
    , test_moves: []
    , the_game_board: {} as IGameBoard
    , the_websocket: {} as IWebSocket
    , tile_size: TILE_PIXEL_SIZE
    , ws_random_key: browser_random_key
    , your_player_number: 0
}
browser_variables.the_websocket = new WebSocket(browser_variables.host_name) as IWebSocket
export default browser_variables
