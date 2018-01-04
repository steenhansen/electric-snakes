
import {Map} from "immutable"
import {MiddlewareAPI} from "redux/index"
import {ICurrentBoardMap, IHostedGameMap, IHumanPlayerMap, IMachinePlayerMap,
        IStateStore} from "../types/state-interfaces"
import snake_middleware from "./snake-middleware"
import snake_reducers from "./snake-reducers"

const redux = require("redux")

const INITIAL_STATE: IStateStore = {
      current_boards: Map() as ICurrentBoardMap
    , hosted_games:  Map() as IHostedGameMap
    , human_players:  Map() as IHumanPlayerMap
    , machine_players:  Map() as IMachinePlayerMap
  }
const game_store: MiddlewareAPI<IStateStore> = redux.createStore(snake_reducers,
                                                           INITIAL_STATE, redux.applyMiddleware(snake_middleware))

export default game_store
