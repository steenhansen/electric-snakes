
import {IReadOnlyConsts} from "./types/server-interfaces"

const project_constants: IReadOnlyConsts = {
      AVERAGE_SNAKE_SPEED: 40                                   // ** speed
    , CTX_WALL_COLOR: "black"
    , DEFAULT_PORT: 3000
    , EMPTY_INDEX_COLOR: 0
    , FAST_SNAKE_SPEED: 20                                   // ** speed
    , HUMAN_PLAYER_NUMBER: 1
    , INIT_REDUX_ACTION: "@@redux/INIT"
    , LARGE_SNAKE_SIZE: 30
    , LEFT_HAND_UDLR_KEYS : [87, 83, 65, 68]  // 'wsad'
    , MAX_PLAYERS: 8
    , MEDIUM_SNAKE_SIZE: 20
    , MOVE_SEND_INTERVAL: 20                                       // ** speed
    , NON_EXISTANT_XY: -1
    , ONE_SECOND: 1001
    , PLAYER_0_SENTINEL: "_no_player_0_"
    , RIGHT_HAND_UDLR_KEYS: [38, 40, 37, 39]  // arrows: up, down,left,right
    , SECONDS_COUNT_DOWN: 3    // TESTING_SECONDS_COUNT_DOWN
    , SLOW_SNAKE_SPEED: 60                                    // ** speed
    , TEST_PLAYER_POSTFIX: "_"
    , TILE_PIXEL_SIZE: 10
    , TIME_OUT_SECONDS: 3600   // TESTING_TIME_OUT_SECONDS
    , TINY_SNAKE_SIZE: 5
    , WALL_INDEX_COLOR: 9
    , WS_MESSAGE_DELIM: ","
}

export default project_constants
