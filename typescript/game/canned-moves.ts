
import {EMoveTypes} from "../types/project-enums"

const {DOWN_MOVE, UP_MOVE, LEFT_MOVE, RIGHT_MOVE} = EMoveTypes
const D_D_D_R_R_R_R =  [ DOWN_MOVE, DOWN_MOVE, DOWN_MOVE, RIGHT_MOVE, RIGHT_MOVE, RIGHT_MOVE, RIGHT_MOVE ]
const D_R =  [ DOWN_MOVE, RIGHT_MOVE ]

const STORED_MOVES = [
  D_D_D_R_R_R_R
, D_R
, [ UP_MOVE, UP_MOVE, UP_MOVE, UP_MOVE, LEFT_MOVE, LEFT_MOVE, LEFT_MOVE, LEFT_MOVE, LEFT_MOVE, LEFT_MOVE,
   LEFT_MOVE, LEFT_MOVE, LEFT_MOVE, UP_MOVE ]
, [ DOWN_MOVE, DOWN_MOVE, DOWN_MOVE, DOWN_MOVE, LEFT_MOVE, LEFT_MOVE, LEFT_MOVE, LEFT_MOVE, LEFT_MOVE,
   LEFT_MOVE, LEFT_MOVE, LEFT_MOVE, LEFT_MOVE, DOWN_MOVE ]
, [ DOWN_MOVE, DOWN_MOVE, DOWN_MOVE, DOWN_MOVE, RIGHT_MOVE, RIGHT_MOVE, RIGHT_MOVE, RIGHT_MOVE, RIGHT_MOVE,
   RIGHT_MOVE, RIGHT_MOVE, RIGHT_MOVE, RIGHT_MOVE, DOWN_MOVE ]
, [ LEFT_MOVE ]
, [ RIGHT_MOVE ]
, [ DOWN_MOVE ] ]

const cannedMoves = (): EMoveTypes[] => {
  const random_moves = Math.floor(Math.random() * STORED_MOVES.length)
  const random_test_moves = STORED_MOVES[random_moves]
  return random_test_moves
}

export default cannedMoves
