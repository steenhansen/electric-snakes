
import {List} from "immutable"
import {IXyPointList, IXyPointRecord} from "../types/immutable-interfaces"
import {EMoveTypes} from "../types/project-enums"
import {XyFactory, XyNull} from "../types/project-factories"
import {ISnakeOptions} from "../types/server-interfaces"

const {DOWN_MOVE, UP_MOVE, LEFT_MOVE, RIGHT_MOVE, CONTINUE_MOVE} = EMoveTypes

class PlayerSnake {
    public player_number: number
    public turn_number: number
    public last_empty: IXyPointRecord
    public test_moves: EMoveTypes[]

    private max_size: number
    private snake_direction: EMoveTypes
    private has_crashed: boolean
    private snake_segments: IXyPointList

    public constructor(snake_options: ISnakeOptions) {
        this.player_number = snake_options.player_number
        this.max_size = snake_options.max_size
        this.snake_direction = snake_options.snake_direction
        this.has_crashed = false
        const start_xy: IXyPointRecord = snake_options.xy
        this.snake_segments = (List() as IXyPointList).push(start_xy)
        this.turn_number = 0
        this.last_empty = XyNull()
        if (typeof snake_options.test_moves === "undefined") {
            this.test_moves = []
        } else {
            this.test_moves = snake_options.test_moves
        }
    }

    public crashIntoWall(): void {
        this.has_crashed = true
    }

    public crashedOnTurn(board_turn: number): boolean {
        if ((board_turn - 1) === this.turn_number) {
            return this.has_crashed
        } else {
            return false
        }
    }

    public hasCrashed(): boolean {
        return this.has_crashed
    }

    public futureXy(new_direction: EMoveTypes): IXyPointRecord {
        if (new_direction === CONTINUE_MOVE) {
            new_direction = this.snake_direction
        } else if (this.oppositeDirection(new_direction)) {
            new_direction = this.snake_direction
        } else {
            this.snake_direction = new_direction
        }
        const old_head = this.snake_segments.last()
        let x = old_head.x
        let y = old_head.y
        if (new_direction === DOWN_MOVE) {
            y = y + 1
        } else if (new_direction === UP_MOVE) {
            y = y - 1
        } else if (new_direction === LEFT_MOVE) {
            x = x - 1
        } else if (new_direction === RIGHT_MOVE) {
            x = x + 1
        }
        const xy = XyFactory({x, y})
        return xy
    }

    public headSnake(): IXyPointRecord {
        const current_head = this.snake_segments.last()
        return current_head
    }

    public moveSnake(new_x_y: IXyPointRecord): IXyPointRecord {
        this.turn_number = this.turn_number + 1
        this.snake_segments = this.snake_segments.push(new_x_y)
        let new_empty: IXyPointRecord
        if (this.snake_segments.size > this.max_size) {
            new_empty = this.snake_segments.first()
            this.last_empty = new_empty
            this.snake_segments = this.snake_segments.shift()
        } else {
            new_empty = XyNull()
        }
        return new_empty
    }

    private oppositeDirection(new_direction: EMoveTypes): boolean {
        if (new_direction === DOWN_MOVE && this.snake_direction === UP_MOVE) {
            return true
        } else if (new_direction === UP_MOVE && this.snake_direction === DOWN_MOVE) {
            return true
        } else if (new_direction === LEFT_MOVE && this.snake_direction === RIGHT_MOVE) {
            return true
        } else if (new_direction === RIGHT_MOVE && this.snake_direction === LEFT_MOVE) {
            return true
        } else {
            return false
        }
    }

}

export default PlayerSnake
