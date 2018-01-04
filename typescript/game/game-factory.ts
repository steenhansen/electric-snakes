
import {Map} from "immutable"
import project_constants from "../project-constants"
import {IBoardOptions, IBoardOptionsMap} from "../types/immutable-interfaces"
import boardPositions from "./board-positions"
import SnakeGame from "./SnakeGame"

const SnakeFactory = (number_players: number, test_players: boolean[], size_of_snake: number,
                      snake_walls: boolean, turns_in_milli: number): SnakeGame => {
  const random_board = boardPositions(number_players, test_players)
  if (!snake_walls) {
    random_board.wall_lines_current = []
   }
  const board_obj: IBoardOptions = {
      board_height: random_board.board_height
    , board_turn: 0
    , board_width: random_board.board_width
    , max_size: size_of_snake
    , milli_between_turns: turns_in_milli
    , player_positions_current: random_board.player_positions_current
    , snake_walls
    , wall_lines_current: random_board.wall_lines_current
  }
  const board_options: IBoardOptionsMap = Map(board_obj)
  const snake_game: SnakeGame = new SnakeGame(board_options)
  return snake_game
}

export default SnakeFactory
