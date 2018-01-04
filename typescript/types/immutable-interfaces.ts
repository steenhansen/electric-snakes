
import {List, Map} from "immutable"
import {TypedRecord} from "typed-immutable-record"
import PlayerSnake from "../game/PlayerSnake"
import {IStartPosition, IWallLine} from "./server-interfaces"

export interface IXyPoint {
  readonly x: number
  readonly y: number
}
export interface IXyPointRecord extends TypedRecord<IXyPointRecord>, IXyPoint {}
export interface IXyPointList extends List<IXyPointRecord> {}

export interface IBoardOptions {
  board_width: number
  board_height: number
  wall_lines_current: IWallLine[]
  player_positions_current: IStartPosition[]
  max_size: number
  board_turn: number
  snake_walls: boolean
  milli_between_turns: number
}

export interface IBoardOptionsMap extends Map<string, any> {}

//  IXYToColorMap ==>    Map( {x,y}:color_index
//                            {x:1, y:1}: 2  )
export interface IXYToColorMap extends Map<IXyPointRecord, number> {}

// IPlayersSnakeMap ==>    Map( {1}:player_snake
export interface IPlayersSnakeMap extends Map<number, PlayerSnake> {}
